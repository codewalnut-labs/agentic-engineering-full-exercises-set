**Exercise 04**

# Kanban Triage Worktree Control Plane

## Competency

06. Multi-Agent Workflows - Delegation and orchestration

## Popular Agent Skill Pattern

triage, to-issues, and vibe-kanban

## Your Mission

Turn a noisy backlog into agent-ready cards, isolated worktrees, review queues, and integration ownership.

## Starter Project

```text
06 Multi-Agent Workflows/exercise-04-kanban-triage-worktree-control-plane/starter-react
```

Run the React starter:

```bash
cd "06 Multi-Agent Workflows/exercise-04-kanban-triage-worktree-control-plane/starter-react"
npm install
npm run dev
```

## Lab Outcome

Multiple agents can work in parallel because the board encodes issue state, ownership, blockers, review gates, and merge order.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Use the skill pattern as an operating workflow, not as a prompt shortcut.

Practice signals for this exercise:

- Package the repeated workflow into explicit steps, trigger conditions, and evidence checks.
- Keep the agent focused on the smallest useful slice of the domain.
- Verify the skill pattern against code, tests, traces, or review artifacts.
- Record the decisions future humans or agents need to continue safely.

Common mistake to avoid: Treating the skill name as magic and skipping the engineering control loop around it.

Mastery signal: The skill pattern changes how the work is planned, executed, verified, and handed off.

## Hands-On Scope

- Triage cards before spawning or assigning agents.
- Split work by ownership and conflict risk.
- Use isolated branches or worktrees for implementation.
- Keep the main thread responsible for review, integration, and final evidence.

## Required Working Deliverables

- Updated triage board.
- Worktree or branch plan with collision warnings.
- At least one working card implementation in React.
- Integration note with accepted and rejected agent outputs.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- Backlog states distinguish needs-info, ready-for-agent, ready-for-human, blocked, and done.
- Every agent card has ownership, touched area, commands, and merge criteria.
- Worktree plan avoids overlapping edits where possible.
- Integration evidence records which agent outputs were accepted, revised, or rejected.

## Review Bar

Would this skill pattern make a real experienced team safer, faster, or clearer after the first implementation?
