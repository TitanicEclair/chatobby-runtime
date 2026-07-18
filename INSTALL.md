# Install Chatobby Runtime

[![View the latest Windows downloads](https://img.shields.io/badge/Chatobby-Latest%20Windows%20downloads-0078D4?logo=windows&logoColor=white)](https://github.com/TitanicEclair/chatobby-runtime/releases/latest)

The normal setup path is Chatobby's signed in-plugin installation guide. The
release also provides two manual installation types. Do not download GitHub's
**Source code (zip)** or **Source code (tar.gz)** links; those are automatic
snapshots of this documentation repository and cannot install Chatobby.

| Installer | Installs | Vault selection |
|---|---|---|
| `Chatobby-Runtime-Setup-<version>.exe` | Runtime only, for the Community plugin | None |
| `Chatobby-Standalone-Setup-<version>.exe` | Runtime and plugin | Selects one existing Obsidian vault |

## Requirements

- Windows 10 or 11 on x64 hardware
- Obsidian 1.8.0 or newer
- The Chatobby Community plugin
- A model-provider account or local provider supported by Chatobby

## Install from Obsidian

1. Install and enable Chatobby from Obsidian's Community plugin directory.
2. Open Chatobby from the ribbon and select **Install runtime**.
3. Review the version, download size, source, and verification explanation.
4. Select **Install** and wait for **Chatobby is ready**.
5. Connect a model provider in **Settings → Chatobby**.

Chatobby downloads from this repository only after confirmation. It verifies
the signed update descriptor, signed runtime manifest, and every packaged file
before installing atomically under `%LOCALAPPDATA%\Chatobby\runtime`. It does
not request administrator access or run a downloaded Windows installer.

## Manual installer alternative

Download one installer and its adjacent `.sha256.txt` file from the same GitHub
release. In PowerShell, substitute the exact downloaded filename:

```powershell
Get-FileHash -Algorithm SHA256 .\Chatobby-Runtime-Setup-0.1.5.exe
Get-Content .\Chatobby-Runtime-Setup-0.1.5.exe.sha256.txt
```

The values must match. Run the installer as the Windows user who runs Obsidian.
The Runtime installer writes under `%LOCALAPPDATA%\Chatobby\runtime`; it does
not write into an Obsidian vault or install the Community plugin. The
Standalone installer asks for an existing vault, installs the three plugin
files under `.obsidian\plugins\chatobby`, and preserves existing `data.json`
settings.

Windows may show an unknown-publisher warning because the initial alpha is not
yet Authenticode-signed. Confirm that the file came from this official
repository and that its checksum matches before choosing to continue. Do not
disable SmartScreen or antivirus globally.

After installation, open Chatobby in Obsidian and select **Check again**. The
connector verifies the runtime package signature and every inventoried file
before starting it.

## Update

Obsidian updates the connector. When a compatible runtime update is available,
Chatobby shows **Update Chatobby** above the composer. Open the guide, review
the release details, and confirm **Update**. The package is downloaded and
installed only after that confirmation; Chatobby does not silently update the
runtime. The manual installer remains an alternative.

## Uninstall

Remove **Chatobby Runtime** from Windows **Installed apps** and remove the
Chatobby connector from Obsidian separately. Uninstallation intentionally does
not delete vault content, sessions, memory, credentials, or other user-owned
Chatobby state. Use Chatobby's data controls and retain a backup before deleting
local state manually.
