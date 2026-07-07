**Exercise 01**

# Ambiguous Bulk Refund Spec

**Goal:** Convert a vague product request for bulk refunds into a testable spec before touching the React implementation.

**Outcome:** A vague refund request becomes a shippable vertical slice with acceptance tests, not a prettier requirements document.

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

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- [Gherkin reference](https://cucumber.io/docs/gherkin/reference/) for example-based acceptance criteria
- [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to interrogate `docs/ambiguous-ticket.md` and `docs/scenario-fixtures.md` for missing refund rules, actor permissions, limits, failure states, and audit needs.
2. Turn the agent questions into a short spec decision table: eligible, needs approval, rejected, partial success, and system failure.
3. Have the agent convert the decision table into acceptance examples before touching the React code.
4. Implement the smallest UI and domain change that makes the scenario fixtures executable or manually checkable.
5. Ask the agent to add tests or scripted checks for eligibility boundaries, approval boundaries, and failure messaging.
6. Review the final spec and remove any invented product rule that was not supported by the ticket, fixtures, or your explicit decision.

## Deliver

- Refund spec or decision table grounded in the ambiguous ticket and fixtures.
- React behavior for eligible, approval-needed, rejected, partial, and failed bulk refunds.
- Acceptance checks proving the important scenarios.
- Evidence note listing product questions resolved, assumptions kept, and assumptions rejected.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Every implemented rule maps to a ticket phrase, fixture, or explicit decision.
- Refund boundaries are covered, including empty selection, over-limit refund, permission failure, and mixed outcomes.
- Failure states are visible to the user and do not imply a refund succeeded when it did not.
- A fresh agent can read the spec and know what not to build.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
