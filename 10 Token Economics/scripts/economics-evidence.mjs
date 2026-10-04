import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { hash } from "../../scripts/context-document-evidence.mjs";

const git = (root, args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: "pipe" }).trim();
const lines = (text) => text.split(/\r?\n/).filter(Boolean);
export function recordedSha(text, name) {
  const value = text.match(new RegExp("^" + name + ": ([a-f0-9]{40})\\r?$", "m"))?.[1];
  assert.ok(value, name + " must be a full SHA on its own line");
  return value;
}

export function verifyCapture(text, check, sha) {
  text = text.replaceAll("\r\n", "\n");
  assert.ok(text.startsWith("Command: npm run " + check.script + "\n"), "capture uses the wrong command");
  assert.ok(text.includes("\nRepository commit: " + sha + "\n"), "capture does not match its source commit");
  assert.ok(text.includes("\nSource SHA: " + sha + "\n"), "capture source SHA does not match");
  assert.match(text, /\nexit code: 0\s*$/, "captured check failed");
  const start = Date.parse(text.match(/^Started at: (.+)$/m)?.[1]);
  const end = Date.parse(text.match(/^Finished at: (.+)$/m)?.[1]);
  assert.ok(Number.isFinite(start) && Number.isFinite(end) && end >= start, "invalid capture timestamps");
  for (const marker of check.markers) assert.ok(text.includes(marker), "capture is missing " + marker);
}

export function verifyImplementationRange(root, contract, starting, source, planSha) {
  const prefix = git(root, ["rev-parse", "--show-prefix"]);
  assert.match(source ?? "", /^[a-f0-9]{40}$/, "sourceSha must be a full SHA");
  assert.notEqual(starting, source, "implementation must follow the starter");
  git(root, ["merge-base", "--is-ancestor", starting, source]);
  git(root, ["merge-base", "--is-ancestor", source, "HEAD"]);
  for (const [file, expected] of Object.entries(contract.starterSources)) {
    const content = execFileSync("git", ["show", starting + ":" + prefix + file], { cwd: root });
    assert.equal(hash(content), expected, "starting commit does not contain the supplied starter: " + file);
  }
  const allowed = contract.allowedSourceFiles.map((file) => prefix + file).sort();
  const changed = lines(git(root, ["diff", "--name-only", starting, source])).filter((file) => !file.startsWith(prefix + "evidence/")).sort();
  assert.deepEqual(changed, allowed, "complete implementation must change only the required source and test files");
  // Inspect every commit, including changes later reverted out of the net diff.
  const touched = lines(git(root, ["log", "--format=", "--name-only", starting + ".." + source]));
  for (const file of touched) assert.ok(allowed.includes(file) || file.startsWith(prefix + "evidence/"), "implementation history changes out-of-scope file: " + file);
  const later = lines(git(root, ["log", "--format=", "--name-only", source + "..HEAD"]));
  for (const file of later) assert.ok(file.startsWith(prefix + "evidence/"), "later commits must contain evidence only: " + file);
  if (planSha) {
    assert.match(planSha, /^[a-f0-9]{40}$/, "planSha must be a full SHA");
    git(root, ["merge-base", "--is-ancestor", starting, planSha]);
    git(root, ["merge-base", "--is-ancestor", planSha, source]);
    const beforePlan = lines(git(root, ["log", "--format=", "--name-only", starting + ".." + planSha]));
    for (const file of beforePlan) assert.ok(file.startsWith(prefix + "evidence/"), "source changed before the plan: " + file);
  }
}

export function validateEconomicsEvidence(root, contract) {
  const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
  const metadata = JSON.parse(read(contract.sourceArtifact));
  const starting = recordedSha(read("evidence/before.md"), "Starting commit");
  assert.equal(recordedSha(read("evidence/after.md"), "Starting commit"), starting, "before and after must describe the same starter");
  assert.equal(recordedSha(read("evidence/after.md"), "Implementation commit"), metadata.sourceSha, "after report does not match the source artifact");
  verifyImplementationRange(root, contract, starting, metadata.sourceSha, metadata.planSha);
  for (const check of Object.values(contract.checkCaptures)) {
    verifyCapture(read(check.path), check, check.phase === "starting" ? starting : metadata.sourceSha);
  }
  if (contract.kind === "context") {
    const catalog = JSON.parse(read("docs/context-catalog.json"));
    const bytes = (lane) => Number(read("evidence/" + lane + ".md").match(/^\|\s*Total UTF-8 bytes\s*\|\s*(\d+)\s*\|\s*$/mi)?.[1]);
    assert.equal(bytes("before"), catalog.reduce((sum, item) => sum + item.bytes, 0), "before byte total must match the full catalog");
    assert.equal(bytes("after"), metadata.result.totalBytes, "after byte total must match the reproduced selector ledger");
  }
  if (contract.kind === "routing") {
    const score = JSON.parse(read("evidence/cost-model.json"));
    const adoption = read("evidence/adoption.md");
    assert.ok(adoption.includes(String(score.totals.savingsPercent)), "adoption.md must quote the calculated savingsPercent");
    assert.equal(adoption.match(/^Decision: (adopt|reject)\r?$/m)?.[1], score.adoption, "adoption.md decision must match all measured gates");
  }
  console.log("PASS starter identity, complete implementation history, and captured economics checks");
}
