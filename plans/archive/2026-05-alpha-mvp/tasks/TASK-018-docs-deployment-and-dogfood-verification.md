# TASK-018: Docs Deployment And Dogfood Verification

## Status

Done

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

Completed static Cloudflare Workers deployment readiness for `apps/docs` with `wrangler.jsonc`, docs deployment notes, and `dogfood:verify` smoke checks against built routes, CLI package docs, generated golden docs, and selected Cloudflare/Supabase boundary claims.

The docs site remains static Astro output. The Cloudflare config uses Workers static assets with `assets.directory = "./dist"` and no Worker entrypoint, secrets, bindings, SPA fallback, or Astro Cloudflare adapter. Missing routes retain default static-assets 404 behavior.

Verification completed on 2026-05-15:

- `pnpm --filter @bankstack/docs check`
- `pnpm --filter @bankstack/docs build`
- `pnpm --filter @bankstack/docs dogfood:verify`
- `pnpm --filter @bankstack/docs deploy:dry-run`
- `pnpm check`
- `pnpm build`
- `pnpm --filter create-bankstack test`
- Local Wrangler preview at `http://127.0.0.1:8788/docs/` returned `200 OK`
- Local Wrangler preview at `http://127.0.0.1:8788/not-a-real-route` returned `404 Not Found`

Cloudflare source checks on 2026-05-15 confirmed Workers static assets use `assets.directory`, `wrangler.jsonc` is the recommended config format, and `single-page-application` fallback is for SPA routing rather than this static multi-page docs site.

Once this task is done, TASK-015 can use the implemented docs and alpha CLI conventions as source material for `skills/bankstack-expert`.

Primary sources to re-check before implementation if versions changed:

- Astro Cloudflare deployment guide: https://docs.astro.build/en/guides/deploy/cloudflare/
- Astro Cloudflare adapter guide and upgrade notes: https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- Cloudflare Workers static assets docs: https://developers.cloudflare.com/workers/static-assets/
- Cloudflare Workers Astro guide: https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
