import { formatMoney } from "../pricing";

export function RenewalDashboard({ portfolio }) {
  const metrics = [
    { label: "Projected revenue", value: formatMoney(portfolio.projectedRevenue) },
    { label: "Exceptions", value: portfolio.exceptionCount },
    { label: "High discounts", value: portfolio.highDiscountCount },
    { label: "Weighted discount", value: `${Math.round(portfolio.weightedDiscount * 100)}%` },
  ];

  return (
    <section className="metric-strip" aria-label="Renewal metrics">
      {metrics.map((metric) => (
        <article className="metric-card" key={metric.label}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
        </article>
      ))}
    </section>
  );
}
