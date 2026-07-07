package com.codewalnut.agentic.scheduling;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;

class SchedulingServiceTest {
  @Test
  void createsHoldAndRemovesSlotFromAvailability() {
    SchedulingService service = new SchedulingService();
    BookingHold hold = service.createHold(new BookingHoldRequest("slot-nyc-0900", "patient-42", "America/New_York"));
    assertThat(hold.slotId()).isEqualTo("slot-nyc-0900");
    assertThat(service.availableSlots()).extracting(Slot::id).doesNotContain("slot-nyc-0900");
  }

  @Test
  void rejectsDuplicateHoldAsConflict() {
    SchedulingService service = new SchedulingService();
    service.createHold(new BookingHoldRequest("slot-nyc-0900", "patient-42", "America/New_York"));
    assertThatThrownBy(() -> service.createHold(new BookingHoldRequest("slot-nyc-0900", "patient-43", "America/New_York")))
        .isInstanceOf(SchedulingException.class)
        .hasMessageContaining("active hold");
  }

  @Test
  void rejectsInvalidTimezone() {
    SchedulingService service = new SchedulingService();
    assertThatThrownBy(() -> service.createHold(new BookingHoldRequest("slot-nyc-0900", "patient-42", "Mars/Base")))
        .isInstanceOf(SchedulingException.class)
        .hasMessageContaining("IANA");
  }
}
