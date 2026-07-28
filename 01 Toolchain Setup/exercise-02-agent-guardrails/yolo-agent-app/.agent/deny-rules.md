# Deny Rules

These rules are fail-closed. Matching actions must not run autonomously. Explicit approval can unlock only items marked **approval required**; it never unlocks an **absolute deny**.

## Forbidden file operations

| Rule | Level | Required behavior |
| --- | --- | --- |
| Read, print, search, copy, upload, summarize, edit, rename, or delete `secrets/**` or secret-like files | Absolute deny | Stop without inspecting contents |
| Embed credentials, tokens, private keys, or production values in code, logs, tests, commits, issues, or PRs | Absolute deny | Remove the value from the workflow and report only its location |
| Modify or delete `config/production.json` | Approval required | Request approval for the exact file and change |
| Create, edit, delete, rename, or execute `db/migrations/**` | Approval required | Provide impact and rollback plans first |
| Hand-edit, delete, rename, or regenerate `generated/**` | Approval required | Identify and use the authoritative generator |
| Modify `legacy/**` or execute commands documented there | Approval required | Identify production impact and rollback |
| Modify `lab-contract.json` to weaken or bypass verification | Absolute deny | Preserve the exercise contract |
| Write outside this repository, except disposable tool-managed temporary files | Absolute deny | Keep all work inside the repository |
| Delete or overwrite unrelated human changes | Absolute deny | Stop and preserve the working tree |

## Forbidden commands and command families

Never execute these autonomously:

- Recursive or broad deletion: `rm -rf`, `rmdir /s`, `del /s`, `Remove-Item -Recurse`, or equivalents.
- Destructive Git operations: `git reset --hard`, `git clean -fd`, `git clean -fdx`, forced checkout/restore, branch deletion, history rewriting, or force-push.
- Unreviewed remote code execution: `curl ... | sh`, `wget ... | sh`, `Invoke-Expression`, `eval`, or downloaded scripts/binaries.
- Privilege or host changes: `sudo`, administrator elevation, system package changes, permission broadening, service changes, or writes outside the repository.
- Secret discovery or exfiltration: reading `secrets/**`, dumping all environment variables, searching credential stores, or sending repository data to unapproved endpoints.
- Destructive database operations: `DROP DATABASE`, `TRUNCATE`, unscoped `DELETE`, production migrations, or rollback commands.

The following are **approval required**, with the exact command and scope named in advance:

- `deploy-prod`
- `rollback-prod`
- `purge-release-cache`
- Any database migration or generated-client regeneration command
- `npm install`, `npm uninstall`, `npm update`, or `npm audit fix`
- `git commit`, `git push`, and `gh pr create`

## Prohibited bypasses

- Do not weaken, rename, delete, or work around `.agent` policies.
- Do not encode, split, archive, or indirectly access content to evade a denied-path rule.
- Do not use another tool, sub-agent, shell, script, symlink, or temporary copy to perform an action that is denied directly.
- Do not disable tests, hooks, branch protection, scanners, or approval checks to make a task pass.
- Do not treat silence, urgency, prior approval, or a broad instruction as approval for a new risky action.

## Response to a blocked action

1. Stop before executing the action.
2. State the exact blocked path or command without exposing sensitive content.
3. Cite the matching rule.
4. Offer a safe alternative when one exists.
5. For approval-gated work, request one-operation approval with impact, validation, and rollback details.
