function totalCents(request) {
  const taxCents = Math.round(request.subtotalCents * request.taxRateBps / 10000);
  return request.subtotalCents + taxCents;
}

function paymentResult(request, total, approved) {
  return approved
    ? {
        orderId: request.orderId,
        status: "paid",
        totalCents: total,
        errorCode: null,
      }
    : {
        orderId: request.orderId,
        status: "failed",
        totalCents: total,
        errorCode: "PAYMENT_DECLINED",
      };
}

/**
 * Create the card-only checkout slice.
 *
 * This duplicates the card branch's observable behavior at the strangler seam:
 * the tax calculation, authorization request, and public payment result are the
 * same as legacyCheckout. The legacy implementation is deliberately unchanged
 * so the router can switch card traffic back to it immediately.
 *
 * Authorization errors cross this boundary untouched. Only the router knows
 * whether an error proves that authorization was never created and can therefore
 * decide whether invoking legacy checkout would be safe.
 */
export function createCardCheckout({ authorize }) {
  return async function cardCheckout(request) {
    const total = totalCents(request);
    const authorization = await authorize({
      orderId: request.orderId,
      amountCents: total,
      paymentToken: request.paymentToken,
    });

    return paymentResult(request, total, authorization.approved);
  };
}
