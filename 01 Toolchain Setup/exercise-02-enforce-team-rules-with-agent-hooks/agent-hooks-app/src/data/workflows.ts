import type { ReleaseWorkflow } from "../types";

export const workflows: ReleaseWorkflow[] = [
  {
    id: "WF-101",
    name: "Feature flag cleanup",
    description: "Remove stale release flags from application code after two successful deploys.",
    touchesProduction: false,
    touchesMigration: false,
    touchesGeneratedCode: false,
    risk: "low"
  },
  {
    id: "WF-204",
    name: "Payment callback migration",
    description: "Change callback persistence while preserving historical audit records.",
    touchesProduction: false,
    touchesMigration: true,
    touchesGeneratedCode: false,
    risk: "high"
  },
  {
    id: "WF-309",
    name: "Production deploy window",
    description: "Update production deployment timing and rollback behavior.",
    touchesProduction: true,
    touchesMigration: false,
    touchesGeneratedCode: false,
    risk: "critical"
  },
  {
    id: "WF-412",
    name: "Generated release client",
    description: "Regenerate client bindings from the release API schema.",
    touchesProduction: false,
    touchesMigration: false,
    touchesGeneratedCode: true,
    risk: "medium"
  }
];
