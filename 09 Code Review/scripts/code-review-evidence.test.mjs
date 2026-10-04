import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { test } from "node:test";
import { validateCodeReviewEvidence } from "./code-review-evidence.mjs";

const shared = path.resolve(import.meta.dirname, "../../scripts");
const recorder = path.join(import.meta.dirname, "capture-review-check.mjs");
const npmCli = process.env.npm_execpath;
const write = (root, file, text) => { const target = path.join(root, file); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, text); };
const json = (root, file, value) => write(root, file, JSON.stringify(value, null, 2) + "\n");
const git = (root, args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: "pipe" }).trim();
const run = (app, script, args = []) => spawnSync(process.execPath, [npmCli, "run", script, ...args], { cwd: app, encoding: "utf8" });
function fixture() {
  assert.ok(npmCli, "run through npm run test:challenge");
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "code-review-evidence-test-"));
  const app = path.join(root, "app");
  const contract = {
    mode: "observation", outputs: [{ path: "evidence/review.md", type: "markdown", headings: ["Decision"] }],
    topics: ["review-proof"], sourceRoots: ["app/check.mjs"], sourceArtifact: "evidence/proof.json",
    checkCaptures: { check: { script: "review:verify", path: "evidence/commands/check.txt", phase: "implementation" } },
    requiredSkills: [{ name: "requesting-code-review", source: "https://github.com/obra/superpowers/tree/main/skills/requesting-code-review" }],
    extraEvidence: ["evidence/proof.json", "evidence/commands/check.txt", "evidence/skill-use.md", "evidence/skill-session.txt"],
  };
  json(app, "evidence-contract.json", contract);
  write(app, "check.mjs", 'import fs from "node:fs";\n// This synthetic command checks the recorded review fixture.\nconst proof = JSON.parse(fs.readFileSync("../evidence/proof.json"));\nconsole.log("Synthetic review check " + proof.sourceSha);\nprocess.exitCode = proof.exitCode ?? 0;\n');
  write(app, "review.mjs", "import { runEvidence } from " + JSON.stringify(pathToFileURL(path.join(shared, "context-document-evidence.mjs")).href) + ";\nimport { validateCodeReviewEvidence } from " + JSON.stringify(pathToFileURL(path.join(import.meta.dirname, "code-review-evidence.mjs")).href) + ";\nawait runEvidence({ appRoot: process.cwd(), validate: validateCodeReviewEvidence });\n");
  json(app, "package.json", { type: "module", scripts: {
    "review:verify": "node ./check.mjs", "proof:capture": 'node "' + recorder + '"',
    "evidence:seal": "node ./review.mjs seal", "evidence:verify": "node ./review.mjs content",
    "evidence:capture": 'node "' + path.join(shared, "capture-verification.mjs") + '"',
    "verify:exercise:core": "node ./review.mjs", "verify:exercise": 'node "' + path.join(shared, "run-clean-verification.mjs") + '"',
  } });
  git(root, ["init"]); git(root, ["config", "core.autocrlf", "false"]);
  git(root, ["config", "user.name", "Review Test"]); git(root, ["config", "user.email", "review@example.test"]);
  git(root, ["add", "."]); git(root, ["commit", "-m", "synthetic source"]);
  const sourceSha = git(root, ["rev-parse", "HEAD"]);
  json(root, "evidence/proof.json", { sourceSha, exitCode: 0 });
  write(root, "evidence/review.md", "## Decision\nThis synthetic command checks the recorded review fixture.\n");
  write(root, "evidence/before.md", "## Conditions\nStarting commit: " + sourceSha + "\n\n## Findings\nThe starting fixture needs a recorded result.\n\n## Proof\nSee app/check.mjs.\n");
  write(root, "evidence/after.md", "## Conditions\nImplementation commit: " + sourceSha + "\n\n## Findings\nThe recorder runs the real fixture command.\n\n## Proof\nSee evidence/commands/check.txt.\n");
  write(root, "evidence/comparison.md", "## Changes\nCaptured the synthetic check.\n\n## Verified\nThe actual process output is retained.\n\n## Remaining questions\nThis framework test does not simulate an authentic agent review.\n");
  json(root, "evidence/source-audit.json", { claims: [{ id: "claim-1", topic: "review-proof", status: "supported", reason: "The cited source identifies the synthetic check purpose.", artifact: { path: "evidence/review.md", line: 2, excerpt: "This synthetic command checks the recorded review fixture." }, sources: [{ path: "app/check.mjs", line: 2, excerpt: "// This synthetic command checks the recorded review fixture." }] }] });
  write(root, "evidence/skill-session.txt", "Synthetic framework transcript for requesting-code-review record validation. This fixture checks the evidence protocol and is not a real agent session.\n");
  write(root, "evidence/skill-use.md", "## requesting-code-review\nSource: " + contract.requiredSkills[0].source + "\nRevision: " + "a".repeat(40) + "\nInvocation: synthetic framework record\nProof: evidence/skill-session.txt:L1-L1\n");
  return { root, app, sourceSha, contract, cleanup: () => fs.rmSync(root, { recursive: true, force: true }) };
}
test("capture, commit, seal, final capture, and read-only verification complete without a cycle", () => {
  const f = fixture();
  try {
    let result = run(f.app, "proof:capture", ["--", "check"]); assert.equal(result.status, 0, result.stderr);
    git(f.root, ["add", "evidence"]); git(f.root, ["commit", "-m", "synthetic evidence"]);
    result = run(f.app, "evidence:seal"); assert.equal(result.status, 0, result.stderr);
    result = run(f.app, "evidence:capture", ["--", "--output", "../evidence/commands/verify.txt", "--", "npm", "run", "evidence:verify"]); assert.equal(result.status, 0, result.stderr);
    git(f.root, ["add", "evidence"]); git(f.root, ["commit", "-m", "synthetic final capture"]);
    result = run(f.app, "verify:exercise"); assert.equal(result.status, 0, result.stderr + result.stdout);
    assert.equal(git(f.root, ["status", "--porcelain"]), "");
    write(f.root, "evidence/review.md", "## Decision\nA modified claim after sealing.\n");
    assert.notEqual(run(f.app, "evidence:verify").status, 0);
  } finally { f.cleanup(); }
});
test("recording retains failures, rejects overwrite, and refuses uncommitted source", () => {
  const f = fixture();
  try {
    write(f.app, "new-source.mjs", "export const changed = true;\n");
    assert.notEqual(run(f.app, "proof:capture", ["--", "check"]).status, 0);
    fs.rmSync(path.join(f.app, "new-source.mjs"));
    json(f.root, "evidence/proof.json", { sourceSha: f.sourceSha, exitCode: 3 });
    assert.equal(run(f.app, "proof:capture", ["--", "check"]).status, 3);
    const output = fs.readFileSync(path.join(f.root, "evidence/commands/check.txt"), "utf8");
    assert.match(output, /exit code: 3/);
    assert.throws(() => validateCodeReviewEvidence(f.root, f.contract), /must succeed/);
    assert.notEqual(run(f.app, "proof:capture", ["--", "check"]).status, 0);
    assert.equal(fs.readFileSync(path.join(f.root, "evidence/commands/check.txt"), "utf8"), output);
  } finally { f.cleanup(); }
});
test("starting fixture capture works before the review artifact exists", () => {
  const f = fixture();
  try {
    f.contract.sourceArtifact = "evidence/not-created-yet.json";
    f.contract.checkCaptures.check.phase = "starting";
    json(f.app, "evidence-contract.json", f.contract);
    git(f.root, ["add", "app"]); git(f.root, ["commit", "-m", "starting capture contract"]);
    const head = git(f.root, ["rev-parse", "HEAD"]);
    write(f.root, "evidence/before.md", "Starting commit: " + head + "\n");
    const result = run(f.app, "proof:capture", ["--", "check"]);
    assert.equal(result.status, 0, result.stderr);
  } finally { f.cleanup(); }
});
test("recheck rejects a stale commit, reused session, or a missed finding", () => {
  const f = fixture();
  try {
    assert.equal(run(f.app, "proof:capture", ["--", "check"]).status, 0);
    const review = { sourceSha: f.sourceSha, headSha: "c".repeat(40), reviewerSession: "initial-review-session", findings: [{ id: "REVIEW-1", decision: "fix" }] };
    json(f.root, "evidence/review.json", review);
    write(f.root, "evidence/review-session.txt", "Synthetic initial-review-session inspects protected head " + review.headSha + " and records a confirmed fixture finding. This is framework data.\n");
    const recheck = { schemaVersion: 1, sourceSha: f.sourceSha, sessionId: "new-recheck-session", agent: "fixture", model: "fixture", startedAt: "2026-01-01T00:00:00Z", reviewedFindingIds: ["REVIEW-1"], remainingBlockers: [], decision: "ready-for-review" };
    write(f.root, "evidence/recheck-session.txt", "Synthetic new-recheck-session inspects fixed source " + f.sourceSha + " and rechecks the fixture finding. This is framework data.\n");
    const contract = { ...f.contract, reviewSessionField: "reviewerSession" };
    json(f.root, "evidence/recheck.json", recheck);
    validateCodeReviewEvidence(f.root, contract);
    for (const [mutation, pattern] of [[{ sourceSha: "b".repeat(40) }, /fixed implementation/], [{ sessionId: review.reviewerSession }, /fresh recheck/], [{ reviewedFindingIds: [] }, /every confirmed finding/]]) {
      json(f.root, "evidence/recheck.json", { ...recheck, ...mutation });
      assert.throws(() => validateCodeReviewEvidence(f.root, contract), pattern);
    }
  } finally { f.cleanup(); }
});
