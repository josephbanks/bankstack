# TASK-014: Dogfood Docs Site

## Status

Done

## Depends On

TASK-013

## Blocks

TASK-016

## Goal

Plan and begin the `apps/docs` dogfood site milestone after the CLI alpha is ready.

## Context

The Bankstack repository should eventually dogfood its own stack through a public docs/marketing site, likely under `apps/docs` for bankstack.dev. This should follow the CLI MVP so docs and templates stay aligned.

## Scope

Create the next task breakdown for bootstrapping `apps/docs`, documenting Bankstack usage, and proving the repo can consume its own conventions. If implementation is appropriate in the future session, start only the docs-site foundation task that is explicitly planned.

## Out Of Scope

Do not build the docs site before the CLI alpha path is ready. Do not create the agent skill in this task. Do not revise the CLI templates unless docs work exposes a specific follow-up task.

## Implementation Notes

Treat this as a post-alpha milestone. The docs site should explain the CLI, architecture, setup, and conventions with enough fidelity to replace early README-only guidance over time.

## Acceptance Criteria

- A concrete docs-site task breakdown exists or the first docs-site foundation task is completed.
- The docs-site plan references the published or prepared alpha CLI.
- Any gaps discovered in CLI templates are captured as follow-up tasks instead of being fixed opportunistically.
- `skills/bankstack-expert` remains deferred until after docs stabilize.

## Verification

Review tracker updates and any docs-site files created by the future session. Confirm dependency order still keeps docs after CLI alpha.

## Handoff Notes

Implemented the post-alpha docs-site planning breakdown after verifying that `create-bankstack@0.1.0-alpha.0` is live on npm. On 2026-05-15, `npm view create-bankstack dist-tags version --registry https://registry.npmjs.org/` returned `alpha` and `latest` both pointing at `0.1.0-alpha.0`; public docs should prefer explicit `create-bankstack@alpha` installs until a stable release intentionally moves `latest`.

Next docs-site work is split into:

- TASK-016: create the minimal `apps/docs` Astro foundation.
- TASK-017: migrate and shape the public information architecture from repo source docs and generated-template docs.
- TASK-018: add deployment guidance/config and dogfood verification.

TASK-015 now depends on TASK-018 instead of TASK-014 so `skills/bankstack-expert` remains deferred until the docs are implemented and verified, not merely planned.

Primary sources used for this plan:

- Astro Cloudflare deployment guide: https://docs.astro.build/en/guides/deploy/cloudflare/
- Astro Cloudflare adapter guide: https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- Astro content collections guide: https://docs.astro.build/en/guides/content-collections/
- Cloudflare Workers static assets docs: https://developers.cloudflare.com/workers/static-assets/
- Cloudflare Workers Astro guide: https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- Nx project configuration docs: https://nx.dev/docs/reference/project-configuration
- pnpm `pnx` / `pnpm dlx` docs: https://pnpm.io/cli/dlx
- npm `npx` / `npm exec` docs: https://docs.npmjs.com/cli/v11/commands/npm-exec/
