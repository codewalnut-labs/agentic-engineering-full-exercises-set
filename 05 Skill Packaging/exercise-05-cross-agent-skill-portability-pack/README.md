**Exercise 05**

# Cross-Agent Skill Portability Pack

**Goal:** Package a compliance review workflow so it works cleanly across Codex, Claude Code, Cursor, Gemini CLI, and other skill-aware agents.

**Outcome:** A reusable team skill has precise metadata, portable paths, scoped tool assumptions, references, and install notes that do not depend on one machine.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "05 Skill Packaging/exercise-05-cross-agent-skill-portability-pack/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/bad-skill.md](./docs/bad-skill.md)
- [docs/portability-matrix.md](./docs/portability-matrix.md)

## Use These Practices

- [05. Skill Packaging practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#05-skill-packaging)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `cross-agent skill standardization`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Audit the flawed skill for portability and trigger issues.
4. Refactor instructions into top-level steps plus references.
5. Add install target matrix and scoped tool notes.
6. Run the local validator and record unresolved portability risks.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Portable SKILL.md and references.
- Cross-agent install matrix.
- Validator results for hard-coded paths and broad tool assumptions.
- Example prompt showing correct and incorrect trigger behavior.

## Verify

Run at least:

```bash
cd "05 Skill Packaging/exercise-05-cross-agent-skill-portability-pack/starter-react" && npm test
cd "05 Skill Packaging/exercise-05-cross-agent-skill-portability-pack/starter-react" && npm run agent:check
```

Done when:
- Skill uses portable relative paths and documented project roots.
- Metadata explains use and non-use cases in trigger-friendly language.
- References are split from the top-level instructions.
- Install notes cover at least Codex, Claude Code, Cursor, and Gemini-style skill paths.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
