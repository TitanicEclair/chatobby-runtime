# Chatobby Runtime

This repository distributes the proprietary local runtime used by the
[Chatobby Obsidian connector](https://github.com/TitanicEclair/chatobby-obsidian).
The runtime contains the model, tool, memory, permission, event, workflow, and
multi-agent systems. It runs locally on Windows and communicates with the
connector over authenticated loopback connections.

> **Public alpha:** Chatobby is unfinished pre-release software. Back up the
> files and vaults you intend to use, begin with a copied test note, and grant
> only the permissions required for your task.

## Install

1. Install Chatobby from Obsidian's Community plugin directory.
2. Download `Chatobby-Setup.exe` and its checksum from the
   [latest release](https://github.com/TitanicEclair/chatobby-runtime/releases/latest).
3. Verify the SHA-256 checksum.
4. Run the installer. Return to Obsidian and select **Check again**.
5. Connect your own model provider in **Settings → Chatobby**.

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
