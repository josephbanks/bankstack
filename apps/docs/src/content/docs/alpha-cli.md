---
title: Alpha CLI
description: Install and run the current create-bankstack alpha with explicit alpha tags.
order: 3
---

Use the npm `alpha` dist-tag for the current alpha. The docs prefer the explicit alpha tag until the project intentionally promotes a stable release.

```bash
pnpm dlx create-bankstack@alpha my-bankstack-app
```

```bash
npx create-bankstack@alpha my-bankstack-app
```

For a non-interactive run, add `--yes`:

```bash
pnpm dlx create-bankstack@alpha my-bankstack-app --yes
```

Provider AI tooling guidance is optional:

```bash
pnpm dlx create-bankstack@alpha my-bankstack-app --ai-tools recommended
```

## Useful Flags

- `--name <name>` sets the package and workspace name used in generated metadata.
- `--ai-tools <selection>` writes `AI_TOOLS.md` guidance for provider-maintained skills and MCP docs. Use `recommended`, `none`, or a comma-separated list of `supabase`, `cloudflare`, `astro`, and `svelte`.
- `--yes` accepts safe defaults for omitted prompts.
- `--no-install` skips dependency installation.
- `--no-git` skips git initialization.
- `--force` allows rendering into a non-empty target directory.

## Requirements

- Node.js 22.12.0 or newer.
- pnpm 10 or newer for the generated workspace.

The generated workspace expects pnpm. Use npm or pnpm to run the create command, then use pnpm inside the generated project.

The `--ai-tools` option writes reference notes only. It does not run provider installers, write MCP credentials, authenticate with hosted services, or provision Cloudflare or Supabase resources.

Canonical source material: [`packages/create-bankstack/README.md`](https://github.com/josephbanks/bankstack/blob/main/packages/create-bankstack/README.md).
