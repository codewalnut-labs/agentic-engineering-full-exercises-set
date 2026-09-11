package dev.agentic.exercise.workflow;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;

class WorkflowPolicyCharacterizationTest {
  static final class RecordingRepository extends WorkflowRepository {
    int saves;

    @Override
    public WorkflowItem save(WorkflowItem item) {
      saves += 1;
      return super.save(item);
    }
  }

  @Test
  void rejectsElevenCharacterReadyNoteWithoutMutationOrSave() {
    RecordingRepository repository = new RecordingRepository();
    WorkflowService service = new WorkflowService(repository);
    WorkflowItem before = repository.findById("wf-101").orElseThrow();

    assertThatThrownBy(() -> service.decide(
        "wf-101", new WorkflowDecision("Ready", "Asha", "12345678901")))
        .isInstanceOf(InvalidWorkflowDecisionException.class)
        .hasMessage("Ready decisions require a longer evidence note");
    assertThat(repository.findById("wf-101").orElseThrow()).isEqualTo(before);
    assertThat(repository.saves).isZero();
  }

  @Test
  void acceptsTwelveCharacterReadyNoteAndSavesOnce() {
    RecordingRepository repository = new RecordingRepository();

    WorkflowItem result = new WorkflowService(repository).decide(
        "wf-101", new WorkflowDecision("Ready", "Asha", "123456789012"));

    assertThat(result).isEqualTo(
        new WorkflowItem("wf-101", "Atlas Co", "Ready", 91, "Asha", "123456789012"));
    assertThat(repository.saves).isEqualTo(1);
  }

  @Test
  void missingLookupPrecedesInvalidReadyDecision() {
    RecordingRepository repository = new RecordingRepository();

    assertThatThrownBy(() -> new WorkflowService(repository).decide(
        "missing", new WorkflowDecision("Ready", "Asha", "short")))
        .isInstanceOf(WorkflowNotFoundException.class)
        .hasMessage("Workflow item not found: missing");
    assertThat(repository.saves).isZero();
  }

  @Test
  void acceptsUnknownStatusAndPreservesProtectedFields() {
    RecordingRepository repository = new RecordingRepository();

    WorkflowItem result = new WorkflowService(repository).decide(
        "wf-102", new WorkflowDecision("Escalated Later", "Rina", "Legacy accepts this status"));

    assertThat(result).isEqualTo(new WorkflowItem(
        "wf-102", "Brightline", "Escalated Later", 74, "Rina", "Legacy accepts this status"));
    assertThat(repository.saves).isEqualTo(1);
  }
}
