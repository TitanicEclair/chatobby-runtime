# Chatobby Runtime 0.3.0 public alpha

Runtime 0.3.0 pairs with Chatobby Community plugin 0.3.0 on Windows x64,
experimental macOS on Apple Silicon and Intel, and experimental glibc Linux on
x64 and arm64. Runtime protocol revision 4 is required.

> **Platform status:** Windows is the primary tested platform. macOS and Linux
> packages are built and exercised on native GitHub runners but have not
> completed representative physical-device acceptance. macOS is not
> Apple-notarized. Flatpak, Snap, musl, and other confined Linux environments
> remain unverified.

## What changed

- Adds stable Vault, Project, directory, root, device-binding, and session
  identities with versioned migration, recovery, rollback, and redacted
  receipts.
- Publishes authoritative Project names and attached folders into live session
  context, refreshes them after Project changes, and preserves Project scope
  through new-session admission and the first prompt.
- Adds experimental signed `linux-x64` and `linux-arm64` SEA packages, XDG path
  handling, executable-mode normalization, native startup/install/update/
  rollback CI, and fail-closed libc or confinement diagnostics.
- Adds first-class local model server configuration for Ollama, LM Studio,
  vLLM, llama.cpp, generic OpenAI-compatible endpoints, and Anthropic
  Messages-compatible endpoints.
- Strengthens the context-publication system, memory selection and
  cross-session continuity, typed compaction checkpoints, semantic web and
  Obsidian context, document/OCR routing, and built-in Obsidian skills.
- Consolidates permissions through the live admission authority, improves the
  bounded Auto classifier, and applies group/tool/resource decisions to MCP,
  channels, subagents, Events, background work, filesystem, and shell actions.
- Improves channel atomicity and delivery receipts, Event-backed sessions,
  subagent lifecycle behavior, MCP connection management, and user-facing
  diagnostics.

Each production package is verified through the signed multi-platform runtime
index, its signed file inventory, SHA-256 hashes, SBOM, provenance, dependency
licences, runtime licence, privacy notice, and alpha-risk notice before
activation.

Chatobby remains public-alpha software. Back up important vaults and begin with
the minimum permissions needed for the task.
