import { useState } from "react";
import type { WorkItem } from "../types";

interface EvidencePanelProps {
  item: WorkItem;
  evidence: string[];
  onCollect: () => Promise<void>;
}

export function EvidencePanel({ item, evidence, onCollect }: EvidencePanelProps) {
  const [collecting, setCollecting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function collect() {
    setCollecting(true);
    setMessage("Collecting evidence...");
    setError("");
    try {
      await onCollect();
      setMessage("Evidence collected.");
    } catch (reason) {
      setMessage("");
      setError(
        reason instanceof Error ? reason.message : "Evidence could not be collected.",
      );
    } finally {
      setCollecting(false);
    }
  }

  return (
    <section
      className="evidence-panel"
      aria-label="Evidence panel"
      aria-busy={collecting}
    >
      <div className="section-title">
        <h2>Evidence</h2>
        <button type="button" onClick={collect} disabled={collecting}>
          {collecting ? "Collecting..." : "Collect"}
        </button>
      </div>
      <p role="status" aria-live="polite">
        {message}
      </p>
      {error ? <p role="alert">{error}</p> : null}
      <div>
        {evidence.length === 0 ? (
          <p className="muted">No evidence collected for {item.name} yet.</p>
        ) : (
          <ul>
            {evidence.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
