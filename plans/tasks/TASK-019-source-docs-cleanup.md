# TASK-019: Source Docs Cleanup

## Status

Done

## Depends On

None

## Blocks

TASK-022

## Goal

Update or archive legacy source documentation so the repository's top-level guidance no longer competes with the CLI-era user path.

## Context

The public docs now curate the alpha CLI, generated workspace, Cloudflare boundary, Supabase boundary, and dogfood story. `SETUP_GUIDE.md` still reads like the primary manual bootstrap path from before the CLI became the product center.

## Scope

Review `SETUP_GUIDE.md`, `VISION.md`, `ARCHITECTURE_OVERVIEW.md`, `README.md`, and the public docs entrypoints. Either revise `SETUP_GUIDE.md` into a clearly historical/deep-reference document or move its useful content into a less confusing archived/source-doc shape. Update links that present it as the primary setup path.

## Out Of Scope

Do not change generated CLI templates, redesign the docs site, add new product features, or remove architecture reference material that still helps explain Bankstack.

## Implementation Notes

Prefer the CLI-era path as the default: run `create-bankstack@alpha`, inspect generated `README.md` and `SETUP.md`, then connect Cloudflare and Supabase intentionally. Keep manual bootstrap material only if it is clearly labeled as background or historical context.

## Acceptance Criteria

- Top-level docs do not imply manual Nx bootstrapping is the preferred first step for users.
- Public docs and repo docs agree on the CLI as the alpha entrypoint.
- Any archived or retained manual setup content has a clear purpose.
- Links from `VISION.md`, `README.md`, and docs deployment/watch-path notes remain accurate.

## Verification

Run formatting and docs checks. Review links that mention `SETUP_GUIDE.md` and confirm no user-facing entrypoint contradicts `create-bankstack@alpha`.

## Handoff Notes

Completed in this session:

- Reframed `SETUP_GUIDE.md` as historical/deep-reference context instead of the alpha setup entrypoint.
- Updated `README.md`, `VISION.md`, and public docs source links so `create-bankstack@alpha` plus generated `README.md`/`SETUP.md` is the default user path.
- Verified no user-facing source-doc references still present manual Nx bootstrapping as the preferred first step.

Verification:

- `pnpm format:check`
- `pnpm --filter @bankstack/docs build`
- `pnpm --filter @bankstack/docs dogfood:verify`
