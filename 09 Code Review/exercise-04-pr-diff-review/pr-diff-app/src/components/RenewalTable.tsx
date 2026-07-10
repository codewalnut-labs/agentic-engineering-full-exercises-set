import { canApproveRenewal } from "../permissions";
import { formatMoney, marginAfterDiscount } from "../pricing";

export function RenewalTable({
  currentUser,
  renewals,
  selectedId,
  onApprove,
  onRequestException,
  onSelect,
  projectedTotal,
}) {
  return (
    <section className="panel">
      <div className="table-heading">
        <div>
          <p className="section-kicker">PR review target</p>
          <h2>Renewal queue</h2>
        </div>
        <span>{renewals.length} renewals</span>
      </div>

      <div className="renewal-list">
        {renewals.map((renewal) => (
          <article
            className={renewal.id === selectedId ? "renewal-card selected" : "renewal-card"}
            key={renewal.id}
            onClick={() => onSelect(renewal.id)}
          >
            <div>
              <strong>{renewal.customer}</strong>
              <p>{renewal.note}</p>
              <div className="tag-row">
                {renewal.riskFlags.map((flag) => (
                  <span className="tag" key={flag}>
                    {flag}
                  </span>
                ))}
              </div>
            </div>

            <div className="money">
              <span className={`status ${renewal.status}`}>{renewal.status}</span>
              <strong>{formatMoney(projectedTotal(renewal))}</strong>
              <small>{formatMoney(marginAfterDiscount(renewal))} margin</small>
            </div>

            <div className="card-actions">
              <button
                type="button"
                disabled={!canApproveRenewal(currentUser, renewal)}
                onClick={(event) => {
                  event.stopPropagation();
                  onApprove(renewal.id);
                }}
              >
                Approve
              </button>
              <button
                className="secondary-button"
                type="button"
                disabled={renewal.status === "approved"}
                onClick={(event) => {
                  event.stopPropagation();
                  onRequestException(renewal.id);
                }}
              >
                Exception
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
