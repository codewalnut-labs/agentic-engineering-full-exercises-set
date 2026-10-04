import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import test from "node:test";
import { hash } from "../../scripts/context-document-evidence.mjs";
import { verifyCapture, verifyImplementationRange } from "./economics-evidence.mjs";

// Synthetic verifier fixtures only. These are not learner submissions or agent runs.
function fixture() {
  const repository = fs.mkdtempSync(path.join(os.tmpdir(), "economics-proof-test-"));
  const root = path.join(repository, "exercise with spaces");
  const app = path.join(root, "app");
  const write = (file, text) => { const target = path.join(root, file); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, text); };
  const git = (...args) => execFileSync("git", args, { cwd: repository, encoding: "utf8", stdio: "pipe" }).trim();
  git("init", "-q"); git("config", "user.name", "Verifier fixture"); git("config", "user.email", "fixture@example.invalid"); git("config", "core.autocrlf", "false"); git("config", "commit.gpgsign", "false");
  write("app/src/feature.mjs", "export const value = 'starter';\n");
  write("app/shared.mjs", "export const untouched = true;\n");
  const contract = { mode: "observation", kind: "fixture", outputs: [{ path: "evidence/report.md", type: "markdown", headings: ["Finding"] }, { path: "evidence/result.json", type: "json" }], topics: ["behavior"], sourceRoots: ["app/src/"], requiredSkills: [], extraEvidence: ["evidence/commands/baseline.txt", "evidence/commands/implementation.txt"], sourceArtifact: "evidence/result.json", allowedSourceFiles: ["app/src/feature.mjs", "app/tests/feature.test.mjs"], starterSources: { "app/src/feature.mjs": hash("export const value = 'starter';\n") }, checkCaptures: { baseline: { script: "baseline:observe", path: "evidence/commands/baseline.txt", phase: "starting", markers: ["BASELINE OBSERVED"] }, implementation: { script: "economics:check", path: "evidence/commands/implementation.txt", phase: "implementation", markers: ["IMPLEMENTATION CHECKED"] } } };
  write("app/evidence-contract.json", JSON.stringify(contract));
  const helper = pathToFileURL(path.join(import.meta.dirname, "economics-evidence.mjs")).href;
  const generic = pathToFileURL(path.resolve(import.meta.dirname, "../../scripts/context-document-evidence.mjs")).href;
  write("app/scripts/evidence.mjs", 'import { runEvidence } from ' + JSON.stringify(generic) + ';\nimport { validateEconomicsEvidence } from ' + JSON.stringify(helper) + ';\nawait runEvidence({appRoot:process.cwd(),validate:validateEconomicsEvidence});\n');
  write("app/scripts/observe.mjs", 'console.log("BASELINE OBSERVED");\n');
  write("app/scripts/check.mjs", 'import assert from "node:assert/strict"; import {value} from "../src/feature.mjs"; assert.equal(value,"fixed"); console.log("IMPLEMENTATION CHECKED");\n');
  write("app/scripts/capture.mjs", fs.readFileSync(path.join(import.meta.dirname, "capture-economics-check.mjs")));
  write("app/scripts/final-capture.mjs", fs.readFileSync(path.resolve(import.meta.dirname, "../../scripts/capture-verification.mjs")));
  write("app/package.json", JSON.stringify({ type: "module", scripts: { "baseline:observe": "node scripts/observe.mjs", "economics:check": "node scripts/check.mjs", "proof:capture": "node scripts/capture.mjs", "evidence:capture": "node scripts/final-capture.mjs", "evidence:verify": "node scripts/check.mjs && node scripts/evidence.mjs content" } }));
  const commit = (label) => { git("add", "."); git("commit", "-qm", label); return git("rev-parse", "HEAD"); };
  const starting = commit("synthetic starter");
  const dispose = () => { const resolved = fs.realpathSync(repository); assert.ok(resolved.startsWith(fs.realpathSync(os.tmpdir()) + path.sep) && path.basename(resolved).startsWith("economics-proof-test-")); fs.rmSync(resolved, { recursive: true, force: true }); };
  return { repository, root, app, contract, starting, write, git, commit, dispose };
}
const run = (cwd, script, args = [], env = process.env) => spawnSync(process.execPath, [script, ...args], { cwd, encoding: "utf8", env });
const success = (result) => assert.equal(result.status, 0, (result.stdout ?? "") + (result.stderr ?? ""));

test("captures reject wrong commits, failures, missing proof, and reversed timestamps", () => {
  const sha = "a".repeat(40), check = { script: "economics:check", markers: ["CHECK PASSED"] };
  const text = "Command: npm run economics:check\nRepository commit: " + sha + "\nSource SHA: " + sha + "\nStarted at: 2026-01-01T00:00:00Z\nFinished at: 2026-01-01T00:00:01Z\nCHECK PASSED\nexit code: 0\n";
  verifyCapture(text, check, sha);
  assert.throws(() => verifyCapture(text, check, "b".repeat(40)), /source commit/);
  assert.throws(() => verifyCapture(text.replace("exit code: 0", "exit code: 1"), check, sha), /failed/);
  assert.throws(() => verifyCapture(text.replace("CHECK PASSED", ""), check, sha), /missing/);
  assert.throws(() => verifyCapture(text.replace("00:00:01", "00:00:00").replace("Started at: 2026-01-01", "Started at: 2026-01-02"), check, sha), /timestamps/);
});

