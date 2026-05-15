# TASK-001: Repo Foundation

## Status

Done

## Depends On

TASK-000

## Blocks

TASK-002

## Goal

Establish the root repository foundation needed before adding the Bankstack CLI package.

## Context

The current repository starts with vision and setup documents only. Bankstack should become an opinionated Nx monorepo whose product center is a published Node CLI under `packages/create-bankstack`. The repo foundation should support that future package without implementing it yet.

## Scope

Add root-level project metadata and workspace infrastructure: pnpm workspace configuration, Nx configuration, root `package.json`, TypeScript/build tooling choices if needed, `.gitignore` updates, MIT license, and baseline scripts for install/check/test placeholders.

## Out Of Scope

Do not add `packages/create-bankstack`, generated templates, app code, GitHub Actions, or publish automation. Keep this task limited to root infrastructure.

## Implementation Notes

Use pnpm as the only package manager. Prefer conservative root scripts that future tasks can extend, such as `check`, `test`, and `build`, even if some are placeholders initially. Keep metadata aligned with the planned npm package name `create-bankstack`, but do not publish anything.

## Acceptance Criteria

- Root workspace files exist and support future packages/apps.
- The repository has an MIT license.
- Root scripts are documented enough for future tasks to hook into them.
- Existing vision docs remain intact.

## Verification

Run the safest available root checks after dependencies are configured. At minimum, inspect workspace files and run any non-mutating package manager validation available for the new setup.

## Handoff Notes

TASK-002 should add the CLI package inside the workspace created here.

Tooling choices recorded for follow-on tasks:

- pnpm is pinned through `packageManager` as `pnpm@10.33.2`, matching the local toolchain used to generate `pnpm-lock.yaml`.
- Nx is pinned as an exact dev dependency at `nx@22.7.1`.
- The root Node engine floor started at `>=22.0.0` in TASK-001 and was raised to `>=22.4.0` in TASK-003 once the CLI adopted Node's built-in negative boolean argument parsing for `--no-install` and `--no-git`.

Primary/current sources checked:

- pnpm workspace docs: https://pnpm.io/pnpm-workspace_yaml
- Nx package-manager workspace docs: https://nx.dev/docs/getting-started/tutorials/crafting-your-workspace
- Nx adoption docs for package-manager monorepos: https://nx.dev/docs/guides/adopting-nx/adding-to-monorepo
