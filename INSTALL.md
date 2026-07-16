# Install Chatobby Runtime

## Requirements

- Windows 10 or 11 on x64 hardware
- Obsidian 1.8.0 or newer
- The Chatobby Community plugin
- A model-provider account or local provider supported by Chatobby

## Verify and install

Download both `Chatobby-Setup.exe` and
`Chatobby-Setup.exe.sha256.txt` from the same GitHub release. In PowerShell:

```powershell
Get-FileHash -Algorithm SHA256 .\Chatobby-Setup.exe
Get-Content .\Chatobby-Setup.exe.sha256.txt
```

The values must match. Run the installer as the Windows user who runs Obsidian.
The runtime is installed under `%LOCALAPPDATA%\Chatobby\runtime`; the installer
does not write into an Obsidian vault or install the Community plugin.

After installation, open Chatobby in Obsidian and select **Check again**. The
connector verifies the runtime package signature and every inventoried file
before starting it.

## Update

Obsidian updates the connector. Runtime updates are installed deliberately from
this repository. Download the new installer and checksum, verify them, and run
the installer. Chatobby does not silently download or execute runtime updates.

## Uninstall

Remove **Chatobby Runtime** from Windows **Installed apps** and remove the
Chatobby connector from Obsidian separately. Uninstallation intentionally does
not delete vault content, sessions, memory, credentials, or other user-owned
Chatobby state. Use Chatobby's data controls and retain a backup before deleting
local state manually.
