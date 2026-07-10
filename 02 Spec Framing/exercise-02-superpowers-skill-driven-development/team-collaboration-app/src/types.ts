export type TeamRole = "owner" | "admin" | "member" | "guest";

export type MemberStatus = "active" | "suspended";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: MemberStatus;
  lastActiveDays: number;
}

export interface WorkspacePolicy {
  inviteRoles: TeamRole[];
  defaultInviteExpiryDays: number;
  allowGuestInvites: boolean;
}
