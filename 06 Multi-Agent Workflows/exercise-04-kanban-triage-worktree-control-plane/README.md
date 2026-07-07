**Exercise 04**

# Kanban Triage Worktree Control Plane

**Goal:** Turn a noisy backlog into agent-ready cards, isolated worktrees, review queues, and integration ownership.

**Outcome:** Multiple agents can work in parallel because the board encodes issue state, ownership, blockers, review gates, and merge order.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "06 Multi-Agent Workflows/exercise-04-kanban-triage-worktree-control-plane/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/agent-board.md](./docs/agent-board.md)
- [docs/incoming-issues.md](./docs/incoming-issues.md)

## Use These Practices

- [06. Multi-Agent Workflows practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#06-multi-agent-workflows)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `triage / to-issues / kanban board`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Triage cards before spawning or assigning agents.
4. Split work by ownership and conflict risk.
5. Use isolated branches or worktrees for implementation.
6. Keep the main thread responsible for review, integration, and final evidence.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Updated triage board.
- Worktree or branch plan with collision warnings.
- At least one working card implementation in React.
- Integration note with accepted and rejected agent outputs.

## Verify

Run at least:

```bash
cd "06 Multi-Agent Workflows/exercise-04-kanban-triage-worktree-control-plane/starter-react" && npm test
cd "06 Multi-Agent Workflows/exercise-04-kanban-triage-worktree-control-plane/starter-react" && npm run agent:check
```

Done when:
- Backlog states distinguish needs-info, ready-for-agent, ready-for-human, blocked, and done.
- Every agent card has ownership, touched area, commands, and merge criteria.
- Worktree plan avoids overlapping edits where possible.
- Integration evidence records which agent outputs were accepted, revised, or rejected.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
