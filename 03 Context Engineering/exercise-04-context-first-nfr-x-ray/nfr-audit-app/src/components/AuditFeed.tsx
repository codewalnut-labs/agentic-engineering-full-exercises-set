export function AuditFeed({ events }) {
  return (
    <aside className="panel audit-feed">
      <p className="section-kicker">Audit feed</p>
      <h2>Recent activity</h2>

      <ol>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.actor}</strong>
            <span>{event.action}</span>
            <time>{new Date(event.createdAt).toLocaleString()}</time>
          </li>
        ))}
      </ol>
    </aside>
  );
}
