# Repository Rules

## Scope

These rules cover `agent-onboarding-app`. They are derived from the current
source, package scripts, and `docs/support-notes.md`.

## Safe Default Behavior

- Start with read-only inspection: `package.json`, `src/types.ts`,
  `src/data/cases.ts`, `src/services/caseRouter.ts`, `src/App.tsx`, and relevant
  docs.
- Run package commands from the app root because the custom scripts use
  `process.cwd()` and the lint check expects the folder name to match the
  package name (`agent-onboarding-app`).
- Make the smallest change that satisfies the task. Preserve public types,
  routing precedence, and UI wording unless the requested behavior requires a
  change.
- Keep domain logic in `src/services/`, domain values in `src/data/` or
  `src/types.ts`, and rendering/state coordination in React components.
- Use existing package scripts rather than substituting ad hoc check commands
  when reporting repository verification.

## Domain Guardrails

- `CaseStatus` is a customer-support workflow state. It is not an owner or team.
- `ownerTeam` is an engineering ownership label and is intentionally a string;
  do not constrain it to status values.
- Routing precedence matters:
  1. restricted tags or revenue-critical cases stay with their named owner;
  2. low-severity self-serve cases route to `growth`;
  3. other cases stay with their named owner or use the default owner.
- A case is stale at `lastActivityHours >= staleAfterHours`, not strictly greater
  than the threshold.
- A case is revenue-critical at
  `revenueRiskUsd >= criticalRevenueFloor`.
- Risk sorting is descending. Equal scores retain the runtime's stable input
  order.
- Restricted-tag matching is exact and case-sensitive.

## Synchronization Rules

Routing policy is currently represented twice:

- `queuePolicy` in `src/data/cases.ts` is passed to routing hints and policy text.
- `defaultPolicyMirror` in `src/services/caseRouter.ts` is used internally by
  `sortCasesForTriage`.

If a task changes policy values, update both objects in the same change and
verify the UI description and sorted order. A dedicated refactor may remove the
duplication, but do not silently change the `sortCasesForTriage` API during an
unrelated task.

Per `docs/support-notes.md`, routing changes must also update representative
sample case data and the policy summary displayed by the UI when applicable.

## Allowed Commands

```sh
npm install
npm run dev
npm run preview
npm run lint
npm test
npm run format
npm run typecheck
npm run build
npm run agent:check
```

`npm run dev` and `npm run preview` start local processes; stop them after
verification. The app binds to `127.0.0.1`, and the development server is
configured for port `5173`.

## Commands and Changes to Avoid

- Do not run package scripts from a parent directory.
- Do not edit `node_modules/`, `dist/`, or other generated output.
- Do not use `npm audit fix --force`, unrequested dependency upgrades, or
  lockfile-only churn as incidental cleanup.
- Do not weaken `tsconfig.json` strictness to make a type error disappear.
- Do not delete or rename contract fields in `lab-contract.json`; the custom test
  requires its arrays and repository-specific domain.
- Do not mutate the `sampleCases` array while sorting or filtering.
- Do not bypass `npm run agent:check` before a PR.
- Do not add a backend, state-management framework, test framework, formatter,
  or linter unless the task requires it and the PR explains the trade-off.

## Source of Truth

When guidance conflicts, use this order:

1. Requested product behavior and acceptance criteria.
2. Executable TypeScript behavior and types.
3. Package scripts and configuration.
4. `docs/support-notes.md`.
5. Agent documentation.

If code and agent documentation diverge, update the documentation as part of the
same change or call out the mismatch.
