# TASK-023: Feedback And Dogfood Loop

## Status

Done

## Depends On

TASK-021, TASK-022

## Blocks

None

## Goal

Define a lightweight loop for real generated-project checks, user feedback capture, and follow-up tasks when templates, docs, or release guidance drift.

## Context

Bankstack now has a CLI, docs site, release checklist, and initial expert skill. The next risk is drift: docs can promise more than templates ship, releases can lag behind source, and feedback can disappear into ad hoc notes.

## Scope

Create a small repeatable process for dogfooding generated projects, recording user or maintainer feedback, and turning drift into tracker tasks. Prefer docs/checklists over new infrastructure unless a simple script is clearly justified.

## Out Of Scope

Do not add telemetry, analytics, paid services, hosted feedback tooling, or broad product-roadmap planning. Do not implement template features discovered through feedback unless they are split into follow-up tasks.

## Implementation Notes

Keep the loop practical for a small alpha project: exact commands, where to record findings, how to decide whether a finding becomes a task, and how to verify docs/template alignment after changes.

## Acceptance Criteria

- There is a documented feedback/dogfood process that future sessions can follow.
- The process includes generated-project verification and docs/template drift checks.
- New findings have an explicit path into `plans/TRACKER.md` or a future backlog.
- The process does not require production secrets or paid infrastructure.

## Verification

Run formatting checks. If a command checklist is added, dry-run commands that are safe locally or explain why any command cannot run without credentials.

## Handoff Notes

Completed in this session:

- Added `plans/DOGFOOD.md` with generated-project smoke checks, docs/skill drift checks, feedback intake fields, and triage rules.
- Linked the loop from `plans/README.md` and public dogfood docs.
- Extended docs dogfood verification to require the loop link and generated smoke command.

Verification:

- `pnpm format:check`
- `pnpm --filter @bankstack/docs build`
- `pnpm --filter @bankstack/docs dogfood:verify`
- `pnpm --filter create-bankstack test`
- `pnpm smoke:generated`
