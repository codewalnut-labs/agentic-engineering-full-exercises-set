**Exercise 02**

# Guardrailed CLI Workshop

**Goal:** Design the safety rails for an agent that can inspect code, run checks, and collect logs without touching secrets or destructive commands.

**Outcome:** The agent has useful autonomy, but dangerous paths and tools are blocked by executable guardrails rather than tribal warnings.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "01 Toolchain Setup/exercise-02-guardrailed-cli-workshop/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/hook-policy.md](./docs/hook-policy.md)
- [docs/tool-inventory.md](./docs/tool-inventory.md)

## Use These Practices

- [01. Toolchain Setup practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#01-toolchain-setup)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Create a guardrail policy for secrets, destructive git operations, generated artifacts, and external CLIs.
4. Implement a local hook simulator or PreToolUse-style script that blocks `.env`, secret manager paths, force pushes, recursive deletes outside the exercise, and unapproved CLIs.
5. Add tests or table-driven cases for allowed, warned, and blocked commands.
6. Wire the guardrail into `agent:check` so it can run before an agent session.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Executable guardrail script and policy config.
- Automated guardrail test cases.
- Updated starter scripts invoking the guardrail.
- Evidence showing blocked and allowed examples.

## Verify

Run at least:

```bash
cd "01 Toolchain Setup/exercise-02-guardrailed-cli-workshop/starter-react" && npm test
cd "01 Toolchain Setup/exercise-02-guardrailed-cli-workshop/starter-react" && npm run agent:check
```

Done when:
- guardrail unit cases
- denylist simulation
- allowed command smoke
- policy diff review
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
