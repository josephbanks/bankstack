---
title: Distribution
description: Choose the alpha CLI for greenfield workspaces or the Bankstack expert skill for existing projects.
order: 2
---

Bankstack has two alpha adoption paths:

- Use `create-bankstack@alpha` when you want a new local-first workspace.
- Use `skills/bankstack-expert` when you already have a codebase or an agent session that needs Bankstack guardrails.

The CLI is the product distribution path. The skill is guidance for humans and agents working inside existing projects. Neither path creates cloud resources, provisions Supabase, deploys Workers, or configures production secrets for you.

## Greenfield: Run The CLI

```bash
pnpm dlx create-bankstack@alpha my-bankstack-app
```

```bash
npx create-bankstack@alpha my-bankstack-app
```

After generation, read the generated `README.md` and `SETUP.md`. Those files are the source for the generated app/package layout, local verification commands, Cloudflare boundary, Supabase boundary, and current v0.1 limits.

For provider-maintained AI tooling guidance, choose an explicit docs-only option:

```bash
pnpm dlx create-bankstack@alpha my-bankstack-app --ai-tools recommended
```

You can also use `--ai-tools none` or a comma-separated provider list such as `--ai-tools supabase,cloudflare,astro,svelte`. The generated `AI_TOOLS.md` file explains current provider docs, skills, and MCP surfaces without running installers, writing credentials, or provisioning hosted resources.

## Existing Projects: Use The Skill

The Bankstack expert skill lives in [`skills/bankstack-expert`](https://github.com/josephbanks/bankstack/tree/main/skills/bankstack-expert). Copy or reference that folder from a local or repo-scoped skills location your coding agent reads, keeping `SKILL.md` with `agents/openai.yaml`.

Use the skill when you want Bankstack conventions without scaffolding a new repository:

- App/package boundary reviews.
- Cloudflare edge plus Supabase architecture checks.
- Generated-template and docs drift checks.
- Plan-backed work in this repository.

Do not treat the skill as a replacement for the CLI. It cannot generate the workspace, install dependencies, publish releases, or provision provider resources by itself.

## Current Alpha Limits

- The package is alpha software. Prefer explicit `create-bankstack@alpha` commands until stable promotion.
- Generated projects are pnpm-only and expect Node.js 22.12.0 or newer.
- The scaffold includes Astro, SvelteKit, Hono, Cloudflare config examples, Supabase boundary placeholders, and shared packages.
- The scaffold does not include production provisioning, a full Supabase Auth UI, generated product tables, deployment automation, or the optional Python compute layer.
- Provider-maintained AI tooling guidance is opt-in and documentation-only. It complements `skills/bankstack-expert`; it does not replace the Bankstack skill or force a specific agent.

## Feedback Path

Use [GitHub issues](https://github.com/josephbanks/bankstack/issues) for bugs, docs drift, generated-template mismatches, release checklist questions, and feature requests. Include:

- The `create-bankstack` version or dist-tag you used.
- The command you ran.
- Whether the finding came from generated `README.md`/`SETUP.md`, public docs, or the skill.
- The smallest reproduction or copied error output that explains the problem.

Canonical source material: [`packages/create-bankstack/README.md`](https://github.com/josephbanks/bankstack/blob/main/packages/create-bankstack/README.md), generated [`README.md`](https://github.com/josephbanks/bankstack/blob/main/packages/create-bankstack/scripts/goldens/cli/generated/README.md), generated [`SETUP.md`](https://github.com/josephbanks/bankstack/blob/main/packages/create-bankstack/scripts/goldens/cli/generated/SETUP.md), and [`skills/bankstack-expert`](https://github.com/josephbanks/bankstack/tree/main/skills/bankstack-expert).
