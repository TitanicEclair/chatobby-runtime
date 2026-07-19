# Chatobby Runtime 0.1.8 public alpha

This runtime update supports Chatobby plugin 0.1.8.

## What changed

- Context Queries now run through a runtime-owned bounded worker with a stable
  project-data SDK and no separately installed Node.js requirement.
- Query tests and exact-source approvals persist across reconnects. Editing a
  script outside Chatobby invalidates its approval and disables the query.
- Prompt submissions have stable IDs and an explicit retraction protocol.
  Before a tool starts or assistant output completes, Chatobby can remove the
  submitted turn from the active session branch and return it to the composer.
- Runtime-owned safety guidance remains active independently of editable project
  prompt sections.
- Runtime version advances to 0.1.8. Protocol 3 and plugin compatibility remain
  unchanged (`0.1.x`).

## Install or update

Install or update the Chatobby Community plugin, open Chatobby, and use its
Install or Update Chatobby action. The plugin verifies the signed descriptor,
signed package manifest, and every runtime file before activation.

This release does not contain a standalone Windows installer.
