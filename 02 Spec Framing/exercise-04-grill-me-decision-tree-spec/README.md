**Exercise 04**

# Grill-Me Decision Tree Spec

**Goal:** Use the Grill Me skill to turn the vague entitlement redesign into a decision tree, then implement the first safe entitlement-precedence slice.

**Outcome:** Entitlement precedence, denied states, migration safety, and failure behavior are captured before code changes, and one starter slice proves the tree is usable.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/decision-tree-seeds.md](./docs/decision-tree-seeds.md)
- [docs/vague-request.md](./docs/vague-request.md)

From the repository root, open the main starter:

```bash
cd "02 Spec Framing/exercise-04-grill-me-decision-tree-spec/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `grill-me / grill-with-docs`
- [Matt Pocock skills](https://github.com/mattpocock/skills) - install `grill-me` or `grill-with-docs`
- [Grill Me guide](https://www.aihero.dev/skills-grill-me)
- [Decision table testing overview](https://martinfowler.com/bliki/DecisionTable.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Install or open the public skill first. Run `npx skills@latest add mattpocock/skills`, select `grill-me` or `grill-with-docs`, and run `/setup-matt-pocock-skills` if your agent installed it. If your tool cannot install skills, keep the linked skill guide open and ask the agent to follow that workflow.
2. Ask your coding agent to run `/grill-me` or `/grill-with-docs` against `docs/vague-request.md` and stop after it captures questions, contradictions, examples, and non-goals.
3. Review the interview and answer only the questions needed to protect entitlement precedence, migration safety, denied states, and user-visible failures.
4. Have the agent convert the answers plus `docs/decision-tree-seeds.md` into a branch-by-branch decision tree.
5. Ask the agent to turn the tree into an implementation contract for the first slice: inputs, rejected inputs, precedence rules, denied copy, and merge boundary.
6. Use the contract to update the starter workflow and tests for that first entitlement-precedence slice.
7. Re-run the Grill Me pass after implementation and capture any branch the agent still cannot decide from the spec.

## Deliver

- Grill Me question log with resolved, deferred, and rejected assumptions.
- Entitlement decision tree with examples for every implemented branch.
- First entitlement-precedence implementation slice tied directly to the tree.
- Evidence note showing final checks and how the second Grill Me pass improved or validated the spec.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- No implemented entitlement decision depends on an unanswered Grill Me question.
- The decision tree includes precedence, denied paths, migration safety, failure behavior, and at least one non-goal.
- Tests or checks cover the highest-risk branches before the slice is considered done.
- A fresh agent can follow the tree and predict entitlement behavior for a new example.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
