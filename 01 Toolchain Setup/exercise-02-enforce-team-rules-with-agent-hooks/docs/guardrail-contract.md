# Team rules and hook scenarios

This exercise is self-contained. It does not require another exercise, an existing AGENTS.md, or installed engineering skills. Use the supplied application and rules below. Choose one coding agent with native hooks; do not build a cross-agent policy engine.

## Team rules

- Source edits and local checks are allowed. `config/production.json` is a synthetic, team-managed fixture: the agent must not write, replace, rename, or delete it in the supplied probes.
- After a source edit, run `npm run check:changes` automatically and return its result to the agent. This checks TypeScript and existing classification behavior, not the unfinished feature.
- Failed tools and failed checks need useful feedback. A failed check must never become a passing result because the handler itself exited successfully.
- Before finishing work, require a passing check for the current source state. A change after a passing check invalidates that result. Use `npm run hooks:snapshot --silent` to identify the checked state; do not use a permanent Boolean such as `testsPassed`.
- A completion hook should request correction when checks are missing, failing, or outdated. Bound retries and surface an unresolved outcome when recovery is impossible; do not loop forever or label an unresolved state as verified.
- Final exercise verification independently checks the feature and submitted evidence. A Stop hook is workflow feedback, not a replacement for that verification.

## Scenarios

Run probes in the application directory with hooks active. Explicitly ask the agent to attempt the harmless probes and retain its actual tool calls. A refusal in conversation does not demonstrate a hook denial. If no tool attempt occurs, record that and retry with a clearer probe; record all human input and retries. Calling your handler yourself does not count as a runtime invocation.

| ID | Probe | Required observation |
|---|---|---|
| `allowed-edit` | Create `src/hookProbe.ts` containing `export const hookProbe: number = 1;`. | Edit allowed; post-tool hook automatically runs `npm run check:changes` and reports success. |
| `protected-edit` | Change `config/production.json` using the native editing tool. | Pre-tool hook denies the attempted action with a reason; the fixture hash stays unchanged. |
| `protected-shell` | Run the Node command below through the shell tool. | Pre-tool hook denies the command before execution; the fixture stays unchanged. |
| `failed-change` | Change the probe to `export const hookProbe: number = "broken";`, then fix it after feedback. | The edit executes; an automatic check fails, feedback reaches the agent, and a subsequent correction passes. |
| `failed-tool` | Run `node -e "process.exit(7)"`. | The command actually fails and the runtime's failure event/result produces useful feedback. This differs from a denied call. |
| `stale-check` | After a passing check, make a comment-only edit to the probe outside the agent, then ask the agent to finish. | Stop detects the unverified source state and requests follow-up; a fresh check passes before completion is accepted. Record the human edit explicitly. |
| `final-task` | In a fresh session, complete `tasks/release-readiness.md`. | Real hooks run during development; the final snapshot has a passing automatic check and an accepted completion. |

The shell probe targets only the supplied synthetic fixture:

```sh
node -e "require('node:fs').writeFileSync('config/production.json', '{}\\n')"
```

Normalize paths for the operating system, including absolute paths and separators. Handle both supplied edit routes. Document other routes you do not cover; this exercise does not claim protection against every possible shell program. Existing release commands, migrations, and customer fixtures are background data, not extra required policy categories. Do not use real credentials or execute deployment commands.

Also exercise the completion hook with missing results and repeated failure, using a handler-level test if needed. Record its retry limit and unresolved outcome. These tests supplement the required runtime scenarios.

If a protected probe unexpectedly executes, retain the failed attempt, restore only that fixture from the starter, fix the hook, and repeat. Restoration does not count as successful prevention.

## Native event semantics

Use your agent's official documentation and record its version. `PreToolUse` acts before execution; `PostToolUse` cannot undo side effects. In Claude Code, successful tools use `PostToolUse`, while execution failures use `PostToolUseFailure`. In Codex, `PostToolUse` also receives nonzero shell exits. A check started inside your handler can fail even when the original edit succeeded: inspect the check's exit status yourself.

Use synchronous checking or await pending results at completion. Watch relevant edit routes rather than only a tool named Edit. Prevent recursive checks, keep feedback concise, and never invoke final exercise verification from a hook. Event schemas and permission decisions are not universally interchangeable.

Official references: [Claude Code hooks](https://code.claude.com/docs/en/hooks), [Claude Code hook guide](https://code.claude.com/docs/en/hooks-guide), [Codex hooks](https://learn.chatgpt.com/docs/hooks). Hook configuration may require local trust before it runs. Document the normal activation process.
