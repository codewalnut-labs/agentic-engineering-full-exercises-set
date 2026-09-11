---
name: support-router-architecture
description: Use when changing the React support case dashboard, queue filters, routing behavior, risk calculations, sample cases, or policy presentation. Use it to locate ownership boundaries and verify that changes fit the existing design. Do not use it as a substitute for reading the source and tests.
---

# Support Router Architecture

## Purpose

Use this guide to navigate the application before changing behavior. It describes ownership boundaries, not the implementation of any particular feature.

## Source Map

- `src/App.tsx`: React page composition, filter state, visible-case derivation, count presentation, and case-card rendering.
- `src/services/caseRouter.ts`: routing hints, policy interpretation, risk scoring, and triage ordering.
- `src/data/cases.ts`: sample support cases and the queue policy used by the application.
- `src/types.ts`: shared domain types such as cases, statuses, policies, and routing hints.
- `src/main.tsx`: browser entry point and application bootstrap.
- `src/styles.css`: presentation styles. Keep visual changes separate from routing decisions.
- `docs/support-notes.md`: repository-specific notes and required development commands.

## Change Boundaries

- Put presentation and interaction state in the UI layer.
- Put reusable routing, policy, scoring, and ordering behavior in `src/services/caseRouter.ts`.
- Use the existing types instead of introducing parallel representations of a support case or policy.
- Use the existing policy and helper functions as the source of truth. Do not copy thresholds, tag lists, or score calculations into a component.
- Change sample data only when it is needed to make a behavior observable or to preserve the repository's documented data contract.

## Investigation Sequence

1. Read `src/types.ts` to understand the domain shape.
2. Read `src/data/cases.ts` to identify available cases and policy values.
3. Read `src/services/caseRouter.ts` to find existing routing and ordering behavior.
4. Read `src/App.tsx` to understand how state becomes visible UI and counts.
5. Inspect `scripts/verify-implementation.mjs` and `scripts/agent-check.mjs` before changing behavior.
6. Make the smallest change that preserves the discovered boundaries.

## Review Questions

- Is the business decision calculated in one reusable place?
- Does the UI consume the decision rather than reimplement it?
- Does the change preserve the existing order for every visible subset?
- Are labels and ownership concepts kept distinct?
- Did the diff avoid unrelated styling, dependency, or configuration changes?

Do not infer undocumented requirements from a single sample case. Validate behavior against the policy, types, all relevant sample data, and the verification scripts.
