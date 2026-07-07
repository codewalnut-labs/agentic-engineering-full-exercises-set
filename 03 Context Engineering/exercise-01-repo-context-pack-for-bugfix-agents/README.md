**Exercise 01**

# Repo Context Pack for Bugfix Agents

## Competency

03. Context Engineering - Agent working-context curation

## Your Mission

Build a compact context layer so future bugfix agents understand ownership, commands, and safe inspection paths.

## Starter Project

```text
03 Context Engineering/exercise-01-repo-context-pack-for-bugfix-agents/starter-react
```

Run the React starter:

```bash
cd "03 Context Engineering/exercise-01-repo-context-pack-for-bugfix-agents/starter-react"
npm install
npm run dev
```

## Lab Outcome

A fresh agent can fix a seeded bug using project context files instead of chat paste.

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

- Create a compact repo map, architecture/context file, command list, and do-not-touch list.
- Seed or use the provided bug report, then have the context guide a real code fix in the starter.
- Add a regression test proving the bug is fixed.
- Keep deep detail linked, not stuffed into the always-on file.

## Required Working Deliverables

- Versioned context layer under the exercise.
- Actual bug fix in the React starter.
- Regression test or smoke check.
- Fresh-agent handoff note showing what context was loaded and why.

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

Would future agents stop asking the same repo-shape questions after this context layer exists?
