# Before: Baseline Workflow

- Starting commit: fb48d936ec2e6e205478614a4af4d2550662f650
- Implementation commit: fb48d936ec2e6e205478614a4af4d2550662f650
- Agent and model: claude-general-purpose-subagent / claude-sonnet-5
- Tools and permissions: none (simulated, reasoning-only, no file or tool access)
- Time limit: 10
- Human hints: 0
- Retries: 0
- Patch SHA-256: `6763f2dd951dc1c87a2df1711285744039c7f5e44bff6d18d16ca5872c5d85fb`

## What was run

24 independent fresh-agent sessions (8 replay cases x 3 runs each) were given the
protected baseline workflow fixture (`workflow-optimizer-app/fixtures/workflow-baseline.md`,
committed at the Starting commit) as their only process guidance:

> Inspect the repository, implement the requested change, run relevant tests, and
> summarize the result clearly.

Each session received one of the 8 replay-case requests plus the fixed JSON response
contract, with no other hints about scope, source authority, context selection,
verification discipline, or protected-input boundaries beyond what that one-sentence
fixture implies. Every run used a distinct, freshly spawned agent session (no shared
context between runs) and an isolated worktree with no repository-specific system
prompt overhead, so cost measurements reflect the workflow text alone plus fixed
harness overhead common to both lanes.

## Result

- Train quality: 0.833 (25/30 assertions across scope-conflict, stale-requirement,
  partial-green-test, missing-user-choice, large-context-pack, unsupported-completion)
- Held-out quality: 1.000 (8/8 assertions across heldout-cross-project,
  heldout-protected-input)
- Median tokens: 40270.5, median duration: 30189.5ms

Raw per-run responses and grading are recorded in `evidence/baseline-runs.json` and
`evidence/benchmark.json`.
