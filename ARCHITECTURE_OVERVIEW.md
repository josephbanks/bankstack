# 2026 Cloudflare Edge Architecture: The "Split-Stack"

## Overview
This project uses a "Split-Stack" architecture designed for maximum performance on the Cloudflare global network while keeping operational costs at or near zero for the Free Tier. It utilizes a lightning-fast TypeScript edge API, with an optional Python compute engine for heavy asynchronous background tasks.

## The Monorepo Structure (Nx)
We use an Nx monorepo to manage polyglot applications and shared logic.

```text
/platform-root
├── /apps
│   ├── /marketing     # Astro: High-performance SEO landing pages
│   ├── /dashboard     # SvelteKit: Reactive client portal (Svelte 5 Runes)
│   ├── /api           # Hono.js (TS): Blazing fast Edge API & Gatekeeper
│   └── /compute       # (Optional) FastAPI (Python): Async heavy-lifting engine
├── /packages
│   ├── /ui            # Shared Tailwind v4 theme + shadcn-svelte components
│   ├── /supabase      # Shared database types, RLS policies, and client config
│   └── /shared-utils  # Common TS logic (Zod validators, constants)
├── nx.json            # Task orchestration and dependency boundaries
└── pnpm-workspace.yaml
```

## Deployment Strategy
The core stack is hosted entirely on Cloudflare to leverage **Service Bindings** for sub-1ms internal communication.

* **[marketing].[domain].com**: Cloudflare Pages (Astro Static)
* **[dashboard].[domain].com**: Cloudflare Workers (SvelteKit Adapter)
* **[api].[domain].com**: Cloudflare Workers (Hono on Workers)

### Optional Compute Layer:

* **Background Jobs**: If `/apps/compute` is used, it is deployed as a containerized service (e.g., Google Cloud Run, Fly.io) and consumes jobs asynchronously via Cloudflare Queues or upstash/Redis.

## Security & Auth

* **Identity**: Supabase Auth (JWT-based).
* **Gatekeeper**: SvelteKit Middleware + Hono validates sessions at the edge.
* **Authorization**: Supabase RLS (Row-Level Security) protects database access natively, ensuring security even across the different microservices.
