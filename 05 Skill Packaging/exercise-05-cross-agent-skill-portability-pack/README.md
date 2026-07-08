**Exercise 05**

# Cross-Agent Skill Portability Pack

**Goal:** Rewrite the flawed compliance-review skill so it can be used from Codex, Claude Code, Cursor, Gemini CLI, or plain Markdown without machine-specific assumptions.

**Outcome:** The portable skill has relative references, scoped tool assumptions, agent-specific adapter notes, and smoke outputs for at least two agent surfaces.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [05. Skill Packaging practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#05-skill-packaging)
- [Codex skills guide](https://developers.openai.com/codex/skills)
- [Claude Skills overview](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to audit `docs/bad-skill.md` and `docs/portability-matrix.md` for absolute paths, hidden tools, missing triggers, vendor-specific language, and unsupported install claims.
2. Review the audit and decide which behavior belongs in the portable skill versus adapter notes for Codex, Claude Code, Cursor, Gemini CLI, or plain Markdown.
3. Rewrite the compliance-review skill with relative paths, explicit inputs, fallback behavior, output contract, and minimal tool assumptions.
4. Create installation or usage notes for each supported agent surface without promising unsupported features.
5. Run portability checks against sample prompts for at least two supported surfaces and the plain-Markdown fallback.
6. Record incompatibilities and update the matrix with limitations and fallback notes.
7. Do a clean-context test where the skill is read as plain Markdown and still produces the expected compliance review output.

## Deliver

- Portable compliance-review skill with scoped assumptions, relative references, and output contract.
- Portability matrix updated with supported surfaces, limitations, install/use notes, and fallback notes.
- Sample outputs or smoke checks for at least two agent surfaces plus plain Markdown.
- Evidence note explaining removed bad-skill patterns, final checks, and remaining incompatibilities.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The skill does not depend on a local machine path, hidden tool, or one vendor feature for core behavior.
- Agent-specific notes are separated from the main reusable workflow.
- Trigger and non-trigger cases are clear across the portability matrix.
- A fresh agent can use the skill from repository files alone.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
