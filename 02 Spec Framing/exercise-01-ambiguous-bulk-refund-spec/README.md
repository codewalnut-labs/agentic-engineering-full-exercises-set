**Exercise 01**

# Ambiguous Bulk Refund Spec

**Goal:** Convert a vague product request for bulk refunds into a testable spec before touching the React implementation.

**Outcome:** A vague refund request becomes a shippable vertical slice with acceptance tests, not a prettier requirements document.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "02 Spec Framing/exercise-01-ambiguous-bulk-refund-spec/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/ambiguous-ticket.md](./docs/ambiguous-ticket.md)
- [docs/scenario-fixtures.md](./docs/scenario-fixtures.md)

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Use the ambiguous ticket and fixtures to ask product questions, then freeze assumptions in a small implementation contract.
4. Implement the bulk refund UI behavior for eligible, partially eligible, and blocked orders.
5. Add validation and failure-state tests from concrete Given/When/Then examples.
6. Keep non-goals out of the diff and prove the slice is independently reviewable.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Working React behavior for the selected refund slice.
- Unit/component tests covering eligibility, limits, auth, and failure states.
- A short spec file linked to the tests, not replacing them.
- Command evidence showing the slice passes build and tests.

## Verify

Run at least:

```bash
cd "02 Spec Framing/exercise-01-ambiguous-bulk-refund-spec/starter-react" && npm test
cd "02 Spec Framing/exercise-01-ambiguous-bulk-refund-spec/starter-react" && npm run agent:check
```

Done when:
- eligibility test
- approval boundary test
- failure-state smoke
- session-readable spec check
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
