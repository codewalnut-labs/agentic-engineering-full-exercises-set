# Subscription Management Specification

## Overview

Allow account owners and billing admins to upgrade, downgrade, change seat counts, and cancel subscriptions through a self-service workflow. Viewers have read-only access. Changes respect billing-provider constraints on timing, pending requests, idempotency, and error translation.

## Requirements

### REQ-001: Role-based management permissions

Account owners and billing admins may initiate plan upgrades, downgrades, and seat changes. Viewers have read-only access. Only account owners may cancel a subscription.

### REQ-002: Immediate upgrades and seat increases with proration

Upgrades and seat increases apply immediately. The customer is charged with proration after confirming a billing preview.

### REQ-003: End-of-term downgrades and cancellations

Downgrades and cancellations are scheduled for the end of the current billing term. No immediate refund is issued.

### REQ-004: Billing preview before charged changes

Before confirming any upgrade or seat increase, the customer sees a billing preview showing price impact and proration.

### REQ-005: Single pending request enforcement

Only one plan-change request may be pending per account. When a pending request exists, new change submissions are blocked and the current pending state is displayed.

### REQ-006: Request lifecycle and failure recovery

Submitted changes progress through pending, succeeded, rejected, or failed states. Retries reuse the same idempotency key. Provider errors are translated into safe customer-facing messages.

### REQ-007: Out-of-scope boundaries

Enterprise approval workflows, payment method management, and invoice history are not included in this release.

## Acceptance Criteria

### AC-001: Viewer cannot submit changes

Given a user with the viewer role viewing an account subscription
When the user attempts to change the plan, seat count, or cancel
Then all change controls are disabled and no request is submitted

### AC-002: Billing admin cannot cancel

Given a user with the billing_admin role viewing an account subscription
When the user views management actions
Then upgrade, downgrade, and seat change controls are available but cancel is not offered

### AC-003: Account owner can cancel at end of term

Given an account owner with an active subscription
When the owner confirms cancellation after reviewing the effective date
Then the subscription remains active until the renewal date and cancellation is scheduled for that date

### AC-004: Upgrade applies immediately with proration

Given an account owner on the Growth plan
When the owner upgrades to Enterprise and confirms the billing preview
Then the plan changes immediately and a prorated charge is applied

### AC-005: Downgrade scheduled for end of billing term

Given a billing admin on the Enterprise plan
When the admin downgrades to Growth and confirms after seeing the effective date
Then the current plan remains active until the renewal date and the downgrade is scheduled for that date

### AC-006: Billing preview shown before charged change

Given a user initiating an upgrade or seat increase
When the user selects the new plan or seat count
Then a billing preview displays the prorated amount before the user can confirm

### AC-007: Second request blocked while pending

Given an account with a pending plan-change request such as ACCT-1188
When a user attempts to submit another plan or seat change
Then the submission is blocked and the existing pending state is displayed

### AC-008: Failed request shows safe error and allows idempotent retry

Given a submitted change that the billing provider rejects
When the final result arrives with a provider error
Then the UI shows a safe customer-facing message without internal details and offers retry using the same idempotency key

### AC-009: Enterprise approval is not offered

Given an enterprise account user viewing management options
When the user initiates any self-service change
Then no approval workflow step is presented and the change follows the standard preview-and-confirm flow

## Out of Scope

- Enterprise approval workflows (Q5)
- Payment method management
- Invoice history
- Immediate downgrade or cancellation with refund
