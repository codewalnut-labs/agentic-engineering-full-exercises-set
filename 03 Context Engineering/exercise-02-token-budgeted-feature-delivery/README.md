**Exercise 02**

# Token-Budgeted Feature Delivery

## Competency

03. Context Engineering - Agent working-context curation

## Your Mission

Implement a small UI change while staying inside a strict context budget and documenting every file included.

## Starter Project

```text
03 Context Engineering/exercise-02-token-budgeted-feature-delivery/starter-react
```

Run the React starter:

```bash
cd "03 Context Engineering/exercise-02-token-budgeted-feature-delivery/starter-react"
npm install
npm run dev
```

## Lab Outcome

A feature ships under an explicit context budget, with the agent reading the right files and no more.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Build the project context layer the agent needs before it starts changing code.

Practice signals for this exercise:

- Create a project context file with overview, architecture, module map, commands, conventions, and do-not-touch areas.
- Keep always-on rules lean while linking deeper architecture, domain, API, data-flow, and ADR references.
- Write a repo map covering owners, entry points, test locations, and common change paths.
- Capture project-specific rules for naming, errors, logging, auth, flags, migrations, and deployment checks.

Common mistake to avoid: Architecture and rules kept only in chat make every session start from zero.

Mastery signal: New sessions understand the repo shape, durable context replaces repeated corrections, and architecture lives in versioned files.

## Hands-On Scope

- Create a project context file with overview, module map, ownership, commands, conventions, and do-not-touch areas.
- Implement the requested UI behavior using only files justified by that context layer.
- Keep task state in a session-readable spec/plan/scratchpad so a fresh agent can resume after compaction.
- Add tests for the changed behavior and update context when the agent misses a project rule.

## Required Working Deliverables

- Working feature change in the starter.
- Focused tests for the feature.
- Context manifest and budget check.
- Evidence that build/typecheck/tests pass.

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

Does the approach demonstrate that context selection is an engineering decision, not prompt hoarding?
