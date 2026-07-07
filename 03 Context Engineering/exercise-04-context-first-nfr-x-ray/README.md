**Exercise 04**

# Context-First NFR X-Ray

**Goal:** Build the context layer a fresh agent needs before it audits the production workflow portal, then use that audit to fix the highest-value findings.

**Outcome:** The NFR review produces prioritized fixes and verification, not a report that stops before engineering work begins.

## Start Here

Starter folders:
- [starter-react](./starter-react)

From the repository root, open the main starter:

```bash
cd "03 Context Engineering/exercise-04-context-first-nfr-x-ray/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to map the portal flows, trust boundaries, data entry points, keyboard paths, and performance hotspots before it reports findings.
2. Review the map and require file references for every security, accessibility, performance, or reliability claim.
3. Have the agent create a short NFR context pack that future audit agents can reuse, including scope, exclusions, and evidence locations.
4. Ask the agent to run the NFR audit from that context pack and rank findings by user harm, exploitability, and fix cost.
5. Choose the top one or two findings and have the agent implement fixes with tests or manual evidence.
6. Run a clean-context audit rerun to confirm the fixed findings no longer appear and that deferred risks are still visible.

## Deliver

- NFR context pack with flow map, boundaries, and evidence locations.
- Ranked security, accessibility, performance, and reliability findings.
- Implemented fixes for the highest-value accepted findings.
- Evidence note showing before and after risk state plus deferred items.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- NFR findings are grounded in mapped flows and files, not broad best-practice guesses.
- At least one accepted finding is fixed and rechecked.
- Accessibility checks include keyboard and screen-reader relevant behavior where the UI changes.
- A fresh agent can rerun the audit using the context pack without needing the original conversation.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
