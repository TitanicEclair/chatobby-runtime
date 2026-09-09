# Chatobby Runtime 0.5.0

## Vault and Project workspaces

- Read-only and Workspace access work in ordinary Vault chats as well as Projects. Network access starts On and can be switched independently.
- Windows supports compatible existing PowerShell installations. Stop cancels foreground work and cleans up its owned processes, including longer commands.
- Full access uses the permissions available to your operating-system account.
- Archive Projects with their chats and restore them later. Permanent Project deletion removes Chatobby data while keeping attached note folders.

## Models and connections

- Use ChatGPT, GitHub Copilot and xAI subscription connections with Chatobby's harness, alongside API keys and supported token plans.
- Discover and test models from a running local server. Use reported context limits and server output defaults, or set individual overrides.
- Subscription model lists refresh from the connected account. Sign-in opens the default browser.

## Agents, Channels and memory

- Keep specialist agents available across turns, with custom prompts, models and skills.
- Invite agents into Channels to plan and coordinate. Address selected participants or send direct messages; invitations can wake available sessions.
- Combine steering messages waiting at the next intake. Agents have improved guidance for parallel tools, background work and finishing the user's task.
- Maintain editable memory, search earlier sessions with richer read-only queries and schedule recurring Events.
- Use expanded native guidance for Obsidian commands, API discovery, tabs, editors, settings and local-model setup.

## Obsidian interface

The paired [Chatobby 0.5.0 connector](https://github.com/TitanicEclair/chatobby-obsidian/releases/tag/0.5.0)
adds named native tabs, a redesigned sidebar, bounded streaming reasoning,
simpler Memory and Permissions pages, improved Channels, onboarding and update
highlights. The core harness remains free, stores chats and memory locally and
has no telemetry.

## Install or update

Update Chatobby through Obsidian Community plugins, then confirm the runtime
installation or update inside Chatobby. Both components use version **0.5.0**.
See [INSTALL.md](INSTALL.md). The runtime verifies package signatures and file
hashes before activation and preserves the previous installation for recovery.

## Native components and platforms

This release packages Landstrip built from pinned inputs. The runtime bundles
include matching component inventories, notices, build recipes and applicable
source material. Required sandbox qualification runs during development and
release testing; users do not need to run a device-verification checklist.

All five native/package targets passed release qualification. Interactive
Obsidian acceptance was performed on Windows. macOS and Linux remain
experimental; representative physical-device acceptance, including macOS 11,
is not established. Linux targets ordinary glibc desktops; Flatpak, Snap, musl
and other confinement environments remain unverified.

Runtime packages are Ed25519-signed. Windows has no Authenticode signature;
macOS uses ad-hoc signing and is not notarized. Chatobby does not change OS
security settings. Obsidian app tools execute in Obsidian and are controlled
separately from native file and shell restrictions.
