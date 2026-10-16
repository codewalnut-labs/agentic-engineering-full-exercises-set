import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import fc from 'fast-check';
import { evaluateRenewalEligibility as original } from '../fixtures/legacyEligibility.original.mjs';
import { evaluateRenewalEligibility as incorrect } from '../fixtures/incorrectEligibility.mjs';
import { evaluateRenewalEligibility as current } from '../src/rules/legacyEligibility.mjs';

export const seeds = [217, 614, 2026];
export const numRuns = 1000;
// Explicit supported domain: finite integer counts, named tiers, and a boolean override.
// Constants give the important partitions extra weight; the range explores combinations.
const account = fc.record({
  tier: fc.constantFrom('enterprise', 'pro', 'starter', 'future-plan'),
  monthsActive: fc.oneof(fc.constantFrom(5, 6, 11, 12), fc.integer({ min: -2, max: 120 })),
  latePayments: fc.oneof(fc.constantFrom(-1, 0, 1, 2), fc.integer({ min: -3, max: 12 })),
  supportOverride: fc.boolean(),
});
const digest = url => crypto.createHash('sha256').update(fs.readFileSync(url, 'utf8').replaceAll('\r\n', '\n')).digest('hex');
export function compare(candidate, seed, runs = numRuns) {
  return fc.check(fc.property(account, input => {
    assert.deepEqual(candidate(structuredClone(input)), original(structuredClone(input)));
  }), { seed, numRuns: runs });
}
export function replay(candidate, seed, path) {
  return fc.check(fc.property(account, input => {
    assert.deepEqual(candidate(structuredClone(input)), original(structuredClone(input)));
  }), { seed, path, numRuns, endOnFailure: true });
}
export async function runComparison() {
  const runs = seeds.map(seed => {
    const result = compare(current, seed);
    assert.equal(result.failed, false, `behavior drift: ${JSON.stringify({ seed, path: result.counterexamplePath, input: result.counterexample })}`);
    return { seed, numRuns: result.numRuns };
  });
  const failure = compare(incorrect, seeds[0]);
  assert.equal(failure.failed, true, 'the safety net must reject the supplied incorrect candidate');
  assert.equal(replay(incorrect, failure.seed, failure.counterexamplePath).failed, true, 'counterexample must replay');
  const input = failure.counterexample[0];
  return {
    schemaVersion: 1, fastCheck: '4.3.0',
    originalHash: digest(new URL('../fixtures/legacyEligibility.original.mjs', import.meta.url)),
    candidateHash: digest(new URL('../src/rules/legacyEligibility.mjs', import.meta.url)),
    runs,
    incorrectCandidate: { seed: failure.seed, path: failure.counterexamplePath, shrinks: failure.numShrinks,
      input, original: original(input), incorrect: incorrect(input) },
  };
}
