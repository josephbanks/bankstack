We're just starting this project out. Check @VISION.md for the project vision and layout.

## CI

GitHub Actions runs the CLI MVP checks on pull requests and pushes to `main`:

- `pnpm install --frozen-lockfile`
- `pnpm format:check`
- `pnpm check`
- `pnpm --filter create-bankstack test`
- `pnpm smoke:generated`

The workflow installs pnpm from the root `packageManager` field and uses the GitHub Actions pnpm store cache keyed by `pnpm-lock.yaml`. The generated-project smoke test installs a temporary generated workspace from the npm registry, so it needs normal outbound registry access but no publishing, Cloudflare, or Supabase secrets.
