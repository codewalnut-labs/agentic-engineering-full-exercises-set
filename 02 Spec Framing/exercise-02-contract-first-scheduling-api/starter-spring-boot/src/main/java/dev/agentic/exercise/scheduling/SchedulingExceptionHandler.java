package dev.agentic.exercise.scheduling;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class SchedulingExceptionHandler {
  @ExceptionHandler(SchedulingException.class)
  public ResponseEntity<Map<String, String>> handle(SchedulingException exception) {
    HttpStatus status = "slot_conflict".equals(exception.code()) ? HttpStatus.CONFLICT : HttpStatus.BAD_REQUEST;
    return ResponseEntity.status(status).body(Map.of("code", exception.code(), "message", exception.getMessage()));
  }
}
