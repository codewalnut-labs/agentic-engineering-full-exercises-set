import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { test } from "node:test";

const git = (root, args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: "pipe" }).trim();
function fixture(adapterSource) {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "review-runner-test-"));
  const root = path.join(temporary, "repo");
  const app = path.join(root, "app");
  for (const folder of ["scripts", "eval/diffs", "skills/regression-review"]) fs.mkdirSync(path.join(app, folder), { recursive: true });
  for (const file of ["run-review-session.mjs", "review-eval-verification.mjs"]) fs.copyFileSync(path.join(import.meta.dirname, file), path.join(app, "scripts", file));
  fs.writeFileSync(path.join(app, "eval/cases.json"), JSON.stringify([{ id: "synthetic-case", title: "Synthetic safe case", diff: "./diffs/safe.diff", expectation: "conforms", acceptanceRules: ["Preserve the synthetic safe result."] }]));
  fs.writeFileSync(path.join(app, "eval/diffs/safe.diff"), "diff --git a/example.js b/example.js\n--- a/example.js\n+++ b/example.js\n@@ -1 +1 @@\n-return 1;\n+return 1 + 0;\n");
  fs.writeFileSync(path.join(app, "skills/regression-review/SKILL.md"), "Synthetic starter skill for recorder testing only.\n");
  const adapter = path.join(temporary, "synthetic-adapter.mjs");
  fs.writeFileSync(adapter, adapterSource);
  git(root, ["init"]); git(root, ["config", "core.autocrlf", "false"]);
  git(root, ["config", "user.name", "Runner Test"]); git(root, ["config", "user.email", "runner@example.test"]);
  git(root, ["add", "."]); git(root, ["commit", "-m", "synthetic starter"]);
  const run = (lane) => spawnSync(process.execPath, ["scripts/run-review-session.mjs", "--lane", lane, "--case", "synthetic-case", "--agent", "synthetic", "--model", "synthetic", "--tools", "read", "--permissions", "read-only", "--time-limit", "1", "--adapter", adapter], { cwd: app, encoding: "utf8" });
  return { root, app, run, cleanup: () => fs.rmSync(temporary, { recursive: true, force: true }) };
}
const validAdapter = 'import fs from "node:fs";\nfs.readFileSync(0, "utf8");\n// Synthetic adapter tests process capture only; it is not a learner agent.\nconsole.log(JSON.stringify({runNonce: process.env.REVIEW_RUN_NONCE, sessionId: "synthetic-" + process.env.REVIEW_RUN_NONCE, mergeDecision: "approve", findings: []}));\n';

test("runner records both commits and refuses to replace a completed review", () => {
  const f = fixture(validAdapter);
  try {
    const initial = git(f.root, ["rev-parse", "HEAD"]);
    let result = f.run("before"); assert.equal(result.status, 0, result.stderr);
    const beforePath = path.join(f.root, "evidence/runs/before/synthetic-case.json");
    const before = fs.readFileSync(beforePath, "utf8");
    assert.equal(JSON.parse(before).sourceSha, initial);
    assert.equal(JSON.parse(before).skillSha256, null);
    result = f.run("before"); assert.notEqual(result.status, 0); assert.match(result.stderr, /previous attempt/);
    assert.equal(fs.readFileSync(beforePath, "utf8"), before);
    fs.appendFileSync(path.join(f.app, "skills/regression-review/SKILL.md"), "An improved synthetic method.\n");
    git(f.root, ["add", "app/skills"]); git(f.root, ["commit", "-m", "synthetic skill revision"]);
    result = f.run("after"); assert.equal(result.status, 0, result.stderr);
    const after = JSON.parse(fs.readFileSync(path.join(f.root, "evidence/runs/after/synthetic-case.json")));
    assert.equal(after.sourceSha, git(f.root, ["rev-parse", "HEAD"]));
    assert.match(after.skillSha256, /^[a-f0-9]{64}$/);
    assert.notEqual(after.runNonce, JSON.parse(before).runNonce);
  } finally { f.cleanup(); }
});
test("runner rejects dirty source and retains a failed adapter response", () => {
  const f = fixture('console.log("Synthetic partial response"); console.error("Synthetic adapter failure"); process.exitCode = 4;\n');
  try {
    const skill = path.join(f.app, "skills/regression-review/SKILL.md");
    const original = fs.readFileSync(skill, "utf8");
    fs.appendFileSync(skill, "Uncommitted edit.\n");
    let result = f.run("before"); assert.notEqual(result.status, 0); assert.match(result.stderr, /commit source changes/);
    assert.ok(!fs.existsSync(path.join(f.root, "evidence/prompts/before/synthetic-case.md")));
    fs.writeFileSync(skill, original);
    result = f.run("before"); assert.notEqual(result.status, 0); assert.match(result.stderr, /adapter failed with 4/);
    const transcript = path.join(f.root, "evidence/transcripts/before-synthetic-case.json");
    assert.match(fs.readFileSync(transcript, "utf8"), /Synthetic partial response/);
    assert.match(fs.readFileSync(transcript + ".stderr.txt", "utf8"), /Synthetic adapter failure/);
    assert.ok(!fs.existsSync(path.join(f.root, "evidence/runs/before/synthetic-case.json")));
    result = f.run("before"); assert.notEqual(result.status, 0); assert.match(result.stderr, /previous attempt/);
  } finally { f.cleanup(); }
});
