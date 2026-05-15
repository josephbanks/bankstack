---
title: Cloudflare Boundary
description: Bankstack templates show Cloudflare Workers conventions without creating or deploying Cloudflare resources.
order: 5
---

Bankstack treats Cloudflare as the edge runtime for the generated dashboard and API examples. The alpha scaffold includes Wrangler JSONC examples, but it does not authenticate with Wrangler, create Workers, configure domains, or deploy anything automatically.

## Generated Examples

- `apps/dashboard/wrangler.jsonc` shows the SvelteKit dashboard Worker shape.
- `apps/api/wrangler.jsonc` shows the Hono API Worker shape.
- The dashboard example includes an `API` service binding pointed at the generated API Worker name.

The intended production direction is dashboard-to-API communication through Cloudflare service bindings where appropriate. In local development, the generated dashboard can still render without a running Cloudflare environment, and the starter health path has a fallback.

## What You Own

Before deployment, replace example Worker names and route settings with your real project values. Generate Worker types when you add bindings, choose domains intentionally, and deploy with Wrangler only after reviewing the generated config.

For this docs site, the static Astro output does not need the Astro Cloudflare adapter. Cloudflare's current guidance supports uploading static assets for prerendered Astro sites; the adapter belongs to SSR or on-demand rendering features.

Canonical source material: [`ARCHITECTURE_OVERVIEW.md`](https://github.com/josephbanks/bankstack/blob/main/ARCHITECTURE_OVERVIEW.md), generated [`SETUP.md`](https://github.com/josephbanks/bankstack/blob/main/packages/create-bankstack/scripts/goldens/cli/generated/SETUP.md), and Cloudflare Workers static assets guidance.
