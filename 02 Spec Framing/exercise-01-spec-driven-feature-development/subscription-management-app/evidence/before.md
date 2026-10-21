# Spec Framing Evidence — Before Session

### Run

- Starting commit: fb48d936ec2e6e205478614a4af4d2550662f650
- Implementation commit: 75d20e2dfb1ea62e508064bcae44261eeca3f176
- Agent: Cursor
- Model: Grok 4.6
- Agent and model: Cursor Grok 4.6
- Tools: Read, Write, Glob, Grep, Shell
- Permissions: workspace read and write
- Tools and permissions: Read, Write, Glob, Grep, Shell; workspace read and write
- Time limit: 30 minutes
- Attempt: 1
- Prompt: Allow users to manage their subscriptions.
- Human hints: 0
- Retries: 0
- Patch: `evidence/before.patch`
- Patch SHA-256: fe181c270eb9de277b084031b1625320ee950e2e7c59a58b266fcf3f95acf628

### Results

| Proof | Result |
|---|---|
| Specification artifacts created | specs/spec.md, specs/plan.md, specs/tasks.md |
| Invented decisions | 4 |
| Important questions missed | 5 |
| Requirements without testable acceptance criteria | 0 |
| Requirements not traced to tasks | 0 |
| Files changed | 3 |
| Lines added and removed | +120 / -0 |

### Important Problems

1. `specs/spec.md` REQ-003 (Immediate cancellation with refund) — Invented unsupported immediate cancellation refunds even though `docs/billing-constraints.md` says the integration does not support automatic immediate cancellation refunds. The Finance vs Support timing conflict was unanswered.

2. `specs/spec.md` REQ-005 (Pending change queue) — Invented a multi-item queue and removal UI. That contradicts `docs/billing-constraints.md` (only one pending plan-change request) and leaves the Support conflict-prevention question missing.

3. `specs/spec.md` REQ-006 (Error surfacing and retry) — Surfaces the raw provider error and auto-retries every 60 seconds. Idempotency, webhook acceptance before final result, and safe customer messages from `docs/billing-constraints.md` remain unanswered and unclear.
