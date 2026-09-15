import { useState } from "react";
import { members, workspacePolicy } from "./data/team";
import { canManageInvitations, summarizeMemberAccess } from "./services/teamPolicy";
import TeamInvitations from "./components/TeamInvitations";
import type { InvitationState } from "./types";

export default function App() {
  const [invitationState, setInvitationState] = useState<InvitationState>({
    members,
    invitations: [],
    policy: workspacePolicy
  });

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Workspace admin</p>
        <h1>Team collaboration console</h1>
        <p>Members and roles exist. Invitation behavior is the unclear feature request for this exercise.</p>
      </section>

      <section className="member-grid">
        {invitationState.members.map((member) => (
          <article className="member-card" key={member.id}>
            <div>
              <p className="eyebrow">{member.id}</p>
              <h2>{member.name}</h2>
            </div>
            <p>{summarizeMemberAccess(member)}</p>
            <dl>
              <div>
                <dt>Role</dt>
                <dd>{member.role}</dd>
              </div>
              <div>
                <dt>Can manage invites</dt>
                <dd>{canManageInvitations(member, invitationState.policy) ? "yes" : "no"}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{member.status}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>

      <TeamInvitations state={invitationState} onStateChange={setInvitationState} />
    </main>
  );
}
