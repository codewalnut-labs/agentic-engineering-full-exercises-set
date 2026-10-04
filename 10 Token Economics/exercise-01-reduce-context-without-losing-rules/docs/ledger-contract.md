# Context budget contract

The task tags are `session` and `adapter`. Identify at least one open question about errors and use `questionTags: ["errors"]` to retrieve the current error contract. The final selection must resolve these tags within a maximum of 2,000 bytes.

Before implementation, commit only `evidence/context-plan.json` and `evidence/context-plan.md`.

The JSON has `schemaVersion: 1`, `task: {tags: [...], questionTags: [...]}`, `openQuestions: ["your specific question"]`, `maximumBytes`, `mandatoryIds`, and `expectedSelectedIds`. Use catalog IDs. The Markdown explains the budget, source authority, and why the question needs additional guidance.

The selector receives `(catalog, {tags, questions}, maximumBytes)`. Its result contains `selected`, `skipped`, `totalBytes`, `remainingBytes`, `maximumBytes`, `requestedTags`, and `unresolvedTags`. Each selected or skipped entry includes its exact catalog byte count and a reason. Preserve current mandatory rules first, then current relevant sources ordered by descending priority and stable ID. Reject duplicate IDs, nonpositive/noninteger budgets, and a budget that cannot hold mandatory context. Keep unmet tags visible when relevant sources do not fit.

After implementation, write `evidence/context-ledger.json` with `schemaVersion: 1`, `planSha`, `sourceSha`, `task`, `maximumBytes`, and `result`. Copy the unmodified selector output into `result`. The verifier reruns the selector and checks every catalog entry.

Only the selector, adapter, and their two learner test files may change after the plan. The original adapter is editable: preserve its public contract through tests. The final source diff must include all four files. Keep later commits limited to evidence.

Write `evidence/decision.md` with headings `Context decisions`, `Correctness`, and `Cost and limits`. Compare planned and actual selection, explain any expansion, and cite the protected adapter checks. Exact bytes quantify context size, not model tokens, total session usage, latency, or billed cost.
