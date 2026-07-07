**Exercise 03**

# MCP Context Server for Product Data

## Competency

03. Context Engineering - Agent working-context curation

## Your Mission

Expose product rules and fixtures through a tiny TypeScript context server so agents stop pasting giant JSON into prompts.

## Starter Project

```text
03 Context Engineering/exercise-03-mcp-context-server-for-product-data/starter-react
```

Run the React starter:

```bash
cd "03 Context Engineering/exercise-03-mcp-context-server-for-product-data/starter-react"
npm install
npm run dev
```

## Senior Lab Outcome

Product rules move from prompt paste into a small runnable context service that agents and code can query.

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

- Build the TypeScript context server around product rules, fixtures, and retrieval boundaries.
- Expose focused queries for product limits, eligibility rules, glossary terms, and sample payloads.
- Integrate one starter workflow with the server output instead of hard-coded duplicated rules.
- Add tests for retrieval correctness and forbidden broad dumps.

## Required Working Deliverables

- Runnable context server or MCP-style adapter.
- React integration or demo client using retrieved rules.
- Tests for rule lookup and access boundaries.
- Usage notes for Codex/Claude/Cursor.

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

Does this reduce token waste and hallucinated product rules across future sessions?
