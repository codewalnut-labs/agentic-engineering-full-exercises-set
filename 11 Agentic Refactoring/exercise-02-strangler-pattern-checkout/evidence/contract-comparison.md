# Contract comparison

Both implementations return exactly the established public fields: `orderId`, `status`, `totalCents`, and `errorCode`. The total uses `subtotalCents + Math.round(subtotalCents * taxRateBps / 10000)`; the 1001-cent, 825-basis-point boundary therefore rounds to 1084 cents.

For an approved authorization, both legacy and the new card slice return the same orderId, `status: "paid"`, calculated totalCents, and null errorCode. For a declined authorization, both return the same orderId, `status: "failed"`, calculated totalCents, and `errorCode: "PAYMENT_DECLINED"`.

The card slice calls `authorize` once with only `orderId`, `amountCents`, and `paymentToken`. Protected fixtures compare the complete card result against legacy for both approved and declined outcomes, and assert one authorization call per implementation. Router failures return a canonical four-field `result` only when its exact keys, order, total, status, and error code satisfy the public contract; invalid results synthesize `PAYMENT_STATE_UNKNOWN`.
