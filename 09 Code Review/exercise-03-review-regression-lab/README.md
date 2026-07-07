**Exercise 03**

# Review Regression Lab

**Goal:** Find subtle regressions in a large agent-written UI diff that appears clean at first glance.

**Outcome:** Subtle clean-looking regressions are caught by behavior tests and review discipline.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/regression-seeds.md](./docs/regression-seeds.md)
- [docs/review-diff.md](./docs/review-diff.md)
- [pr/review-target.diff](./pr/review-target.diff)

From the repository root, open the main starter:

```bash
cd "09 Code Review/exercise-03-review-regression-lab/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [09. Code Review practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#09-code-review)
- [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles)
- [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to review `docs/review-diff.md` and `docs/regression-seeds.md` for subtle behavior, accessibility, state, and data regressions that may look clean in the diff.
2. Review the suspected regressions and demand reproduction steps or a failing test idea before accepting any finding.
3. Have the agent write a failing regression test or manual reproduction for the highest-signal issue.
4. Patch the issue with the smallest diff that keeps the intended generated change intact.
5. Ask the agent to re-run the regression checklist for adjacent risks introduced by the patch.
6. Run a clean-context review where a new agent explains why the final diff is safe despite the original clean-looking change.

## Deliver

- Regression finding list with reproduction or test strategy.
- Failing-then-passing regression check for the top issue.
- Small patch preserving intended behavior.
- Evidence note showing which subtle risks were checked and which remain.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- At least one meaningful regression is proven before it is fixed.
- The fix does not replace review discipline with a broad rewrite.
- Adjacent behavior is rechecked after the patch.
- A fresh agent can explain why the regression was easy to miss from the diff alone.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
