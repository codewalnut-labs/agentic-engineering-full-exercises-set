**Exercise 03**

# Review Regression Lab

**Goal:** Find subtle regressions in a large agent-written UI diff that appears clean at first glance.

**Outcome:** Subtle clean-looking regressions are caught by behavior tests and review discipline.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "09 Code Review/exercise-03-review-regression-lab/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/regression-seeds.md](./docs/regression-seeds.md)
- [docs/review-diff.md](./docs/review-diff.md)
- [pr/review-target.diff](./pr/review-target.diff)

## Use These Practices

- [09. Code Review practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#09-code-review)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Ask a fresh model or session to review the supplied diff for behavior drift and NFR risk.
4. Verify each finding yourself against filtering, sorting, risk scoring, permissions, empty states, accessibility, and performance.
5. Write tests that fail on the true regressions, then patch the implementation to restore intended behavior.
6. Triage every finding as fix, defer, or dismiss with evidence, then re-review after the patch.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Failing-then-passing regression tests.
- Code fixes for the regressions.
- Review summary with severity and evidence.
- Residual risk notes for anything deferred.

## Verify

Run at least:

```bash
cd "09 Code Review/exercise-03-review-regression-lab/starter-react" && npm test
cd "09 Code Review/exercise-03-review-regression-lab/starter-react" && npm run agent:check
```

Done when:
- fresh model review
- NFR checklist
- failing-then-passing tests
- fix/defer/dismiss triage
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
