# Chatobby Runtime 0.1.13 public alpha

This runtime update aligns with Chatobby plugin 0.1.13 and fixes several
operational gaps surfaced by live use of 0.1.12: customizable compaction,
running-subagent budget control, agent-initiated session permissions, hidden
slash commands, and context-packet confidentiality.

> **Paired update:** Runtime 0.1.13 uses the same signing key as 0.1.11 and
> 0.1.12. It is verified only by Chatobby plugin 0.1.13, and plugin 0.1.13
> expects Runtime 0.1.13. Update the plugin first; it will offer to install this
> matching runtime. Plugin 0.1.12 and Runtime 0.1.12 continue to work together
> unchanged.

## What changed

- **Customizable compaction prompt.** The `/compact <focus>` slash command now
  forwards its argument to the summarizer (previously it was dropped with a
  notice). Auto-compaction honors a persisted default focus, settable alongside
  the enabled/threshold controls, and a `session_before_compact` extension hook
  result may supply or override it.
- **Extend a running subagent's budget.** The parent agent can grant a running
  in-process subagent more tokens, cost, wall time, or turns through the
  `subagent_control` tool's new `extend-budget` action — without canceling and
  re-spawning it. Overrides are strictly additive and validated against current
  usage, so a budget can only be relaxed, never tightened.
- **Agent-initiated session permissions.** A new parent-only
  `approve_session_permission` tool grants a session-scoped "allow" for one
  surface+pattern pair — the same power as the permission notice's "allow for
  this session." Approvals are additive, ephemeral (cleared on session end,
  never persisted), and audited; durable grants remain human-only.
- **More slash commands visible.** `fork`, `clone`, `export-html`,
  `export-jsonl`, and `reload` now appear in the composer's slash menu. They
  were already functional but hidden from autocomplete.
- **Operational context stays internal.** When asked about its context or
  system prompt, the agent no longer dumps raw workspace, environment,
  capabilities, or open-notes packets verbatim. It describes the situation in
  natural language and may still discuss memory.
- Runtime version advances to 0.1.13. Protocol 3 and plugin compatibility
  remain unchanged (`0.1.x`). The package signing key is unchanged.

## Verification

- Repository static checks pass (biome, tsgo type-check, pinned-deps,
  shrinkwrap, distribution boundary, vendor).
- Touched unit suites pass: coding-agent compaction and settings, subagent
  supervisor control, permission-system session-approval, chatobby frontend
  coordinator, and the obsidian-agent prompt suite.
- A production-equivalent test candidate has been installed in a disposable
  vault for manual verification before publication.

## Install or update

Install or update the Chatobby Community plugin, open Chatobby, and use its
Install or Update Chatobby action. The plugin verifies the signed descriptor,
signed package manifest, and every runtime file before activation.

This release does not contain a standalone Windows installer.

Chatobby remains public-alpha software. Back up important vaults and begin with
the minimum permissions needed for the task.
