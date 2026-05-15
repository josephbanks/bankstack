---
title: Dogfood And Future Skill
description: The repo, CLI, docs site, and future Bankstack expert skill should stay aligned as one product surface.
order: 6
---

This repository is the canonical dogfood project for Bankstack. The CLI package, public docs, and future agent skill should evolve from the same source material instead of drifting into separate stories.

## Delivery Surfaces

- `packages/create-bankstack`: the published alpha CLI for greenfield workspaces.
- `apps/docs`: the public docs surface and local dogfood app.
- `skills/bankstack-expert`: a planned agent skill for existing projects and agent sessions.

The CLI targets new repositories. The future skill targets developers who already have a codebase but want Bankstack guardrails, architectural boundaries, and workflow conventions.

## Alignment Rule

When docs mention a generated file or behavior, that claim should be checked against the CLI templates or generated golden output. When the templates change, public docs should change with them. When the docs identify a missing convention, record a follow-up task instead of quietly promising behavior the alpha does not ship.

TASK-018 will add deployment and dogfood verification so the docs site can prove this repository can host a real public surface without drifting from `create-bankstack@alpha`.

Canonical source material: [`VISION.md`](https://github.com/josephbanks/bankstack/blob/main/VISION.md), [`plans/TRACKER.md`](https://github.com/josephbanks/bankstack/blob/main/plans/TRACKER.md), and the generated golden docs.
