**Exercise 02**

# Subagent NFR Swarm

**Goal:** Use specialist subagents for security, accessibility, performance, and testability review while one main thread owns the decision log.

**Outcome:** Specialist review agents produce actionable NFR findings and the main thread implements the right fixes.

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

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [06. Multi-Agent Workflows practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#06-multi-agent-workflows)
- [Claude Code subagents](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your main agent to read `docs/nfr-risk-seeds.md` and `docs/specialist-prompts.md`, then define separate security, accessibility, performance, and testability briefs.
2. Review the briefs and make sure each specialist has a different question, evidence format, and file scope.
3. Run the specialist reviews in parallel or simulate them with separate prompts, while the main thread keeps the decision log.
4. Normalize findings into one table with severity, evidence, owner decision, fix/defer/dismiss reason, and verification path.
5. Implement the highest-value accepted fixes without letting specialists edit outside their review scope.
6. Ask a clean-context agent to challenge one accepted fix and one dismissed finding for weak evidence.

## Deliver

- Specialist briefs for security, accessibility, performance, and testability.
- Merged NFR finding table with evidence and owner decisions.
- Implemented fixes for the accepted top findings.
- Evidence note showing specialist outputs, triage decisions, and recheck results.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Each specialist report answers a distinct NFR question with file-level evidence.
- The main thread accepts, defers, or dismisses every finding with a reason.
- Accepted fixes are rechecked by the relevant NFR lens.
- A fresh agent can tell which findings are still open and why.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
