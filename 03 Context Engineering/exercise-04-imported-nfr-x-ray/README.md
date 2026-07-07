**Exercise 04**

# Imported NFR X-Ray

## Competency

03. Context Engineering - Build a reusable context pack before asking an agent to judge architecture, risk, and production readiness.

## Your Mission

Build the context layer a fresh agent needs before it audits the internal workflow portal. Use the audit to prove the context pack is useful, then fix the highest-value findings.

## Starter Project

```text
03 Context Engineering/exercise-04-imported-nfr-x-ray/starter-react
```

Run the React starter:

```bash
cd "03 Context Engineering/exercise-04-imported-nfr-x-ray/starter-react"
npm install
npm run dev
```

## Senior Lab Outcome

The NFR audit leads to prioritized fixes and verification, not a report that stops before engineering work begins.

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

- Build a durable context pack first: repo map, architecture notes, module owners, safe inspection paths, commands, and NFR checklist.
- Use that context pack to run an agent-assisted NFR audit across security, accessibility, performance, reliability, and testability.
- Choose the top two material findings, implement fixes in the starter, and update the context layer with any repeated correction.
- Add or update checks that would catch those regressions in a future agent session.

## Required Working Deliverables

- At least two code/config/test fixes for high-value NFR gaps.
- Automated checks for the fixed risks.
- Severity-ranked audit with evidence from changed files.
- Before/after command evidence.

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

Can the team see why these risks were fixed now and why others were deferred?
