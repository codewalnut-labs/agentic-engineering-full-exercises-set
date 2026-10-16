import fs from 'node:fs';
import assert from 'node:assert/strict';
import { WorkflowError } from '../src/errors.mjs';
export const cases = JSON.parse(fs.readFileSync(new URL('../../docs/contract-cases.json', import.meta.url)));
export function memoryAdapters(scenario) {
  let item = { id: 'w-1', customer: 'Northwind', status: 'Review', score: 81, owner: 'Sam', note: 'Original evidence' };
  const events = [];
  const adapters = {
    repository: {
      async find(id) { events.push('find:' + id); return id === item.id ? structuredClone(item) : null; },
      async save(next) {
        events.push('save:' + next.id);
        if (scenario.failure === 'save') throw new WorkflowError(503, 'Store unavailable');
        item = structuredClone(next); return structuredClone(item);
      },
    },
    risk: { async check(input) {
      assert.deepEqual(input, { id: scenario.id, owner: scenario.decision.owner }); events.push('risk:' + input.id);
      if (scenario.failure === 'risk') throw new WorkflowError(502, 'Risk service unavailable');
      return { allowed: scenario.allowed !== false };
    } },
    notifications: { async send(event) {
      assert.deepEqual(event, { id: scenario.id, status: scenario.decision.status, owner: scenario.decision.owner });
      events.push('notify:' + event.id);
      if (scenario.failure === 'notify') throw new WorkflowError(502, 'Notification unavailable');
      return { delivered: true };
    } },
  };
  return { adapters, events, snapshot: () => structuredClone(item) };
}
export async function observe(scenario, submitDecision, state) {
  const input = structuredClone(scenario.decision), before = structuredClone(input);
  let result = null, error = null;
  try { result = await submitDecision(scenario.id, input); }
  catch (failure) { error = { status: failure.status ?? null, message: failure.message }; }
  assert.deepEqual(input, before, 'caller decision must not be mutated');
  return { name: scenario.name, result, error, stored: state.snapshot(), events: [...state.events] };
}
