**Exercise 04**

# TDD Skill Red-Green Refactor

## Competency

04. Test Automation - Reliable E2E test generation

## Popular Agent Skill Pattern

tdd

## Your Mission

Use a TDD-style skill loop to implement invoice retry rules without letting the agent jump straight to a broad rewrite.

## Starter Project

```text
04 Test Automation/exercise-04-tdd-skill-red-green-refactor/starter-react
```

Run the React starter:

```bash
cd "04 Test Automation/exercise-04-tdd-skill-red-green-refactor/starter-react"
npm install
npm run dev
```

## Lab Outcome

Payment retry behavior is specified test-first, implemented one rule at a time, and refactored only after the suite proves behavior.

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

- Confirm the behavior contract and interfaces to test.
- Write one failing test for the smallest rule.
- Implement only enough code to pass.
- Refactor after the test suite protects behavior.

## Required Working Deliverables

- Tests for retry scheduling and copy decisions.
- Working React retry state behavior.
- Refactor notes explaining protected behavior.
- Evidence log showing red, green, and refactor commands.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- Tests are written before each behavior change.
- Each red-green-refactor step is recorded with command evidence.
- Mocks are deterministic and cover network failure, expired card, recovery, and enterprise copy.
- Refactoring happens after behavior is green, not as a speculative rewrite.

## Review Bar

Would this skill pattern make a real experienced team safer, faster, or clearer after the first implementation?
