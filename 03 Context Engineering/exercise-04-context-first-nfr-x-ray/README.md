**Exercise 04**

# Context-First NFR X-Ray

**Goal:** Map the production workflow portal first, then fix the highest-value security, accessibility, performance, or reliability issue found in that mapped flow.

**Outcome:** The exercise produces a reusable NFR context pack, a ranked audit, at least one implemented fix, and before/after evidence.

## Start Here

Starter folders:
- [starter-react](./starter-react)

From the repository root, open the main starter:

```bash
cd "03 Context Engineering/exercise-04-context-first-nfr-x-ray/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to map the portal flow in `starter-react`: entry points, trust boundaries, data entry fields, keyboard paths, state transitions, and performance hotspots.
2. Review the map and require file references for every security, accessibility, performance, or reliability claim.
3. Have the agent create a short NFR context pack with scope, exclusions, evidence locations, and audit commands.
4. Ask the agent to run the audit from that pack and rank findings by user harm, exploitability, likelihood, and fix cost.
5. Choose the top one or two findings and have the agent implement fixes in the starter with tests or manual evidence.
6. Re-run the audit or targeted checks to prove the accepted findings no longer appear.
7. Run a clean-context audit rerun where a new agent uses the context pack and still sees deferred risks.

## Deliver

- NFR context pack with flow map, boundaries, audit commands, and evidence locations.
- Ranked security, accessibility, performance, and reliability findings.
- Implemented fix for the highest-value accepted finding, plus test or manual evidence.
- Evidence note showing before/after risk state, final command output, and deferred items.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- NFR findings are grounded in mapped flows and files, not broad best-practice guesses.
- At least one accepted finding is fixed and rechecked.
- Accessibility checks include keyboard and screen-reader relevant behavior where the UI changes.
- A fresh agent can rerun the audit using the context pack without needing the original conversation.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
