# Chatobby Runtime 0.4.0

Chatobby 0.4.0 strengthens the full working loop: choosing where a chat works,
connecting models, finding the right capability, preserving useful context,
and verifying results inside Obsidian.

## Highlights

- Connect compatible local model servers from Chatobby Settings, including
  Ollama, LM Studio, vLLM, llama.cpp, and OpenAI- or Anthropic-compatible
  endpoints. Optional managed llama.cpp profiles can start, stop, restart, and
  launch on demand without conflating the server process with the model
  connection that chats select.
- Work with existing vault or external Project folders, multiple attached
  roots, an explicit primary working directory, and current Project context.
- Keep prompts submitted during automatic compaction pending until rebuilt
  context is ready. Compaction now has dedicated progress, a durable receipt,
  and an immediate usage refresh.
- Keep large results available through the working turn and query retained
  evidence through stable IDs without recursively producing new result IDs.
- Discover tools, installed Obsidian commands, MCP tools, and eleven maintained
  native skill suites through one ranked capability gateway.
- Prefer ordinary file tools and bounded terminal scripts for durable content,
  while retaining Obsidian CLI for live index, history, link updates, settings,
  plugin lifecycle, command-palette, and developer diagnostics.
- Return typed Obsidian CLI outcomes and recovery instructions instead of a
  generic internal error for invalid screenshot paths, image-model mismatches,
  or render-dependent command sequences.
- Remove retired media/download helpers and their bundled
  Python/Pillow/yt-dlp/NumPy environment.

## Alpha platform status

Windows remains the primary tested desktop path. The production-candidate
matrix builds and exercises Windows x64, macOS Apple Silicon and Intel, and
glibc Linux x64 and arm64 packages. macOS and Linux remain experimental until
representative physical-device acceptance is complete; Flatpak, Snap, musl,
and other confined Linux environments remain unverified.

Install and update through the Chatobby Community plugin. Runtime archives in
this repository are signed package inputs for the plugin, not standalone
installers.
