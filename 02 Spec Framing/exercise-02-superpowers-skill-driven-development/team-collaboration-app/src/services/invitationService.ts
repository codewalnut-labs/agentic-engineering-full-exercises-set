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
