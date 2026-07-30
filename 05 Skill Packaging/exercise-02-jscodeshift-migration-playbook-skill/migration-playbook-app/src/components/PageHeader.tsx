interface PageHeaderProps {
  readonly title: string
  readonly subtitle: string
  readonly competency: string
}

export function PageHeader({ title, subtitle, competency }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">{competency}</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="header-actions" aria-label="Exercise actions">
        <button type="button">Export evidence</button>
        <button type="button">Run checks</button>
      </div>
    </header>
  );
}
