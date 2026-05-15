# TASK-006: Generated App Templates

## Status

Done

## Depends On

TASK-005

## Blocks

TASK-009, TASK-011

## Goal

Add generated app templates for the core split-stack: Astro marketing, SvelteKit dashboard, and Hono API.

## Context

The CLI MVP should prove the Bankstack architecture with a minimal connected demo. The generated project should include `apps/marketing`, `apps/dashboard`, and `apps/api`, but not optional Python compute.

## Scope

Create template files for `apps/marketing`, `apps/dashboard`, and `apps/api`. Marketing should render a simple home page. Dashboard should render a minimal app shell and call the API health endpoint. API should expose `/health` and a protected-route stub showing the auth middleware boundary.

## Out Of Scope

Do not add full auth UI, persistence, mini CRUD demos, Python compute, public docs site, or full visual design polish. Do not implement shared packages except as required imports already defined by TASK-007.

## Implementation Notes

Keep the demo minimal and local-first. If service binding behavior cannot run locally without external setup, provide a local fallback that still demonstrates the intended boundary. Align framework choices with `ARCHITECTURE_OVERVIEW.md`.

## Acceptance Criteria

- Generated project includes `apps/marketing`, `apps/dashboard`, and `apps/api`.
- API has `/health` and a protected-example route stub.
- Dashboard demonstrates a health check call path.
- Generated apps do not require Cloudflare or Supabase credentials to render/build locally.

## Verification

Generate a project and run app-level build/check commands as available. Manually inspect generated app files for the intended split-stack shape.

## Handoff Notes

TASK-011 will turn this into an automated generated-project smoke test. TASK-009 should document the local demo behavior.

Implementation notes:

- Generated `apps/marketing` as a minimal Astro static app with `astro.config.mjs`, strict Astro TypeScript config, and a simple home page.
- Generated `apps/dashboard` as a minimal SvelteKit app using `@sveltejs/adapter-auto`, a server load, and a local `/api/health` proxy route.
- The dashboard health proxy uses a Cloudflare-style `platform.env.API` service binding when present, `BANKSTACK_API_URL` when configured, and otherwise returns a local fallback so the dashboard builds and renders without credentials.
- Generated `apps/api` as a Hono app with `/health` and `/protected/profile`. The protected route fails closed with `503` until `BANKSTACK_API_DEMO_TOKEN` is set, then uses Hono bearer auth for the local stub.
- Root and generated workspace Node engines were raised to `>=22.12.0` because current Astro 6 and Vite 8 require that floor.
- The apps are discovered by pnpm/Nx through app-local `package.json` files under the existing `apps/*` workspace glob. No Nx framework plugins were added in this slice.
- No shared packages, persistence, full auth UI, Cloudflare Wrangler config, Supabase helper, public docs site, or Python compute layer was generated.

Verification performed:

- `pnpm --filter create-bankstack test`
- `pnpm run check`
- `pnpm run build`
- `pnpm run test`
- `pnpm format:check`
- Generated `/private/tmp/bankstack-task006-RmfEMv/app-templates` with `node packages/create-bankstack/dist/index.js app-templates --name app-templates --no-install --no-git`.
- In the generated temp workspace, `pnpm install` succeeded with the pinned app dependencies.
- In the generated temp workspace, `pnpm format:check`, `pnpm check`, `pnpm build`, and `pnpm test` succeeded. `pnpm test` reported `No tasks were run`, which is expected until generated tests are introduced later.
- The generated Hono API server could not be socket-smoked in this sandbox because listening on `127.0.0.1:8787` returned `EPERM`. Route behavior was verified without binding a port by importing the built app and calling `app.request()`: `/health` returned `200`, `/protected/profile` returned `503` without `BANKSTACK_API_DEMO_TOKEN`, returned `401` with a wrong bearer token, and returned `200` with the configured token.
- Svelte dashboard component syntax was checked with the Svelte autofixer before landing.
- `bankstack_reviewer` flagged and confirmed fixes for Node engine consistency and the protected-route default-token risk.

Primary/current sources checked:

- Astro project structure and TypeScript/check guidance: https://docs.astro.build/en/basics/project-structure/ and https://docs.astro.build/en/guides/typescript/
- SvelteKit project structure, routing, load functions, adapter-auto, and build docs: https://svelte.dev/docs/kit/project-structure, https://svelte.dev/docs/kit/routing, https://svelte.dev/docs/kit/load, https://svelte.dev/docs/kit/adapter-auto, https://svelte.dev/docs/kit/building-your-app
- Hono runtime and middleware docs: https://www.honojs.com/docs/, https://github.com/honojs/node-server, https://hono.dev/docs/guides/middleware, https://hono.dev/docs/middleware/builtin/bearer-auth
- Nx task and project configuration docs: https://nx.dev/docs/features/run-tasks and https://nx.dev/docs/reference/project-configuration
