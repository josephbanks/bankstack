# TASK-017: Docs Content And IA

## Status

Todo

## Depends On

TASK-016

## Blocks

TASK-018

## Goal

Turn the `apps/docs` foundation into a useful public documentation site for the alpha CLI, architecture, setup path, and Bankstack conventions.

## Context

Bankstack currently has valuable repo-level guidance in `VISION.md`, `ARCHITECTURE_OVERVIEW.md`, `SETUP_GUIDE.md`, `packages/create-bankstack/README.md`, and generated workspace docs. The public docs site should become the friendly entrypoint over time while keeping those source materials and the CLI templates aligned.

## Scope

Create the initial information architecture and content pages for:

- What Bankstack is and is not.
- Installing and running `create-bankstack@alpha`.
- Generated workspace layout and local-first verification.
- Cloudflare edge/API conventions.
- Supabase auth/RLS boundary conventions.
- How the dogfood repo, CLI, and future skill relate.

Keep content practical and alpha-honest. Link back to source docs or generated-template docs when the repo remains the canonical source for a detail.

## Out Of Scope

Do not deploy the docs site, add analytics/search/CMS, create the agent skill, revise CLI templates, or promise production automation that the alpha CLI does not provide.

## Implementation Notes

Prefer structured Markdown/MDX or Astro content collection patterns that make future navigation and validation straightforward. Treat generated workspace docs as compatibility material: public docs can explain and curate them, but should not silently introduce conventions that the CLI does not generate.

If content work exposes mismatches between public docs and CLI templates, capture follow-up tasks or handoff notes instead of making opportunistic template changes in this task.

## Acceptance Criteria

- The docs site has a coherent first-pass navigation and page set.
- CLI usage examples prefer explicit alpha installs: `pnpm dlx create-bankstack@alpha` and `npx create-bankstack@alpha`.
- Architecture and setup pages align with the current alpha scaffold and generated docs.
- The docs clearly state that Cloudflare/Supabase resources are not provisioned by the CLI.
- Known content/template gaps are documented for follow-up work.

## Verification

Build and check the docs app. Read the rendered pages against the source docs and generated golden docs. If feasible, inspect the local site in a browser for navigation, copy, and responsive readability.

## Handoff Notes

TASK-018 should add deployment and dogfood verification only after this content exists, so deployment proves a real docs surface rather than a placeholder.

Primary sources to re-check before implementation if versions changed:

- Astro content collections docs: https://docs.astro.build/en/guides/content-collections/
- Astro MDX integration docs: https://docs.astro.build/en/guides/integrations-guide/mdx/
- Cloudflare Workers static assets docs: https://developers.cloudflare.com/workers/static-assets/
- Cloudflare Workers Astro guide: https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- Supabase API key terminology docs: https://supabase.com/docs/guides/getting-started/api-keys
- Supabase server-side auth docs: https://supabase.com/docs/guides/auth/server-side
- Supabase row level security docs: https://supabase.com/docs/guides/database/postgres/row-level-security
- npm registry metadata for `create-bankstack`: `npm view create-bankstack dist-tags version --registry https://registry.npmjs.org/`
