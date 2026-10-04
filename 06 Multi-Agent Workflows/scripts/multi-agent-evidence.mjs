import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { checkSkillEvidence, verifyTranscript } from "../../scripts/context-document-evidence.mjs";

const digest = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const git = (root, args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const slash = (value) => value.split(path.sep).join("/");
function inside(root, relative) {
  assert.ok(typeof relative === "string" && relative && !path.isAbsolute(relative), "Artifact needs a relative path");
  const absolute = path.resolve(root, relative), local = path.relative(root, absolute);
  assert.ok(local && !local.startsWith("..") && !path.isAbsolute(local), `Artifact escapes exercise: ${relative}`);
  assert.ok(fs.existsSync(absolute), `Missing ${relative}`);
  const real = path.relative(fs.realpathSync(root), fs.realpathSync(absolute));
  assert.ok(real && !real.startsWith("..") && !path.isAbsolute(real), `Linked artifact escapes exercise: ${relative}`);
  assert.ok(!fs.lstatSync(absolute).isSymbolicLink(), `Linked artifacts are not supported: ${relative}`);
  return absolute;
}
function walk(root, relative) {
  const directory = inside(root, relative);
  assert.ok(fs.statSync(directory).isDirectory(), `${relative} must be a directory`);
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (["node_modules", "__pycache__"].includes(entry.name) || entry.name.endsWith(".pyc")) return [];
    const next = slash(path.join(relative, entry.name));
    assert.ok(!entry.isSymbolicLink(), `Linked artifact is not supported: ${next}`);
    return entry.isDirectory() ? walk(root, next) : [next];
  });
}
export function artifactPaths(root, contract) {
  return [...new Set([
    ...contract.artifacts,
    ...(contract.artifactDirectories ?? []).flatMap((relative) => walk(root, relative)),
    ...(contract.optionalArtifacts ?? []).filter((relative) => fs.existsSync(path.join(root, relative))),
  ])].sort();
}
function sourceTree(root, commit) {
  const prefix = git(root, ["rev-parse", "--show-prefix"]);
  return Object.fromEntries(git(root, ["ls-tree", "-rz", "--full-tree", commit, "--", prefix || "."]).split("\0").filter(Boolean).map((entry) => {
    const [metadata, name] = entry.split("\t");
    assert.ok(metadata.startsWith("100"), "Exercise snapshots contain only regular files");
    return [name.slice(prefix.length), metadata.split(" ")[2]];
  }).filter(([name]) => !name.startsWith("evidence/")).sort(([a], [b]) => a.localeCompare(b)));
}

