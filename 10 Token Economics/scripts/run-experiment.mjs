import assert from 'node:assert/strict';
import { context } from './economics-evidence.mjs';
const ctx=context();
const args=process.argv.slice(2);const options={};
for(let i=0;i<args.length;i+=2){assert.ok(args[i].startsWith('--')&&args[i+1],'use --lane before|after and named options');options[args[i].slice(2)]=args[i+1];}
assert.ok(['before','after'].includes(options.lane),'--lane before|after is required');
const module=await import('./'+ctx.contract.kind+'.mjs');
await module.run(ctx,options);
