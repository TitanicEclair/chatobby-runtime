# Chatobby Runtime 0.1.0 public alpha

Initial Windows x64 public-alpha runtime for the Chatobby Obsidian connector.

## Install on Windows

[![Download Chatobby for Windows](https://img.shields.io/badge/Download%20Chatobby-Windows%20installer-0078D4?logo=windows&logoColor=white)](https://github.com/TitanicEclair/chatobby-runtime/releases/latest/download/Chatobby-Setup.exe)

1. Install and enable Chatobby from Obsidian's Community plugin directory.
2. Download and run **`Chatobby-Setup.exe`** using the button above.
3. Complete the licence, data-flow, and alpha-safety confirmations.
4. Return to Chatobby in Obsidian and select **Check again**.
5. Connect a model provider in **Settings → Chatobby**.

> **Download the `.exe`, not “Source code.”** GitHub automatically adds Source
> code (zip) and Source code (tar.gz) links to every release. Those contain only
> this repository's documentation and cannot install Chatobby.

For verification, download the
[SHA-256 checksum](https://github.com/TitanicEclair/chatobby-runtime/releases/latest/download/Chatobby-Setup.exe.sha256.txt)
and compare it with the installer before running it.

## Included

- Local multi-provider agent runtime
- Permission policies, memory, events, workflows, context queries, tasks,
  channels, and multi-agent orchestration
- Paginated PDF, modern Office, OpenDocument, RTF, HTML, Markdown, CSV, and
  text/code document reading
- Ed25519-signed complete package manifest, SHA-256 checksums, dependency
  licences, third-party notices, SPDX SBOM, and build provenance
- Runtime-only installer that does not write into an Obsidian vault

## Important alpha warning

`Chatobby-Setup.exe` is not yet Authenticode-signed, so Windows may display an
unknown-publisher warning. Download only from this GitHub release and verify the
attached SHA-256 checksum. Do not disable Windows security protections.

Chatobby is free during the alpha. Optional Patreon support does not unlock
features or provide a warranty. Back up the files and vaults you intend to use.
