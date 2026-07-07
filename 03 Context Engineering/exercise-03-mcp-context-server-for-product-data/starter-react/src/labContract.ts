export interface LabContract {
  title: string;
  competency: string;
  domain: string;
  mission: string;
  outcome: string;
  entities: string[];
  seededDefects: string[];
  verificationGates: string[];
  agentWorkflow: string[];
  workingDeliverables: string[];
  seniorSignals: string[];
}

export const labContract: LabContract = {
  "title": "MCP Context Server for Product Data",
  "competency": "03. Context Engineering - Agent working-context curation",
  "domain": "Queryable product-rule server for agent sessions",
  "mission": "Expose product rules and fixtures through a tiny TypeScript context server so agents stop pasting giant JSON into prompts.",
  "outcome": "Product rules move from prompt paste into a small runnable context service that agents and code can query.",
  "entities": [
    "product rule",
    "fixture",
    "MCP-style query",
    "access boundary"
  ],
  "seededDefects": [
    "server returns full fixture dumps instead of focused answers",
    "eligibility rule has no version metadata",
    "agent prompt duplicates product rules manually"
  ],
  "verificationGates": [
    "query contract test",
    "access-boundary test",
    "fixture version check",
    "integration smoke"
  ],
  "agentWorkflow": [
    "Ask the coding agent to inspect this lab contract, starter code, docs, and tests before proposing a plan.",
    "Revise the agent plan so it exercises the competency practice and avoids the common mistake.",
    "Implement the smallest working change that addresses the seeded defects.",
    "Run the verification gates and capture command evidence before writing the final review note."
  ],
  "workingDeliverables": [
    "Runnable context server or MCP-style adapter.",
    "React integration or demo client using retrieved rules.",
    "Tests for rule lookup and access boundaries.",
    "Usage notes for Codex/Claude/Cursor."
  ],
  "seniorSignals": [
    "Build the TypeScript context server around product rules, fixtures, and retrieval boundaries.",
    "Expose focused queries for product limits, eligibility rules, glossary terms, and sample payloads.",
    "Integrate one starter workflow with the server output instead of hard-coded duplicated rules.",
    "Add tests for retrieval correctness and forbidden broad dumps."
  ]
};
