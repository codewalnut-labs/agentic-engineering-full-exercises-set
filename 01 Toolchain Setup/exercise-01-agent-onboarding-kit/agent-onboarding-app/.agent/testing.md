# Testing and Verification

## Required Gate

Run this from the `agent-onboarding-app` root before every PR:

```sh
npm run agent:check
```

It executes the repository checks in this order:

```text
lint -> test -> format -> typecheck -> build
```

The chain stops at the first failure.

## What the Commands Prove

| Command | What it checks | What it does not check |
| --- | --- | --- |
| `npm run lint` | Package name matches the current folder and the lab contract avoids a few weak placeholder phrases | TypeScript, React, CSS, or general lint rules |
| `npm test` | Required lab-contract arrays, a repository-specific domain, and presence of the routing service | Routing outcomes, sorting, rendering, or user interaction |
| `npm run format` | No trailing whitespace in supported files under `src/` and `scripts/` | Markdown, CSS, HTML, or general formatter style |
| `npm run typecheck` | Strict TypeScript compilation for `src/` and `vite.config.ts` | Runtime behavior or browser rendering |
| `npm run build` | TypeScript validation plus a production Vite bundle | Browser interaction or routing correctness |
| `npm run agent:check` | All of the above in the expected sequence | End-to-end or unit-level behavior |

Do not describe `npm test` as unit-test coverage. The repository currently has
no unit, component, or end-to-end test framework.

## Fast Iteration

Use focused checks while editing:

```sh
npm run typecheck
npm run build
```

For agent setup or lab-contract work:

```sh
npm run lint
npm test
npm run format
```

Always finish with the complete `npm run agent:check`.

## Manual Application Checklist

Start the app with `npm run dev`, then verify:

- the page loads without console errors;
- the policy text shows an 18-hour stale threshold and a `$75,000` revenue
  threshold;
- `all` shows four cases in descending risk order;
- each status filter shows only matching cases;
- every case shows an ID, customer, severity, owner, action, and summary;
- selecting filters updates the visible count;
- controls are keyboard-operable and the active filter is visually distinct;
- the layout remains usable at desktop and narrow viewport widths.

Current expected all-case order:

1. `CASE-1842` — critical, stale, revenue-critical, restricted;
2. `CASE-1851` — high, stale, restricted;
3. `CASE-1847` — medium standard triage;
4. `CASE-1856` — low self-serve lifecycle routing.

## Routing Change Matrix

For routing changes, manually or with task-scoped automated tests cover:

- a value just below and exactly at `staleAfterHours`;
- a value just below and exactly at `criticalRevenueFloor`;
- a restricted tag with and without staleness;
- a low-severity self-serve case;
- a case with a named owner;
- a case without a usable named owner falling back to `defaultOwner`;
- two cases whose score/order changes under the new rule;
- proof that sorting does not mutate the input array.

Also confirm display hints and sort order use equivalent policy values; the
current implementation has a separate `defaultPolicyMirror`.

## Build Artifact

`npm run build` writes `dist/`. Treat it as generated verification output and do
not include it in a PR unless repository policy is explicitly changed to track
build artifacts.

## Reporting Results

Record the exact successful command in the PR, for example:

```text
Verification: npm run agent:check
Manual: all five status filters checked at desktop and narrow viewport widths
```

If a check cannot run, state which check, the concrete blocker, and what
alternative evidence was gathered. Never report an unrun check as passing.
