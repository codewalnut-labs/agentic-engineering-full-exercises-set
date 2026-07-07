**Exercise 04**

# Caveman Handoff Token Budget

## Competency

10. Token Economics - Cost and context budget control

## Popular Agent Skill Pattern

caveman, handoff, and token optimizer

## Your Mission

Reduce session waste during a long design-system migration by compressing agent output, pruning context, and creating a precise handoff.

## Starter Project

```text
10 Token Economics/exercise-04-caveman-handoff-token-budget/starter-react
```

Run the React starter:

```bash
cd "10 Token Economics/exercise-04-caveman-handoff-token-budget/starter-react"
npm install
npm run dev
```

## Lab Outcome

A migration session remains understandable and cheap because prose is compressed, repeated context is removed, and handoff state is surgical.

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

- Audit session transcript for repeated output and stale context.
- Define a compressed communication mode with safety exceptions.
- Implement one migration task using the budget.
- Write a handoff that preserves decisions, commands, failures, and next steps.

## Required Working Deliverables

- Token ledger and context-pruning patch.
- Compressed status/update template.
- Working React migration slice.
- Handoff note tested by a fresh planning pass.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- Token ledger separates useful context from repeated narration and stale files.
- Compressed update format preserves file paths, commands, risks, and decisions.
- Handoff note lets a fresh agent continue without rereading the whole thread.
- One migration step is implemented with lower context churn.

## Leadership Review

Would this skill pattern make a real experienced team safer, faster, or clearer after the first implementation?
