import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

function field(document, label) {
  const prefix = `${label}: `;
  const values = document.split("\n").filter((line) => line.startsWith(prefix));
  assert.equal(values.length, 1, `provide exactly one ${label} field`);
  return values[0].slice(prefix.length).trim();
}

export function validateReviewEvidence(root, contract) {
  const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replaceAll("\r\n", "\n");
  const sourceSha = JSON.parse(read(contract.sourceArtifact)).sourceSha;
  assert.match(sourceSha ?? "", /^[a-f0-9]{40}$/, "generated proof must identify the implementation commit");
  const before = read("evidence/before.md");
  const startingSha = before.match(/^Starting commit: ([a-f0-9]{40})$/m)?.[1];
  assert.ok(startingSha, "before.md must identify the starting commit");
  execFileSync("git", ["merge-base", "--is-ancestor", startingSha, sourceSha], { cwd: root, stdio: "pipe" });
  assert.ok(read("evidence/after.md").includes(`Implementation commit: ${sourceSha}`), "after.md must name the measured implementation commit");
  const summary = read("evidence/pr-summary.md");
  assert.ok(field(summary, "Title").length >= 10, "provide a meaningful corrected PR title");
  assert.equal(field(summary, "Source SHA"), sourceSha, "PR summary must name the measured implementation commit");
  assert.equal(field(summary, "Decision"), contract.reviewDecision, "PR summary must state the supported review decision");
  const response = read("evidence/review-response.md");
  assert.equal(field(response, "Reviewed implementation commit"), sourceSha, "reviewer response must address the measured implementation commit");
  assert.equal(field(response, "Reviewer comment"), contract.reviewCommentId, "reviewer response must address the supplied comment");
  assert.equal(field(response, "PR decision"), contract.reviewDecision, "reviewer response must state the supported review decision");
  for (const file of contract.sourceArtifacts) {
    assert.equal(JSON.parse(read(file)).sourceSha, sourceSha, `${file} refers to a different implementation`);
  }
  const capture = read("evidence/commands/checks.txt");
  assert.ok(capture.startsWith(`Command: npm run ${contract.proofScript}\n`), "capture the required proof command");
  assert.ok(capture.includes(`Repository commit: ${sourceSha}\n`), "proof command must check the measured implementation commit");
  assert.match(capture, /\nexit code: 0\s*$/, "the proof command must succeed");
  const startedAt = Date.parse(capture.match(/^Started at: (.+)$/m)?.[1]);
  const finishedAt = Date.parse(capture.match(/^Finished at: (.+)$/m)?.[1]);
  assert.ok(Number.isFinite(startedAt) && Number.isFinite(finishedAt) && finishedAt >= startedAt, "invalid proof capture timestamps");
  const untracked = execFileSync("git", ["ls-files", "--others", "--exclude-standard", "--", "."], { cwd: root, encoding: "utf8" }).trim();
  for (const file of untracked.split(/\r?\n/).filter(Boolean)) {
    assert.ok(file.startsWith("evidence/"), `commit source files before verification: ${file}`);
  }
}
