# Java conventions

Java 21, compiled directly with `javac` (no Maven/Gradle, no build file to
update). Everything lives in one package,
`com.codewalnut.support`. Match the style already in `src/main/java`:

- **Immutable value types are records.** `CaseItem`, `Membership`,
  `Repository`, and `Summary` are all records. New data-holding types
  should follow the same shape rather than a mutable class with getters.
- **Public methods that return collections return unmodifiable ones.**
  `CaseService.visibleCases` returns `.toList()`; `Repository` copies its
  lists on construction with `List.copyOf`. Callers must never be able to
  mutate stored state through a returned value.
- **Access denial is `SecurityException`.** `CaseService` throws it when a
  membership check fails. Reuse the same exception type for new
  access-control failures instead of introducing a new one — callers and
  tests already expect it.
- **Behaviour classes are `final` with constructor-injected
  dependencies.** `CaseService(Repository)` and
  `ReportController(CaseService, Clock)` take what they need through the
  constructor. No static mutable state, no singletons, no service
  locators.
- **Static-only helpers get a private constructor.** See `LegacyExport`.
  This is a style note, not an endorsement of its access pattern — see
  [architecture.md](architecture.md) for why `LegacyExport` isn't a
  template for customer-facing code.
- **Time comes from an injected `java.time.Clock`, never
  `Instant.now()`.** `ReportController` already takes a `Clock`; any
  time-based logic should read from it so behaviour is reproducible with
  `Clock.fixed(...)` in tests.
