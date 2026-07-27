# Chatobby Runtime 0.2.3 public alpha

Runtime 0.2.3 pairs with Chatobby Community plugin 0.2.3 on Windows x64,
Apple Silicon macOS, and Intel macOS. Runtime protocol revision 3 is retained.

> **macOS status:** Apple Silicon and Intel packages are built and verified on
> native GitHub macOS runners. This alpha has not been externally verified on a
> physical Mac and is not Apple-notarized.

## What changed

- Adds five practical built-in permission policies with complete shipped-tool
  decisions: Obsidian, Approve safe, Full access, Auto, and Read only.
- Adds bounded, private, fail-closed Auto classification for permission checks
  that would otherwise ask the user.
- Enforces automatic-delegation settings at supervisor admission.
- Improves permission-authority publication during startup and live policy
  changes.
- Returns bounded text from supported documents, including built-in OCR for
  image-only documents, without sending embedded binary payloads to the model.
- Improves bounded web reading and continuation metadata.
- Makes fuzzy vault retrieval resilient to slow optional providers while
  retaining accurate partial-result reporting.
- Adds transient turn-orientation guidance without persisting host instructions
  as conversation history.

Each production package is verified through the signed multi-platform runtime
index, its signed file inventory, SHA-256 hashes, SBOM, provenance, dependency
licences, runtime licence, privacy notice, and alpha-risk notice before
activation.

Chatobby remains public-alpha software. Back up important vaults and begin with
the minimum permissions needed for the task.
