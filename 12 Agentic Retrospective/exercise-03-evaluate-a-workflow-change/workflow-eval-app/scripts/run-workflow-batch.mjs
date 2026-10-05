import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { responseSha256 } from "./workflow-grading.mjs";
import { normalizeCommittedText } from "./workflow-submission-verification.mjs";

export const digest = (value) => crypto.createHash("sha256").update(value).digest("hex");
export function validateAdapterOutput(output) {
  assert.ok(output && typeof output.sessionId === "string" && output.sessionId.length >= 3, "adapter must return the actual sessionId");
  assert.ok(Number.isInteger(output.tokens) && output.tokens > 0, "adapter must return actual positive token usage");
  assert.ok(typeof output.metricsSource === "string" && output.metricsSource.includes(output.sessionId), "metricsSource must identify the session");
  assert.ok(output.response && typeof output.response === "object" && !Array.isArray(output.response), "adapter must return a structured response");
}

export function runBatch({ appRoot, lane, cases, config, history }) {
  assert.ok(["baseline", "candidate"].includes(lane), "use workflow:run -- baseline|candidate");
  assert.ok(path.isAbsolute(config.command) && Array.isArray(config.args) && config.args.every((arg) => typeof arg === "string"), "runner needs an absolute executable and string args");
  assert.ok(Number.isInteger(config.timeLimitMinutes) && config.timeLimitMinutes > 0, "runner needs a positive time limit");
  const fields = ["agent", "model", "settingsHash", "toolsHash", "permissionsHash", "timeLimitMinutes"];
  for (const field of fields.slice(0, -1)) assert.ok(typeof config[field] === "string" && config[field].length >= 3, "runner needs " + field);
  const root = path.resolve(appRoot, ".."), evidence = path.join(root, "evidence");
  const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: "pipe" }).trim();
  const head = git("rev-parse", "HEAD");
  assert.equal(head, history[lane + "Sha"], "run at the recorded lane commit");
  const clean = () => {
    for (const file of (git("diff", "--name-only", "--relative", "HEAD", "--", ".") + "\n" + git("ls-files", "--others", "--exclude-standard", "--", ".")).split(/\r?\n/).filter(Boolean)) assert.ok(file.startsWith("evidence/"), "commit source before running: " + file);
  };
  clean();
  const target = path.join(evidence, lane + "-runs.json");
  assert.ok(!fs.existsSync(target), "archive the entire previous batch before rerunning");
  const workflow = normalizeCommittedText(fs.readFileSync(path.join(appRoot, "workflow/instructions.md"), "utf8")) + "\n";
  const responseSchema = fs.readFileSync(path.join(root, "docs/action-schema.md"), "utf8").replaceAll("\r\n", "\n");
  const rawDirectory = path.join(evidence, "raw"); fs.mkdirSync(rawDirectory, { recursive: true });
  assert.ok(fs.realpathSync(rawDirectory).startsWith(fs.realpathSync(root) + path.sep), "raw output directory escapes exercise");
  const destinations = cases.flatMap((item) => [1, 2, 3].map((run) => {
    assert.match(item.id, /^[a-z0-9-]+$/, "unsafe case identifier");
    return path.join(rawDirectory, `${lane}-${item.id}-${run}.json`);
  }));
  for (const file of destinations) assert.ok(!fs.lstatSync(file, { throwIfNoEntry: false }), "archive all existing lane captures before rerunning");
  const runs = [];
  for (const item of cases) for (const run of [1, 2, 3]) {
    const input = { workflow, request: item.request, responseSchema };
    const startedAt = new Date().toISOString();
    const result = spawnSync(config.command, config.args, { cwd: appRoot, input: JSON.stringify(input), encoding: "utf8", timeout: config.timeLimitMinutes * 60000, maxBuffer: 16 * 1024 * 1024, windowsHide: true });
    const finishedAt = new Date().toISOString();
    const raw = { command: config.command, args: config.args, repositorySha: head, input, startedAt, finishedAt, durationMs: Math.max(1, Date.parse(finishedAt) - Date.parse(startedAt)), exitCode: Number.isInteger(result.status) ? result.status : 1, stdout: result.stdout ?? "", stderr: result.stderr ?? result.error?.message ?? "" };
    const rawPath = `evidence/raw/${lane}-${item.id}-${run}.json`;
    const rawText = JSON.stringify(raw, null, 2) + "\n";
    fs.writeFileSync(path.join(root, rawPath), rawText);
    assert.equal(raw.exitCode, 0, "adapter failed; original capture retained at " + rawPath);
    const output = JSON.parse(raw.stdout); validateAdapterOutput(output);
    runs.push({ caseId: item.id, lane, run, ...Object.fromEntries(fields.map((field) => [field, config[field]])), repositorySha: head, workflowSha256: digest(workflow), sessionId: output.sessionId, metricsSource: output.metricsSource, capturedAt: finishedAt, tokens: output.tokens, durationMs: raw.durationMs, response: output.response, responseSha256: responseSha256(output.response), rawPath, rawSha256: digest(rawText) });
    assert.equal(git("rev-parse", "HEAD"), head, "HEAD changed during the batch"); clean();
    console.log(`Captured ${lane} ${item.id} ${run}/3`);
  }
  assert.equal(new Set(runs.map((run) => run.sessionId)).size, runs.length, "adapter reused a session; rerun the complete batch with fresh sessions");
  fs.writeFileSync(target, JSON.stringify(runs, null, 2) + "\n");
  return runs;
}

