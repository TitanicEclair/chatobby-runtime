# Chatobby Runtime 0.1.14 public alpha

Runtime 0.1.14 pairs with Chatobby Community plugin 0.1.14 and prepares the
connector for a substantially cleaner Obsidian Community review.

> **Paired update:** update the Community plugin first. It will offer to install
> this matching signed runtime. Plugin 0.1.13 and Runtime 0.1.13 continue to
> work together unchanged.

## What changed

- Updated the browser-facing client artifact to use popup-safe window timers
  and WebSocket access while preserving the portable shared client source.
- Normalized the generated frontend permission contract used by the reviewable
  connector.
- Refreshed the packaged provider catalogue used by the runtime.
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
