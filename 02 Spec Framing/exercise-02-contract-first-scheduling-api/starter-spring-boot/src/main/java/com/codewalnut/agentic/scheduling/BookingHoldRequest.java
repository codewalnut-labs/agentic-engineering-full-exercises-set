package com.codewalnut.agentic.scheduling;

public record BookingHoldRequest(String slotId, String patientId, String timezone) {}
