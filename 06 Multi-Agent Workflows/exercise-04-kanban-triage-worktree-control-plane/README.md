**Exercise 04**

# Kanban Triage Worktree Control Plane

**Goal:** Use the triage skill to turn `docs/incoming-issues.md` into an agent-ready Kanban board with safe worktree assignments.

**Outcome:** The board contains ready cards, blocked cards, deferred cards, worktree names, owned files, checks, review gates, and integration owners.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [06. Multi-Agent Workflows practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#06-multi-agent-workflows)
- [Matt Pocock skills](https://github.com/mattpocock/skills) - install `triage` or `to-issues`
- [Triage skill guide](https://www.aihero.dev/burn-through-your-backlog-with-my-triage-skill)
- [GitHub Issues docs](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)
- [git worktree documentation](https://git-scm.com/docs/git-worktree)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Install or open the public triage skill first. Run `npx skills@latest add mattpocock/skills`, select `triage` and `to-issues`, and run `/setup-matt-pocock-skills` if your agent installed it. If your tool cannot install skills, use the linked guide as the workflow.
2. Ask your coding agent to invoke `/triage` against `docs/incoming-issues.md` and bucket items into bug, feature, chore, duplicate, needs-spec, and unsafe-to-parallel.
3. Review the triage and require every accepted card to include value, scope, owned files, forbidden files, checks, risk, and integration owner.
4. Update `docs/agent-board.md` into a control plane with columns for ready, in progress, review, blocked, integrated, and deferred.
5. Assign worktree or branch names only to cards with non-overlapping ownership and clear review evidence.
6. Simulate moving two cards through the board, including at least one blocker or review rejection.
7. Run a clean-context handoff where a new agent reads the board and chooses exactly one ready card with safe commands and forbidden paths.

## Deliver

- Triage table for incoming issues with disposition and reason.
- Agent-ready board with card scope, owned files, forbidden files, checks, risk, and integration owner.
- Worktree or branch plan for cards safe to parallelize.
- Evidence note from the board simulation, review rejection or blocker, and clean-context handoff.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- No card reaches ready state without scope, owned files, forbidden files, checks, and review evidence.
- Blocked and needs-spec items are not silently converted into implementation work.
- Worktree assignments avoid overlapping write sets.
- A fresh agent can take one ready card without asking for hidden backlog context.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
