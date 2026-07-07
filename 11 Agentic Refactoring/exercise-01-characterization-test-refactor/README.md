**Exercise 01**

# Characterization Test Refactor

## Competency

11. Agentic Refactoring - Test-driven tech-debt cleanup

## Your Mission

Capture existing behavior around a messy rules module before refactoring it into clearer pieces.

## Starter Project

```text
11 Agentic Refactoring/exercise-01-characterization-test-refactor/starter-react
```

Run the React starter:

```bash
cd "11 Agentic Refactoring/exercise-01-characterization-test-refactor/starter-react"
npm install
npm run dev
```

## Lab Outcome

Legacy behavior is characterized before structure changes, then refactored in small green steps.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Before the agent cleans up old code, make it prove behavior stays the same.

Practice signals for this exercise:

- Generate a behavior spec from current code before changing structure.
- Add characterization tests and get a green baseline first.
- Mark behavior as must-preserve, intentionally-changing, or actually-a-bug.
- Refactor in small chunks while isolating I/O, validation, side effects, and conditionals.

Common mistake to avoid: A clean-looking rewrite that changes behavior is still a bug.

Mastery signal: A green baseline exists before refactoring, every chunk stays green, and behavior is identical where it must be.

## Hands-On Scope

- Generate a behavior spec from the current code and mark preserve/change/bug categories.
- Add characterization tests that pass against the current behavior.
- Refactor the messy module without changing preserved behavior.
- Keep the suite green after each logical step.

## Required Working Deliverables

- Characterization tests.
- Refactored production code.
- Behavior category notes tied to tests.
- Before/after verification evidence.

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

Did the agent make the code better without smuggling in behavior changes?
