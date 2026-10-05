import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { hash } from "./context-document-evidence.mjs";

const git = (root, args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: "pipe" }).trim();
const lines = (text) => text.split(/\r?\n/).filter(Boolean);
export function field(text, name) {
  const value = text.match(new RegExp("^" + name + ": ([a-f0-9]{40})\\r?$", "m"))?.[1];
  assert.ok(value, name + " must be a full commit SHA on its own line");
  return value;
}
export function checkCapture(text, check, sha) {
  text = text.replaceAll("\r\n", "\n");
  assert.ok(text.startsWith("Command: npm run " + check.script + "\n"), "wrong captured command");
  assert.ok(text.includes("\nRepository commit: " + sha + "\n"), "capture is from the wrong commit");
  assert.ok(text.trimEnd().endsWith("\nexit code: " + (check.exitCode ?? 0)), "unexpected captured exit code");
  const start = Date.parse(text.match(/^Started at: (.+)$/m)?.[1]);
  const end = Date.parse(text.match(/^Finished at: (.+)$/m)?.[1]);
  assert.ok(Number.isFinite(start) && Number.isFinite(end) && end >= start, "invalid capture times");
  for (const marker of check.markers ?? []) assert.ok(text.includes(marker), "capture is missing " + marker);
}
export function validatePhaseEvidence(root, contract) {
  const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
  const history = JSON.parse(read(contract.sourceArtifact));
  const starting = field(read("evidence/before.md"), "Starting commit");
  const source = history[contract.sourceField];
  assert.match(source ?? "", /^[a-f0-9]{40}$/, "record the implementation SHA");
  assert.equal(field(read("evidence/after.md"), "Starting commit"), starting);
  assert.equal(field(read("evidence/after.md"), "Implementation commit"), source);
  git(root, ["merge-base", "--is-ancestor", starting, source]);
  git(root, ["merge-base", "--is-ancestor", source, "HEAD"]);
  const prefix = git(root, ["rev-parse", "--show-prefix"]);
  for (const [file, digest] of Object.entries(contract.starterSources ?? {})) {
    assert.equal(hash(execFileSync("git", ["show", starting + ":" + prefix + file], { cwd: root })), digest, "starting commit must contain the supplied starter: " + file);
  }
  const prepared = contract.preparedField ? history[contract.preparedField] : starting;
  assert.match(prepared ?? "", /^[a-f0-9]{40}$/, "record the preparation SHA");
  git(root, ["merge-base", "--is-ancestor", starting, prepared]);
  git(root, ["merge-base", "--is-ancestor", prepared, source]);
  const preparedFiles = (contract.preparedFiles ?? []).map((file) => prefix + file);
  const productionFiles = contract.productionFiles.map((file) => prefix + file).sort();
  const checkHistory = (from, to, allowed) => {
    for (const file of lines(git(root, ["log", "--format=", "--name-only", from + ".." + to]))) {
      assert.ok(allowed.includes(file) || file.startsWith(prefix + "evidence/"), "out-of-scope change in phase history: " + file);
    }
  };
  checkHistory(starting, prepared, preparedFiles);
  checkHistory(prepared, source, productionFiles);
  checkHistory(source, "HEAD", []);
  const actual = lines(git(root, ["diff", "--name-only", prepared, source])).filter((file) => !file.startsWith(prefix + "evidence/")).sort();
  assert.deepEqual(actual, productionFiles, "implementation must change exactly the declared production files");
  for (const file of preparedFiles) {
    const committed = execFileSync("git", ["show", prepared + ":" + file], { cwd: root });
    assert.equal(hash(committed), hash(read(file.slice(prefix.length))), "precommitted test or observation changed: " + file);
  }
  for (const check of Object.values(contract.checkCaptures)) {
    const sha = check.shaField === "starting" ? starting : history[check.shaField];
    assert.match(sha ?? "", /^[a-f0-9]{40}$/, "capture requires " + check.shaField);
    checkCapture(read(check.path), check, sha);
  }
  console.log("PASS starter identity, ordered source phases, unchanged prepared evidence, and captured checks");
}
