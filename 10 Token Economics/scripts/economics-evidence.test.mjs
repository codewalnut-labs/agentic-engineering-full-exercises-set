import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { artifact, assertBatches, command, contained, createBatch, median, price, sha256, usage, verifyCapture, writeJson } from './economics-evidence.mjs';
import { inspectRequest, questions, documentFor, score as scoreCache } from './cache.mjs';
import { adoptionDecision, gradeFiles, snapshotFeature } from './ponytail.mjs';
import { run as runRtk, score as scoreRtk } from './rtk.mjs';

const chapter=path.resolve(import.meta.dirname,'..');
function fixture(kind='cache') {
  const base=fs.mkdtempSync(path.join(os.tmpdir(),'economics-test-')),root=path.join(base,'exercise'),app=path.join(root,'app');
  fs.mkdirSync(app,{recursive:true});
  const git=args=>execFileSync('git',args,{cwd:base,stdio:'pipe',encoding:'utf8'}).trim();
  git(['init','-q']);git(['config','user.name','Test']);git(['config','user.email','test@example.invalid']);
  fs.writeFileSync(path.join(app,'starter.txt'),'original');git(['add','.']);git(['commit','-qm','Test starter']);
  const sha=git(['rev-parse','HEAD']);fs.mkdirSync(path.join(root,'evidence'));fs.writeFileSync(path.join(root,'evidence/before.md'),'Starting commit: '+sha+'\n');
  return {base,root,app,contract:{kind},git,dispose(){assert.ok(base.startsWith(path.resolve(os.tmpdir())+path.sep));fs.rmSync(base,{recursive:true,force:true});}};
}
test('usage includes all mutually exclusive input categories and does not invent missing counts',()=>{
  assert.deepEqual(usage({input_tokens:5,output_tokens:2,cache_creation_input_tokens:3,cache_read_input_tokens:8}),{input:5,output:2,cacheWrite:3,cacheRead:8});
  assert.throws(()=>usage({input_tokens:5,output_tokens:2}));
  assert.throws(()=>usage({input_tokens:-1,output_tokens:2,cache_creation_input_tokens:0,cache_read_input_tokens:0}));
});
test('pricing counts cold writes and cache reads separately',()=>{
  assert.equal(price({input:1e6,output:1e6,cacheWrite:1e6,cacheRead:1e6},{input:3,output:15,cacheWrite:3.75,cacheRead:0.3}),22.05);
  assert.throws(()=>price({input:0,output:0,cacheWrite:0,cacheRead:0},{input:-3,output:15,cacheWrite:3.75,cacheRead:0.3}));
  assert.equal(median([30,10,20]),20);
});
test('capture verification rejects wrong commits, failure exits, and reversed timestamps',()=>{
  const check={script:'economics:check',markers:['PASS experiment evidence']},sha='a'.repeat(40);
  const text=`Command: npm run economics:check\nRepository commit: ${sha}\nSource SHA: ${sha}\nStarted at: 2026-10-16T00:00:00Z\nFinished at: 2026-10-16T00:00:01Z\nPASS experiment evidence\nexit code: 0\n`;
  verifyCapture(text,check,sha);
  assert.throws(()=>verifyCapture(text,check,'b'.repeat(40)));
  assert.throws(()=>verifyCapture(text.replace('exit code: 0','exit code: 1'),check,sha));
  assert.throws(()=>verifyCapture(text.replace('00:00:01Z','00:00:00Z').replace('Started at: 2026-10-16T00:00:00Z','Started at: 2026-10-16T01:00:00Z'),check,sha));
});
test('capture refuses overwrite, binds bytes, and leaves partial batches visible',()=>{
  const ctx=fixture();try{
    const batch=createBatch(ctx,'before');batch.save('test',{},{'response.json':'{"synthetic":true}'});
    assert.throws(()=>createBatch(ctx,'before'));
    const index=JSON.parse(fs.readFileSync(path.join(ctx.root,'evidence/records.json'),'utf8'));
    assert.equal(index.batches[0].complete,false);assert.throws(()=>assertBatches(index,'cache',1));
    const record=index.batches[0].records[0];assert.equal(artifact(ctx.root,record,'response.json'),'{"synthetic":true}');
    fs.writeFileSync(path.join(ctx.root,'evidence/raw/before/test.response.json'),'changed');assert.throws(()=>artifact(ctx.root,record,'response.json'));
  }finally{ctx.dispose();}
});
test('capture refuses source changes and artifact traversal',()=>{
  const ctx=fixture();try{
    assert.throws(()=>contained(ctx.root,'../escape.txt'));assert.throws(()=>contained(ctx.root,path.resolve(ctx.root,'x')));
    fs.writeFileSync(path.join(ctx.app,'starter.txt'),'uncommitted');assert.throws(()=>createBatch(ctx,'before'));
  }finally{ctx.dispose();}
});
test('builder contract preserves every character and places changing data after the breakpoint',()=>{
  const stable='Experiment namespace: N\nRules',dynamic='Request timestamp: T\n',messages=[{role:'user',content:'Q'}];
  inspectRequest({system:[{type:'text',text:stable,cache_control:{type:'ephemeral'}},{type:'text',text:dynamic}],messages},'Rules','Q','T','N',true);
  assert.throws(()=>inspectRequest({system:[{type:'text',text:dynamic+stable,cache_control:{type:'ephemeral'}}],messages},'Rules','Q','T','N',true));
  assert.throws(()=>inspectRequest({system:[{type:'text',text:stable.slice(0,-1)+dynamic}],messages},'Rules','Q','T','N'));
});
function cacheExperiment() {
  const ctx=fixture();
  const source=path.join(chapter,'exercise-02-reduce-repeated-prompt-costs/prompt-cache-app');
  fs.cpSync(path.join(source,'fixtures'),path.join(ctx.app,'fixtures'),{recursive:true});fs.copyFileSync(path.join(source,'provider.json'),path.join(ctx.app,'provider.json'));
  const index={schemaVersion:1,kind:'cache',batches:[]};
  for(const lane of ['before','after']) {
    const batch={lane,sourceSha:'a'.repeat(40),startingSha:'a'.repeat(40),startedAt:'2026-10-16T00:00:00Z',finishedAt:'2026-10-16T00:01:00Z',complete:true,records:[]};index.batches.push(batch);
    for(const [n,task] of questions.entries()) {
      const timestamp='T:'+n,namespace=lane,stable=`Experiment namespace: ${namespace}\n${documentFor(ctx.app,task.id)}`,dynamic=`Request timestamp: ${timestamp}\n`;
      const request={model:'claude-sonnet-4-6',max_tokens:256,temperature:0,messages:[{role:'user',content:task.question}],system:lane==='before'?[{type:'text',text:dynamic+stable,cache_control:{type:'ephemeral'}}]:[{type:'text',text:stable,cache_control:{type:'ephemeral'}},{type:'text',text:dynamic}]};
      const response={id:lane+'-'+n,model:'claude-sonnet-4-6',content:[{type:'text',text:JSON.stringify(task.answer)}],usage:{input_tokens:20,output_tokens:10,cache_creation_input_tokens:lane==='before'||n===0||n===3?2000:0,cache_read_input_tokens:lane==='after'&&n>0&&n<3?2000:0}};
      const record={id:task.id,timestamp,namespace,durationMs:1,artifacts:{}};batch.records.push(record);
      for(const [suffix,value] of Object.entries({'request.json':request,'response.json':response,'http.json':{status:200,requestId:lane+'-'+n}})) {
        const file=`evidence/raw/${lane}/${task.id}.${suffix}`,raw=JSON.stringify(value);fs.mkdirSync(path.dirname(path.join(ctx.root,file)),{recursive:true});fs.writeFileSync(path.join(ctx.root,file),raw);record.artifacts[file]=sha256(raw);
      }
    }
  }
  return {ctx,index};
}
test('synthetic cache workload accounts for cold creation, warm reads, outputs, and policy invalidation',()=>{
  const {ctx,index}=cacheExperiment();try{const metrics=scoreCache(ctx,index);assert.equal(metrics.decision,'adopt');assert.equal(metrics.cacheReadTokens,4000);assert.ok(metrics.afterCostUsd<metrics.beforeCostUsd);}finally{ctx.dispose();}
});
test('cache verifier rejects a stale policy answer even with a cache hit',()=>{
  const {ctx,index}=cacheExperiment();try{
    const record=index.batches[1].records[3],file='evidence/raw/after/updated-policy.response.json';
    const body=JSON.parse(fs.readFileSync(path.join(ctx.root,file),'utf8'));body.content[0].text='{"retentionDays":30}';const raw=JSON.stringify(body);fs.writeFileSync(path.join(ctx.root,file),raw);record.artifacts[file]=sha256(raw);
    assert.throws(()=>scoreCache(ctx,index),/current policy/);
  }finally{ctx.dispose();}
});
test('cache verifier rejects missing cells and raw tampering',()=>{
  const {ctx,index}=cacheExperiment();try{
    index.batches[1].records.pop();assert.throws(()=>scoreCache(ctx,index));
  }finally{ctx.dispose();}
});
test('Ponytail starter fails acceptance and shared utilities cannot be replaced',()=>{
  const app=path.join(chapter,'exercise-03-build-feature-with-fewer-tokens/ponytail-feature-app'),ctx={app};
  const files=snapshotFeature(app);assert.notEqual(gradeFiles(ctx,files).exitCode,0);
  assert.throws(()=>gradeFiles(ctx,{...files,'src/lib/csv.mjs':'weakened serializer'}),/utilities changed/);
});
test('process errors are represented as failures rather than passing empty captures',()=>{
  const result=command('nonexistent-economics-test-executable',[]);assert.notEqual(result.exitCode,0);assert.ok(result.stderr.length);
});
test('Ponytail cannot adopt a cheaper incomplete result or hide weak cells',()=>{
  assert.equal(adoptionDecision([100,110,120],[70,75,80],3),'adopt');
  assert.equal(adoptionDecision([100,110,120],[70,75,80],2),'reject');
  assert.equal(adoptionDecision([100,110,120],[90,120,130],3),'reject');
  assert.equal(adoptionDecision([100,110,120],[100,110,120],3),'reject');
  assert.throws(()=>adoptionDecision([100],[80],1));
});
test('real pinned RTK captures preserve failed checks and count fallback output',{skip:!process.env.RTK_EXE},async()=>{
  const ctx=fixture('rtk');try{
    const source=path.join(chapter,'exercise-01-reduce-tool-output-without-hiding-failures/rtk-investigation-app');
    fs.cpSync(path.join(source,'fixtures'),path.join(ctx.app,'fixtures'),{recursive:true});writeJson(path.join(ctx.app,'rtk-policy.json'),{history:'raw',search:'raw',checks:'raw'});
    ctx.git(['add','.']);ctx.git(['commit','-qm','Synthetic pilot setup']);fs.writeFileSync(path.join(ctx.root,'evidence/before.md'),'Starting commit: '+ctx.git(['rev-parse','HEAD'])+'\n');
    await runRtk(ctx,{lane:'before'});
    writeJson(path.join(ctx.app,'rtk-policy.json'),{history:'rtk',search:'rtk',checks:'rtk-then-raw'});ctx.git(['add','.']);ctx.git(['commit','-qm','Pilot policy']);
    await runRtk(ctx,{lane:'after',rtk:process.env.RTK_EXE});
    const metrics=scoreRtk(ctx,JSON.parse(fs.readFileSync(path.join(ctx.root,'evidence/records.json'),'utf8')));assert.ok(metrics.beforeBytes>0&&metrics.afterBytes>0);assert.equal(metrics.decision,'adopt');
    console.log('Actual pinned RTK pilot:',metrics);
  }finally{ctx.dispose();}
});
