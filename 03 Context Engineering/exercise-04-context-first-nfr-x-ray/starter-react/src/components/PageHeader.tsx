export function PageHeader({ tenant, tenants, onTenantChange }) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">Exercise 01</p>
        <h1>Vendor Risk Intake</h1>
        <p className="header-copy">
          Audit this enterprise workflow for production readiness, NFR gaps, and missing controls.
        </p>
      </div>

      <div className="tenant-switcher">
        <span>{tenant.region}</span>
        <select value={tenant.id} onChange={(event) => onTenantChange(event.target.value)}>
          {tenants.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
