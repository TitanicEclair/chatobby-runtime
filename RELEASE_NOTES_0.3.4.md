# Chatobby Runtime 0.3.4

Chatobby 0.3.4 makes Projects reliable across several vault or external folders
and gives Project chat search durable message-level results.

## What changed

- Projects can register one primary folder and several attached folders in one
  atomic operation. External folders are used in place rather than replaced by
  same-named vault copies.
- Primary and attached folders receive the same Project-root permission
  treatment. The primary folder only supplies the default working directory
  and relative-path base.
- Project folder and effective current-chat permission facts are refreshed as
  replaceable runtime context, so the agent sees changes before its next model
  call without persisting local paths into the transcript.
- Safely resolved paths outside a Project use the active policy's ordinary
  external-directory rule instead of producing a false unresolved-root denial.
- Project chat-content search returns bounded, paginated matches with stable
  session and message targets so the connector can resume the right chat and
  navigate to the exact result.

This remains public-alpha software. macOS and Linux support remain experimental
until representative physical-device acceptance is completed.
