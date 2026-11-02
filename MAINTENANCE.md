# Public maintenance

This repository's maintenance uses Node built-ins and public data only. It does
not contain or export the private runtime source. No maintenance workflow creates
a product release, changes a tag or replaces release assets.

`node scripts/monitor-public.mjs` checks the reviewed release inventory, downloads
small signed metadata and verifies the catalogue. It does not re-download every
runtime binary. The workflow runs after release publication and daily at 06:17 UTC,
with logs and job summaries only; there are no retained artifacts or caches.

`config/release-baseline.json` pins the immutable 0.5.3 release asset identities.
`config/catalogue-policy.json` pins its signing trust anchor, source revision and
public model identities/capability ceilings. Its compatibility interval is
`>=0.5.3 <0.5.4`; widening it requires testing the additional released versions.

Catalogue PRs may change only `catalogue/v1/current.json` on the controlled
`automation/model-catalogue-current` branch. The validator executes trusted base
code, fetches the proposed JSON by exact head SHA, and checks schema, signature,
hash, seven-day validity, runtime range, known provider/template and capability
ceilings. No proposed source is checked out or executed. It writes the required
`catalogue-data-policy` commit status explicitly on that exact head, including
failure. Unknown providers, execution fields and retirements require separate
review and are excluded from automatic publication.

Main must require a PR, the `catalogue-data-policy` status, up-to-date checks and
no force pushes/deletion, including administrators. Automatic merge is queued
only for a validated, non-draft, data-only PR when
`CHATOBBY_CATALOGUE_AUTOMATION_ENABLED=true`. Enabling repository auto-merge support
alone is not activation. Keep this variable false until the first signed update
and both released/candidate consumer acceptance have explicit owner approval.

Before activation, a missing catalogue is reported as not activated. Afterwards,
a missing, expired or invalid catalogue fails the monitor. The private producer
renews the last accepted compatible facts before 72 hours remain, even when fresh
unsupported entries need review. Publishing a catalogue changes model data only;
it does not update the runtime executable or account-specific/custom model paths.

Run `node --test scripts/*.test.mjs` locally before changing these controls.
Changing the baseline, validator or workflow is an ordinary reviewed maintenance
change and is never eligible for the catalogue-only automatic merge path.
