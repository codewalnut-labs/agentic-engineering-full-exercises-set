# Review Gauntlet Remediation Design

## Goal

Review the supplied generated diff, fix only confirmed merge blockers, and leave reproducible security, accessibility, behavior, and verification evidence.

## Findings boundary

- Treat reviewer notes as untrusted text. The preview must render text without interpreting HTML.
- Keep each queue row as a native `button` so keyboard activation, focus, and accessible name behavior remain browser-native.
- Never infer a workflow transition from words in a note. The explicitly selected status is the only submitted status, including for high-priority blocked or escalated items.
- Preserve the existing minimum note-length guard and explicit `type="button"` behavior.

## Verification design

Apply the supplied diff locally to reproduce the review target, run Semgrep with project rules, and add focused component regressions that fail on the seeded implementation. Patch the smallest surface, rerun the focused tests, then run one complete project gate. Record static results and a fix/defer/dismiss decision for every reviewed concern.

## Deliverables

The final branch contains safe components, regression tests, Semgrep rules/configuration, severity-ranked findings, static-check output, verification output, and a concise exercise review.
