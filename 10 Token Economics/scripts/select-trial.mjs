import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { artifact, cleanSource, context, contained, readJson, writeJson } from './economics-evidence.mjs';
import { gradeFiles } from './ponytail.mjs';
const ctx=context();assert.equal(ctx.contract.kind,'ponytail');
assert.equal(process.argv[2],'--trial');const trial=Number(process.argv[3]);assert.ok(trial>=1&&trial<=3&&Number.isInteger(trial));
cleanSource(ctx.root);
const target=path.join(ctx.root,'evidence/selected-trial.json');assert.ok(!fs.existsSync(target),'selection already exists; preserve the earlier experiment before selecting again');
const batch=readJson(path.join(ctx.root,'evidence/records.json')).batches.find(b=>b.lane==='after');assert.ok(batch?.complete);
const record=batch.records.find(r=>r.id==='trial-'+trial);assert.ok(record);
const files=JSON.parse(artifact(ctx.root,record,'files.json'));assert.equal(gradeFiles(ctx,files).exitCode,0,'selected trial fails acceptance');
for(const [file,text] of Object.entries(files)) {
  if(!file.startsWith('src/feature/')&&!file.startsWith('tests/'))continue;
  const destination=contained(ctx.app,file);fs.mkdirSync(path.dirname(destination),{recursive:true});fs.writeFileSync(destination,text);
}
writeJson(target,{trial});console.log('Copied the original successful trial to the learner implementation; commit it before scoring.');
