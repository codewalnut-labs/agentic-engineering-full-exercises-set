**Exercise 04**

# Grill-Me Decision Tree Spec

**Goal:** Use a grill-me style interview to turn a vague entitlement redesign into a testable implementation contract before coding.

**Outcome:** A high-risk entitlement change is understood through a decision tree, examples, non-goals, and mergeable slices before implementation begins.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/decision-tree-seeds.md](./docs/decision-tree-seeds.md)
- [docs/vague-request.md](./docs/vague-request.md)

From the repository root, open the main starter:

```bash
cd "02 Spec Framing/exercise-04-grill-me-decision-tree-spec/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `grill-me / grill-with-docs`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: skill pattern, trigger conditions, source files, expected artifact, checks, and likely failure modes.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- Updated entitlement decision table and question log.
- Working React behavior for selected entitlement states.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Question log covers decision branches, dependencies, defaults, non-goals, and open risks.
- Spec examples cover eligible, blocked, expired, downgrade, and override conflict paths.
- React contract panel reflects the frozen decisions and rejects unknown entitlement states.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