test("history allows focused iterations and rejects changes hidden by later reverts", () => {
  const f = fixture();
  try {
    f.write("evidence/plan.md", "Synthetic pre-change plan\n"); const plan = f.commit("plan");
    f.write("app/tests/feature.test.mjs", "// Synthetic regression test fixture\n"); f.commit("test");
    f.write("app/src/feature.mjs", "export const value = 'fixed';\n"); const source = f.commit("implementation");
    verifyImplementationRange(f.root, f.contract, f.starting, source, plan);
    f.write("app/shared.mjs", "export const untouched = false;\n"); f.commit("out of scope");
    f.write("app/shared.mjs", "export const untouched = true;\n"); const reverted = f.commit("reverted");
    assert.throws(() => verifyImplementationRange(f.root, f.contract, f.starting, reverted, plan), /out-of-scope/);
    assert.throws(() => verifyImplementationRange(f.root, f.contract, f.starting, source, plan), /evidence only/);
  } finally { f.dispose(); }
});

test("history rejects a rewritten baseline and source work performed before its plan", () => {
  const f = fixture();
  try {
    f.write("app/src/feature.mjs", "export const value = 'fixed';\n"); f.commit("premature source");
    f.write("evidence/plan.md", "Synthetic late plan\n"); const plan = f.commit("late plan");
    f.write("app/tests/feature.test.mjs", "// Synthetic regression fixture\n"); const source = f.commit("test");
    assert.throws(() => verifyImplementationRange(f.root, f.contract, f.starting, source, plan), /before the plan/);
    assert.throws(() => verifyImplementationRange(f.root, f.contract, plan, source), /supplied starter/);
  } finally { f.dispose(); }
});

test("scope replay distinguishes a real behavior regression from broken or ineffective tests", () => {
  const f = fixture();
  try {
    f.write("app/src/migration/exportButton.mjs", 'export const buttonVariantFor = () => "legacy-primary";\n');
    const starting = f.commit("synthetic scope starter");
    f.write("evidence/before.md", "Starting commit: " + starting + "\n");
    f.write("app/src/migration/exportButton.mjs", 'export const buttonVariantFor = () => "ds-secondary";\n');
    f.write("app/tests/export-button.test.mjs", 'import assert from "node:assert/strict";\nimport {buttonVariantFor} from "../src/migration/exportButton.mjs";\nassert.equal(buttonVariantFor("export"), "ds-secondary");\n');
    const replay = path.join(import.meta.dirname, "replay-scope-regression.mjs");
    success(run(f.app, replay));
    f.write("app/tests/export-button.test.mjs", 'console.log("A test with no behavior assertion");\n');
    const ineffective = run(f.app, replay);
    assert.notEqual(ineffective.status, 0);
    assert.match(ineffective.stderr, /must fail against the original helper/);
    f.write("app/tests/export-button.test.mjs", 'import "./missing-file.mjs";\n');
    const broken = run(f.app, replay);
    assert.notEqual(broken.status, 0);
    assert.match(broken.stderr, /behavior assertion/);
  } finally { f.dispose(); }
});

test("real capture and sealing lifecycle passes, then rejects altered artifacts", { skip: !process.env.npm_execpath }, () => {
  const f = fixture();
  const npm = (args) => run(f.app, process.env.npm_execpath, args);
  try {
    f.write("evidence/before.md", "## Conditions\nStarting commit: " + f.starting + "\n## Findings\nSynthetic fixture, no agent session.\n## Proof\nCaptured original state.\n");
    success(npm(["run", "proof:capture", "--", "baseline"]));
    assert.notEqual(npm(["run", "proof:capture", "--", "baseline"]).status, 0, "capture cannot overwrite an earlier attempt");
    f.write("app/src/feature.mjs", "export const value = 'fixed';\n");
    assert.notEqual(npm(["run", "proof:capture", "--", "baseline"]).status, 0, "dirty source cannot be measured at the old SHA");
    f.write("app/tests/feature.test.mjs", "// Synthetic test fixture\n");
    const source = f.commit("focused fixture change");
    f.write("evidence/result.json", JSON.stringify({ sourceSha: source }));
    success(npm(["run", "proof:capture", "--", "implementation"]));
    f.write("evidence/after.md", "## Conditions\nStarting commit: " + f.starting + "\nImplementation commit: " + source + "\n## Findings\nSynthetic fixed fixture.\n## Proof\nCaptured implementation check.\n");
    f.write("evidence/comparison.md", "## Changes\nFixture value changed.\n## Verified\nCaptured output.\n## Remaining questions\nNo model execution is represented by this test.\n");
    f.write("evidence/report.md", "## Finding\nThe fixture value is fixed.\n");
    f.write("evidence/source-audit.json", JSON.stringify({ claims: [{ id: "fixture", topic: "behavior", status: "supported", reason: "The exact implementation line supports the synthetic fixture claim.", artifact: { path: "evidence/report.md", line: 2, excerpt: "The fixture value is fixed." }, sources: [{ path: "app/src/feature.mjs", line: 1, excerpt: "export const value = 'fixed';" }] }] }));
    f.commit("fixture evidence");
    success(run(f.app, "scripts/evidence.mjs", ["seal"]));
    success(npm(["run", "evidence:capture", "--", "--output", "../evidence/commands/verify.txt", "--", "npm", "run", "evidence:verify"]));
    f.commit("fixture verification");
    success(run(f.app, "scripts/evidence.mjs"));
    f.write("evidence/report.md", "## Finding\nThe fixture value is fixed.\nAn unsealed alteration.\n");
    const altered = run(f.app, "scripts/evidence.mjs");
    assert.notEqual(altered.status, 0);
    assert.match(altered.stderr, /changed since seal/);
  } finally { f.dispose(); }
});
