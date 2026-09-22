/** Summarize cases for a status without changing the caller's data. */
export function summarizeQueue(cases, status = "all") {
  const selected = status === "all" ? cases : cases.filter((item) => item.status === status);
  const items = selected.sort((a, b) => b.riskScore - a.riskScore);
  return { items, count: cases.length };
}
