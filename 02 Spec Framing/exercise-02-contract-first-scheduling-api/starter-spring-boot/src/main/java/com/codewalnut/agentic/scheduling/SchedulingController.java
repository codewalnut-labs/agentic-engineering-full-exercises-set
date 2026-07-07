package com.codewalnut.agentic.scheduling;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/scheduling")
public class SchedulingController {
  private final SchedulingService service;

  public SchedulingController(SchedulingService service) {
    this.service = service;
  }

  @GetMapping("/slots")
  public List<Slot> slots() {
    return service.availableSlots();
  }

  @PostMapping("/holds")
  @ResponseStatus(HttpStatus.CREATED)
  public BookingHold hold(@RequestBody BookingHoldRequest request) {
    return service.createHold(request);
  }
}
