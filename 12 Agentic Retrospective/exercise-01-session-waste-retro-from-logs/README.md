**Exercise 01**

# Session Waste Retro From Logs

## Competency

12. Agentic Retrospective - Session review, waste reduction, and improvement

## Your Mission

Analyze provided agent session logs to find retry loops, redundant file reads, and context waste.

## Starter Project

```text
12 Agentic Retrospective/exercise-01-session-waste-retro-from-logs/starter-react
```

Run the React starter:

```bash
cd "12 Agentic Retrospective/exercise-01-session-waste-retro-from-logs/starter-react"
npm install
npm run dev
```

## Lab Outcome

Agent session waste becomes measurable, then one waste pattern is eliminated with a system fix.

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

- Parse the provided session logs for retry loops, repeated reads, abandoned turns, tool failures, and context bloat.
- Build a small metrics script rather than hand-counting.
- Implement one rule, hook, skill, or workflow change that targets the top waste source.
- Re-run the seed scenario or simulation to show expected reduction.

## Required Working Deliverables

- Session log analyzer script.
- Waste metrics report.
- Implemented system fix in rules, hook, or skill.
- Before/after comparison evidence.

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

Does the retro change the operating system, or merely complain about the model?
