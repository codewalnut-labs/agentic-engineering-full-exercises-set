# Development Workflows

## First-Time Setup

From `agent-onboarding-app`:

```sh
npm install
npm run agent:check
npm run dev
```

Open the local URL printed by Vite (normally `http://127.0.0.1:5173`). Confirm
the page shows the policy summary, case count, filter controls, and case cards.

Before making changes, read:

- `AGENTS.md`;
- the relevant `.agent/` documents;
- `docs/support-notes.md`;
- the source files on the affected path.

## Standard Change Workflow

1. Restate the requested behavior and identify the affected architecture
   boundary.
2. Inspect the current types, data, service, and caller before editing.
3. Make a minimal, focused change using existing patterns.
4. Update coupled data, policy text, types, or documentation in the same change.
5. Run the smallest relevant checks while iterating.
6. Run `npm run agent:check` before considering the change complete.
7. Manually verify user-visible changes.
8. Review `git diff` for generated output, incidental formatting, policy drift,
   or unrelated refactors.

## Routing or Risk-Scoring Change

1. Write down the intended decision precedence and threshold boundary.
2. Inspect `SupportCase`, `QueuePolicy`, and `RoutingHint` in `src/types.ts`.
3. Update `getRoutingHint` or risk scoring in
   `src/services/caseRouter.ts`.
4. If policy values changed, keep `queuePolicy` and `defaultPolicyMirror`
   identical.
5. Add or adjust representative cases in `src/data/cases.ts`.
6. Confirm `describePolicy` still communicates the operative threshold.
7. Check each affected case's owner, action, and position in the visible order.
8. Run the full agent check.

Pay special attention to exact-boundary cases because stale and revenue checks
use `>=`.

## Domain-Type or Sample-Data Change

1. Update the union/interface in `src/types.ts`.
2. Search for every consumer with `rg`.
3. Update exhaustive mappings such as `severityWeight`.
4. Update the status filters in `App.tsx` when adding a `CaseStatus`.
5. Keep IDs in `CASE-####` form, domain values lowercase, and teams/tags
   lowercase hyphenated.
6. Run typecheck, build, and the full agent check.

## UI or Styling Change

1. Keep routing calculations outside JSX.
2. Preserve semantic controls (`button`, headings, `dl` labels) and existing
   accessible labels.
3. Reuse current CSS class naming and design tokens unless the task introduces
   an explicit design system.
4. Test the `all` filter and every individual status.
5. Check the empty-result state if the change can produce one.
6. Inspect both a desktop view and a narrow viewport.
7. Run typecheck, build, and the full agent check.

## Documentation-Only Change

1. Verify every path, command, and behavior claim against the repository.
2. Do not refactor application code incidentally.
3. Run `npm run agent:check` because documentation can still affect exercise
   verification and must accompany a healthy worktree.

## Pull Request Workflow

Use a focused branch name such as:

```text
codex/add-agent-onboarding
```

The PR description should include:

- **Summary:** what changed and why;
- **Architecture impact:** affected boundaries and any policy/data coupling;
- **Verification:** exact commands run plus manual checks;
- **Risk:** known gaps, especially lack of automated routing behavior tests;
- **Screenshots:** only when visible UI changed.

Before requesting review:

```sh
npm run agent:check
git status --short
git diff --check
git diff
```

Commit only source and documentation required by the task. Exclude
`node_modules/`, `dist/`, editor files, logs, and other generated artifacts.

## Failure Handling

- Read the first failing subcommand from `npm run agent:check`; fix the cause and
  rerun that command before rerunning the full chain.
- Do not suppress a TypeScript error by weakening compiler settings.
- Do not change `lab-contract.json` merely to silence a contract failure unless
  the contract itself is the task.
- If behavior is unclear, compare types, sample data, and service precedence.
  Document unresolved ambiguity in the PR instead of inventing a rule.
