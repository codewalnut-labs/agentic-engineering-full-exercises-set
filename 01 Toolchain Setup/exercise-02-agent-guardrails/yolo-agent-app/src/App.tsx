import { workflows } from "./data/workflows";
import { classifyWorkflow, summarizeGuardrailGap } from "./services/approvalEngine";

export default function App() {
  const classifications = workflows.map((workflow) => classifyWorkflow(workflow));
  const editableCount = classifications.filter((classification) => classification.agentEditable).length;
  const approvalCount = classifications.filter((classification) => classification.requiresApproval).length;

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Release operations</p>
        <h1>Agent safety dashboard</h1>
        <p>{summarizeGuardrailGap(workflows)}</p>
      </section>

      <section className="readiness-summary" aria-labelledby="readiness-summary-title">
        <div>
          <p className="eyebrow">Release overview</p>
          <h2 id="readiness-summary-title">Release Readiness Summary</h2>
        </div>
        <dl>
          <div>
            <dt>Editable by agent</dt>
            <dd>{editableCount}</dd>
          </div>
          <div>
            <dt>Require human approval</dt>
            <dd>{approvalCount}</dd>
          </div>
        </dl>
      </section>

      <section className="workflow-list">
        {workflows.map((workflow) => {
          const classification = classifyWorkflow(workflow);
          return (
            <article className="workflow-card" key={workflow.id}>
              <div>
                <p className="eyebrow">{workflow.id}</p>
                <h2>{workflow.name}</h2>
              </div>
              <p>{workflow.description}</p>
              <dl>
                <div>
                  <dt>Risk</dt>
                  <dd>{classification.risk}</dd>
                </div>
                <div>
                  <dt>Approval</dt>
                  <dd>{classification.requiresApproval ? "required" : "not required"}</dd>
                </div>
                <div>
                  <dt>Editable by agent</dt>
                  <dd>{classification.agentEditable ? "yes" : "no"}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </section>
    </main>
  );
}
