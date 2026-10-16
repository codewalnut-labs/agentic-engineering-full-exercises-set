import assert from 'node:assert/strict';
import fs from 'node:fs';
export function assertContract(actual) {
  const expected = JSON.parse(fs.readFileSync(new URL('../../docs/contract-observations.json', import.meta.url)));
  assert.deepEqual(actual, expected, 'public outputs, error precedence, persistence and effect order must be preserved');
}
