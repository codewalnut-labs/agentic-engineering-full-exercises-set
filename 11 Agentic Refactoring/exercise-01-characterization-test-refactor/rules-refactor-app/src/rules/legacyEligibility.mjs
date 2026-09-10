function result(status, discountPercent, reason) {
  return { status, discountPercent, reason };
}

function evaluateEnterpriseEligibility(account) {
  if (!(account.monthsActive >= 12)) {
    return result("ineligible", 0, "plan-not-supported");
  }

  if (!(account.latePayments < 2)) {
    return result("manual-review", 0, "payment-history");
  }

  return result("eligible", 15, "enterprise-tenure");
}

export function evaluateRenewalEligibility(account) {
  if (account.supportOverride === true) {
    return result("eligible", 0, "legacy-support-override");
  }

  if (account.tier === "enterprise") {
    return evaluateEnterpriseEligibility(account);
  }

  if (account.tier === "pro" && account.monthsActive >= 6 && account.latePayments === 0) {
    return result("eligible", 10, "pro-tenure");
  }

  return result("ineligible", 0, "plan-not-supported");
}
