**Exercise 04**

# PR Diff Review

**Goal:** Review the supplied PR diff under a timebox, then verify findings against surrounding code before deciding what blocks merge.

**Outcome:** Timed review practice ends with fixed blockers and proof, not only comments.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "09 Code Review/exercise-04-pr-diff-review/starter-react"
npm install
npm run dev
```

Seed files:
- [pr/review-target.diff](./pr/review-target.diff)

## Use These Practices

- [09. Code Review practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#09-code-review)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Read the supplied diff once yourself before asking the agent for help.
2. Ask your coding agent for a fresh review pass focused on behavior, security, accessibility, performance, and tests.
3. Verify each serious finding against surrounding code, not just the diff.
4. Patch at least the highest-severity blocker and add a test or check.
5. Leave lower-risk findings as clear follow-up issues with reasons.
6. Run the checks below and keep the output for your evidence note.
7. Commit only the files needed for this exercise.

## Deliver

- Code/test fix for the top blocker.
- Severity-ranked review findings.
- Evidence from build/typecheck/tests.
- Follow-up list for non-blocking improvements.

## Verify

Run at least:

```bash
cd "09 Code Review/exercise-04-pr-diff-review/starter-react" && npm test
cd "09 Code Review/exercise-04-pr-diff-review/starter-react" && npm run agent:check
```

Done when:
- Every blocker is tied to concrete code behavior.
- The top blocker is fixed with a test or check.
- Non-blocking findings are explicitly deferred or dismissed with reasons.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
