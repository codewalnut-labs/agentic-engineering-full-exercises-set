interface DataTableProps {
  rows: string[];
}

export function DataTable({ rows }: DataTableProps) {
  return <div>{rows.length}</div>;
}
