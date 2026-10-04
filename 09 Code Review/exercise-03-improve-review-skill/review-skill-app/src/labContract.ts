export interface LabContract {
  title: string; competency: string; domain: string; mission: string; outcome: string;
  entities: string[]; seededDefects: string[]; verificationGates: string[];
  agentWorkflow: string[]; workingDeliverables: string[]; masterySignals: string[];
}

export const labContract: LabContract = {
  "title": "Improve a Review Skill Without Adding False Alarms",
  "competency": "09. Code Review",
  "domain": "Agent-neutral skill improvement over defective and clean diffs",
  "mission": "Improve the supplied review skill from observed misses and compare fresh reviews without introducing unsupported blockers.",
  "outcome": "Comparable raw review runs support an adoption decision while stating the limits of a three-case evaluation.",
  "entities": [
    "starter skill",
    "review cases",
    "fresh sessions",
    "transcripts",
    "scorecard"
  ],
  "seededDefects": [
    "shallow starter review workflow",
    "missed cross-boundary regressions",
    "unsupported merge blockers"
  ],
  "verificationGates": [
    "skill answer-leak check",
    "protected-runner and transcript hash binding",
    "security and historical coverage",
    "clean-control precision gate",
    "focused skill commit",
    "Learner skill remains editable while case inputs and verification tools stay protected.",
    "Actual command output, skill provenance, and report artifacts are committed and sealed."
  ],
  "agentWorkflow": [
    "Capture three fresh baseline reviews without the skill before editing it.",
    "Use writing-skills in the authoring session to improve the reusable review method.",
    "Commit only the skill revision and capture three new reviews under matching conditions.",
    "Compare coverage, precision, and the safe control using the local scorer.",
    "Preserve earlier batches when revising; report limits and adopt only after every gate passes.",
    "Capture results, cite sources, commit and seal evidence, and run final verification."
  ],
  "workingDeliverables": [
    "Improved regression-review skill and supporting files.",
    "Six runner-generated prompts, run documents, and raw responses.",
    "Generated scorecard and evaluation report.",
    "evidence/before.md, evidence/after.md, and evidence/comparison.md.",
    "Skill-authoring record, source audit, sealed manifest, and actual verification output."
  ],
  "masterySignals": [
    "The skill generalizes beyond protected cases.",
    "Findings state behavior and evidence.",
    "A safe change is not blocked."
  ]
};
