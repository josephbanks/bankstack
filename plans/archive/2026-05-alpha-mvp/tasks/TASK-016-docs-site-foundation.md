# TASK-016: Docs Site Foundation

## Status

Done

## Depends On

TASK-014

## Blocks

TASK-017

## Goal

Create the first `apps/docs` foundation so Bankstack can dogfood an Astro docs surface without expanding scope into full content migration or deployment.

## Context

TASK-014 planned the post-alpha docs-site milestone after `create-bankstack@0.1.0-alpha.0` was published. The foundation should start small: a local-first Astro app under `apps/docs` that fits the existing pnpm/Nx workspace and can later host public Bankstack documentation.

Current source guidance favors Astro for content-heavy documentation and recommends Cloudflare Workers/static assets for new Cloudflare deployments. The first foundation slice should stay static unless a concrete docs feature requires on-demand rendering.

## Scope

Add `apps/docs` as a minimal Astro application with package metadata, TypeScript configuration, local scripts, Nx target configuration if needed, a first route, and a small layout/navigation shell that can grow into the public docs site. Wire the app into existing root verification only as far as the current repo patterns require.

Document the alpha CLI install command in the starter page or local docs notes using `pnpm dlx create-bankstack@alpha` and `npx create-bankstack@alpha`, with the exact `0.1.0-alpha.0` version noted as the current alpha.

## Out Of Scope

Do not migrate all architecture/setup docs, add a search system, add Cloudflare deployment automation, provision Cloudflare resources, revise CLI templates, create `skills/bankstack-expert`, or introduce dynamic SSR unless a required foundation feature cannot work statically.

## Implementation Notes

Prefer existing repository patterns over adding framework-specific Nx plugins unless the app cannot be checked and built cleanly with command targets. Keep the app pnpm-only, local-first, and compatible with the root Node/pnpm engine policy.

Use Astro content and routing conventions that can later support structured docs. If Starlight or another docs theme is introduced, record why it is necessary and keep visual customization minimal in this slice.

## Acceptance Criteria

- `apps/docs` exists and is included by the existing `apps/*` workspace glob.
- The docs app has local `check`, `build`, and development commands discoverable through package scripts or Nx targets.
- The first page identifies Bankstack and references the published alpha CLI without promising stable-release behavior.
- The foundation does not duplicate or contradict generated-template docs.
- Any CLI/template gaps discovered while creating the app are captured as follow-up notes instead of being fixed opportunistically.

## Verification

Run the new docs app's local check and build commands. Run the relevant root verification command that proves the app is visible to Nx, such as `pnpm check` or the narrower equivalent if full verification is too expensive. If a dev server is started, inspect the local page in a browser.

## Handoff Notes

Completed as a static Astro 6.3.3 app under `apps/docs`, using package-script targets so Nx discovers `@bankstack/docs` through the existing `apps/*` workspace glob. The first route introduces Bankstack, documents `pnpm dlx create-bankstack@alpha` and `npx create-bankstack@alpha`, and notes `0.1.0-alpha.0` as the current alpha.

Verification completed:

- `pnpm --filter @bankstack/docs check`
- `pnpm --filter @bankstack/docs build`
- `pnpm check`
- `pnpm build`
- Local dev server inspection at `http://127.0.0.1:4321/`; sandboxed server bind failed with `EPERM`, then succeeded with approved escalation.

Source checks completed on 2026-05-15: Astro project structure and TypeScript docs support the `src/pages`, `astro.config.mjs`, `tsconfig.json`, and `astro check && astro build` shape; Nx docs support package-script task discovery; pnpm/npm registry metadata still reports `create-bankstack@0.1.0-alpha.0` on `alpha`; Cloudflare guidance supports static assets without the Astro Cloudflare adapter until SSR/on-demand rendering is needed.

TASK-017 should use this foundation to migrate public docs content from `VISION.md`, `ARCHITECTURE_OVERVIEW.md`, `SETUP_GUIDE.md`, `packages/create-bankstack/README.md`, and the generated template docs.

Primary sources to re-check before implementation if versions changed:

- Astro project structure docs: https://docs.astro.build/en/basics/project-structure/
- Astro TypeScript docs: https://docs.astro.build/en/guides/typescript/
- Astro content collections docs: https://docs.astro.build/en/guides/content-collections/
- Nx project configuration docs: https://nx.dev/docs/reference/project-configuration
- Nx run tasks docs: https://nx.dev/docs/features/run-tasks
- pnpm `pnx` / `pnpm dlx` docs: https://pnpm.io/cli/dlx
- npm `npx` / `npm exec` docs: https://docs.npmjs.com/cli/v11/commands/npm-exec/
