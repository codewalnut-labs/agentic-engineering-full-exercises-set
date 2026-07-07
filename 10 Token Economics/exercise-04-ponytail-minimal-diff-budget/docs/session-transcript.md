# Session Transcript Excerpt

Turn 14: The agent proposed a new `DatePickerShell` component before checking whether the existing field component already supports native date input.

Turn 18: The agent added a new variant normalizer even though `src/skillWorkflow.ts` already contains the scoring helper it needed.

Turn 23: The agent deleted an accessible label to keep the diff small, then called the change "minimal" without naming the safety regression.

Turn 29: The agent installed a helper package for a one-line string transform already covered by the platform.

Learners must use Ponytail, an external minimal-diff ladder skill, to challenge each proposed addition before implementation.
