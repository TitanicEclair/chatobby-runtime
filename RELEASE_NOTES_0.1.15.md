# Chatobby Runtime 0.1.15 public alpha

Runtime 0.1.15 pairs with Chatobby Community plugin 0.1.15 and focuses on
Community-review quality without changing the runtime protocol.

> **Paired update:** update the Community plugin first. It will offer to install
> this matching signed runtime. Plugin 0.1.14 and Runtime 0.1.14 continue to
> work together unchanged.

## What changed

- Published a typed browser-facing client source closure for the reviewable
  connector while preserving the same authenticated runtime protocol.
- Strengthened frontend subscription validation for resume sequence values.
- Simplified redundant permission contract types used by the connector.
- Refreshed the packaged OpenRouter model catalogue.
- Retained Runtime protocol revision 3 and compatibility with Chatobby 0.1.x.

The runtime package is signed with Chatobby's existing Ed25519 release key and
includes its manifest, checksums, SBOM, provenance, third-party notices, public
key, licence, privacy notice, alpha notice, and signed update descriptor.

## Install or update

Install or update the Chatobby Community plugin, open Chatobby, and use its
Install or Update Chatobby action. The plugin verifies the signed release
descriptor, signed package manifest, and every runtime file before activation.

This release does not contain a standalone Windows installer.

Chatobby remains public-alpha software. Back up important vaults and begin with
the minimum permissions needed for the task.
