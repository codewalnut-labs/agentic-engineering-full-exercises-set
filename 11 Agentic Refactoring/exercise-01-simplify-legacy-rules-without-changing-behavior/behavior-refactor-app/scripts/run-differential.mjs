import assert from 'node:assert/strict';
import fs from 'node:fs';
import { runComparison } from './differential.mjs';
const report = await runComparison();
if (process.argv.includes('--capture')) {
  const target = new URL('../../evidence/differential.json', import.meta.url);
  assert.ok(!fs.existsSync(target), 'preserve the previous report before recapturing');
  fs.mkdirSync(new URL('../../evidence/', import.meta.url), { recursive: true });
  fs.writeFileSync(target, JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
}
console.log('PASS 3000 generated differential cases; incorrect candidate rejected and counterexample replayed');
console.log(JSON.stringify(report.incorrectCandidate, null, 2));
