**Exercise 02**

# Subagent NFR Swarm

## Competency

06. Multi-Agent Workflows - Parallel agents on isolated tasks

## Your Mission

Use specialist subagents for security, accessibility, performance, and testability review while one main thread owns the decision log.

## Starter Project

```text
06 Multi-Agent Workflows/exercise-02-subagent-nfr-swarm/starter-react
```

Run the React starter:

```bash
cd "06 Multi-Agent Workflows/exercise-02-subagent-nfr-swarm/starter-react"
npm install
npm run dev
```

## Lab Outcome

Specialist review agents produce actionable NFR findings and the main thread implements the right fixes.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Run independent work in parallel, with each agent in its own lane.

Practice signals for this exercise:

- Split work into isolated tasks before parallelizing.
- Give independent tasks separate worktrees and branches.
- Treat each agent result like a separate PR: review, test, and merge deliberately.
- Use subagents for focused search, repo review, research, and NFR checks inside one main task.

Common mistake to avoid: Parallel agents editing overlapping files do not go faster; they create conflict cleanup.

Mastery signal: Independent work runs side by side, worktrees prevent collisions, and the accountable owner integrates rather than babysits.

## Hands-On Scope

- Run separate security, accessibility, performance, and testability review passes.
- Triage findings into fix, defer, or dismiss with evidence.
- Implement the top fixes in the starter.
- Re-run checks after changes and record residual risk.

## Required Working Deliverables

- Specialist review summaries.
- Implemented NFR fixes.
- Tests or checks for the fixed risks.
- Main-thread decision log.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- List exact commands run and whether they passed or failed.
- Include test, typecheck, build, smoke, trace, or script output appropriate to the exercise.
- Show before/after behavior for any bug fix, refactor, NFR improvement, or policy change.
- Call out residual risk, deferred work, and why those choices are acceptable.

## Review Bar

Did specialist agents add signal without losing a single accountable owner?
