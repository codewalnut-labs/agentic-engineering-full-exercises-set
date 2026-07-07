import { approvalHint } from "../permissions";
import { formatMoney, marginAfterDiscount } from "../pricing";

export function ApprovalDrawer({
  currentUser,
  renewal,
  onApprove,
  onRequestException,
  projectedTotal,
}) {
  if (!renewal) {
    return (
      <aside className="panel drawer">
        <h2>No renewal selected</h2>
      </aside>
    );
  }

  return (
    <aside className="panel drawer">
      <p className="section-kicker">Approval detail</p>
      <h2>{renewal.customer}</h2>

      <dl className="detail-list">
        <div>
          <dt>Owner</dt>
          <dd>{renewal.ownerEmail}</dd>
        </div>
        <div>
          <dt>Region</dt>
          <dd>{renewal.region}</dd>
        </div>
        <div>
          <dt>Discount</dt>
          <dd>{Math.round(renewal.discountPercent * 100)}%</dd>
        </div>
        <div>
          <dt>Projected total</dt>
          <dd>{formatMoney(projectedTotal(renewal))}</dd>
        </div>
        <div>
          <dt>Margin</dt>
          <dd>{formatMoney(marginAfterDiscount(renewal))}</dd>
        </div>
        <div>
          <dt>Due in</dt>
          <dd>{renewal.dueInDays} days</dd>
        </div>
      </dl>

      <p className="approval-hint">{approvalHint(currentUser, renewal)}</p>

      <div className="drawer-actions">
        <button type="button" onClick={() => onApprove(renewal.id)}>
          Approve renewal
        </button>
        <button
          className="secondary-button"
          type="button"
          disabled={renewal.status === "approved"}
          onClick={() => onRequestException(renewal.id)}
        >
          Request exception
        </button>
      </div>
    </aside>
  );
}
