# Template Rendering

The CLI renders projects from versioned templates in this directory. It does not shell out to framework generators at create time.

## Variable Convention

Template variables use uppercase snake case wrapped in double braces:

```text
{{PROJECT_NAME}}
```

Variable names must match `^[A-Z][A-Z0-9_]*$`. File and directory names may also contain variables. Text files ending in `.template` have that suffix removed after rendering.

## Copy Rules

- Known text template extensions are decoded as UTF-8 and interpolated.
- Other regular files are copied byte-for-byte with `copyFile`, which keeps future image, font, and archive assets binary-safe.
- Template symlinks are rejected.
- `.DS_Store` is ignored.

## Exact Dependency Versions

Generated dependency versions must come from `versions.json` in this directory. Template files should use variables or metadata derived from that file rather than loose ranges such as `^` or `~`.

## Template Sets

- `workspace` is the generated project: pnpm workspace metadata, Nx defaults, TypeScript defaults, root scripts, local-only ignore rules, and the core app templates.
- `placeholder` is kept as a tiny renderer fixture for binary copy and filename interpolation checks.
