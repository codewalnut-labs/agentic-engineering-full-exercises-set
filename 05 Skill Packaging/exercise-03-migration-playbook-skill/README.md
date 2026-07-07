**Exercise 03**

# Migration Playbook Skill

## Competency

05. Skill Packaging - Workflow packaging into reusable skills

## Your Mission

Package a migration workflow for converting legacy components to typed React modules with tests and review notes.

## Starter Project

```text
05 Skill Packaging/exercise-03-migration-playbook-skill/starter-react
```

Run the React starter:

```bash
cd "05 Skill Packaging/exercise-03-migration-playbook-skill/starter-react"
npm install
npm run dev
```

## Lab Outcome

A migration recipe becomes a skill and proves itself by migrating a real starter component.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

If a workflow works, package it once so the whole team can use it.

Practice signals for this exercise:

- Notice repeated prompts and turn them into focused skills.
- Write a SKILL.md with a precise use-when description that can trigger correctly.
- Keep the skill body lean and push long detail into references.
- Include when-to-use, when-not-to-use, and a concrete example.

Common mistake to avoid: A vague description means the agent never loads the skill or loads it at the wrong time.

Mastery signal: The agent invokes the right skill on its own and teammates get consistent workflow output across machines.

## Hands-On Scope

- Package the migration workflow as a focused skill with references for edge cases.
- Apply the skill to convert a legacy component to typed React with tests.
- Add an eval case for when the skill should not run.
- Record the gaps discovered during real use and refine the skill.

## Required Working Deliverables

- Migration skill folder.
- A completed component migration in `starter-react`.
- Tests proving migrated behavior.
- Before/after skill eval notes.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- List exact commands run and whether they passed or failed.
- Include test, typecheck, build, smoke, trace, or script output appropriate to the exercise.
- Show before/after behavior for any bug fix, refactor, NFR improvement, or policy change.
- Call out residual risk, deferred work, and why those choices are acceptable.

## Leadership Review

Does this lower migration risk across a team, or does it only work for the author?
