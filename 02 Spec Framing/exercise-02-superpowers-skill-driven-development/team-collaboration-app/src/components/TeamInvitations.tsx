import { useState } from "react";
import { acceptInvitation, createInvitation, revokeInvitation } from "../services/invitationService";
import { now } from "../services/clock";
import type { InvitationRole, InvitationState } from "../types";

interface TeamInvitationsProps {
  state: InvitationState;
  onStateChange: (state: InvitationState) => void;
}

let invitationSequence = 0;
let memberSequence = 0;

export default function TeamInvitations({ state, onStateChange }: TeamInvitationsProps) {
  const [actorId, setActorId] = useState(state.members[0]?.id ?? "");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<InvitationRole>("member");
  const [message, setMessage] = useState<string | null>(null);

  function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    invitationSequence += 1;
    const result = createInvitation(state, {
      invitationId: `INV-${Date.now()}-${invitationSequence}`,
      actorId,
      email,
      role,
      now: now()
    });
    if (result.ok) {
      onStateChange(result.state);
      setEmail("");
      setMessage(`Invited ${result.invitation?.email}.`);
    } else {
      setMessage(`Could not invite: ${result.code}`);
    }
  }

  function handleAccept(invitationId: string) {
    memberSequence += 1;
    const result = acceptInvitation(state, {
      invitationId,
      memberId: `USR-NEW-${memberSequence}`,
      now: now()
    });
    onStateChange(result.state);
    setMessage(result.ok ? `Accepted ${invitationId}.` : `Could not accept: ${result.code}`);
  }

  function handleRevoke(invitationId: string) {
    const result = revokeInvitation(state, { invitationId, actorId, now: now() });
    onStateChange(result.state);
    setMessage(result.ok ? `Revoked ${invitationId}.` : `Could not revoke: ${result.code}`);
  }

  return (
    <section className="invitations">
      <h2>Team Invitations</h2>

      <label>
        Acting as
        <select value={actorId} onChange={(event) => setActorId(event.target.value)}>
          {state.members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name} ({member.role}
              {member.status === "suspended" ? ", suspended" : ""})
            </option>
          ))}
        </select>
      </label>

      <form onSubmit={handleCreate} className="invite-form">
        <input
          type="email"
          placeholder="person@example.test"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <select value={role} onChange={(event) => setRole(event.target.value as InvitationRole)}>
          <option value="member">Member</option>
          <option value="guest" disabled={!state.policy.allowGuestInvites}>
            Guest{state.policy.allowGuestInvites ? "" : " (disabled by policy)"}
          </option>
        </select>
        <button type="submit">Invite</button>
      </form>

      {message && <p className="invite-message">{message}</p>}

      <ul className="invitation-list">
        {state.invitations.map((invitation) => (
          <li key={invitation.id}>
            <span>{invitation.email}</span>
            <span>{invitation.role}</span>
            <span>{invitation.status}</span>
            <span>expires {invitation.expiresAt}</span>
            {invitation.status === "pending" && (
              <>
                <button type="button" onClick={() => handleAccept(invitation.id)}>
                  Accept
                </button>
                <button type="button" onClick={() => handleRevoke(invitation.id)}>
                  Revoke
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
