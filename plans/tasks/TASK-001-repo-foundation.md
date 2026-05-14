# TASK-001: Repo Foundation

## Status
Todo

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
TASK-002 should add the CLI package inside the workspace created here. If this task chooses tooling versions, record them in handoff notes or commit context.
