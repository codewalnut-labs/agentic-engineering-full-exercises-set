import type { TeamMember, WorkspacePolicy } from "../types";

export function canManageInvitations(member: TeamMember, policy: WorkspacePolicy) {
  return member.status === "active" && policy.inviteRoles.includes(member.role);
}

export function summarizeMemberAccess(member: TeamMember) {
  if (member.status === "suspended") {
    return `${member.name} cannot access the workspace until reactivated.`;
  }

  return `${member.name} has ${member.role} access and was last active ${member.lastActiveDays} days ago.`;
}
