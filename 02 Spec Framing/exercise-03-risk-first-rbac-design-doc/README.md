**Exercise 03**

# Risk-First RBAC Design Doc

**Goal:** Create a design doc for role-based access without overbuilding permissions or leaving privacy risks implicit.

**Outcome:** RBAC is framed as risk control and implemented as enforceable behavior, not a diagram-only permission idea.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "02 Spec Framing/exercise-03-risk-first-rbac-design-doc/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/decision-table.md](./docs/decision-table.md)
- [docs/rbac-brief.md](./docs/rbac-brief.md)

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Have the agent interview the RBAC request first: product questions, assumptions, non-goals, and missing examples.
4. Derive PR-sized slices, roles, resources, risky actions, and concrete acceptance criteria from the policy fixtures.
5. Implement route/action guards in the React starter and mock API enforcement for the selected slice.
6. Add tests for allowed, denied, audit-required, privacy-sensitive, and edge-case flows, then keep the spec session-readable.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Permission matrix encoded in code or config.
- UI/API guard behavior with tests.
- Audit event behavior for denied or privileged actions.
- A concise design note explaining risk decisions.

## Verify

Run at least:

```bash
cd "02 Spec Framing/exercise-03-risk-first-rbac-design-doc/starter-react" && npm test
cd "02 Spec Framing/exercise-03-risk-first-rbac-design-doc/starter-react" && npm run agent:check
```

Done when:
- product-question log
- acceptance criteria tests
- permission matrix tests
- non-goal boundary check
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
