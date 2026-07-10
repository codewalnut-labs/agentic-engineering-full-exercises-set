export interface GeneratedReleaseRecord {
  id: string;
  status: "draft" | "approved" | "deployed" | "rolled_back";
}

export function fetchReleaseRecord(id: string): GeneratedReleaseRecord {
  return {
    id,
    status: "draft"
  };
}
