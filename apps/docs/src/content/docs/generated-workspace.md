---
title: Generated Workspace
description: The alpha scaffold creates a local-first Nx workspace with three apps and three shared packages.
order: 4
---

The generated project is a pnpm-only Nx monorepo. It is designed to pass local verification before you connect external infrastructure.

```text
my-bankstack-app/
├── apps/
│   ├── marketing
│   ├── dashboard
│   └── api
├── packages/
│   ├── ui
│   ├── supabase
│   └── shared-utils
├── supabase/
├── package.json
├── nx.json
└── pnpm-workspace.yaml
```

## Apps

- `apps/marketing`: Astro marketing surface.
- `apps/dashboard`: SvelteKit dashboard shell with a local API health path and Cloudflare adapter configuration.
- `apps/api`: Hono API with a health route and protected-route stub.

## Packages

- `packages/ui`: shared Tailwind v4 theme CSS and small UI helpers.
- `packages/supabase`: Supabase environment contracts, client helper, and auth/RLS boundary notes.
- `packages/shared-utils`: constants and Zod validation helpers shared by apps.

## Local Verification

These commands should work before you create Cloudflare or Supabase accounts:

```bash
pnpm install
pnpm check
pnpm build
pnpm test
pnpm verify
```

`pnpm dev` starts the generated app surfaces through Nx. The generated `README.md` and `SETUP.md` remain the canonical source for exact local ports and template-specific commands.

When selected with `--ai-tools`, generated `AI_TOOLS.md` documents provider-maintained skills and MCP guidance for Supabase, Cloudflare, Astro, and Svelte. It is a safe reference file only; the CLI does not run those provider installers or create credentials.

Canonical source material: generated [`README.md`](https://github.com/josephbanks/bankstack/blob/main/packages/create-bankstack/scripts/goldens/cli/generated/README.md) and [`SETUP.md`](https://github.com/josephbanks/bankstack/blob/main/packages/create-bankstack/scripts/goldens/cli/generated/SETUP.md).
