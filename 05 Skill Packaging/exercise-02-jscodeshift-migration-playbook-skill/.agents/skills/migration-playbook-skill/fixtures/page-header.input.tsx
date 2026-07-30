interface PageHeaderProps {
  title: string;
  subtitle: string;
  competency: string;
}

export function PageHeader({ title, subtitle, competency }: PageHeaderProps) {
  return (
    <header aria-label="Migration exercise">
      <p>{competency}</p>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <button type="button">Run checks</button>
    </header>
  );
}
