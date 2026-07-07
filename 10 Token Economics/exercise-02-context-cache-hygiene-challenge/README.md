**Exercise 02**

# Context Cache Hygiene Challenge

## Competency

10. Token Economics - Right model and token cost optimizations

## Your Mission

Clean up stale instructions and oversized always-on context so future sessions stop rebilling irrelevant information.

## Starter Project

```text
10 Token Economics/exercise-02-context-cache-hygiene-challenge/starter-react
```

Run the React starter:

```bash
cd "10 Token Economics/exercise-02-context-cache-hygiene-challenge/starter-react"
npm install
npm run dev
```

## Senior Lab Outcome

Always-on context becomes lean, versioned, and cheaper without losing necessary guidance.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Spend expensive tokens on judgment. Do not use them for routine edits.

Practice signals for this exercise:

- Use stronger models for planning, architecture, and review; use cheaper models for routine implementation.
- Match effort to task difficulty instead of defaulting to max effort.
- Keep always-on context small with lean rules, few skills, and only needed tools.
- Use one task per session and compact or resume from summaries to avoid rebilling stale context.

Common mistake to avoid: Using the strongest model on simple edits spends expensive tokens on work that never needed them.

Mastery signal: Model and effort are chosen on purpose, cost tracks task difficulty, and routine work runs cheap.

## Hands-On Scope

- Audit oversized or stale agent instructions and split deep detail into linked references.
- Implement a size/check script that fails when always-on context grows past the agreed budget.
- Update starter rules so repeated corrections live in durable context.
- Run a simulated agent handoff before and after cleanup.

## Required Working Deliverables

- Lean AGENTS/CLAUDE context plus linked references.
- Context-size or stale-reference check.
- Before/after handoff comparison.
- Evidence that starter checks still pass.

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

Will future sessions pay for the context they need, not yesterday's noise?
