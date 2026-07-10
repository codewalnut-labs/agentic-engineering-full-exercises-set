import { approvedCard, demoCart, demoCustomer } from "./paymentFixtures";
import { authorizePayment, buildGatewayWebhook, capturePayment } from "./paymentGateway";
import type {
  CheckoutOrder,
  Customer,
  GatewayTransaction,
  LedgerEntry,
  Money,
  OrderItem,
  PaymentEvent,
  PaymentIntent,
  PaymentMethod,
  PaymentRecord,
  Receipt,
} from "./paymentTypes";

const taxRate = 0.0825;

export const diagramTargets = [
  "diagrams/payment-architecture.excalidraw",
  "diagrams/payment-process-flow.excalidraw",
  "diagrams/payment-sequence.excalidraw",
  "diagrams/payment-er.excalidraw",
];

export const architectureNodes = [
  "Checkout UI",
  "Payment orchestrator",
  "Gateway adapter",
  "External payment gateway",
  "Ledger entries",
  "Receipt notifier",
  "Webhook handler",
];

export const sequenceSteps = [
  "Shopper confirms checkout",
  "Checkout UI creates payment intent",
  "Payment orchestrator requests authorization",
  "Gateway adapter calls external gateway",
  "Payment orchestrator captures approved authorization",
  "Ledger records authorization and capture",
  "Notifier queues receipt",
  "Webhook handler reconciles gateway event",
];

export const erRelationships = [
  "Customer 1..n CheckoutOrder",
  "CheckoutOrder 1..n OrderItem",
  "CheckoutOrder 1..1 PaymentIntent",
  "PaymentIntent n..1 PaymentMethod",
  "PaymentIntent 1..n GatewayTransaction",
  "PaymentIntent 1..n LedgerEntry",
  "GatewayTransaction 1..n WebhookEvent",
  "CheckoutOrder 1..1 Receipt",
];

export function runPaymentScenario(paymentMethod: PaymentMethod = approvedCard): PaymentRecord {
  const order = createOrder(demoCustomer, demoCart);
  const intent = createPaymentIntent(order, demoCustomer, paymentMethod);
  const timeline: PaymentEvent[] = [
    event("evt_checkout", "Checkout UI", "Shopper confirms checkout", "src/App.tsx"),
    event("evt_intent", "Payment Orchestrator", "Create payment intent", "createPaymentIntent"),
  ];

  const authorization = authorizePayment({
    intentId: intent.id,
    amount: intent.amount,
    paymentMethod,
    idempotencyKey: intent.idempotencyKey,
  });

  timeline.push(event("evt_authorize", "Gateway Adapter", authorization.message, "authorizePayment"));

  if (authorization.status === "declined") {
    const failedIntent = failIntent(intent, authorization);
    const failedOrder = { ...order, status: "payment_failed" as const };
    const failureEntry = createLedgerEntry("ledger_failed", failedOrder, failedIntent, "payment_failed", "rejected");
    const failureReceipt = createReceipt(failedOrder, demoCustomer, "blocked");

    timeline.push(
      event("evt_failed_ledger", "Ledger", "Record declined payment", "createLedgerEntry"),
      event("evt_failed_receipt", "Notifier", "Block receipt for declined payment", "createReceipt"),
    );

    return {
      customer: demoCustomer,
      order: failedOrder,
      paymentMethod,
      intent: failedIntent,
      authorization,
      ledgerEntries: [failureEntry],
      webhookEvents: [buildGatewayWebhook(authorization)],
      receipt: failureReceipt,
      timeline,
    };
  }

  const capture = capturePayment(authorization);
  const capturedIntent = captureIntent(intent, capture);
  const paidOrder = { ...order, status: "paid" as const };
  const ledgerEntries = [
    createLedgerEntry("ledger_auth", paidOrder, capturedIntent, "authorization_hold", "posted"),
    createLedgerEntry("ledger_capture", paidOrder, capturedIntent, "capture", "posted"),
  ];
  const receipt = createReceipt(paidOrder, demoCustomer, "sent");
  const webhook = buildGatewayWebhook(capture);

  timeline.push(
    event("evt_capture", "Payment Orchestrator", "Capture approved authorization", "capturePayment"),
    event("evt_ledger", "Ledger", "Post authorization and capture entries", "createLedgerEntry"),
    event("evt_receipt", "Notifier", "Send customer receipt", "createReceipt"),
    event("evt_webhook", "Webhook Handler", "Reconcile captured payment event", "buildGatewayWebhook"),
  );

  return {
    customer: demoCustomer,
    order: paidOrder,
    paymentMethod,
    intent: capturedIntent,
    authorization,
    capture,
    ledgerEntries,
    webhookEvents: [webhook],
    receipt,
    timeline,
  };
}

export function formatMoney(money: Money) {
  return new Intl.NumberFormat("en-US", {
    currency: money.currency,
    style: "currency",
  }).format(money.cents / 100);
}

function createOrder(customer: Customer, items: OrderItem[]): CheckoutOrder {
  const subtotal = money(items.reduce((sum, item) => sum + item.unitPrice.cents * item.quantity, 0));
  const tax = money(Math.round(subtotal.cents * taxRate));
  const total = money(subtotal.cents + tax.cents);

  return {
    id: "ord_9001",
    customerId: customer.id,
    items,
    subtotal,
    tax,
    total,
    status: "payment_pending",
  };
}

function createPaymentIntent(order: CheckoutOrder, customer: Customer, method: PaymentMethod): PaymentIntent {
  return {
    id: "pi_ord_9001",
    orderId: order.id,
    customerId: customer.id,
    paymentMethodId: method.id,
    amount: order.total,
    status: "created",
    idempotencyKey: `pay_${order.id}_${method.last4}`,
  };
}

function captureIntent(intent: PaymentIntent, capture: GatewayTransaction): PaymentIntent {
  return {
    ...intent,
    status: "captured",
    gatewayReference: capture.gatewayReference,
  };
}

function failIntent(intent: PaymentIntent, authorization: GatewayTransaction): PaymentIntent {
  return {
    ...intent,
    status: "declined",
    gatewayReference: authorization.gatewayReference,
    failureReason: authorization.message,
  };
}

function createLedgerEntry(
  id: string,
  order: CheckoutOrder,
  intent: PaymentIntent,
  type: LedgerEntry["type"],
  status: LedgerEntry["status"],
): LedgerEntry {
  return {
    id,
    orderId: order.id,
    paymentIntentId: intent.id,
    type,
    amount: intent.amount,
    status,
  };
}

function createReceipt(order: CheckoutOrder, customer: Customer, status: Receipt["status"]): Receipt {
  return {
    id: `rcpt_${order.id}`,
    orderId: order.id,
    customerEmail: customer.email,
    status,
  };
}

function money(cents: number): Money {
  return { cents, currency: "USD" };
}

function event(id: string, source: PaymentEvent["source"], label: string, evidence: string): PaymentEvent {
  return { id, source, label, evidence };
}
