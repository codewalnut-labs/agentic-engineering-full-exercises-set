**Exercise 02**

# Strangler Pattern Checkout

**Goal:** Replace one path of a tangled checkout workflow with a new module while preserving external behavior.

**Outcome:** One branch of a tangled checkout workflow is replaced safely behind an adapter or flag.

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

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [11. Agentic Refactoring practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#11-agentic-refactoring)
- [Strangler Fig Application by Martin Fowler](https://martinfowler.com/bliki/StranglerFigApplication.html)
- [Feature Toggles by Martin Fowler](https://martinfowler.com/articles/feature-toggles.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/checkout-legacy-map.md` and trace the checkout path to find one branch that can be strangled safely.
2. Review the branch choice and require a comparison contract for old path versus new path before any extraction.
3. Have the agent introduce an adapter or flag boundary that can route the chosen branch to new code while leaving other branches untouched.
4. Implement the new branch module and run old/new comparison tests for totals, validation, errors, and confirmation state.
5. Ask the agent to document rollback behavior and conditions for expanding the strangler to the next branch.
6. Run a clean-context review where a new agent proves it can disable the new path and explain what remains in legacy checkout.

## Deliver

- Chosen checkout branch with old/new comparison contract.
- Adapter or flag boundary for routing between legacy and new behavior.
- New branch module plus comparison tests or smoke evidence.
- Evidence note with rollback path and remaining legacy scope.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Only one checkout branch is replaced; unrelated legacy paths are left alone.
- Old and new paths produce equivalent results for protected cases.
- Rollback or flag-off behavior restores the legacy branch cleanly.
- A fresh agent can identify the next safe strangler candidate without guessing.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
