# Chatobby Runtime 0.2.4 public alpha

Runtime 0.2.4 pairs with Chatobby Community plugin 0.2.4 on Windows x64,
Apple Silicon macOS, and Intel macOS. Runtime protocol revision 3 is retained.

> **macOS status:** Apple Silicon and Intel packages are built and verified on
> native GitHub macOS runners. This alpha has not been externally verified on a
> physical Mac and is not Apple-notarized.

## What changed

- Strengthens the stable Chatobby prompt while keeping direct tool guidance
  available and avoiding duplicated operational instructions.
- Gives main, child, Event, workflow, and background agents the same complete
  product foundation, with audience-specific responsibility guidance and
  additive user role prompts.
- Reworks compaction into a structured continuity checkpoint that preserves
  current objectives, user requirements, authority boundaries, decisions,
  completed and pending work, evidence, uncertainty, and exact next actions.
- Bounds tool arguments and results in compaction, omits hidden reasoning and
  binary payloads, redacts likely secret fields, and removes transient host
  envelopes while retaining the original user request.
- Adds a native Obsidian plugin-development skill with lifecycle, editor,
  workspace, styling, diagnostics, and live-verification guidance.
- Adds retained semantic web results, typed continuation-aware output, bounded
  transport, and truthful ranked-search coverage.
- Shares one revisioned semantic Obsidian context source between prompt
  injection and tool projections.
- Corrects named-channel permission admission, atomic creation, invitations,
  and durable send receipts across main and child agents.

Each production package is verified through the signed multi-platform runtime
index, its signed file inventory, SHA-256 hashes, SBOM, provenance, dependency
licences, runtime licence, privacy notice, and alpha-risk notice before
activation.

Chatobby remains public-alpha software. Back up important vaults and begin with
the minimum permissions needed for the task.
