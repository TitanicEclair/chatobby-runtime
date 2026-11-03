# Chatobby Runtime

This repository distributes the proprietary local runtime used by the
[Chatobby Obsidian connector](https://github.com/TitanicEclair/chatobby-obsidian).
The runtime contains the model, tool, memory, permission, event, workflow, and
multi-agent systems. It runs locally on Windows, macOS, and Linux and
communicates with the connector over authenticated loopback connections.
macOS and Linux support are experimental and have not yet completed
representative physical-device acceptance.

> **0.5.4: Workspace permissions.** Choose Read-only, Workspace or Full access,
> with saved workspace choices and one-time approvals. These are application
> controls; OS sandboxing remains unavailable.

## Install through Obsidian

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
5. Open Chatobby's **Settings** page and connect a model provider or local
   model server.

The plugin downloads the signed runtime package only after confirmation,
verifies it file-by-file, installs it for the current operating-system account
without administrator access, and reconnects the vault.

The runtime executable is not launched as a downloaded installer. Chatobby
verifies the Ed25519-signed update descriptor, signed package manifest, and
every packaged file before activating the update.

See [INSTALL.md](INSTALL.md) for installation, update, and uninstall guidance.

## Local model servers

Connect a running Ollama, LM Studio, llama.cpp or compatible server from
Chatobby's **Settings** page. Discover its models, test a connection and use
reported context limits and server output defaults. Per-model overrides are
available when needed. See the
[local model setup guide](https://github.com/TitanicEclair/chatobby-obsidian/blob/main/docs/local-model-connections.md).

## Workspace permissions in 0.5.4

Choose Read-only, Workspace or Full access in the composer or Permissions page.
Built-in file and command tools follow the saved choice for each Vault or
Project; exceptions can request one-time approval. Network access remains on.
Full access uses the operating-system account's authority, including outside
the current Vault or Project. These controls do not create an OS sandbox.

Memory and session-search tools retain their own workspace filters. Obsidian
app access and enabled MCP tools are configured separately. See the concise
[0.5.4 release notes](RELEASE_NOTES_0.5.4.md).

## Distribution and source

The runtime is distributed as licensed object code and its source is not
published in this repository. The runtime package contains the complete runtime
licence, privacy/data-flow notice, alpha-risk notice, dependency licences,
third-party notices, SPDX SBOM, build provenance, checksums, and an
Ed25519-signed package manifest. See [LICENSE.md](LICENSE.md) and
[PRIVACY.md](PRIVACY.md).

The core Chatobby harness is free and will remain free. Model providers set
their own subscription and API prices. Optional
[Patreon support](https://www.patreon.com/cw/MadelynCruzTan/membership) does not
unlock features, limits, priority support, or continued availability.

## Support

Report ordinary defects through the
[connector issue tracker](https://github.com/TitanicEclair/chatobby-obsidian/issues).
Follow [SECURITY.md](SECURITY.md) for vulnerabilities. Never attach provider
keys, private notes, unredacted session logs, or confidential file paths.
