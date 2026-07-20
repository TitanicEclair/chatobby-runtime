# Chatobby Runtime 0.1.11 public alpha

This runtime update aligns with Chatobby plugin 0.1.11 and fixes permission and
subagent lifecycle regressions found during workflow testing.

> **Paired update:** Runtime 0.1.11 rotates the package signing key. It is
> verified only by Chatobby plugin 0.1.11, and plugin 0.1.11 expects Runtime
> 0.1.11. Update the plugin first; it will offer to install this matching
> runtime. Plugin 0.1.10 and Runtime 0.1.10 continue to work together unchanged.

## What changed

- Session approval for a direct MCP tool is now stored on the same normalized
  MCP policy surface used by later calls, so **Allow for this session** remains
  effective.
- The built-in Researcher and Deep researcher policies allow Chatobby's direct
  web search and page-fetch tools without prompting on every call.
- Channel tools rely on their channel-grant authorization instead of presenting
  a second generic permission prompt.
- Subagent rail lifecycle changes are projected immediately without rebuilding
  the rail and feed for every child transcript delta.
- Patch-only plugin connections no longer receive duplicate raw subagent event
  frames.
- Every main-agent activation source publishes one final idle state after its
  runtime drain, including channel-triggered passes, retries, and extensions.
- Child channel delivery acknowledges receipt without awaiting the recipient's
  full model turn, and completion requested during an active child turn is
  durably deferred to its next safe boundary.
- Input that races with an already-settled main turn is promoted from steering
  to an ordinary prompt instead of remaining queued forever.
- Run, node, attempt, and control-receipt states now transition together and
  retain the actual resolved node identity.
- Runtime candidate and release builds now rebuild the full workspace dependency
  graph first, preventing stale coding-agent output from omitting lifecycle fixes.
- Runtime version advances to 0.1.11. Protocol 3 and plugin compatibility remain
  unchanged (`0.1.x`). The runtime package signing key rotates to
  `chatobby-runtime-ed25519-2026-07`.

## Verification

- Repository static checks pass.
- Focused permission, frontend coordinator, WebSocket lifecycle, and plugin
  regressions pass.
- The Chatobby package suite passes 211 tests, the subagent suite passes 85
  tests, and the plugin suite passes 702 tests.
- The signed package manifest verifies against the plugin 0.1.11 trust anchor.

## Install or update

Install or update the Chatobby Community plugin, open Chatobby, and use its
Install or Update Chatobby action. The plugin verifies the signed descriptor,
signed package manifest, and every runtime file before activation.

This release does not contain a standalone Windows installer.

Chatobby remains public-alpha software. Back up important vaults and begin with
the minimum permissions needed for the task.
