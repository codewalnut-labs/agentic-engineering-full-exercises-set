import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { hash } from "../../../../scripts/context-document-evidence.mjs";

export const FEATURE_DIR = "specs/subscription-management";
export const reviewInputs = ["spec.md", "clarifications.md", "checklists/requirements.md", "checklists/spec-review.md"].map((name) => ({ source: `${FEATURE_DIR}/${name}`, path: `evidence/reviewed/${path.posix.basename(name)}` }));
const topics = ["Authorization", "Billing", "Pending", "Recovery", "Scope"];
const text = (value) => typeof value === "string" && value.trim().length > 0;
export function field(section, name) {
  return section.match(new RegExp(`^- ${name}:[ \\t]*(.+)$`, "m"))?.[1].trim() ?? "";
}
export function sections(source, prefix) {
  const pattern = prefix === "Q" ? "Q[1-9][0-9]*" : prefix + "-[0-9]{3}";
  const matches = [...source.matchAll(new RegExp(`^#{2,6} +(${pattern}):[ \\t]*(.+)$`, "gm"))];
  assert.equal(new Set(matches.map((m) => m[1])).size, matches.length, `duplicate ${prefix} identifiers`);
  return matches.map((m) => {
    const depth = m[0].match(/^#+/)[0].length;
    const remainder = source.slice(m.index + m[0].length);
    const boundary = remainder.search(new RegExp(`^#{1,${depth}} +`, "m"));
    const end = boundary < 0 ? source.length : m.index + m[0].length + boundary;
    return { id: m[1], title: m[2], body: source.slice(m.index, end) };
  });
}
function refs(value, prefix) {
  return [...new Set(value.match(new RegExp(prefix === "Q" ? "\\bQ[1-9][0-9]*\\b" : `\\b${prefix}-[0-9]{3}\\b`, "g")) ?? [])];
}
function requiredFields(section, names) {
  for (const name of names) assert.ok(text(field(section.body, name)), `${section.id} needs ${name}`);
}
function coverage(rows) {
  for (const topic of topics) assert.ok(rows.some((row) => new RegExp(`\\b${topic}\\b`, "i").test(field(row.body, "Category"))), `missing category: ${topic}`);
}
function known(ids, entries, message) {
  assert.ok(ids.length > 0, message);
  for (const id of ids) assert.ok(entries.some((entry) => entry.id === id), `unknown reference: ${id}`);
}
export function validateSpecification(clarifications, spec, review, revisions) {
  for (const document of [clarifications, spec, review, revisions]) {
    assert.ok(text(document), "required document is empty");
    assert.ok(!/\b(TODO|TBD|FIXME)\b/i.test(document), "replace instructional placeholders with explicit decisions or blockers");
  }
  const questions = sections(clarifications, "Q");
  assert.ok(questions.length, "clarifications need Q headings");
  coverage(questions);
  for (const question of questions) {
    assert.ok(question.title.trim().endsWith("?"), `${question.id} must be a question`);
    requiredFields(question, ["Category", "Repository evidence", "Status", "Answer", "Authority", "Consequence"]);
    assert.ok(["Confirmed", "Assumption", "Open"].includes(field(question.body, "Status")), "invalid clarification status");
    if (field(question.body, "Status") !== "Confirmed") requiredFields(question, ["Owner", "Next step"]);
    assert.match(field(question.body, "Repository evidence"), /subscription-management-app\/(docs|src)\//, "cite repository evidence for each question");
  }
  for (const source of ["docs/stakeholder-notes.md", "docs/billing-constraints.md", "src/"]) assert.ok(clarifications.includes("subscription-management-app/" + source), `consult ${source}`);
  for (const heading of ["Scope", "User Scenarios & Testing", "Requirements", "Success Criteria", "Readiness"]) assert.ok(spec.includes("## " + heading), `specification needs ${heading}`);
  assert.match(spec, /^### User Story .+Priority: P[123]/m, "preserve prioritized native user stories");
  assert.match(spec, /^### Edge Cases/m, "include edge cases");
  const requirements = nativeEntries(spec, "FR");
  const criteria = nativeEntries(spec, "SC");
  assert.ok(requirements.length && criteria.length, "preserve native FR requirements and SC success criteria");
  const readinessSection = spec.split("## Readiness")[1] ?? "";
  const blocked = refs(field(readinessSection, "Blocked"), "FR");
  const conditional = refs(field(readinessSection, "Conditional"), "FR");
  for (const name of ["Blocked", "Conditional"]) {
    const value = field(readinessSection, name);
    assert.ok(value === "None" || refs(value, "FR").length, `declare ${name} requirements or None`);
  }
  for (const id of [...blocked, ...conditional]) known([id], requirements, "invalid readiness dependency");
  assert.ok(!blocked.some((id) => conditional.includes(id)), "a requirement cannot be both blocked and conditional");
  for (const question of questions) {
    requiredFields(question, ["Requirements"]);
    known(refs(field(question.body, "Requirements"), "FR"), requirements, "question needs requirement references");
  }
  const scenarioSection = spec.split("## User Scenarios & Testing")[1]?.split(/^## /m)[0] ?? "";
  const scenarios = [...scenarioSection.matchAll(/^[ \t]*\d+\.[ \t]+([\s\S]*?)(?=^[ \t]*\d+\.[ \t]+|^#{1,6} |$(?![\s\S]))/gm)].map((m) => m[1]);
  assert.ok(scenarios.length, "include at least one Given/When/Then acceptance scenario");
  for (const scenario of scenarios) {
    for (const word of ["Given", "When", "Then"]) assert.match(scenario, new RegExp(`\\b${word}\\b`), `each acceptance scenario needs ${word}`);
    known(refs(scenario, "FR"), requirements, "acceptance scenarios need FR references");
  }
  for (const requirement of requirements) {
    const dependencies = questions.filter((q) => refs(field(q.body, "Requirements"), "FR").includes(requirement.id));
    assert.ok(dependencies.length, `${requirement.id} needs a decision reference`);
    const states = dependencies.map((q) => field(q.body, "Status"));
    if (states.includes("Open")) assert.ok(blocked.includes(requirement.id), `${requirement.id} depends on an open decision`);
    if (states.includes("Assumption")) assert.ok([...blocked, ...conditional].includes(requirement.id), `${requirement.id} depends on an assumption`);
    if (!blocked.includes(requirement.id)) assert.ok(scenarios.some((row) => refs(row, "FR").includes(requirement.id)), `${requirement.id} lacks an acceptance scenario`);
  }
  for (const heading of ["Coverage", "Findings"]) assert.ok(review.includes("## " + heading), `review needs ${heading}`);
  for (const topic of topics) assert.match(review, new RegExp(`\\b${topic}\\b`, "i"), `review must cover ${topic}`);
  const findings = sections(review, "REV");
  const dispositions = sections(revisions, "REV");
  assert.deepEqual(dispositions.map((r) => r.id).sort(), findings.map((r) => r.id).sort(), "account for every finding exactly once");
  if (!findings.length) {
    assert.match(review, /no actionable findings/i, "explicitly record a review with no actionable findings");
    assert.match(revisions, /no revision|no changes/i, "explain why no revision was needed");
  }
  let deferredBlocker = false;
  for (const finding of findings) {
    requiredFields(finding, ["Severity", "Location", "Concern"]);
    assert.ok(["Blocking", "Non-blocking"].includes(field(finding.body, "Severity")), "invalid review severity");
    const disposition = dispositions.find((r) => r.id === finding.id);
    requiredFields(disposition, ["Disposition", "Reason"]);
    const result = field(disposition.body, "Disposition");
    assert.ok(["Addressed", "Deferred", "Rejected"].includes(result), "invalid finding disposition");
    if (result === "Deferred") {
      requiredFields(disposition, ["Owner", "Next step"]);
      if (field(finding.body, "Severity") === "Blocking") deferredBlocker = true;
    }
    if (result === "Addressed") {
      const change = field(disposition.body, "Change");
      assert.ok(change === "Scope" || [...questions, ...requirements, ...criteria].some((r) => r.id === change), "addressed finding must identify its final change");
    }
  }
  const readiness = field(spec.split("## Readiness")[1] ?? "", "Status");
  assert.ok(["Ready", "Needs decisions"].includes(readiness), "declare overall readiness");
  if (deferredBlocker || questions.some((q) => field(q.body, "Status") !== "Confirmed") || blocked.length || conditional.length || /\[NEEDS CLARIFICATION\b/i.test(spec)) {
    assert.equal(readiness, "Needs decisions", "unresolved work must not be presented as ready");
  }
  return { questions, requirements, criteria, findings };
}

export function readArtifact(root, relative) {
  assert.ok(text(relative) && !path.win32.isAbsolute(relative) && !relative.includes("\\"), "use relative artifact paths");
  const absolute = path.resolve(root, relative);
  assert.ok(fs.existsSync(absolute), `missing required artifact: ${relative}`);
  const local = path.relative(fs.realpathSync(root), fs.realpathSync(absolute));
  assert.ok(local && !local.startsWith("..") && !path.isAbsolute(local), "artifact escapes exercise");
  assert.ok(fs.statSync(absolute).isFile(), "artifact must be a file");
  return fs.readFileSync(absolute, "utf8").replaceAll("\r\n", "\n");
}
export function validateDocuments(root) {
  const result = validateSpecification(...["clarifications", "spec", "review", "revisions"].map((name) => readArtifact(root, `${FEATURE_DIR}/${name}.md`)));
  validateChecklist(root, result);
  return result;
}
export function citation(root, record, expectedPath) {
  assert.equal(record?.path, expectedPath, "cite the actual session transcript");
  assert.ok(Number.isInteger(record.line) && record.line > 0 && text(record.excerpt), "citation needs line and excerpt");
  assert.equal(readArtifact(root, record.path).split("\n").slice(record.line - 1, record.line - 1 + record.excerpt.split("\n").length).join("\n"), record.excerpt, "stale session citation");
}
export function validateReviewEvidence(root) {
  const inputs = JSON.parse(readArtifact(root, "evidence/review-inputs.json"));
  const session = JSON.parse(readArtifact(root, "evidence/review-session.json"));
  const git = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).replaceAll("\r\n", "\n");
  assert.match(inputs.reviewedCommit ?? "", /^[a-f0-9]{40}$/, "record full reviewed commit");
  git(["merge-base", "--is-ancestor", inputs.reviewedCommit, "HEAD"]);
  const prefix = git(["rev-parse", "--show-prefix"]).trim();
  assert.equal(inputs.files?.length, reviewInputs.length, "preserve all four review inputs");
  for (const expected of reviewInputs) {
    const input = inputs.files.find((f) => f.source === expected.source);
    assert.equal(input?.path, expected.path, "invalid review input path");
    assert.equal(hash(readArtifact(root, input.path)), input.sha256, "preserved draft changed");
    assert.equal(hash(git(["show", `${inputs.reviewedCommit}:${prefix}${input.source}`])), input.sha256, "review input does not match committed draft");
  }
  for (const key of ["authorSessionId", "reviewerSessionId", "agent", "model"]) assert.ok(text(session[key]), `record ${key}`);
  assert.notEqual(session.authorSessionId, session.reviewerSessionId, "review requires a fresh session");
  const frozen = Date.parse(inputs.frozenAt), start = Date.parse(session.startedAt), end = Date.parse(session.finishedAt);
  assert.ok(Number.isFinite(frozen) && Number.isFinite(start) && Number.isFinite(end) && start >= frozen && end >= start, "invalid review chronology");
  const author = readArtifact(root, "evidence/author-session.txt");
  const reviewer = readArtifact(root, "evidence/review-session.txt");
  assert.ok(author.includes(session.authorSessionId) && reviewer.includes(session.reviewerSessionId), "session IDs must match retained transcripts");
  citation(root, session.authorProof, "evidence/author-session.txt");
  citation(root, session.inputProof, "evidence/review-session.txt");
  citation(root, session.reviewProof, "evidence/review-session.txt");
  const review = readArtifact(root, `${FEATURE_DIR}/review.md`);
  assert.ok(reviewer.includes(review.trim()), "preserve the reviewer's actual assessment without rewriting it");
  assert.ok(reviewer.includes(readArtifact(root, `${FEATURE_DIR}/reviewed-checklist.md`).trim()), "preserve the reviewer's evaluated checklist");
  const originalResults = [...reviewer.matchAll(/```json\s*\n([\s\S]*?)\n```/g)].flatMap((match) => {
    try { const value = JSON.parse(match[1]); return Array.isArray(value.items) ? [value.items] : []; } catch { return []; }
  });
  const finalItems = JSON.parse(readArtifact(root, `${FEATURE_DIR}/checklist-results.json`)).items;
  const assessment = (items) => items.map(({ resolution, ...item }) => item).sort((a, b) => a.id.localeCompare(b.id));
  assert.ok(originalResults.some((items) => {
    try { assert.deepEqual(assessment(items), assessment(finalItems)); return true; } catch { return false; }
  }), "preserve the original checklist results in a JSON code block in the review transcript");
  const draftIds = [...sections(readArtifact(root, "evidence/reviewed/clarifications.md"), "Q"), ...nativeEntries(readArtifact(root, "evidence/reviewed/spec.md"), "FR"), ...nativeEntries(readArtifact(root, "evidence/reviewed/spec.md"), "SC")].map((r) => r.id);
  for (const finding of sections(review, "REV")) {
    const location = field(finding.body, "Location");
    assert.ok(location === "Scope" || draftIds.includes(location), "finding must locate an issue in the reviewed draft");
  }
  const dispositions = sections(readArtifact(root, `${FEATURE_DIR}/revisions.md`), "REV");
  for (const disposition of dispositions.filter((row) => field(row.body, "Disposition") === "Addressed")) {
    const change = field(disposition.body, "Change");
    const name = change.startsWith("Q") ? "clarifications" : "spec";
    const before = readArtifact(root, `evidence/reviewed/${name}.md`);
    const after = readArtifact(root, `${FEATURE_DIR}/${name}.md`);
    const section = (document) => {
      if (change === "Scope") return document.split("## Scope")[1]?.split(/^## /m)[0]?.trim();
      const prefix = change.startsWith("Q") ? "Q" : change.split("-")[0];
      return (prefix === "Q" ? sections(document, prefix) : nativeEntries(document, prefix)).find((row) => row.id === change)?.body.trim();
    };
    assert.ok(section(after), "addressed change must exist in the final document");
    assert.notEqual(section(before), section(after), `${disposition.id} claims an unchanged section was addressed`);
  }
}

export function nativeEntries(source, prefix) {
  const matches = [...source.matchAll(new RegExp(`^[ \\t]*- \\*\\*(${prefix}-[0-9]{3})\\*\\*:[ \\t]*(.+)$`, "gm"))];
  assert.equal(new Set(matches.map((m) => m[1])).size, matches.length, `duplicate ${prefix} identifiers`);
  return matches.map((m) => {
    const rest = source.slice(m.index + m[0].length);
    const boundary = rest.search(/^[ \t]*- |^#{1,6} /m);
    return { id: m[1], body: (m[0] + (boundary < 0 ? rest : rest.slice(0, boundary))).trim() };
  });
}
export function checklistItems(source) {
  const rows = [...source.matchAll(/^\s*- \[([ xX])\] (CHK\d+)\b[ \t]*(.+)$/gm)].map((m) => ({ id: m[2], checked: m[1] !== " ", wording: m[3] }));
  assert.ok(rows.length, "checklist needs CHK items");
  assert.equal(new Set(rows.map((r) => r.id)).size, rows.length, "duplicate checklist IDs");
  return rows;
}
export function validateChecklist(root, result) {
  const original = checklistItems(readArtifact(root, "evidence/reviewed/spec-review.md"));
  assert.ok(original.every((r) => !r.checked), "generated checklist must start unchecked");
  assert.equal(readArtifact(root, `${FEATURE_DIR}/checklists/spec-review.md`), readArtifact(root, "evidence/reviewed/spec-review.md"), "preserve the generated checklist; evaluate its copy");
  const evaluated = checklistItems(readArtifact(root, `${FEATURE_DIR}/reviewed-checklist.md`));
  assert.deepEqual(evaluated.map(({ id, wording }) => ({ id, wording })), original.map(({ id, wording }) => ({ id, wording })), "preserve every generated checklist item");
  const items = JSON.parse(readArtifact(root, `${FEATURE_DIR}/checklist-results.json`)).items;
  assert.ok(Array.isArray(items), "record checklist results");
  assert.deepEqual(items.map((r) => r.id).sort(), original.map((r) => r.id).sort(), "evaluate every checklist item exactly once");
  const ids = [...result.questions, ...result.requirements, ...result.criteria];
  for (const item of items) {
    assert.ok(["Satisfied", "Gap", "Not applicable"].includes(item.status), "invalid checklist status");
    assert.ok(text(item.reason), "explain each checklist assessment");
    assert.ok(Array.isArray(item.references) && item.references.length, "cite checklist assessment targets");
    for (const id of item.references) if (id !== "Scope") known([id], ids, "invalid checklist reference");
    assert.equal(evaluated.find((r) => r.id === item.id).checked, item.status === "Satisfied", "checkbox must match assessment");
    if (item.status === "Gap") assert.ok(result.findings.some((r) => r.id === item.finding), "each checklist gap needs a review finding");
  }
}
