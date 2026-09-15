# Team Invitations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this
> plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the throwing `invitationService.ts` stub with a working, contract-compliant
invitation lifecycle, and add a visible "Team Invitations" UI section that uses only that service.

**Architecture:** A pure, immutable service module (`src/services/invitationService.ts`) implements
`createInvitation`/`acceptInvitation`/`revokeInvitation` against the types in `src/types.ts`. A
small monotonic clock helper (`src/services/clock.ts`) supplies `now()`. A new React component
(`src/components/TeamInvitations.tsx`) owns the `InvitationState` and is the only caller of the
service; `src/App.tsx` renders it and switches its member grid to the same lifted state.

**Tech Stack:** React 19 + TypeScript (Vite), Node's built-in `node:test` runner
(`node --experimental-strip-types --test`).

**Spec:** `docs/superpowers/specs/2026-09-15-team-invitations-design.md`

## Global Constraints

- Do not modify protected files (see `challenge-integrity.json`): `src/types.ts`,
  `src/data/team.ts`, `src/services/teamPolicy.ts`, `src/legacy/quickInvite.ts`,
  `tests/invitationService.test.ts`, and the root docs/scripts/config files listed there.
- `invitationService.ts` must never import or reuse `src/legacy/quickInvite.ts`.
- Every service function returns a new `state` on success and the *same* input `state` reference,
  untouched, on every rejection — never mutate the input.
- Email addresses are trimmed and lowercased before every comparison and before storage.
- The UI must not re-implement any lifecycle rule — it only calls
  `src/services/invitationService.ts`.

---

### Task 1: Confirm RED on the protected test suite

**Files:**
- Test: `tests/invitationService.test.ts` (read-only, protected — do not edit)

**Interfaces:**
- Consumes: nothing yet.
- Produces: a recorded failing baseline for `evidence/tdd.md`.

- [ ] **Step 1: Run the fixed invitation test suite**

Run: `npm run test:invitations`
Expected: non-zero exit code; every test fails because
`src/services/invitationService.ts` currently throws
`"Invitation lifecycle is not implemented"` for all three exports.

- [ ] **Step 2: Record the exact output**

Copy the full unedited stdout/stderr and the exit code into `evidence/tdd.md` under `## Red`.

---

### Task 2: Implement the invitation lifecycle service

**Files:**
- Modify: `src/services/invitationService.ts` (replace the stub body entirely)
- Test: `tests/invitationService.test.ts` (protected, run only — do not edit)

**Interfaces:**
- Consumes: `AcceptInvitationInput`, `CreateInvitationInput`, `InvitationActionResult`,
  `InvitationErrorCode`, `InvitationRole`, `InvitationState`, `RevokeInvitationInput`,
  `TeamInvitation`, `TeamMember` from `../types` (all already defined, protected).
- Produces: `createInvitation(state, input)`, `acceptInvitation(state, input)`,
  `revokeInvitation(state, input)` — the exact three named exports
  `tests/invitationService.test.ts` imports.

- [ ] **Step 1: Write the full implementation**

