# Security policy

## Supported version

Only the latest public-alpha runtime release is supported. Alpha builds may be
replaced or withdrawn when a security or integrity issue is found.

## Verify a download

Install and update through the Chatobby Community plugin. The connector
downloads only from this repository and verifies the Ed25519 update signature,
signed runtime manifest, and every inventoried file before use. A signature or
checksum mismatch is a release-integrity failure and must not be bypassed.

## Report a vulnerability

Use GitHub's private vulnerability-reporting feature when it is available for
this repository. Otherwise email `thatsmad002@gmail.com` with a minimal,
redacted reproduction. Do not open a public issue containing exploit details,
credentials, private note content, or identifying session logs.

Include the runtime version, Windows version, connector version, observed
impact, and whether the issue reproduces with a clean test vault. You will not
be asked for a provider API key.
