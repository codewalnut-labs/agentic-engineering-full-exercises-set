import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync, spawnSync } from "node:child_process";
import { test } from "node:test";
import { digest, runBatch, validateRawRuns } from "./run-workflow-batch.mjs";
import { computeBenchmark } from "./workflow-grading.mjs";
import { createSnapshotPatch } from "./workflow-submission-verification.mjs";

test("synthetic adapter batches preserve raw results and a supported rejection passes verification", () => {
  const temporary = fs.realpathSync.native(fs.mkdtempSync(path.join(os.tmpdir(), "workflow-batch-test-")));
  const root = path.join(temporary, "exercise"), appRoot = path.join(root, "workflow-eval-app");
  const write = (file, content) => { const absolute = path.join(root, file); fs.mkdirSync(path.dirname(absolute), { recursive: true }); fs.writeFileSync(absolute, content); };
  const git = (...args) => execFileSync("git", args, { cwd: temporary, encoding: "utf8", stdio: "pipe" }).trim();
  const commit = () => { git("add", "exercise/workflow-eval-app", "exercise/docs"); git("commit", "-qm", "synthetic fixture"); return git("rev-parse", "HEAD"); };
  try {
    fs.mkdirSync(appRoot, { recursive: true }); git("init", "-q"); git("config", "user.name", "Fixture"); git("config", "user.email", "fixture@example.invalid"); git("config", "core.autocrlf", "false");
    const adapter = path.join(temporary, "adapter.mjs");
    fs.writeFileSync(adapter, 'import fs from "node:fs"; import { randomUUID } from "node:crypto"; const input=JSON.parse(fs.readFileSync(0,"utf8")); if (Object.keys(input).sort().join(",")!=="request,responseSchema,workflow") throw Error("answers leaked"); const sessionId="synthetic-"+randomUUID(); console.log(JSON.stringify({sessionId,tokens:100,metricsSource:"synthetic-fixture:"+sessionId,response:{actions:[{sequence:1,type:"scope",target:"queue-filter",result:"confirmed"}]}}));');
    const cases = [{ id: "train-case", split: "train", request: "request one", assertions: [{ id: "fresh-final-gate", critical: true }] }, { id: "heldout-case", split: "heldout", request: "request two", assertions: [{ id: "fresh-final-gate", critical: true }] }];
    const initial = "baseline workflow\n", workflowFile = "exercise/workflow-eval-app/workflow/instructions.md";
    write("workflow-eval-app/workflow/instructions.md", initial); write("workflow-eval-app/fixtures/workflow-baseline.md", initial);
    write("workflow-eval-app/evals/replay-cases.json", JSON.stringify(cases)); write("docs/action-schema.md", "synthetic response schema\n");
    const baselineSha = commit();
    const config = { command: process.execPath, args: [adapter], agent: "synthetic-agent", model: "synthetic-model", settingsHash: "settings", toolsHash: "tools", permissionsHash: "permissions", timeLimitMinutes: 1 };
    const baseline = runBatch({ appRoot, lane: "baseline", cases, config, history: { baselineSha } });
    write("workflow-eval-app/workflow/instructions.md", "Confirm scope and clarify. Use authoritative evidence; record contradiction. Select context. On a failed gate, stop. Fresh verification needs an exit code before completion.\n");
    const candidateSha = commit();
    const candidate = runBatch({ appRoot, lane: "candidate", cases, config, history: { candidateSha } });
    assert.deepEqual(validateRawRuns(root, cases, [...baseline, ...candidate], config), []);
    assert.throws(() => runBatch({ appRoot, lane: "candidate", cases, config, history: { candidateSha } }), /archive/);
    const changed = structuredClone(candidate); changed[0].tokens += 1;
    assert.ok(validateRawRuns(root, cases, changed, config).length);
    const benchmark = computeBenchmark(cases, baseline, candidate); assert.equal(benchmark.adopt, false);
    write("evidence/runner.json", JSON.stringify(config)); write("evidence/history.json", JSON.stringify({ baselineSha, candidateSha }));
    write("evidence/benchmark.json", JSON.stringify(benchmark));
    write("evidence/before.md", `Starting commit: ${baselineSha}\nImplementation commit: ${baselineSha}\n`);
    write("evidence/after.md", `Starting commit: ${baselineSha}\nImplementation commit: ${candidateSha}\n`);
    write("evidence/before.patch", createSnapshotPatch(workflowFile, initial));
    write("evidence/after.patch", execFileSync("git", ["diff", "--binary", "--full-index", baselineSha, candidateSha, "--", workflowFile], { cwd: temporary }));
    write("evidence/failure-clusters.md", "TR-01 TR-12 scope-before-action evidence-authority completion-verification context-selection clarification-boundary frequency workflow change\n");
    const report = "Decision: reject\nheld-out train variance median tokens duration critical limitation adopt\n";
    write("evidence/adoption.md", report);
    const verify = () => spawnSync(process.execPath, [path.join(import.meta.dirname, "verify-workflow-results.mjs")], { cwd: appRoot, encoding: "utf8" });
    const accepted = verify(); assert.equal(accepted.status, 0, accepted.stderr); assert.match(accepted.stdout, /decision: reject/);
    write("evidence/adoption.md", report.replace("Decision: reject", "Decision: adopt")); assert.notEqual(verify().status, 0);
    write("evidence/adoption.md", report);
    const rawFile = path.join(root, candidate[0].rawPath); const raw = fs.readFileSync(rawFile, "utf8");
    assert.equal(digest(raw), candidate[0].rawSha256); fs.writeFileSync(rawFile, raw + " ");
    assert.match(verify().stderr, /raw hash mismatch/);
  } finally {
    assert.ok(path.resolve(temporary).startsWith(fs.realpathSync.native(os.tmpdir()) + path.sep));
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});
