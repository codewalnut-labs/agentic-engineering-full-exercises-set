import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateRenewalEligibility as original } from '../fixtures/legacyEligibility.original.mjs';
import { evaluateRenewalEligibility as incorrect } from '../fixtures/incorrectEligibility.mjs';
import { compare, replay, runComparison } from './differential.mjs';
test('independent original passes, a threshold change fails and its shrunk case replays', () => {
  assert.equal(compare(original, 217).failed, false);
  const result = compare(incorrect, 217);
  assert.equal(result.failed, true);
  assert.equal(replay(incorrect, result.seed, result.counterexamplePath).failed, true);
  assert.notDeepEqual(original(result.counterexample[0]), incorrect(result.counterexample[0]));
});
test('reports are deterministic and include all successful runs', async () => {
  assert.deepEqual(await runComparison(), await runComparison());
  assert.deepEqual((await runComparison()).runs.map(r => r.numRuns), [1000, 1000, 1000]);
});
