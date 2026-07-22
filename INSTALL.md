# Install Chatobby Runtime

[![Install Chatobby in Obsidian](https://img.shields.io/badge/Install%20in-Obsidian-7C3AED?logo=obsidian&logoColor=white)](https://obsidian.md/plugins?id=chatobby)

Chatobby Runtime is installed and updated through Chatobby's signed in-plugin
guide. Release assets in this repository are inputs to that updater, not
standalone installers. Do not download GitHub's **Source code (zip)** or
**Source code (tar.gz)** links; they are automatic documentation snapshots and
cannot install Chatobby.

## Requirements

- Windows 10 or 11 on x64 hardware, or macOS 11 or newer on Apple Silicon or
  Intel hardware
- Obsidian 1.8.0 or newer
- The Chatobby Community plugin
- A model-provider account or local provider supported by Chatobby

macOS support is experimental and has not yet been verified by an external
tester on a physical Mac. The free alpha uses an ad-hoc macOS code signature,
not Apple notarization, so macOS may require one explicit **Open Anyway**
approval. Chatobby never changes Gatekeeper, quarantine, Full Disk Access, or
other macOS security settings.

## Install from Obsidian

1. Install and enable Chatobby from Obsidian's Community plugin directory.
2. Open Chatobby from the ribbon and select **Install runtime**.
3. Review the version, download size, source, and verification explanation.
4. Select **Install** and wait for **Chatobby is ready**.
5. Connect a model provider in **Settings → Chatobby**.

Chatobby downloads from this repository only after confirmation. It verifies
the signed update descriptor, signed runtime manifest, and every packaged file
before installing atomically under `%LOCALAPPDATA%\Chatobby\runtime` on
Windows or `~/Library/Application Support/Chatobby/runtime` on macOS. It does
not request administrator access, use `sudo`, or run a standalone installer.

After installation, Chatobby verifies the runtime package signature and every
inventoried file before starting it. If the view was closed during the process,
reopen Chatobby and select **Check again**.

## Update

Obsidian updates the connector. When a compatible runtime update is available,
Chatobby shows **Update Chatobby** above the composer. Open the guide, review
the release details, and confirm **Update**. The package is downloaded and
installed only after that confirmation; Chatobby does not silently update the
runtime.

## Uninstall

Remove the Chatobby connector from Obsidian. To remove the local runtime, close
Obsidian and delete `%LOCALAPPDATA%\Chatobby\runtime` on Windows or
`~/Library/Application Support/Chatobby/runtime` on macOS. Uninstallation
intentionally does not delete vault content, sessions, memory, credentials, or
other user-owned Chatobby state. Use Chatobby's data controls and retain a
backup before deleting local state manually.