export function validateRawRuns(root, cases, runs, config) {
  const failures = [];
  const schema = fs.readFileSync(path.join(root, "docs/action-schema.md"), "utf8").replaceAll("\r\n", "\n");
  for (const run of runs) {
    const label = `${run.lane}/${run.caseId}/${run.run}`;
    try {
      const expectedPath = `evidence/raw/${run.lane}-${run.caseId}-${run.run}.json`;
      assert.ok(["baseline", "candidate"].includes(run.lane) && /^[a-z0-9-]+$/.test(run.caseId));
      assert.equal(run.rawPath, expectedPath);
      const rawText = fs.readFileSync(path.join(root, run.rawPath), "utf8");
      assert.equal(run.rawSha256, digest(rawText), "raw hash mismatch");
      const raw = JSON.parse(rawText), output = JSON.parse(raw.stdout); validateAdapterOutput(output);
      assert.equal(raw.exitCode, 0); assert.equal(raw.repositorySha, run.repositorySha);
      assert.equal(raw.command, config.command); assert.deepEqual(raw.args, config.args);
      assert.equal(raw.input.request, cases.find((item) => item.id === run.caseId)?.request);
      assert.equal(raw.input.responseSchema, schema);
      assert.deepEqual(Object.keys(raw.input).sort(), ["request", "responseSchema", "workflow"]);
      assert.equal(digest(raw.input.workflow), run.workflowSha256);
      const start = Date.parse(raw.startedAt), finish = Date.parse(raw.finishedAt);
      assert.ok(Number.isFinite(start) && Number.isFinite(finish) && finish >= start);
      assert.equal(raw.durationMs, Math.max(1, finish - start));
      assert.equal(run.durationMs, raw.durationMs); assert.equal(run.capturedAt, raw.finishedAt);
      for (const key of ["sessionId", "tokens", "metricsSource"]) assert.equal(run[key], output[key]);
      assert.deepEqual(run.response, output.response);
      for (const key of ["agent", "model", "settingsHash", "toolsHash", "permissionsHash", "timeLimitMinutes"]) assert.equal(run[key], config[key]);
    } catch (error) { failures.push(`${label} raw capture mismatch: ${error.message}`); }
  }
  return failures;
}

if (process.argv[1] && path.resolve(process.argv[1]) === import.meta.filename) {
  const appRoot = process.cwd(), root = path.resolve(appRoot, "..");
  const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
  runBatch({ appRoot, lane: process.argv[2], cases: read("workflow-eval-app/evals/replay-cases.json"), config: read("evidence/runner.json"), history: read("evidence/history.json") });
}
