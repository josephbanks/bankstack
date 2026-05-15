---
title: What Bankstack Is
description: Bankstack is scaffolding plus conventions for edge-native modern applications.
order: 1
---

Bankstack is not a framework, and despite the name, it is not banking software. The name is a play on maintainer Joseph Banks' last name; Bankstack is not affiliated with banks or financial institutions.

It is an opinionated starting point for edge-native modern applications, including SaaS apps: a pnpm-only Nx monorepo where fast TypeScript runs at the Cloudflare edge and Supabase owns identity, data access, and row level security.

The alpha centers on `create-bankstack`, a published Node CLI that generates a workspace shaped like the source docs and templates in this repository. The generated project is meant to be inspectable: you can install it, run checks, build it, and decide where to connect real Cloudflare and Supabase resources.

## What It Gives You

- A known monorepo shape with `apps/*` and `packages/*`.
- Astro, SvelteKit, and Hono examples that can run locally.
- Shared packages for UI primitives, Supabase boundary helpers, and utility code.
- Wrangler examples and environment examples that show where external services attach.
- Local-first verification commands that do not require hosted infrastructure.

## What It Does Not Do Yet

- It does not provision Cloudflare accounts, Workers, routes, domains, or service bindings.
- It does not create Supabase projects, tables, policies, auth screens, or production secrets.
- It does not deploy the generated workspace.
- It does not include the optional Python compute layer in the v0.1 alpha.

Canonical source material: [`VISION.md`](https://github.com/josephbanks/bankstack/blob/main/VISION.md), [`ARCHITECTURE_OVERVIEW.md`](https://github.com/josephbanks/bankstack/blob/main/ARCHITECTURE_OVERVIEW.md), and the generated workspace docs under [`packages/create-bankstack`](https://github.com/josephbanks/bankstack/tree/main/packages/create-bankstack). [`SETUP_GUIDE.md`](https://github.com/josephbanks/bankstack/blob/main/SETUP_GUIDE.md) is retained as historical/deep-reference context, not the alpha setup entrypoint.
