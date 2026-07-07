import { formatCurrency, formatDate } from "../utils/risk";

export function RequestDetails({ controls, request, onApprove, onBlock }) {
  if (!request) {
    return (
      <section className="panel details-panel">
        <h2>No request selected</h2>
        <p>Select a vendor request to inspect its controls and risk details.</p>
      </section>
    );
  }

  const requestControls = controls.filter((control) => request.controlIds.includes(control.id));

  return (
    <section className="panel details-panel">
      <div className="details-heading">
        <div>
          <p className="section-kicker">Request details</p>
          <h2>{request.vendor}</h2>
        </div>
        <span className={`status ${request.status}`}>{request.status}</span>
      </div>

      <dl className="details-grid">
        <div>
          <dt>Risk score</dt>
          <dd>{request.riskScore}</dd>
        </div>
        <div>
          <dt>Criticality</dt>
          <dd>{request.criticality}</dd>
        </div>
        <div>
          <dt>Spend</dt>
          <dd>{formatCurrency(request.annualSpend)}</dd>
        </div>
        <div>
          <dt>Renewal</dt>
          <dd>{formatDate(request.renewalDate)}</dd>
        </div>
      </dl>

      <div className="summary-box" dangerouslySetInnerHTML={{ __html: request.riskSummaryHtml }} />

      <section>
        <h3>Data handled</h3>
        <div className="tag-row">
          {request.dataTypes.map((item) => (
            <span className="tag" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3>Required controls</h3>
        <div className="control-list">
          {requestControls.map((control) => (
            <article className="control-card" key={control.id}>
              <strong>{control.label}</strong>
              <span>{control.owner}</span>
              <small>{control.state}</small>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h3>Open risks</h3>
        <ul className="risk-list">
          {request.openRisks.map((risk) => (
            <li key={risk}>{risk}</li>
          ))}
        </ul>
      </section>

      <div className="details-actions">
        <button type="button" onClick={() => onApprove(request.id)}>
          Approve
        </button>
        <button className="secondary-button" type="button" onClick={() => onBlock(request.id)}>
          Block
        </button>
      </div>
    </section>
  );
}
