import assert from 'node:assert/strict';
import fs from 'node:fs';
import { observeMigration } from './authorization-ledger.mjs';
const report = await observeMigration();
if (process.argv.includes('--capture')) {
  const target = new URL('../../evidence/authorization-ledger.json', import.meta.url);
  assert.ok(!fs.existsSync(target), 'preserve previous ledger before recapturing');
  fs.mkdirSync(new URL('../../evidence/', import.meta.url), { recursive: true });
  fs.writeFileSync(target, JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
}
console.log('PASS 5 authorization-ledger scenarios and enable/disable/enable rollback');
