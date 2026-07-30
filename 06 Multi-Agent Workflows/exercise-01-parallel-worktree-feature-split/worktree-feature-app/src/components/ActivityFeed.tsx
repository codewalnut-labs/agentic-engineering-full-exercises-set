interface ActivityFeedProps {
  events: Array<{ id: string; actor: string; text: string; time: string }>;
}

export function ActivityFeed({ events }: ActivityFeedProps) {
  return (
    <section className="activity-feed" aria-label="Activity feed">
      <h2>Activity</h2>
      {events.length === 0 ? (
        <p>No activity yet.</p>
      ) : (
        events.map((event) => (
          <article key={event.id}>
            <time dateTime={event.time}>{event.time}</time>
            <div>
              <strong>{event.actor}</strong>
              <p>{event.text}</p>
            </div>
          </article>
        ))
      )}
    </section>
  );
}
