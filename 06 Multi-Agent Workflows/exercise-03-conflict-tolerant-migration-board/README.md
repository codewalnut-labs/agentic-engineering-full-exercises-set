**Exercise 03**

# Conflict-Tolerant Migration Board

**Goal:** Plan and execute a batched UI migration where agents must avoid editing shared foundations at the same time.

**Outcome:** A migration board prevents parallel agents from colliding on shared foundations.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/migration-board.md](./docs/migration-board.md)
- [docs/shared-foundation-risks.md](./docs/shared-foundation-risks.md)

From the repository root, open the main starter:

```bash
cd "06 Multi-Agent Workflows/exercise-03-conflict-tolerant-migration-board/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [06. Multi-Agent Workflows practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#06-multi-agent-workflows)
- [git worktree documentation](https://git-scm.com/docs/git-worktree)
- [GitHub Projects docs](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to compare `docs/migration-board.md`, `docs/shared-foundation-risks.md`, and the starter to identify migration slices and shared foundation files.
2. Review the board and mark every slice as independent, blocked by foundation work, or integration-only.
3. Have the agent add an overlap detector or checklist that flags two slices touching the same foundation or shared component.
4. Execute one safe slice and one blocked-slice dry run so the board proves it can stop unsafe parallelism.
5. Ask the agent to update statuses, owners, evidence, and merge order after each slice attempt.
6. Run a clean-context board review where a new agent chooses the next slice and explains which files are off limits.

## Deliver

- Migration board with slice state, owner, file scope, blockers, and merge order.
- Overlap detector or checklist for shared foundations.
- One completed slice and one blocked or deferred slice with reasons.
- Evidence note showing how the board prevented or exposed a collision.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Shared foundation files are identified before agents start editing.
- The board distinguishes safe parallel work from integration or blocked work.
- Overlap detection catches at least one risky slice pairing.
- A fresh agent can pick a slice without accidentally editing shared foundations.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
