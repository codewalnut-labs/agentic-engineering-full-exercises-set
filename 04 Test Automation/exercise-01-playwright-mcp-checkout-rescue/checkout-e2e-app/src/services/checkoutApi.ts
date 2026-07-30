export interface TaxQuote {
  postalCode: string;
  tax: number;
  total: number;
}

export interface PaymentRequest {
  amount: number;
  cardNumber: string;
  customerName: string;
}

export type PaymentResult =
  | { status: "approved"; orderId: string }
  | { status: "declined"; reason: string };

async function postJson(url: string, body: unknown): Promise<unknown> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function quoteTax(postalCode: string): Promise<TaxQuote> {
  const response = await postJson("/api/tax-quote", { postalCode });

  if (
    typeof response !== "object" ||
    response === null ||
    !("postalCode" in response) ||
    !("tax" in response) ||
    !("total" in response) ||
    typeof response.postalCode !== "string" ||
    typeof response.tax !== "number" ||
    typeof response.total !== "number"
  ) {
    throw new Error("Tax quote response was invalid");
  }

  return {
    postalCode: response.postalCode,
    tax: response.tax,
    total: response.total,
  };
}

export async function authorizePayment(request: PaymentRequest): Promise<PaymentResult> {
  const response = await postJson("/api/payments/authorize", request);

  if (typeof response !== "object" || response === null || !("status" in response)) {
    throw new Error("Payment response was invalid");
  }

  if (
    response.status === "approved" &&
    "orderId" in response &&
    typeof response.orderId === "string"
  ) {
    return {
      status: "approved",
      orderId: response.orderId,
    };
  }

  if (
    response.status === "declined" &&
    "reason" in response &&
    typeof response.reason === "string"
  ) {
    return {
      status: "declined",
      reason: response.reason,
    };
  }

  throw new Error("Payment response was invalid");
}
