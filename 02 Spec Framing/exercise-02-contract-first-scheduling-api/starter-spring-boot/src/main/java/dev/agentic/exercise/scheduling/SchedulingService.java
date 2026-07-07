package dev.agentic.exercise.scheduling;

import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class SchedulingService {
  private final Map<String, Slot> slots = new LinkedHashMap<>();
  private final Map<String, BookingHold> holds = new LinkedHashMap<>();

  public SchedulingService() {
    slots.put("slot-nyc-0900", new Slot("slot-nyc-0900", "clinician-7", OffsetDateTime.parse("2026-08-03T09:00:00-04:00"), OffsetDateTime.parse("2026-08-03T09:30:00-04:00"), false));
    slots.put("slot-nyc-0930", new Slot("slot-nyc-0930", "clinician-7", OffsetDateTime.parse("2026-08-03T09:30:00-04:00"), OffsetDateTime.parse("2026-08-03T10:00:00-04:00"), false));
  }

  public List<Slot> availableSlots() {
    return slots.values().stream().filter(slot -> !slot.held()).toList();
  }

  public BookingHold createHold(BookingHoldRequest request) {
    validateTimezone(request.timezone());
    Slot slot = slots.get(request.slotId());
    if (slot == null) {
      throw new SchedulingException("slot_not_found", "Slot does not exist");
    }
    if (slot.held()) {
      throw new SchedulingException("slot_conflict", "Slot already has an active hold");
    }
    if (request.patientId() == null || request.patientId().isBlank()) {
      throw new SchedulingException("invalid_patient", "Patient id is required");
    }

    Slot heldSlot = new Slot(slot.id(), slot.clinicianId(), slot.startsAt(), slot.endsAt(), true);
    slots.put(slot.id(), heldSlot);
    BookingHold hold = new BookingHold(UUID.randomUUID().toString(), slot.id(), request.patientId(), OffsetDateTime.now().plusMinutes(10));
    holds.put(hold.id(), hold);
    return hold;
  }

  private void validateTimezone(String timezone) {
    try {
      ZoneId.of(timezone);
    } catch (Exception exception) {
      throw new SchedulingException("invalid_timezone", "Timezone must be an IANA timezone");
    }
  }
}
