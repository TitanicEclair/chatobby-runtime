# Security policy

## Supported version

Only the latest public-alpha runtime release is supported. Alpha builds may be
replaced or withdrawn when a security or integrity issue is found.

## Verify a download

Download only from this repository's Releases page and compare
`Chatobby-Setup.exe` with the attached SHA-256 checksum. The connector also
verifies the runtime's Ed25519 package signature and file inventory before use.

The initial alpha installer is not Authenticode-signed. An unknown-publisher
warning is therefore expected; a checksum mismatch is not.

## Report a vulnerability

Use GitHub's private vulnerability-reporting feature when it is available for
this repository. Otherwise email `madelyntan0223@gmail.com` with a minimal,
redacted reproduction. Do not open a public issue containing exploit details,
credentials, private note content, or identifying session logs.

Include the runtime version, Windows version, connector version, observed
impact, and whether the issue reproduces with a clean test vault. You will not
be asked for a provider API key.
