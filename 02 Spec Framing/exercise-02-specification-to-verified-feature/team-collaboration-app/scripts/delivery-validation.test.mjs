import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { test } from "node:test";
import { hash, seal, verifySnapshot } from "../../../../scripts/context-document-evidence.mjs";
import { validateDelivery, validateRun } from "./delivery-validation.mjs";
import { APP, snapshot, sourceOnly } from "./delivery-common.mjs";

function write(root, relative, value) {
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, typeof value === "string" ? value : JSON.stringify(value,null,2)+"\n");
}
function fixture(t) {
  const parent = fs.realpathSync(os.tmpdir());
  const temporary = fs.mkdtempSync(path.join(parent,"delivery-contract-test-"));
  t.after(() => {
    const local = path.relative(parent,fs.realpathSync(temporary));
    assert.ok(local.startsWith("delivery-contract-test-") && !local.includes(path.sep), "cleanup must stay within its exact temporary directory");
    fs.rmSync(temporary,{recursive:true,force:true});
  });
  const root = path.join(temporary,"course/exercise");
  fs.mkdirSync(root,{recursive:true});
  const git = (args) => execFileSync("git",args,{cwd:temporary,encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();
  git(["init","--quiet"]);
  const commit = () => {
    git(["-c","core.autocrlf=false","add","."]);
    git(["-c","user.name=Delivery fixture","-c","user.email=delivery@example.invalid","commit","--quiet","--allow-empty","-m","Synthetic verifier fixture"]);
    return git(["rev-parse","HEAD"]);
  };
  write(root,APP+"/src/services/invitationService.ts","export const behavior = 'synthetic starter';\n");
  write(root,APP+"/src/App.tsx","export const screen = 'synthetic starter';\n");
  write(root,APP+"/tests/invitationService.test.ts","// Synthetic acceptance test location.\n");
  const initialFiles = snapshot(root);
  write(root,APP+"/starter-state.json",{files:sourceOnly(initialFiles)});
  const baselineCommit = commit();
  const timestamp = n => "2026-01-01T00:00:"+String(n).padStart(2,"0")+".000Z";
  const captures = {};
  const capture = (stage,sha,n,exitCode) => {
    const scripts = {baseline:"run-invitation-tests.mjs",red:"run-learner-tests.mjs",green:"run-learner-tests.mjs",final:"verify-feature.mjs"};
    const startedAt=timestamp(n),finishedAt=timestamp(n+1);
    const output="Command: node scripts/"+scripts[stage]+"\nRepository commit: "+sha+"\nStarted at: "+startedAt+"\nFinished at: "+finishedAt+"\n\n# Synthetic verifier fixture, not learner evidence\n# tests 1\n# fail "+(exitCode?1:0)+"\n"+(exitCode?"ERR_ASSERTION\n":"")+"\nexit code: "+exitCode+"\n";
    const outputPath="evidence/runs/"+stage+"-1.txt";
    const record={stage,commit:sha,startedAt,finishedAt,exitCode,files:snapshot(root),output:outputPath,outputSha256:hash(output)};
    write(root,outputPath,output);write(root,"evidence/runs/"+stage+"-1.json",record);
    captures[stage]=record;
  };
  capture("baseline",baselineCommit,0,1);
  const ids = Array.from({length:8},(_,i)=>"INV-0"+(i+1));
  const design=APP+"/docs/superpowers/specs/2026-01-01-fixture-design.md";
  const plan=APP+"/docs/superpowers/plans/2026-01-01-fixture.md";
  write(root,design,"# Synthetic design\n"+ids.join(" ")+"\n");
  write(root,plan,"# Synthetic plan\n"+ids.join(" ")+"\n### Task 1\nsrc/services/invitationService.ts src/App.tsx tests/learner/\nnpm run test:invitations\nnpm run test:learner\n");
  const planCommit=commit();
  write(root,APP+"/tests/learner/regression.test.mjs","// Synthetic meaningful-regression reference.\n");
  const redCommit=commit();
  capture("red",redCommit,10,1);
  write(root,APP+"/src/services/invitationService.ts","export const behavior = 'synthetic implemented';\n");
  write(root,APP+"/src/App.tsx","export const screen = 'synthetic implemented';\n");
  const greenCommit=commit();
  capture("green",greenCommit,14,0);
  capture("final",greenCommit,24,0);
  const names=["brainstorming","writing-plans","executing-plans","test-driven-development","requesting-code-review","verification-before-completion"];
  const ats=[2,5,6,7,17,23];
  const revision="a".repeat(40);
  const author="author-fixture\n"+names.map(n=>"invoke superpowers:"+n).join("\n")+"\nI approve this synthetic design.\nBrowser actions demonstrated at final source.\n";
  write(root,"evidence/author-session.txt",author);
  const findings={findings:[]};
  write(root,"evidence/review.json",findings);
  const reviewText=fs.readFileSync(path.join(root,"evidence/review.json"),"utf8");
  write(root,"evidence/review-session.txt","reviewer-fixture\nReviewed commit "+greenCommit+"\n"+reviewText);
  write(root,"evidence/ui.md","## Create and accept\nObserved synthetic state.\n## Revoke\nObserved synthetic state.\n## Reject without mutation\nObserved unchanged state.\n");
  const proof=(line,excerpt)=>({path:"evidence/author-session.txt",line,excerpt});
  const workflow={
    superpowersRevision:revision,authorSessionId:"author-fixture",
    design:{path:design,commit:planCommit,approvedAt:timestamp(4),approvalProof:proof(8,"I approve this synthetic design.")},
    plan:{path:plan,commit:planCommit},
    skills:names.map((name,i)=>({name,revision,invocation:"invoke superpowers:"+name,sessionId:"author-fixture",at:timestamp(ats[i]),proof:proof(i+2,"invoke superpowers:"+name)})),
    runs:Object.fromEntries(Object.keys(captures).map(stage=>[stage,"evidence/runs/"+stage+"-1.json"])),
    review:{sessionId:"reviewer-fixture",commit:greenCommit,startedAt:timestamp(18),finishedAt:timestamp(20),proof:{path:"evidence/review-session.txt",line:2,excerpt:"Reviewed commit "+greenCommit},resolutions:[]},
    ui:{commit:greenCommit,proof:proof(9,"Browser actions demonstrated at final source.")},
    coverage:ids.map(id=>({id,implementation:{path:APP+"/src/services/invitationService.ts",line:1,excerpt:"export const behavior = 'synthetic implemented';"},verification:{path:APP+"/tests/learner/regression.test.mjs",line:1,excerpt:"// Synthetic meaningful-regression reference."}}))
  };
  write(root,"evidence/workflow.json",workflow);
  return {root,temporary,workflow,captures,commit,timestamp};
}

test("complete standalone delivery evidence and sealed source inventory", t => {
  const {root,temporary,commit,workflow}=fixture(t);
  // Superpowers may review and verify individual tasks before the final review.
  workflow.skills.unshift(...workflow.skills.filter(s=>["requesting-code-review","verification-before-completion"].includes(s.name)).map(s=>({...s,at:"2026-01-01T00:00:08Z"})));
  write(root,"evidence/workflow.json",workflow);
  const files=validateDelivery(root);
  assert.ok(files.some(p=>p.includes("tests/learner")));
  for(const name of ["before","after"]) write(root,"evidence/"+name+".md","## Conditions\nSynthetic initial conditions.\n## Findings\nSynthetic reviewed findings.\n## Proof\nSynthetic retained evidence.\n");
  write(root,"evidence/comparison.md","## Changes\nSynthetic change description.\n## Verified\nSynthetic verification description.\n## Remaining questions\nNo synthetic questions remain.\n");
  write(root,"evidence/source-audit.json",{claims:["requirements","testing","review"].map((topic,i)=>({
    id:"FIXTURE-"+i,topic,status:"supported",reason:"Synthetic roundtrip fixture tests artifact and citation consistency.",
    artifact:{path:"evidence/after.md",line:4,excerpt:"Synthetic reviewed findings."},
    sources:[{path:"evidence/author-session.txt",line:2,excerpt:"invoke superpowers:brainstorming"}]
  }))});
  for(const name of ["verify-submission.mjs","delivery-validation.mjs","delivery-common.mjs"]) write(root,APP+"/scripts/"+name,fs.readFileSync(path.join(import.meta.dirname,name),"utf8"));
  write(root,APP+"/evidence-contract.json",fs.readFileSync(path.resolve(import.meta.dirname,"../evidence-contract.json"),"utf8"));
  write(temporary,"scripts/context-document-evidence.mjs",fs.readFileSync(path.resolve(import.meta.dirname,"../../../../scripts/context-document-evidence.mjs"),"utf8"));
  commit();
  const contract={outputs:[{path:"evidence/workflow.json"}],extraEvidence:files};
  seal(root,path.join(root,APP),contract);
  const manifest=JSON.parse(fs.readFileSync(path.join(root,"evidence/manifest.json")));
  verifySnapshot(root,manifest,contract);
  for(const mode of ["seal","content"]) {
    const result=spawnSync(process.execPath,["scripts/verify-submission.mjs",mode],{cwd:path.join(root,APP),encoding:"utf8"});
    assert.equal(result.status,0,result.stderr);
  }
  write(root,APP+"/src/App.tsx","Changed after seal.\n");
  assert.throws(()=>verifySnapshot(root,manifest,contract),/artifact changed/);
});

test("rejects incomplete or inconsistent workflow records", async t => {
  const {root,workflow}=fixture(t);
  for(const [name,mutate,pattern] of [
    ["missing Superpowers skill",w=>w.skills=w.skills.filter(s=>s.name!=="test-driven-development"),/missing required/],
    ["invented invocation citation",w=>w.skills[0].proof.excerpt="A different invocation",/stale/],
    ["unapproved design chronology",w=>w.design.approvedAt="2026-01-01T00:00:30Z",/approval and planning/],
    ["self-review",w=>w.review.sessionId=w.authorSessionId,/independent/],
    ["review before green",w=>w.review.startedAt="2026-01-01T00:00:01Z",/review must follow/],
    ["verification only before review",w=>w.skills.find(s=>s.name==="verification-before-completion").at="2026-01-01T00:00:09Z",/verify after review/],
    ["missing requirement coverage",w=>w.coverage.pop(),/all eight/],
    ["wrong capture stage",w=>w.runs.red=w.runs.baseline,/wrong capture stage/]
  ]) {
    await t.test(name,()=>{
      const changed=structuredClone(workflow);mutate(changed);
      write(root,"evidence/workflow.json",changed);
      assert.throws(()=>validateDelivery(root),pattern);
      write(root,"evidence/workflow.json",workflow);
    });
  }
});

test("captures bind to actual commits and cannot omit or change test results", async t => {
  const {root,captures}=fixture(t);
  const p="evidence/runs/red-1.json";
  for(const [name,mutate,pattern] of [
    ["omitted source file",r=>delete r.files[APP+"/src/App.tsx"],/every committed/],
    ["changed snapshot hash",r=>r.files[APP+"/src/App.tsx"]="0".repeat(64),/committed source/],
    ["passing red result",r=>r.exitCode=0,/exit code differs/],
    ["rewritten log hash",r=>r.outputSha256="0".repeat(64),/output changed/]
  ]) {
    await t.test(name,()=>{
      const changed=structuredClone(captures.red);mutate(changed);
      write(root,p,changed);
      assert.throws(()=>validateRun(root,p,"red"),pattern);
      write(root,p,captures.red);
    });
  }
});

test("review findings require dispositions and blocking findings cannot be deferred",t=>{
  const {root,workflow}=fixture(t);
  const response={findings:[{id:"REV-001",severity:"Important",location:"src/App.tsx:1",concern:"Synthetic missing feedback."}]};
  write(root,"evidence/review.json",response);
  write(root,"evidence/review-session.txt","reviewer-fixture\nReviewed commit "+workflow.review.commit+"\n"+fs.readFileSync(path.join(root,"evidence/review.json"),"utf8"));
  assert.throws(()=>validateDelivery(root),/every finding/);
  workflow.review.resolutions=[{id:"REV-001",status:"Deferred",reason:"Synthetic deferral",proof:workflow.ui.proof,owner:"owner",nextStep:"fix"}];
  write(root,"evidence/workflow.json",workflow);
  assert.throws(()=>validateDelivery(root),/critical and important/);
  workflow.review.resolutions[0]={id:"REV-001",status:"Addressed",reason:"Claimed correction",proof:workflow.ui.proof,changedFile:APP+"/src/App.tsx"};
  write(root,"evidence/workflow.json",workflow);
  assert.throws(()=>validateDelivery(root),/unchanged code/);
});

test("final verification becomes stale after a source edit",t=>{
  const {root}=fixture(t);
  write(root,APP+"/src/App.tsx","export const screen = 'changed after verification';\n");
  assert.throws(()=>validateDelivery(root),/changed after final verification/);
});

test("capture helper records real process output and refuses overwriting",t=>{
  const {root,temporary,commit}=fixture(t);
  for(const name of ["capture-delivery.mjs","delivery-common.mjs"]) write(root,APP+"/scripts/"+name,fs.readFileSync(path.join(import.meta.dirname,name),"utf8"));
  write(temporary,"scripts/context-document-evidence.mjs",fs.readFileSync(path.resolve(import.meta.dirname,"../../../../scripts/context-document-evidence.mjs"),"utf8"));
  write(root,APP+"/scripts/run-learner-tests.mjs","console.log('Synthetic capture probe\\n# tests 1\\n# fail 0');\n");
  commit();
  const run=()=>spawnSync(process.execPath,["scripts/capture-delivery.mjs","green","capture-probe"],{cwd:path.join(root,APP),encoding:"utf8"});
  const result=run();
  assert.equal(result.status,0,result.stderr);
  assert.match(fs.readFileSync(path.join(root,"evidence/runs/green-capture-probe.txt"),"utf8"),/Synthetic capture probe/);
  assert.equal(run().status,1);
  write(root,APP+"/src/App.tsx","Uncommitted source\n");
  const dirty=spawnSync(process.execPath,["scripts/capture-delivery.mjs","green","dirty"],{cwd:path.join(root,APP),encoding:"utf8"});
  assert.equal(dirty.status,1);
  assert.match(dirty.stderr,/commit source and tests/);
});
