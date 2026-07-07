**Exercise 03**

# Risk-First RBAC Design Doc

**Goal:** Create a design doc for role-based access without overbuilding permissions or leaving privacy risks implicit.

**Outcome:** RBAC is framed as risk control and implemented as enforceable behavior, not a diagram-only permission idea.

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

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [NIST access control overview](https://csrc.nist.gov/projects/role-based-access-control)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/rbac-brief.md`, `docs/decision-table.md`, and the starter UI, then identify protected resources, actors, actions, and data exposure risks.
2. Review the risk list and force each permission rule to answer what harm it prevents, not only which role gets a checkbox.
3. Have the agent draft a compact design note with roles, non-goals, denied states, audit expectations, and a permission matrix.
4. Implement the smallest UI/domain enforcement needed to prove the matrix works for allowed and denied cases.
5. Ask the agent to add tests or fixtures for escalation attempts, missing role data, hidden controls, and server-trust assumptions.
6. Run a clean-context review where the new agent attacks the design for over-broad access and ambiguous ownership.

## Deliver

- Risk-first RBAC design note with permission matrix and explicit non-goals.
- Starter behavior enforcing the most important allow and deny paths.
- Tests or manual evidence for denied access, role changes, and hidden or disabled actions.
- Evidence note explaining accepted risk, deferred risk, and why the design is not overbuilt.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Every role rule is tied to a resource, action, risk, and enforcement point.
- Denied paths are tested as first-class behavior, not inferred from hidden buttons.
- The design separates UI affordances from actual authorization decisions.
- A fresh agent can use the matrix to implement another permission without inventing a new model.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
