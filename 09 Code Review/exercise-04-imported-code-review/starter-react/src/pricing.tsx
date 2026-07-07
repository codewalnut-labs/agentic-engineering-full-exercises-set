export function projectedTotal(renewal) {
  const cappedDiscount = Math.min(renewal.discountPercent, 0.25);
  return Math.round(renewal.contractValue * (1 - cappedDiscount) + renewal.expansionARR);
}

export function marginAfterDiscount(renewal) {
  return projectedTotal(renewal) * renewal.grossMarginPercent;
}

export function summarizePortfolio(renewals) {
  const projectedRevenue = renewals.reduce((total, renewal) => total + projectedTotal(renewal), 0);
  const exceptionCount = renewals.filter((renewal) => renewal.status === "exception-requested").length;
  const highDiscountCount = renewals.filter((renewal) => renewal.discountPercent > 0.25).length;
  const totalContractValue = renewals.reduce((total, renewal) => total + renewal.contractValue, 0);
  const weightedDiscount =
    totalContractValue === 0
      ? 0
      : renewals.reduce((total, renewal) => total + renewal.discountPercent * renewal.contractValue, 0) /
        totalContractValue;

  return {
    projectedRevenue,
    exceptionCount,
    highDiscountCount,
    weightedDiscount,
  };
}

export function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
