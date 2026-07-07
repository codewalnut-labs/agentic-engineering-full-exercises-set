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
  "title": "C4 and Sequence Diagram From Code",
  "competency": "07. Docs & Diagrams - Diagrams and architecture decision records",
  "domain": "Verified diagrams generated from actual workflow code",
  "mission": "Reverse engineer the feature and create C4-style and sequence diagrams that match the actual code paths.",
  "outcome": "Diagrams are generated from real code paths and verified by a trace or test.",
  "entities": [
    "C4 container",
    "sequence step",
    "trace artifact",
    "service boundary"
  ],
  "seededDefects": [
    "diagram includes a queue service not present in code",
    "sequence skips the error branch",
    "trace artifact is not tied to files"
  ],
  "verificationGates": [
    "diagram step trace",
    "file-reference check",
    "error branch verification",
    "diagram drift test"
  ],
  "agentWorkflow": [
    "Ask the coding agent to inspect this lab contract, starter code, docs, and tests before proposing a plan.",
    "Revise the agent plan so it exercises the competency practice and avoids the common mistake.",
    "Implement the smallest working change that addresses the seeded defects.",
    "Run the verification gates and capture command evidence before writing the final review note."
  ],
  "workingDeliverables": [
    "C4 and sequence diagrams.",
    "Trace/test artifact validating diagram accuracy.",
    "Any code or docs fixes needed to remove drift.",
    "Review note explaining verified and intentionally omitted paths."
  ],
  "seniorSignals": [
    "Trace the feature from UI event through state, service, and persistence/mock boundaries.",
    "Create C4-style and sequence diagrams from that trace.",
    "Add a small script, test, or trace artifact that proves diagram steps still exist in code.",
    "Fix any diagram-code mismatch you discover."
  ]
};
