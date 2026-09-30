# Behavior decisions

This exercise authorizes refactoring only. Every observed output is classified as **preserve**, even where the behavior is a suspected bug.

| Observation | Classification | Decision |
|---|---|---|
| Support override wins for unsupported plans and enterprise arrears | Preserve; suspected bug | Keep the support override first and return `legacy-support-override` with zero discount. Changing precedence would alter callers that depend on manual support decisions. |
| Enterprise accepts a negative late-payment count | Preserve; suspected bug | Keep the existing `< 2` comparison without adding a non-negative validation. Validation tightening needs a separate contract change. |
| Enterprise below 12 months returns `plan-not-supported` | Preserve | Keep the current default result and exact reason rather than introducing a new tenure reason. |
| Mature Pro with one late payment returns `plan-not-supported` | Preserve; suspected bug | Do not reinterpret this as `payment-history`; that reason belongs only to established enterprise accounts in observed behavior. |
| Enterprise with two or more late payments returns manual review | Preserve | Keep `status: manual-review`, zero discount, and exact reason `payment-history`. |
| Unknown and Starter plans remain unsupported | Preserve | Keep `{ status: ineligible, discountPercent: 0, reason: plan-not-supported }`. |

The public seam remains `evaluateRenewalEligibility(account)`. No validation was added for missing, malformed, or negative fields because the current validation gaps are observable. Result field names, value types, exact reason strings, decision order, support override precedence, enterprise boundaries, and Pro boundaries remain unchanged. The characterization test calls only the public export and uses the protected golden cases as independent literal expectations; it does not couple to the new private helpers.
