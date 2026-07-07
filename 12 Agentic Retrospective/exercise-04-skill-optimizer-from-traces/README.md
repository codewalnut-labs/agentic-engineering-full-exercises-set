**Exercise 04**

# Skill Optimizer From Traces

## Competency

12. Agentic Retrospective - Improving the human-agent system

## Popular Agent Skill Pattern

skill optimizer and trace retro

## Your Mission

Analyze failed agent traces and turn repeated skill mistakes into a measured skill improvement, hook, or team rule.

## Starter Project

```text
12 Agentic Retrospective/exercise-04-skill-optimizer-from-traces/starter-react
```

Run the React starter:

```bash
cd "12 Agentic Retrospective/exercise-04-skill-optimizer-from-traces/starter-react"
npm install
npm run dev
```

## Lab Outcome

A broken alert-triage skill improves because trace evidence reveals trigger misses, repeated reads, skipped checks, and weak output contracts.

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

- Read traces and group mistakes by cause.
- Choose skill, rule, hook, or habit as the corrective mechanism.
- Patch the smallest durable artifact.
- Add an eval or check so the same mistake is visible next time.

## Required Working Deliverables

- Trace retro with ranked waste and failure patterns.
- Patched skill or team rule.
- Regression case from a real trace.
- Before and after evidence for the improvement.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- Trace analysis identifies repeated reads, retry loops, skipped checks, and trigger misses.
- At least one skill patch is backed by a failing trace case.
- A hook or rule is added only when it prevents a repeated mistake.
- Post-change eval shows fewer misses or a clearer remaining risk.

## Leadership Review

Would this skill pattern make a real experienced team safer, faster, or clearer after the first implementation?
