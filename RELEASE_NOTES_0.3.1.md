# Chatobby Runtime 0.3.1

Chatobby 0.3.1 is a reliability update for the 0.3.0 public alpha.

## What changed

- New and updated chats now appear in every open Projects page without a
  manual refresh. Chatobby batches these updates at durable session boundaries
  so normal response streaming remains efficient.
- Project and Vault chats now sort by real activity, support independent
  Project/chat filters and bounded transcript search, and can move between
  Vault and Projects without rewriting their messages.
- Deleting a stored chat removes its Project entry instead of leaving an
  untitled placeholder. HTML and JSONL exports preserve the complete ordered
  conversation and work for packaged runtimes.
- Every folder attached to a Project is available as part of that Project's
  working set. Adding or removing a folder updates active Project context at a
  safe boundary without changing the user's permission policy.
- Existing vaults can start normally when their memory database predates the
  session-continuity digest table. Chatobby performs the compatible upgrade
  during normal runtime initialization; no manual database repair is required.
- High-consequence shell commands receive a dedicated one-shot review before
  execution, including destructive Git, recursive forced deletion, raw-device,
  formatting, and shutdown operations.
- Obsidian CLI and live-verification results now preserve exact failure and
  screenshot details, helping agents verify rendered work without asking users
  to perform checks Chatobby can conduct itself.
- Tool failures now distinguish invalid input from stale targets, timeouts,
  bridge failures, and integration defects.

This remains public-alpha software. macOS and Linux support remain experimental
until representative physical-device acceptance is completed.
