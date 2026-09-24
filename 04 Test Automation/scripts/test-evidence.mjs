import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";

export const digest = (value) => crypto.createHash("sha256").update(value).digest("hex");
export const json = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const slash = (value) => value.split(path.sep).join("/");
export function git(root, args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}
export function context(app) {
  app = fs.realpathSync.native(app);
  const root = fs.realpathSync.native(path.resolve(app, ".."));
  const repository = fs.realpathSync.native(git(root, ["rev-parse", "--show-toplevel"]));
  return { app, root, repository, prefix: slash(path.relative(repository, root)), contract: json(path.join(app, "evidence-contract.json")) };
}
export function snapshot(ctx, commit) {
  assert.match(commit, /^[0-9a-f]{40}$/);
  const entries = git(ctx.repository, ["ls-tree", "-rz", "--full-tree", commit, "--", ctx.prefix]).split("\0").filter(Boolean);
  return Object.fromEntries(entries.map((entry) => {
    const [metadata, name] = entry.split("\t");
    assert.ok(metadata.startsWith("100"), "Only regular tracked files are allowed in the exercise");
    return [name.slice(ctx.prefix.length + 1), metadata.split(" ")[2]];
  }).filter(([name]) => !name.startsWith("evidence/")).sort(([a], [b]) => a.localeCompare(b)));
}
export function clean(ctx) {
  const scope = [ctx.prefix, `:(exclude)${ctx.prefix}/evidence`];
  assert.equal(git(ctx.repository, ["diff", "HEAD", "--", ...scope]), "", "Commit exercise code and tests before capture/verification");
  assert.equal(git(ctx.repository, ["ls-files", "--others", "--exclude-standard", "--", ...scope]), "", "Commit new exercise files before capture/verification");
}
export function recordHash(record) {
  const { sha256, ...payload } = record;
  return digest(JSON.stringify(payload));
}
export function validateRecord(record, stage, contract) {
  assert.equal(record.schema, 1, "Unsupported capture schema");
  assert.equal(record.stage, stage, "Wrong capture stage");
  assert.equal(record.sha256, recordHash(record), "Capture hash mismatch");
  assert.ok(Number.isInteger(record.attempt) && record.attempt > 0, "Invalid attempt");
  assert.match(record.commit, /^[0-9a-f]{40}$/);
  assert.ok(Number.isFinite(Date.parse(record.startedAt)) && Date.parse(record.finishedAt) >= Date.parse(record.startedAt), "Invalid capture times");
  assert.deepEqual(record.runs.map((run) => run.script), contract.stages[stage], "Capture omits or substitutes required commands");
  for (const run of record.runs) {
    assert.ok(Number.isInteger(run.exitCode), "Missing exit code");
    assert.equal(run.error, null, "A process error is not behavior evidence");
    assert.equal(run.signal, null, "A terminated process is not behavior evidence");
    assert.ok(typeof run.stdout === "string" && typeof run.stderr === "string" && (run.stdout + run.stderr).trim(), "Missing process output");
  }
  if (stage === "final" || stage.startsWith("green-")) assert.ok(record.runs.every((run) => run.exitCode === 0), `${stage} must pass`);
  if (stage === "baseline") {
    assert.equal(record.runs[0].exitCode, 0, "The starter smoke/focused check must run successfully");
    if (contract.kind !== "browser") assert.ok(record.runs.slice(1).every((run) => run.exitCode !== 0), "Baseline must expose the supplied missing behavior");
  }
  if (stage.startsWith("red-")) {
    assert.ok(record.runs.every((run) => run.exitCode !== 0), "Red must fail");
    const output = record.runs.map((run) => run.stdout + run.stderr).join("\n");
    assert.match(output, /AssertionError|TestingLibraryElementError|expected .* to|Unable to find/i, "Red must show an assertion failure");
    assert.doesNotMatch(output, /ERR_MODULE_NOT_FOUND|Cannot find module|Failed to resolve import|No test files found|SyntaxError/, "Infrastructure failure is not red evidence");
  }
}
const production = (files) => Object.fromEntries(Object.entries(files).filter(([name]) =>
  /\/src\//.test(name) && !/\/src\/(?:test|learner)\/|\.(?:test|spec)\./.test(name)));
export function validateCycles(records, contract) {
  if (!contract.cycles) return;
  let previous = records.baseline;
  for (let cycle = 1; cycle <= 3; cycle++) {
    const red = records[`red-${cycle}`], green = records[`green-${cycle}`];
    const file = contract.cycles[cycle - 1];
    assert.deepEqual(production(red.snapshot), production(previous.snapshot), `Cycle ${cycle}: production changed before red`);
    assert.ok(red.snapshot[file], `Cycle ${cycle}: missing learner regression`);
    assert.ok(!previous.snapshot[file], `Cycle ${cycle}: write this regression after the previous slice`);
    assert.equal(red.snapshot[file], green.snapshot[file], `Cycle ${cycle}: regression changed between red and green`);
    assert.equal(red.snapshot[file], records.final.snapshot[file], `Cycle ${cycle}: regression changed after green`);
    assert.notDeepEqual(production(red.snapshot), production(green.snapshot), `Cycle ${cycle}: no production fix`);
    previous = green;
  }
}
export function readText(root, relative, rejectPlaceholders = true) {
  assert.ok(!path.isAbsolute(relative) && !relative.split(/[\\/]/).includes(".."), "Evidence path escapes exercise");
  const absolute = path.join(root, relative);
  assert.ok(fs.existsSync(absolute) && fs.lstatSync(absolute).isFile(), `Missing ${relative}`);
  const content = fs.readFileSync(absolute, "utf8");
  assert.ok(content.trim().length > 20, `Empty or incomplete ${relative}`);
  if (rejectPlaceholders) assert.doesNotMatch(content, /\b(?:TODO|TBD|FIXME)\b|\[(?:replace|describe|record here)[^\]]*\]/i, `Unfilled ${relative}`);
  return content;
}
function citation(root, value) {
  const match = value.match(/^(evidence\/sessions\/[\w./-]+):(\d+)-(\d+)$/);
  assert.ok(match, "Use evidence/sessions/file.txt:start-end transcript citations");
  const source = readText(root, match[1], false).split(/\r?\n/);
  const start = Number(match[2]), end = Number(match[3]);
  assert.ok(start > 0 && end >= start && end <= source.length, "Invalid transcript range");
  return source.slice(start - 1, end).join("\n");
}
export function validateTool(root, contract) {
  const text = readText(root, "evidence/tool-record.md");
  for (const field of ["Agent", "Model", "Source", "Version", "Installed path", "Invocation", "Transcript"]) {
    assert.match(text, new RegExp(`^- ${field}:\\s*\\S.+$`, "m"), `tool-record.md needs ${field}`);
  }
  assert.ok(text.includes(contract.toolSource), "Incorrect tool/skill source");
  if (contract.skill) {
    assert.match(text, /^- Source commit: [a-f0-9]{40}$/m, "Record source commit");
    assert.match(text, /^- SKILL.md SHA-256: [a-f0-9]{64}$/m, "Record installed skill hash");
  }
  const transcript = text.match(/^- Transcript:\s*(.+)$/m)[1].trim();
  const excerpt = citation(root, transcript);
  assert.ok(excerpt.toLowerCase().includes(contract.toolSignal.toLowerCase()), "Transcript does not show the required tool/skill");
  return text;
}
export function validateBrowserReport(report) {
  assert.equal(report.config.workers, 2, "Repeat report must use two workers");
  assert.ok(report.config.projects.length > 0 && report.config.projects.every((project) => project.repeatEach === 20 && project.retries === 0), "Require twenty repeats with zero retries");
  assert.ok(report.stats.expected >= 60 && report.stats.unexpected === 0 && report.stats.flaky === 0 && report.stats.skipped === 0, "Browser run is incomplete, skipped, flaky, or failing");
  assert.equal(report.errors?.length ?? 0, 0, "Browser report contains global errors");
  let testCount = 0;
  function inspect(suites) {
    for (const suite of suites) {
      for (const spec of suite.specs ?? []) for (const test of spec.tests ?? []) {
        testCount++;
        assert.equal(test.expectedStatus, "passed", "Expected failures cannot establish coverage");
        assert.ok(test.results.length === 1 && test.results[0].status === "passed", "Every repeated test must pass without retries");
      }
      inspect(suite.suites ?? []);
    }
  }
  inspect(report.suites ?? []);
  assert.equal(testCount, report.stats.expected, "Browser report omits individual test results");
}
export function validateEvidence(app) {
  const ctx = context(app);
  clean(ctx);
  const records = {};
  const selection = json(path.join(ctx.root, "evidence", "runs.json"));
  assert.deepEqual(Object.keys(selection).sort(), Object.keys(ctx.contract.stages).sort(), "runs.json must select every required stage");
  for (const stage of Object.keys(ctx.contract.stages)) {
    const filename = selection[stage];
    assert.match(filename, new RegExp(`^${stage}-[1-9][0-9]*\\.json$`), "Invalid capture filename");
    const record = json(path.join(ctx.root, "evidence", "runs", filename));
    validateRecord(record, stage, ctx.contract);
    assert.equal(filename, `${stage}-${record.attempt}.json`, "Capture attempt mismatch");
    assert.deepEqual(record.snapshot, snapshot(ctx, record.commit), "Incomplete or altered committed snapshot");
    git(ctx.repository, ["merge-base", "--is-ancestor", record.commit, "HEAD"]);
    records[stage] = record;
  }
  const ordered = Object.values(records);
  for (let index = 1; index < ordered.length; index++) {
    assert.ok(Date.parse(ordered[index - 1].finishedAt) <= Date.parse(ordered[index].startedAt), "Captures are out of order");
    git(ctx.repository, ["merge-base", "--is-ancestor", ordered[index - 1].commit, ordered[index].commit]);
  }
  assert.deepEqual(records.final.snapshot, snapshot(ctx, git(ctx.root, ["rev-parse", "HEAD"])), "Final verification is stale");
  const starter = json(path.join(app, "starter-state.json"));
  for (const [file, expected] of Object.entries(starter)) {
    assert.ok(records.baseline.snapshot[file], `Baseline missing ${file}`);
    const original = git(ctx.repository, ["show", `${records.baseline.commit}:${ctx.prefix}/${file}`]).replaceAll("\r\n", "\n");
    assert.equal(digest(original), expected, `Baseline was edited: ${file}`);
  }
  validateCycles(records, ctx.contract);
  for (const [file, headings] of Object.entries(ctx.contract.documents)) {
    const text = readText(ctx.root, file);
    for (const heading of headings) assert.ok(text.includes(`## ${heading}`), `${file} missing ${heading}`);
  }
  validateTool(ctx.root, ctx.contract);
  if (ctx.contract.kind === "browser") {
    const investigation = readText(ctx.root, "evidence/mcp-investigation.md");
    const citations = [...investigation.matchAll(/evidence\/sessions\/[\w./-]+:\d+-\d+/g)];
    assert.ok(citations.length >= 3, "Cite actual MCP observations for readiness, network, and recovery");
    for (const match of citations) citation(ctx.root, match[0]);
    const reportPath = path.join(ctx.root, "evidence", "runs", `final-${records.final.attempt}`, "report.json");
    const report = json(reportPath);
    validateBrowserReport(report);
    const trace = fs.readFileSync(path.join(path.dirname(reportPath), "trace.zip"));
    assert.ok(trace.length > 1000 && trace.length < 10 * 1024 * 1024 && trace[0] === 0x50 && trace[1] === 0x4b, "Missing bounded Playwright trace");
    for (const name of ["report.json", "trace.zip"]) assert.equal(digest(fs.readFileSync(path.join(path.dirname(reportPath), name))), records.final.artifacts[name], `Changed ${name}`);
  }
  return records;
}
export function capture(app, stage) {
  const ctx = context(app);
  assert.ok(ctx.contract.stages[stage], "Unknown capture stage");
  clean(ctx);
  const commit = git(ctx.root, ["rev-parse", "HEAD"]);
  const files = snapshot(ctx, commit);
  const directory = path.join(ctx.root, "evidence", "runs");
  fs.mkdirSync(directory, { recursive: true });
  let attempt = 1;
  while (fs.existsSync(path.join(directory, `${stage}-${attempt}.json`))) attempt++;
  const artifactDirectory = path.join(directory, `${stage}-${attempt}`);
  const record = { schema: 1, stage, attempt, commit, snapshot: files, startedAt: new Date().toISOString(), runs: [], artifacts: {} };
  for (const script of ctx.contract.stages[stage]) {
    assert.match(script, /^[\w:-]+$/, "Invalid fixed script");
    const command = process.platform === "win32" ? (process.env.ComSpec ?? "cmd.exe") : "npm";
    const args = process.platform === "win32" ? ["/d", "/s", "/c", `npm run ${script}`] : ["run", script];
    const result = spawnSync(command, args, { cwd: app, encoding: "utf8", maxBuffer: 20 * 1024 * 1024,
      env: { ...process.env, NO_COLOR: "1", FORCE_COLOR: "0", EXERCISE_CAPTURE_DIR: artifactDirectory } });
    const run = { script, exitCode: result.status ?? 1, stdout: result.stdout ?? "", stderr: result.stderr ?? "", error: result.error?.message ?? null, signal: result.signal ?? null };
    process.stdout.write(run.stdout); process.stderr.write(run.stderr);
    record.runs.push(run);
  }
  clean(ctx);
  assert.equal(commit, git(ctx.root, ["rev-parse", "HEAD"]), "Command changed commit");
  assert.deepEqual(files, snapshot(ctx, commit), "Command changed source snapshot");
  if (fs.existsSync(artifactDirectory)) for (const file of fs.readdirSync(artifactDirectory)) {
    assert.ok(fs.statSync(path.join(artifactDirectory, file)).isFile(), "Unexpected artifact directory");
    record.artifacts[file] = digest(fs.readFileSync(path.join(artifactDirectory, file)));
  }
  record.finishedAt = new Date().toISOString();
  record.sha256 = recordHash(record);
  fs.writeFileSync(path.join(directory, `${stage}-${attempt}.json`), JSON.stringify(record, null, 2) + "\n", { flag: "wx" });
  console.log(`Captured ${stage}-${attempt}.json; preserve failed attempts and select the reviewed run in evidence/runs.json.`);
  return record.runs.find((run) => run.exitCode !== 0)?.exitCode ?? 0;
}
