**Exercise 04**

# Grill-Me Decision Tree Spec

**Goal:** Use a grill-me style interview to turn a vague entitlement redesign into a testable implementation contract before coding.

**Outcome:** A high-risk entitlement change is understood through a decision tree, examples, non-goals, and mergeable slices before implementation begins.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "02 Spec Framing/exercise-04-grill-me-decision-tree-spec/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/decision-tree-seeds.md](./docs/decision-tree-seeds.md)
- [docs/vague-request.md](./docs/vague-request.md)

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `grill-me / grill-with-docs`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Run a one-question-at-a-time interview before asking for an implementation plan.
4. Answer code-discoverable questions by inspecting the starter instead of asking the user.
5. Convert answers into a decision table and PR-sized slices.
6. Implement one vertical slice and link each test to a question it resolves.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Updated entitlement decision table and question log.
- Working React behavior for selected entitlement states.
- Tests or script checks for at least five concrete examples.
- Evidence note showing which questions became code and which stayed deferred.

## Verify

Run at least:

```bash
cd "02 Spec Framing/exercise-04-grill-me-decision-tree-spec/starter-react" && npm test
cd "02 Spec Framing/exercise-04-grill-me-decision-tree-spec/starter-react" && npm run agent:check
```

Done when:
- Question log covers decision branches, dependencies, defaults, non-goals, and open risks.
- Spec examples cover eligible, blocked, expired, downgrade, and override conflict paths.
- React contract panel reflects the frozen decisions and rejects unknown entitlement states.
- Tests or script checks prove the implementation uses the decision table rather than free text.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
