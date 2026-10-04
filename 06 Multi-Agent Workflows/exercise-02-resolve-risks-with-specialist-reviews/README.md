# Exercise 02 : Resolve Release Risks with Specialist Reviews

## Your Mission

Your team is preparing to release an app where people review and approve access requests. The app runs, but it has problems that could make it unsafe, difficult to use, slow, or hard to test.

Your challenge is to coordinate four reviewing agents, each with a different responsibility:

- **Security:** can someone approve access without permission or submit unsafe content?
- **Accessibility:** can someone use the review screen with a keyboard?
- **Performance:** does the app repeat work that slows it down?
- **Testability:** can automated tests check approval reliably without real delays?

Use **[dispatching-parallel-agents](https://github.com/obra/superpowers/tree/main/skills/dispatching-parallel-agents)**. The reviewing agents report problems. You check their findings, fix confirmed issues, and arrange a second review.

The duration for this challenge is 75 min or less after setup; repeated reviews may take longer.

## Project

[specialist-review-app](./specialist-review-app) contains the app and checks for all four roles. Use the [review prompts](./docs/specialist-prompts.md), [problems to investigate](./docs/nfr-risk-seeds.md), and [required fixes](./docs/remediation-contract.md).

One supplied review recommendation is incorrect. Check it against the code before acting on it.

## How To Go About It

1. Record the starting Git commit, initial problems, and review conditions in `evidence/before.md`.
2. Start four separate agent sessions on that same code version, one per role. Give each its review prompt and check command. Run reviews in parallel where capacity allows and save the actual sessions.
3. Check each finding against the code and test results. Record whether to fix, postpone, or dismiss it. Fix all required issues. Check the approval function from both the security and testability perspectives.
4. Commit the fixes, measure performance using the same inputs, and start four new review sessions on the repaired commit. Each reviewer reruns its role's check.
5. Record the final result in `evidence/after.md`. Use `evidence/comparison.md` to explain the fixes, review results, speed improvement, and remaining risks.

## Evidence

Submit the code changes, four initial reviews and four rechecks, their actual sessions and command outputs, performance measurements, and your decisions about each finding.

Follow the [setup and workflow instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and repository [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `specialist-review-app/` before raising a focused PR.

## Completion Criteria

All required problems are fixed and pass the four review checks. The incorrect recommendation is rejected with code evidence. The measured calculation takes at least 75 percent less time and returns the same result. Every review names the code version it checked, every finding has a decision, and final verification passes.
