import { labContract } from "./labContract";
import {
  architectureNodes,
  diagramTargets,
  erRelationships,
  formatMoney,
  runPaymentScenario,
  sequenceSteps,
} from "./payment/paymentOrchestrator";
import "./styles.css";

export default function App() {
  const payment = runPaymentScenario();

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="kicker">{labContract.competency}</p>
          <h1>{labContract.title}</h1>
          <p>{labContract.mission}</p>
        </div>
        <div className="timer-card">
          <span>Output</span>
          <strong>4</strong>
          <small>diagrams to generate</small>
        </div>
      </section>

      <section className="metrics">
        <article>
          <span>Payment total</span>
          <strong>{formatMoney(payment.order.total)}</strong>
          <small>{payment.order.items.length} checkout items</small>
        </article>
        <article>
          <span>Intent status</span>
          <strong>{payment.intent.status}</strong>
          <small>{payment.intent.id}</small>
        </article>
        <article>
          <span>Diagram evidence</span>
          <strong>{diagramTargets.length}</strong>
          <small>required files</small>
        </article>
      </section>

      <section className="grid">
        <section className="panel">
          <p className="kicker">Checkout</p>
          <h2>Payment Integration Feature</h2>
          <dl className="detail-list">
            <dt>Customer</dt>
            <dd>{payment.customer.name}</dd>
            <dt>Order</dt>
            <dd>{payment.order.id}</dd>
            <dt>Card</dt>
            <dd>
              {payment.paymentMethod.network} ending {payment.paymentMethod.last4}
            </dd>
            <dt>Gateway</dt>
            <dd>{payment.capture?.gatewayReference ?? payment.authorization?.gatewayReference}</dd>
            <dt>Receipt</dt>
            <dd>{payment.receipt.status}</dd>
          </dl>
        </section>

        <section className="panel">
          <p className="kicker">Required output</p>
          <h2>Diagram Files</h2>
          <ul className="compact-list">
            {diagramTargets.map((target) => (
              <li key={target}>{target}</li>
            ))}
          </ul>
        </section>

        <section className="panel wide">
          <div className="section-heading">
            <div>
              <p className="kicker">Architecture</p>
              <h2>Integration Nodes</h2>
            </div>
            <span>{architectureNodes.length} nodes</span>
          </div>
          <div className="node-grid">
            {architectureNodes.map((node) => (
              <span key={node}>{node}</span>
            ))}
          </div>
        </section>

        <section className="panel">
          <p className="kicker">Sequence</p>
          <h2>Call Order</h2>
          <ol className="timeline">
            {sequenceSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="panel">
          <p className="kicker">Observed run</p>
          <h2>Event Evidence</h2>
          <ol className="timeline">
            {payment.timeline.map((event) => (
              <li key={event.id}>
                <strong>{event.source}</strong>
                <span>{event.label}</span>
                <small>{event.evidence}</small>
              </li>
            ))}
          </ol>
        </section>

        <section className="panel wide">
          <p className="kicker">ER model</p>
          <h2>Relationships To Diagram</h2>
          <ul className="relationship-list">
            {erRelationships.map((relationship) => (
              <li key={relationship}>{relationship}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
