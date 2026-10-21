# Architecture

## System Shape

`agent-onboarding-app` is a browser-only single-page application. Vite serves
and builds it; React renders the UI; all domain data is in memory.

```text
index.html
  -> src/main.tsx
       -> src/App.tsx
            -> src/data/cases.ts
            -> src/services/caseRouter.ts
                 -> src/types.ts
            -> src/styles.css
```

There are no network calls, server routes, databases, authentication flows, or
environment variables.

## Runtime Flow

1. `index.html` provides the `#root` mount element.
2. `src/main.tsx` validates the mount element and renders `App` inside React
   `StrictMode`.
3. `src/App.tsx` owns the selected status filter.
4. `App` filters `sampleCases`, calls `sortCasesForTriage`, and computes a
   `RoutingHint` for each visible case using `queuePolicy`.
5. React renders the policy description, visible-case count, filter buttons, and
   case cards.
6. `src/styles.css` supplies all presentation; there is no component library.

## Boundary Map

| Area | Files | Responsibility | Must not own |
| --- | --- | --- | --- |
| Bootstrap | `index.html`, `src/main.tsx` | DOM mount and React startup | Routing or case data |
| UI composition | `src/App.tsx`, `src/styles.css` | Filter state, rendering, accessibility labels, layout | Policy constants |
| Domain contracts | `src/types.ts` | Status, segment, severity, case, policy, and hint shapes | Runtime decisions or sample values |
| Data/configuration | `src/data/cases.ts` | Queue policy and representative support cases | React rendering |
| Domain service | `src/services/caseRouter.ts` | Routing decisions, risk scoring, sorting, policy text | Component state or DOM access |
| Repository checks | `scripts/*.mjs` | Lightweight structure, formatting, and contract checks | Production runtime behavior |
| Exercise contract | `lab-contract.json` | Challenge metadata and verification expectations | Application configuration |

## Routing Model

`getRoutingHint(item, policy)` calculates:

- severity weight: low `1`, medium `2`, high `4`, critical `7`;
- stale bonus: `2` when activity age meets or exceeds the stale threshold;
- revenue bonus: `3` when risk meets or exceeds the revenue floor.

Decision precedence is important:

1. A restricted tag or revenue-critical amount keeps the case with its named
   owner. Stale cases require owner-approved escalation.
2. A low-severity self-serve case routes to the `growth` lifecycle queue.
3. All other cases use their named owner, falling back to the policy's default
   owner, and either refresh customer contact or continue standard triage.

`sortCasesForTriage` clones its input, calculates scores, and sorts descending.
It currently scores against a private `defaultPolicyMirror`, while `App` calls
`getRoutingHint` with the exported `queuePolicy`. This is the main architectural
hazard: policy changes can make display hints and sort order disagree unless
both policy objects stay synchronized.

## Ownership Vocabulary

- `status` describes where customer support is in its workflow.
- `ownerTeam` describes which engineering team owns the case.
- `segment` describes the customer tier and can affect routing.
- `tags` carry exact policy signals such as `billing-export` and
  `vip-contract`.

These values intentionally use different naming schemes. Statuses and enum-like
domain values are lowercase words; team and tag identifiers are lowercase
hyphenated strings.

## Change Impact Guide

| Change | Inspect and update |
| --- | --- |
| Add a status, segment, or severity | `src/types.ts`, sample cases, filter options, routing branches/weights, manual checks |
| Change a routing threshold or tag | `queuePolicy`, `defaultPolicyMirror`, sample cases, policy description, sorted-order verification |
| Change ownership behavior | `getRoutingHint`, sample cases, rendered owner/action values |
| Change risk scoring | `severityWeight`, bonuses, sorted-order expectations |
| Change UI filtering | `App.tsx`, status types/options, empty and all-filter states |
| Change styles | `styles.css`, desktop and narrow viewport checks |

## Deliberate Constraints

- Sample cases are static and reset on refresh.
- The routing service has no automated behavior tests.
- The policy mirror is duplicated.
- CSS is global.
- The app has a single component.

Treat these as known constraints. Improve one only in a task scoped to that
improvement; do not fold opportunistic architecture changes into onboarding or
unrelated work.
