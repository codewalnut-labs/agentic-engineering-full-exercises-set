export type BillingCadence = "monthly" | "annual";

export type OwnerRole = "account_owner" | "billing_admin" | "viewer";

export interface SubscriptionAccount {
  id: string;
  company: string;
  planName: string;
  seats: number;
  cadence: BillingCadence;
  renewalDate: string;
  ownerRole: OwnerRole;
  pendingChange?: string;
}
