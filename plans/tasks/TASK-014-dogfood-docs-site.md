# TASK-014: Dogfood Docs Site

## Status
Todo

## Depends On
TASK-013

## Blocks
TASK-015

## Goal
Plan and begin the `apps/docs` dogfood site milestone after the CLI alpha is ready.

## Context
The Bankstack repository should eventually dogfood its own stack through a public docs/marketing site, likely under `apps/docs` for bankstack.dev. This should follow the CLI MVP so docs and templates stay aligned.

## Scope
Create the next task breakdown for bootstrapping `apps/docs`, documenting Bankstack usage, and proving the repo can consume its own conventions. If implementation is appropriate in the future session, start only the docs-site foundation task that is explicitly planned.

## Out Of Scope
Do not build the docs site before the CLI alpha path is ready. Do not create the agent skill in this task. Do not revise the CLI templates unless docs work exposes a specific follow-up task.

## Implementation Notes
Treat this as a post-alpha milestone. The docs site should explain the CLI, architecture, setup, and conventions with enough fidelity to replace early README-only guidance over time.

## Acceptance Criteria
- A concrete docs-site task breakdown exists or the first docs-site foundation task is completed.
- The docs-site plan references the published or prepared alpha CLI.
- Any gaps discovered in CLI templates are captured as follow-up tasks instead of being fixed opportunistically.
- `skills/bankstack-expert` remains deferred until after docs stabilize.

## Verification
Review tracker updates and any docs-site files created by the future session. Confirm dependency order still keeps docs after CLI alpha.

## Handoff Notes
TASK-015 should use the stabilized docs and CLI conventions as source material for the agent skill.
