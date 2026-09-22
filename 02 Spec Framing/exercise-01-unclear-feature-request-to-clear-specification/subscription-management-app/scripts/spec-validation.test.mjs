import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { test } from "node:test";
import { FEATURE_DIR, validateSpecification, validateReviewEvidence, validateDocuments } from "./spec-validation.mjs";

function fixture() {
  const topics = ["Authorization", "Billing", "Pending", "Recovery", "Scope"];
  const states = ["Open", "Confirmed", "Confirmed", "Assumption", "Confirmed"];
  const sources = ["docs/stakeholder-notes.md", "docs/billing-constraints.md", "src/types.ts", "docs/billing-constraints.md", "docs/stakeholder-notes.md"];
  const clarifications = "# Synthetic validator fixture\n\n" + topics.map((topic, i) => `## Q${i + 1}: What is the ${topic.toLowerCase()} decision?
- Category: ${topic}
- Requirements: FR-00${i+1}
- Repository evidence: subscription-management-app/${sources[i]}:1
- Status: ${states[i]}
- Answer: This synthetic record exercises status handling.
- Authority: Test fixture only, not a product decision.
- Consequence: The corresponding requirement depends on this answer.
- Owner: Product owner
- Next step: Obtain the actual policy decision.
`).join("\n");
  const spec = `# Specification fixture
## Scope
Include the recorded behaviors; exclude unrelated features.
## User Scenarios & Testing *(mandatory)*
### User Story 1 - Request a change (Priority: P1)
` + topics.slice(1).map((topic, i) => `${i+1}. **Given** the stated precondition, **When** the action occurs, **Then** observe the stated result. [FR-00${i+2}]`).join("\n") + `
### Edge Cases
The pending request cannot finish until policy is confirmed.
## Requirements *(mandatory)*
### Functional Requirements
` + topics.map((topic,i) => `- **FR-00${i+1}**: Define the ${topic} behavior to the extent supported by its decision.`).join("\n") + `
## Success Criteria *(mandatory)*
### Measurable Outcomes
- **SC-001**: All supported requests expose their outcome in the interface.
## Readiness
- Status: Needs decisions
- Blocked: FR-001
- Conditional: FR-004
`;
  const review = `# Review
## Coverage
Authorization, Billing, Pending, Recovery, and Scope were examined.
## Findings
### REV-001: Confirm the authorization policy
- Severity: Blocking
- Location: Q1
- Concern: The open authorization decision prevents implementation.
`;
  const revisions = `# Revisions
### REV-001: Confirm the authorization policy
- Disposition: Deferred
- Reason: No approved policy answer is available in this synthetic fixture.
- Owner: Product owner
- Next step: Obtain a policy answer before implementation.
`;
  return { clarifications, spec, review, revisions };
}
const validate = (f) => validateSpecification(f.clarifications, f.spec, f.review, f.revisions);

test("accepts a reviewed specification that honestly retains blockers", () => {
  const result = validate(fixture());
  assert.equal(result.questions.length, 5);
  assert.equal(result.requirements.length, 5);
});
test("native acceptance scenarios and requirement text may wrap across lines", () => {
  const f = fixture();
  f.spec = f.spec.replace("**When** the action occurs, **Then**", "\n   **When** the action occurs,\n   **Then**");
  f.spec = f.spec.replace("Define the Billing behavior", "Define the Billing behavior\n  with a continued explanation");
  validate(f);
});
test("no findings need not become fabricated changes", () => {
  const f = fixture();
  f.review = "# Review\n## Coverage\nAuthorization Billing Pending Recovery Scope\n## Findings\nNo actionable findings.\n";
  f.revisions = "# Revisions\nNo revision was needed after the recorded review.\n";
  validate(f);
});
for (const [name, edit, pattern] of [
  ["open decision marked ready", (f) => { f.spec = f.spec.replace("Blocked: FR-001", "Blocked: None"); }, /open decision/],
  ["assumption treated as approved", (f) => { f.spec = f.spec.replace("Conditional: FR-004", "Conditional: None"); }, /assumption/],
  ["unresolved overall readiness", (f) => { f.spec = f.spec.replace("Status: Needs decisions", "Status: Ready"); }, /unresolved work/],
  ["duplicate questions", (f) => { f.clarifications += "\n## Q1: Duplicate?\n"; }, /duplicate Q/],
  ["unknown question dependency", (f) => { f.clarifications = f.clarifications.replace("Requirements: FR-001", "Requirements: FR-099"); }, /unknown reference/],
  ["missing criterion for ready work", (f) => { f.spec = f.spec.replace("[FR-002]", "[FR-003]"); }, /lacks an acceptance/],
  ["acceptance words borrowed from another criterion", (f) => { f.spec = f.spec.replace("**Then** observe", "Observe"); }, /needs Then/],
  ["unknown acceptance requirement", (f) => { f.spec = f.spec.replace("[FR-002]", "[FR-002, FR-099]"); }, /unknown reference/],
  ["unaccounted review finding", (f) => { f.revisions = "# Revisions\nNo changes\n"; }, /every finding/],
  ["unsupported review severity", (f) => { f.review = f.review.replace("Severity: Blocking", "Severity: Maybe"); }, /severity/],
  ["addressed finding without final change", (f) => { f.revisions = f.revisions.replace("Disposition: Deferred", "Disposition: Addressed") + "- Change: FR-099\n"; }, /final change/],
  ["unowned open decision", (f) => { f.clarifications = f.clarifications.replace("- Owner: Product owner\n", ""); }, /Q1 needs Owner/],
  ["duplicate requirements", (f) => { f.spec += "\n- **FR-001**: Duplicate requirement.\n"; }, /duplicate FR/]
]) {
  test("rejects " + name, () => {
    const f = fixture(); edit(f);
    assert.throws(() => validate(f), pattern);
  });
}

