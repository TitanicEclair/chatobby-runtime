# Chatobby Runtime 0.1.6 public alpha

This release pairs with the Chatobby Obsidian plugin `0.1.6` and focuses on
dependable workflow and subagent execution, clearer permission handling,
reliable cancellation, and consistent Obsidian vault targeting.

## What changed

- Workflow previews can assess a prospective token budget and report estimated
  input, response reserve, and a recommended minimum before launch.
- Subagent runs reject an undersized initial token budget before calling the
  model provider, preventing avoidable usage and post-hoc budget failures.
- Equivalent explicit child permission policies no longer produce redundant
  override confirmations; genuine one-run overrides remain visible.
- Stop acknowledges cancellation immediately while bounded provider cleanup
  continues in the background.
- Obsidian CLI commands now place vault selectors correctly, preflight the
  target vault for mutations, honor configured timeouts, and confirm operations
  that can disconnect Chatobby.
- Vault folder aliases `.`, `./`, `.\\`, `/`, and the empty path consistently
  resolve to the vault root.
- Runtime-owned coding, Web Viewer, workflow, Event, and Context Query skills
  remain immutable and hidden from user-editable skill storage while staying
  available for semantic agent selection.
- OpenRouter model pricing metadata was refreshed.

## Install options

- **From the plugin:** select **Install runtime** or **Update Chatobby**, review
  the signed release, and confirm. No administrator access is requested.
- **Runtime installer:** `Chatobby-Runtime-Setup-0.1.6.exe` installs only the
  local runtime for users who already have the Community plugin. It does not
  ask for a vault.
- **Standalone installer:** `Chatobby-Standalone-Setup-0.1.6.exe` asks for one
  existing Obsidian vault and installs both the runtime and plugin.

The runtime package and update descriptor are Ed25519-signed and verified
file-by-file. The Windows executables are not yet Authenticode-signed, so
Windows may show an unknown-publisher warning. Download only from this
repository and verify the adjacent SHA-256 checksum.
