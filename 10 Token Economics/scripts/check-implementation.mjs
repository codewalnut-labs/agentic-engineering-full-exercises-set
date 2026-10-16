import { context } from './economics-evidence.mjs';
const ctx=context();
const module=await import('./'+ctx.contract.kind+'.mjs');
await module.check(ctx);
console.log('PASS learner implementation');
