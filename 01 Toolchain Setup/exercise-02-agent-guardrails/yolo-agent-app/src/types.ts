export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface ReleaseWorkflow {
  id: string;
  name: string;
  description: string;
  touchesProduction: boolean;
  touchesMigration: boolean;
  touchesGeneratedCode: boolean;
  risk: RiskLevel;
}

export interface WorkflowClassification {
  risk: RiskLevel;
  requiresApproval: boolean;
  agentEditable: boolean;
}
