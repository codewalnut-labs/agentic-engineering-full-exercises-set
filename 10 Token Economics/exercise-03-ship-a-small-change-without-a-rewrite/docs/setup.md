# Setup and verification

Use the Node version in the repository's `.nvmrc`. Install the named skill using its [upstream instructions](https://github.com/obra/superpowers#installation) for your agent. Keep its full directory and referenced resources; record the installed revision or file hash. Complete this challenge independently of the other exercises.

## Plan and implementation

Run `npm ci` and `npm run agent:check` from `scope-budget-app/`. Record `git rev-parse HEAD` as `Starting commit: <full SHA>` in `evidence/before.md`, then run `npm run proof:capture -- baseline`.

Commit only `evidence/scope-plan.json` and `evidence/scope-plan.md` before editing source. Record that commit as `planSha`. Use the [scope contract](./scope-contract.md) and [evidence template](./evidence-template.md) for the exact fields.

Use **[test-driven-development](https://github.com/obra/superpowers/tree/main/skills/test-driven-development)** for the export change: write a behavioral test, observe its assertion fail, implement enough to pass, then check neighboring behavior. Preserve the actual red and green output in your skill session.

Only edit `src/migration/exportButton.mjs` and `tests/export-button.test.mjs`. Import the helper with `../src/migration/exportButton.mjs`; use Node's built-in assertions or test runner so the same test can run without extra dependencies. The total diff from plan to final source must remain within two files and 30 changed lines. Iteration and multiple focused commits are allowed.

At the final implementation commit, write `evidence/scope-budget.json` with that full `sourceSha` and complete `evidence/avoided-work.json`, then run:

```text
npm run proof:capture -- regression
npm run proof:capture -- implementation
```

The regression replay copies your unchanged test into an isolated temporary fixture with the original helper, checks for a behavior assertion failure, then runs it against the fixed helper. A syntax error, missing import, or unrelated failure does not qualify.

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

The upstream [test-driven-development skill](https://github.com/obra/superpowers/tree/main/skills/test-driven-development) uses a failing behavior test followed by a minimal passing change. This challenge adds a pre-agreed scope budget and a replay of that regression test.
