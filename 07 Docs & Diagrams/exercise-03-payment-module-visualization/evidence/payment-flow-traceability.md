# Payment Flow Traceability

The supplemental decision flow is intentionally not registered as a fifth verifier
diagram. The protected semantic verifier recognizes exactly four diagrams and the
required VIS-01 through VIS-16 marker placement remains unchanged.

| Flow element | Source evidence | Existing marker |
| --- | --- | --- |
| Checkout starts and creates the payment intent | `payment-workflow-app/src/App.tsx:6`; `payment-workflow-app/src/payment/paymentOrchestrator.ts:20-24` | VIS-01 |
| Authorization branches to approved or declined checkout | `payment-workflow-app/src/payment/paymentOrchestrator.ts:27-57` | VIS-02 |
| Approved checkout captures, records ledger entries, and sends a receipt | `payment-workflow-app/src/payment/paymentOrchestrator.ts:60-67` | VIS-03, VIS-04, VIS-05 |
| Gateway event is built and returned to the orchestrator | `payment-workflow-app/src/payment/paymentOrchestrator.ts:68`; `payment-workflow-app/src/payment/paymentGateway.ts:41-49` | VIS-06 |
| Reconciliation rejects invalid signatures and unknown references before mutation | `payment-workflow-app/src/payment/webhookReconciler.mjs:2-3` | VIS-08, VIS-09 |
| Reconciliation distinguishes duplicate events from first delivery | `payment-workflow-app/src/payment/webhookReconciler.mjs:4-7` | VIS-10, VIS-07, VIS-11 |

The flow chart keeps checkout and reconciliation as separate sections. It does not
claim that `GatewayAdapter` delivers an event into `WebhookHandler`; reconciliation
is independently invoked with a supplied event.
