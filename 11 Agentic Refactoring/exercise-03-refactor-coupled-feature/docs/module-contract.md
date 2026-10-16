# Workflow module contract

## Public behavior

Keep `submitDecision(id, decision)` in `src/workflow.mjs` for existing callers. A decision has `status`, `owner` and `evidenceNote`. Do not mutate it. Preserve the exact outputs in contract-observations.json, including observable effect order.

Find the workflow before validating. Missing wins over a short Ready note. Ready needs at least twelve characters and an allowed risk response; other status strings remain accepted for legacy compatibility. Preserve the original id, customer and score. Save once, then notify once. A failed notification propagates after the save; it does not undo the save or retry it. A failed risk check or save prevents later effects.

## Module interface

Export `createWorkflow({ repository, risk, notifications })` from `src/decisionWorkflow.mjs`. It returns an object with `submitDecision(id, decision)`. This small surface hides the complete decision workflow, including validation, orchestration, construction and effect ordering. The learner chooses the internal structure; do not scatter policy into callers or build a generic dependency-injection framework.

- `repository.find(id)` resolves to a record or null.
- `repository.save(item)` resolves to the saved record.
- `risk.check({ id, owner })` resolves to `{ allowed: boolean }`.
- `notifications.send({ id, status, owner })` resolves to a delivery result.

Dependencies can throw `WorkflowError(status, message)`; preserve it and stop at the failing step. The module may import only ./errors.mjs and must not read environment configuration, globals, or transport. The independent runner removes configuration and replaces fetch before importing it; architecture checks also reject transport dependencies.

## Production adapters

Export `createHttpAdapters(baseUrl)` from `src/adapters/http.mjs`, returning the same dependency object as the memory fixtures. It may import ../errors.mjs. Use GET /items/:id, PUT /items/:id, POST /risk and POST /notifications, with JSON request/response bodies. Non-2xx bodies contain `{ error: message }`; throw WorkflowError with the HTTP status and message. Encode ids in paths.

Wire those adapters and createWorkflow together in the existing public entry. Environment configuration belongs there, outside the module and adapters. Keep the legacy files unchanged as the reference, but do not import them in the final production graph. HTTP fixture checks prove real request bodies, error propagation and wiring.
