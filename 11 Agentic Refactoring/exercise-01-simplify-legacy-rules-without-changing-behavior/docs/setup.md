# Setup and verification

Use the Node version in `.nvmrc`. Install **[verification-before-completion](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion)** using the [upstream instructions](https://github.com/obra/superpowers#installation). Record its revision and actual use. This exercise stands alone.

## Observe and prepare

Run `npm ci` and `npm run agent:check` from `behavior-refactor-app/`. Record `git rev-parse HEAD` as `Starting commit: <full SHA>` in `evidence/before.md`. Then run `npm run proof:capture -- baseline`.

Add `src/rules/legacyEligibility.characterization.test.mjs`. Import only the public function and load the golden cases using a path relative to `import.meta.url`: the file is at `../../../docs/renewal-golden-cases.json` from the test. Assert each complete result with `deepEqual`; do not depend on private helper names.

Run `npm run test:oracle`, then `npm run snapshot:before`. Commit only the test and `evidence/before-output.json`. This is `characterizationSha`. Record it in `evidence/history.json`, then run `npm run proof:capture -- characterization`.

Refactor only `src/rules/legacyEligibility.mjs`. You may iterate and use several focused production commits, but keep the precommitted test and snapshot unchanged. Record the final commit as `refactorSha`. Run `npm run snapshot:after` and `npm run proof:capture -- implementation`.

## Report and seal

Finish the reports, `evidence/skill-use.md`, `evidence/skill-session.txt`, and `evidence/source-audit.json` using the [evidence template](./evidence-template.md). Capture tools keep actual stdout, stderr, timestamps, and the matching phase commit.

Commit all evidence after the final source commit. Then run from the app directory:

```text
npm run evidence:seal
npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify
```

Commit `evidence/manifest.json` and `evidence/commands/verify.txt`, then run `npm run verify:exercise`. The final command reads existing evidence; it does not generate it. Open one focused PR with accessible proof links. Approval and merging are not required.

Iteration is allowed. Keep failed attempts under `evidence/attempts/` before recapturing. If source needs another repair, commit the focused fix, update the final SHA, and regenerate affected proof before resealing. The precommitted characterization test and before snapshot remain unchanged.

## Background

[Martin Fowler's definition of refactoring](https://martinfowler.com/bliki/DefinitionOfRefactoring.html) distinguishes structural improvement from behavior change. This challenge preserves the existing public contract, including documented surprises.
