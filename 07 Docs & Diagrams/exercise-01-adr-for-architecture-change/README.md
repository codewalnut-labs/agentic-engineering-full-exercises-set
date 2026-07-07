**Exercise 01**

# ADR for Architecture Change

## Competency

07. Docs & Diagrams - Diagrams and architecture decision records

## Your Mission

Write an ADR for moving workflow state out of React-only local state into a service boundary.

## Starter Project

```text
07 Docs & Diagrams/exercise-01-adr-for-architecture-change/starter-react
```

Run the React starter:

```bash
cd "07 Docs & Diagrams/exercise-01-adr-for-architecture-change/starter-react"
npm install
npm run dev
```

## Lab Outcome

An architecture decision is implemented, tested, and documented while context is fresh.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Use agents to capture decisions while the context is still fresh.

Practice signals for this exercise:

- Record decisions as ADRs with what, why, alternatives, and trade-offs.
- Generate flowcharts, sequence diagrams, state diagrams, and C4 diagrams from code.
- Make architecture-change ADRs part of normal PR flow.
- Verify generated diagrams against code before trusting them.

Common mistake to avoid: A generated diagram that is slightly wrong is worse than none because people trust it.

Mastery signal: The why behind decisions is committed, docs evolve with code, and newcomers or agents can onboard from the repo.

## Hands-On Scope

- Move workflow state or another meaningful boundary out of an overgrown component into a service/module.
- Add tests proving the new boundary preserves behavior.
- Write the ADR after implementation evidence exists, including alternatives and trade-offs.
- Update a diagram only where it explains the non-obvious system change.

## Required Working Deliverables

- Implemented architecture change.
- Tests for the changed boundary.
- ADR tied to code and test evidence.
- Verified diagram or dependency map.

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

Does the ADR explain why the team should live with this decision six months from now?
