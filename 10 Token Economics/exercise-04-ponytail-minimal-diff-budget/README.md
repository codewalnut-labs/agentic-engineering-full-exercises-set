**Exercise 04**

# Ponytail Minimal-Diff Budget

## Competency

10. Token Economics - Cost and context budget control

## Popular Agent Skill Pattern

Ponytail minimal-diff ladder

## Your Mission

Use the Ponytail ladder to finish a design-system migration slice with the smallest safe diff: skip what is not needed, reuse what exists, prefer platform features, and write new code only after the cheaper rungs fail.

## Starter Project

```text
10 Token Economics/exercise-04-ponytail-minimal-diff-budget/starter-react
```

Run the React starter:

```bash
cd "10 Token Economics/exercise-04-ponytail-minimal-diff-budget/starter-react"
npm install
npm run dev
```

## Lab Outcome

A migration task ships with less new code, less context churn, and no hidden loss of validation, accessibility, or error handling.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Use the skill pattern as an operating workflow, not as a prompt shortcut.

Practice signals for this exercise:

- Climb the ladder in order: skip, reuse local code, use standard library or platform behavior, use installed dependencies, then write the minimum new code.
- Trace the real flow before choosing a small diff.
- Preserve trust-boundary validation, accessibility, error handling, and data-loss protection.
- Leave one focused runnable check for any non-trivial logic.

Common mistake to avoid: Treating the skill name as magic and skipping the engineering control loop around it.

Mastery signal: The final diff is small because the correct lower rung held, not because the implementation ignored risk.

## Hands-On Scope

- Audit the session transcript and starter code for overbuilt migration ideas.
- Create a Ponytail ladder ledger showing which rung was accepted or rejected for each proposed change.
- Implement one design-system migration task by deleting, reusing, or using native behavior before adding new code.
- Add the smallest check that would fail if the chosen shortcut broke behavior.

## Required Working Deliverables

- Ponytail ladder ledger with accepted and rejected rungs.
- Working React migration slice.
- One focused runnable check for non-trivial logic.
- Short impact note comparing avoided code, changed files, commands, and residual risks.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- Ladder ledger proves skip/reuse/platform/dependency options were considered before new code.
- Final diff changes fewer files than the overbuilt starter plan while preserving required behavior.
- Safety exceptions are explicit for validation, accessibility, error handling, and data-loss protection.
- One focused check proves the implemented migration slice.

## Review Bar

Would this skill pattern make a real experienced team safer, faster, or clearer after the first implementation?
