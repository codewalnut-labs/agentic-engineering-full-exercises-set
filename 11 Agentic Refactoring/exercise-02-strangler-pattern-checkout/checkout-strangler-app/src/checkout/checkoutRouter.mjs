const PUBLIC_RESULT_KEYS = ["errorCode", "orderId", "status", "totalCents"];

function totalCents(request) {
  return request.subtotalCents + Math.round(request.subtotalCents * request.taxRateBps / 10000);
}

function paymentStateUnknown(request) {
  return {
    orderId: request.orderId,
    status: "failed",
    totalCents: totalCents(request),
    errorCode: "PAYMENT_STATE_UNKNOWN",
  };
}

function canonicalPublicResult(result, request) {
  if (result === null || typeof result !== "object" || Array.isArray(result)) {
    return null;
  }

  const keys = Object.keys(result).sort();
  if (keys.length !== PUBLIC_RESULT_KEYS.length
      || keys.some((key, index) => key !== PUBLIC_RESULT_KEYS[index])) {
    return null;
  }

  const isPaid = result.status === "paid" && result.errorCode === null;
  const isKnownFailure = result.status === "failed"
    && (result.errorCode === "PAYMENT_DECLINED"
      || result.errorCode === "PAYMENT_STATE_UNKNOWN");
  if (result.orderId !== request.orderId
      || result.totalCents !== totalCents(request)
      || (!isPaid && !isKnownFailure)) {
    return null;
  }

  return {
    orderId: result.orderId,
    status: result.status,
    totalCents: result.totalCents,
    errorCode: result.errorCode,
  };
}

function isExplicitlyPreAuthorization(failure) {
  return failure !== null
    && typeof failure === "object"
    && !Array.isArray(failure)
    && Object.prototype.hasOwnProperty.call(failure, "authorizationCreated")
    && failure.authorizationCreated === false;
}

export async function routeCheckout(request, implementations) {
  if (request.paymentType !== "card" || implementations.cardSliceEnabled !== true) {
    return implementations.legacy(request);
  }

  try {
    return await implementations.card(request);
  } catch (failure) {
    if (isExplicitlyPreAuthorization(failure)) {
      return implementations.legacy(request);
    }

    return canonicalPublicResult(failure?.result, request)
      ?? paymentStateUnknown(request);
  }
}