function readJson(root, relative) { return JSON.parse(fs.readFileSync(inside(root, relative), "utf8")); }
const roles = ["security", "accessibility", "performance", "testability"];
function expectedSessions(root, kind) {
  if (kind === "parallel") {
    const handoffs = readJson(root, "evidence/lane-handoffs.json");
    return handoffs.lanes.map(lane => ({ role: "lane-" + lane.lane, sha: handoffs.base_sha, result: lane.commit_sha, session: lane.session_id }));
  }
  if (kind === "specialist") {
    const cycle = readJson(root, "evidence/review-cycle.json");
    return cycle.specialists.flatMap(specialist => ["before", "after"].map(phase => ({
      role: specialist.specialist + "-" + phase, sha: specialist[phase].reviewed_sha, session: specialist[phase].session_id,
    })));
  }
  assert.equal(kind, "assignment", "Unknown multi-agent evidence kind");
  const control = readJson(root, "evidence/control-plane.json");
  return [
    { role: "implementer", sha: control.base_sha, result: control.lane.commit_sha, session: control.lane.session_id },
    { role: "reviewer", sha: control.lane.commit_sha, session: control.lane.review_session_id },
  ];
}
export function verifyAgentSessions(root, contract) {
  const expected = expectedSessions(root, contract.kind);
  const expectedRoles = contract.kind === "parallel" ? ["lane-A", "lane-B", "lane-C"]
    : contract.kind === "specialist" ? roles.flatMap(role => [role + "-before", role + "-after"]) : ["implementer", "reviewer"];
  assert.deepEqual(expected.map(run => run.role).sort(), expectedRoles.sort(), "Workflow must include every required role once");
  const record = readJson(root, "evidence/agent-sessions.json");
  assert.equal(record.schema_version, 1);
  assert.ok(Array.isArray(record.sessions), "agent-sessions.json needs sessions[]");
  assert.deepEqual(record.sessions.map(run => run.role).sort(), expected.map(run => run.role).sort(), "Retain each required agent session exactly once");
  const ids = new Set(), transcripts = new Set();
  for (const expectedRun of expected) {
    const run = record.sessions.find(session => session.role === expectedRun.role);
    assert.ok(typeof run.session_id === "string" && run.session_id.length >= 5 && !ids.has(run.session_id), "Agent sessions must be distinct");
    ids.add(run.session_id);
    assert.equal(run.session_id, expectedRun.session, "Handoff/review must reference its actual session_id");
    for (const field of ["agent", "model", "tools", "permissions"]) assert.ok(typeof run[field] === "string" && run[field].trim(), "Record session " + field);
    assert.match(run.reviewed_sha ?? "", /^[a-f0-9]{40}$/);
    assert.equal(run.reviewed_sha, expectedRun.sha, "Session reviewed a different commit");
    if (expectedRun.result) assert.equal(run.result_sha, expectedRun.result, "Session result differs from handed-off commit");
    git(root, ["cat-file", "-e", run.reviewed_sha + "^{commit}"]);
    const started = Date.parse(run.started_at), finished = Date.parse(run.finished_at);
    assert.ok(Number.isFinite(started) && Number.isFinite(finished) && finished > started, "Record valid session timestamps");
    assert.ok(/^evidence\/sessions\/[^:]+\.txt$/.test(run.transcript_path ?? "") && !transcripts.has(run.transcript_path), "Retain separate raw session transcripts");
    transcripts.add(run.transcript_path);
    const text = fs.readFileSync(inside(root, run.transcript_path), "utf8").replaceAll("\r\n", "\n");
    assert.ok(text.length >= 100 && text.includes(run.reviewed_sha), "Transcript must retain actual task and reviewed SHA");
    const proof = run.proof?.match(/^(evidence\/sessions\/[^:]+\.txt):L(\d+)-L(\d+)$/);
    assert.ok(proof && proof[1] === run.transcript_path, "Cite the raw session with a line range");
    const lines = text.split("\n"), first = Number(proof[2]), last = Number(proof[3]);
    assert.ok(first > 0 && last >= first && last <= lines.length && lines.slice(first - 1, last).join("\n").trim().length >= 20, "Invalid agent transcript range");
    assert.ok(/^evidence\/prompts\/[^:]+\.md$/.test(run.prompt_path ?? ""), "Retain the exact bounded dispatch prompt");
    const prompt = fs.readFileSync(inside(root, run.prompt_path), "utf8");
    assert.ok(prompt.length >= 80 && prompt.includes(run.reviewed_sha), "Prompt must identify its task and source SHA");
  }
  if (contract.kind === "parallel") {
    const sessions = record.sessions;
    assert.ok(Math.max(...sessions.map(run => Date.parse(run.started_at))) < Math.min(...sessions.map(run => Date.parse(run.finished_at))), "Three lane sessions must overlap; serial runs are not parallel evidence");
  }
  if (contract.kind === "specialist") for (const phase of ["before", "after"]) {
    const sessions = record.sessions.filter(run => run.role.endsWith("-" + phase));
    assert.ok(sessions.some((a, i) => sessions.some((b, j) => i !== j && Date.parse(a.started_at) < Date.parse(b.finished_at) && Date.parse(b.started_at) < Date.parse(a.finished_at))), "Specialist reviews must include concurrent sessions in each phase");
    if (phase === "after") assert.ok(Math.min(...sessions.map(run => Date.parse(run.started_at))) >= Math.max(...record.sessions.filter(run => run.role.endsWith("-before")).map(run => Date.parse(run.finished_at))), "Finish baseline review before rechecks");
  }
  if (contract.kind === "assignment") {
    const implementer = record.sessions.find(run => run.role === "implementer"), reviewer = record.sessions.find(run => run.role === "reviewer");
    assert.ok(Date.parse(reviewer.started_at) >= Date.parse(implementer.finished_at), "Review starts after implementation finishes");
    const assignment = readJson(root, "evidence/assignment.json"), control = readJson(root, "evidence/control-plane.json");
    assert.equal(assignment.schema_version, 1);
    assert.equal(assignment.base_sha, control.base_sha);
    assert.deepEqual(assignment.assignments, [{ card_id: "ESC-120", session_id: implementer.session_id, state: "ready-for-agent", reserved_paths: control.lane.owned_paths, blocked_by: [] }], "Assign only ESC-120 with exclusive declared ownership");
    assert.deepEqual(assignment.withheld?.map(card => card.card_id).sort(), ["ESC-118", "ESC-121", "ESC-122"], "Record all withheld cards");
    for (const card of assignment.withheld) assert.ok(typeof card.reason === "string" && card.reason.trim().length >= 20, "Explain withheld assignment");
  }
  for (const command of contract.commandArtifacts) {
    const text = fs.readFileSync(inside(root, command.path), "utf8").replaceAll("\r\n", "\n");
    assert.ok(text.startsWith("Command: " + command.command + "\n"), "Capture the exact focused command");
    assert.match(text, /^Reviewed SHA: [a-f0-9]{40}$/m);
    const start = Date.parse(text.match(/^Started at: (.+)$/m)?.[1]), end = Date.parse(text.match(/^Finished at: (.+)$/m)?.[1]);
    assert.ok(Number.isFinite(start) && Number.isFinite(end) && end >= start, "Invalid focused command timestamps");
    assert.ok(text.endsWith("\nexit code: " + command.exit_code + "\n"), "Focused command capture has unexpected exit code");
    let sha;
    if (contract.kind === "parallel") {
      const lane = readJson(root, "evidence/lane-handoffs.json").lanes.find(run => command.path === run.verification.output_path);
      sha = lane?.commit_sha ?? readJson(root, "evidence/integration.json").product_head;
    } else if (contract.kind === "specialist") {
      const cycle = readJson(root, "evidence/review-cycle.json");
      sha = command.path.endsWith("-before.txt") ? cycle.baseline_sha : cycle.remediation_sha;
    } else {
      const control = readJson(root, "evidence/control-plane.json");
      sha = command.path.endsWith("esc-120.txt") ? control.lane.commit_sha : control.integration.control_commit_sha;
    }
    assert.ok(text.includes("Reviewed SHA: " + sha + "\n"), "Command capture ran at a different commit");
  }
}

