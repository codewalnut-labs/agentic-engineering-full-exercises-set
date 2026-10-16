import { submitDecision } from '../src/workflow.mjs';
import { withServices } from './fixture-services.mjs';
import { cases, observe } from './scenarios.mjs';
export async function observeHttp() {
  const observations = [];
  for (const scenario of cases) observations.push(await withServices(scenario, state => observe(scenario, submitDecision, state)));
  return observations;
}
export { assertContract } from './contract.mjs';
