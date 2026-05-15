---
title: Dogfood And Skill
description: The repo, CLI, docs site, and Bankstack expert skill should stay aligned as one product surface.
order: 7
---

This repository is the canonical dogfood project for Bankstack. The CLI package, public docs, and agent skill should evolve from the same source material instead of drifting into separate stories.

## Delivery Surfaces

- `packages/create-bankstack`: the published alpha CLI for greenfield workspaces.
- `apps/docs`: the public docs surface and local dogfood app.
- `skills/bankstack-expert`: the local/repo skill for existing projects and agent sessions.

The CLI targets new repositories. The skill targets developers who already have a codebase but want Bankstack guardrails, architectural boundaries, and workflow conventions.

## Using The Skill Locally

The skill lives at [`skills/bankstack-expert`](https://github.com/josephbanks/bankstack/tree/main/skills/bankstack-expert). Use it by copying or referencing that folder from a skills location your coding agent reads, keeping the folder name and `SKILL.md` together with its `agents/openai.yaml` metadata.

For Codex-style local installs, a typical local shape is:

```text
$CODEX_HOME/skills/bankstack-expert/
├── SKILL.md
└── agents/openai.yaml
```

For repo-scoped sharing, keep the same folder under a project skills directory such as `.agents/skills/bankstack-expert/` if your agent setup reads project skills. This is intentionally manual for the alpha: Bankstack does not publish the skill to skills.sh or run marketplace automation yet.

## Alignment Rule

When docs mention a generated file or behavior, that claim should be checked against the CLI templates or generated golden output. When the templates change, public docs should change with them. When the docs identify a missing convention, record a follow-up task instead of quietly promising behavior the alpha does not ship.

The docs site includes dogfood verification so this repository can host a real public surface without drifting from `create-bankstack@alpha`.

Canonical source material: [`VISION.md`](https://github.com/josephbanks/bankstack/blob/main/VISION.md), [`skills/bankstack-expert`](https://github.com/josephbanks/bankstack/tree/main/skills/bankstack-expert), [`plans/TRACKER.md`](https://github.com/josephbanks/bankstack/blob/main/plans/TRACKER.md), and the generated golden docs.
