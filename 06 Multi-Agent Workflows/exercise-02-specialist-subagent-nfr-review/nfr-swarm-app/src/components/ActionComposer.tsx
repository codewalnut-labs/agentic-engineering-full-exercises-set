import { useEffect, useState } from "react";
import type { ActionDraft, WorkItem, WorkflowStatus } from "../types";

interface ActionComposerProps {
  item: WorkItem;
  onSave: (draft: ActionDraft) => Promise<void>;
}

const statuses: WorkflowStatus[] = ["Queued", "Ready", "In Review", "Blocked", "Escalated"];

export function ActionComposer({ item, onSave }: ActionComposerProps) {
  const [owner, setOwner] = useState(item.owner);
  const [status, setStatus] = useState<WorkflowStatus>(item.status);
  const [note, setNote] = useState(item.note);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setOwner(item.owner);
    setStatus(item.status);
    setNote(item.note);
    setMessage("");
    setError("");
  }, [item.id]);

  async function submit() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await onSave({ owner, note, status });
      setMessage("Draft saved.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Draft could not be saved.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section
      className="action-composer"
      aria-label="Action composer"
      aria-busy={saving}
    >
      <h2>Draft next action</h2>
      <label>
        Owner
        <input value={owner} onChange={(event) => setOwner(event.target.value)} />
      </label>
      <label>
        Status
        <select value={status} onChange={(event) => setStatus(event.target.value as WorkflowStatus)}>
          {statuses.map((candidate) => (
            <option key={candidate}>{candidate}</option>
          ))}
        </select>
      </label>
      <label>
        Reviewer note
        <textarea
          aria-describedby="reviewer-note-help"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={4}
        />
      </label>
      <small id="reviewer-note-help">At least 8 characters required.</small>
      <button type="button" onClick={submit} disabled={saving || note.trim().length < 8}>
        {saving ? "Saving..." : "Save draft"}
      </button>
      {message ? <p role="status">{message}</p> : null}
      {error ? <p role="alert">{error}</p> : null}
    </section>
  );
}
