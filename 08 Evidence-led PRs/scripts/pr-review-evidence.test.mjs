import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { test } from "node:test";
import { validateReviewEvidence } from "./pr-review-evidence.mjs";

const recorder = path.join(import.meta.dirname, "capture-proof.mjs");
const repositoryScripts = path.resolve(import.meta.dirname, "../../scripts");
const npmCli = process.env.npm_execpath;
const write = (root, file, text) => { const target = path.join(root, file); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, text); };
const json = (root, file, value) => write(root, file, JSON.stringify(value, null, 2) + "\n");
const git = (root, args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: "pipe" }).trim();
const run = (app, script) => spawnSync(process.execPath, [npmCli, "run", script], { cwd: app, encoding: "utf8" });

function fixture() {
  assert.ok(npmCli, "run this suite through npm run test:challenge");
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "pr-review-evidence-test-"));
  const app = path.join(root, "starter-app");
  const contract = {
    mode: "observation", outputs: [{ path: "evidence/pr-summary.md", type: "markdown", headings: ["Change", "Checks", "Decision", "Risk and rollback"] }],
    topics: ["failed-checks"], sourceRoots: ["starter-app/check.mjs"],
    sourceArtifact: "evidence/proof.json", sourceArtifacts: ["evidence/proof.json"], proofScript: "pack:verify", reviewDecision: "BLOCKED",
    requiredSkills: [{ name: "verification-before-completion", source: "https://github.com/obra/superpowers/tree/main/skills/verification-before-completion" }],
    extraEvidence: ["evidence/proof.json", "evidence/commands/checks.txt", "evidence/skill-use.md", "evidence/skill-session.txt"],
  };
  json(app, "evidence-contract.json", contract);
  const wrapper = `import { runEvidence } from ${JSON.stringify(pathToFileURL(path.join(repositoryScripts, "context-document-evidence.mjs")).href)};\nimport { validateReviewEvidence } from ${JSON.stringify(pathToFileURL(path.join(import.meta.dirname, "pr-review-evidence.mjs")).href)};\nawait runEvidence({ appRoot: process.cwd(), validate: validateReviewEvidence });\n`;
  write(app, "review.mjs", wrapper);
  write(app, "check.mjs", 'import fs from "node:fs";\n// The fixture deliberately represents a blocked product check.\nconst proof = JSON.parse(fs.readFileSync("../evidence/proof.json"));\nconsole.log("Checked fixture evidence at " + proof.sourceSha);\nprocess.exitCode = proof.checkExit ?? 0;\n');
  json(app, "package.json", { type: "module", scripts: {
    "pack:verify": "node ./check.mjs", "proof:capture": `node "${recorder}"`,
    "evidence:seal": "node ./review.mjs seal", "evidence:verify": "node ./review.mjs content",
    "evidence:capture": `node "${path.join(repositoryScripts, "capture-verification.mjs")}"`,
    "verify:exercise:core": "node ./review.mjs", "verify:exercise": `node "${path.join(repositoryScripts, "run-clean-verification.mjs")}"`,
  } });
  git(root, ["init"]); git(root, ["config", "core.autocrlf", "false"]);
  git(root, ["config", "user.name", "Evidence Test"]); git(root, ["config", "user.email", "evidence@example.test"]);
  git(root, ["add", "."]); git(root, ["commit", "-m", "synthetic implementation"]);
  const sourceSha = git(root, ["rev-parse", "HEAD"]);
  json(root, "evidence/proof.json", { sourceSha, checkExit: 0 });
  write(root, "evidence/pr-summary.md", `Source SHA: ${sourceSha}\n\n## Change\nThe fixture deliberately represents a blocked product check.\n\n## Checks\nReproduce with npm run pack:verify.\n\n## Decision\nDecision: BLOCKED\n\n## Risk and rollback\nDo not deploy; inspect the failed fixture check.\n`);
  write(root, "evidence/before.md", `## Conditions\nStarting commit: ${sourceSha}\n\n## Findings\nThe synthetic fixture needs a captured proof record.\n\n## Proof\nInspect the fixture source.\n`);
  write(root, "evidence/after.md", `## Conditions\nImplementation commit: ${sourceSha}\n\n## Findings\nThe synthetic proof is captured for this exact implementation.\n\n## Proof\nSee evidence/commands/checks.txt.\n`);
  write(root, "evidence/comparison.md", "## Changes\nCaptured the proof output.\n\n## Verified\nThe recorder ran the actual fixture command.\n\n## Remaining questions\nThis is a framework fixture, not a native agent run.\n");
  json(root, "evidence/source-audit.json", { claims: [{ id: "fixture", topic: "failed-checks", status: "supported", reason: "The cited comment identifies the synthetic fixture purpose.", artifact: { path: "evidence/pr-summary.md", line: 4, excerpt: "The fixture deliberately represents a blocked product check." }, sources: [{ path: "starter-app/check.mjs", line: 2, excerpt: "// The fixture deliberately represents a blocked product check." }] }] });
  write(root, "evidence/skill-session.txt", "Synthetic framework transcript: verification-before-completion was invoked to run the fixture command and inspect its actual output. This tests record validation, not agent behavior.\n");
  write(root, "evidence/skill-use.md", `## verification-before-completion\nSource: ${contract.requiredSkills[0].source}\nRevision: ${"a".repeat(40)}\nInvocation: synthetic framework invocation\nProof: evidence/skill-session.txt:L1-L1\n`);
  return { root, app, contract, sourceSha, cleanup: () => fs.rmSync(root, { recursive: true, force: true }) };
}

