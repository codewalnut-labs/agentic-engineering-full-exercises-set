import type { TeamMember, WorkspacePolicy } from "../types";

export const workspacePolicy: WorkspacePolicy = {
  inviteRoles: ["owner", "admin"],
  defaultInviteExpiryDays: 7,
  allowGuestInvites: false
};

export const members: TeamMember[] = [
  {
    id: "USR-201",
    name: "Asha Rao",
    email: "asha@example.test",
    role: "owner",
    status: "active",
    lastActiveDays: 0
  },
  {
    id: "USR-228",
    name: "Marcus Lee",
    email: "marcus@example.test",
    role: "admin",
    status: "active",
    lastActiveDays: 2
  },
  {
    id: "USR-244",
    name: "Iris Chen",
    email: "iris@example.test",
    role: "member",
    status: "active",
    lastActiveDays: 6
  },
  {
    id: "USR-251",
    name: "Owen Brooks",
    email: "owen@example.test",
    role: "guest",
    status: "suspended",
    lastActiveDays: 31
  }
];
