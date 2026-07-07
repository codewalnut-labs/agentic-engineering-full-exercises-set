**Exercise 03**

# Model Routing Cost Planner

## Competency

10. Token Economics - Right model and token cost optimizations

## Your Mission

Design a model and effort routing policy for a team using agents across planning, coding, reviews, and retros.

## Starter Project

```text
10 Token Economics/exercise-03-model-routing-cost-planner/starter-react
```

Run the React starter:

```bash
cd "10 Token Economics/exercise-03-model-routing-cost-planner/starter-react"
npm install
npm run dev
```

## Senior Lab Outcome

A team routing policy chooses model and effort by task risk, not habit.

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

- Encode model/effort routing rules for planning, routine edits, tests, reviews, and retros.
- Build a small estimator or simulation using the provided scenarios and usage logs.
- Run the estimator against at least three senior-engineering workflows.
- Tune the policy when cost, latency, or risk looks wrong.

## Required Working Deliverables

- Routing policy in config or code.
- Cost/latency estimator script.
- Scenario simulation output.
- Leadership recommendation for adoption.

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

Would the policy survive scrutiny from engineering, finance, and security?
