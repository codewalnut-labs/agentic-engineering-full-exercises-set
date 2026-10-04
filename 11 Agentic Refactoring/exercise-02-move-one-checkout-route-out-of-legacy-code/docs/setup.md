# Setup and verification

Use the Node version in `.nvmrc`. Install **[test-driven-development](https://github.com/obra/superpowers/tree/main/skills/test-driven-development)** using the [upstream instructions](https://github.com/obra/superpowers#installation). Record its revision and actual use. This exercise stands alone.

## Observe and prepare

Run `npm ci` and `npm run agent:check` from `checkout-migration-app/`. Record `git rev-parse HEAD` as `Starting commit: <full SHA>` in `evidence/before.md`. Then run `npm run proof:capture -- baseline`.

Add `src/checkout/checkoutRouter.test.mjs`. Test the public router using injected legacy/card spies; do not import a card module that does not yet exist. Cover compatibility, the switch, and authorization evidence. Run `npm run test:characterization`; its expected result is an assertion failure exposing the missing new route.

Commit only this test, record the commit as `characterizationSha` in `evidence/history.json`, then run `npm run proof:capture -- characterization`. This capture intentionally ends with exit code 1 and an `ERR_ASSERTION`; a missing import or syntax error is not a valid red test.

Implement `src/checkout/cardCheckout.mjs` and `src/checkout/checkoutRouter.mjs` in focused commits. Keep the precommitted test unchanged. Record the final implementation commit as `sourceSha`, then run `npm run proof:capture -- implementation`. The history verifier replays the same test against both phases.

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

[Martin Fowler's Strangler Fig description](https://martinfowler.com/bliki/StranglerFigApplication.html) motivates replacing a small part while old and new implementations coexist. Here, the card boundary and rollback switch make that approach concrete.
