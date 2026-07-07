**Exercise 04**

# Kanban Triage Worktree Control Plane

**Goal:** Turn a noisy backlog into agent-ready cards, isolated worktrees, review queues, and integration ownership.

**Outcome:** Multiple agents can work in parallel because the board encodes issue state, ownership, blockers, review gates, and merge order.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/agent-board.md](./docs/agent-board.md)
- [docs/incoming-issues.md](./docs/incoming-issues.md)

From the repository root, open the main starter:

```bash
cd "06 Multi-Agent Workflows/exercise-04-kanban-triage-worktree-control-plane/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [06. Multi-Agent Workflows practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#06-multi-agent-workflows)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `triage / to-issues / kanban board`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: skill pattern, trigger conditions, source files, expected artifact, checks, and likely failure modes.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- Updated triage board.
- Worktree or branch plan with collision warnings.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Backlog states distinguish needs-info, ready-for-agent, ready-for-human, blocked, and done.
- Every agent card has ownership, touched area, commands, and merge criteria.
- Worktree plan avoids overlapping edits where possible.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
