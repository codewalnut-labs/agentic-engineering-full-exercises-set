package com.codewalnut.support;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;

public final class ReportController {
    private final CaseService cases;
    private final Clock clock;

    public ReportController(CaseService cases, Clock clock) {
        this.cases = cases;
        this.clock = clock;
    }

    public Summary summary(String user, String workspace) {
        var openCases = cases.visibleCases(user, workspace).stream()
            .filter(c -> c.status().equals("open"))
            .toList();
        if (openCases.isEmpty()) return new Summary(0, 0);
        Instant oldestOpenedAt = openCases.stream().map(CaseItem::openedAt).min(Instant::compareTo).orElseThrow();
        long hours = Math.max(0, Duration.between(oldestOpenedAt, clock.instant()).toHours());
        return new Summary(openCases.size(), hours);
    }
}
