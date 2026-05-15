# TASK-020: Skill Packaging And Install Guidance

## Status

Done

## Depends On

None

## Blocks

TASK-022

## Goal

Make the initial `skills/bankstack-expert` skill easy to discover and use locally without adding premature publishing automation.

## Context

TASK-015 created the initial skill file. The next distribution step is lightweight packaging and install guidance so agents and users can understand where the skill lives and how to use it from this repo or a copied skill folder.

## Scope

Review current Codex skill metadata expectations and add only the minimal supporting metadata or docs needed for local/repo usage. Update repo or docs references so `skills/bankstack-expert` is visible as a supported adoption surface.

## Out Of Scope

Do not automate skills.sh publishing, add broad bundled references, create scripts, or turn the skill into a replacement for the CLI. Do not change generated project templates unless a specific packaging bug requires a separate task.

## Implementation Notes

Keep `SKILL.md` lean. If UI-facing metadata is added, make sure it matches the skill body. Record publishing/distribution automation as a future task only after the local/repo guidance is clear.

## Acceptance Criteria

- The skill remains concise and valid.
- Local/repo usage of the skill is documented in the appropriate public or repo docs surface.
- Any metadata added for skill discovery is consistent with `SKILL.md`.
- skills.sh or marketplace automation remains deferred unless explicitly split into a later task.

## Verification

Validate the skill file shape against current skill guidance. Run formatting and workspace checks. Review docs links for consistency with the CLI-vs-skill distinction.

## Handoff Notes

Completed in this session:

- Added minimal UI-facing skill metadata at `skills/bankstack-expert/agents/openai.yaml`, generated from the current skill-creator guidance.
- Updated repo and public docs so `skills/bankstack-expert` is presented as the existing-project/local skill surface.
- Kept skills.sh and marketplace publishing automation explicitly deferred.

Verification:

- `python3 /Users/josephbanks/.codex/skills/.system/skill-creator/scripts/generate_openai_yaml.py skills/bankstack-expert --name bankstack-expert ...`
- `node -e '...'` direct skill shape check for `SKILL.md` frontmatter and `agents/openai.yaml`.
- `pnpm format:check`
- `pnpm --filter @bankstack/docs build`
- `pnpm --filter @bankstack/docs dogfood:verify`

Note: the bundled `quick_validate.py` skill validator could not run in this local Python environment because `PyYAML` is not installed (`ModuleNotFoundError: No module named 'yaml'`).