```typescript
import type {
  AcceptInvitationInput,
  CreateInvitationInput,
  InvitationActionResult,
  InvitationErrorCode,
  InvitationRole,
  InvitationState,
  RevokeInvitationInput,
  TeamInvitation,
  TeamMember
} from "../types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INVITATION_ROLES: InvitationRole[] = ["member", "guest"];

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

function isAuthorizedActor(state: InvitationState, actorId: string): boolean {
  const actor = state.members.find((member) => member.id === actorId);
  return actor !== undefined && actor.status === "active" && state.policy.inviteRoles.includes(actor.role);
}

function reject(state: InvitationState, code: InvitationErrorCode): InvitationActionResult {
  return { ok: false, state, code };
}

function addDays(iso: string, days: number): string {
  const date = new Date(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString();
}

export function createInvitation(state: InvitationState, input: CreateInvitationInput): InvitationActionResult {
  if (!isAuthorizedActor(state, input.actorId)) return reject(state, "UNAUTHORIZED");
  if (!INVITATION_ROLES.includes(input.role)) return reject(state, "INVALID_ROLE");
  if (input.role === "guest" && !state.policy.allowGuestInvites) return reject(state, "GUEST_DISABLED");

  const email = normalizeEmail(input.email);
  if (!isValidEmail(email)) return reject(state, "INVALID_EMAIL");
  if (state.members.some((member) => normalizeEmail(member.email) === email)) {
    return reject(state, "MEMBER_EXISTS");
  }

  const hasUnexpiredPending = state.invitations.some(
    (invitation) =>
      normalizeEmail(invitation.email) === email &&
      invitation.status === "pending" &&
      invitation.expiresAt > input.now
  );
  if (hasUnexpiredPending) return reject(state, "INVITATION_PENDING");

  if (state.invitations.some((invitation) => invitation.id === input.invitationId)) {
    return reject(state, "DUPLICATE_INVITATION_ID");
  }

  const invitation: TeamInvitation = {
    id: input.invitationId,
    email,
    role: input.role,
    invitedBy: input.actorId,
    createdAt: input.now,
    expiresAt: addDays(input.now, state.policy.defaultInviteExpiryDays),
    status: "pending"
  };

  return {
    ok: true,
    state: { ...state, invitations: [...state.invitations, invitation] },
    invitation
  };
}

export function acceptInvitation(state: InvitationState, input: AcceptInvitationInput): InvitationActionResult {
  const invitation = state.invitations.find((item) => item.id === input.invitationId);
  if (!invitation) return reject(state, "INVITATION_NOT_FOUND");
  if (invitation.status !== "pending") return reject(state, "INVITATION_FINAL");
  if (invitation.expiresAt <= input.now) return reject(state, "INVITATION_EXPIRED");
  if (state.members.some((member) => member.id === input.memberId)) return reject(state, "DUPLICATE_MEMBER_ID");

  const acceptedInvitation: TeamInvitation = { ...invitation, status: "accepted" };
  const newMember: TeamMember = {
    id: input.memberId,
    name: invitation.email,
    email: invitation.email,
    role: invitation.role,
    status: "active",
    lastActiveDays: 0
  };

  return {
    ok: true,
    state: {
      ...state,
      members: [...state.members, newMember],
      invitations: state.invitations.map((item) => (item.id === invitation.id ? acceptedInvitation : item))
    },
    invitation: acceptedInvitation
  };
}

export function revokeInvitation(state: InvitationState, input: RevokeInvitationInput): InvitationActionResult {
  if (!isAuthorizedActor(state, input.actorId)) return reject(state, "UNAUTHORIZED");

  const invitation = state.invitations.find((item) => item.id === input.invitationId);
  if (!invitation) return reject(state, "INVITATION_NOT_FOUND");
  if (invitation.status !== "pending") return reject(state, "INVITATION_FINAL");
  if (invitation.expiresAt <= input.now) return reject(state, "INVITATION_EXPIRED");

  const revokedInvitation: TeamInvitation = { ...invitation, status: "revoked" };
  return {
    ok: true,
    state: {
      ...state,
      invitations: state.invitations.map((item) => (item.id === invitation.id ? revokedInvitation : item))
    },
    invitation: revokedInvitation
  };
}
```

- [ ] **Step 2: Run the fixed suite and verify GREEN**

Run: `npm run test:invitations`
Expected: exit code 0, all 16 tests pass (`# pass 16`, `# fail 0` in `node:test` TAP output).

- [ ] **Step 3: Record the exact output**

Copy the full unedited stdout/stderr and the exit code into `evidence/tdd.md` under `## Green`.

- [ ] **Step 4: Commit**

```bash
git add src/services/invitationService.ts
git commit -m "feat(invitations): implement invitation lifecycle service"
```

---

### Task 3: Add a monotonic clock helper

**Files:**
- Create: `src/services/clock.ts`

