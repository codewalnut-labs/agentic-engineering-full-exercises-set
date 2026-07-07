**Exercise 01**

# Token Budget Refactor

## Competency

10. Token Economics - Right model and token cost optimizations

## Your Mission

Plan a refactor with a token budget, choosing context, model effort, and automation deliberately.

## Starter Project

```text
10 Token Economics/exercise-01-token-budget-refactor/starter-react
```

Run the React starter:

```bash
cd "10 Token Economics/exercise-01-token-budget-refactor/starter-react"
npm install
npm run dev
```

## Lab Outcome

A refactor is planned and executed with expensive reasoning reserved for judgment-heavy work.

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

- Create a context and model/effort budget before touching code.
- Move deterministic edits into a script or small helper where appropriate.
- Implement the refactor and tests without loading unrelated files.
- Compare planned vs actual context, commands, and verification effort.

## Required Working Deliverables

- Working refactor in the starter.
- Tests proving behavior.
- Context/model budget ledger.
- Automation for any repeated deterministic work.

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

Does cost track task difficulty instead of session sprawl?
