# After: Candidate Workflow

- Starting commit: fb48d936ec2e6e205478614a4af4d2550662f650
- Implementation commit: 6f31089f9ac49e1dcc34e6cc8f05a34543bb9c51
- Agent and model: claude-general-purpose-subagent / claude-sonnet-5
- Tools and permissions: none (simulated, reasoning-only, no file or tool access)
- Time limit: 10
- Human hints: 0
- Retries: 0
- Patch SHA-256: `59a184ddff42b15ec33ba0f422eb2b6c1485728b1df213f6dbf744910e0de3af`

## What was run

24 independent fresh-agent sessions (8 replay cases x 3 runs each), same request text
and JSON response contract as the before lane, but given the candidate
`workflow/instructions.md` (committed at the Implementation commit, a direct child of
the Starting commit that changes only that one file) as process guidance instead of
the baseline fixture. The candidate workflow is a five-step checklist -- scope
confirmation before editing, authoritative-source resolution on contradiction,
deliberate context selection, fresh post-edit verification with exact exit codes, and
stop-on-failure/protected-blocker handling -- plus one closing line asking for terse,
non-narrated output. Iteration was required to reach this text: an initial 24-line
draft cleared quality thresholds but not the token/duration ceiling gate (see
`comparison.md`); tightening the wording to 10 lines with an explicit terseness
instruction, under the same isolated-worktree measurement conditions as the before
lane, closed the remaining gap without touching scope, authority, context, or
verification semantics.

## Result

- Train quality: 0.900 (27/30 assertions)
- Held-out quality: 1.000 (8/8 assertions, 0 critical failures)
- Median tokens: 39053, median duration: 17249ms

Raw per-run responses and grading are recorded in `evidence/candidate-runs.json` and
`evidence/benchmark.json`.
