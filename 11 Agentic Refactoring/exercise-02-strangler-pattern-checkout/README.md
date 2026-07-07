**Exercise 02**

# Strangler Pattern Checkout

## Competency

11. Agentic Refactoring - Test-driven tech-debt cleanup

## Your Mission

Replace one path of a tangled checkout workflow with a new module while preserving external behavior.

## Starter Project

```text
11 Agentic Refactoring/exercise-02-strangler-pattern-checkout/starter-react
```

Run the React starter:

```bash
cd "11 Agentic Refactoring/exercise-02-strangler-pattern-checkout/starter-react"
npm install
npm run dev
```

## Lab Outcome

One branch of a tangled checkout workflow is replaced safely behind an adapter or flag.

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

- Characterize the existing checkout path with tests and sample outputs.
- Build the new module behind an adapter, flag, or routing seam.
- Compare old and new outputs for preserved cases.
- Roll out only one branch of behavior, leaving the rest untouched.

## Required Working Deliverables

- New checkout module and adapter/flag wiring.
- Comparison tests for old vs new behavior.
- Updated app behavior for the selected branch.
- Rollback and residual-risk evidence.

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

Is this small enough to merge, observe, and continue without a risky rewrite?
