# Before run

- Starting commit: e134b7e7b3163db395144bfb163a06d24ad06507
- Run base commit: e134b7e7b3163db395144bfb163a06d24ad06507
- Implementation commit: 57af54ba637016abf9696f3fa0be57ebc8aa930e
- Agent and model: Codex CLI, gpt-5.6-sol, medium reasoning
- Tools and permissions: shell tools with workspace-write permission and model-service network access
- Time limit: 15 minutes
- Human hints: 0
- Retries: 0
- Patch SHA-256: b00a1abe3102461d763c1e704714e1e7b2690def53d244cbfc10994cdd020157
- Patch path: evidence/before.patch
- Maven tests discovered: 11; all 11 passed after the first-attempt implementation.
- Backend contract result: PASS for service behavior and strict HTTP tests.
- Client contract result: PASS from `node ./scripts/run-client-contract.mjs`.
- Exception-order differences: none; lookup still precedes validation.
- JSON differences: none; the strict six-field success body and existing error objects remain unchanged.
- Rejected-state mutations: none.
- Save-count differences: none; accepted decisions save once and rejected decisions save zero times.
- Files changed: 2 production files (`DecisionPolicy.java`, `WorkflowService.java`).
- Lines added and removed: 28 added, 3 removed.

The untouched starter Maven suite discovered 11 tests and failed only the two protected architecture checks because `DecisionPolicy` was absent. No participant characterization test or committed contract snapshot guided this unconstrained run.
