**Exercise 02**

# Rule Hardening From Repeated Mistakes

## Competency

12. Agentic Retrospective - Session review, waste reduction, and improvement

## Your Mission

Turn repeated agent corrections into durable AGENTS.md rules, skills, or hooks with clear trigger criteria.

## Starter Project

```text
12 Agentic Retrospective/exercise-02-rule-hardening-from-repeated-mistakes/starter-react
```

Run the React starter:

```bash
cd "12 Agentic Retrospective/exercise-02-rule-hardening-from-repeated-mistakes/starter-react"
npm install
npm run dev
```

## Senior Lab Outcome

Repeated agent mistakes become durable rules, skills, or hooks with tests.

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

- Cluster repeated corrections from the provided history into root causes.
- Choose the right fix type: rule, context file, skill, hook, or human habit.
- Implement at least two durable fixes.
- Add tests or simulations proving the fixes catch the repeated mistake.

## Required Working Deliverables

- Updated rules/context/skill/hook files.
- Hook or policy tests where applicable.
- Correction history mapped to fixes.
- Re-run evidence on seed mistakes.

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

Will the same mistake stop recurring across engineers and sessions?
