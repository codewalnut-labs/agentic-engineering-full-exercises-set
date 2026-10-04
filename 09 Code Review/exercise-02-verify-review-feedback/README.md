# Exercise 02 : Verify Review Findings Before Changing Code

## Your Mission

A caching change has received a confident review comment. Following it without checking could change safe code while leaving the actual failures unresolved.

Your challenge is to obtain an independent review, verify the feedback against the code, and decide which changes are justified. The reviewer must investigate without inheriting the implementer's assumptions or the earlier comment.

Use the **[receiving-code-review skill](https://github.com/obra/superpowers/tree/main/skills/receiving-code-review)** to assess each finding before implementing it and explain any disagreement with evidence.

The duration for this challenge is 60 min or less after setup.

## Project

[review-feedback-app](./review-feedback-app) contains the caching change, acceptance tests, and a protected Git comparison. The [review brief](./docs/review-brief.md) describes the expected behavior.

Keep the [earlier reviewer claim](./docs/reviewer-noise.md) out of the initial reviewer session. The coordinator evaluates it after preserving the independent review. This exercise is standalone.

## How To Go About It

1. Verify the supplied comparison and record the starting state in `evidence/before.md`.
2. Start a fresh reviewer with the brief, commit manifest, and diff. Allow inspection of the protected source; exclude implementation chat, earlier reviews, and expected answers.
3. Preserve the exact prompt and original response. Then compare its findings with the earlier claim.
4. Reproduce each issue before accepting or dismissing it. Write a short response explaining the decision and proof.
5. Fix only confirmed blockers and add focused cache regression tests. Commit the fixes and tests, then prove the same tests fail on the risky version and pass after remediation.
6. Obtain a fresh recheck of the fixed commit. Record the outcome in `evidence/after.md` and explain accepted feedback, rejected feedback, and remaining concerns in `evidence/comparison.md`.

## Evidence

Submit the focused fixes, regression tests, original reviewer prompt and response, session metadata, review reports, feedback response, and independent recheck.

Include `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`, actual skill use, source citations, and captured output. Follow the [setup instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `review-feedback-app/` before opening a focused PR.

## Completion Criteria

The review starts without implementation history or prior findings. Every accepted finding and dismissal has direct proof. Only confirmed bugs are changed, regression tests fail before and pass after, and the recheck covers the fixed commit. Final verification passes.
