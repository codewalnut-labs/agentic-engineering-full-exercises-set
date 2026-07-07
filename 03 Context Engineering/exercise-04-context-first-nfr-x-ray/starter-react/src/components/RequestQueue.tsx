import { formatCurrency } from "../utils/risk";

export function RequestQueue({ query, requests, selectedId, onQueryChange, onSelect }) {
  return (
    <section className="panel queue-panel">
      <div className="queue-header">
        <div>
          <p className="section-kicker">Review queue</p>
          <h2>Vendor requests</h2>
        </div>
        <input
          placeholder="Search vendor, owner, or department"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>

      <div className="request-list">
        {requests.map((request, index) => (
          <button
            type="button"
            className={request.id === selectedId ? "request-card active-card" : "request-card"}
            key={index}
            onClick={() => onSelect(request.id)}
          >
            <span>
              <strong>{request.vendor}</strong>
              <small>{request.ownerEmail}</small>
            </span>
            <span>
              <strong>{formatCurrency(request.annualSpend)}</strong>
              <small>{request.department}</small>
            </span>
            <span className={`status ${request.status}`}>{request.status}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
