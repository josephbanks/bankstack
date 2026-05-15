# Bankstack Docs Deployment

`apps/docs` is a static Astro site. It does not use SSR, on-demand rendering, runtime Supabase auth, or a Worker entrypoint, so it does not need the Astro Cloudflare adapter.

The recommended public deployment path is Cloudflare Pages with Git integration. Cloudflare Workers static assets through `wrangler.jsonc` remains a valid manual alternative for local dry runs or later Workers-based deployment experiments.

## Why Pages

Astro builds this app to `dist/` with `output: "static"`. Current Cloudflare Pages guidance lists Astro's standard build command as `npm run build` and build directory as `dist`; in this pnpm/Nx monorepo, run the equivalent workspace command from the repository root and point Pages at `apps/docs/dist`.

Add the Astro Cloudflare adapter only if the docs later need SSR, server islands, Pages Functions, live content, bindings at request time, or another on-demand runtime feature. The current docs app is static and does not need those runtime pieces.

## Local Smoke

From the repo root:

```bash
pnpm --filter @bankstack/docs check
pnpm --filter @bankstack/docs build
pnpm --filter @bankstack/docs dogfood:verify
pnpm --filter @bankstack/docs deploy:dry-run
```

`dogfood:verify` checks the static build output and selected docs claims against the CLI package docs and generated golden docs.

## Cloudflare Pages Setup

Use this path for `bankstack.dev` once the current commits are pushed to GitHub.

1. In the Cloudflare dashboard, go to **Workers & Pages**.
2. Select **Create application**.
3. Select the **Pages** tab.
4. Select **Import an existing Git repository**.
5. Connect `josephbanks/bankstack` and choose the production branch, currently `main`.
6. In build settings, use:

| Setting                | Value                                 |
| ---------------------- | ------------------------------------- |
| Framework preset       | None or Astro                         |
| Root directory         | leave empty / repository root         |
| Build command          | `pnpm --filter @bankstack/docs build` |
| Build output directory | `apps/docs/dist`                      |

Keep the root directory at the repository root so Pages installs from the root `pnpm-lock.yaml` and sees the pnpm workspace. Cloudflare Pages supports monorepos, but the root directory and build command need to match where the package manager and workspace files live.

Configure build watch paths after the first deployment so unrelated package work does not redeploy the docs site. In the Pages project, go to **Settings > Build > Build watch paths** and use:

| Field         | Value                                                                                                                                                                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Include paths | `apps/docs/*, packages/create-bankstack/README.md, packages/create-bankstack/scripts/goldens/cli/generated/*, VISION.md, ARCHITECTURE_OVERVIEW.md, SETUP_GUIDE.md, package.json, pnpm-lock.yaml, pnpm-workspace.yaml, nx.json, tsconfig.base.json` |
| Exclude paths | leave empty                                                                                                                                                                                                                                        |

The docs verification script checks claims against the CLI README and generated golden docs, so those files should trigger Pages builds even though they are outside `apps/docs`. Cloudflare's wildcard syntax lets a trailing `*` match nested files.

Optional environment variables:

| Variable       | Value              | Why                                                                                                                   |
| -------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `PNPM_VERSION` | `10.33.2`          | Match the repo `packageManager` field instead of relying on the Pages image default.                                  |
| `NODE_VERSION` | `22.16.0` or newer | The current Pages v3 image default satisfies the repo's `>=22.12.0` requirement, but pinning avoids surprise changes. |

No Cloudflare bindings, secrets, Pages Functions, or Astro adapter are required for the static docs site.

## Custom Domain

After the Pages project deploys successfully:

1. Open the Pages project in Cloudflare.
2. Go to **Custom domains**.
3. Select **Set up a domain**.
4. Add `bankstack.dev`.
5. If `bankstack.dev` is an apex domain, make sure the zone is in the same Cloudflare account and its nameservers point to Cloudflare. Cloudflare can then create the required DNS record for the Pages project.

## Direct Upload Alternative

Use Direct Upload only if you want local/manual deploys instead of Git-triggered production deploys. Cloudflare's docs note that a Direct Upload project cannot later switch to Git integration; create a new Pages project if you need to move from Direct Upload to Git integration.

From the repo root:

```bash
pnpm --filter @bankstack/docs build
pnpm --filter @bankstack/docs exec wrangler pages deploy dist --project-name bankstack-docs
```

For a preview branch:

```bash
pnpm --filter @bankstack/docs exec wrangler pages deploy dist --project-name bankstack-docs --branch preview
```

Run these commands from `apps/docs` via the filtered `exec` above so Wrangler receives that package as its working context and `dist` resolves to `apps/docs/dist`.

## Workers Static Assets Alternative

The repo also contains `apps/docs/wrangler.jsonc` for Workers static assets. Missing routes use the Workers static-assets default 404 behavior; this is not a single-page app fallback.

Before a Workers static-assets deploy:

1. Confirm the Worker name in `wrangler.jsonc`.
2. Authenticate Wrangler with the intended Cloudflare account.
3. Configure routes or a custom domain such as `bankstack.dev` in Cloudflare.
4. Run `pnpm --filter @bankstack/docs build`.
5. Run `pnpm --filter @bankstack/docs deploy:dry-run`.
6. Deploy intentionally with `pnpm --filter @bankstack/docs exec wrangler deploy`.

## Sources Checked

- Cloudflare Pages Astro framework guide: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- Cloudflare Pages build configuration: https://developers.cloudflare.com/pages/configuration/build-configuration/
- Cloudflare Pages monorepos: https://developers.cloudflare.com/pages/configuration/monorepos/
- Cloudflare Pages build watch paths: https://developers.cloudflare.com/pages/configuration/build-watch-paths/
- Cloudflare Pages build image: https://developers.cloudflare.com/pages/configuration/build-image/
- Cloudflare Pages custom domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Cloudflare Pages Direct Upload: https://developers.cloudflare.com/pages/get-started/direct-upload/
