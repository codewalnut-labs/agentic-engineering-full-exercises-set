**Exercise 03**

# Risk-First RBAC Design Doc

## Competency

02. Spec Framing - Requirements decomposition and testable spec creation

## Your Mission

Create a design doc for role-based access without overbuilding permissions or leaving privacy risks implicit.

## Starter Project

```text
02 Spec Framing/exercise-03-risk-first-rbac-design-doc/starter-react
```

Run the React starter:

```bash
cd "02 Spec Framing/exercise-03-risk-first-rbac-design-doc/starter-react"
npm install
npm run dev
```

## Senior Lab Outcome

RBAC is framed as risk control and implemented as enforceable behavior, not a diagram-only permission idea.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Do not hand the agent a vague ticket. Hand it a contract it can test.

Practice signals for this exercise:

- Have the agent interview the ticket for gaps, assumptions, and product questions before code planning.
- Decompose work into PR-sized chunks that are independent, testable, and reviewable.
- Write acceptance criteria with expected behavior, boundaries, failure states, and done conditions.
- Include concrete inputs, outputs, UI states, API responses, and error messages.

Common mistake to avoid: A spec the agent cannot test is not useful; vague improvement language invites invention.

Mastery signal: The first diff matches intent, acceptance criteria are clear, and each chunk can merge on its own.

## Hands-On Scope

- Have the agent interview the RBAC request first: product questions, assumptions, non-goals, and missing examples.
- Derive PR-sized slices, roles, resources, risky actions, and concrete acceptance criteria from the policy fixtures.
- Implement route/action guards in the React starter and mock API enforcement for the selected slice.
- Add tests for allowed, denied, audit-required, privacy-sensitive, and edge-case flows, then keep the spec session-readable.

## Required Working Deliverables

- Permission matrix encoded in code or config.
- UI/API guard behavior with tests.
- Audit event behavior for denied or privileged actions.
- A concise design note explaining risk decisions.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one senior owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- List exact commands run and whether they passed or failed.
- Include test, typecheck, build, smoke, trace, or script output appropriate to the exercise.
- Show before/after behavior for any bug fix, refactor, NFR improvement, or policy change.
- Call out residual risk, deferred work, and why those choices are acceptable.

## Leadership Review

Does the exercise force explicit trade-offs between user productivity, privacy, and least privilege?
