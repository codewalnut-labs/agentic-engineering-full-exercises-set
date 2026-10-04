# Setup and verification

Install the named skill using the [upstream installation instructions](https://github.com/obra/superpowers#installation) for your agent. Record its installed revision or file hash and actual use. Use the repository's supported Node version from `.nvmrc`.

## Prepare the review

Run `npm ci`, `npm run agent:check`, and `npm run review:semgrep:install` from `review-fix-app/`. The scanner version is pinned in `requirements-semgrep.txt`. If that version is unavailable on your OS, use a supported environment and record it; retain the supplied rules.

Record `git rev-parse HEAD` as the starting commit in `evidence/before.md`, then run:

```text
npm run proof:capture -- fixture
npm run review:semgrep
```

The fixture verifier checks that the supplied diff matches the bundle. The scanner inspects that bundle's vulnerable head, including a safe scanner match. Keep its raw JSON; do not suppress or remove the safe code to make the scan quiet.

For source inspection, clone `fixtures/review-target.bundle` into a separate temporary directory and check out the manifest's head SHA. The bundle's base/head commits are review inputs; they are different from your working repository's starting and fixed commits. Edit the starter app in your exercise, not the temporary clone.

Use **[requesting-code-review](https://github.com/obra/superpowers/tree/main/skills/requesting-code-review)** to request a review with the exact bundle range, requirements, and inspected source. Keep the original session in `evidence/review-session.txt`. The reviewer should reproduce scanner warnings and inspect behavior the scanner does not cover.

## Fix and recheck

Write `evidence/review.json` and `review.md` using the [finding contract](./finding-contract.md). They describe the original vulnerable comparison, so their decision remains `request-changes` after you fix it.

Implement the confirmed fixes and `tests/review-regressions.test.ts`. Use a finding ID in each relevant test name. Commit only the focused source changes and learner tests, then use that full SHA as `review.json.sourceSha`.

At this implementation commit, run:

```text
npm run proof:capture -- regressions
npm run proof:capture -- scanner
npm run proof:capture -- review
```

The replay runs the same tests on the vulnerable and fixed versions; an import error is not an acceptable regression failure. Use the skill again to request a fresh review of the fixed commit. Record `evidence/recheck.json` and the actual recheck transcript as described in the [evidence template](./evidence-template.md).

## Seal and submit

A SHA is a Git commit ID. The starting commit records the initial state; the implementation commit contains the measured fixes or skill. Subsequent commits contain evidence only.

1. Finish the reports, `evidence/skill-use.md`, `evidence/skill-session.txt`, and `evidence/source-audit.json` using the [evidence template](./evidence-template.md).
2. Commit all evidence artifacts before sealing them.
3. From the app directory, run:

```text
npm run evidence:seal
npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify
```

4. Commit `evidence/manifest.json` and `evidence/commands/verify.txt`, then run `npm run verify:exercise`. This final check is read-only.
5. Open one focused PR from your fork with the change, review findings, and accessible proof links. Approval and merging are not required.

Capture tools record actual stdout, stderr, exit codes, and commits. Preserve failed attempts before recapturing. If source changes after measurement, commit the repair and regenerate the affected proof and recheck. Keep dependencies, build output, unrelated work, and credentials out of the PR.

## References

- [Semgrep triage and remediation](https://docs.semgrep.dev/semgrep-code/triage-remediation): investigate and explain findings before choosing remediation or dismissal.
- [requesting-code-review](https://github.com/obra/superpowers/tree/main/skills/requesting-code-review): the required workflow for this challenge.
