**Exercise 05**

# Cross-Agent Skill Portability Pack

**Goal:** Package a compliance review workflow so it works cleanly across Codex, Claude Code, Cursor, Gemini CLI, and other skill-aware agents.

**Outcome:** A reusable team skill has precise metadata, portable paths, scoped tool assumptions, references, and install notes that do not depend on one machine.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/bad-skill.md](./docs/bad-skill.md)
- [docs/portability-matrix.md](./docs/portability-matrix.md)

From the repository root, open the main starter:

```bash
cd "05 Skill Packaging/exercise-05-cross-agent-skill-portability-pack/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [05. Skill Packaging practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#05-skill-packaging)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `cross-agent skill standardization`
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

- Portable SKILL.md and references.
- Cross-agent install matrix.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Skill uses portable relative paths and documented project roots.
- Metadata explains use and non-use cases in trigger-friendly language.
- References are split from the top-level instructions.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
