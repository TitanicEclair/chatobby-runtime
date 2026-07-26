# Chatobby Runtime 0.2.2 public alpha

Runtime 0.2.2 pairs with Chatobby Community plugin 0.2.2 on Windows x64,
Apple Silicon macOS, and Intel macOS. Runtime protocol revision 3 is retained.

> **macOS status:** Apple Silicon and Intel packages are built and verified on
> native GitHub macOS runners. This alpha has not been externally verified on a
> physical Mac and is not Apple-notarized.

## What changed

- Routes discovered MCP servers and tools through the same Allow, Ask, and Deny
  enforcement boundary as built-in capabilities.
- Gates temporary session approvals through the active permission policy and
  reports temporary access separately from saved policy changes.
- Publishes permission, assignment, capability, and approval changes to the
  plugin without requiring a reconnect.
- Simplifies complex tool schemas with strict action-specific validation and
  clearer recovery guidance.
- Adds Chatobby-verified MCP plugin discovery, Obsidian Secrets references, and
  permission-gated tool exposure.
- Improves context compaction, tool guidance, memory, channels, events,
  Context Queries, subagents, and skill-management contracts.
- Supports automatic compaction thresholds down to 25 percent.

Each production package is verified through the signed multi-platform runtime
index, its signed file inventory, SHA-256 hashes, SBOM, provenance, dependency
licences, runtime licence, privacy notice, and alpha-risk notice before
activation.

Chatobby remains public-alpha software. Back up important vaults and begin with
the minimum permissions needed for the task.
