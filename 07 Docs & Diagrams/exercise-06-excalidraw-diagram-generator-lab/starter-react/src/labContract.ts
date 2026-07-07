import type { LabContract } from "./types";

export const labContract = {
  "title": "Excalidraw Diagram Generator Lab",
  "competency": "07. Docs & Diagrams",
  "skillPattern": "Excalidraw diagram generator",
  "domain": "Incident access workflow with request intake, policy checks, approval handoffs, provisioning, notification, and audit trails.",
  "mission": "Use an Excalidraw diagram generator skill to convert a messy workflow request into a valid, readable `.excalidraw` file that matches the starter app and can be opened directly in Excalidraw.",
  "outcome": "The final diagram is a real Excalidraw JSON artifact with readable layout, bounded scope, consistent styling, and evidence that each node and arrow reflects the implementation.",
  "entities": [
    "AccessRequest",
    "PolicyCheck",
    "Approver",
    "ProvisioningJob",
    "Notification",
    "AuditTrail"
  ],
  "seededDefects": [
    "The diagram request asks for every minor field, which would exceed a readable element count.",
    "The starter app routes rejected requests to audit before notification, but the notes say the opposite.",
    "The generated JSON must use `fontFamily: 5` for every text element.",
    "A swimlane handoff crosses teams without a labeled arrow."
  ],
  "verificationGates": [
    "Excalidraw JSON parses and contains the expected root fields.",
    "Every text element uses `fontFamily: 5` and readable font size.",
    "Element count stays below 20 or the split is justified.",
    "Diagram arrows and labels are verified against source files or trace output."
  ],
  "agentWorkflow": [
    "Classify the request as flowchart, architecture, sequence, DFD, or swimlane before generating.",
    "Extract entities, steps, and relationships from the starter app and seeded notes.",
    "Generate a `.excalidraw` file under `docs/diagrams/`.",
    "Add a validation script or test for JSON structure, IDs, text font, and element count."
  ],
  "workingDeliverables": [
    "Valid `.excalidraw` file.",
    "Diagram validation script or test.",
    "Evidence note linking diagram elements to source files.",
    "Small docs or code fix for one verified mismatch."
  ],
  "masterySignals": [
    "The generated artifact is editable.",
    "Layout choices improve understanding.",
    "Visual docs are verified like code."
  ],
  "backlog": [
    {
      "id": "06-01",
      "title": "The diagram request asks for every minor field, which would exceed a readable element count.",
      "owner": "agent candidate",
      "skill": "Excalidraw diagram generator",
      "risk": "high",
      "done": false
    },
    {
      "id": "06-02",
      "title": "The starter app routes rejected requests to audit before notification, but the notes say the opposite.",
      "owner": "accountable owner",
      "skill": "Excalidraw diagram generator",
      "risk": "critical",
      "done": false
    },
    {
      "id": "06-03",
      "title": "The generated JSON must use `fontFamily: 5` for every text element.",
      "owner": "agent candidate",
      "skill": "Excalidraw diagram generator",
      "risk": "medium",
      "done": false
    },
    {
      "id": "06-04",
      "title": "A swimlane handoff crosses teams without a labeled arrow.",
      "owner": "accountable owner",
      "skill": "Excalidraw diagram generator",
      "risk": "medium",
      "done": false
    }
  ],
  "evidence": [
    {
      "gate": "Excalidraw JSON parses and contains the expected root fields.",
      "status": "missing",
      "proof": "needs learner evidence"
    },
    {
      "gate": "Every text element uses `fontFamily: 5` and readable font size.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "Element count stays below 20 or the split is justified.",
      "status": "ready",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "Diagram arrows and labels are verified against source files or trace output.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    }
  ],
  "decisions": [
    {
      "question": "How will the team prove step 1?",
      "decision": "Classify the request as flowchart, architecture, sequence, DFD, or swimlane before generating.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 2?",
      "decision": "Extract entities, steps, and relationships from the starter app and seeded notes.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 3?",
      "decision": "Generate a `.excalidraw` file under `docs/diagrams/`.",
      "status": "open"
    },
    {
      "question": "How will the team prove step 4?",
      "decision": "Add a validation script or test for JSON structure, IDs, text font, and element count.",
      "status": "open"
    }
  ]
} satisfies LabContract;
