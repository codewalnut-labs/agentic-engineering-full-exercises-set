# Agent Onboarding

## Repository

This is a small React and TypeScript support case-routing application. The UI displays sample support cases, applies queue filters, calculates routing hints, and presents cases in triage order.

Read the focused guidance before changing behavior:

- [Architecture skill](.agent/architecture/SKILL.md)
- [Testing skill](.agent/testing/SKILL.md)

## Safe Start

1. Inspect the relevant source and existing checks before editing.
2. Keep the change limited to the requested behavior. Do not rewrite unrelated code or change protected challenge files.
3. Treat existing source, tests, scripts, and support notes as evidence. If they disagree, investigate before choosing a pattern.
4. Keep business rules in the routing/service boundary rather than duplicating them in UI components.
5. Preserve consistency between filter state, the visible result list, the displayed count, and the existing triage ordering.
6. Do not add dependencies or configuration unless the task requires them.

## Useful Commands

Run these from this application directory:

```text
npm run agent:check
npm run verify:implementation
npm run verify:exercise
```

Use `npm run agent:check` during development. Use `npm run verify:implementation` to validate the requested application behavior. Use `npm run verify:exercise` only for the final clean verification.

## Before Committing

- Review the complete diff, including changed paths and unrelated edits.
- Confirm the implementation follows the existing module boundaries.
- Run the relevant checks and record their actual results.
- Do not claim success without command output and exit status.
