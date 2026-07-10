# Payment Feature Brief

## Scope

The project models a card payment integration for a checkout flow.

Map these parts from the code:

- Checkout UI
- Payment orchestrator
- Gateway adapter
- Payment authorization
- Payment capture
- Ledger entries
- Receipt notification
- Gateway webhook
- Failure handling

## Required Diagrams

Create four editable diagrams:

- `diagrams/payment-architecture.excalidraw`
- `diagrams/payment-process-flow.excalidraw`
- `diagrams/payment-sequence.excalidraw`
- `diagrams/payment-er.excalidraw`

## Source Files To Inspect

- `src/payment/paymentTypes.ts`
- `src/payment/paymentFixtures.ts`
- `src/payment/paymentGateway.ts`
- `src/payment/paymentOrchestrator.ts`
- `src/App.tsx`

## Diagram Scope

Architecture diagram:

- Show the checkout app, orchestrator, gateway adapter, payment gateway, ledger store, receipt notifier, webhook handler, and feature evidence panel.

Process flow diagram:

- Show cart review, payment method selection, intent creation, authorization, capture, ledger write, receipt, webhook reconciliation, success, and declined-payment branch.

Sequence diagram:

- Show shopper, checkout UI, payment orchestrator, gateway adapter, external gateway, ledger, receipt notifier, and webhook handler in call order.

ER diagram:

- Show customer, order, order item, payment method, payment intent, gateway transaction, ledger entry, webhook event, and receipt.

## Evidence Rule

The four diagram files are the evidence. Do not add unsupported actors, services, tables, or async steps.
