# Comparison

## Same conditions

Both runs used the same task (the identical ticket prompt, hash `sha256:3beb136414c1ead0e70ec15fd169fbb57170f7508841223fdb28f7b45dbb2eda`; see `evidence/before.md`), the same agent (a fresh Claude Code Agent tool subagent with no prior context) and the same model (`claude-sonnet-5`), the same 20-minute time limit, zero human hints, and zero retries -- each was a genuine first attempt with its patch preserved unedited. The only thing that differed between the baseline and after runs was whether `AGENTS.md` and `.agent/persistence.md` existed in the working directory.

## Baseline (before)

Without guidance, the fresh session repeated the exact class of mistake the team keeps correcting: it stored the owner id under the wrong key (`owner` instead of `ownerId`), left the status raw and uncanonicalized (`" Blocked "` instead of `"blocked"`), and produced the wrong durable record shape. The protected grader found 6 defects across two input variants.

## After

With only `AGENTS.md` routing to `.agent/persistence.md` (three general rules plus a naming/shape convention, none of it case-specific), a separate fresh session with the identical prompt produced a stable `ownerId`, a trimmed canonical-lowercase `status`, and an `updatedAt` sourced directly from the injected clock -- the exact required shape. The protected grader found 0 defects.

## Rule-to-defect mapping

| Guidance rule | Before defect it prevents |
|---|---|
| Identity: stable ID under an `Id`-suffixed field | `stable owner ID not stored` |
| Enums: trimmed canonical lowercase under a plain field name | `status not canonical lowercase` |
| Shape: only identity, canonical, and timestamp fields | `durable record shape changed` |

## Verification (proof)

Both patches were graded with the protected `applyAndGradePatch` function directly (not a hand-rolled approximation): `evidence/before.patch` reproduces 6 defects across two input variants against the pristine starter fixture; `evidence/after.patch` reproduces 0 defects. `npm run test:persistence` passes against the final committed implementation and its participant test. Git history separates the guidance-only commit (`f0bce012`) from the implementation commit (`f80f1895`) and the participant-test commit (`907a19dd`), and the final committed source is byte-identical to the content produced by `evidence/after.patch`.

## Conclusion

A short, repeatedly-evidenced persistence guidance file changed a fresh agent's unguided first attempt from 6 protected defects to 0, without adding any implementation code to the guidance commit itself.
