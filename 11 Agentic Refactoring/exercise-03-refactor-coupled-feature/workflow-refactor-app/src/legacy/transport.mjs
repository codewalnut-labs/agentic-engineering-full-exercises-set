import { WorkflowError } from '../errors.mjs';
export async function request(method, route, body) {
  const base = process.env.WORKFLOW_BACKEND_URL;
  if (!base) throw new Error('WORKFLOW_BACKEND_URL is required by the coupled starter');
  const response = await fetch(new URL(route, base), { method,
    headers: { 'content-type': 'application/json' }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
  const value = await response.json();
  if (!response.ok) throw new WorkflowError(response.status, value.error);
  return value;
}
