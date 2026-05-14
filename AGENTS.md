@RTK.md
@VISION.md

# Bankstack Agent Instructions

## Planning Workflow

Before implementing work from `plans/`, read `plans/README.md`, `plans/TRACKER.md`, and the matching file in `plans/tasks/`.

Use `plans/TRACKER.md` as the source of truth for status, dependencies, blockers, and recommended execution order. Pick the first `Todo` task whose dependencies are `Done`, unless the user explicitly chooses a different task.

For plan-backed implementation:

- Mark the tracker row and task file `Status` as `Doing` before product changes begin.
- Implement only the task's `Scope`; respect `Out Of Scope`.
- If the task is too large for one session, split it into smaller task files and update the tracker before implementing.
- Run the task's listed verification steps, or explain exactly why a step could not run.
- When finished, mark the tracker row and task file `Status` as `Done`, update blocked/unblocked tasks, and leave handoff notes when useful.

## Research And Sources

When a task depends on current behavior of external tooling or platforms, verify against primary/current sources before choosing an implementation. This especially applies to pnpm, Nx, Astro, SvelteKit, Hono, Cloudflare Workers/Wrangler, Supabase, npm publishing, and Codex configuration.

Prefer official documentation and source repositories over blog posts. Record source links in handoff notes or comments when the decision would otherwise be hard to audit later.

## Subagents

Project-scoped custom agents live in `.codex/agents/`, following the current Codex custom-agent TOML format documented at:

- https://developers.openai.com/codex/subagents
- https://developers.openai.com/codex/config-reference

Use subagents selectively when they materially reduce risk or latency: independent documentation research, codebase mapping, focused review, or verification can run in parallel with main-thread work. Keep each delegation narrow. For normal implementation, the main agent owns final integration, verification, and tracker updates.

Delegate when the work can run in parallel without blocking the next local step: documentation checks, codebase mapping, independent review, or focused verification. Keep the immediate critical path local.

When delegating:

- Give each subagent one concrete output and the minimum context needed.
- Prefer read-only agents for exploration, documentation research, and review.
- Use implementation workers only for clearly separable file ownership; remind them they are not alone in the codebase.
- Avoid duplicating the same investigation across agents.
- Integrate and verify results in the main thread before updating tracker status.

Useful project agents:

- `plan_scout`: read-only plan and codebase mapper for the next task.
- `docs_researcher`: read-only documentation researcher using `gpt-5.4-mini`.
- `bankstack_reviewer`: read-only reviewer for correctness, security, scope drift, and missing tests.
- `smoke_tester`: verification agent for running focused checks and reporting exact results.

Do not create a separate skill for general subagent delegation until the workflow becomes reusable outside this repository or needs bundled scripts/references. Keep always-on delegation rules in `AGENTS.md` so they are visible before subagent choices are made.
