# Chatobby Runtime 0.1.3 public alpha

This release pairs with the Chatobby Obsidian plugin `0.1.3` and strengthens
the Web Viewer tool surface for signed-in, client-rendered, and visually
inspected pages.

## Web Viewer improvements

- Read meaningful page content as bounded Markdown, plain text, or structured
  blocks with page metadata, outline, links, coverage, and continuation
  cursors.
- Inspect accessible page structure and use stable element references for
  clicks and form entry.
- Query or inspect sanitized DOM when semantic reading is not enough.
- Navigate browser history, send native keyboard input, wait on live page
  changes, and capture screenshots.
- Redact password values and reject stale element references after navigation.

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
