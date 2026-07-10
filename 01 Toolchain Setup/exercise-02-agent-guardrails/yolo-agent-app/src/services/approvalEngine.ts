import type { ReleaseWorkflow, WorkflowClassification } from "../types";

export function classifyWorkflow(workflow: ReleaseWorkflow): WorkflowClassification {
  const guarded = workflow.touchesProduction || workflow.touchesMigration || workflow.touchesGeneratedCode;

  return {
    risk: workflow.risk,
    requiresApproval: guarded || workflow.risk === "critical",
    agentEditable: !guarded && workflow.risk !== "critical"
  };
}

export function summarizeGuardrailGap(workflows: ReleaseWorkflow[]) {
  const approvalCount = workflows.filter((workflow) => classifyWorkflow(workflow).requiresApproval).length;
  return `${approvalCount} workflows need explicit agent boundaries before autonomous work is safe.`;
}
