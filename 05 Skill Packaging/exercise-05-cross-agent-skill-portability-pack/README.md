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
- [Codex skills guide](https://developers.openai.com/codex/skills)
- [Claude Skills overview](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to audit `docs/bad-skill.md` and `docs/portability-matrix.md` for path assumptions, tool assumptions, missing triggers, and agent-specific language.
2. Review the audit and decide which behavior belongs in the portable skill versus adapter notes for Codex, Claude Code, Cursor, or other agents.
3. Have the agent rewrite the compliance review skill with relative paths, explicit inputs, fallback behavior, and minimal tool assumptions.
4. Create installation or usage notes for each agent surface in the matrix without promising unsupported features.
5. Ask the agent to run portability checks against sample prompts for each supported surface and record incompatibilities.
6. Do a clean-context test where the skill is read as plain Markdown and still produces the expected compliance review output.

## Deliver

- Portable compliance review skill with scoped assumptions and relative references.
- Portability matrix updated with supported surfaces, limitations, and fallback notes.
- Sample outputs or smoke checks for at least two agent surfaces.
- Evidence note explaining which original bad-skill patterns were removed.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The skill does not depend on a local machine path, hidden tool, or one agent vendor feature for core behavior.
- Agent-specific notes are separated from the main reusable workflow.
- Trigger and non-trigger cases are clear across the portability matrix.
- A fresh agent can use the skill from repository files alone.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
