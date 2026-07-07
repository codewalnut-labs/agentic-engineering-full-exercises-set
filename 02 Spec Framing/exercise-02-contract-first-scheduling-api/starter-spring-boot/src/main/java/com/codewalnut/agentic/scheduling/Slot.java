package com.codewalnut.agentic.scheduling;

import java.time.OffsetDateTime;

public record Slot(String id, String clinicianId, OffsetDateTime startsAt, OffsetDateTime endsAt, boolean held) {}
