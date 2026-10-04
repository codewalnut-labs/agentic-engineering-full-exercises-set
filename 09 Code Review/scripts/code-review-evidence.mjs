import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

export function validateCodeReviewEvidence(root, contract) {
  const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replaceAll("\r\n", "\n");
  const json = (file) => JSON.parse(read(file));
  const git = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: "pipe" }).trim();
  const sourceSha = json(contract.sourceArtifact).sourceSha;
  assert.match(sourceSha ?? "", /^[a-f0-9]{40}$/, "record the implementation commit");
  const starting = read("evidence/before.md").match(/^Starting commit: ([a-f0-9]{40})$/m)?.[1];
  assert.ok(starting, "before.md must identify the starting commit");
  git(["merge-base", "--is-ancestor", starting, sourceSha]);
  git(["merge-base", "--is-ancestor", sourceSha, "HEAD"]);
  assert.ok(read("evidence/after.md").includes("Implementation commit: " + sourceSha), "after.md must identify the measured implementation");
  for (const file of git(["diff", "--name-only", "--relative", sourceSha, "--", "."]).split(/\r?\n/).filter(Boolean)) {
    assert.ok(file.startsWith("evidence/"), "source changed after the measured implementation: " + file);
  }
  for (const file of git(["ls-files", "--others", "--exclude-standard", "--", "."]).split(/\r?\n/).filter(Boolean)) {
    assert.ok(file.startsWith("evidence/"), "uncommitted source file: " + file);
  }
  for (const check of Object.values(contract.checkCaptures)) {
    const capture = read(check.path);
    const measured = check.phase === "starting" ? starting : sourceSha;
    assert.ok(capture.startsWith("Command: npm run " + check.script + "\n"), "capture the exact check: " + check.path);
    assert.ok(capture.includes("Repository commit: " + measured + "\n"), "stale check capture: " + check.path);
    assert.match(capture, /\nexit code: 0\s*$/, "check must succeed: " + check.path);
    const start = Date.parse(capture.match(/^Started at: (.+)$/m)?.[1]);
    const finish = Date.parse(capture.match(/^Finished at: (.+)$/m)?.[1]);
    assert.ok(Number.isFinite(start) && Number.isFinite(finish) && finish >= start, "invalid capture timestamps");
  }
  if (!contract.reviewSessionField) return;
  const review = json("evidence/review.json");
  const initialId = review[contract.reviewSessionField];
  const initial = read("evidence/review-session.txt");
  assert.ok(initial.length >= 100 && initial.includes(initialId) && initial.includes(review.headSha), "retain the initial reviewer session and reviewed head");
  const recheck = json("evidence/recheck.json");
  assert.equal(recheck.schemaVersion, 1, "unsupported recheck schema");
  assert.equal(recheck.sourceSha, sourceSha, "recheck must assess the fixed implementation");
  assert.ok(typeof recheck.sessionId === "string" && recheck.sessionId.length >= 8 && recheck.sessionId !== initialId, "use a fresh recheck session");
  assert.ok(recheck.agent && recheck.model && Number.isFinite(Date.parse(recheck.startedAt)), "record the actual recheck conditions");
  assert.equal(recheck.decision, "ready-for-review", "resolve confirmed blockers before completion");
  assert.deepEqual(recheck.remainingBlockers, [], "unresolved blockers remain");
  const fixed = review.findings.filter((finding) => finding.decision === "fix").map((finding) => finding.id).sort();
  assert.deepEqual([...(recheck.reviewedFindingIds ?? [])].sort(), fixed, "recheck every confirmed finding");
  const transcript = read("evidence/recheck-session.txt");
  assert.ok(transcript.length >= 100 && transcript.includes(recheck.sessionId) && transcript.includes(sourceSha), "retain the actual recheck session for the fixed commit");
  // Metadata and transcript binding support inspection; a human still judges review quality and independence.
}
