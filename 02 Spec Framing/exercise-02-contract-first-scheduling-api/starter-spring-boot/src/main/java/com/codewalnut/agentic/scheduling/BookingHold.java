package com.codewalnut.agentic.scheduling;

import java.time.OffsetDateTime;

public record BookingHold(String id, String slotId, String patientId, OffsetDateTime expiresAt) {}
