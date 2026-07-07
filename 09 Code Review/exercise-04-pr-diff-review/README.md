**Exercise 04**

# PR Diff Review

**Goal:** Review the supplied PR diff under a timebox, then verify findings against surrounding code before deciding what blocks merge.

**Outcome:** Timed review practice ends with fixed blockers and proof, not only comments.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [pr/review-target.diff](./pr/review-target.diff)

Fixture note: customer names, people, emails, internal notes, and URLs are fictional exercise data.

From the repository root, open the main starter:

```bash
cd "09 Code Review/exercise-04-pr-diff-review/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [09. Code Review practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#09-code-review)
- [GitHub pull request review docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests)
- [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to review `pr/review-target.diff` under a timebox and produce only severity-ranked findings with file references and suspected impact.
2. Review the first pass yourself and discard style-only comments unless they hide correctness, security, accessibility, or maintainability risk.
3. Ask the agent to verify each possible blocker against the surrounding starter code and existing checks before proposing a fix.
4. Choose the top blocker, patch it, and add the smallest test or manual check that would catch the same issue next time.
5. Ask the agent to rewrite the review summary as a merge decision: block, approve with follow-up, or approve, with reasons.
6. Run a clean-context review focused on the patched blocker and confirm it no longer blocks merge.

## Deliver

- Timeboxed review findings with severity and evidence.
- Merge decision summary with accepted, deferred, and dismissed findings.
- Patch and verification for the top blocker.
- Evidence note with first-pass review, verification, fix, and second-pass result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Every blocker is verified against code outside the diff before it is treated as blocking.
- The top blocker has a fix and a regression check or clear manual proof.
- Non-blocking findings have explicit defer or dismiss reasons.
- A fresh agent can read the review summary and understand the merge decision.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
