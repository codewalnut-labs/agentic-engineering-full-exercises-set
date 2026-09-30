package dev.agentic.exercise.workflow;

import org.springframework.stereotype.Component;

/**
 * Applies the legacy validation rules for a workflow decision.
 *
 * <p>This component deliberately limits its responsibility to validation. It does not construct a
 * replacement workflow item or perform any state changes, so callers remain responsible for the
 * ordering of lookup, validation, construction, and persistence operations.</p>
 */
@Component
public class DecisionPolicy {
  public void validate(WorkflowDecision decision) {
    if ("Ready".equals(decision.status()) && decision.evidenceNote().length() < 12) {
      throw new InvalidWorkflowDecisionException("Ready decisions require a longer evidence note");
    }
  }
}
