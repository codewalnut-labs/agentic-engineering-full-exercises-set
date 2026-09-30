# Before: unguided first attempt

- Starting commit: `fb48d936ec2e6e205478614a4af4d2550662f650`
- Run base commit: `fb48d936ec2e6e205478614a4af4d2550662f650`
- Guidance commit: none (no `AGENTS.md` exists at this commit)
- Implementation commit: `a4159ca8cb062be3a87c8603f5eb9017dc6551ac`
- Agent and model: Claude Code Agent tool subagent (general-purpose, fresh session, no prior context), `claude-sonnet-5`
- Tools and permissions: full read/write/bash tool access, scoped by the identical ticket prompt to `AGENTS.md` (if present) and `rule-hardening-app/src/**`; explicitly forbidden from reading `docs/`, `fixtures/`, `evidence/`, `tasks/`, `rule-hardening-app/scripts/`, or any file with "test", "verify", or "grade" in its name
- Time limit: 20 minutes
- Human hints: 0
- Retries: 0
- Task prompt hash: `sha256:3beb136414c1ead0e70ec15fd169fbb57170f7508841223fdb28f7b45dbb2eda` (hash of the protected `tasks/proving-change.md`)
- Patch: `evidence/before.patch`
- Patch SHA-256: `f5df39c47a7d26123e56d670dffd65e46f5f02ffeafa1084cba039e8480b0f0f`
- Files changed: 1 (`rule-hardening-app/src/services/filterPersistence.mjs`)
- Lines added / removed: +37 / -3

## Result

The session could not read `AGENTS.md` (it did not exist on this branch) or any correction-history/guidance doc (out of scope by the ticket). Working only from the seeded file's own doc comment ("display values and an ambient clock are persisted"), it guessed at a fix without knowing the team's exact conventions.

Grader exit code: 1 (defects found)

Detected defects (6, across both protected grading variants):
- `variant 1/2 stable owner ID not stored` -- persisted `filter.owner.id` under the key `owner`, not the required `ownerId` key.
- `variant 1/2 status not canonical lowercase` -- persisted the raw `filter.statusLabel` (untrimmed and not lowercased) unchanged.
- `variant 1/2 durable record shape changed` -- returned `{ owner, status, updatedAt }` instead of the required `{ ownerId, status, updatedAt }` shape.

This reproduces the identity-vs-presentation and canonical-enum-storage mistakes from `docs/correction-history.json` (COR-101/102, COR-103/104) even though the session had no access to that file -- it independently repeated the same class of mistake the team keeps correcting in review.
