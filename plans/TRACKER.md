# Bankstack Task Tracker

This tracker is the active planning surface for Bankstack. Completed milestone history lives in [`archive`](archive), and active work packets live in [`tasks`](tasks).

## Status Values

Use only `Todo`, `Doing`, `Blocked`, or `Done`.

## Completed Milestones

The alpha MVP workstream is complete and archived at [`archive/2026-05-alpha-mvp`](archive/2026-05-alpha-mvp):

- Planning system
- Repo foundation
- `create-bankstack` alpha CLI
- Generated workspace templates, docs, tests, CI, and release checklist
- Dogfood docs site
- Initial `skills/bankstack-expert` skill

## Recommended Dependency Flow

```text
TASK-019
  -> TASK-022
TASK-020
  -> TASK-022
TASK-021
  -> TASK-023
TASK-022
  -> TASK-023
  -> TASK-024
```

## Phase 8: Distribution Polish

| ID       | Task                                                                                           | Status | Depends On         | Blocks   | Owner/Session | Acceptance Summary                                                                                                        |
| -------- | ---------------------------------------------------------------------------------------------- | ------ | ------------------ | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| TASK-019 | [Source Docs Cleanup](tasks/TASK-019-source-docs-cleanup.md)                                   | Done   | None               | TASK-022 | Codex         | Legacy source docs clearly point to the CLI-era path or are archived so they no longer confuse users.                     |
| TASK-020 | [Skill Packaging And Install Guidance](tasks/TASK-020-skill-packaging-and-install-guidance.md) | Done   | None               | TASK-022 | Codex         | The Bankstack expert skill has local/repo install guidance and minimal metadata without publishing automation.            |
| TASK-021 | [Alpha Release Cadence](tasks/TASK-021-alpha-release-cadence.md)                               | Done   | None               | TASK-023 | Codex         | Release notes/checklists reflect the current alpha state, dist-tag reality, and next release path.                        |
| TASK-022 | [Public Docs Distribution Page](tasks/TASK-022-public-docs-distribution-page.md)               | Done   | TASK-019, TASK-020 | TASK-023 | Codex         | Public docs explain CLI install, skill usage, current limits, and feedback paths from one distribution entrypoint.        |
| TASK-023 | [Feedback And Dogfood Loop](tasks/TASK-023-feedback-and-dogfood-loop.md)                       | Done   | TASK-021, TASK-022 | None     | Codex         | A lightweight loop exists for generated-project checks, user feedback capture, and template/docs drift follow-up.         |
| TASK-024 | [Generated Provider AI Tooling](tasks/TASK-024-generated-provider-ai-tooling.md)               | Done   | TASK-022           | None     | Codex         | Generated projects can optionally include provider-maintained AI skills/MCP guidance without losing local-first defaults. |
