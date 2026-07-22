# Chatobby Runtime 0.1.16 public alpha

Runtime 0.1.16 pairs with Chatobby Community plugin 0.1.16 and adds
experimental native macOS support while retaining Windows x64 support and
runtime protocol revision 3.

> **macOS status:** Apple Silicon and Intel packages passed native GitHub macOS
> runner builds, signature and architecture checks, clean-home startup,
> installer/update/rollback tests, and signed-bundle verification. This alpha
> has not yet been verified by an external tester on a physical Mac and is not
> Apple-notarized.

## What changed

- Added native Apple Silicon (`darwin-arm64`) and Intel Mac (`darwin-x64`)
  runtime packages alongside the existing Windows x64 package.
- Added a signed multi-platform runtime index with exact platform and
  architecture selection; incompatible targets fail before execution.
- Added macOS Application Support and Logs paths with fixed private file modes,
  symlink rejection, atomic activation, and rollback to the last known-good
  runtime.
- Added macOS shell environment recovery for Finder-launched Obsidian without
  requiring Homebrew, `sudo`, PATH modification, or security-policy changes.
- Added explicit diagnostics for unavailable targets, architecture mismatch,
  invalid executable permissions, Gatekeeper blocks, and macOS filesystem
  permission failures.
- Preserved the legacy signed Windows update descriptor for older 0.1.x
  connectors.

The runtime packages and multi-platform index are signed with Chatobby's
existing Ed25519 release key. Each package includes its complete signed file
inventory, checksums, SBOM, provenance, dependency licences, third-party
notices, runtime licence, privacy notice, and alpha-risk notice.

## Install or update

Install or update the Chatobby Community plugin, open Chatobby, and use its
**Install runtime** or **Update Chatobby** action. The plugin selects the exact
package for the current operating system and architecture, then verifies the
signed release metadata, signed package manifest, and every runtime file before
activation.

Chatobby remains public-alpha software. Back up important vaults and begin with
the minimum permissions needed for the task.
