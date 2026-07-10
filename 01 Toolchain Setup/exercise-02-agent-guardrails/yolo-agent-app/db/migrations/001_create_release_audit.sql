CREATE TABLE release_audit_log (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TEXT NOT NULL
);
