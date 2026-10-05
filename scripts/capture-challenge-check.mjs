import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { field } from "./challenge-phase-evidence.mjs";

const app = process.cwd(), root = path.resolve(app, "..");
const contract = JSON.parse(fs.readFileSync(path.join(app, "evidence-contract.json"), "utf8"));
const check = contract.checkCaptures[process.argv[2]];
assert.ok(check && process.argv.length === 3, "use npm run proof:capture -- <check name>");
const history = check.shaField === "starting" ? null : JSON.parse(fs.readFileSync(path.join(root, contract.sourceArtifact), "utf8"));
const expected = check.shaField === "starting" ? field(fs.readFileSync(path.join(root, "evidence/before.md"), "utf8"), "Starting commit") : history[check.shaField];
const git = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: "pipe" }).trim();
const head = git(["rev-parse", "HEAD"]);
assert.equal(head, expected, "capture must run at the recorded phase commit");
function clean() {
  const changed = git(["diff", "--name-only", "--relative", "HEAD", "--", "."]);
  const untracked = git(["ls-files", "--others", "--exclude-standard", "--", "."]);
  for (const file of (changed + "\n" + untracked).split(/\r?\n/).filter(Boolean)) assert.ok(file.startsWith("evidence/"), "commit source before capture: " + file);
}
clean();
const target = path.resolve(root, check.path);
assert.ok(target.startsWith(path.join(root, "evidence") + path.sep), "capture must stay inside evidence");
assert.ok(!fs.lstatSync(target, { throwIfNoEntry: false }), "preserve the previous capture before rerunning");
fs.mkdirSync(path.dirname(target), { recursive: true });
assert.ok(fs.realpathSync(path.dirname(target)).startsWith(fs.realpathSync(root) + path.sep), "capture path escapes through a link");
assert.ok(process.env.npm_execpath, "run the capture through npm");
const start = new Date().toISOString();
const result = spawnSync(process.execPath, [process.env.npm_execpath, "run", check.script], { cwd: app, encoding: "utf8" });
const end = new Date().toISOString(), code = Number.isInteger(result.status) ? result.status : 1;
fs.writeFileSync(target, ["Command: npm run " + check.script, "Repository commit: " + head, "Started at: " + start, "Finished at: " + end, "", "STDOUT", result.stdout ?? "", "STDERR", result.stderr ?? result.error?.message ?? "", "exit code: " + code, ""].join("\n"));
assert.equal(git(["rev-parse", "HEAD"]), head, "HEAD changed during capture");
clean();
process.stdout.write(result.stdout ?? ""); process.stderr.write(result.stderr ?? "");
process.exitCode = code;
