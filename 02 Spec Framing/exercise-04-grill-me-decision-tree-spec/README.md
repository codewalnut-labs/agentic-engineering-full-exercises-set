**Exercise 04**

# Grill-Me Decision Tree Spec

**Goal:** Use a grill-me style interview to turn a vague entitlement redesign into a testable implementation contract before coding.

**Outcome:** A high-risk entitlement change is understood through a decision tree, examples, non-goals, and mergeable slices before implementation begins.

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

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `grill-me / grill-with-docs`
- [Matt Pocock skills](https://github.com/mattpocock/skills) - install `grill-me` or `grill-with-docs`
- [Grill Me guide](https://www.aihero.dev/skills-grill-me)
- [Decision table testing overview](https://martinfowler.com/bliki/DecisionTable.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Install or open the public skill first. Run `npx skills@latest add mattpocock/skills`, select `grill-me` or `grill-with-docs`, and run `/setup-matt-pocock-skills` if your agent installed it. If your tool cannot install skills, keep the linked skill guide open and ask the agent to follow that workflow.
2. Ask your coding agent to run `/grill-me` or `/grill-with-docs` against `docs/vague-request.md` and stop after questions, contradictions, examples, and non-goals are captured.
3. Review the interview and answer only the questions needed to protect entitlement behavior, migration safety, and user-visible failure states.
4. Have the agent convert the answers and `docs/decision-tree-seeds.md` into a decision tree with examples at every branch.
5. Ask the agent to turn the tree into a small implementation contract: accepted inputs, rejected inputs, precedence rules, and merge slices.
6. Use the contract to update the starter workflow and tests, keeping the first slice narrow enough to review independently.
7. Re-run the grill-me prompt once after implementation and capture any branch the agent still cannot decide from the spec.

## Deliver

- Question log with resolved, deferred, and rejected assumptions.
- Decision tree and examples covering entitlement precedence and failures.
- Implementation slice tied directly to the tree.
- Evidence note showing how the second grill-me pass improved or validated the spec.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- No implementation decision depends on an unanswered grill-me question.
- The decision tree includes edge cases, denied paths, and at least one non-goal.
- Tests or checks cover the highest-risk branches before the slice is considered done.
- A fresh agent can follow the tree and predict behavior for a new example.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
