# Setup Guide: Historical Split-Stack Bootstrap Reference

Bankstack's alpha user path is the published CLI, not manual Nx assembly. For a
new project, run `pnpm dlx create-bankstack@alpha my-bankstack-app` or
`npx create-bankstack@alpha my-bankstack-app`, then read the generated
`README.md` and `SETUP.md` before connecting Cloudflare or Supabase.

This file is retained as a source reference for the decisions the CLI now
encodes: the intended app/package boundaries, Cloudflare service-binding shape,
Supabase edge-auth boundary, and optional compute direction. Treat the commands
below as historical bootstrap notes, not the recommended first step for alpha
users.

## 1. Initialize the Workspace

Historical note: this was the pre-CLI manual workspace bootstrap.

```bash
npx create-nx-workspace@latest platform-root --preset=apps --packageManager=pnpm
cd platform-root
```

## 2. Add the Core Frameworks

Install the Nx plugins for our TypeScript edge stack.

```bash
# Add Astro support
pnpm add -D @nxtensions/astro
nx generate @nxtensions/astro:app apps/marketing

# Add SvelteKit support
pnpm add -D @nxext/svelte
nx generate @nxext/svelte:app apps/dashboard --adapter=cloudflare

# Add Hono API support
pnpm add -D @nx/node
nx generate @nx/node:app apps/api --framework=hono
```

### 2a. Add the Async Compute Engine (Optional)

If your SaaS requires heavy data processing, AI inference, or Python-specific libraries, initialize the background compute service:

```bash
pnpm add -D @npx-python/nx-python
nx generate @npx-python/nx-python:app apps/compute --framework=fastapi
```

## 3. Configure Tailwind v4 (Shared UI)

Tailwind v4 is CSS-first. Create a shared theme in `/packages/ui`.

```css
/* packages/ui/theme.css */
@import "tailwindcss";

@theme {
  --color-brand-primary: #3b82f6;
  --font-sans: "Geist Sans", sans-serif;
}
```

In `apps/marketing` and `apps/dashboard`, import this shared theme:

```css
@import "@repo/ui/theme.css";
```

## 4. Setup Cloudflare Service Bindings

Configure your apps/dashboard/wrangler.jsonc to talk to the Hono API worker internally with zero latency.

```jsonc
{
  "services": [
    {
      "binding": "API",
      "service": "hono-api-worker",
    },
  ],
}
```

## 5. AI Agent Guardrails (`AGENTS.md`)

Generated Bankstack projects may add agent guidance over time. In this historical reference, the app-level `AGENTS.md` examples show how boundaries can be written once per app and shared with tools that support them.

## 1. Create AGENTS.md files

Place a `AGENTS.md` file in root of each application directory with its specific boundaries:

- **For Dashboard Agent (`apps/dashboard/AGENTS.md`)**:
  "Focus on Svelte 5 Runes. Use shadcn-svelte and Lucide-Svelte. Share Zod types with /apps/api. Do not modify /apps/api or /apps/compute."

- **For Edge API Agent (`apps/api/AGENTS.md`)**:
  "Focus on Hono.js and Cloudflare Workers. Use TypeScript and shared Zod schemas. Optimize for 0ms cold starts. Do not modify frontend code."

- **For Marketing Agent (`apps/marketing/AGENTS.md`)**:
  "Focus on Astro. Use shadcn and lucide/astro. Keep JS strictly minimal. Do not modify /apps/dashboard or /apps/api."

- **For Compute Agent (`apps/compute/AGENTS.md`)** _(Optional)_:
  "Focus on Python, FastAPI, and asynchronous job processing. Use uv for dependencies. This is a background worker; it does not process direct user HTTP traffic. Do not modify TypeScript apps."

## 2. Wire Up AI Tools

Configure your specific AI tools to point to the `AGENTS.md` file in each application directory.

- **For Cursor**:
  Cursor uses `AGENTS.md` directly. For stricter adherence, create a `.cursor/rules/boundary-rules.mdc` file in each application directory that points to the `AGENTS.md` file.

- **For Claude Code**:
  Create `CLAUDE.MD` file in each application directory that points to the `AGENTS.md` file.

- **For Codex**:
  Codex uses the `AGENTS.md` file directly.

- **For Other AI Tools**:
  Create a `llms.txt` file in each application directory that points to the `AGENTS.md` file.
