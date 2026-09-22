import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { hash } from "../../../../scripts/context-document-evidence.mjs";
import { APP, git, read, committed, snapshot, sameBytes } from "./delivery-common.mjs";

const root = fs.realpathSync(path.resolve(import.meta.dirname, "../.."));
try {
  const stage = process.argv[2];
  const attempt = process.argv[3] ?? "1";
  const scripts = { baseline: "run-invitation-tests.mjs", red: "run-learner-tests.mjs", green: "run-learner-tests.mjs", final: "verify-feature.mjs" };
  assert.ok(Object.hasOwn(scripts, stage) && /^[a-zA-Z0-9-]+$/.test(attempt), "usage: delivery:capture -- baseline|red|green|final [attempt-name]");
  const commit = git(root, ["rev-parse", "HEAD"]);
  const files = snapshot(root);
  for (const relative of Object.keys(files)) assert.ok(sameBytes(committed(root, commit, relative), read(root, relative)), "commit source and tests before capture: " + relative);
  for (const directory of ["evidence", "evidence/runs"]) {
    const target = path.join(root, directory);
    fs.mkdirSync(target, { recursive: true });
    assert.equal(fs.realpathSync(target), target, "evidence directory must not be a link");
  }
  const destination = "evidence/runs/" + stage + "-" + attempt;
  for (const ext of [".json", ".txt"]) assert.ok(!fs.existsSync(path.join(root, destination + ext)), "capture exists; use a new attempt name");
  const startedAt = new Date().toISOString();
  const script = scripts[stage];
  const result = spawnSync(process.execPath, ["scripts/" + script], { cwd: path.join(root, APP), encoding: "utf8" });
  const finishedAt = new Date().toISOString();
  const exitCode = result.status ?? 1;
  assert.deepEqual(snapshot(root), files, "test command changed source or tests");
  const output = "Command: node scripts/" + script + "\nRepository commit: " + commit + "\nStarted at: " + startedAt + "\nFinished at: " + finishedAt + "\n\n" + (result.stdout ?? "") + (result.stderr ?? "") + "\nexit code: " + exitCode + "\n";
  fs.writeFileSync(path.join(root, destination + ".txt"), output, { flag: "wx" });
  const record = { stage, commit, startedAt, finishedAt, exitCode, files, output: destination + ".txt", outputSha256: hash(output) };
  fs.writeFileSync(path.join(root, destination + ".json"), JSON.stringify(record, null, 2) + "\n", { flag: "wx" });
  console.log("Saved " + destination + ".json (actual exit code " + exitCode + ").");
  const expected = stage === "baseline" || stage === "red" ? exitCode !== 0 : exitCode === 0;
  if (!expected) { console.error("Unexpected result for this stage; retain the capture and investigate."); process.exitCode = 1; }
} catch (error) {
  console.error("Delivery capture failed: " + error.message);
  process.exitCode = 1;
}
