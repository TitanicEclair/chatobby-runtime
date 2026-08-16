# Chatobby Runtime 0.4.3

Chatobby Runtime 0.4.3 is a focused long-session reliability update. Automatic
compaction can now occur during multi-step agent work and continue the same
request, rather than waiting indefinitely for the complete turn or leaving a
session unusable after a rejected checkpoint.

## Compaction that continues the work

- When the configured threshold is crossed during a tool-driven turn,
  Chatobby waits for all results from the current tool boundary, checkpoints,
  and resumes the same agent turn from an explicit continuation handoff.
- The tool that reached the boundary is neither terminated nor replayed.
- The handoff restates the current objective, unresolved user requests, and
  concrete next actions so the resumed agent does not wait for the user to
  repeat the request.
- User messages arriving during maintenance remain queued after the accepted
  checkpoint and are not summarized into the older snapshot.

## Defined checkpoint quality

Checkpointing now has three explicit success levels:

1. **Full fidelity** preserves authoritative continuity plus useful active
   skills, capabilities, and retained-result handles within their quotas.
2. **Continuity safe** preserves every unresolved request, active or blocked
   work item, decision, evidence state, operational handle, authority receipt,
   and next action while dropping optional working context when needed.
3. **Host-reconciled minimum** deterministically rebuilds conservative
   continuity from the runtime's immutable inventory if the model exhausts its
   bounded correction attempts.

Checkpoint validation keeps one immutable inventory revision, provides
field-specific repairs, and asks the model to drop optional retained results,
capabilities, and skills before sacrificing continuity. Cancellation and
provider failures remain fail-closed: the original context stays authoritative
and usable.

## Platform status

Windows remains the primary physically tested desktop path. Native macOS and
Linux packages continue as best-effort experimental support pending a broader
physical-device acceptance matrix.
