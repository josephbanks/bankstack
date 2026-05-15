# create-bankstack Alpha Release Checklist

This checklist records manual `create-bankstack` alpha releases. It does not automate publishing and does not require npm tokens in CI.

## Current Alpha State

- Package: `create-bankstack`
- Version: `0.1.0-alpha.1`
- Dist tags: `alpha` and `latest`
- Registry: `https://registry.npmjs.org/`
- Access: public

## Published State

`0.1.0-alpha.1` is the current published alpha. On 2026-05-15,
`npm view create-bankstack version dist-tags --registry https://registry.npmjs.org/`
returned:

```text
version = '0.1.0-alpha.1'
dist-tags = { latest: '0.1.0-alpha.1', alpha: '0.1.0-alpha.1' }
```

Use explicit `create-bankstack@alpha` install commands in docs until a stable
release intentionally becomes the default path. Because `latest` already points
at an alpha for this package, keep `alpha` and `latest` aligned for alpha patch
releases so the npm package page reflects the current alpha metadata. Do not
unpublish alpha versions to adjust dist-tags.

### Previous alpha.0

Published on 2026-05-15 as `create-bankstack@0.1.0-alpha.0`.

Registry verification:

```sh
npm view create-bankstack@0.1.0-alpha.0 version --registry https://registry.npmjs.org/
npm view create-bankstack dist-tags --registry https://registry.npmjs.org/
```

Observed result:

```text
0.1.0-alpha.0
{ alpha: '0.1.0-alpha.0', latest: '0.1.0-alpha.0' }
```

The alpha tag is correct. npm also assigned `latest` to this first and only package version. Removing `latest` with `npm dist-tag rm create-bankstack latest --registry https://registry.npmjs.org/` returned `E400 Bad Request`, so leave `latest` as-is until a stable release can intentionally move it to a stable version. Do not unpublish the alpha to adjust dist-tags.

## Source-Backed Notes

- npm package names and versions form the unique publish identifier, and a name/version cannot be reused after publication.
- `npm pack --dry-run` is the official way to inspect package contents before publication.
- The package `files` list limits publication to the listed entries, subject to npm's always-included package files.
- npm publishes to the `latest` dist-tag by default unless `--tag <tag>` is provided; npm's dist-tag docs describe `latest` as the default install target and recommend non-`latest` tags for unstable versions.
- `publishConfig` records intended publish-time defaults such as `tag`, `registry`, and `access`, but the manual commands below pass `--tag alpha` and `--access public` explicitly because `pnpm publish --dry-run` has reported `latest` without an explicit tag in this repository.
- pnpm's `publish --dry-run` performs publish preparation without publishing, and an explicit `--tag alpha` keeps the alpha stream intentional.

Source checks used for this cadence update:

- npm: Adding dist-tags to packages, https://docs.npmjs.com/adding-dist-tags-to-packages/
- npm CLI: `npm publish`, https://docs.npmjs.com/cli/v11/commands/npm-publish/
- npm CLI: `npm dist-tag`, https://docs.npmjs.com/cli/v11/commands/npm-dist-tag/

## Alpha Patch Cadence

Publish another alpha patch when one of these is true:

- A generated-template or CLI behavior fix should be available to new projects before stable promotion.
- Public docs or package metadata changed in a way that users will see from npm.
- Dogfood or generated-project verification found a drift fix that should be distributed.

Do not publish for tracker-only note changes, internal planning updates, or docs-only changes that are already live on `bankstack.dev` and do not affect package contents.

## Required Local Verification

Run these from the repository root before publishing:

```sh
pnpm install --frozen-lockfile
pnpm format:check
pnpm check
pnpm --filter create-bankstack test
pnpm smoke:generated
pnpm --filter create-bankstack build
pnpm --filter create-bankstack pack --dry-run
pnpm --filter create-bankstack publish --dry-run --tag alpha --access public --registry https://registry.npmjs.org/
```

These commands assume a clean publish candidate commit. During exploratory local prep only, `--no-git-checks` may be added to the publish dry run to inspect package contents before the prep commit exists.

Confirm `.github/workflows/ci.yml` is green for the commit you intend to publish before running any real publish command. Record the GitHub Actions run URL or run ID in release notes before publishing.

## Package Contents

The alpha package dry run should include:

- `dist/index.js` and related `.d.ts` / source map build outputs.
- `templates/**`, including workspace templates, placeholder template files, `.env.example`, `.prettierignore`, and Supabase migration placeholders.
- `package.json`, `README.md`, and `LICENSE`.

On 2026-05-15, the explicit alpha-tagged publish dry run for `0.1.0-alpha.1` reported 71 files, 22.6 kB package size, and 71.6 kB unpacked size.

## Manual Alpha Publish

From the repository root, after all verification passes and the npm account is authenticated:

```sh
pnpm --filter create-bankstack publish --tag alpha --access public --registry https://registry.npmjs.org/
```

If your npm account requires two-factor authentication, follow the prompt or pass the current one-time password with `--otp <code>`.

After publishing:

```sh
npm view create-bankstack@<version> version --registry https://registry.npmjs.org/
npm view create-bankstack dist-tags --registry https://registry.npmjs.org/
```

Expected result: the published version exists and the `alpha` dist-tag points at it. If npm keeps `latest` pointed at the previous alpha, move `latest` intentionally to the same version so both alpha-era tags stay aligned:

```sh
npm dist-tag add create-bankstack@<version> latest --registry https://registry.npmjs.org/
npm view create-bankstack dist-tags --registry https://registry.npmjs.org/
```

## Stable Promotion Path

Do not promote to stable on a date alone. Prepare a stable release only when the
CLI, generated workspace, public docs, and dogfood checks have all stayed
aligned across real alpha usage.

Before the first stable release:

- Choose a stable semver such as `0.1.0` or the next appropriate non-prerelease.
- Remove alpha-only caveats from docs only where the stable behavior really exists.
- Run the full local verification sequence and confirm the CI candidate commit is green.
- Publish without `--tag alpha`, or publish with `--tag latest`, so npm's default install target points at the stable version.
- Keep the `alpha` dist-tag available for future prerelease builds instead of deleting alpha history.

Open release questions:

- Decide whether stable promotion should also create a GitHub Release with generated package contents and smoke-test evidence.
- Decide whether post-stable alpha builds use `alpha`, `next`, or another prerelease dist-tag.
