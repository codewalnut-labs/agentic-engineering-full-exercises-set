**Exercise 04**

# Skill Trigger Eval Harness

## Competency

05. Skill Packaging - Reusable agent skills and prompts

## Popular Agent Skill Pattern

skill evals and skill optimizer

## Your Mission

Build an eval harness that scores whether team skills trigger, run the right steps, and produce the expected output shape.

## Starter Project

```text
05 Skill Packaging/exercise-04-skill-trigger-eval-harness/starter-react
```

Run the React starter:

```bash
cd "05 Skill Packaging/exercise-04-skill-trigger-eval-harness/starter-react"
npm install
npm run dev
```

## Lab Outcome

A skill is treated like production workflow code: trigger cases, process checks, output checks, and regression evidence exist before rollout.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Use the skill pattern as an operating workflow, not as a prompt shortcut.

Practice signals for this exercise:

- Package the repeated workflow into explicit steps, trigger conditions, and evidence checks.
- Keep the agent focused on the smallest useful slice of the domain.
- Verify the skill pattern against code, tests, traces, or review artifacts.
- Record the decisions future humans or agents need to continue safely.

Common mistake to avoid: Treating the skill name as magic and skipping the engineering control loop around it.

Mastery signal: The skill pattern changes how the work is planned, executed, verified, and handed off.

## Hands-On Scope

- Inspect the bundled skill and find trigger ambiguity.
- Write eval cases before changing the skill.
- Patch the skill metadata and instructions.
- Run the harness and capture the regression report.

## Required Working Deliverables

- Updated SKILL.md with precise use-when and do-not-use boundaries.
- Eval cases for trigger and output behavior.
- Runnable harness or script check.
- Versioned report showing improvement.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- Trigger cases include positive, negative, and ambiguous prompts.
- Process checks verify commands, touched files, and required artifacts.
- Output checks validate schema and reviewer-ready language.
- The harness produces a versioned pass/fail report.

## Review Bar

Would this skill pattern make a real experienced team safer, faster, or clearer after the first implementation?
