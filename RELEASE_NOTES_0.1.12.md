# Chatobby Runtime 0.1.12 public alpha

This runtime update aligns with Chatobby plugin 0.1.12 and strengthens agent prompting across coding, delegation, safety, memory, and tool-calling.

> **Paired update:** Runtime 0.1.12 uses the same signing key as 0.1.11. It is verified only by Chatobby plugin 0.1.12, and plugin 0.1.12 expects Runtime 0.1.12. Update the plugin first; it will offer to install this matching runtime. Plugin 0.1.11 and Runtime 0.1.11 continue to work together unchanged.

## What changed

- The obsidian-agent system prompt now carries an enumerated risk taxonomy for consequential actions (destructive, hard-to-reverse, externally visible, third-party upload) with a `git status`-before-destructive rule, split out from the immutable refusal block.
- Memory guidance adds an Applicable/Durable/Legible rubric with good-bad examples, a write-before-turn-finished timing rule, and a skeptical-question-is-correction trigger so durable learning improves across sessions.
- Coding discipline now actively discourages compatibility hacks, speculative additions, premature error handling, and unnecessary comments.
- Subagent delegation is strengthened with "never delegate understanding," a smart-colleague briefing shape, and explicit cost-discipline (inline bounded work, no fan-out, no redo).
- Communication guidance leads with the outcome, keeps the final message self-contained, and abstracts tool names from user-facing prose.
- Calibrated autonomy grants explicit permission to act on low-risk in-scope work with a bounded three-retry cap on fix loops.
- Every built-in prompt section carries provenance and authority-tier markers for auditability.
- Tool descriptions across high-traffic direct tools, the coding tools, the `mcp` proxy, the web tools, and the proxy-routed obsidian families now include when-to-use / when-NOT-to-use pairs, consequence-paired constraints, and mistake-proofing guidance.
- Runtime version advances to 0.1.12. Protocol 3 and plugin compatibility remain unchanged (`0.1.x`). The package signing key is unchanged.

## Verification

- Repository static checks pass.
- The obsidian-agent prompt suite passes 98 tests; the mcp-server-obsidian suite passes 96 tests.
- The signed package manifest verifies against the plugin 0.1.12 trust anchor.
- A production-equivalent test candidate has been manually verified in a disposable vault.

## Install or update

Install or update the Chatobby Community plugin, open Chatobby, and use its Install or Update Chatobby action. The plugin verifies the signed descriptor, signed package manifest, and every runtime file before activation.

This release does not contain a standalone Windows installer.

Chatobby remains public-alpha software. Back up important vaults and begin with the minimum permissions needed for the task.
