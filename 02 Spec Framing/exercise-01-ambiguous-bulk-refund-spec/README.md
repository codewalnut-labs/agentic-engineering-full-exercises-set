**Exercise 01**

# Ambiguous Bulk Refund Spec

## Competency

02. Spec Framing - Requirements decomposition and testable spec creation

## Your Mission

Convert a vague product request for bulk refunds into a testable spec before touching the React implementation.

## Starter Project

```text
02 Spec Framing/exercise-01-ambiguous-bulk-refund-spec/starter-react
```

Run the React starter:

```bash
cd "02 Spec Framing/exercise-01-ambiguous-bulk-refund-spec/starter-react"
npm install
npm run dev
```

## Senior Lab Outcome

A vague refund request becomes a shippable vertical slice with acceptance tests, not a prettier requirements document.

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

- Use the ambiguous ticket and fixtures to ask product questions, then freeze assumptions in a small implementation contract.
- Implement the bulk refund UI behavior for eligible, partially eligible, and blocked orders.
- Add validation and failure-state tests from concrete Given/When/Then examples.
- Keep non-goals out of the diff and prove the slice is independently reviewable.

## Required Working Deliverables

- Working React behavior for the selected refund slice.
- Unit/component tests covering eligibility, limits, auth, and failure states.
- A short spec file linked to the tests, not replacing them.
- Command evidence showing the slice passes build and tests.

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

Is the work sliced tightly enough that a staff engineer could delegate implementation while still owning the outcome?
