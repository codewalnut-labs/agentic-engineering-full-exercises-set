**Exercise 03**

# Risk-First RBAC Design Doc

**Goal:** Design and implement the first RBAC slice for the starter UI: viewer, manager, and admin access to sensitive actions and data.

**Outcome:** The permission matrix becomes working UI/domain behavior with denied paths, hidden or disabled controls, and explicit risk decisions.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/decision-table.md](./docs/decision-table.md)
- [docs/rbac-brief.md](./docs/rbac-brief.md)

From the repository root, open the main starter:

```bash
cd "02 Spec Framing/exercise-03-risk-first-rbac-design-doc/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [NIST access control overview](https://csrc.nist.gov/projects/role-based-access-control)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/rbac-brief.md`, `docs/decision-table.md`, and the starter UI, then identify the protected resources, actions, actors, and sensitive data shown on screen.
2. Review the list and choose the first RBAC slice: viewer, manager, admin, allowed actions, denied actions, and audit expectations.
3. Have the agent write a compact design note with a permission matrix, non-goals, denied-state copy, and the risk each rule prevents.
4. Implement the smallest UI/domain enforcement needed to prove the matrix for allowed and denied cases.
5. Add tests or fixtures for escalation attempts, missing role data, hidden or disabled controls, and server-trust assumptions.
6. Run a clean-context review where a new agent attacks the design for over-broad access and ambiguous ownership.
7. Fix any rule or behavior that the review proves is unclear or too broad.

## Deliver

- RBAC design note with viewer, manager, and admin matrix plus explicit non-goals.
- Starter behavior enforcing the chosen allow and deny paths.
- Tests or manual evidence for role changes, escalation attempts, missing role data, and hidden or disabled actions.
- Evidence note explaining accepted risk, deferred risk, final checks, and why the design is not overbuilt.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Every role rule is tied to a resource, action, risk, and enforcement point.
- Denied paths are tested as first-class behavior, not inferred only from hidden buttons.
- The design separates UI affordances from actual authorization decisions.
- A fresh agent can use the matrix to add one more permission without inventing a new model.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
