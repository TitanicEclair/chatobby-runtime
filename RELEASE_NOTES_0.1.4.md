# Chatobby Runtime 0.1.4 public alpha

This release pairs with the Chatobby Obsidian plugin `0.1.4` and removes the
arbitrary Web Viewer page-evaluation surface identified by Obsidian's automated
review.

## Review-safe browser tools

- Removed arbitrary JavaScript evaluation from the agent-facing Web Viewer
  tools.
- Kept bounded Markdown and text reading, accessible snapshots, sanitized DOM
  inspection, stable element references, native clicks and keyboard input,
  event-driven waits, browser history, and screenshots.
- Updated the runtime tool catalog and prompt guidance so agents use semantic
  page reading and structured interaction instead of arbitrary page scripts.

## Install options

- **From the plugin:** select **Install runtime** or **Update Chatobby**, review
  the signed release, and confirm the action. No administrator access is
  requested.
- **Runtime-only installer:** installs the runtime for an existing Community
  plugin installation and does not select or modify a vault.
- **Standalone installer:** installs both the runtime and connector into a
  vault selected during setup.

The runtime package and update descriptor are Ed25519-signed. The Windows
installers are not yet Authenticode-signed, so Windows may show an
unknown-publisher warning. Download only from this repository and verify the
published SHA-256 checksum.
