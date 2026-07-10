import { accounts } from "./data/subscriptions";
import { getRenewalRisk, summarizeSubscription } from "./services/subscriptionService";

export default function App() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Billing workspace</p>
        <h1>Subscription overview</h1>
        <p>Current state shows subscription data only. The management workflow is intentionally unspecified.</p>
      </section>

      <section className="account-grid">
        {accounts.map((account) => (
          <article className="account-card" key={account.id}>
            <div>
              <p className="eyebrow">{account.id}</p>
              <h2>{account.company}</h2>
            </div>
            <p>{summarizeSubscription(account)}</p>
            <dl>
              <div>
                <dt>Plan</dt>
                <dd>{account.planName}</dd>
              </div>
              <div>
                <dt>Owner role</dt>
                <dd>{account.ownerRole}</dd>
              </div>
              <div>
                <dt>Renewal risk</dt>
                <dd>{getRenewalRisk(account)}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </main>
  );
}
