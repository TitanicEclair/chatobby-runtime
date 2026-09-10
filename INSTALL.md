# Install Chatobby Runtime

[![Install Chatobby in Obsidian](https://img.shields.io/badge/Install%20in-Obsidian-7C3AED?logo=obsidian&logoColor=white)](https://obsidian.md/plugins?id=chatobby)

Chatobby Runtime is installed and updated through Chatobby's signed in-plugin
guide. Release assets in this repository are inputs to that updater, not
standalone installers. Do not download GitHub's **Source code (zip)** or
**Source code (tar.gz)** links; they are automatic documentation snapshots and
cannot install Chatobby.

## Requirements

- Windows 10 or 11 on x64 hardware, macOS 11 or newer on Apple Silicon or
  Intel hardware, or a glibc-based Linux desktop on x64 or arm64
- Obsidian 1.11.4 or newer
- The Chatobby Community plugin
- A model-provider account or local provider supported by Chatobby

macOS support is experimental and has not yet been verified by an external
tester on a physical Mac. The free alpha uses an ad-hoc macOS code signature,
not Apple notarization, so macOS may require one explicit **Open Anyway**
approval. Chatobby never changes Gatekeeper, quarantine, Full Disk Access, or
other macOS security settings.

Linux support is experimental and has not yet completed representative
physical-device acceptance. Ordinary glibc desktop installs are the initial
target. Flatpak, Snap, musl, and other confinement environments remain
unverified. Chatobby stops before execution on an unsupported libc,
architecture, permission, or confinement result and never requests root
access.

## Install from Obsidian

1. Install and enable Chatobby from Obsidian's Community plugin directory.
2. Open Chatobby from the ribbon and select **Install runtime**.
3. Review the version, download size, source, and verification explanation.
4. Select **Install** and wait for **Chatobby is ready**.
5. Open Chatobby's **Settings** page and connect a model provider or local
   model server.

Chatobby downloads from this repository only after confirmation. It verifies
the signed update descriptor, signed runtime manifest, and every packaged file
before installing atomically under `%LOCALAPPDATA%\Chatobby\runtime` on
Windows, `~/Library/Application Support/Chatobby/runtime` on macOS, or
`$XDG_DATA_HOME/Chatobby/runtime` on Linux (falling back to
`~/.local/share/Chatobby/runtime`). It does not request administrator access,
use `sudo`, or run a standalone installer.

After installation, Chatobby verifies the runtime package signature and every
inventoried file before starting it. If the view was closed during the process,
reopen Chatobby and select **Check again**.

## Add the Chatobby Guide

In **Settings → Chatobby**, select **Add guide to vault**. Chatobby downloads
the signed Guide, verifies its compatibility and contents, then asks before
writing the 12 linked guide pages. The Guide covers connections, local models,
Projects, permissions, memory, agents, Channels and Events. Updating it keeps
unrelated notes intact.

## Update

Obsidian updates the plugin. If the plugin and runtime versions differ,
Chatobby shows both versions and an **Update** action beside the composer.
Select **Update** to download, verify and install the matching runtime.

Updating stops current work, including active subagents. Chats, Projects,
memory and model connections are kept; interrupted agents do not restart
automatically. Runtime updates are manual.

## Uninstall

Remove the Chatobby connector from Obsidian. To remove the local runtime, close
Obsidian and delete `%LOCALAPPDATA%\Chatobby\runtime` on Windows or
`~/Library/Application Support/Chatobby/runtime` on macOS, or
`$XDG_DATA_HOME/Chatobby/runtime` on Linux (falling back to
`~/.local/share/Chatobby/runtime`). Uninstallation intentionally does not
delete vault content, sessions, memory, credentials, or other user-owned
Chatobby state. Use Chatobby's data controls and retain a backup before
deleting local state manually.