import { captureStage, validateWorkflow } from "./workflow-validation.mjs";
import { checklistInputs } from "./speckit-checklist-inputs.mjs";
import { hash, seal, verifySnapshot } from "../../../../scripts/context-document-evidence.mjs";

const generated = "# Review checklist\n- [ ] CHK001 Are authorization decisions explicit?\n- [ ] CHK002 Are outcomes observable?\n";
const evaluated = generated.replace("[ ] CHK002", "[x] CHK002");
const results = { items: [{ id: "CHK001", status: "Gap", reason: "The policy answer is still open.", references: ["Q1"], finding: "REV-001" }, { id: "CHK002", status: "Satisfied", reason: "The scenario states an observable result.", references: ["FR-002"] }] };
function write(root, relative, value) {
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, value);
}
function repository(t) {
  const parent = fs.realpathSync(os.tmpdir());
  const root = fs.mkdtempSync(path.join(parent, "spec-challenge-test-"));
  t.after(() => {
    const local = path.relative(parent, fs.realpathSync(root));
    assert.ok(local.startsWith("spec-challenge-test-") && !local.includes(path.sep), "cleanup must stay in its exact temporary directory");
    fs.rmSync(root, { recursive: true, force: true });
  });
  const exercise = path.join(root, "course/exercise");
  const app = path.join(exercise, "app");
  for (const file of ["freeze-review.mjs", "spec-validation.mjs", "workflow-validation.mjs", "speckit-checklist-inputs.mjs"]) write(app, "scripts/" + file, fs.readFileSync(path.join(import.meta.dirname, file)));
  write(root, "scripts/context-document-evidence.mjs", fs.readFileSync(path.resolve(import.meta.dirname, "../../../../scripts/context-document-evidence.mjs")));
  const draft = fixture();
  write(exercise, `${FEATURE_DIR}/clarifications.md`, draft.clarifications);
  write(exercise, `${FEATURE_DIR}/spec.md`, draft.spec);
  write(exercise, ".specify/feature.json", JSON.stringify({ feature_directory: FEATURE_DIR }));
  write(exercise, ".specify/templates/checklist-template.md", "# Synthetic checklist template");
  write(exercise, ".specify/memory/constitution.md", "Synthetic process principles. ".repeat(12));
  const invocationRecords = [];
  write(exercise, `${FEATURE_DIR}/checklists/requirements.md`, "# Generated requirements quality check\n- [x] User outcomes are present.\n");
  write(exercise, `${FEATURE_DIR}/checklists/spec-review.md`, generated);
  for (const stage of ["specify", "clarify", "checklist"]) {
    const commandFile = ".claude/commands/speckit." + stage + ".md";
    write(exercise, commandFile, ("Synthetic test instruction, not an installed command. ").repeat(5) + (stage === "checklist" ? "node subscription-management-app/scripts/speckit-checklist-inputs.mjs" : ""));
    const at = new Date().toISOString();
    captureStage(exercise, stage);
    invocationRecords.push({ stage, invocation: "/speckit." + stage, commandFile, sessionId: "author-session-1", startedAt: at, finishedAt: at, proof: { path: "evidence/author-session.txt", line: invocationRecords.length + 2, excerpt: "/speckit." + stage } });
  }
  const inventory = [".specify/feature.json", ".specify/templates/checklist-template.md", ".specify/memory/constitution.md", ...invocationRecords.map((r) => r.commandFile)];
  write(exercise, "evidence/workflow.json", JSON.stringify({
    version: "v1.0.6", integration: "synthetic", featureDirectory: FEATURE_DIR,
    adaptation: "Use speckit-checklist-inputs.mjs for prerequisites.",
    files: inventory.map((p) => ({ path: p, sha256: hash(fs.readFileSync(path.join(exercise,p), "utf8")) })),
    stages: invocationRecords,
    setupProof: { path: "evidence/author-session.txt", line: 5, excerpt: "Synthetic v1.0.6 integration and constitution setup." }
  }));
  const git = (args) => execFileSync("git", args, { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
  git(["init", "--quiet"]);
  git(["-c", "core.autocrlf=false", "add", "."]);
  git(["-c", "user.name=Specification tests", "-c", "user.email=spec-tests@example.invalid", "commit", "--quiet", "-m", "Synthetic draft"]);
  return { root, exercise, app, draft, git };
}
function freeze(app) {
  return spawnSync(process.execPath, ["scripts/freeze-review.mjs"], { cwd: app, encoding: "utf8" });
}

test("freeze requires committed drafts and refuses to overwrite existing review inputs", (t) => {
  const { exercise, app } = repository(t);
  const result = freeze(app);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(freeze(app).status, 1);
  const frozen = fs.readFileSync(path.join(exercise, "evidence/reviewed/spec.md"), "utf8");
  write(exercise, `${FEATURE_DIR}/spec.md`, "Later revision");
  assert.equal(fs.readFileSync(path.join(exercise, "evidence/reviewed/spec.md"), "utf8"), frozen);
});
test("uncommitted draft cannot be frozen", (t) => {
  const { exercise, app } = repository(t);
  write(exercise, `${FEATURE_DIR}/spec.md`, "Uncommitted revision");
  const result = freeze(app);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /commit all four draft/);
  assert.equal(fs.existsSync(path.join(exercise, "evidence/review-inputs.json")), false);
});

function reviewEvidence(exercise, draft) {
  const inputs = JSON.parse(fs.readFileSync(path.join(exercise, "evidence/review-inputs.json"), "utf8"));
  const author = "author-session-1\n/speckit.specify\n/speckit.clarify\n/speckit.checklist\nSynthetic v1.0.6 integration and constitution setup.\n";
  const reviewer = "review-session-2\nRead the preserved inputs and repository evidence.\n" + draft.review + "\n" + evaluated + "\n```json\n" + JSON.stringify(results, null, 2) + "\n```\n";
  write(exercise, "evidence/author-session.txt", author);
  write(exercise, "evidence/review-session.txt", reviewer);
  write(exercise, `${FEATURE_DIR}/review.md`, draft.review);
  write(exercise, `${FEATURE_DIR}/revisions.md`, draft.revisions);
  write(exercise, `${FEATURE_DIR}/reviewed-checklist.md`, evaluated);
  write(exercise, `${FEATURE_DIR}/checklist-results.json`, JSON.stringify(results));
  const session = {
    authorSessionId: "author-session-1", reviewerSessionId: "review-session-2", agent: "synthetic validator test", model: "none",
    startedAt: inputs.frozenAt, finishedAt: inputs.frozenAt,
    authorProof: { path: "evidence/author-session.txt", line: 2, excerpt: "/speckit.specify" },
    inputProof: { path: "evidence/review-session.txt", line: 2, excerpt: "Read the preserved inputs and repository evidence." },
    reviewProof: { path: "evidence/review-session.txt", line: 3, excerpt: "# Review" }
  };
  write(exercise, "evidence/review-session.json", JSON.stringify(session));
  return session;
}

test("review evidence binds to committed inputs, actual assessments, and a distinct session", (t) => {
  const { exercise, app, draft } = repository(t);
  const result = freeze(app);
  assert.equal(result.status, 0, result.stderr);
  const session = reviewEvidence(exercise, draft);
  validateDocuments(exercise);
  validateReviewEvidence(exercise);
  validateWorkflow(exercise);
  write(exercise, `${FEATURE_DIR}/revisions.md`, draft.revisions.replace("Disposition: Deferred", "Disposition: Addressed") + "- Change: Q1\n");
  assert.throws(() => validateReviewEvidence(exercise), /unchanged section/);
  write(exercise, `${FEATURE_DIR}/revisions.md`, draft.revisions);
  session.reviewerSessionId = session.authorSessionId;
  write(exercise, "evidence/review-session.json", JSON.stringify(session));
  assert.throws(() => validateReviewEvidence(exercise), /fresh session/);
  session.reviewerSessionId = "review-session-2";
  write(exercise, "evidence/review-session.json", JSON.stringify(session));
  write(exercise, `${FEATURE_DIR}/review.md`, draft.review + "An invented finding.");
  assert.throws(() => validateReviewEvidence(exercise), /actual assessment/);
  write(exercise, `${FEATURE_DIR}/review.md`, draft.review);
  write(exercise, "evidence/reviewed/spec.md", "Tampered draft");
  assert.throws(() => validateReviewEvidence(exercise), /preserved draft changed/);
});

test("checklist adapter works without plan.md and rejects another feature location", (t) => {
  const { exercise } = repository(t);
  assert.equal(fs.existsSync(path.join(exercise, FEATURE_DIR, "plan.md")), false);
  assert.deepEqual(checklistInputs(exercise).AVAILABLE_DOCS, ["spec.md"]);
  write(exercise, ".specify/feature.json", JSON.stringify({ feature_directory: "../outside" }));
  assert.throws(() => checklistInputs(exercise), /select specs/);
});

test("captures reject repeated stages and detect modified outputs", (t) => {
  const { exercise } = repository(t);
  assert.throws(() => captureStage(exercise, "specify"), /once each/);
  write(exercise, "evidence/workflow/clarified.md", "Changed");
  assert.throws(() => captureStage(exercise, "checklist"), /captured stage changed/);
});

for (const [name, mutate, pattern] of [
  ["checked gap", (root) => write(root, `${FEATURE_DIR}/reviewed-checklist.md`, evaluated.replace("[ ] CHK001", "[x] CHK001")), /checkbox/],
  ["missing checklist assessment", (root) => write(root, `${FEATURE_DIR}/checklist-results.json`, JSON.stringify({ items: results.items.slice(1) })), /every checklist item/],
  ["rewritten checklist question", (root) => write(root, `${FEATURE_DIR}/reviewed-checklist.md`, evaluated.replace("explicit", "approved")), /every generated/],
  ["gap without finding", (root) => write(root, `${FEATURE_DIR}/checklist-results.json`, JSON.stringify(results).replace("REV-001", "REV-099")), /gap needs/]
]) {
  test("rejects " + name, (t) => {
    const { exercise, app, draft } = repository(t);
    assert.equal(freeze(app).status, 0);
    reviewEvidence(exercise, draft);
    mutate(exercise);
    assert.throws(() => validateDocuments(exercise), pattern);
  });
}
test("original checklist assessment cannot be rewritten after review", (t) => {
  const { exercise, app, draft } = repository(t);
  assert.equal(freeze(app).status, 0);
  reviewEvidence(exercise, draft);
  const changed = structuredClone(results);
  changed.items[0].reason = "An assessment the reviewer never wrote.";
  write(exercise, `${FEATURE_DIR}/checklist-results.json`, JSON.stringify(changed));
  assert.throws(() => validateReviewEvidence(exercise), /original checklist results/);
});
test("workflow detects missing command dependencies, changed files, and reversed chronology", (t) => {
  const { exercise, app, draft } = repository(t);
  assert.equal(freeze(app).status, 0);
  reviewEvidence(exercise, draft);
  const original = JSON.parse(fs.readFileSync(path.join(exercise, "evidence/workflow.json")));
  const save = (value) => write(exercise, "evidence/workflow.json", JSON.stringify(value));
  let changed = structuredClone(original);
  changed.files = changed.files.filter((f) => !f.path.endsWith("constitution.md")); save(changed);
  assert.throws(() => validateWorkflow(exercise), /inventory all/);
  changed = structuredClone(original);
  changed.stages[1].startedAt = "2000-01-01T00:00:00Z"; save(changed);
  assert.throws(() => validateWorkflow(exercise), /chronology/);
  save(original);
  write(exercise, ".claude/commands/speckit.clarify.md", "Changed instructions");
  assert.throws(() => validateWorkflow(exercise), /workflow file changed/);
});
test("seal includes native outputs and dynamic command inventory", (t) => {
  const { exercise, app, draft, git } = repository(t);
  assert.equal(freeze(app).status, 0);
  reviewEvidence(exercise, draft);
  const extraEvidence = validateWorkflow(exercise);
  const outputs = ["spec.md", "clarifications.md", "review.md", "revisions.md", "reviewed-checklist.md", "checklist-results.json"].map((p) => ({ path: FEATURE_DIR + "/" + p }));
  for (const p of ["evidence/before.md", "evidence/after.md", "evidence/comparison.md", "evidence/source-audit.json"]) write(exercise, p, "Synthetic seal fixture");
  git(["add", "."]);
  git(["-c", "user.name=Specification tests", "-c", "user.email=spec-tests@example.invalid", "commit", "--quiet", "-m", "Synthetic review"]);
  const contract = { outputs, extraEvidence };
  seal(exercise, app, contract);
  const manifest = JSON.parse(fs.readFileSync(path.join(exercise, "evidence/manifest.json")));
  verifySnapshot(exercise, manifest, contract);
  write(exercise, ".claude/commands/speckit.clarify.md", "Changed command");
  assert.throws(() => verifySnapshot(exercise, manifest, contract), /artifact changed since seal/);
});
