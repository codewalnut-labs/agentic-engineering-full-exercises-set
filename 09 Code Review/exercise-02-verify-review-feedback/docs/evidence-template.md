# Evidence instructions and template

Record the actual starting state and measured result. These are observations from one challenge; separate implementation branches and before/after patch files are not required.

## Observation reports

Use this structure in `evidence/before.md` and `evidence/after.md`:

```markdown
## Conditions
Starting commit: <full initial SHA in before.md>
Implementation commit: <full measured SHA in after.md>
Agent and model: <actual conditions>
Tools and permissions: <actual conditions>

## Findings
<Observed gaps before; verified behavior or review metrics after.>

## Proof
<Exact commands, exit codes, and links to raw results.>
```

Use `## Changes`, `## Verified`, and `## Remaining questions` in `evidence/comparison.md`. Report retries and assistance honestly. There is no zero-retry requirement.

## Original review and recheck

Write `evidence/review.json` using the [finding contract](./finding-contract.md). In `evidence/review.md`, use `## Scope`, `## Confirmed`, `## Dismissed`, `## Regression proof`, and `## Decision`. Include Base SHA and Head SHA, stable finding IDs, concrete triggers, impact, proof, and relevant tests. The original decision is **Request changes** for the supplied vulnerable comparison.

Keep the actual initial reviewer transcript in `evidence/review-session.txt`, including the session ID and reviewed head SHA. Also retain the original prompt in `evidence/fresh-review-prompt.md` and metadata in `evidence/reviewer-session.json`. Do not rewrite the raw review to match your final triage.

The fresh recheck uses `evidence/recheck.json`:

```json
{
  "schemaVersion": 1,
  "sourceSha": "<full fixed commit SHA>",
  "sessionId": "<actual new session ID>",
  "agent": "<agent>",
  "model": "<model>",
  "startedAt": "<ISO timestamp>",
  "reviewedFindingIds": ["<each confirmed finding ID>"],
  "remainingBlockers": [],
  "decision": "ready-for-review"
}
```

Retain its actual prompt and response in `evidence/recheck-session.txt`, including the session ID and measured commit. The new reviewer checks every confirmed finding, its fix, regression proof, and new risks. An empty blocker list must reflect the review; do not edit it to satisfy verification.

In `evidence/feedback-response.md`, use `## Accepted`, `## Dismissed`, and `## Remaining questions`. Link each accepted or dismissed comment to a finding, code anchor, and reproduction. Explain your response to the supplied earlier claim explicitly. The coordinator writes this after the independent review is saved.

## Captured checks

Keep `evidence/fixture-verification.txt`, `evidence/focused-tests.txt`, `evidence/commands/regression-replay.txt`, and `evidence/commands/triage-verify.txt`. Use the protected commands in [setup.md](./setup.md). The replay must demonstrate failing assertions on the supplied head and passing assertions after the fix.

## Source citations

Write `evidence/source-audit.json` with a `claims` array covering `confirmed-feedback`, `dismissed-feedback`, `regression-proof`. Each claim cites an exact statement in a contract-listed output and source or raw proof lines:

```json
{
  "claims": [{
    "id": "claim-1",
    "topic": "confirmed-feedback",
    "status": "supported",
    "reason": "<explain why this source supports this statement>",
    "artifact": {"path": "evidence/review.md", "line": 1, "excerpt": "<exact statement>"},
    "sources": [{"path": "<source or raw proof>", "line": 1, "excerpt": "<exact source text>"}]
  }]
}
```

Use `supported`, `contradicted`, or `unresolved` honestly. Outputs cannot cite themselves as proof. Accepted source paths and sealed artifacts are listed in the app's `evidence-contract.json`.

## Skill use and final verification

Keep the actual skill-use session in `evidence/skill-session.txt`. In `evidence/skill-use.md`, record:

```markdown
## receiving-code-review
Source: https://github.com/obra/superpowers/tree/main/skills/receiving-code-review
Revision: <installed 40-character revision, or use SHA-256: with the skill-file hash>
Invocation: <actual invocation>
Proof: evidence/skill-session.txt:L<first>-L<last>
```

The lines must show actual skill use. Well-formed metadata cannot establish independence or agent behavior by itself; reviewers inspect the raw sessions.

Commit the required evidence, seal it in `evidence/manifest.json`, then capture `evidence/commands/verify.txt`. The final capture is produced after sealing and is not sealed into itself. Commit both final files before the read-only `npm run verify:exercise`.
