**Exercise 02**

# Subagent NFR Swarm

**Goal:** Use specialist subagents for security, accessibility, performance, and testability review while one main thread owns the decision log.

**Outcome:** Specialist review agents produce actionable NFR findings and the main thread implements the right fixes.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "06 Multi-Agent Workflows/exercise-02-subagent-nfr-swarm/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/nfr-risk-seeds.md](./docs/nfr-risk-seeds.md)
- [docs/specialist-prompts.md](./docs/specialist-prompts.md)

## Use These Practices

- [06. Multi-Agent Workflows practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#06-multi-agent-workflows)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Run separate security, accessibility, performance, and testability review passes.
4. Triage findings into fix, defer, or dismiss with evidence.
5. Implement the top fixes in the starter.
6. Re-run checks after changes and record residual risk.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Specialist review summaries.
- Implemented NFR fixes.
- Tests or checks for the fixed risks.
- Main-thread decision log.

## Verify

Run at least:

```bash
cd "06 Multi-Agent Workflows/exercise-02-subagent-nfr-swarm/starter-react" && npm test
cd "06 Multi-Agent Workflows/exercise-02-subagent-nfr-swarm/starter-react" && npm run agent:check
```

Done when:
- specialist report schema
- fix/defer/dismiss table
- implemented top fixes
- post-fix recheck
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
