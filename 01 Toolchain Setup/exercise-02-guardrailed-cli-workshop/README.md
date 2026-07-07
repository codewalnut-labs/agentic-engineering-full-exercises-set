**Exercise 02**

# Guardrailed CLI Workshop

**Goal:** Design the safety rails for an agent that can inspect code, run checks, and collect logs without touching secrets or destructive commands.

**Outcome:** The agent has useful autonomy, but dangerous paths and tools are blocked by executable guardrails rather than tribal warnings.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/hook-policy.md](./docs/hook-policy.md)
- [docs/tool-inventory.md](./docs/tool-inventory.md)

From the repository root, open the main starter:

```bash
cd "01 Toolchain Setup/exercise-02-guardrailed-cli-workshop/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [01. Toolchain Setup practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#01-toolchain-setup)
- [Claude Code hooks](https://docs.anthropic.com/en/docs/claude-code/hooks) for pre-tool safety patterns
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/tool-inventory.md`, `docs/hook-policy.md`, and the starter scripts, then list exactly which commands should be allowed, warned, or blocked.
2. Review the inventory yourself and mark any command that can read secrets, mutate git history, delete files, contact external systems, or write outside the exercise folder.
3. Have the agent implement a small guardrail policy and hook simulation that classifies commands by risk before execution.
4. Feed the simulator realistic cases: package install, tests, log reads, secret-file reads, recursive deletes, git history rewrites, and writes outside the starter.
5. Ask the agent to tighten unclear messages so a blocked user knows what safer command to run instead.
6. Try one clean-context handoff where the new agent is only given the hook policy and must predict allowed and denied commands before running the simulator.

## Deliver

- Executable guardrail policy or simulator in the starter.
- Updated hook policy showing allowed commands, denied commands, and safer alternatives.
- Test cases or fixtures for allowed commands, denied commands, and warning-only cases.
- Short evidence note with the cases tried, simulator result, and remaining unsafe command classes.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Safe read and test commands are allowed without friction.
- Secret reads, destructive deletes, path escapes, and git history rewrites are blocked with clear reasons.
- The simulator has both positive and negative cases, not only a denylist snapshot.
- A fresh agent can explain the safety boundary from the checked-in policy alone.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
