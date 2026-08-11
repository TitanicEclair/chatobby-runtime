# Chatobby Runtime 0.3.3

Chatobby 0.3.3 improves long-running work, web and image research, Project
guidance, and the accuracy of live context reporting.

## What changed

- Long shell work can continue as a managed job instead of being restarted when
  a foreground interaction yields. Chatobby can inspect, wait for, read, or
  cancel the existing job, and explicit command timeouts are honored.
- A narrow catastrophic-command safety floor blocks raw-device writes,
  filesystem formatting, and recursive deletion of the active workspace, user
  home, or filesystem roots even under Full access. Legitimate maintenance
  remains available through the normal one-shot review path.
- Web and image research retains exact result handles, source URLs, licence and
  provenance details, and selected image embeds so Chatobby does not have to
  guess links or download unusable bytes.
- Chatobby's working guidance now emphasizes useful synthesis, evidence-aware
  recommendations, multi-step task tracking, bounded scripting for repetitive
  work, and verification before asking the user to inspect something manually.
- A Project's generated `chatobby.md` body is a revisioned, lower-priority
  system-prompt layer. It refreshes before the next turn while protected
  Chatobby instructions remain authoritative.
- Project folder facts and instruction changes refresh through the canonical
  context authority without broadening file permissions.
- Automatic-compaction settings, context usage, and completed-turn elapsed time
  are projected consistently for the connector after compaction and reload.

This remains public-alpha software. macOS and Linux support remain experimental
until representative physical-device acceptance is completed.
