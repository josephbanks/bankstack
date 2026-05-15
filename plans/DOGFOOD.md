# Bankstack Dogfood And Feedback Loop

Use this checklist when a release, docs change, template change, or user report might have created drift between the CLI, generated workspace, public docs, release notes, and `bankstack-expert` skill.

## When To Run It

Run the lightweight loop after:

- CLI source, template, or generated golden output changes.
- Public docs make or change claims about generated behavior.
- Release guidance or npm package metadata changes.
- User feedback reports setup confusion, missing template behavior, broken generated-project checks, or docs/skill contradictions.

Skip a full generated-project smoke only for tracker-only updates or docs prose that does not claim generated behavior.

## Generated-Project Check

From the repository root:

```bash
pnpm --filter create-bankstack test
pnpm smoke:generated
```

`pnpm smoke:generated` builds the local CLI, generates a temporary project, installs dependencies inside that project, and runs the generated workspace checks. It uses normal package-registry access but no Cloudflare or Supabase credentials. Set `BANKSTACK_KEEP_SMOKE_TEMP=1` only when you need to inspect the temporary project after a failure.

## Docs And Skill Drift Check

From the repository root:

```bash
pnpm --filter @bankstack/docs build
pnpm --filter @bankstack/docs dogfood:verify
```

Review these source surfaces together when behavior changes:

- CLI package docs: `packages/create-bankstack/README.md`
- Generated docs: `packages/create-bankstack/scripts/goldens/cli/generated/README.md` and `SETUP.md`
- Public docs: `apps/docs/src/content/docs/`
- Skill: `skills/bankstack-expert/SKILL.md` and `skills/bankstack-expert/agents/openai.yaml`
- Release checklist: `packages/create-bankstack/RELEASE.md`

If a docs or skill claim cannot be verified against package docs, generated output, or current provider docs, reword it as a limit or create a follow-up task instead of leaving it as a promise.

## Feedback Intake

Capture user or maintainer feedback with:

- `create-bankstack` version or dist-tag.
- Command or workflow used.
- Host environment when relevant: Node, pnpm, OS, and whether Cloudflare/Supabase credentials were involved.
- Source of the mismatch: generated `README.md`/`SETUP.md`, public docs, release checklist, skill, or CLI behavior.
- Smallest reproduction, copied error output, or screenshot path.

Use GitHub issues for external reports. For internal planning, add a `Todo` task under `plans/tasks/` and a matching row in `plans/TRACKER.md` when the finding changes shipped behavior, docs promises, release process, or generated project ergonomics.

## Triage Rule

- Fix immediately in the active task if the issue is inside that task's scope and does not expand the blast radius.
- Create a follow-up task if the issue is real but outside the active scope.
- Record as a release-note or docs note if the alpha intentionally does not support the behavior yet.
- Do not add telemetry, analytics, hosted forms, paid tooling, provider resources, or production secrets as part of this loop.
