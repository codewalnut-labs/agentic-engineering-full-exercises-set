import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { artifact, assertBatches, command, createBatch, git, gitBlob, median, price, readJson, sha256, startingSha, totalTokens, usage } from './economics-evidence.mjs';

export const starterFiles=['src/feature/exportFiltered.mjs','src/lib/csv.mjs','src/lib/filters.mjs','tests/export-filtered.test.mjs'];
export function snapshot(directory) {
  const files={};
  function walk(dir) {for(const entry of fs.readdirSync(dir,{withFileTypes:true})) {
    if(entry.name==='.git')continue;
    const file=path.join(dir,entry.name);assert.ok(!entry.isSymbolicLink(),'trial files cannot be symlinks');
    if(entry.isDirectory())walk(file);
    else if(entry.isFile())files[path.relative(directory,file).split(path.sep).join('/')]=fs.readFileSync(file,'utf8');
  }}
  walk(directory);return files;
}
export function gradeFiles(ctx,files) {
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'ponytail-grade-'));
  try {
    for(const [file,text] of Object.entries(files)) {
      assert.ok(!file.includes('\\')&&path.posix.normalize(file)===file&&!file.split('/').includes('..'),'noncanonical trial path');
      if(!(file.startsWith('src/feature/')||file.startsWith('tests/')||['src/lib/csv.mjs','src/lib/filters.mjs'].includes(file)))return {stdout:'',stderr:'unexpected file in feature trial: '+file,exitCode:1};
      const dest=path.resolve(dir,file);assert.ok(dest.startsWith(dir+path.sep));fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,text);
    }
    for(const file of ['src/lib/csv.mjs','src/lib/filters.mjs'])assert.equal(files[file],fs.readFileSync(path.join(ctx.app,file),'utf8'),'existing reusable utilities changed');
    fs.copyFileSync(path.join(ctx.app,'fixtures/acceptance.mjs'),path.join(dir,'acceptance.mjs'));
    const acceptance=command(process.execPath,['acceptance.mjs'],{cwd:dir});
    if(acceptance.exitCode!==0)return acceptance;
    const testFiles=Object.keys(files).filter(file=>file.startsWith('tests/')&&file.endsWith('.test.mjs'));
    if(!testFiles.length||!testFiles.some(file=>files[file].includes('exportFiltered')&&files[file].includes('assert')))return {stdout:acceptance.stdout,stderr:'include behavioral tests exercising exportFiltered',exitCode:1};
    const tests=command(process.execPath,['--test',...testFiles],{cwd:dir});
    return {stdout:acceptance.stdout+'\n'+tests.stdout,stderr:acceptance.stderr+'\n'+tests.stderr,exitCode:tests.exitCode};
  } finally { assert.ok(dir.startsWith(path.resolve(os.tmpdir())+path.sep));fs.rmSync(dir,{recursive:true,force:true}); }
}
export async function run(ctx,options) {
  assert.ok(options.claude&&path.isAbsolute(options.claude),'pass --claude <absolute native Claude Code executable>');
  const config=readJson(path.join(ctx.app,'agent-config.json'));
  const version=command(options.claude,['--version']);assert.equal(version.exitCode,0,'Claude Code must be installed and authenticated');
  const help=command(options.claude,['--help']);
  assert.ok(help.stdout.includes('--bare')&&help.stdout.includes('--append-system-prompt-file'),'use a Claude Code build supporting bare mode and append-system-prompt-file');
  const skill=fs.readFileSync(path.join(ctx.app,'fixtures/ponytail/SKILL.md'),'utf8');
  const common=fs.readFileSync(path.join(ctx.root,'docs/feature-request.md'),'utf8');
  const batch=createBatch(ctx,options.lane),initial=startingSha(ctx.root),prefix=git(ctx.app,['rev-parse','--show-prefix']);
  for(let n=1;n<=3;n++) {
    const dir=fs.mkdtempSync(path.join(os.tmpdir(),'ponytail-trial-'));
    try {
      for(const file of starterFiles) {
        const text=gitBlob(ctx.root,initial,prefix+file);
        const dest=path.join(dir,file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,text);
      }
      const args=['--bare','-p','--output-format','stream-json','--verbose','--model',config.model,'--effort',config.effort,'--max-turns',String(config.maxTurns),'--permission-mode','acceptEdits','--tools','Read,Edit,Write,Glob,Grep,Bash','--allowedTools','Read','Edit','Write','Glob','Grep','Bash(node *)'];
      if(options.lane==='after')args.push('--append-system-prompt-file',path.join(ctx.app,'fixtures/ponytail/SKILL.md'));
      const start=Date.now();
      const output=command(options.claude,args,{cwd:dir,input:common,timeout:config.timeoutMs});
      const files=snapshot(dir);let grade;
      try{grade=gradeFiles(ctx,files);}catch(error){grade={stdout:'',stderr:error.message,exitCode:1};}
      batch.save('trial-'+n,{durationMs:Date.now()-start}, {'invocation.json':JSON.stringify({version:version.stdout.trim(),executableSha:sha256(fs.readFileSync(options.claude)),args,model:config.model,effort:config.effort,maxTurns:config.maxTurns,timeoutMs:config.timeoutMs,exitCode:output.exitCode},null,2),'prompt.txt':common,'skill.txt':options.lane==='after'?skill:'','session.jsonl':output.stdout,'stderr.txt':output.stderr,'files.json':JSON.stringify(files,null,2),'grade.json':JSON.stringify(grade)});
    } finally {assert.ok(dir.startsWith(path.resolve(os.tmpdir())+path.sep));fs.rmSync(dir,{recursive:true,force:true});}
  }
  batch.finish();console.log('Captured three fresh feature trials; all responses, failures, and patches are preserved.');
}
export async function check(ctx) {
  const files=snapshotFeature(ctx.app);
  const result=gradeFiles(ctx,files);assert.equal(result.exitCode,0,result.stdout+'\n'+result.stderr);
}
export function snapshotFeature(app) {
  const files={};
  for(const prefix of ['src/feature','src/lib','tests']) {
    const dir=path.join(app,prefix);
    if(fs.existsSync(dir))for(const [file,text] of Object.entries(snapshot(dir)))files[prefix+'/'+file]=text;
  }
  return files;
}
export function score(ctx,index) {
  assertBatches(index,'ponytail',3);
  const config=readJson(path.join(ctx.app,'agent-config.json'));
  const currentSkill=fs.readFileSync(path.join(ctx.app,'fixtures/ponytail/SKILL.md'),'utf8');
  const prompt=fs.readFileSync(path.join(ctx.root,'docs/feature-request.md'),'utf8');
  const lanes={before:[],after:[]},sessions=new Set();let cliIdentity;
  for(const batch of index.batches)for(let n=1;n<=3;n++) {
    const record=batch.records.find(r=>r.id==='trial-'+n);assert.ok(record,'missing trial');
    assert.equal(artifact(ctx.root,record,'prompt.txt'),prompt,'requirements differed between trials');
    assert.equal(artifact(ctx.root,record,'skill.txt'),batch.lane==='after'?currentSkill:'','Ponytail must be the only guidance change');
    const invocation=JSON.parse(artifact(ctx.root,record,'invocation.json'));
    for(const key of ['model','effort','maxTurns','timeoutMs'])assert.equal(invocation[key],config[key]);
    const identity=invocation.version+':'+invocation.executableSha;
    if(cliIdentity)assert.equal(identity,cliIdentity,'keep the same agent version and executable');else cliIdentity=identity;
    const expectedArgs=['--bare','-p','--output-format','stream-json','--verbose','--model',config.model,'--effort',config.effort,'--max-turns',String(config.maxTurns),'--permission-mode','acceptEdits','--tools','Read,Edit,Write,Glob,Grep,Bash','--allowedTools','Read','Edit','Write','Glob','Grep','Bash(node *)'];
    if(batch.lane==='after'){assert.equal(invocation.args.at(-2),'--append-system-prompt-file');assert.ok(invocation.args.at(-1).replaceAll('\\','/').endsWith('/fixtures/ponytail/SKILL.md'));}
    assert.deepEqual(batch.lane==='after'?invocation.args.slice(0,-2):invocation.args,expectedArgs,'conditions or permissions changed');
    const events=artifact(ctx.root,record,'session.jsonl').split(/\r?\n/).filter(Boolean).map(line=>JSON.parse(line));
    const results=events.filter(e=>e.type==='result');assert.equal(results.length,1,'one original terminal result required');
    const result=results[0];assert.ok(result.session_id&&!sessions.has(result.session_id),'each trial needs a fresh unique session');sessions.add(result.session_id);
    assert.ok(events.some(e=>e.type==='assistant'),'include the actual agent/tool exchange');
    assert.ok(events.some(e=>e.type==='assistant'&&e.message?.content?.some(b=>b.type==='tool_use'&&['Write','Edit','Bash'].includes(b.name))),'include actual file-changing tool activity');
    assert.deepEqual(Object.keys(result.modelUsage??{}),[config.model],'no unrecorded model fallback or extra model');
    const u=usage(result.usage);
    const files=JSON.parse(artifact(ctx.root,record,'files.json'));
    const measured=JSON.parse(artifact(ctx.root,record,'grade.json'));
    let grade;try{grade=gradeFiles(ctx,files);}catch(error){grade={exitCode:1};}
    assert.equal(measured.exitCode,grade.exitCode,'replayed correctness differs');
    const passed=invocation.exitCode===0&&!result.is_error&&grade.exitCode===0;
    assert.ok(Number.isFinite(record.durationMs)&&record.durationMs>=0);
    lanes[batch.lane].push({tokens:totalTokens(u),cost:price(u,config.usdPerMillionTokens),passed,durationMs:record.durationMs,files});
  }
  const before=lanes.before,after=lanes.after;
  const beforeMedian=median(before.map(r=>r.tokens)),afterMedian=median(after.map(r=>r.tokens));
  const afterPasses=after.filter(r=>r.passed).length;
  const selected=readJson(path.join(ctx.root,'evidence/selected-trial.json'));
  assert.ok(Number.isInteger(selected.trial)&&selected.trial>=1&&selected.trial<=3,'select an after trial');
  assert.ok(after[selected.trial-1].passed,'selected feature must pass correctness');
  const normalized=files=>Object.fromEntries(Object.entries(files).map(([file,text])=>[file,text.replaceAll('\r\n','\n')]));
  assert.deepEqual(normalized(snapshotFeature(ctx.app)),normalized(after[selected.trial-1].files),'submit the original selected patch without subsequent edits');
  return {decision:adoptionDecision(before.map(r=>r.tokens),after.map(r=>r.tokens),afterPasses),beforeMedianTokens:beforeMedian,afterMedianTokens:afterMedian,beforePasses:before.filter(r=>r.passed).length,afterPasses,beforeTotalCostUsd:before.reduce((a,r)=>a+r.cost,0),afterTotalCostUsd:after.reduce((a,r)=>a+r.cost,0),beforeMedianDurationMs:median(before.map(r=>r.durationMs)),afterMedianDurationMs:median(after.map(r=>r.durationMs)),beforeTokenRange:[Math.min(...before.map(r=>r.tokens)),Math.max(...before.map(r=>r.tokens))],afterTokenRange:[Math.min(...after.map(r=>r.tokens)),Math.max(...after.map(r=>r.tokens))],selectedTrial:selected.trial,measure:'All reported input, cache-write, cache-read and output tokens; all six attempts included; list-price costs are separate from token totals'};
}
export function adoptionDecision(before,after,passes) {
  assert.equal(before.length,3);assert.equal(after.length,3);
  return passes===3&&median(after)<median(before)?'adopt':'reject';
}
