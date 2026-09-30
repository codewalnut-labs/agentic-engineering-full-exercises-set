# Same conditions

Both untouched first-attempt implementation patches start from e134b7e7b3163db395144bfb163a06d24ad06507 and use the same request, Codex gpt-5.6-sol model, medium reasoning, tools, workspace-write permissions, 45-minute limit, zero hints, and zero retries. The before and after POLICY-217 measurements use the same simulated agent, same simulated model, same prompt hash, constructed-replay capture mode, and 20-minute limit; only the session ID and event behavior differ.

# Before

The protected trace has one duplicate read (sequences 1–2), two unchanged failed-command retries (sequences 6–7), one 12,400-byte oversized context load (sequence 3), and four preventable calls total. The write is sequence 10, but no later final verification exists, so correctness is false. `evidence/before.patch` binds the independent first implementation commit.

# After

The fresh constructed replay has no duplicate reads, unchanged retries, or oversized context loads. Context falls from 12,400 to 3,200 bytes. After focused test failure policy-217-replay-004, diagnosis policy-217-replay-005 explains the mismatch before the later passing focused test. Final verification policy-217-replay-009 passes with exit code 0 after write policy-217-replay-007, so correctness is true. `evidence/after.patch` binds the second independent first implementation commit.

# Proof

`baseline.json` and `after.json` are exact analyzer outputs for their raw event files. Participant checks additionally prove persistent retry blocking until diagnosis/change and reject correctness when no write exists. Unique replay event IDs, session binding, ordered ISO timestamps, and replay metadata establish fresh constructed provenance without copying the protected baseline. Patch hashes bind both genuine Git diffs, while `history.json` binds the final source commit. Automatically captured verification records the source SHA and the reduction from four preventable calls to zero.

# Conclusion

The executable preflight addresses the largest repeated behavior by stopping an identical failed command until diagnosis or workspace change. The replay reduces preventable calls by four, eliminates unchanged retries, and moves the completion decision after fresh final verification without misclassifying useful failures or changed-file reads.
