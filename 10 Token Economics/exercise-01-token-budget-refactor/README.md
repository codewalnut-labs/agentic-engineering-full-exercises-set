**Exercise 01**

# Token Budget Refactor

**Goal:** Refactor the starter with a written token budget that controls context reads, model effort, and scripted verification.

**Outcome:** The refactor ships with a context manifest, planned-versus-actual budget comparison, and checks that avoid rereading the large doc pack.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/large-doc-pack.md](./docs/large-doc-pack.md)
- [docs/usage-log.md](./docs/usage-log.md)

From the repository root, open the main starter:

```bash
cd "10 Token Economics/exercise-01-token-budget-refactor/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [10. Token Economics practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#10-token-economics)
- [OpenAI prompt caching guide](https://platform.openai.com/docs/guides/prompt-caching)
- [OpenAI API pricing](https://openai.com/api/pricing/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/usage-log.md` and skim `docs/large-doc-pack.md` only enough to propose a refactor context budget.
2. Review the budget and assign effort tiers by task type: planning, mechanical edit, test update, and review.
3. Create a context manifest with minimum source files, excluded stale docs, deferred reads, and the reason each included file is worth reading.
4. Execute the refactor in small steps, moving deterministic checks into scripts where that saves repeated reasoning.
5. Compare planned versus actual context and note where the budget changed because of real code discoveries.
6. Run final checks and capture output.
7. Run a clean-context review using only the manifest and final diff to confirm the refactor can be understood without rebilling the whole doc pack.

## Deliver

- Token and effort budget plan for the refactor.
- Context manifest with include, exclude, deferred, added-later, and reason columns.
- Refactor implementation with focused checks.
- Evidence note comparing planned context, actual context, final command output, and remaining cost risk.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Expensive reasoning is reserved for planning and review rather than routine edits.
- The context manifest excludes large or stale docs unless they directly affect the refactor.
- The refactor is verified by checks that do not require rereading broad context.
- A fresh agent can understand the work from the manifest and evidence note.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
