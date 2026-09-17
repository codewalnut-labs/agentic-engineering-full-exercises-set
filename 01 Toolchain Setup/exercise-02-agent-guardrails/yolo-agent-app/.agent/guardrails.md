# Coding Agent Guardrails

## Purpose and precedence

These rules let an agent perform normal application development while protecting secrets, production behavior, migration history, generated artifacts, and release operations.

Apply rules in this order:

1. Never access a denied path or run a denied command.
2. Pause for explicit human approval when a path or command is approval-gated.
3. Treat read-only paths as immutable.
4. Work autonomously only inside the allowlist in `permissions.json`.
5. Deny any action that is not covered by a rule.

Human approval must name the exact path and operation or command. It applies once, cannot be inferred from a broad request, and cannot override an absolute denial.

## Risk inventory

| Area | Classification | Agent boundary |
| --- | --- | --- |
| `src/**`, `scripts/**`, and app entry/config files | Normal development | Read and write; validate before handoff |
| `secrets/**` and secret-like files | Sensitive | Do not read, print, copy, search, summarize, modify, or delete |
| `config/production.json` | Production configuration | Read-only; any mutation requires explicit approval |
| `db/migrations/**` | Immutable migration history | Read-only; creating, editing, deleting, or executing migrations requires explicit approval |
| `generated/**` | Generated artifacts | Read-only; regeneration requires approval and the authoritative generator |
| `legacy/**` | Legacy production workflow | Read-only; documented release commands require explicit approval |
| `lab-contract.json` | Exercise contract | Read-only; do not change the verification criteria |
| `dist/**`, `node_modules/**`, `*.tsbuildinfo` | Local build output | May be created by approved development commands; do not commit |

The inventory may use file names and metadata to classify secret files, but it must never inspect their contents.

## Safe autonomous workflow

1. Start with `git status` and inspect only paths permitted by `permissions.json`.
2. State the intended change and verify that every target is allowlisted.
3. Make the smallest focused edit. Do not make opportunistic changes in restricted areas.
4. Review `git diff` for scope, accidental generated files, credentials, tokens, or production changes.
5. Run the narrowest useful checks, followed by `npm run agent:check` before handoff.
6. Report changed files, validation results, and any skipped checks or requested approvals.

Normal autonomous commands are:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run test`
- `npm run lint`
- `npm run format`
- `npm run agent:check`
- Read-only Git commands such as `git status`, `git diff`, `git log`, and `git show`

## Approval gates

Stop and request approval before:

- Mutating production configuration, migrations, generated code, or legacy files.
- Running `deploy-prod`, `rollback-prod`, or `purge-release-cache`.
- Applying or rolling back a database migration.
- Regenerating an API client or other checked-in generated artifact.
- Adding, removing, or upgrading a dependency or running an install lifecycle script.
- Creating a commit, pushing a branch, opening a PR, or performing any other remote write.
- Deleting or renaming files outside disposable local build output.
- Making a change that expands beyond the paths or intent already approved.

An approval request must include the exact command, affected path, reason, expected impact, validation plan, and rollback plan. If approval is absent, ambiguous, or expired, do not proceed.

## Secret handling

- Never open or read files under `secrets/**`.
- Never display secret-like environment variables, credentials, tokens, certificates, or private keys.
- Never copy sensitive values into source, logs, prompts, test fixtures, commits, issues, or PR text.
- If a secret appears unexpectedly, stop processing it, avoid repeating it, and tell the human only the file path and exposure type.
- Use documented placeholders or injected environment variables in tests; do not invent production-like credentials.

## Stop conditions

Stop immediately and ask for direction if:

- A required change touches a denied or approval-gated area.
- A command could affect production, remote systems, database state, Git history, or data outside this repository.
- The working tree contains unrelated changes that could be overwritten.
- Validation reveals a security issue, secret exposure, destructive behavior, or an unclear ownership boundary.

Detailed forbidden operations are listed in `deny-rules.md`.
