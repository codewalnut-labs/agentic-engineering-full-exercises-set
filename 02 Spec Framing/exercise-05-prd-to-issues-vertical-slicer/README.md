**Exercise 05**

# PRD to Issues Vertical Slicer

## Competency

02. Spec Framing - Requirements decomposition and testable spec creation

## Popular Agent Skill Pattern

to-prd and to-issues

## Your Mission

Turn a messy growth experiment conversation into a PRD and independently grabbable vertical slice issues.

## Starter Project

```text
02 Spec Framing/exercise-05-prd-to-issues-vertical-slicer/starter-react
```

Run the React starter:

```bash
cd "02 Spec Framing/exercise-05-prd-to-issues-vertical-slicer/starter-react"
npm install
npm run dev
```

## Lab Outcome

A broad experiment idea becomes a PRD, dependency graph, and issue set that multiple agents can implement without stepping on each other.

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

- Extract product intent from the conversation before writing issues.
- Inspect the starter to verify what modules already exist.
- Create vertical slices that reveal integration risk early.
- Implement one agent-ready issue and leave the rest ready for delegation.

## Required Working Deliverables

- PRD draft tied to concrete examples.
- Issue board with dependency and ownership notes.
- Working React slice for one upgrade prompt path.
- Evidence that the implemented slice passes local gates.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- PRD includes problem, users, success metric, constraints, non-goals, and examples.
- Issues are vertical slices with acceptance criteria and explicit dependencies.
- At least one issue ships a thin behavior across UI, state, analytics, and test evidence.
- The board marks human-review and agent-ready tasks separately.

## Leadership Review

Would this skill pattern make a real experienced team safer, faster, or clearer after the first implementation?
