export const workflowStages = [
  "draft",
  "submitted",
  "manager-approved",
  "security-review",
  "data-owner-review",
  "provisioning",
  "provisioned",
  "failed-provisioning",
  "rollback-requested",
  "rolled-back",
];

const completedStagesByStatus = {
  draft: [],
  submitted: ["draft"],
  "manager-approved": ["draft", "submitted"],
  "security-review": ["draft", "submitted", "manager-approved"],
  "data-owner-review": ["draft", "submitted", "manager-approved", "security-review"],
  provisioning: ["draft", "submitted", "manager-approved", "security-review", "data-owner-review"],
  provisioned: ["draft", "submitted", "manager-approved", "security-review", "data-owner-review", "provisioning"],
  "failed-provisioning": [
    "draft",
    "submitted",
    "manager-approved",
    "security-review",
    "data-owner-review",
    "provisioning",
  ],
  "rollback-requested": [
    "draft",
    "submitted",
    "manager-approved",
    "security-review",
    "data-owner-review",
    "provisioning",
    "failed-provisioning",
  ],
  "rolled-back": [
    "draft",
    "submitted",
    "manager-approved",
    "security-review",
    "data-owner-review",
    "provisioning",
    "failed-provisioning",
    "rollback-requested",
  ],
};

export function nextStepFor(request) {
  if (request.status === "draft") {
    return {
      status: "submitted",
      approvalUpdates: { manager: "pending" },
      integrationUpdates: { "Access Policy": "healthy" },
      event: { actor: "Employee", action: "Submitted access request" },
    };
  }

  if (request.status === "submitted") {
    return {
      status: "manager-approved",
      approvalUpdates: { manager: "approved" },
      event: { actor: "Manager", action: "Approved manager review" },
    };
  }

  if (request.status === "manager-approved" && request.risk === "high") {
    return {
      status: "security-review",
      approvalUpdates: { security: "pending" },
      event: { actor: "Policy engine", action: "Routed high-risk request to security review" },
    };
  }

  if (request.status === "manager-approved") {
    return {
      status: "data-owner-review",
      approvalUpdates: { dataOwner: "pending" },
      event: { actor: "Data owner", action: "Opened data owner review" },
    };
  }

  if (request.status === "security-review") {
    return {
      status: "data-owner-review",
      approvalUpdates: { security: "approved", dataOwner: "pending" },
      event: { actor: "Security", action: "Approved high-risk access" },
    };
  }

  if (request.status === "data-owner-review") {
    return {
      status: "provisioning",
      approvalUpdates: { dataOwner: "approved" },
      integrationUpdates: { "Identity Provider": "running" },
      event: { actor: "Data owner", action: "Approved data access" },
    };
  }

  if (request.status === "provisioning") {
    return {
      status: request.provisioningHealthy ? "provisioned" : "failed-provisioning",
      integrationUpdates: {
        "Identity Provider": request.provisioningHealthy ? "healthy" : "degraded",
      },
      event: {
        actor: "Provisioning system",
        action: request.provisioningHealthy
          ? "Granted access and synced identity group"
          : "Failed to grant access and opened retry task",
      },
    };
  }

  if (request.status === "failed-provisioning") {
    return {
      status: "rollback-requested",
      integrationUpdates: { "Identity Provider": "degraded" },
      event: { actor: "Provisioning system", action: "Requested rollback for partial access grant" },
    };
  }

  if (request.status === "rollback-requested") {
    return {
      status: "rolled-back",
      integrationUpdates: { "Identity Provider": "healthy" },
      event: { actor: "Identity admin", action: "Removed partial access and closed rollback" },
    };
  }

  return {
    status: request.status,
    event: { actor: "System", action: "No next transition available" },
  };
}

export function applyWorkflowStep(request, step) {
  const approvals = {
    ...request.approvals,
    ...step.approvalUpdates,
  };

  const integrations = request.integrations.map((integration) => {
    const nextStatus = step.integrationUpdates?.[integration.name];
    if (!nextStatus) {
      return integration;
    }

    return {
      ...integration,
      status: nextStatus,
      lastRun: step.event.action,
    };
  });

  return {
    ...request,
    status: step.status,
    approvals,
    integrations,
    history: [
      ...request.history,
      {
        id: `evt-${Date.now()}`,
        actor: step.event.actor,
        action: step.event.action,
        at: new Date().toISOString(),
      },
    ],
  };
}

export function buildActorList(request) {
  return [
    { actor: "Employee", responsibility: `Requests ${request.requestedRole}` },
    { actor: "Manager", responsibility: `${request.manager} approves business need` },
    { actor: "Policy engine", responsibility: `Evaluates ${request.risk} risk access` },
    { actor: "Security", responsibility: "Reviews sensitive or break-glass access" },
    { actor: "Data owner", responsibility: `Approves ${request.systemName} data access` },
    { actor: "Provisioning system", responsibility: "Grants or rolls back identity access" },
  ];
}

export function buildFlowSteps(request) {
  const completedStages = new Set(completedStagesByStatus[request.status] ?? []);

  return workflowStages.map((stage) => {
    return {
      stage,
      state: stage === request.status ? "current" : completedStages.has(stage) ? "complete" : "waiting",
    };
  });
}
