# Chatobby Runtime 0.3.2

Chatobby 0.3.2 is a recovery update for the 0.3.1 public alpha.

## What changed

- Vaults affected by an interrupted or out-of-disk-space Projects migration can
  recover through Chatobby's normal update and startup flow. Failed and
  rolled-back runs now reclaim only their exact Chatobby-owned temporary
  backups, prepared copies, and run archives rather than accumulating another
  full copy on every retry.
- Incomplete session archives are removed when their copy or verification
  fails. Successful source archives and redacted migration receipts remain
  available for rollback and diagnosis.
- Memory migration evidence is canonicalized after hashing, preventing valid
  vaults with multiple unresolved legacy Project paths from failing the
  deterministic migration contract.
- Insufficient migration capacity is reported as an actionable disk-space
  error instead of a generic WebSocket connection failure.

This remains public-alpha software. macOS and Linux support remain experimental
until representative physical-device acceptance is completed.
