# Chatobby Runtime 0.1.10 public alpha

This runtime update supports Chatobby plugin 0.1.10.

## What changed

- Refined Obsidian tools now publish their complete parameter contracts instead
  of appearing to accept no arguments.
- Runtime-owned Web Viewer guidance uses the canonical open, wait, read, and
  workspace fields and avoids repeated invalid argument guesses.
- Web Viewer operations support directional split placement, exact final-URL
  waits, and consistent leaf identities across browser and workspace tools.
- Immutable Chatobby skill guidance loads without an unrelated permission
  prompt under built-in policies.
- Built-in permission-policy upgrades are persisted into the effective runtime
  configuration instead of leaving existing vaults on stale rules.
- Runtime version advances to 0.1.10. Protocol 3 and plugin compatibility remain
  unchanged (`0.1.x`).

## Install or update

Install or update the Chatobby Community plugin, open Chatobby, and use its
Install or Update Chatobby action. The plugin verifies the signed descriptor,
signed package manifest, and every runtime file before activation.

This release does not contain a standalone Windows installer.
