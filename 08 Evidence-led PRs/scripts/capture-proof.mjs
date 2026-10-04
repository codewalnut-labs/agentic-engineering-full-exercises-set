import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";

const appRoot = process.cwd();
const root = path.resolve(appRoot, "..");
const contract = JSON.parse(fs.readFileSync(path.join(appRoot, "evidence-contract.json"), "utf8"));
assert.ok(["pack:verify", "rollout:verify", "quality:verify"].includes(contract.proofScript), "unsupported proof command");
const git = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const sourceSha = JSON.parse(fs.readFileSync(path.join(root, contract.sourceArtifact), "utf8")).sourceSha;
assert.equal(git(["rev-parse", "HEAD"]), sourceSha, "capture proof at the implementation commit before adding evidence commits");
assert.equal(git(["diff", "--name-only", "HEAD", "--", "."]), "", "commit tracked changes before capturing proof");
for (const file of git(["ls-files", "--others", "--exclude-standard", "--", "."]).split(/\r?\n/).filter(Boolean)) {
  assert.ok(file.startsWith("evidence/"), `commit source files before capturing proof: ${file}`);
}
const target = path.join(root, "evidence/commands/checks.txt");
assert.ok(!fs.lstatSync(target, { throwIfNoEntry: false }), "preserve the previous checks.txt attempt before recapturing");
fs.mkdirSync(path.dirname(target), { recursive: true });
const realRoot = fs.realpathSync(root);
const realTarget = path.join(fs.realpathSync(path.dirname(target)), path.basename(target));
assert.ok(realTarget.startsWith(realRoot + path.sep), "command output must stay inside the exercise");
const npmCli = process.env.npm_execpath;
assert.ok(npmCli, "run this recorder through npm run proof:capture");
const startedAt = new Date().toISOString();
const result = spawnSync(process.execPath, [npmCli, "run", contract.proofScript], { cwd: appRoot, encoding: "utf8" });
const finishedAt = new Date().toISOString();
assert.equal(git(["rev-parse", "HEAD"]), sourceSha, "source commit changed during proof capture");
assert.equal(git(["diff", "--name-only", "HEAD", "--", "."]), "", "source changed during proof capture");
const exitCode = Number.isInteger(result.status) ? result.status : 1;
const transcript = [
  `Command: npm run ${contract.proofScript}`, `Repository commit: ${sourceSha}`,
  `Started at: ${startedAt}`, `Finished at: ${finishedAt}`, "", "STDOUT", result.stdout ?? "",
  "STDERR", result.stderr ?? result.error?.message ?? "", `exit code: ${exitCode}`, "",
].join("\n");
fs.writeFileSync(target, transcript);
process.stdout.write(result.stdout ?? "");
process.stderr.write(result.stderr ?? "");
console.log(`Captured ${contract.proofScript} with exit code ${exitCode}`);
process.exitCode = exitCode;
