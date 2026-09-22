# Fresh-agent specification review

Read the frozen documents under `evidence/reviewed/`: spec.md, clarifications.md, requirements.md, and spec-review.md. Compare them with the supplied application request, stakeholder notes, billing constraints, and code.

Explicitly evaluate every CHK item in spec-review.md. Assess requirements quality: clarity, consistency, completeness, testability, and boundary/failure coverage. Discuss authorization, billing, pending changes, recovery, and scope. Do not infer approval for unresolved policy decisions.

Return the evaluated checklist, per-item results, and actionable findings using the formats in specification-contract.md. Cite draft FR/SC/Q identifiers. If there are no actionable findings, state that and explain the coverage reviewed. Keep frozen files and application code unchanged.

Write outputs to `specs/subscription-management/reviewed-checklist.md`, `checklist-results.json`, and `review.md`. Include both Markdown documents verbatim and the results in a JSON code block in your final response so the transcript preserves your assessment. The author handles subsequent revisions; do not quietly fix the specification during review.
