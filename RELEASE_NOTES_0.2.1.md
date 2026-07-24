# Chatobby Runtime 0.2.1 public alpha

Runtime 0.2.1 pairs with Chatobby Community plugin 0.2.1 on Windows x64,
Apple Silicon macOS, and Intel macOS. Runtime protocol revision 3 is retained.

> **macOS status:** Apple Silicon and Intel packages are built and verified on
> native GitHub macOS runners. This alpha has not been externally verified on a
> physical Mac and is not Apple-notarized.

## What changed

- Published the matching signed runtime packages required by the Chatobby 0.2.1
  composer update.
- Retained the 0.2.0 runtime behavior, protocol, permission, tool-discovery,
  session, and installation contracts.

Each production package is verified through the signed multi-platform runtime
index, its signed file inventory, SHA-256 hashes, SBOM, provenance, dependency
licences, runtime licence, privacy notice, and alpha-risk notice before
activation.

Chatobby remains public-alpha software. Back up important vaults and begin with
the minimum permissions needed for the task.
