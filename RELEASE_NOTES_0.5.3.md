# Chatobby 0.5.3

**Sandboxing is temporarily unavailable in this release.** Chatobby runs with
Full file, command and network access under your operating-system account.
Read-only, Workspace and Network controls are hidden until sandboxing returns.

- **Tools:** file, shell and web tools no longer depend on native sandbox setup or cleanup. This addresses the startup and Stop failures reported after 0.5.2.
- **File search:** fix first-use setup on Windows when paths contain spaces or Unicode. Setup failures now identify the failed step, and downloads no longer delay Stop.
- **Project history:** memory and session-search tools stay scoped to the current Project or Vault chat. These query filters do not restrict Full-access file or shell tools.
- **Streaming:** responses update incrementally without repeatedly rebuilding completed text. Long reasoning stays in a scrollable panel and folds when finished.
- **Memory retrieval:** reduce repeated search work before prompts while preserving ranking and workspace filters.
- **Permissions:** show the current Full-access behavior directly. Obsidian app access and enabled MCP tools remain separate choices.

Update the plugin through Obsidian Community plugins, then choose **Update** in
Chatobby if the runtime version differs. Updating stops current work, including
subagents. Chats, Projects, memory, model connections and saved access choices
are retained; saved Read-only, Workspace and Network choices are inactive in 0.5.3.

macOS and Linux remain experimental. macOS packages are not notarized. Default
web search may still encounter search-provider bot challenges.

[Report a problem or share feedback](https://github.com/TitanicEclair/chatobby-obsidian/issues)
