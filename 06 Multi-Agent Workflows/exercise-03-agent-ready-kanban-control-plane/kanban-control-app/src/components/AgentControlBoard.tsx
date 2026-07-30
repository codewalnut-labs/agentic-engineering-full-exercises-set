import { agentCards } from "../data/agentCards"

export function AgentControlBoard() {
  return (
    <section className="panel wide" aria-label="Agent-ready Kanban board">
      <div className="section-heading">
        <div>
          <p className="kicker">Control plane</p>
          <h2>Agent-ready cards</h2>
        </div>
        <span>Integration owner controls merge order</span>
      </div>
      <div className="card-list">
        {agentCards.map((card) => (
          <article className="work-card" data-state={card.state} key={card.id}>
            <div>
              <strong>{card.id}</strong>
              <p>{card.title}</p>
              <span>{card.state}</span>
            </div>
            <dl>
              <dt>Owner</dt>
              <dd>{card.owner}</dd>
              <dt>Area</dt>
              <dd>{card.area}</dd>
              <dt>Branch</dt>
              <dd>{card.branch}</dd>
              <dt>Command</dt>
              <dd>{card.command}</dd>
              <dt>Merge criteria</dt>
              <dd>{card.mergeCriteria}</dd>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