**Interfaces:**
- Consumes: nothing (uses only `Date.now()` and `performance.now()`).
- Produces: `now(): string` — an ISO-8601 timestamp, used by `src/components/TeamInvitations.tsx`
  as the `now` field of every `invitationService` call.

- [ ] **Step 1: Write the module**

```typescript
const bootEpochMs = Date.now();
const bootPerformanceMs = performance.now();

export function now(): string {
  const elapsedMs = performance.now() - bootPerformanceMs;
  return new Date(bootEpochMs + elapsedMs).toISOString();
}
```

- [ ] **Step 2: Manual sanity check**

Run: `node -e "const b=Date.now();const p=performance.now();const now=()=>new Date(b+(performance.now()-p)).toISOString();console.log(now());"`
Expected: prints a valid current ISO-8601 timestamp.

- [ ] **Step 3: Commit**

```bash
git add src/services/clock.ts
git commit -m "feat(invitations): add monotonic clock to resist client clock rollback"
```

---

### Task 4: Build the Team Invitations UI section

**Files:**
- Create: `src/components/TeamInvitations.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css` (append only — do not alter existing rules)

**Interfaces:**
- Consumes: `createInvitation`, `acceptInvitation`, `revokeInvitation` from
  `../services/invitationService`; `now` from `../services/clock`; `InvitationState`,
  `TeamMember`, `InvitationRole` from `../types`.
- Produces: default export `TeamInvitations(props: { state: InvitationState; onStateChange:
  (state: InvitationState) => void })`, rendered by `App.tsx`.

- [ ] **Step 1: Write `src/components/TeamInvitations.tsx`**

```tsx
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
  const eligibleActors = state.members.filter(
    (member) => member.status === "active" && state.policy.inviteRoles.includes(member.role)
  );
  const [actorId, setActorId] = useState(eligibleActors[0]?.id ?? "");
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
              {member.name} ({member.role}{member.status === "suspended" ? ", suspended" : ""})
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
```

- [ ] **Step 2: Wire it into `src/App.tsx`**

Replace the file's contents with:

```tsx
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
```

- [ ] **Step 3: Append minimal styles to `src/styles.css`**

Append (do not edit existing rules):

```css
.invitations {
  margin-top: 2rem;
}

.invite-form {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

.invitation-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.invitation-list li {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}
```

- [ ] **Step 4: Typecheck and build**

Run: `npm run typecheck`
Expected: exit code 0, no errors.

Run: `npm run build`
Expected: exit code 0.

- [ ] **Step 5: Manual browser check**

Run: `npm run dev`, open the app, and verify: the "Team Invitations" section is visible; creating
an invitation as an unauthorized actor (a `member`) is rejected with `UNAUTHORIZED` and adds
nothing to the list; creating one as the owner succeeds; accepting it adds a member to the grid
above; revoking a different pending invitation marks it `revoked` and a second revoke attempt is
rejected with `INVITATION_FINAL`.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/components/TeamInvitations.tsx src/styles.css
git commit -m "feat(invitations): add Team Invitations UI section"
```

---

### Task 5: Final verification and evidence capture

**Files:**
- Read-only: all of the above.

**Interfaces:**
- Consumes: every artifact produced by Tasks 1-4.
- Produces: `evidence/after.md`, `evidence/after.patch`, `evidence/skill-usage.md`,
  `evidence/review.md`, `evidence/comparison.md` (in addition to `evidence/tdd.md` from Task 1/2).

- [ ] **Step 1: Request code review**

Follow `superpowers:requesting-code-review` against the diff produced by Tasks 2-4. Record
findings, severity, resolution, and verification in `evidence/review.md`.

- [ ] **Step 2: Run full verification**

Run, in order: `npm run test:invitations`, `npm run submission:verify`, `npm run agent:check`.
Record each command and its exit code per `superpowers:verification-before-completion` — no
completion claim without this output.

- [ ] **Step 3: Write remaining evidence files**

`evidence/after.md`, `evidence/skill-usage.md`, `evidence/comparison.md`, following
`docs/evidence-template.md`.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "docs(evidence): record Superpowers after-run evidence"
```
