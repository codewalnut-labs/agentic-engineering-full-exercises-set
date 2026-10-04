import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { test } from "node:test";
import { checkCapture, validatePhaseEvidence } from "./challenge-phase-evidence.mjs";
import { hash } from "./context-document-evidence.mjs";

// Synthetic Git histories test the harness; these are not learner or agent runs.
function fixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "challenge-phases-"));
  const write = (file, text) => { fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true }); fs.writeFileSync(path.join(root, file), text); };
  const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: "pipe" }).trim();
  const commit = () => { git("add", "."); git("commit", "-qm", "synthetic fixture"); return git("rev-parse", "HEAD"); };
  try {
    git("init", "-q"); git("config", "user.email", "fixture@example.invalid"); git("config", "user.name", "Verifier fixture");
    write("app/rules.mjs", "export const value = 1;\n");
    write("app/package.json", JSON.stringify({ scripts: { observe: "node -e \"console.log('PASS observed')\"" } }));
    const starting = commit();
    write("app/rules.test.mjs", "// original characterization\n"); const prepared = commit();
    write("app/rules.mjs", "export const value = Number(1);\n"); commit();
    write("app/rules.mjs", "const result = 1; export const value = result;\n"); const source = commit();
    const contract = { sourceArtifact: "evidence/history.json", sourceField: "sourceSha", preparedField: "characterizationSha", preparedFiles: ["app/rules.test.mjs"], productionFiles: ["app/rules.mjs"], starterSources: { "app/rules.mjs": hash("export const value = 1;\n") }, checkCaptures: {} };
    write("evidence/before.md", "Starting commit: " + starting + "\n");
    write("evidence/after.md", "Starting commit: " + starting + "\nImplementation commit: " + source + "\n");
    write("evidence/history.json", JSON.stringify({ characterizationSha: prepared, sourceSha: source })); commit();
    run({ root, write, git, commit, contract, starting, prepared, source });
  } finally {
    assert.ok(path.resolve(root).startsWith(path.resolve(os.tmpdir()) + path.sep));
    fs.rmSync(root, { recursive: true, force: true });
  }
}
test("accepts multiple focused implementation commits followed by evidence", () => fixture(({ root, contract }) => validatePhaseEvidence(root, contract)));
test("rejects a substituted starter", () => fixture(({ root, contract }) => {
  contract.starterSources["app/rules.mjs"] = hash("different starter");
  assert.throws(() => validatePhaseEvidence(root, contract), /supplied starter/);
}));
test("rejects changes to the precommitted characterization", () => fixture(({ root, write, contract }) => {
  write("app/rules.test.mjs", "// weakened assertion\n");
  assert.throws(() => validatePhaseEvidence(root, contract), /precommitted test/);
}));
test("rejects out-of-scope changes even when later reverted", () => fixture(({ root, write, git, commit, contract }) => {
  write("app/unrelated.mjs", "unrelated"); commit(); git("rm", "app/unrelated.mjs"); commit();
  assert.throws(() => validatePhaseEvidence(root, contract), /out-of-scope/);
}));
test("a red characterization requires the recorded failure, SHA, and command", () => {
  const sha = "a".repeat(40), check = { script: "test:characterization", exitCode: 1, markers: ["ERR_ASSERTION"] };
  const text = "Command: npm run test:characterization\nRepository commit: " + sha + "\nStarted at: 2026-01-01T00:00:00Z\nFinished at: 2026-01-01T00:00:01Z\nERR_ASSERTION\nexit code: 1\n";
  checkCapture(text, check, sha);
  assert.throws(() => checkCapture(text, check, "b".repeat(40)), /wrong commit/);
  assert.throws(() => checkCapture(text.replace("exit code: 1", "exit code: 0"), check, sha), /exit code/);
  assert.throws(() => checkCapture(text.replace("ERR_ASSERTION", "syntax error"), check, sha), /missing/);
});
test("recorder captures an actual command and refuses overwriting its proof", () => fixture(({ root, write, git, commit }) => {
  const capturePath = path.resolve(import.meta.dirname, "capture-challenge-check.mjs");
  const contract = { checkCaptures: { baseline: { script: "observe", path: "evidence/commands/baseline.txt", shaField: "starting", markers: ["PASS observed"] } } };
  write("app/evidence-contract.json", JSON.stringify(contract)); const sha = commit();
  write("evidence/before.md", "Starting commit: " + sha + "\n");
  const npmPath = process.env.npm_execpath;
  assert.ok(npmPath, "run tests through npm so the capture can execute npm");
  const run = () => spawnSync(process.execPath, [capturePath, "baseline"], { cwd: path.join(root, "app"), encoding: "utf8", env: { ...process.env, npm_execpath: npmPath } });
  const first = run(); assert.equal(first.status, 0, first.stderr);
  checkCapture(fs.readFileSync(path.join(root, contract.checkCaptures.baseline.path), "utf8"), contract.checkCaptures.baseline, git("rev-parse", "HEAD"));
  const second = run(); assert.notEqual(second.status, 0); assert.match(second.stderr, /preserve the previous capture/);
}));
