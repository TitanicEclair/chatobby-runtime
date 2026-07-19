# Chatobby Runtime

This repository distributes the proprietary local runtime used by the
[Chatobby Obsidian connector](https://github.com/TitanicEclair/chatobby-obsidian).
The runtime contains the model, tool, memory, permission, event, workflow, and
multi-agent systems. It runs locally on Windows and communicates with the
connector over authenticated loopback connections.

> **Public alpha:** Chatobby is unfinished pre-release software. Back up the
> files and vaults you intend to use, begin with a copied test note, and grant
> only the permissions required for your task.

## Install on Windows

[![Install Chatobby in Obsidian](https://img.shields.io/badge/Install%20in-Obsidian-7C3AED?logo=obsidian&logoColor=white)](https://obsidian.md/plugins?id=chatobby)

Install Chatobby through Obsidian, then use the installation guide inside the
Chatobby view. Runtime release assets are consumed and verified by the plugin;
they are not standalone installers. The **Source code (zip)** and **Source code
(tar.gz)** links GitHub adds automatically are documentation snapshots and do
not install Chatobby.

## Install

1. Install Chatobby from Obsidian's Community plugin directory.
2. Open Chatobby and select **Install runtime**.
3. Review the version, download size, source, and verification details, then
   select **Install**.
4. Wait for **Chatobby is ready**. If detection was interrupted, select
   **Check again**.
5. Connect a model provider in **Settings → Chatobby**.

The plugin downloads the signed runtime package only after confirmation,
verifies it file-by-file, installs it for the current Windows account without
administrator access, and reconnects the vault.

The runtime executable is not launched as a downloaded installer. Chatobby
verifies the Ed25519-signed update descriptor, signed package manifest, and
every packaged file before activating the update.

See [INSTALL.md](INSTALL.md) for installation, update, and uninstall guidance.

## Distribution and source

The runtime is distributed as licensed object code and its source is not
published in this repository. The runtime package contains the complete runtime
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
