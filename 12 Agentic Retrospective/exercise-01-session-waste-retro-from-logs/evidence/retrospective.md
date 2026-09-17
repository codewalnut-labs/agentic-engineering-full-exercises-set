# Retrospective

## Definition

Preventable waste is deliberately narrower than unsuccessful or repeated-looking work. A duplicate read requires the same target and content version after its first read. An unchanged failure retry requires the same command to be attempted again at the same workspace revision after failure and before diagnosis. A context load is oversized only above 8,000 bytes. These mutually exclusive categories keep useful investigation out of the waste total.

## Root cause

The protected baseline's largest avoidable pattern is the unchanged failure loop: the same focused test is run at sequences 5, 6, and 7 without diagnosis or workspace change. The first failure is useful evidence; sequences 6 and 7 add no information. The seeded analyzer hid that distinction by counting every failed command and every read, which also mislabeled first reads and the post-write read at sequence 11.

## Executable improvement

The preflight policy evaluates a command before execution. It blocks only when the latest identical command at the same revision failed and no later diagnosis exists, returning `DIAGNOSIS_OR_CHANGE_REQUIRED`. A first command, different command, changed revision, or diagnosed retry returns `FIRST_OR_INFORMED_ATTEMPT`. It reads but never rewrites the event trace.

## Correctness

The corrected analyzer derives all metrics from ordered raw events and rejects malformed required fields or non-increasing sequences. Correctness requires a passed `final-verification` command after the last write. In the constructed replay, policy-217-replay-009 passes after policy-217-replay-007, and the completion claim follows that evidence. A focused failure remains useful because diagnosis occurs before the next focused test.

The participant boundary also proves that an uninformed retry remains waste even when an attempted retry happens to pass: failure state clears only after diagnosis or a workspace revision change. A session with no write cannot satisfy the final-verification definition, because no command can occur after a nonexistent final write.

## Remaining waste

The replay also avoids duplicate reads and limits context to 3,200 bytes, producing zero preventable calls. The preflight itself does not prevent oversized context or same-version rereads; those remain measured so future retrospectives can justify a separate improvement if repeated evidence shows they dominate. This exercise intentionally adds no speculative policy for those categories.
