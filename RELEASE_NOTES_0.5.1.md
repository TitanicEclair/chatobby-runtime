# Chatobby Runtime 0.5.1

- Fix Windows folder-name casing and system path aliases that could prevent constrained file reads, shell commands and web tools from starting.
- Refresh callable tools during an ongoing chat when access changes. Keep new pages and MCP connections working after a server stops with completed cleanup.
- Fix an intermittent Windows clock comparison that could prevent a running command from stopping cleanly.
- Handle short commands that exit before stdin closes, without losing actual input or process errors.
- Improve default DuckDuckGo search with regional rankings, separate queries for selected sites, exclusions, usable-result filtering and real pagination. Pace requests and preserve useful results when a later page fails.
- Preserve actual connection, permission and startup errors. Validate the selected Obsidian vault before CLI execution, including errors returned with exit code zero.
- Clarify agent guidance for direct shell invocation, search queries, continuation and evidence reporting.

Update the [Chatobby connector to 0.5.1](https://github.com/TitanicEclair/chatobby-obsidian/releases/tag/0.5.1), then install the matching runtime update through Chatobby. Chats, Projects, memory and model connections are preserved. The protocol and stored-data schemas are unchanged.

Default search works without an API key. DuckDuckGo can still return bot challenges; Chatobby reports that cause and retains other successful results where available. No new search provider is added in this patch.

Runtime packages include matching native component inventories, notices, build recipes and applicable source material. All five targets must pass native and package qualification before publication. Windows receives interactive Obsidian acceptance. macOS and Linux remain experimental; representative physical-device acceptance, including macOS 11, is not established. Linux targets ordinary glibc desktops; Flatpak, Snap and musl remain unverified.

Packages are Ed25519-signed. Windows has no Authenticode signature; macOS uses ad-hoc signing and is not notarized. Obsidian app tools retain their separate app-access boundary.

[Installation and updates](INSTALL.md) · [Report an issue](https://github.com/TitanicEclair/chatobby-obsidian/issues)
