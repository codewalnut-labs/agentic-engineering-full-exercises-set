/** Summarize all cases without changing the caller's data. */
export function summarizeQueue(cases) {
  const items = [...cases].sort((a, b) => b.riskScore - a.riskScore);
  return { items, count: items.length };
}
