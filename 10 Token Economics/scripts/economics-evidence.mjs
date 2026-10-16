import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';

export const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
export const normalizedHash = value => sha256(String(value).replaceAll('\r\n','\n'));
export const readJson = file => JSON.parse(fs.readFileSync(file,'utf8'));
export const writeJson = (file,value) => { fs.mkdirSync(path.dirname(file),{recursive:true}); fs.writeFileSync(file,JSON.stringify(value,null,2)+'\n'); };
export const git = (cwd,args) => execFileSync('git',args,{cwd,encoding:'utf8',stdio:'pipe'}).trim();
export const gitBlob = (cwd,sha,file) => execFileSync('git',['cat-file','blob',sha+':'+file],{cwd,stdio:'pipe'});
export function context(app=process.cwd()) {
  return {app,root:path.resolve(app,'..'),contract:readJson(path.join(app,'evidence-contract.json'))};
}
export function contained(root,relative) {
  assert.ok(typeof relative==='string' && !path.isAbsolute(relative),'use relative artifact paths');
  assert.ok(!relative.includes('\\')&&!relative.split('/').includes('..')&&!relative.includes('\0'),'use canonical portable paths without traversal');
  const target=path.resolve(root,relative);
  assert.ok(target.startsWith(path.resolve(root)+path.sep),'artifact escapes exercise');
  let cursor=target;
  while(!fs.existsSync(cursor)) cursor=path.dirname(cursor);
  const real=fs.realpathSync(cursor);
  assert.ok(real===fs.realpathSync(root)||real.startsWith(fs.realpathSync(root)+path.sep),'artifact escapes through a link');
  return target;
}
export function cleanSource(root) {
  const changed=git(root,['diff','--name-only','HEAD','--','.'])+'\n'+git(root,['ls-files','--others','--exclude-standard','--','.']);
  const prefix=git(root,['rev-parse','--show-prefix']);
  for(let file of changed.split(/\r?\n/).filter(Boolean)) {
    if(file.startsWith(prefix))file=file.slice(prefix.length);
    assert.ok(file.startsWith('evidence/'),'commit source/configuration before capture: '+file);
  }
}
export function startingSha(root) {
  const source=fs.readFileSync(path.join(root,'evidence/before.md'),'utf8');
  const sha=source.match(/^Starting commit: ([a-f0-9]{40})\r?$/m)?.[1];
  assert.ok(sha,'before.md needs Starting commit: <40-character SHA>');
  return sha;
}
export function command(executable,args,options={}) {
  const env={...process.env,...options.env};
  delete env.NODE_TEST_CONTEXT; // child acceptance runs must execute, even inside node --test
  const result=spawnSync(executable,args,{encoding:'utf8',timeout:120000,maxBuffer:32*1024*1024,...options,env});
  return {stdout:result.stdout??'',stderr:result.stderr??result.error?.message??'',exitCode:result.status??1};
}
export function createBatch(ctx,lane) {
  assert.ok(['before','after'].includes(lane),'use --lane before or after');
  cleanSource(ctx.root);
  const sourceSha=git(ctx.root,['rev-parse','HEAD']);
  const initial=startingSha(ctx.root);
  if(lane==='before')assert.equal(sourceSha,initial,'capture baseline at the starting commit');
  const directory=contained(ctx.root,'evidence/raw/'+lane);
  fs.mkdirSync(path.dirname(directory),{recursive:true});
  fs.mkdirSync(directory); // exclusive: interrupted and failed batches are never overwritten
  const indexPath=contained(ctx.root,'evidence/records.json');
  const index=fs.existsSync(indexPath)?readJson(indexPath):{schemaVersion:1,kind:ctx.contract.kind,batches:[]};
  assert.equal(index.kind,ctx.contract.kind);
  assert.ok(!index.batches.some(b=>b.lane===lane),'preserve the previous full batch before another attempt');
  const batch={lane,sourceSha,startingSha:initial,startedAt:new Date().toISOString(),complete:false,records:[]};
  index.batches.push(batch); writeJson(indexPath,index);
  const save=(id,data,files)=>{
    assert.match(id,/^[a-z0-9-]+$/);
    const artifacts={};
    for(const [suffix,bytes] of Object.entries(files)) {
      assert.match(suffix,/^[a-z0-9.-]+$/);
      const relative=`evidence/raw/${lane}/${id}.${suffix}`;
      fs.writeFileSync(contained(ctx.root,relative),bytes,{flag:'wx'});
      artifacts[relative]=sha256(bytes);
    }
    batch.records.push({id,...data,artifacts}); writeJson(indexPath,index);
  };
  return {directory,batch,save,finish(){assert.equal(git(ctx.root,['rev-parse','HEAD']),sourceSha,'commit changed during capture');cleanSource(ctx.root);batch.complete=true;batch.finishedAt=new Date().toISOString();writeJson(indexPath,index);}};
}
export function artifact(root,record,suffix) {
  const entries=Object.entries(record.artifacts).filter(([file])=>file.endsWith('.'+suffix));
  assert.equal(entries.length,1,'one '+suffix+' artifact per record');
  const [file,digest]=entries[0];
  assert.ok(file.startsWith('evidence/raw/'),'raw artifact path required');
  const bytes=fs.readFileSync(contained(root,file));
  assert.equal(sha256(bytes),digest,'raw capture changed: '+file);
  return bytes.toString('utf8');
}
export function assertBatches(index,kind,count) {
  assert.equal(index.schemaVersion,1); assert.equal(index.kind,kind);
  assert.equal(index.batches.length,2,'both complete lanes are required');
  for(const lane of ['before','after']) {
    const matches=index.batches.filter(b=>b.lane===lane);assert.equal(matches.length,1);
    const batch=matches[0];assert.ok(batch.complete,'partial/failed capture batch: '+lane);
    assert.equal(batch.records.length,count,'run the full prescribed workload');
    assert.equal(new Set(batch.records.map(r=>r.id)).size,count,'duplicate records');
    for(const sha of [batch.sourceSha,batch.startingSha])assert.match(sha,/^[a-f0-9]{40}$/);
    const start=Date.parse(batch.startedAt),end=Date.parse(batch.finishedAt);assert.ok(Number.isFinite(start)&&end>=start);
  }
}
export function usage(value) {
  for(const key of ['input_tokens','output_tokens','cache_creation_input_tokens','cache_read_input_tokens'])assert.ok(Number.isSafeInteger(value[key])&&value[key]>=0,'missing actual usage: '+key);
  return {input:value.input_tokens,output:value.output_tokens,cacheWrite:value.cache_creation_input_tokens,cacheRead:value.cache_read_input_tokens};
}
export function price(u,rates) {
  for(const key of ['input','output','cacheWrite','cacheRead'])assert.ok(Number.isFinite(rates[key])&&rates[key]>=0,'invalid dated USD/MTok rate: '+key);
  return (u.input*rates.input+u.output*rates.output+u.cacheWrite*rates.cacheWrite+u.cacheRead*rates.cacheRead)/1e6;
}
export const totalTokens=u=>u.input+u.output+u.cacheWrite+u.cacheRead;
export const median=values=>{const a=[...values].sort((x,y)=>x-y);return a.length%2?a[(a.length-1)/2]:(a[a.length/2-1]+a[a.length/2])/2;};
export function verifyCapture(text,check,sha) {
  text=text.replaceAll('\r\n','\n');
  assert.ok(text.startsWith('Command: npm run '+check.script+'\n'));
  assert.ok(text.includes('Repository commit: '+sha+'\n')&&text.includes('Source SHA: '+sha+'\n'),'capture commit mismatch');
  assert.match(text,/\nexit code: 0\s*$/);
  const start=Date.parse(text.match(/^Started at: (.+)$/m)?.[1]),end=Date.parse(text.match(/^Finished at: (.+)$/m)?.[1]);assert.ok(Number.isFinite(start)&&end>=start);
  for(const marker of check.markers)assert.ok(text.includes(marker),'missing capture marker '+marker);
}
export async function compute(ctx) {
  const module=await import('./'+ctx.contract.kind+'.mjs');
  return module.score(ctx,readJson(path.join(ctx.root,'evidence/records.json')));
}
export async function validateEconomicsEvidence(root,contract) {
  const ctx=context(path.join(root,contract.app));
  const expected=await compute(ctx),actual=readJson(path.join(root,'evidence/summary.json'));
  assert.deepEqual(actual.metrics,expected,'summary must be regenerated from original captures');
  const starting=startingSha(root),source=actual.sourceSha;
  assert.match(source??'',/^[a-f0-9]{40}$/);
  git(root,['merge-base','--is-ancestor',starting,source]);git(root,['merge-base','--is-ancestor',source,'HEAD']);
  const prefix=git(root,['rev-parse','--show-prefix']);
  for(const [file,digest] of Object.entries(contract.starterSources))assert.equal(normalizedHash(gitBlob(root,starting,prefix+file)),digest,'baseline is not the supplied starter: '+file);
  for(const batch of readJson(path.join(root,'evidence/records.json')).batches) {
    assert.equal(batch.startingSha,starting);git(root,['merge-base','--is-ancestor',batch.sourceSha,source]);
    if(batch.lane==='before')assert.equal(batch.sourceSha,starting,'baseline captured after source edits');
    else if(contract.kind!=='ponytail')assert.equal(batch.sourceSha,source,'score at the same implementation commit used for the after capture');
  }
  const allowed=new Set(contract.allowedSourceFiles.map(f=>prefix+f));
  for(const file of git(root,['log','--format=','--name-only',starting+'..'+source]).split(/\r?\n/).filter(Boolean))assert.ok(allowed.has(file)||[...allowed].some(p=>p.endsWith('/')&&file.startsWith(p))||file.startsWith(prefix+'evidence/'),'out-of-scope history: '+file);
  for(const file of git(root,['log','--format=','--name-only',source+'..HEAD']).split(/\r?\n/).filter(Boolean))assert.ok(file.startsWith(prefix+'evidence/'),'source changed after measurement: '+file);
  const after=fs.readFileSync(path.join(root,'evidence/after.md'),'utf8');assert.ok(after.includes('Implementation commit: '+source));
  const decision=fs.readFileSync(path.join(root,'evidence/decision.md'),'utf8');assert.equal(decision.match(/^Decision: (adopt|reject)\r?$/m)?.[1],expected.decision,'decision must follow measurements');
  for(const check of Object.values(contract.checkCaptures))verifyCapture(fs.readFileSync(path.join(root,check.path),'utf8'),check,check.phase==='starting'?starting:source);
  // The sealed index binds raw bytes; require those bytes in the same published evidence commit too.
  const manifest=readJson(path.join(root,'evidence/manifest.json'));
  for(const batch of readJson(path.join(root,'evidence/records.json')).batches)for(const record of batch.records)for(const [file,digest] of Object.entries(record.artifacts))assert.equal(sha256(gitBlob(root,manifest.sourceSha,prefix+file)),digest,'commit all raw captures before sealing: '+file);
  console.log('PASS experiment evidence, original bytes, commit binding, and decision');
}
