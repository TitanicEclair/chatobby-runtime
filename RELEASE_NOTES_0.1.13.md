# Chatobby Runtime 0.1.13 public alpha

Runtime 0.1.13 pairs with Chatobby Community plugin 0.1.13 and focuses on
correct session, compaction, permission, and subagent lifecycle behavior.

> **Paired update:** update the Community plugin first. It will offer to install
> this matching runtime. Plugin 0.1.12 and Runtime 0.1.12 continue to work
> together unchanged.

## What changed

- Added customizable manual and automatic compaction focus, durable compaction
  lifecycle projection, elapsed-time feedback, and effective cancellation.
- Made session clone store-only and kept fork/resume transitions from rebinding
  the wrong active runtime.
- Published authoritative idle state after every main-agent activation,
  promoted stale steering into ordinary prompts, and prevented apparently
  completed turns from remaining stuck as working.
- Kept child lifecycle patches responsive during sustained transcript traffic
  and removed duplicate legacy frames for patch-capable frontends.
- Added additive budget extension for running subagents and rejected an
  undersized initial child budget before contacting the model.
- Resolved equivalent parent and child permission policies before launch,
  avoiding redundant override prompts, and exposed requesting-child metadata on
  real permission notices.
- Added parent-only, session-scoped permission approval without granting durable
  policy mutation authority.
- Added runtime-owned Context Query execution and revision-tested enablement so
  installed users do not need product source or a separately installed Node.js.
- Added live domain invalidation for session directories, vault folders,
  memories, permission policies, queries, and related feature pages.
- Populated complete MCP input schemas and retained immutable built-in guidance
  skills across upgraded permission profiles.
- Added user-visible slash commands for fork, clone, export, reload, and compact
  operations that were previously hidden from autocomplete.
- Updated the model catalogue used by the packaged runtime.

Runtime protocol remains revision 3 and plugin compatibility remains `0.1.x`.
The package uses the existing Chatobby Ed25519 release key.

## Install or update

Install or update the Chatobby Community plugin, open Chatobby, and use its
Install or Update Chatobby action. The plugin verifies the signed release
descriptor, signed package manifest, and every runtime file before activation.

This release does not contain a standalone Windows installer.

Chatobby remains public-alpha software. Back up important vaults and begin with
the minimum permissions needed for the task.
