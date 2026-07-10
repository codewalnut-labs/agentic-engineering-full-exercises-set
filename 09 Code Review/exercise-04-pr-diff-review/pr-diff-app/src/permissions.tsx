export function canApproveRenewal(user, renewal) {
  if (!renewal) {
    return false;
  }

  const withinLimit = renewal.contractValue <= user.approvalLimit;
  const sameRegion = renewal.region === user.region;
  const needsException = renewal.discountPercent > 0.25 || renewal.status === "exception-requested";
  return user.role === "sales-manager" && withinLimit && sameRegion && !needsException;
}

export function approvalHint(user, renewal) {
  if (!renewal) {
    return "Select a renewal to review approval requirements.";
  }

  if (canApproveRenewal(user, renewal)) {
    return `${user.email} can approve this renewal.`;
  }

  return "Approval requires a manager with the correct region and limit.";
}