function checkContent(root, contract) {
  for (const name of ["before", "after"]) {
    const text = fs.readFileSync(inside(root, `evidence/${name}.md`), "utf8");
    for (const heading of ["Conditions", "Findings", "Proof"]) assert.ok(text.includes(`## ${heading}`), `${name}.md needs ${heading}`);
  }
  const comparison = fs.readFileSync(inside(root, "evidence/comparison.md"), "utf8");
  for (const heading of ["Changes", "Verified", "Remaining questions"]) assert.ok(comparison.includes(`## ${heading}`), `comparison.md needs ${heading}`);
  checkSkillEvidence(root, contract);
  verifyAgentSessions(root, contract);
  for (const relative of artifactPaths(root, contract)) {
    const file = inside(root, relative);
    assert.ok(fs.statSync(file).isFile() && fs.statSync(file).size > 0, `Empty artifact: ${relative}`);
  }
}
export function sealMultiAgent(root, contract) {
  root = fs.realpathSync(root);
  checkContent(root, contract);
  const sourceSha = git(root, ["rev-parse", "HEAD"]), prefix = git(root, ["rev-parse", "--show-prefix"]);
  const files = Object.fromEntries(artifactPaths(root, contract).map((relative) => {
    const bytes = fs.readFileSync(inside(root, relative));
    const committed = execFileSync("git", ["show", `${sourceSha}:${prefix}${relative}`], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
    // Text can be checked out with CRLF; archives remain byte-exact.
    const normalized = (value) => relative.endsWith(".skill") ? value : Buffer.from(value.toString("utf8").replaceAll("\r\n", "\n"));
    assert.equal(digest(normalized(bytes)), digest(normalized(committed)), `Commit ${relative} before sealing`);
    return [relative, digest(bytes)];
  }));
  const manifest = { schema: 1, sourceSha, files, sourceTree: sourceTree(root, sourceSha) };
  fs.writeFileSync(path.join(root, "evidence/manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Sealed ${Object.keys(files).length} artifacts at ${sourceSha}`);
  return manifest;
}
export function verifyMultiAgent(root, contract, captureRequired = true) {
  root = fs.realpathSync(root);
  checkContent(root, contract);
  const manifest = JSON.parse(fs.readFileSync(inside(root, "evidence/manifest.json"), "utf8"));
  assert.equal(manifest.schema, 1);
  assert.match(manifest.sourceSha ?? "", /^[a-f0-9]{40}$/);
  git(root, ["merge-base", "--is-ancestor", manifest.sourceSha, "HEAD"]);
  const expectedFiles = Object.fromEntries(artifactPaths(root, contract).map((relative) => [relative, digest(fs.readFileSync(inside(root, relative)))]));
  assert.deepEqual(manifest.files, expectedFiles, "Artifacts changed or are missing since seal");
  assert.deepEqual(manifest.sourceTree, sourceTree(root, manifest.sourceSha), "Source snapshot does not match its commit");
  assert.deepEqual(manifest.sourceTree, sourceTree(root, "HEAD"), "Source changed after seal; regenerate the evidence");
  const prefix = git(root, ["rev-parse", "--show-prefix"]);
  const scope = [`:(top)${prefix}`, `:(top,exclude)${prefix}evidence`];
  assert.equal(git(root, ["diff", "HEAD", "--", ...scope]), "", "Commit exercise changes before verification");
  assert.equal(git(root, ["ls-files", "--others", "--exclude-standard", "--", ...scope]), "", "Commit new exercise files before verification");
  const committedPrefix = prefix;
  for (const relative of Object.keys(manifest.files)) {
    const committed = execFileSync("git", ["show", `${manifest.sourceSha}:${committedPrefix}${relative}`], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
    const bytes = fs.readFileSync(inside(root, relative));
    const normalize = (value) => relative.endsWith(".skill") ? value : value.toString("utf8").replaceAll("\r\n", "\n");
    assert.equal(digest(normalize(bytes)), digest(normalize(committed)), `Artifact is not bound to source commit: ${relative}`);
  }
  if (captureRequired) verifyTranscript(root, manifest.sourceSha);
  console.log("PASS committed workflow evidence, agent sessions, snapshot freshness, and verification capture. Review actual delegation and behavior.");
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const root = path.resolve(process.cwd(), "..");
    const contract = JSON.parse(fs.readFileSync(path.join(process.cwd(), "evidence-contract.json")));
    if (process.argv[2] === "seal") sealMultiAgent(root, contract);
    else verifyMultiAgent(root, contract, process.argv[2] !== "content");
  } catch (error) {
    console.error(`Multi-agent evidence verification failed: ${error.message}`);
    process.exitCode = 1;
  }
}
