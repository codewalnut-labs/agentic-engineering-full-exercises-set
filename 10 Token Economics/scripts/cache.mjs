import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { artifact, assertBatches, createBatch, readJson, price, usage } from './economics-evidence.mjs';

export const questions=[
  {id:'retention',question:'Return JSON with retentionDays for an ordinary completed export.',answer:{retentionDays:30}},
  {id:'limit',question:'Return JSON with maxExportRows for an ordinary export.',answer:{maxExportRows:5000}},
  {id:'review',question:'Return JSON with reviewers for a restricted export.',answer:{reviewers:2}},
  {id:'updated-policy',question:'Return JSON with retentionDays for an ordinary completed export.',answer:{retentionDays:14}},
];
export function documentFor(app,id) {
  const doc=fs.readFileSync(path.join(app,'fixtures/project-handbook.md'),'utf8');
  return id==='updated-policy'?doc.replace('Retention days: 30','Retention days: 14'):doc;
}
export function inspectRequest(body,document,question,timestamp,namespace,optimized=false) {
  assert.deepEqual(Object.keys(body).sort(),['messages','system'],'builder must only return system and messages');
  assert.deepEqual(body.messages,[{role:'user',content:question}],'preserve the actual question');
  assert.ok(Array.isArray(body.system)&&body.system.every(b=>b.type==='text'));
  const stable=`Experiment namespace: ${namespace}\n${document}`;
  const dynamic=`Request timestamp: ${timestamp}\n`;
  const joined=body.system.map(b=>b.text).join('');
  assert.ok(joined===stable+dynamic||joined===dynamic+stable,'keep all reference content and the timestamp exactly once');
  if(optimized){
    assert.equal(body.system[0].text,stable,'put reusable content first');
    assert.equal(body.system[0].cache_control?.type,'ephemeral','cache the stable prefix explicitly');
    assert.equal(body.system.slice(1).map(b=>b.text).join(''),dynamic,'variable data must follow the reusable prefix');
  }
}
async function callProvider(body) {
  const response=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','anthropic-version':'2023-06-01','x-api-key':process.env.ANTHROPIC_API_KEY},body:JSON.stringify(body),signal:AbortSignal.timeout(90000)});
  return {status:response.status,requestId:response.headers.get('request-id'),raw:await response.text()};
}
export async function run(ctx,options,transport=callProvider) {
  assert.ok(process.env.ANTHROPIC_API_KEY||transport!==callProvider,'set ANTHROPIC_API_KEY in the environment; no key is written to evidence');
  const config=readJson(path.join(ctx.app,'provider.json'));
  const {buildRequest}=await import(pathToFileURL(path.join(ctx.app,'src/buildRequest.mjs')));
  const batch=createBatch(ctx,options.lane),namespace=crypto.randomUUID();
  for(let n=0;n<questions.length;n++) {
    const task=questions[n],document=documentFor(ctx.app,task.id),timestamp=new Date().toISOString()+':'+n;
    const built=buildRequest({document,question:task.question,timestamp,namespace});
    inspectRequest(built,document,task.question,timestamp,namespace);
    const request={...built,model:config.model,max_tokens:256,temperature:0};
    const start=Date.now();let response;
    try{response=await transport(request);}catch(error){response={status:0,requestId:null,raw:JSON.stringify({transportError:error.message})};}
    batch.save(task.id,{timestamp,namespace,durationMs:Date.now()-start}, {'request.json':JSON.stringify(request,null,2)+'\n','response.json':response.raw,'http.json':JSON.stringify({status:response.status,requestId:response.requestId})});
  }
  batch.finish();console.log('Captured four actual API responses, including initial cache creation and policy change.');
}
export async function check(ctx) {
  const {buildRequest}=await import(pathToFileURL(path.join(ctx.app,'src/buildRequest.mjs')));
  inspectRequest(buildRequest({document:'Current rules',question:'Question',timestamp:'T',namespace:'N'}),'Current rules','Question','T','N',true);
}
export function score(ctx,index) {
  assertBatches(index,'cache',4);
  const config=readJson(path.join(ctx.app,'provider.json'));
  const totals={before:0,after:0},inputCosts={before:0,after:0},reads={before:0,after:0};
  const ids=new Set();
  for(const batch of index.batches) {
    let namespace;const prefixes=[];
    for(const task of questions) {
      const record=batch.records.find(r=>r.id===task.id);assert.ok(record,'missing fixed question');
      const request=JSON.parse(artifact(ctx.root,record,'request.json'));
      const http=JSON.parse(artifact(ctx.root,record,'http.json'));
      const response=JSON.parse(artifact(ctx.root,record,'response.json'));
      assert.equal(http.status,200,'failed calls are retained but cannot count as successful caching proof');
      assert.ok(response.id&&!ids.has(response.id),'unique provider response IDs required');ids.add(response.id);
      assert.equal(request.model,config.model);assert.equal(response.model,config.model,'pin the exact provider model');
      assert.equal(request.max_tokens,256);assert.equal(request.temperature,0);
      const built={system:request.system,messages:request.messages};
      inspectRequest(built,documentFor(ctx.app,task.id),task.question,record.timestamp,record.namespace,batch.lane==='after');
      if(namespace)assert.equal(record.namespace,namespace);else namespace=record.namespace;
      assert.ok(record.timestamp.endsWith(':'+questions.indexOf(task)));
      assert.ok(Number.isFinite(record.durationMs)&&record.durationMs>=0);
      const u=usage(response.usage);
      const text=response.content.filter(b=>b.type==='text').map(b=>b.text).join('').trim().replace(/^```(?:json)?\s*|\s*```$/g,'');
      assert.deepEqual(JSON.parse(text),task.answer,'answer must follow the current policy');
      totals[batch.lane]+=price(u,config.usdPerMillionTokens);
      inputCosts[batch.lane]+=price({...u,output:0},config.usdPerMillionTokens);
      reads[batch.lane]+=u.cacheRead;
      if(batch.lane==='after') {
        prefixes.push(request.system[0].text);
        if(task.id==='retention'||task.id==='updated-policy')assert.ok(u.cacheWrite>0,'cold and changed prefixes must create a cache entry');
        else assert.ok(u.cacheRead>0,'warm requests need measured cache hits; check model minimum and timing');
      } else assert.equal(u.cacheRead,0,'baseline should demonstrate the broken changing prefix');
    }
    if(batch.lane==='after'){assert.equal(prefixes[0],prefixes[1]);assert.equal(prefixes[1],prefixes[2]);assert.notEqual(prefixes[2],prefixes[3]);}
  }
  return {decision:totals.after<totals.before?'adopt':'reject',beforeCostUsd:totals.before,afterCostUsd:totals.after,beforeInputCostUsd:inputCosts.before,afterInputCostUsd:inputCosts.after,cacheReadTokens:reads.after,pricingAsOf:config.pricingAsOf,measure:'Provider usage at dated list prices, including cold writes, changed-policy calls, and output; not subscription billing'};
}
