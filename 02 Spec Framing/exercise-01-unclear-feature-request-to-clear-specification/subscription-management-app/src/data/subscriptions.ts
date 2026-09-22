import type { SubscriptionAccount } from "../types";

export const accounts: SubscriptionAccount[] = [
  {
    id: "ACCT-1042",
    company: "Helio Works",
    planName: "Growth",
    seats: 24,
    cadence: "annual",
    renewalDate: "2026-09-15",
    ownerRole: "account_owner"
  },
  {
    id: "ACCT-1188",
    company: "Northstar Clinic",
    planName: "Enterprise",
    seats: 180,
    cadence: "annual",
    renewalDate: "2026-08-01",
    ownerRole: "billing_admin",
    pendingChange: "seat increase requested by procurement"
  },
  {
    id: "ACCT-1290",
    company: "TinyForms",
    planName: "Starter",
    seats: 5,
    cadence: "monthly",
    renewalDate: "2026-07-22",
    ownerRole: "viewer"
  }
];
