import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { hash } from "../../../../scripts/context-document-evidence.mjs";
import { FEATURE_DIR, readArtifact, citation, checklistItems } from "./spec-validation.mjs";
import { checklistInputs } from "./speckit-checklist-inputs.mjs";

export const stages = [
  { stage: "specify", source: `${FEATURE_DIR}/spec.md`, path: "evidence/workflow/specified.md" },
  { stage: "clarify", source: `${FEATURE_DIR}/spec.md`, path: "evidence/workflow/clarified.md" },
  { stage: "checklist", source: `${FEATURE_DIR}/checklists/spec-review.md`, path: "evidence/workflow/generated-checklist.md" }
];
export function validateCaptures(root, complete = true) {
  const records = JSON.parse(readArtifact(root, "evidence/stage-captures.json")).stages;
  assert.ok(Array.isArray(records) && records.length <= 3, "invalid stage captures");
  if (complete) assert.equal(records.length, 3, "capture all three workflow stages");
  let last = 0;
  records.forEach((record, index) => {
    const expected = stages[index];
    for (const key of ["stage", "source", "path"]) assert.equal(record[key], expected[key], "invalid capture order or path");
    assert.equal(record.sha256, hash(readArtifact(root, expected.path)), "captured stage changed");
    const at = Date.parse(record.capturedAt);
    assert.ok(Number.isFinite(at) && at >= last, "invalid capture chronology");
    last = at;
  });
  if (records.length === 3) assert.ok(checklistItems(readArtifact(root, stages[2].path)).every((r) => !r.checked), "capture an unchecked generated checklist");
  return records;
}
export function captureStage(root, stage) {
  const exists = fs.existsSync(path.join(root, "evidence/stage-captures.json"));
  const records = exists ? validateCaptures(root, false) : [];
  const expected = stages[records.length];
  assert.equal(stage, expected?.stage, "capture specify, clarify, checklist once each, in order");
  checklistInputs(root);
  const content = readArtifact(root, expected.source);
  if (stage === "checklist") assert.ok(checklistItems(content).every((r) => !r.checked), "capture an unchecked generated checklist");
  for (const directory of ["evidence", "evidence/workflow"]) {
    const target = path.join(root, directory);
    fs.mkdirSync(target, { recursive: true });
    assert.equal(fs.realpathSync(target), path.resolve(target), "evidence directories must not be links");
  }
  const manifest = path.join(root, "evidence/stage-captures.json");
  if (exists) assert.equal(fs.realpathSync(manifest), path.resolve(manifest), "capture manifest must not be a link");
  fs.writeFileSync(path.join(root, expected.path), content, { flag: "wx" });
  records.push({ ...expected, capturedAt: new Date().toISOString(), sha256: hash(content) });
  fs.writeFileSync(manifest, JSON.stringify({ stages: records }, null, 2) + "\n");
  return records;
}
export function validateWorkflow(root) {
  checklistInputs(root);
  const workflow = JSON.parse(readArtifact(root, "evidence/workflow.json"));
  assert.equal(workflow.version, "v1.0.6", "use the documented pinned Spec Kit release");
  assert.ok(typeof workflow.integration === "string" && workflow.integration.trim(), "record installed integration");
  assert.equal(workflow.featureDirectory, FEATURE_DIR, "record the selected feature directory");
  assert.ok(typeof workflow.adaptation === "string" && workflow.adaptation.includes("speckit-checklist-inputs.mjs"), "document the checklist prerequisite adapter");
  const files = workflow.files;
  assert.ok(Array.isArray(files) && files.length, "inventory the local workflow files");
  assert.equal(new Set(files.map((f) => f.path)).size, files.length, "duplicate inventory file");
  for (const file of files) {
    assert.ok(file.path.startsWith(".") && !file.path.includes(".."), "inventory project-local Spec Kit configuration only");
    assert.equal(hash(readArtifact(root, file.path)), file.sha256, "installed workflow file changed");
  }
  const paths = files.map((f) => f.path);
  const visit = (directory) => {
    for (const entry of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {
      const relative = directory + "/" + entry.name;
      assert.ok(!entry.isSymbolicLink(), "workflow dependencies must be local files");
      if (entry.isDirectory()) visit(relative);
      else assert.ok(paths.includes(relative), "inventory all .specify dependencies: " + relative);
    }
  };
  visit(".specify");
  assert.ok(paths.includes(".specify/memory/constitution.md"), "retain the populated constitution");
  const constitution = readArtifact(root, ".specify/memory/constitution.md");
  assert.ok(constitution.trim().length > 100 && !constitution.includes("[PRINCIPLE_1_NAME]"), "populate the constitution using the supplied process principles");
  const captures = validateCaptures(root);
  assert.ok(Array.isArray(workflow.stages) && workflow.stages.length === 3, "record all workflow invocations");
  citation(root, workflow.setupProof, "evidence/author-session.txt");
  const author = readArtifact(root, "evidence/author-session.txt");
  const session = JSON.parse(readArtifact(root, "evidence/review-session.json"));
  let previous = 0;
  workflow.stages.forEach((record, index) => {
    assert.equal(record.stage, stages[index].stage, "invalid invocation order");
    assert.equal(record.sessionId, session.authorSessionId, "workflow stages must identify the author session");
    assert.ok(author.includes(record.sessionId), "retain author session ID");
    assert.ok(paths.includes(record.commandFile), "inventory each invoked command file");
    const command = readArtifact(root, record.commandFile);
    assert.ok(command.trim().length > 100, "retain the installed command instructions");
    if (record.stage === "checklist") assert.ok(command.includes("subscription-management-app/scripts/speckit-checklist-inputs.mjs"), "apply the checklist prerequisite adapter");
    assert.ok(typeof record.invocation === "string" && record.invocation.includes("speckit") && record.invocation.includes(record.stage), "record the actual Spec Kit invocation");
    citation(root, record.proof, "evidence/author-session.txt");
    assert.ok(record.proof.excerpt.includes(record.invocation), "stage proof must include the invocation");
    const start = Date.parse(record.startedAt), end = Date.parse(record.finishedAt), captured = Date.parse(captures[index].capturedAt);
    assert.ok(Number.isFinite(start) && Number.isFinite(end) && start >= previous && end >= start && captured >= end, "invalid workflow chronology");
    previous = captured;
  });
  const inputs = JSON.parse(readArtifact(root, "evidence/review-inputs.json"));
  assert.ok(Date.parse(inputs.frozenAt) >= previous, "freeze after workflow completion");
  for (const index of [1, 2]) {
    const input = inputs.files.find((f) => f.source === stages[index].source);
    assert.equal(input?.sha256, captures[index].sha256, "frozen input must match its captured stage output");
  }
  return paths;
}
