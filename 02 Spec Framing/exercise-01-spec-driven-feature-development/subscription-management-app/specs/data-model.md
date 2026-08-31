# Data Model: Self-Service Subscription Management

## Subscription

Authoritative current state for one billing account.

| Field | Type | Rules |
| --- | --- | --- |
| `id` | string | Stable account-scoped identifier |
| `company` | string | Non-empty display name |
| `planId` / `planName` | string | Must reference an eligible active plan |
| `seats` | integer | At least 1 and not below assigned seats |
| `assignedSeats` | integer | Between 0 and `seats` |
| `cadence` | `monthly` or `annual` | Current billing cadence |
| `renewalDate` | date | ISO calendar date in account billing zone |
| `status` | `active`, `cancel_scheduled`, or `cancelled` | Determines permitted actions |
| `ownerRole` | `account_owner`, `billing_admin`, or `viewer` | Current user's role context |
| `currency` / `locale` | string | Used for exact amount/date presentation |
| `version` | string | Changes after every authoritative mutation |
| `pendingRequest` | Plan Change Request or absent | At most one non-terminal request |

## Plan

An offering eligible for selection by an account.

| Field | Type | Rules |
| --- | --- | --- |
| `id` / `name` | string | Stable ID and display name |
| `supportedCadences` | cadence list | At least one cadence |
| `minimumSeats` / `maximumSeats` | integer | Positive, minimum <= maximum |
| `price` | money by cadence | Exact minor units and currency |
| `availability` | `eligible` or `ineligible` | Server-derived for the account |
| `ineligibilityReason` | string or absent | Required when ineligible |

## Change Quote

A time-limited preview that authorizes no change by itself.

| Field | Type | Rules |
| --- | --- | --- |
| `id` | string | Stable opaque quote identifier |
| `accountId` | string | Matches target subscription |
| `changeType` | `plan`, `seats`, `cadence`, or `cancel` | Exactly one type |
| `currentState` | subscription snapshot | State used to calculate quote |
| `proposedState` | partial subscription snapshot | Exact resulting state |
| `amountImpact` | signed money | Charge, zero, or credit |
| `effectiveDate` | date/time | Immediate or renewal based on policy |
| `renewalDate` | date | Renewal after the proposed change |
| `expiresAt` | date/time | Confirmation rejected after this instant |
| `subscriptionVersion` | string | Must match at confirmation |
| `consequences` | string list | Required for cancellation |

### Quote lifecycle

`active -> consumed`

`active -> expired`

`active -> invalidated` when subscription version, eligibility, or pricing changes

## Plan Change Request

A confirmed mutation with a durable lifecycle.

| Field | Type | Rules |
| --- | --- | --- |
| `id` | string | Stable user-visible reference |
| `accountId` / `quoteId` | string | Links account and confirmed quote |
| `changeType` | enum | Matches quote |
| `requestedBy` | actor reference | Actor and role at confirmation |
| `submittedAt` / `effectiveAt` | date/time | Immutable audit timestamps |
| `status` | request status | One allowed transition at a time |
| `idempotencyKey` | string | Unique per account and logical confirmation |
| `failureCode` / `failureMessage` | optional | Present only for failed outcome |
| `reversibleUntil` | optional date/time | Required for scheduled reversible changes |

### Request state transitions

- `scheduled -> processing -> applied`
- `scheduled -> withdrawn` before `reversibleUntil`
- `scheduled -> failed`
- `processing -> applied`
- `processing -> failed`
- Terminal states `applied`, `failed`, and `withdrawn` do not transition.

No second non-terminal request may exist for the same subscription.

## Audit Entry

Immutable security and financial trace for a management action.

| Field | Type | Rules |
| --- | --- | --- |
| `id` | string | Stable audit identifier |
| `accountId` | string | Required |
| `requestId` | optional string | Included for request events |
| `actorId` / `actorRole` | string / role | Role recorded at action time |
| `action` | enum | quote, confirm, reject, apply, fail, withdraw |
| `occurredAt` | date/time | Server timestamp |
| `outcome` | enum | accepted, rejected, indeterminate, succeeded, failed |
| `reasonCode` | optional string | Machine-safe explanation |

Audit entries exclude raw payment details, credentials, and sensitive provider
payloads.

## Validation and concurrency rules

1. Role is re-read at quote and confirmation time.
2. Quote account and requested account must match.
3. Quote must be active, unexpired, and based on current subscription version.
4. Seat count must satisfy plan range and assigned-seat lower bound.
5. A non-terminal pending request blocks all new quotes that would mutate state.
6. Confirmation key uniqueness is enforced per account; replay returns the
   original request.
7. Withdrawal requires a reversible request, permitted role, and current time
   before `reversibleUntil`.
