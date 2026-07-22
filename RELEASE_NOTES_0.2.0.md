# Chatobby Runtime 0.2.0 public alpha

Runtime 0.2.0 pairs with Chatobby Community plugin 0.2.0 on Windows x64,
Apple Silicon macOS, and Intel macOS. Runtime protocol revision 3 is retained.

> **macOS status:** Apple Silicon and Intel packages are built and verified on
> native GitHub macOS runners. This alpha has not been externally verified on a
> physical Mac and is not Apple-notarized.

## What changed

- Added a canonical typed tool-contract registry and runtime composition layer
  that keep provider-visible guidance synchronized with real tool schemas.
- Added deferred specialist MCP discovery and reduced the default provider tool
  surface without removing installed capabilities.
- Consolidated overlapping task, event, context-query, channel, subagent, and
  Obsidian tool families behind revision-safe façades.
- Added bounded paging and retained-result handling for large filesystem,
  document, media, Obsidian CLI, and memory operations.
- Improved memory review completeness, subagent control races, and project
  guidance loading from the active session directory.
- Rejected stale Web Viewer references after page transitions so interactions
  must use the current page snapshot.

Each production package is verified through the signed multi-platform runtime
index, its signed file inventory, SHA-256 hashes, SBOM, provenance, dependency
licences, runtime licence, privacy notice, and alpha-risk notice before
activation.

Chatobby remains public-alpha software. Back up important vaults and begin with
the minimum permissions needed for the task.
