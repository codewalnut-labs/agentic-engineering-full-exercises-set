# Trigger Cases

The executable source of truth is `skill-eval-app/eval/cases.yaml`.

- Release positives: merged PR release notes; changelog from a release diff.
- Review positive: auth diff with security and accessibility findings.
- Migration positive: safe codemod plan for a legacy component.
- Ambiguous regression: incident PR summary for leadership.
- Release exclusions: outage summary; conceptual OAuth explanation.
- Unrelated negative: greenfield pricing-card creation.

Every case asserts both skill selection and the reviewer-ready output contract.
