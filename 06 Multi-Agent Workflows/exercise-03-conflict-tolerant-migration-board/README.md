**Exercise 03**

# Conflict-Tolerant Migration Board

## Competency

06. Multi-Agent Workflows - Parallel agents on isolated tasks

## Your Mission

Plan and execute a batched UI migration where agents must avoid editing shared foundations at the same time.

## Starter Project

```text
06 Multi-Agent Workflows/exercise-03-conflict-tolerant-migration-board/starter-react
```

Run the React starter:

```bash
cd "06 Multi-Agent Workflows/exercise-03-conflict-tolerant-migration-board/starter-react"
npm install
npm run dev
```

## Senior Lab Outcome

A migration board prevents parallel agents from colliding on shared foundations.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Run independent work in parallel, with each agent in its own lane.

Practice signals for this exercise:

- Split work into isolated tasks before parallelizing.
- Give independent tasks separate worktrees and branches.
- Treat each agent result like a separate PR: review, test, and merge deliberately.
- Use subagents for focused search, repo review, research, and NFR checks inside one main task.

Common mistake to avoid: Parallel agents editing overlapping files do not go faster; they create conflict cleanup.

Mastery signal: Independent work runs side by side, worktrees prevent collisions, and the senior owner integrates rather than babysits.

## Hands-On Scope

- Create a migration board that assigns files, dependencies, and merge order.
- Implement at least two migration slices in non-overlapping areas.
- Add an integration check that detects shared-file edits or ordering mistakes.
- Run final tests after merging slices.

## Required Working Deliverables

- Migration board with ownership and dependency rules.
- Two completed migration slices in code.
- Conflict detection script or checklist backed by actual file changes.
- Integration verification evidence.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one senior owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- List exact commands run and whether they passed or failed.
- Include test, typecheck, build, smoke, trace, or script output appropriate to the exercise.
- Show before/after behavior for any bug fix, refactor, NFR improvement, or policy change.
- Call out residual risk, deferred work, and why those choices are acceptable.

## Leadership Review

Could this migration scale to multiple senior engineers and agents without merge chaos?
