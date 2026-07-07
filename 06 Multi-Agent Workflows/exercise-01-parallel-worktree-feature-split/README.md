**Exercise 01**

# Parallel Worktree Feature Split

## Competency

06. Multi-Agent Workflows - Parallel agents on isolated tasks

## Your Mission

Split three independent improvements across worktrees or subagents and integrate them without overlapping file edits.

## Starter Project

```text
06 Multi-Agent Workflows/exercise-01-parallel-worktree-feature-split/starter-react
```

Run the React starter:

```bash
cd "06 Multi-Agent Workflows/exercise-01-parallel-worktree-feature-split/starter-react"
npm install
npm run dev
```

## Senior Lab Outcome

Independent changes run in parallel lanes and integrate cleanly under one senior owner.

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

- Split the requested work into three non-overlapping slices with explicit file ownership.
- Use separate branches/worktrees or simulated agent lanes for implementation.
- Integrate results deliberately, resolving conflicts instead of hiding them.
- Run the full verification gate after integration.

## Required Working Deliverables

- Three isolated change slices with ownership notes.
- Working integrated code in the starter.
- Conflict/risk log and final verification output.
- Main-thread integration summary.

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

Were you reviewing and integrating, or merely babysitting parallel sessions?
