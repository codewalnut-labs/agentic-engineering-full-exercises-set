import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { artifact, assertBatches, command, createBatch, readJson, sha256 } from './economics-evidence.mjs';

export const workload=[
  {id:'history',program:'git',args:['log','-8','--stat'],rtk:['git','log','-8','--stat'],exitCode:0,signals:[]},
  {id:'search',program:'rg',args:['-n','policyNote','notes'],rtk:['rg','-n','policyNote','notes'],exitCode:0,signals:[]},
  {id:'checks',program:'node',args:['--test','checkout.test.mjs'],rtk:['test','--','node','--test','checkout.test.mjs'],exitCode:1,signals:['CHECKOUT-017','checkout.test.mjs']},
];
function workspace(app) {
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rtk-investigation-'));
  fs.cpSync(path.join(app,'fixtures/workspace'),dir,{recursive:true});
  const must=(args,env={})=>{const r=command('git',args,{cwd:dir,env:{...process.env,...env}});assert.equal(r.exitCode,0,r.stderr);};
  must(['init','-q']);must(['config','user.name','Exercise Fixture']);must(['config','user.email','fixture@example.invalid']);
  fs.mkdirSync(path.join(dir,'notes'));
  for(let i=1;i<=8;i++) {
    fs.writeFileSync(path.join(dir,'notes',`policy-${i}.txt`),Array.from({length:35},(_,n)=>`    policyNote: checkout rule ${i}, observation ${n}; preserve fee handling and inspect the failing scenario before changing policy.\n`).join(''));
    must(['add','.']);const date=`2026-10-${String(i).padStart(2,'0')}T10:00:00Z`;
    must(['commit','-qm',`Document checkout policy ${i}\n\nRecord the observed behavior and its audit context.\nDo not infer correctness from the number of passing checks.`],{GIT_AUTHOR_DATE:date,GIT_COMMITTER_DATE:date});
  }
  return dir;
}
export async function run(ctx,options) {
  const policy=readJson(path.join(ctx.app,'rtk-policy.json'));
  const tool=options.rtk;
  if(options.lane==='after')assert.ok(tool,'pass --rtk <absolute-path-to-rtk-executable>');
  const version=tool?command(tool,['--version']):{stdout:'unused',exitCode:0};
  if(tool)assert.ok(version.exitCode===0&&/rtk (?:v)?1\.0\.1\b/.test(version.stdout),'use the pinned RTK 1.0.1 release');
  const binarySha=tool?sha256(fs.readFileSync(tool)):null;
  const batch=createBatch(ctx,options.lane),dir=workspace(ctx.app);
  try {
    for(const task of workload) {
      const mode=options.lane==='before'?'raw':policy[task.id];
      assert.ok(['raw','rtk','rtk-then-raw'].includes(mode),'invalid policy mode: '+task.id);
      const attempts=[];
      const execute=(program,args,label)=>{const start=Date.now();attempts.push({label,program,args,...command(program,args,{cwd:dir}),durationMs:Date.now()-start});};
      if(mode==='raw')execute(task.program,task.args,'raw');
      else {execute(tool,task.rtk,'rtk');if(mode==='rtk-then-raw')execute(task.program,task.args,'fallback');}
      const raw=JSON.stringify({task:task.id,mode,version:version.stdout.trim(),binarySha,nodeVersion:command('node',['--version']).stdout.trim(),attempts},null,2)+'\n';
      batch.save(task.id,{}, {'capture.json':raw});
    }
    batch.finish();
  } finally { assert.ok(path.resolve(dir).startsWith(path.resolve(os.tmpdir())+path.sep));fs.rmSync(dir,{recursive:true,force:true}); }
  console.log('Captured actual command output; test failure is intentional.');
}
export async function check(ctx) {
  const policy=readJson(path.join(ctx.app,'rtk-policy.json'));
  for(const task of workload)assert.ok(['raw','rtk','rtk-then-raw'].includes(policy[task.id]));
  assert.ok(workload.some(t=>policy[t.id]!=='raw'),'starter policy still bypasses RTK for every command');
}
export function score(ctx,index) {
  assertBatches(index,'rtk',3);
  const totals={before:0,after:0};let compressed=0,nodeVersion;
  for(const batch of index.batches)for(const task of workload) {
    const record=batch.records.find(r=>r.id===task.id);assert.ok(record,'missing workload case');
    const capture=JSON.parse(artifact(ctx.root,record,'capture.json'));
    assert.match(capture.nodeVersion,/^v(?:22|23|24)\./,'record a supported Node runtime');
    if(nodeVersion)assert.equal(capture.nodeVersion,nodeVersion,'keep the same runtime in both lanes');else nodeVersion=capture.nodeVersion;
    assert.equal(capture.task,task.id);
    assert.ok(['raw','rtk','rtk-then-raw'].includes(capture.mode));
    if(batch.lane==='before')assert.equal(capture.mode,'raw');
    if(batch.lane==='after')assert.equal(capture.mode,readJson(path.join(ctx.app,'rtk-policy.json'))[task.id],'capture does not match committed policy');
    assert.equal(capture.attempts.length,capture.mode==='rtk-then-raw'?2:1);
    const visible=[];
    for(let n=0;n<capture.attempts.length;n++) {
      const attempt=capture.attempts[n];const filtered=capture.mode!=='raw'&&n===0;
      assert.deepEqual(attempt.args,filtered?task.rtk:task.args,'wrong measured command');
      assert.equal(attempt.exitCode,task.exitCode,'filter hid or changed the command failure');
      assert.ok(Number.isFinite(attempt.durationMs)&&attempt.durationMs>=0);
      if(filtered){assert.match(capture.version,/rtk (?:v)?1\.0\.1\b/);assert.match(capture.binarySha,/^[a-f0-9]{64}$/);compressed++;}
      else assert.equal(attempt.program,task.program);
      totals[batch.lane]+=Buffer.byteLength(attempt.stdout)+Buffer.byteLength(attempt.stderr);
      visible.push(attempt.stdout,attempt.stderr);
    }
    for(const signal of task.signals)assert.ok(visible.join('\n').includes(signal),'lost diagnostic signal; use a counted full-output fallback: '+signal);
  }
  assert.ok(compressed,'no RTK command was captured');
  return {decision:totals.after<totals.before?'adopt':'reject',beforeBytes:totals.before,afterBytes:totals.after,reductionPercent:100*(totals.before-totals.after)/totals.before,measure:'UTF-8 command-output bytes including fallbacks; no whole-session token or dollar claim'};
}
