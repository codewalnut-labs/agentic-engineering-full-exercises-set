import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";

const app = process.cwd();
const root = path.resolve(app, "..");
const contract = JSON.parse(fs.readFileSync(path.join(app, "evidence-contract.json"), "utf8"));
const name = process.argv[2];
const check = contract.checkCaptures[name];
assert.ok(check && process.argv.length === 3, "use npm run proof:capture -- <check name from the evidence contract>");
const git = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: "pipe" }).trim();
const source = check.phase === "starting" ? null : JSON.parse(fs.readFileSync(path.join(root, contract.sourceArtifact), "utf8")).sourceSha;
const starting = fs.readFileSync(path.join(root, "evidence/before.md"), "utf8").match(/^Starting commit: ([a-f0-9]{40})\r?$/m)?.[1];
const expected = check.phase === "starting" ? starting : source;
const head = git(["rev-parse", "HEAD"]);
assert.equal(head, expected, "capture this check at its recorded starting or implementation commit");
function cleanSource() {
  const changed = git(["diff", "--name-only", "--relative", "HEAD", "--", "."]);
  const untracked = git(["ls-files", "--others", "--exclude-standard", "--", "."]);
  for (const file of (changed + "\n" + untracked).split(/\r?\n/).filter(Boolean)) {
    assert.ok(file.startsWith("evidence/"), "commit source changes before capture: " + file);
  }
}
cleanSource();
const target = path.resolve(root, check.path);
assert.ok(target.startsWith(path.join(root, "evidence") + path.sep), "capture path must stay in evidence");
assert.ok(!fs.lstatSync(target, { throwIfNoEntry: false }), "preserve the previous capture before rerunning: " + check.path);
fs.mkdirSync(path.dirname(target), { recursive: true });
const realTarget = path.join(fs.realpathSync(path.dirname(target)), path.basename(target));
assert.ok(realTarget.startsWith(fs.realpathSync(root) + path.sep), "capture path escapes through a link");
assert.ok(process.env.npm_execpath, "run through npm run proof:capture");
const startedAt = new Date().toISOString();
const result = spawnSync(process.execPath, [process.env.npm_execpath, "run", check.script], { cwd: app, encoding: "utf8" });
const finishedAt = new Date().toISOString();
const code = Number.isInteger(result.status) ? result.status : 1;
const transcript = [
  "Command: npm run " + check.script, "Repository commit: " + head, "Source SHA: " + head,
  "Started at: " + startedAt, "Finished at: " + finishedAt, "", "STDOUT", result.stdout ?? "",
  "STDERR", result.stderr ?? result.error?.message ?? "", "exit code: " + code, "",
].join("\n");
fs.writeFileSync(target, transcript);
assert.equal(git(["rev-parse", "HEAD"]), head, "commit changed during capture; retain this failed attempt");
cleanSource();
process.stdout.write(result.stdout ?? "");
process.stderr.write(result.stderr ?? "");
process.exitCode = code;
