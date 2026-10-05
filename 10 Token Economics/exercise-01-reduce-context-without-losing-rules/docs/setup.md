# Setup and verification

Use the Node version in the repository's `.nvmrc`. Install the named skill using its [upstream instructions](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering#installation) for your agent. Keep its full directory and referenced resources; record the installed revision or file hash. Complete this challenge independently of the other exercises.

## Plan and implementation

Run `npm ci` and `npm run agent:check` from `context-budget-app/`. The starter acceptance check for the adapter passes; selector submission checks intentionally fail until you complete the challenge.

Record `git rev-parse HEAD` as `Starting commit: <full SHA>` in `evidence/before.md`, then run `npm run proof:capture -- baseline`. This records actual full-pack selection and the adapter's starting acceptance result.

Use **[context-optimization](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/tree/main/skills/context-optimization)** for retrieval scoping and budget decisions. Keep the focus on this task's required information.

Commit only `evidence/context-plan.json` and `evidence/context-plan.md` before editing code. Follow the [ledger contract](./ledger-contract.md). Keep that commit as `planSha`.

Implement `src/budget/selectContext.mjs`, refactor `src/session/adaptSession.mjs`, and add `tests/context-selector.test.mjs` and `tests/session-adapter.test.mjs`. You may iterate and use multiple focused commits. These are the only allowed source paths.

At the final implementation commit, write `evidence/context-ledger.json` with that full `sourceSha`, then run `npm run proof:capture -- implementation`. Use the exact selector result in the ledger. Keep the pre-change plan intact and explain any departure from its expected selection.

## Seal and submit

A SHA is a Git commit ID. The starting SHA identifies the supplied starter, the implementation SHA identifies your final source, and the manifest SHA identifies the later evidence commit.

1. Finish the reports, `evidence/skill-use.md`, `evidence/skill-session.txt`, and `evidence/source-audit.json` using the [evidence template](./evidence-template.md).
2. Commit all evidence artifacts. After the final implementation commit, keep subsequent commits limited to evidence.
3. From the app directory, run:

```text
npm run evidence:seal
npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify
```

4. Commit `evidence/manifest.json` and `evidence/commands/verify.txt`, then run `npm run verify:exercise`. This final check is read-only.
5. Open one focused PR from your fork with the change, decision, and accessible evidence links. Approval and merging are not required.

Capture tools retain actual output, timestamps, commit IDs, and exit codes. Preserve failed captures under `evidence/attempts/` before recapturing. If you fix source after measurement, commit the fix, update the implementation SHA, regenerate affected proof, then recommit and reseal the evidence.

## Why this workflow

[Anthropic's context engineering guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) motivates selecting sufficient task-relevant information. This challenge measures selected document bytes and preserved behavior; it does not claim a controlled agent-performance experiment.
