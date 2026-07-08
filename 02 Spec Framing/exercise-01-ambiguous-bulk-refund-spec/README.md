**Exercise 01**

# Ambiguous Bulk Refund Spec

**Goal:** Define and implement a bulk-refund workflow for the React starter that handles eligible refunds, approval-required refunds, rejected refunds, partial success, and system failure.

**Outcome:** The ambiguous ticket becomes a working refund slice with a decision table, UI behavior, and acceptance checks tied to the provided scenarios.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/ambiguous-ticket.md](./docs/ambiguous-ticket.md)
- [docs/scenario-fixtures.md](./docs/scenario-fixtures.md)

From the repository root, open the main starter:

```bash
cd "02 Spec Framing/exercise-01-ambiguous-bulk-refund-spec/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- [Gherkin reference](https://cucumber.io/docs/gherkin/reference/) for example-based acceptance criteria
- [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/ambiguous-ticket.md`, `docs/scenario-fixtures.md`, and the existing refund UI, then list the exact missing rules for selection, amount limits, permissions, approval, partial success, and failure messaging.
2. Review the questions and decide the minimum rules needed for a first shippable bulk-refund slice.
3. Have the agent write a decision table with these outcomes: eligible refund, approval required, rejected request, partial success, and system failure.
4. Convert the table into acceptance examples before changing code.
5. Implement the smallest React/domain change that makes those examples visible or executable in the starter.
6. Add tests or scripted checks for empty selection, over-limit refund, permission failure, mixed outcomes, and failure messaging.
7. Review the final spec and remove any product rule not supported by the ticket, fixtures, or your explicit decision.

## Deliver

- Bulk-refund decision table grounded in the ticket and fixtures.
- React behavior for eligible, approval-needed, rejected, partial, and failed refund paths.
- Acceptance examples and checks for the highest-risk refund boundaries.
- Evidence note listing resolved questions, rejected assumptions, final command output, and remaining product unknowns.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Every implemented refund rule maps to a ticket phrase, fixture, or explicit decision.
- Empty selection, over-limit refund, permission failure, mixed outcomes, and backend failure are covered.
- Failure states are visible and never imply that a refund succeeded when it did not.
- A fresh agent can read the spec and name the allowed, approval, rejected, partial, and failed paths.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
