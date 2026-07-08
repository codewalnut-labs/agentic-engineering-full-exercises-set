**Exercise 01**

# Parallel Worktree Feature Split

**Goal:** Split the starter task board into three non-overlapping implementation lanes, run them as separate worktrees or agents, and integrate them in a planned order.

**Outcome:** The repo contains three lane briefs, lane outputs, integration decisions, and final verification proving parallel work did not collide.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/file-ownership-map.md](./docs/file-ownership-map.md)
- [docs/task-board.md](./docs/task-board.md)

From the repository root, open the main starter:

```bash
cd "06 Multi-Agent Workflows/exercise-01-parallel-worktree-feature-split/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [06. Multi-Agent Workflows practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#06-multi-agent-workflows)
- [git worktree documentation](https://git-scm.com/docs/git-worktree)
- [GitHub pull request review docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/task-board.md`, `docs/file-ownership-map.md`, and `starter-react`, then propose three implementation lanes with non-overlapping write sets.
2. Review the split and reject any lane that touches shared foundations without an explicit integration owner.
3. Create lane briefs with branch or worktree name, owned files, forbidden files, commands, expected evidence, and merge order.
4. Execute the lanes with separate agents, separate worktrees, or simulated lane folders while the main thread owns integration.
5. Merge or reconcile lane results in the planned order and record conflicts, skipped changes, and verification per lane.
6. Run the full verification gate after integration.
7. Run a clean-context integration review where a new agent reads the lane briefs and explains the merge order and risk.

## Deliver

- Three lane briefs with ownership, commands, checks, and forbidden overlap.
- Implemented or simulated lane outputs with separate evidence notes.
- Integration log showing merge order, conflicts, skipped changes, and resolution decisions.
- Final evidence note proving the combined result works after integration.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- No two lanes claim the same source file unless the integration plan calls it out.
- Each lane can be reviewed like a small PR with its own checks and evidence.
- The main thread records integration decisions instead of silently accepting all agent output.
- A fresh agent can understand lane ownership, merge order, and forbidden files.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
