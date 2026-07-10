import { formatCurrency } from "../utils/risk";

export function MetricStrip({ metrics }) {
  const items = [
    { label: "Annual spend", value: formatCurrency(metrics.totalSpend) },
    { label: "Pending reviews", value: metrics.pendingCount },
    { label: "High risk", value: metrics.highRiskCount },
    { label: "SLA breaches", value: metrics.breachedSlaCount },
    { label: "Average risk", value: metrics.averageRisk },
  ];

  return (
    <section className="metric-strip" aria-label="Vendor risk metrics">
      {items.map((item) => (
        <article className="metric" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </article>
      ))}
    </section>
  );
}
