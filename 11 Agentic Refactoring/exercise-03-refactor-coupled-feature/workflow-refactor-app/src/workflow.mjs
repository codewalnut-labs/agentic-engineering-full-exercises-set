import { find, save } from './legacy/store.mjs';
import { check } from './legacy/risk.mjs';
import { send } from './legacy/notifications.mjs';
import { WorkflowError } from './errors.mjs';

// Existing callers know this function; all dependencies are created behind their backs.
export async function submitDecision(id, decision) {
  const item = await find(id);
  if (!item) throw new WorkflowError(404, 'Workflow not found: ' + id);
  if (decision.status === 'Ready' && decision.evidenceNote.length < 12) {
    throw new WorkflowError(400, 'Ready decisions require a longer evidence note');
  }
  if (decision.status === 'Ready') {
    const assessment = await check({ id, owner: decision.owner });
    if (!assessment.allowed) throw new WorkflowError(409, 'Risk review rejected');
  }
  const saved = await save({ id: item.id, customer: item.customer, status: decision.status,
    score: item.score, owner: decision.owner, note: decision.evidenceNote });
  await send({ id, status: saved.status, owner: saved.owner });
  return saved;
}
