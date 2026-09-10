# Chatobby 0.5.2

- **First installation:** fix permission initialization that could prevent chats and tools from working in a new vault.
- **Search continuation:** fix cursor-only web and image searches being rejected after input validation.
- **Parallel tools:** fix a startup race that could report an MCP disconnect when tools connected at the same time.
- **Windows workspace access:** fix unchanged Project records being mistaken for corrupt data while sandboxed tools run together. Reduce repeated startup checks that delayed tool connections.
- **Linux tools:** fix a missing startup dependency that prevented sandboxed file and web tools from starting. Report child startup errors with their actual exit code.
- **macOS tools:** include the system paths and resolver access needed by sandboxed commands, and preserve verified filesystem aliases through runtime startup.
- **Runtime updates:** show both versions and an Update action when the plugin and runtime differ. Updating stops current work, including subagents, so saved agents cannot block installation.
- **Accurate progress:** show success only after the new runtime connects. Report a failed stop or installation and keep the previous package available for recovery.
- **Interrupted work:** show abandoned tool calls as interrupted after reopening a chat, rather than leaving them marked as preparing.
- **Restarting:** correctly restart if Chatobby is still connecting after a plugin reload.
- **Tool failures:** distinguish missing files, denied access, connection failures and sandbox errors. Keep a matching diagnostic category in the local runtime log.
- **Agent context:** report the actual runtime version separately from the plugin version.

Update the plugin through Obsidian Community plugins, then choose **Update** in Chatobby if the runtime version differs. Runtime updates are manual. Chats, Projects, memory and model connections are preserved; interrupted agents do not restart automatically.

This update includes the 0.5.1 Windows path, command-startup, cancellation and web-search fixes. Default web search can still encounter provider bot challenges. macOS and Linux remain experimental; macOS packages are not notarized.

[Report a problem or share feedback](https://github.com/TitanicEclair/chatobby-obsidian/issues)
