import assert from 'node:assert/strict';
import { cases, memoryAdapters, observe } from './scenarios.mjs';
import { assertContract } from './contract.mjs';
// Disable transport BEFORE importing the learner's module, including import-time I/O.
delete process.env.WORKFLOW_BACKEND_URL;
globalThis.fetch = async () => { throw new Error('Network access is forbidden in independent workflow tests'); };
const { createWorkflow } = await import('../src/decisionWorkflow.mjs');
const observations = [];
for (const scenario of cases) {
  const state = memoryAdapters(scenario);
  const workflow = createWorkflow(state.adapters);
  assert.equal(typeof workflow.submitDecision, 'function');
  observations.push(await observe(scenario, workflow.submitDecision.bind(workflow), state));
}
assertContract(observations);
// A module must keep injected dependencies local to each instance, even when requests overlap.
const left = memoryAdapters(cases[2]), right = memoryAdapters(cases[5]);
const first = createWorkflow(left.adapters), second = createWorkflow(right.adapters);
const concurrent = await Promise.all([
  observe(cases[2], first.submitDecision.bind(first), left),
  observe(cases[5], second.submitDecision.bind(second), right),
]);
assert.deepEqual(concurrent, [observations[2], observations[5]], 'workflow instances must not share injected dependencies');
console.log('PASS 8 independent workflow contracts without environment configuration or network access');
