export function summarizeTenant(requests) {
  const totalSpend = requests.reduce((total, request) => total + request.annualSpend, 0);
  const pendingCount = requests.filter((request) => request.status === "pending").length;
  const highRiskCount = requests.filter((request) => request.riskScore >= 75).length;
  const breachedSlaCount = requests.filter((request) => request.slaHours > 48).length;
  const averageRisk =
    requests.length === 0
      ? 0
      : Math.round(requests.reduce((total, request) => total + request.riskScore, 0) / requests.length);

  return {
    totalSpend,
    pendingCount,
    highRiskCount,
    breachedSlaCount,
    averageRisk,
  };
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
