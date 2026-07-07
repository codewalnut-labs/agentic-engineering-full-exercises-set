**Exercise 01**

# Security and A11y Review Gauntlet

**Goal:** Review a generated React change for security, accessibility, and behavioral regressions before approving it.

**Outcome:** A generated PR is reviewed, patched, and re-verified before merge.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "09 Code Review/exercise-01-security-and-a11y-review-gauntlet/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/review-diff.md](./docs/review-diff.md)
- [docs/risk-checklist.md](./docs/risk-checklist.md)
- [pr/review-target.diff](./pr/review-target.diff)

## Use These Practices

- [09. Code Review practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#09-code-review)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Use a fresh review pass on `pr/review-target.diff` for security, accessibility, behavior, and tests.
4. Patch the merge-blocking findings in the starter code.
5. Add regression tests for each blocker.
6. Re-review after fixes and explicitly dismiss or defer remaining findings.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Patched starter code.
- Regression tests for security/a11y/behavior blockers.
- Triage table with fix/defer/dismiss decisions.
- Re-review evidence after the patch.

## Verify

Run at least:

```bash
cd "09 Code Review/exercise-01-security-and-a11y-review-gauntlet/starter-react" && npm test
cd "09 Code Review/exercise-01-security-and-a11y-review-gauntlet/starter-react" && npm run agent:check
```

Done when:
- fresh review
- security test
- a11y regression test
- fix/defer/dismiss triage
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
