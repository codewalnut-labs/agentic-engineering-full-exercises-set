# Setup and verification

## What you are doing

The current browser measurements determine the decision. The protected baseline is illustrative reference data; do not claim matching environments or a measured improvement without an actual comparable baseline run.

A **SHA** is a Git commit ID. The starting commit describes the inspected starter. The implementation commit contains the finished code; generated proof names that commit. The sealed commit contains the submitted evidence; the final verification capture names that later commit.

## Prepare

Read the supplied draft and reviewer comment in the [PR review brief](./pr-review-brief.md). Your submission must correct the PR description and answer that comment using generated proof.

Use the repository's `.nvmrc` version (Node 22.12 or newer within the supported range). From `browser-quality-app/`, run:

```text
npm ci
npm run agent:check
```

Install **[verification-before-completion](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion)** using the [upstream installation instructions](https://github.com/obra/superpowers#installation) for your coding agent. Record the actual installed revision or skill hash. Ask the agent to use it when checking each PR claim, and retain the actual invocation and command results.

Install the browser dependency after `npm ci`:

```text
npx playwright install chrome
```

The default capture channel is `chrome`. Use `QUALITY_GATE_BROWSER_CHANNEL` only for an installed, documented alternative Chromium channel. The protected mobile screen and throttling settings apply to every run.

The supplied baseline reports describe the starter defects. They are reference examples, not a live before run. Use the current raw reports to make the release decision; describe baseline comparisons honestly.

Implement the UI fixes, `lighthouserc.json`, and `scripts/quality-gate.mjs` using the [quality brief](./quality-gate-brief.md) and [CLI contract](./gate-cli-contract.md). The harness builds once, audits route `/` three times, runs axe with the same browser channel, and generates `quality-report.md`.

The protected `quality:verify` command recomputes the summary, reproduces the build digest, and runs two deliberate failing controls against temporary report copies. These controls must each write a failed decision and return non-zero.

A failed or interrupted capture can be rerun. Completed captures cannot be overwritten; preserve the previous attempt before recapturing. If code changes, commit the new implementation and regenerate all proof for its new SHA.

## Finish and submit

1. Record the starting commit with `git rev-parse HEAD`, inspect the problem, and write `evidence/before.md`.
2. Implement and check the change. Commit the implementation, then obtain its full SHA with `git rev-parse HEAD`. At this point all subsequent repository changes must be evidence only.
3. Replace `<implementation-sha>` below with that SHA and generate the proof:

```text
npm run quality:capture -- --sha <implementation-sha>
```

4. Draft `evidence/pr-summary.md` following the [evidence template](./evidence-template.md). Use the verification skill and capture the focused checks at the implementation commit:

```text
npm run proof:capture
```

This runs `npm run quality:verify` and records its actual output, code version, timestamps, and exit code in `evidence/commands/checks.txt`. Preserve failed attempts before recapturing; do not type the output by hand.

5. Finish the corrected PR title and body, Evidence map, and `evidence/review-response.md` using the captured results. Complete the observations, source audit, and skill record. Commit all evidence artifacts. Seal that committed evidence, then capture final verification:

```text
npm run evidence:seal
npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify
```

6. Commit `evidence/manifest.json` and `evidence/commands/verify.txt`. Run `npm run verify:exercise`. This final check reads the submitted evidence and uses temporary directories for reproduction.
7. Follow the [PR review brief](./pr-review-brief.md) to open one focused PR with the corrected title and body. Link the submitted evidence and reviewer response before marking it ready for review. Check the final diff and accessible links. Approval and merging are not required.

If a check reveals a product change is needed, preserve the failed attempt, commit the repaired implementation, and regenerate all code-bound proof. Do not reuse old proof after changing source. Exclude `node_modules/`, build output, and unrelated changes from the PR.

## Sources

- [Lighthouse CI configuration](https://googlechrome.github.io/lighthouse-ci/docs/configuration.html): pessimistic aggregation chooses the value least likely to pass for each assertion.
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing): use axe scans alongside manual accessibility assessments.
- [Lighthouse variability](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md): document the measurement environment and avoid unsupported timing comparisons.
