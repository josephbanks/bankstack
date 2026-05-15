# Bankstack Docs Deployment

`apps/docs` is a static Astro site. It does not use SSR, on-demand rendering, runtime Supabase auth, or a Worker entrypoint, so it does not need the Astro Cloudflare adapter.

The deployment target is Cloudflare Workers static assets through `wrangler.jsonc`.
Missing routes use the Workers static-assets default 404 behavior; this is not a single-page app fallback.

## Why Static Assets

Astro builds this app to `dist/` with `output: "static"`. Current Cloudflare guidance supports static Astro sites by uploading the prerendered output as Workers static assets. Add the Astro Cloudflare adapter only if the docs later need SSR, server islands, live content, or another on-demand runtime feature.

## Local Smoke

From the repo root:

```bash
pnpm --filter @bankstack/docs check
pnpm --filter @bankstack/docs build
pnpm --filter @bankstack/docs dogfood:verify
pnpm --filter @bankstack/docs deploy:dry-run
```

`dogfood:verify` checks the static build output and selected docs claims against the CLI package docs and generated golden docs.

## Manual Cloudflare Setup

This task does not create Cloudflare resources. Before the first real deploy:

1. Confirm the Worker name in `wrangler.jsonc`.
2. Authenticate Wrangler with the intended Cloudflare account.
3. Configure routes or a custom domain such as `bankstack.dev` in Cloudflare.
4. Run `pnpm --filter @bankstack/docs build`.
5. Run `pnpm --filter @bankstack/docs deploy:dry-run`.
6. Deploy intentionally with `pnpm --filter @bankstack/docs exec wrangler deploy`.

No secrets are required for the static docs app.
