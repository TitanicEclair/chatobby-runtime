# Chatobby Runtime 0.4.2

Chatobby Runtime 0.4.2 improves long-session continuity, skill and capability
discovery, memory maintenance, and safe Obsidian automation.

## Context and compaction

- Mutable Project, permission, task, memory, runtime, channel, subagent, and
  Obsidian state now advances at the end of the conversation context, preserving
  a stable prompt prefix for providers that support prompt caching.
- Context compaction explicitly reconciles active skills, discovered
  capabilities, retained-result handles, work, decisions, requirements, and
  evidence before committing a checkpoint.
- Failed compaction preserves the original usable context and reports the last
  maintenance stage plus a bounded provider or validation cause.
- New unnamed sessions receive a concise title before their first normal
  response. Private bootstrap and checkpoint tools remain outside the feed,
  exports, permission settings, and ordinary tool discovery.

## Skills, memory, and retrieval

- Native and managed skill loaders now identify their separate catalogues and
  guide the agent toward the other loader when a skill is requested from the
  wrong source.
- Capability search supports explicit domains and bounded exact, prefix,
  ranked, and fuzzy discovery without loading every specialist schema into the
  initial prompt.
- Memory search adds structured filters, typo-tolerant ranked pagination,
  bounded multi-record reads, and atomic revision-checked maintenance.
- Explicit follow-up commitments can be retained as typed obligations with
  revisioned completion evidence and current-policy enforcement.

## Obsidian automation and safety

- Chatobby can discover a version-pinned Obsidian API catalogue and attach
  focused symbol guidance when an `obsidian eval` task needs it.
- Eval output is parsed as bounded structured JSON. Catastrophic operations are
  denied through the canonical permission gate without broadly blocking
  ordinary scripting.
- Obsidian application reload and restart require a fresh user decision, even
  under Full access or after an earlier generic CLI approval.
- An empty `AGENTS.md` now falls back to compatible `CLAUDE.md` guidance;
  non-empty `AGENTS.md` retains precedence.

## Removed

The retired subagent-only Flows surface has been removed from the active
runtime tools, permissions, agent guidance, and native skills.

## Alpha platform status

Windows remains the primary physically tested desktop path. Native macOS and
Linux packages remain best-effort experimental support pending a broader
physical-device acceptance matrix. macOS packages are ad-hoc signed and not
Apple-notarized; Linux packages initially target glibc desktop environments.
