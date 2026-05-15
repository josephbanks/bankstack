# TASK-018: Docs Deployment And Dogfood Verification

## Status

Todo

## Depends On

TASK-017

## Blocks

TASK-015

## Goal

Prepare `apps/docs` for public deployment and prove the Bankstack repo can dogfood its own conventions without drifting from the alpha CLI.

## Context

The docs app should eventually serve bankstack.dev and become source material for `skills/bankstack-expert`. Current Cloudflare guidance recommends Workers/static assets for new Astro deployments, with the Cloudflare adapter only needed for on-demand rendering features.

## Scope

Add the minimal deployment configuration and documentation needed for `apps/docs`, including Cloudflare Workers/static assets configuration or an explicitly justified alternative. Add or document a smoke verification path for local build output and deployed-preview readiness. Confirm docs content still matches the alpha CLI, generated workspace docs, and local-first boundaries.

## Out Of Scope

Do not create Cloudflare resources, add production secrets, configure paid services, automate npm publishing, create the agent skill, or redesign the docs site beyond deployment-readiness fixes.

## Implementation Notes

Keep the deployment path compatible with static Astro output unless TASK-017 introduced a real on-demand rendering requirement. If on-demand rendering is required, use the current Astro Cloudflare adapter guidance and document the build-per-environment behavior before adding configuration.

Record any required Cloudflare dashboard steps as manual setup notes unless this task explicitly adds a safe, reviewable config file. Avoid changing CLI templates unless deployment uncovers a specific follow-up that belongs in a separate task.

## Acceptance Criteria

- Deployment configuration or manual deployment notes exist for `apps/docs`.
- The chosen Cloudflare target is justified against current Astro and Cloudflare guidance.
- Local build/check/smoke commands for the docs site are documented and pass.
- The docs are reviewed against `create-bankstack@alpha` behavior and generated-template docs.
- TASK-015 remains blocked until this task is complete.

## Verification

Run the docs app check and build commands. Run a local static or Wrangler preview if configuration allows it without credentials. Review tracker dependencies to confirm `TASK-015` depends on this task.

## Handoff Notes

Once this task is done, TASK-015 can use the implemented docs and alpha CLI conventions as source material for `skills/bankstack-expert`.

Primary sources to re-check before implementation if versions changed:

- Astro Cloudflare deployment guide: https://docs.astro.build/en/guides/deploy/cloudflare/
- Astro Cloudflare adapter guide and upgrade notes: https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- Cloudflare Workers static assets docs: https://developers.cloudflare.com/workers/static-assets/
- Cloudflare Workers Astro guide: https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
