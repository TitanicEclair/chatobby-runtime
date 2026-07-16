# Chatobby Runtime

This repository distributes the proprietary local runtime used by the
[Chatobby Obsidian connector](https://github.com/TitanicEclair/chatobby-obsidian).
The runtime contains the model, tool, memory, permission, event, workflow, and
multi-agent systems. It runs locally on Windows and communicates with the
connector over authenticated loopback connections.

> **Public alpha:** Chatobby is unfinished pre-release software. Back up the
> files and vaults you intend to use, begin with a copied test note, and grant
> only the permissions required for your task.

## Download for Windows

[![Download Chatobby for Windows](https://img.shields.io/badge/Download%20Chatobby-Windows%20installer-0078D4?logo=windows&logoColor=white)](https://github.com/TitanicEclair/chatobby-runtime/releases/latest/download/Chatobby-Setup.exe)

Download **`Chatobby-Setup.exe`**. The **Source code (zip)** and **Source code
(tar.gz)** links that GitHub adds to the release are documentation snapshots;
they do not install Chatobby.

## Install

1. Install Chatobby from Obsidian's Community plugin directory.
2. Select **Get runtime** in Chatobby, or use the download button above.
3. Run the downloaded `Chatobby-Setup.exe` and complete the installer.
4. Return to Chatobby and select **Check again**.
5. Connect a model provider in **Settings → Chatobby**.

For additional verification, download the
[SHA-256 checksum](https://github.com/TitanicEclair/chatobby-runtime/releases/latest/download/Chatobby-Setup.exe.sha256.txt)
from the same release and follow [INSTALL.md](INSTALL.md).

The initial alpha installer is not Authenticode-signed and Windows may identify
it as an unknown publisher. Download only from this repository and verify the
published checksum. Do not disable SmartScreen or antivirus globally.

See [INSTALL.md](INSTALL.md) for installation, update, and uninstall guidance.

## Distribution and source

The runtime is distributed as licensed object code and its source is not
published in this repository. The installer contains the complete runtime
licence, privacy/data-flow notice, alpha-risk notice, dependency licences,
third-party notices, SPDX SBOM, build provenance, checksums, and an
Ed25519-signed package manifest. See [LICENSE.md](LICENSE.md) and
[PRIVACY.md](PRIVACY.md).

Chatobby is free during the public alpha. Optional
[Patreon support](https://www.patreon.com/cw/MadelynCruzTan/membership) does not
unlock features, limits, priority support, or continued availability.

## Support

Report ordinary defects through the
[connector issue tracker](https://github.com/TitanicEclair/chatobby-obsidian/issues).
Follow [SECURITY.md](SECURITY.md) for vulnerabilities. Never attach provider
keys, private notes, unredacted session logs, or confidential file paths.
