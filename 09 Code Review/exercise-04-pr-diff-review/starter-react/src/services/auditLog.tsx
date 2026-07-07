const AUDIT_LOG_KEY = "renewal-approval-events";

export function recordApproval(user, renewal) {
  const event = {
    type: "renewal.approved",
    actorEmail: user.email,
    renewalId: renewal.id,
    customer: renewal.customer,
    approvedAt: renewal.approvedAt,
    createdAt: new Date().toISOString(),
  };

  const existingEvents = JSON.parse(localStorage.getItem(AUDIT_LOG_KEY) || "[]");
  existingEvents.push(event);
  localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(existingEvents));
  sendAuditEvent(event);
}

function sendAuditEvent(event) {
  console.info("queued approval audit event", event.type, event.renewalId);
}
