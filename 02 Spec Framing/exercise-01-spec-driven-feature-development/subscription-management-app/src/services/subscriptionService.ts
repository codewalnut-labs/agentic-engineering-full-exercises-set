import type { SubscriptionAccount } from "../types";

export function summarizeSubscription(account: SubscriptionAccount) {
  const pending = account.pendingChange ? ` Pending: ${account.pendingChange}.` : "";
  return `${account.seats} seats on ${account.cadence} billing. Renewal is ${account.renewalDate}.${pending}`;
}

export function getRenewalRisk(account: SubscriptionAccount) {
  if (account.pendingChange) return "needs review";
  if (account.ownerRole === "viewer") return "permission unclear";
  return "normal";
}
