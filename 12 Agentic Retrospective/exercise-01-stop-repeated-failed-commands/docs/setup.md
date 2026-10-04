# Setup and verification

Use the Node version in the repository's `.nvmrc`. Install **[systematic-debugging](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging)** using the [upstream instructions](https://github.com/obra/superpowers#installation). Record the revision and actual invocation.

## Observe and improve

1. From `retry-policy-app/`, run `npm ci` and `npm run agent:check`. Record `git rev-parse HEAD` as `Starting commit: <full SHA>` in `evidence/before.md`, then run `npm run proof:capture -- baseline`. This captures the seeded analyzer's incorrect report, not the corrected baseline metric.
2. Read the [implementation request](../tasks/implementation-request.md) and [metric contract](./metric-contract.md). Use systematic-debugging to trace the incorrect classifications to their cause. Write failing participant tests before changing behavior.
3. Update only `src/retro/analyzeSession.mjs`, add `src/retro/preflightPolicy.mjs`, and add `src/retro/analyzeSession.test.mjs`. Follow the [preflight contract](./preflight-contract.md). Run `npm run test:analysis`.
4. Commit the focused implementation and tests; multiple focused commits are allowed. Record the final full SHA as `sourceSha` in `evidence/history.json`, and as `Implementation commit` in `evidence/after.md`. Run `npm run proof:capture -- implementation`.
5. Construct a new POLICY-217 replay from the [brief](../tasks/policy-217-replay.md) and [replay contract](./replay-contract.md). Keep the fixed simulated profile from `docs/session-metadata.json`, use a new session ID, and provide ordered events with unique IDs and timestamps. The exercise verifies the policy against every replay command. Do not copy baseline event sequences.
6. Save `evidence/replay-events.json` and `evidence/replay-metadata.json`, then run `npm run retro:metrics`. It generates `baseline.json` from the protected trace and `after.json` from the replay, both using the corrected analyzer. Explain the difference between measurement repairs and fewer simulated calls.

## Finish and verify

Use the [evidence template](./evidence-template.md) to complete the reports, `evidence/skill-use.md`, `evidence/skill-session.txt`, and `evidence/source-audit.json`. Commit all required evidence after the final source commit. From the app directory, run:

```text
npm run evidence:seal
npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify
```

Commit the manifest and final capture, then run `npm run verify:exercise`. This last command reads existing evidence without generating it. Open one focused PR with proof links; approval and merging are not required. Archive failed captures under `evidence/attempts/` before regenerating them and resealing.

## Reading behind the workflow

[Systematic debugging](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/SKILL.md) provides the root-cause workflow. Here the executable policy and event metrics must support the retrospective's claims.
