# Agent Onboarding Guide

This file applies to the entire `agent-onboarding-app` directory. Treat it as the
entry point for any coding agent working in this repository.

## Read Before Editing

Review the repository-specific guidance in this order:

1. [`.agent/rules.md`](.agent/rules.md) — boundaries and safety rules.
2. [`.agent/architecture.md`](.agent/architecture.md) — runtime flow and ownership.
3. [`.agent/conventions.md`](.agent/conventions.md) — local code and naming patterns.
4. [`.agent/workflows.md`](.agent/workflows.md) — change and review process.
5. [`.agent/testing.md`](.agent/testing.md) — automated and manual verification.

Do not infer behavior from the UI alone. Read `src/types.ts`,
`src/data/cases.ts`, and `src/services/caseRouter.ts` before changing routing.

## Repository Summary

This is a small, client-only React 19 and TypeScript support case-routing
console built with Vite. It displays in-memory sample cases, filters them by
status, calculates routing hints, and sorts them by risk. There is no backend,
API client, persistence layer, authentication, or environment configuration.

## Standard Commands

Run commands from this directory:

```sh
npm install
npm run dev
npm run agent:check
```

`npm run agent:check` is the required pre-PR gate. It runs lint, the repository
contract check, formatting checks, TypeScript validation, and a production
build. See `.agent/testing.md` before claiming that behavior is covered: the
current `npm test` script is a structural contract check, not a unit-test suite.

## Non-Negotiable Rules

- Keep changes scoped. Do not refactor application behavior while editing agent
  setup documentation.
- Preserve the separation between UI composition (`src/App.tsx`), domain
  contracts (`src/types.ts`), sample/configuration data (`src/data/cases.ts`),
  and routing logic (`src/services/caseRouter.ts`).
- Treat support status values (`new`, `triaged`, `waiting`, `blocked`) and
  engineering owner labels (`support-platform`, `identity`, and similar values)
  as different domains.
- Treat `sampleCases` as both demo content and behavior examples. When routing
  behavior changes, update relevant sample cases and confirm the visible policy
  summary still matches.
- Keep `queuePolicy` and the service's `defaultPolicyMirror` synchronized when
  changing thresholds, the default owner, or restricted tags. The duplication
  is an existing constraint, not permission to introduce more policy copies.
- Preserve the pure, non-mutating routing helpers. In particular,
  `sortCasesForTriage` must not sort its input array in place.
- Never edit generated `node_modules/` or `dist/` contents.
- Do not run broad automated rewrites such as `npm audit fix --force`, dependency
  major-version upgrades, or repository-wide formatting unless the task
  explicitly calls for them.

## Completion and PR Expectations

Before opening a PR:

1. Inspect `git diff` and remove unrelated changes or generated files.
2. Run `npm run agent:check` from the app root.
3. Manually exercise the UI when application behavior or styling changed.
4. Explain the user-visible or agent-visible outcome, affected boundaries, and
   verification performed.
5. Call out routing-policy changes explicitly, including policy/data sync.

Use a focused branch and commit. Never bypass failed checks or describe a check
as passing unless it was run successfully in the current worktree.
