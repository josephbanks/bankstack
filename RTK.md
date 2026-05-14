# RTK - Rust Token Killer (Codex CLI)

**Usage**: Token-optimized CLI proxy for shell commands.

## Rule

Always prefix shell commands with `rtk`.

Examples:

```bash
rtk git status
rtk cargo test
rtk npm run build
rtk pytest -q
```

## Raw Output Escape Hatch

Use `rtk proxy <cmd>` when token filtering would hide information needed for the task.

Good cases:

- Debugging failing tests, builds, CLIs, or dev servers where stack traces, stderr, timing, or repeated lines matter.
- Inspecting exact command output, formatting, color/control-code behavior, snapshot diffs, or generated text.
- Running a command shape that `rtk` does not support directly, such as complex `find` predicates.
- Verifying whether `rtk` itself is filtering, summarizing, or reordering something important.

Keep normal commands on plain `rtk`; switch to `rtk proxy` only when the raw trace is useful enough to justify the extra output.

Examples:

```bash
rtk proxy npm test -- --runInBand
rtk proxy pnpm exec vitest run --reporter=verbose
rtk proxy find .codex/agents -maxdepth 1 -type f -print
```

## Meta Commands

```bash
rtk gain            # Token savings analytics
rtk gain --history  # Recent command savings history
rtk proxy <cmd>     # Run raw command without filtering
```

## Verification

```bash
rtk --version
rtk gain
which rtk
```
