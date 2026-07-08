**Exercise 03**

# Review Regression Lab

**Goal:** Find, prove, and fix a subtle behavior or accessibility regression hidden in the supplied large agent-written UI diff.

**Outcome:** At least one clean-looking regression is reproduced with a failing check, fixed narrowly, and rechecked for adjacent risk.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [09. Code Review practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#09-code-review)
- [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles)
- [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to review `docs/review-diff.md`, `docs/regression-seeds.md`, and `pr/review-target.diff` for subtle behavior, accessibility, state, and data regressions.
2. Review suspected regressions and require reproduction steps or a failing test idea before accepting any finding.
3. Write a failing regression test or manual reproduction for the highest-signal issue.
4. Patch the issue with the smallest diff that keeps the intended generated change intact.
5. Re-run the regression checklist for adjacent risks introduced by the patch.
6. Run final checks and capture output.
7. Run a clean-context review where a new agent explains why the final diff is safe despite the original clean-looking change.

## Deliver

- Regression finding list with reproduction or test strategy.
- Failing-then-passing regression check for the top issue.
- Small patch preserving intended generated behavior.
- Evidence note showing checked subtle risks, adjacent recheck, final command output, and remaining risks.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- At least one meaningful regression is proven before it is fixed.
- The fix does not replace review discipline with a broad rewrite.
- Adjacent behavior is rechecked after the patch.
- A fresh agent can explain why the regression was easy to miss from the diff alone.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
