# TASK-013: Alpha Publish Prep

## Status

Done

## Depends On

TASK-012

## Blocks

TASK-014

## Goal

Prepare the manual `create-bankstack@0.1.0-alpha.0` npm release.

## Context

The first release should be real and installable, but clearly marked as alpha. Publishing should happen only after tests and smoke checks are passing.

## Scope

Verify npm package name availability, finalize package metadata, add release notes or checklist, confirm files included in the package, and document the manual publish command sequence.

## Out Of Scope

Do not automate npm publishing with tokens, publish a stable `0.1.0`, deploy docs, or add new product features.

## Implementation Notes

If `create-bankstack` is unavailable, document the naming issue and propose the smallest naming adjustment before changing package identity. Use `0.1.0-alpha.0` for the first alpha unless a prior release exists.

## Acceptance Criteria

- Package name availability or naming blocker is documented.
- Package metadata is ready for npm alpha publication.
- Manual publish checklist exists and references required verification commands.
- Package contents are reviewed so templates and built CLI files are included correctly.

## Verification

Run package dry-run commands where available, such as pack or publish dry-run. Confirm CI checks are passing before any real publish.

## Handoff Notes

After alpha publish prep, TASK-014 can begin the dogfood docs site milestone.

Implemented the manual alpha publish prep for `create-bankstack@0.1.0-alpha.0`:

- Confirmed `create-bankstack` returned `E404 Not Found` from `npm view create-bankstack version --registry https://registry.npmjs.org/` on 2026-05-15, so no public npm package version was found at prep time.
- Added npm-facing package metadata, package-local `README.md`, package-local `LICENSE`, and `publishConfig` to `packages/create-bankstack`.
- Added `packages/create-bankstack/RELEASE.md` with the alpha release target, name availability check, verification sequence, package contents expectations, and the manual publish command.
- Confirmed `.github/workflows/ci.yml` is correct for the current full-check CI path: `actions/checkout@v6`, `pnpm/action-setup@v6`, `actions/setup-node@v6` with `cache: pnpm`, frozen install, format, check, package tests, and generated smoke test. If CI later switches to `nx affected`, update checkout history and base/head handling instead of assuming the current shallow checkout is enough.
- This local repository has no configured git remote, so there is no GitHub Actions run URL or run ID to record for this prep commit. Do not perform the real npm publish until the final candidate commit has a green `.github/workflows/ci.yml` run and that run is recorded in release notes.

Primary sources used:

- GitHub `actions/checkout` README: https://github.com/actions/checkout
- GitHub `actions/setup-node` README: https://github.com/actions/setup-node
- pnpm `action-setup` README: https://github.com/pnpm/action-setup
- pnpm publish docs: https://pnpm.io/cli/publish
- npm publish docs: https://docs.npmjs.com/cli/v11/commands/npm-publish/
- npm package metadata docs: https://docs.npmjs.com/cli/v11/configuring-npm/package-json/

Verification completed:

- `pnpm format`
- `pnpm format:check`
- `pnpm check`
- `pnpm --filter create-bankstack test`
- `pnpm smoke:generated`
- `pnpm --filter create-bankstack build`
- `pnpm --filter create-bankstack pack --dry-run`
- `pnpm --filter create-bankstack publish --dry-run --no-git-checks --tag alpha --access public --registry https://registry.npmjs.org/`

The first publish dry run without an explicit `--tag alpha` reported `latest`; the release checklist therefore requires an explicit `--tag alpha` on both dry-run and real publish commands.
