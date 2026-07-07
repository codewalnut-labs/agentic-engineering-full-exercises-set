**Exercise 03**

# Skill and Hook Improvement Loop

## Competency

12. Agentic Retrospective - Session review, waste reduction, and improvement

## Your Mission

Run a mini retro on a flawed team skill and hook setup, then revise both to reduce future rework.

## Starter Project

```text
12 Agentic Retrospective/exercise-03-skill-and-hook-improvement-loop/starter-react
```

Run the React starter:

```bash
cd "12 Agentic Retrospective/exercise-03-skill-and-hook-improvement-loop/starter-react"
npm install
npm run dev
```

## Lab Outcome

A flawed skill and hook setup is improved using real session evidence and evals.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Review how you worked with the agent, then turn the lessons into better rules.

Practice signals for this exercise:

- Review agent sessions every one to two weeks like a sprint retro.
- Analyze wrong turns, re-prompts, steers, abandoned chats, and redone work.
- Track retry loops, oversized context, repeated file reads, cost, and tool failures.
- Diff agent output against final commits to find what was rewritten by hand.

Common mistake to avoid: Repeated mistakes are often setup problems, not just model failures.

Mastery signal: The same mistake stops recurring, rules and skills grow from evidence, and cost and rework trend down.

## Hands-On Scope

- Run the provided flawed skill/hook against seed scenarios and capture failures.
- Improve trigger descriptions, references, policy logic, and output shape.
- Add an eval harness that compares before and after behavior.
- Document only the decisions needed for future maintainers.

## Required Working Deliverables

- Revised skill and hook implementation.
- Before/after eval harness and results.
- Any starter code changes needed to exercise the workflow.
- Maintenance notes for future retros.

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

Does the loop prove that your team's agent practice improves from evidence?
