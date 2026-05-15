# create-bankstack Alpha Release Checklist

This checklist records the manual `create-bankstack@0.1.0-alpha.0` npm release. It does not automate publishing and does not require npm tokens in CI.

## Current Alpha Target

- Package: `create-bankstack`
- Version: `0.1.0-alpha.0`
- Intended dist tag: `alpha`
- Registry: `https://registry.npmjs.org/`
- Access: public
- GitHub Actions candidate run: https://github.com/josephbanks/bankstack/actions/runs/25922733713

## Published State

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
- `publishConfig` records intended publish-time defaults such as `tag`, `registry`, and `access`, but the manual commands below pass `--tag alpha` and `--access public` explicitly because `pnpm publish --dry-run` reported `latest` without an explicit tag in this repository.
- pnpm's `publish --dry-run` performs publish preparation without publishing, and an explicit `--tag alpha` prevents the alpha from becoming the default `latest` install target.

## Name Availability

On 2026-05-15, `npm view create-bankstack version --registry https://registry.npmjs.org/` returned `E404 Not Found`, meaning no public package version was found for `create-bankstack` at the npm registry at the time of this prep.

Re-run the check immediately before publishing:

```sh
npm view create-bankstack version --registry https://registry.npmjs.org/
```

If the name becomes unavailable, stop and choose the smallest package identity change before publishing.

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

On 2026-05-15, the explicit alpha-tagged publish dry run reported 71 files, 22.6 kB package size, and 71.6 kB unpacked size.

## Manual Publish

From the repository root, after all verification passes and the npm account is authenticated:

```sh
pnpm --filter create-bankstack publish --tag alpha --access public --registry https://registry.npmjs.org/
```

If your npm account requires two-factor authentication, follow the prompt or pass the current one-time password with `--otp <code>`.

After publishing:

```sh
npm view create-bankstack@0.1.0-alpha.0 version --registry https://registry.npmjs.org/
npm view create-bankstack dist-tags --registry https://registry.npmjs.org/
```

Expected result: `0.1.0-alpha.0` exists and the `alpha` dist-tag points at it. npm may keep `latest` pointed at the first and only version; if removing `latest` returns `E400 Bad Request`, leave it as-is and move `latest` intentionally on the first stable release.
