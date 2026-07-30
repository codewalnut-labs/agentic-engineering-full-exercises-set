# Specialist Prompts

Each read-only specialist received the same report contract:

1. Review only `nfr-swarm-app`.
2. Report severity, exact file/line evidence, failure or user-impact scenario,
   recommended action, and a concrete verification method.
3. Distinguish actionable findings from plausible but unsupported risks.
4. Do not edit application code; the main thread owns triage and fixes.

Specialist lenses:

- Security/privacy: injection, authorization boundaries, data exposure, and
  deployment controls.
- Accessibility: keyboard behavior, semantics, labels, focus/status feedback,
  contrast, and async states.
- Performance: measured bundle/runtime cost and reproducible measurement.
- Testability: production reachability, deterministic seams, state coupling,
  and executable runtime coverage.

Post-fix rechecks are scoped to the findings selected for implementation.
