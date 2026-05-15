Bankstack is an alpha-stage scaffold and convention set for edge-native modern applications, including SaaS-ready Cloudflare edge plus Supabase split-stack monorepos. The name is a play on maintainer Joseph Banks' last name; Bankstack is not banking software and is not affiliated with banks or financial institutions.

Bankstack is maintained by [Automata Partners](https://www.automatapartners.com/). Start with [VISION.md](VISION.md) for the product direction, [packages/create-bankstack](packages/create-bankstack) for the published CLI, and [apps/docs](apps/docs) for the public docs site.

## CI

GitHub Actions runs the CLI MVP checks on pull requests and pushes to `main`:

- `pnpm install --frozen-lockfile`
- `pnpm format:check`
- `pnpm check`
- `pnpm --filter create-bankstack test`
- `pnpm smoke:generated`

The workflow installs pnpm from the root `packageManager` field and uses the GitHub Actions pnpm store cache keyed by `pnpm-lock.yaml`. The generated-project smoke test installs a temporary generated workspace from the npm registry, so it needs normal outbound registry access but no publishing, Cloudflare, or Supabase secrets.
