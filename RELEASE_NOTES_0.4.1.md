# Chatobby Runtime 0.4.1

Chatobby Runtime 0.4.1 is a focused reliability update for long-running
sessions, automatic context compaction, and the runtime-owned Obsidian command
surface.

## Fixed

- Prompt requests now wait through runtime-managed compaction rather than
  failing after the connector's former generic 30-second request deadline.
- Completed compaction checkpoints are applied once. A replayed completion can
  no longer make the next user message disappear or leave the session unable
  to continue.
- Context usage is rebuilt and published after compaction, including when a
  queued prompt starts immediately after the checkpoint completes.
- Provider failures that contain no assistant text now produce an explicit
  error result instead of looking like a request that was never sent.
- Obsidian CLI failures now preserve structured command, validation, process,
  and output evidence so the agent can distinguish invalid input from runtime
  and application failures.

## Configuration

The model-specific automatic-compaction threshold may now be set from 10 to 95
percent. Existing defaults have not changed; the lower bound is available for
very large context windows and for users who deliberately want earlier
checkpoints.

## Agent guidance

- Native Obsidian skills are organized as progressively loaded suites with
  focused references, verification, and recovery guidance.
- Runtime tool and skill discovery exposes compact searchable capability
  summaries rather than placing every specialist contract in the initial
  prompt.

## Alpha platform status

Windows remains the primary physically tested desktop path. Native macOS and
Linux packages are published as best-effort experimental support pending a
broader physical-device acceptance matrix.
