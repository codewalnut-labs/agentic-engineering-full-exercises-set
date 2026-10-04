# Setup and verification

## What you are doing

The review decision covers the tested local flag boundary and drill. The exercise does not prove propagation through a live flag provider.

A **SHA** is a Git commit ID. The starting commit describes the inspected starter. The implementation commit contains the finished code; generated proof names that commit. The sealed commit contains the submitted evidence; the final verification capture names that later commit.

## Prepare

Read the supplied draft and reviewer comment in the [PR review brief](./pr-review-brief.md). Your submission must correct the PR description and answer that comment using generated proof.

Use the repository's `.nvmrc` version (Node 22.12 or newer within the supported range). From `feature-rollback-app/`, run:

```text
npm ci
npm run agent:check
```

Install **[verification-before-completion](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion)** using the [upstream installation instructions](https://github.com/obra/superpowers#installation) for your coding agent. Record the actual installed revision or skill hash. Ask the agent to use it when checking each PR claim, and retain the actual invocation and command results.

Run `npm run test:rollout` before editing and record the observed failures. Framework self-tests can pass while these learner acceptance checks fail.

Only `src/rollout/invoicePreview.mjs` and the new `scripts/rollback-invoice-preview.mjs` need product changes. Keep the protected [flag brief](./flag-brief.md), scenarios, configuration, and [rollback contract](./rollback-contract.md).

The local client implements a provider-independent boolean interface; installing an OpenFeature SDK is not required. An API failure can contain one attempted API call, but must emit no preview telemetry.

The drill copies the starter configuration into a temporary directory. It traces real lock, revision-read, temporary-write, and rename operations, injects interruption, and overlaps two commands. Do not run rollback against the protected starter configuration or a live environment.

The successful rollback command must take at most 1000 ms. The concurrency and interruption checks have their own safety assertions; the whole drill is not timed against that budget.

## Finish and submit

1. Record the starting commit with `git rev-parse HEAD`, inspect the problem, and write `evidence/before.md`.
2. Implement and check the change. Commit the implementation, then obtain its full SHA with `git rev-parse HEAD`. At this point all subsequent repository changes must be evidence only.
3. Replace `<implementation-sha>` below with that SHA and generate the proof:

```text
npm run rollout:capture -- --scenario enabled --sha <implementation-sha> --output ../evidence/enabled.json
npm run rollout:capture -- --scenario disabled --sha <implementation-sha> --output ../evidence/disabled.json
npm run rollout:capture -- --scenario provider-error --sha <implementation-sha> --output ../evidence/provider-error.json
npm run rollback:drill -- --sha <implementation-sha> --json ../evidence/rollback-drill.json --markdown ../evidence/rollback-drill.md
```

4. Draft `evidence/pr-summary.md` following the [evidence template](./evidence-template.md). Use the verification skill and capture the focused checks at the implementation commit:

```text
npm run proof:capture
```

This runs `npm run rollout:verify` and records its actual output, code version, timestamps, and exit code in `evidence/commands/checks.txt`. Preserve failed attempts before recapturing; do not type the output by hand.

5. Finish the corrected PR title and body, Evidence map, and `evidence/review-response.md` using the captured results. Complete the observations, source audit, and skill record. Commit all evidence artifacts. Seal that committed evidence, then capture final verification:

```text
npm run evidence:seal
npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify
```

6. Commit `evidence/manifest.json` and `evidence/commands/verify.txt`. Run `npm run verify:exercise`. This final check reads the submitted evidence and uses temporary directories for reproduction.
7. Follow the [PR review brief](./pr-review-brief.md) to open one focused PR with the corrected title and body. Link the submitted evidence and reviewer response before marking it ready for review. Check the final diff and accessible links. Approval and merging are not required.

If a check reveals a product change is needed, preserve the failed attempt, commit the repaired implementation, and regenerate all code-bound proof. Do not reuse old proof after changing source. Exclude `node_modules/`, build output, and unrelated changes from the PR.

## Sources

- [OpenFeature flag evaluation](https://openfeature.dev/specification/sections/flag-evaluation/): a caller supplies the typed default and error evaluation returns that default.
- [OpenFeature evaluation context](https://openfeature.dev/specification/sections/evaluation-context/): the targeting key identifies the evaluated subject.
- [Node.js filesystem API](https://nodejs.org/api/fs.html): exclusive file creation and same-directory replacement underpin the local rollback protocol.