test("documented proof, seal, final capture, evidence commit, and read-only check complete without a circular dependency", () => {
  const f = fixture();
  try {
    let result = run(f.app, "proof:capture"); assert.equal(result.status, 0, result.stderr);
    validateReviewEvidence(f.root, f.contract);
    git(f.root, ["add", "evidence"]); git(f.root, ["commit", "-m", "synthetic evidence"]);
    result = run(f.app, "evidence:seal"); assert.equal(result.status, 0, result.stderr);
    result = spawnSync(process.execPath, [npmCli, "run", "evidence:capture", "--", "--output", "../evidence/commands/verify.txt", "--", "npm", "run", "evidence:verify"], { cwd: f.app, encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    git(f.root, ["add", "evidence"]); git(f.root, ["commit", "-m", "synthetic final capture"]);
    result = run(f.app, "verify:exercise"); assert.equal(result.status, 0, result.stderr + result.stdout);
    assert.equal(git(f.root, ["status", "--porcelain"]), "");
    write(f.root, "evidence/proof.json", JSON.stringify({ sourceSha: f.sourceSha, checkExit: 1 }));
    result = run(f.app, "evidence:verify"); assert.notEqual(result.status, 0, "sealed raw evidence must not be editable");
  } finally { f.cleanup(); }
});

test("proof recording preserves failure status and refuses to overwrite an earlier attempt", () => {
  const f = fixture();
  try {
    json(f.root, "evidence/proof.json", { sourceSha: f.sourceSha, checkExit: 3 });
    const result = run(f.app, "proof:capture"); assert.equal(result.status, 3, result.stderr);
    const captured = fs.readFileSync(path.join(f.root, "evidence/commands/checks.txt"), "utf8");
    assert.match(captured, /exit code: 3/);
    assert.throws(() => validateReviewEvidence(f.root, f.contract), /must succeed/);
    assert.notEqual(run(f.app, "proof:capture").status, 0);
    assert.equal(fs.readFileSync(path.join(f.root, "evidence/commands/checks.txt"), "utf8"), captured);
  } finally { f.cleanup(); }
});

test("review proof rejects mixed source SHAs and an unsupported recommendation", () => {
  const f = fixture();
  try {
    const result = run(f.app, "proof:capture"); assert.equal(result.status, 0, result.stderr);
    json(f.root, "evidence/other.json", { sourceSha: "b".repeat(40) });
    assert.throws(() => validateReviewEvidence(f.root, { ...f.contract, sourceArtifacts: [...f.contract.sourceArtifacts, "evidence/other.json"] }), /different implementation/);
    const summary = fs.readFileSync(path.join(f.root, "evidence/pr-summary.md"), "utf8");
    write(f.root, "evidence/pr-summary.md", summary.replace("Decision: BLOCKED", "Decision: READY FOR REVIEW"));
    assert.throws(() => validateReviewEvidence(f.root, f.contract), /review decision/);
  } finally { f.cleanup(); }
});

test("proof recording rejects new uncommitted source and a different HEAD", () => {
  const f = fixture();
  try {
    write(f.app, "uncommitted.mjs", "console.log('uncommitted source');\n");
    assert.notEqual(run(f.app, "proof:capture").status, 0);
    fs.rmSync(path.join(f.app, "uncommitted.mjs"));
    git(f.root, ["commit", "--allow-empty", "-m", "different commit"]);
    assert.notEqual(run(f.app, "proof:capture").status, 0);
    assert.ok(!fs.existsSync(path.join(f.root, "evidence/commands/checks.txt")));
  } finally { f.cleanup(); }
});
