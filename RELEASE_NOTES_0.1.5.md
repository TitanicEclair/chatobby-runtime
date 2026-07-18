# Chatobby Runtime 0.1.5 public alpha

This release pairs with the Chatobby Obsidian plugin `0.1.5` and focuses on
bounded subagent work, reliable session navigation, native-skill isolation,
and richer Obsidian workspace, attachment, and Web Viewer operations.

## What changed

- Subagent token budgets now charge uncached model work while retaining cache
  usage as diagnostics.
- Built-in subagent roles use bounded defaults and clearer task-specific
  guidance.
- Exact Obsidian leaf targeting, compact workspace layout metadata, native
  pointer interaction, and attachment promotion are available to agents.
- Chatobby-owned native skills are kept outside user-visible skill directories
  and migrated safely during updates.
- Session naming, session-directory metadata, and long-page state handling are
  more predictable.

## Install options

- **From the plugin:** select **Install runtime** or **Update Chatobby**, review
  the signed release, and confirm. No administrator access is requested.
- **Runtime installer:** `Chatobby-Runtime-Setup-0.1.5.exe` installs only the
  local runtime for users who already have the Community plugin. It does not
  ask for a vault.
- **Standalone installer:** `Chatobby-Standalone-Setup-0.1.5.exe` asks for one
  existing Obsidian vault and installs both the runtime and plugin.

The runtime package and update descriptor are Ed25519-signed and verified
file-by-file. The Windows executables are not yet Authenticode-signed, so
Windows may show an unknown-publisher warning. Download only from this
repository and verify the adjacent SHA-256 checksum.
