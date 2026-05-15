# TASK-015: Bankstack Expert Skill

## Status

Done

## Depends On

TASK-018

## Blocks

None

## Goal

Plan and create the `skills/bankstack-expert` agent skill after the CLI and docs conventions have stabilized.

## Context

Bankstack has two adoption surfaces: a CLI for greenfield monorepos and an agent skill for existing projects or coding sessions. The skill should distill the proven architecture, docs, and workflow guardrails rather than inventing new conventions.

## Scope

Create the task breakdown or initial implementation for `skills/bankstack-expert/SKILL.md`, based on the alpha CLI templates and dogfood docs. The skill should guide agents on Bankstack architecture, boundaries, setup, and safe modification patterns.

## Out Of Scope

Do not create the skill before docs and CLI conventions stabilize. Do not make the skill a replacement for the CLI. Do not add skills.sh publishing automation unless it is explicitly split into a follow-up task.

## Implementation Notes

Use the repo's final docs and generated template structure as source material. The skill should be concise enough for agents to load, with references to deeper docs rather than duplicating everything.

## Acceptance Criteria

- `skills/bankstack-expert` has a clear implementation plan or initial skill file.
- The skill references the CLI and docs conventions accurately.
- The skill explains when to use Bankstack patterns in existing projects.
- Any publication/distribution steps are captured as follow-up tasks if not completed.

## Verification

Review the skill against `VISION.md`, generated template docs, and the dogfood docs site. Confirm it does not contradict the CLI scaffold.

## Handoff Notes

Completed the initial `skills/bankstack-expert/SKILL.md` after the CLI and docs conventions stabilized. The skill is intentionally concise, targets existing projects and agent sessions, and points agents back to the CLI, docs, generated golden output, and planning system instead of duplicating every convention inline.

Publication/distribution automation is still out of scope. Follow-up work should focus on skill packaging/install guidance, release cadence, source docs cleanup, public distribution docs, and real feedback loops.
