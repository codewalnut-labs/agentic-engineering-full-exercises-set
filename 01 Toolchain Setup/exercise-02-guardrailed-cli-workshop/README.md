**Exercise 02**

# Guardrailed CLI Workshop

**Goal:** Build a command-risk simulator for this React starter that allows safe inspection and verification commands while blocking secret reads, path escapes, destructive deletes, and git history rewrites.

**Outcome:** `starter-react` contains an executable guardrail check and policy table that future agents can run before using risky shell commands.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [01. Toolchain Setup practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#01-toolchain-setup)
- [Claude Code hooks](https://docs.anthropic.com/en/docs/claude-code/hooks) for pre-tool safety patterns
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/tool-inventory.md`, `docs/hook-policy.md`, and `starter-react/package.json`, then produce an allow/warn/block table for the actual commands this exercise needs.
2. Review the table and mark specific risky examples: `.env` reads, recursive deletes, writes outside the exercise folder, `git reset --hard`, `git push --force`, network calls, and log collection.
3. Have the agent implement a small guardrail simulator in `starter-react` that classifies a command string and explains allow, warn, or block.
4. Add fixtures for real cases: `npm test`, `npm run agent:check`, `Get-Content src/App.tsx`, reading `.env`, deleting `dist`, deleting the repo root, rewriting git history, and writing outside `starter-react`.
5. Tighten simulator messages so every blocked command includes the reason and a safer alternative command.
6. Add a package script such as `npm run guard:check` that runs the simulator test cases.
7. Run a clean-context handoff where a new agent reads only the policy and predicts the simulator result before running it.

## Deliver

- Executable guardrail simulator and package script in `starter-react`.
- Updated hook policy with allowed commands, warning commands, blocked commands, and safer alternatives.
- Fixtures or tests covering safe checks, secret reads, deletes, path escapes, git history rewrites, and warning-only cases.
- Evidence note with simulator output, reviewed policy decisions, and remaining command classes not covered.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- `npm run guard:check` or the equivalent simulator command passes.
- Safe read and test commands are allowed without friction.
- Secret reads, destructive deletes, path escapes, and git history rewrites are blocked with clear reasons and safer alternatives.
- The simulator includes allow, warn, and block cases.
- A fresh agent can explain the safety boundary from the checked-in policy alone.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
