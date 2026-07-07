**Exercise 05**

# Cross-Agent Skill Portability Pack

## Competency

05. Skill Packaging - Reusable agent skills and prompts

## Popular Agent Skill Pattern

cross-agent skill standardization

## Your Mission

Package a compliance review workflow so it works cleanly across Codex, Claude Code, Cursor, Gemini CLI, and other skill-aware agents.

## Starter Project

```text
05 Skill Packaging/exercise-05-cross-agent-skill-portability-pack/starter-react
```

Run the React starter:

```bash
cd "05 Skill Packaging/exercise-05-cross-agent-skill-portability-pack/starter-react"
npm install
npm run dev
```

## Lab Outcome

A reusable team skill has precise metadata, portable paths, scoped tool assumptions, references, and install notes that do not depend on one machine.

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

- Audit the flawed skill for portability and trigger issues.
- Refactor instructions into top-level steps plus references.
- Add install target matrix and scoped tool notes.
- Run the local validator and record unresolved portability risks.

## Required Working Deliverables

- Portable SKILL.md and references.
- Cross-agent install matrix.
- Validator results for hard-coded paths and broad tool assumptions.
- Example prompt showing correct and incorrect trigger behavior.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- Skill uses portable relative paths and documented project roots.
- Metadata explains use and non-use cases in trigger-friendly language.
- References are split from the top-level instructions.
- Install notes cover at least Codex, Claude Code, Cursor, and Gemini-style skill paths.

## Leadership Review

Would this skill pattern make a real experienced team safer, faster, or clearer after the first implementation?
