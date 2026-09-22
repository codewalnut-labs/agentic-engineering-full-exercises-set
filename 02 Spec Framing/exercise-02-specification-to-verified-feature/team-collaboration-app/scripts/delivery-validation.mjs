import assert from "node:assert/strict";
import { hash } from "../../../../scripts/context-document-evidence.mjs";
import { APP, requiredSkills, read, git, committed, citation, snapshot, sourceOnly } from "./delivery-common.mjs";

const time = (value) => { const at = Date.parse(value); assert.ok(Number.isFinite(at), "record an ISO timestamp"); return at; };
const text = (value) => typeof value === "string" && value.trim().length > 0;
function sameSourceAt(root, commit, expected) {
  const prefix = git(root, ["rev-parse", "--show-prefix"]);
  const paths = git(root, ["ls-tree", "--full-tree", "-r", "--name-only", commit, "--", prefix + APP + "/src"]).split("\n").filter(Boolean).map((p) => p.slice(prefix.length)).sort();
  assert.deepEqual(paths, Object.keys(expected).sort(), "source inventory differs from recorded commit");
  for (const [p, sha] of Object.entries(expected)) assert.equal(hash(committed(root, commit, p)), sha, "source differs at commit: " + p);
}
export function validateRun(root, relative, expectedStage) {
  const run = JSON.parse(read(root, relative));
  assert.equal(run.stage, expectedStage, "wrong capture stage");
  assert.ok(time(run.finishedAt) >= time(run.startedAt), "invalid capture chronology");
  assert.ok(run.files && Object.keys(run.files).length, "capture needs source and test hashes");
  const prefix = git(root, ["rev-parse", "--show-prefix"]);
  const recordedPaths = git(root, ["ls-tree", "--full-tree", "-r", "--name-only", run.commit, "--", prefix + APP + "/src", prefix + APP + "/tests"]).split("\n").filter(Boolean).map((p) => p.slice(prefix.length)).sort();
  assert.deepEqual(Object.keys(run.files).sort(), recordedPaths, "capture must include every committed source and test file");
  for (const [p, sha] of Object.entries(run.files)) assert.equal(hash(committed(root, run.commit, p)), sha, "capture does not match committed source/test: " + p);
  assert.match(run.output, /^evidence\/runs\/[a-zA-Z0-9-]+\.txt$/, "keep command logs under evidence/runs");
  const output = read(root, run.output);
  assert.equal(hash(output), run.outputSha256, "captured output changed");
  const script = { baseline: "run-invitation-tests.mjs", red: "run-learner-tests.mjs", green: "run-learner-tests.mjs", final: "verify-feature.mjs" }[expectedStage];
  for (const marker of ["Command: node scripts/" + script, "Repository commit: " + run.commit, "Started at: " + run.startedAt, "Finished at: " + run.finishedAt]) assert.ok(output.includes(marker + "\n"), "capture metadata disagrees with command output");
  assert.ok(output.trimEnd().endsWith("exit code: " + run.exitCode), "capture exit code differs");
  assert.match(output, /# tests [1-9][0-9]*/, "capture must contain executed tests");
  if (expectedStage === "baseline" || expectedStage === "red") {
    assert.notEqual(run.exitCode, 0, "record an actual failing test");
    assert.match(output, /# fail [1-9][0-9]*/, "record failing test results");
    if (expectedStage === "red") {
      assert.ok(!/SyntaxError|ERR_MODULE_NOT_FOUND|ERR_UNKNOWN_FILE_EXTENSION/.test(output), "red must fail for behavior, not broken test setup");
      assert.match(output, /ERR_ASSERTION|Invitation lifecycle is not implemented/, "red must identify a behavioral failure");
    }
  } else {
    assert.equal(run.exitCode, 0, "record successful verification");
    assert.match(output, /# fail 0\b/, "capture must show passing tests");
  }
  return run;
}
export function validateDelivery(root) {
  const workflow = JSON.parse(read(root, "evidence/workflow.json"));
  assert.match(workflow.superpowersRevision ?? "", /^[a-f0-9]{40}$/, "record the installed Superpowers commit");
  assert.ok(text(workflow.authorSessionId), "record author session ID");
  assert.ok(read(root, "evidence/author-session.txt").includes(workflow.authorSessionId), "author ID missing from transcript");
  assert.ok(Array.isArray(workflow.skills), "record actual skill invocations");
  const skills = workflow.skills;
  for (const name of requiredSkills) assert.ok(skills.some((s) => s.name === name), "missing required Superpowers skill: " + name);
  const execution = skills.find((s) => ["executing-plans", "subagent-driven-development"].includes(s.name));
  assert.ok(execution, "record the execution skill");
  for (const skill of skills) {
    assert.ok(text(skill.name) && text(skill.sessionId) && text(skill.invocation) && skill.invocation.includes(skill.name), "record skill name, actual invocation, and session");
    assert.equal(skill.revision, workflow.superpowersRevision, "skills must use the recorded Superpowers revision");
    assert.match(skill.proof?.path ?? "", /^evidence\/(?:author-session\.txt|sessions\/[a-zA-Z0-9-]+\.txt)$/, "retain the actual skill transcript");
    citation(root, skill.proof);
    const transcript = read(root, skill.proof.path);
    assert.ok(transcript.includes(skill.sessionId) && skill.proof.excerpt.includes(skill.invocation), "proof must identify the skill invocation and session");
    time(skill.at);
  }
  const first = (name) => Math.min(...skills.filter((s) => s.name === name).map((s) => time(s.at)));
  const extras = skills.map((s) => s.proof.path);
  const runs = {};
  for (const stage of ["baseline", "red", "green", "final"]) {
    const relative = workflow.runs?.[stage];
    assert.match(relative ?? "", /^evidence\/runs\/[a-zA-Z0-9-]+\.json$/, "select a capture for " + stage);
    runs[stage] = validateRun(root, relative, stage);
    extras.push(relative, runs[stage].output);
  }
  const { baseline, red, green, final } = runs;
  assert.deepEqual(sourceOnly(baseline.files), JSON.parse(read(root, APP + "/starter-state.json")).files, "baseline must be the supplied unfinished application");
  assert.deepEqual(sourceOnly(red.files), sourceOnly(baseline.files), "write and run the first regression before changing production code");
  const learnerTests = Object.keys(red.files).filter((p) => p.startsWith(APP + "/tests/learner/") && /\.test\.(ts|mjs)$/.test(p));
  assert.ok(learnerTests.length, "red needs learner-written regression tests");
  for (const p of learnerTests) {
    assert.ok(!Object.hasOwn(baseline.files, p), "first-cycle regression must be added after the baseline");
    assert.equal(green.files[p], red.files[p], "run the same red test unchanged at green");
    assert.equal(final.files[p], red.files[p], "retain the first-cycle regression in the final result");
  }
  assert.notDeepEqual(sourceOnly(green.files), sourceOnly(red.files), "green must follow an implementation change");
  for (const [before, after] of [[baseline,red],[red,green],[green,final]]) {
    git(root, ["merge-base", "--is-ancestor", before.commit, after.commit]);
    assert.ok(time(after.startedAt) >= time(before.finishedAt), "captures are out of order");
  }
  assert.deepEqual(snapshot(root), final.files, "source or tests changed after final verification");
  for (const kind of ["design", "plan"]) {
    const artifact = workflow[kind];
    assert.match(artifact?.path ?? "", new RegExp("^" + APP + "/docs/superpowers/" + (kind === "design" ? "specs" : "plans") + "/[^/]+\\.md$"), "retain native Superpowers artifact paths");
    const document = read(root, artifact.path);
    assert.equal(hash(document), hash(committed(root, artifact.commit, artifact.path)), "preserve the approved design and initial plan; track execution separately");
    sameSourceAt(root, artifact.commit, sourceOnly(baseline.files));
    for (let i=1;i<=8;i++) assert.ok(document.includes("INV-0" + i), kind + " must cover INV-0" + i);
    assert.ok(!/\bTODO\b|\bTBD\b|\bFIXME\b/.test(document), "replace instructional placeholders");
    extras.push(artifact.path);
  }
  git(root, ["merge-base", "--is-ancestor", workflow.design.commit, workflow.plan.commit]);
  git(root, ["merge-base", "--is-ancestor", workflow.plan.commit, red.commit]);
  const approved = time(workflow.design.approvedAt);
  citation(root, workflow.design.approvalProof, "evidence/author-session.txt");
  assert.ok(first("brainstorming") <= approved && approved <= first("writing-plans") && first("writing-plans") <= time(execution.at), "design approval and planning must precede execution");
  assert.ok(first("test-driven-development") >= first("writing-plans") && first("test-driven-development") <= time(red.startedAt), "invoke TDD before the first red result");
  assert.ok(time(execution.at) <= time(red.startedAt), "execute the plan before its first red result");
  const plan = read(root, workflow.plan.path);
  for (const value of ["### Task", "src/services/invitationService.ts", "src/App.tsx", "tests/learner/", "npm run test:invitations", "npm run test:learner"]) assert.ok(plan.includes(value), "plan missing concrete implementation or test reference: " + value);
  const review = workflow.review;
  assert.ok(text(review?.sessionId) && ![workflow.authorSessionId,...skills.map((s)=>s.sessionId)].includes(review.sessionId), "use an independent review session");
  assert.ok(read(root,"evidence/review-session.txt").includes(review.sessionId), "reviewer ID missing from transcript");
  citation(root, review.proof, "evidence/review-session.txt");
  assert.ok(time(review.startedAt) >= time(green.finishedAt) && time(review.finishedAt) >= time(review.startedAt), "review must follow the implemented green result");
  assert.ok(skills.some((s) => s.name === "requesting-code-review" && time(s.at) >= time(green.finishedAt) && time(s.at) <= time(review.startedAt)), "invoke code review for the implemented feature");
  git(root, ["merge-base", "--is-ancestor", green.commit, review.commit]);
  git(root, ["merge-base", "--is-ancestor", review.commit, final.commit]);
  assert.ok(read(root,"evidence/review-session.txt").includes(review.commit), "review transcript must identify the reviewed commit");
  const reviewText = read(root,"evidence/review.json");
  assert.ok(read(root,"evidence/review-session.txt").includes(reviewText.trim()), "preserve the actual review response");
  const findings = JSON.parse(reviewText).findings;
  assert.ok(Array.isArray(findings) && Array.isArray(review.resolutions), "record findings and their dispositions");
  assert.equal(new Set(findings.map((f)=>f.id)).size,findings.length,"duplicate review findings");
  assert.deepEqual(review.resolutions.map((r)=>r.id).sort(), findings.map((f)=>f.id).sort(), "resolve every finding exactly once");
  for (const finding of findings) {
    assert.ok(["Critical","Important","Minor"].includes(finding.severity) && text(finding.concern), "record finding severity and concern");
    const resolution = review.resolutions.find((r)=>r.id===finding.id);
    assert.ok(["Addressed","Rejected","Deferred"].includes(resolution.status) && text(resolution.reason), "explain each review disposition");
    assert.ok(finding.severity==="Minor" || resolution.status!=="Deferred", "resolve critical and important findings");
    citation(root,resolution.proof);
    extras.push(resolution.proof.path);
    if (resolution.status==="Deferred") assert.ok(text(resolution.owner) && text(resolution.nextStep), "own deferred minor findings");
    if (resolution.status==="Addressed") {
      const change = resolution.changedFile;
      assert.ok(Object.hasOwn(final.files,change), "addressed finding needs an implementation/test change");
      const prefix = git(root,["rev-parse","--show-prefix"]);
      const existed = git(root,["ls-tree","--full-tree","-r","--name-only",review.commit,"--",prefix+change]);
      if (existed) assert.notEqual(hash(committed(root,review.commit,change)),final.files[change],"addressed finding points to unchanged code");
    }
  }
  assert.ok(skills.some((s) => s.name === "verification-before-completion" && time(s.at) >= time(review.finishedAt) && time(s.at) <= time(final.startedAt)), "verify after review and its resolutions");
  assert.ok(time(final.startedAt) >= time(review.finishedAt), "final checks must follow review");
  sameSourceAt(root, workflow.ui?.commit, sourceOnly(final.files));
  citation(root, workflow.ui.proof, "evidence/author-session.txt");
  const ui = read(root,"evidence/ui.md");
  for(const heading of ["Create and accept","Revoke","Reject without mutation"]) assert.ok(ui.includes("## "+heading), "record UI demonstration: "+heading);
  assert.ok(Array.isArray(workflow.coverage) && workflow.coverage.length===8, "trace all eight approved requirements");
  assert.deepEqual(workflow.coverage.map((r)=>r.id).sort(),Array.from({length:8},(_,i)=>"INV-0"+(i+1)), "each requirement needs one coverage record");
  for(const row of workflow.coverage) {
    assert.ok(row.implementation?.path?.startsWith(APP+"/src/"), "coverage must cite implementation");
    citation(root,row.implementation);
    assert.ok(row.verification?.path?.startsWith(APP+"/tests/") || row.verification?.path==="evidence/ui.md", "coverage must cite tests or interface evidence");
    citation(root,row.verification);
  }
  return [...new Set([...extras, ...Object.keys(final.files)])];
}
