# Local Evaluation Contract

Capture one baseline run per case before editing the skill. Run all three cases again in new sessions after committing a skill revision. Keep the agent, model, tools, permissions, adapter, prompt, and time limit the same. Never edit a response or selectively rerun a weak case. To evaluate another skill revision, archive the entire assisted batch, including failed attempts, and rerun all three cases; retain the original baseline.

Create a Node adapter outside the repository that starts a real fresh agent session, reads the prompt from standard input, and writes that agent's unchanged JSON response to standard output. It must honor `REVIEW_RUN_LANE` and expose `REVIEW_SKILL_PATH` only in the assisted lane. A canned response generator is not a review adapter. The object must contain `runNonce`, a unique session ID, merge decision, and findings. Run it only through:

```text
npm run eval:run -- --lane <before|after> --case <case-id> --agent <name> --model <name> --tools <description> --permissions <description> --time-limit <minutes> --adapter <path>
```

The runner writes `evidence/runs/<lane>/<case-id>.json` and records:

- `schemaVersion: 3`, lane, case ID, session ID, agent, model, start time, duration, command result, nonce, and actual Git source SHA.
- SHA-256 of the protected runner, adapter, canonical prompt, diff, transcript, and skill when used.
- The skill digest normalizes CRLF to LF so it matches the committed skill across platforms; raw response hashes remain byte-specific.
- Transcript path relative to `evidence/`.
- Merge decision and a `findings` array.

Each finding contains an arbitrary unique `id`, severity, changed file, an exact added-line code anchor, the acceptance rule it evaluates, observed behavior, impact, reproduction, recommendation, and `blocking`. The nonce-bound adapter response must exactly match the stored run. Reusing published IDs or merely reaching a target count is not part of scoring.

The local scorer requires every violated acceptance rule to be covered by a distinct blocker, at least 80 percent precision, no blocker on the conforming control, and no metric more than five percentage points below the baseline. It reconstructs the canonical prompt, validates exact anchors and adapter hashes, and derives the decision from runner-produced files; the scorer never calls a model. The adapter uses your actual agent and its normal access requirements. Hashes establish consistency, not authentic agent behavior or the correctness of a finding; reviewers inspect actual session exports and reproductions.
