export function IntakeForm({ draft, onChange, onSubmit, tenant }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="panel intake-form" onSubmit={handleSubmit}>
      <div>
        <p className="section-kicker">New request</p>
        <h2>Vendor intake</h2>
      </div>

      <label>
        Vendor legal name
        <input
          placeholder="Example: LedgerCloud AI"
          value={draft.vendor}
          onChange={(event) => onChange("vendor", event.target.value)}
        />
      </label>

      <label>
        Owner email
        <input
          placeholder={tenant.reviewerEmail}
          value={draft.ownerEmail}
          onChange={(event) => onChange("ownerEmail", event.target.value)}
        />
      </label>

      <label>
        Department
        <select value={draft.department} onChange={(event) => onChange("department", event.target.value)}>
          <option>Procurement</option>
          <option>Finance</option>
          <option>Security</option>
          <option>Customer Operations</option>
          <option>Growth</option>
        </select>
      </label>

      <div className="field-row">
        <label>
          Estimated spend
          <input
            type="number"
            min="0"
            value={draft.estimatedSpend}
            onChange={(event) => onChange("estimatedSpend", event.target.value)}
          />
        </label>

        <label>
          Urgency
          <select value={draft.urgency} onChange={(event) => onChange("urgency", event.target.value)}>
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
          </select>
        </label>
      </div>

      <label>
        Data types
        <input
          placeholder="customer PII, contracts, logs"
          value={draft.dataTypes}
          onChange={(event) => onChange("dataTypes", event.target.value)}
        />
      </label>

      <label>
        Business justification
        <textarea
          placeholder="Why the business needs this vendor"
          value={draft.justification}
          onChange={(event) => onChange("justification", event.target.value)}
        />
      </label>

      <button type="submit">Submit risk review</button>
    </form>
  );
}
