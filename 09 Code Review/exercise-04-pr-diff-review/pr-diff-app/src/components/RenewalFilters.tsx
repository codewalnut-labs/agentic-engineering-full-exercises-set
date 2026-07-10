export function RenewalFilters({
  query,
  segment,
  status,
  onQueryChange,
  onSegmentChange,
  onStatusChange,
}) {
  return (
    <section className="panel filters">
      <label>
        Search
        <input
          placeholder="Customer or owner"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>

      <label>
        Status
        <select value={status} onChange={(event) => onStatusChange(event.target.value)}>
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="exception-requested">Exception requested</option>
        </select>
      </label>

      <label>
        Segment
        <select value={segment} onChange={(event) => onSegmentChange(event.target.value)}>
          <option value="all">All segments</option>
          <option value="commercial">Commercial</option>
          <option value="enterprise">Enterprise</option>
          <option value="strategic">Strategic</option>
        </select>
      </label>
    </section>
  );
}
