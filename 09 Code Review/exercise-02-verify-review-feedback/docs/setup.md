# Setup and verification

Install the named skill using the [upstream installation instructions](https://github.com/obra/superpowers#installation) for your agent. Record its installed revision or file hash and actual use. Use the repository's supported Node version from `.nvmrc`.

## Prepare the independent review

Run `npm ci` and `npm run agent:check` from `review-feedback-app/`. Record `git rev-parse HEAD` as the starting commit in `evidence/before.md`, then run:

```text
npm run proof:capture -- fixture
```

Clone the protected `fixtures/review-target.bundle` into a separate temporary directory and check out the manifest's head SHA for source inspection. Give a fresh reviewer exactly the brief, manifest, and diff named in the [finding contract](./finding-contract.md), plus access to that protected source. Keep the exercise's verification scripts, previous reviews, and implementation conversation out of the review workspace.

Preserve the initial prompt in `evidence/fresh-review-prompt.md` and its original response in `evidence/review-session.txt`. Record the actual session ID, conditions, and normalized prompt hash in `evidence/reviewer-session.json`. A fresh session is a separate conversation without inherited history.

Only after this review is saved, read [reviewer-noise.md](./reviewer-noise.md). Use **[receiving-code-review](https://github.com/obra/superpowers/tree/main/skills/receiving-code-review)** to check both sources of feedback against the implementation. Explain accepted and dismissed feedback in `evidence/feedback-response.md`, with reproduction evidence.

## Fix and recheck

Write the original findings in `evidence/review.json` and `review.md`. Their `request-changes` decision concerns the original risky comparison; the later recheck concerns your fixed commit.

Implement only justified changes and `tests/cache-regressions.test.ts`. Name regression tests with their finding IDs. Commit the source fixes and tests together; set `review.json.sourceSha` to that full commit SHA.

At this implementation commit, run:

```text
npm run proof:capture -- focused
npm run proof:capture -- regressions
npm run proof:capture -- review
```

Request a new reviewer session for that fixed commit, with the expected behavior and findings to recheck. Record `evidence/recheck.json` and its raw transcript. Retain unresolved concerns instead of declaring success from a passing test alone.

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

- [receiving-code-review](https://github.com/obra/superpowers/tree/main/skills/receiving-code-review): the required workflow for this challenge.
