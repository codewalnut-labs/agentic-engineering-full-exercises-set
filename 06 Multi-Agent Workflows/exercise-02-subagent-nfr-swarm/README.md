**Exercise 02**

# Subagent NFR Swarm

**Goal:** Run four specialist review agents against the starter, then have the main thread fix the highest-value NFR findings.

**Outcome:** Security, accessibility, performance, and testability findings are triaged into one owner decision log with implemented fixes and recheck evidence.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/nfr-risk-seeds.md](./docs/nfr-risk-seeds.md)
- [docs/specialist-prompts.md](./docs/specialist-prompts.md)

From the repository root, open the main starter:

```bash
cd "06 Multi-Agent Workflows/exercise-02-subagent-nfr-swarm/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [06. Multi-Agent Workflows practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#06-multi-agent-workflows)
- [Claude Code subagents](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your main agent to read `docs/nfr-risk-seeds.md` and `docs/specialist-prompts.md`, then write separate briefs for security, accessibility, performance, and testability.
2. Review the briefs and make sure each specialist has a different question, file scope, evidence format, and no implementation authority.
3. Run the four specialist reviews in parallel or simulate them with separate prompts while the main thread keeps the decision log.
4. Normalize findings into one table with severity, file evidence, owner decision, fix/defer/dismiss reason, and verification path.
5. Implement the highest-value accepted fixes in the starter from the main thread.
6. Recheck accepted fixes through the relevant specialist lens.
7. Ask a clean-context agent to challenge one accepted fix and one dismissed finding for weak evidence.

## Deliver

- Specialist briefs for security, accessibility, performance, and testability.
- Merged NFR finding table with evidence, owner decisions, and verification path.
- Implemented fixes for the accepted top findings.
- Evidence note showing specialist outputs, triage decisions, recheck results, and final command output.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Each specialist report answers a distinct NFR question with file-level evidence.
- The main thread accepts, defers, or dismisses every finding with a reason.
- Accepted fixes are rechecked by the relevant NFR lens.
- A fresh agent can tell which findings are fixed, deferred, dismissed, or still open.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
