---
title: Alpha CLI
description: Install and run the current create-bankstack alpha with explicit alpha tags.
order: 2
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

## Useful Flags

- `--name <name>` sets the package and workspace name used in generated metadata.
- `--yes` accepts safe defaults for omitted prompts.
- `--no-install` skips dependency installation.
- `--no-git` skips git initialization.
- `--force` allows rendering into a non-empty target directory.

## Requirements

- Node.js 22.12.0 or newer.
- pnpm 10 or newer for the generated workspace.

The generated workspace expects pnpm. Use npm or pnpm to run the create command, then use pnpm inside the generated project.

Canonical source material: [`packages/create-bankstack/README.md`](https://github.com/josephbanks/bankstack/blob/main/packages/create-bankstack/README.md).
