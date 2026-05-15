# Bankstack Plans

This directory is the planning system for Bankstack. It exists so future agents and sessions can move the project forward in small, reviewable chunks without trying to build the whole product at once.

## How To Use This Directory

1. Start with [TRACKER.md](TRACKER.md). It is the source of truth for active status, dependencies, blockers, and recommended execution order.
2. Pick the first `Todo` task whose dependencies are `Done`.
3. Open the matching file in [tasks](tasks). Each task is intended to be session-sized and self-contained.
4. Mark the tracker row and task file `Status` as `Doing` before implementation starts.
5. Implement only the scope in that task. Respect the `Out Of Scope` section.
6. Run the listed verification steps.
7. Mark the task `Done`, update blocked/unblocked tasks in the tracker, and leave handoff notes when useful.

Completed milestone history is preserved under [archive](archive). Use archive files for context, not as the active task queue.

Use [DOGFOOD.md](DOGFOOD.md) when a task needs generated-project checks, docs/template drift review, or feedback triage.

## Status Values

Use only these statuses:

- `Todo`
- `Doing`
- `Blocked`
- `Done`

## Planning Rules

- The planning scaffold is not product implementation.
- Product work should happen through the task files, one session-sized task at a time.
- If a future agent discovers that a task is too large, it should split that task into smaller task files before implementing it.
- Keep dependencies explicit. If one task cannot begin until another is complete, record that in both files and in the tracker.
- Keep the docs site and `bankstack-expert` skill after the CLI MVP unless the product direction changes deliberately.
- Keep completed milestone waves in `plans/archive/` when the active tracker becomes hard to scan. Do not delete task history unless the user explicitly asks.
