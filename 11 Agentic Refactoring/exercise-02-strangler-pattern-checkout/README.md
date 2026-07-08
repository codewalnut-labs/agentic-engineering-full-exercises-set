**Exercise 02**

# Strangler Pattern Checkout

**Goal:** Strangle one checkout workflow branch into a new module behind an adapter or flag while preserving external behavior.

**Outcome:** One checkout branch routes through new code, old/new comparison checks pass, and rollback returns to the legacy path.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/checkout-legacy-map.md](./docs/checkout-legacy-map.md)

From the repository root, open the main starter:

```bash
cd "11 Agentic Refactoring/exercise-02-strangler-pattern-checkout/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [11. Agentic Refactoring practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#11-agentic-refactoring)
- [Strangler Fig Application by Martin Fowler](https://martinfowler.com/bliki/StranglerFigApplication.html)
- [Feature Toggles by Martin Fowler](https://martinfowler.com/articles/feature-toggles.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/checkout-legacy-map.md` and trace checkout to find one branch that can be strangled safely.
2. Review the branch choice and require an old/new comparison contract before extraction.
3. Introduce an adapter or flag boundary that routes the chosen branch to new code while leaving other branches untouched.
4. Implement the new branch module.
5. Run old/new comparison tests for totals, validation, errors, and confirmation state.
6. Document rollback behavior and conditions for expanding the strangler to the next branch.
7. Run a clean-context review where a new agent proves it can disable the new path and explain what remains in legacy checkout.

## Deliver

- Chosen checkout branch with old/new comparison contract.
- Adapter or flag boundary for routing between legacy and new behavior.
- New branch module plus comparison tests or smoke evidence.
- Evidence note with rollback path, final command output, and remaining legacy scope.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Only one checkout branch is replaced; unrelated legacy paths are left alone.
- Old and new paths produce equivalent results for protected cases.
- Rollback or flag-off behavior restores the legacy branch cleanly.
- A fresh agent can identify the next safe strangler candidate without guessing.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
