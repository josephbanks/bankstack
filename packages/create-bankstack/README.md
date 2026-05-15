# create-bankstack

`create-bankstack` scaffolds a Bankstack workspace: a pnpm-only Nx monorepo with Cloudflare edge app examples, Supabase boundary placeholders, and shared packages.

This package is currently alpha software. The generated project is intended to be inspectable and useful as a starting point, but it does not create cloud resources, provision Supabase, configure production secrets, or deploy anything automatically.

## Usage

```sh
pnpm dlx create-bankstack@alpha my-bankstack-app
```

```sh
npx create-bankstack@alpha my-bankstack-app
```

For non-interactive runs:

```sh
pnpm dlx create-bankstack@alpha my-bankstack-app --yes
```

Useful flags:

- `--name <name>` sets the package/workspace name used in generated metadata.
- `--yes` uses safe defaults for omitted prompts.
- `--no-install` skips dependency installation.
- `--no-git` skips git initialization.
- `--force` allows rendering into a non-empty target directory.

## Generated Shape

The scaffold includes:

- `apps/marketing`: Astro marketing app.
- `apps/dashboard`: SvelteKit dashboard app.
- `apps/api`: Hono API Worker example.
- `packages/ui`: shared UI placeholder package.
- `packages/supabase`: Supabase client and auth-boundary placeholders.
- `packages/shared-utils`: shared utility package.

Read the generated `README.md` and `SETUP.md` before connecting real Cloudflare or Supabase projects.

## Requirements

- Node.js 22.12.0 or newer.
- pnpm 10 or newer for the generated workspace.

## Alpha Notes

The first alpha is published under the `alpha` dist-tag. Install with `create-bankstack@alpha` until the project intentionally promotes a stable release.
