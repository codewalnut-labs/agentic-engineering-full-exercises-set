package dev.agentic.exercise.scheduling;

public record BookingHoldRequest(String slotId, String patientId, String timezone) {}
