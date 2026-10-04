import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { recordedSha } from "./economics-evidence.mjs";

const app = process.cwd();
const root = path.resolve(app, "..");
const starting = recordedSha(fs.readFileSync(path.join(root, "evidence/before.md"), "utf8"), "Starting commit");
const prefix = execFileSync("git", ["rev-parse", "--show-prefix"], { cwd: app, encoding: "utf8" }).trim();
const original = execFileSync("git", ["show", starting + ":" + prefix + "src/migration/exportButton.mjs"], { cwd: app });
const test = fs.readFileSync(path.join(app, "tests/export-button.test.mjs"));
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "scope-regression-"));
try {
  fs.mkdirSync(path.join(temporary, "src/migration"), { recursive: true });
  fs.mkdirSync(path.join(temporary, "tests"));
  fs.writeFileSync(path.join(temporary, "src/migration/exportButton.mjs"), original);
  fs.writeFileSync(path.join(temporary, "tests/export-button.test.mjs"), test);
  const run = (cwd) => spawnSync(process.execPath, ["tests/export-button.test.mjs"], { cwd, encoding: "utf8" });
  const red = run(temporary);
  const redOutput = (red.stdout ?? "") + (red.stderr ?? "");
  process.stdout.write("STARTER\n" + redOutput + "\nexit code: " + red.status + "\n");
  assert.equal(red.status, 1, "learner test must fail against the original helper");
  assert.match(redOutput, /ERR_ASSERTION/, "baseline failure must be a behavior assertion");
  assert.match(redOutput, /ds-secondary/, "failure must expose the requested export variant");
  assert.match(redOutput, /legacy-primary/, "failure must expose the original variant");
  assert.doesNotMatch(redOutput, /ERR_MODULE_NOT_FOUND|SyntaxError|ReferenceError|TypeError/, "unrelated failures do not prove the regression");
  fs.writeFileSync(path.join(temporary, "src/migration/exportButton.mjs"), fs.readFileSync(path.join(app, "src/migration/exportButton.mjs")));
  const green = run(temporary);
  process.stdout.write("FIXED\n" + (green.stdout ?? "") + (green.stderr ?? "") + "\nexit code: " + green.status + "\n");
  assert.equal(green.status, 0, "identical learner test must pass against the fixed helper");
  console.log("PASS identical learner tests fail for the missing export behavior and pass after the change");
} finally {
  const resolved = fs.realpathSync(temporary);
  assert.ok(resolved.startsWith(fs.realpathSync(os.tmpdir()) + path.sep) && path.basename(resolved).startsWith("scope-regression-"));
  fs.rmSync(resolved, { recursive: true, force: true });
}
