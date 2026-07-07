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
  "title": "Reproducible Agent Workstation",
  "competency": "01. Toolchain Setup - Project rules, hooks, guardrails, and CLI or MCP wiring",
  "domain": "Agent workstation bootstrap for a regulated billing portal",
  "mission": "Turn a fragile local setup into a repeatable agent-ready workstation that a new engineer can run in under 30 minutes.",
  "outcome": "A new senior engineer can clone the starter, give it to Codex/Claude Code/Cursor, and get safe, repeatable setup plus checks without a private briefing.",
  "entities": [
    "AGENTS.md contract",
    "doctor command",
    "CLI allowlist",
    "forbidden paths"
  ],
  "seededDefects": [
    "doctor command does not detect missing Node major version",
    "agent rules omit the generated-artifact cleanup command",
    "CLI allowlist grants deploy access before local checks pass"
  ],
  "verificationGates": [
    "agent:check",
    "doctor:setup",
    "rules-size-check",
    "forbidden-path simulation"
  ],
  "agentWorkflow": [
    "Ask the coding agent to inspect this lab contract, starter code, docs, and tests before proposing a plan.",
    "Revise the agent plan so it exercises the competency practice and avoids the common mistake.",
    "Implement the smallest working change that addresses the seeded defects.",
    "Run the verification gates and capture command evidence before writing the final review note."
  ],
  "workingDeliverables": [
    "Working `starter-react` package scripts for setup and verification.",
    "A doctor/check script that exits non-zero on a real missing prerequisite.",
    "Agent rules file plus a short evidence note showing a fresh-agent handoff.",
    "Command output from install, typecheck/build/test, and the doctor script."
  ],
  "seniorSignals": [
    "Add a lean in-exercise `AGENTS.md` or `CLAUDE.md` that teaches the agent only stable project rules, commands, forbidden paths, and review expectations.",
    "Implement a runnable setup or doctor command in `starter-react` that verifies Node version, package manager, required scripts, and fixture availability.",
    "Wire package scripts so an agent can run `format`, `lint`, `typecheck`, `test`, and a one-command `agent:check` gate.",
    "Seed at least one failing setup condition and make the doctor script report it clearly."
  ]
};
