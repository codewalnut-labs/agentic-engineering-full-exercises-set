**Exercise 02**

# Release Notes Skill Factory

## Competency

05. Skill Packaging - Workflow packaging into reusable skills

## Your Mission

Turn a messy release-note prompt into a reusable skill that reads changes, groups them, and flags missing evidence.

## Starter Project

```text
05 Skill Packaging/exercise-02-release-notes-skill-factory/starter-react
```

Run the React starter:

```bash
cd "05 Skill Packaging/exercise-02-release-notes-skill-factory/starter-react"
npm install
npm run dev
```

## Lab Outcome

Release-note generation becomes a repeatable workflow backed by parsing, grouping, and evidence checks.

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

- Create a release-notes skill that reads commit/change fixtures and groups work by customer impact.
- Build or wire a parser script so deterministic extraction is not spent on expensive model turns.
- Add snapshot or fixture tests for grouping, missing evidence, and breaking-change detection.
- Run the skill on the provided release data and refine it from failures.

## Required Working Deliverables

- Release-notes skill and reference files.
- Parser or helper script with tests.
- Generated release notes from the fixture set.
- Eval evidence showing improvements after refinement.

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

Does the workflow turn a experienced engineer's release judgment into a team default?
