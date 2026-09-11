# Refactor map

## Boundary

The refactor separates one pure validation rule from orchestration. `DecisionPolicy.validate(WorkflowDecision decision)` owns only the legacy Ready-note rule. It compares status with `"Ready".equals`, enforces the 12-character boundary, and throws `InvalidWorkflowDecisionException` with the exact protected message. It has no `WorkflowRepository`, lookup, construction, save, or mutation responsibility.

## Preserved WorkflowService flow

1. Lookup remains first: `WorkflowService` calls `repository.findById(id)` and throws `WorkflowNotFoundException` before validation.
2. Validation delegates exactly once to the injected `DecisionPolicy`.
3. Construction remains in `WorkflowService`: the accepted `WorkflowItem` preserves `id`, `customer`, and `score`, while using the decision's status, owner, and evidence note.
4. Persistence remains last: `repository.save(...)` runs exactly once for acceptance and never for rejection.

## Wiring and contracts

Spring injects the repository-free policy through the two-argument service constructor. The existing one-argument constructor remains for current service tests and delegates to a new policy. Controller, exception handler, repository, records, HTTP response shape, and React client parsing are unchanged. Unknown non-Ready statuses intentionally remain accepted because extracting validation does not authorize closing that legacy gap.
