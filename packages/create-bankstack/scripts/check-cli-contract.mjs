#!/usr/bin/env node

import { mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = fileURLToPath(new URL("..", import.meta.url));
const cliPath = join(root, "dist", "index.js");
const tempRoot = join(tmpdir(), `create-bankstack-contract-${process.pid}`);

function run(args, options = {}) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: options.cwd ?? root,
    encoding: "utf8",
  });
}

function assertExit(result, expectedStatus, label) {
  if (result.status !== expectedStatus) {
    throw new Error(`${label} exited ${result.status}; expected ${expectedStatus}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
  }
}

function assertIncludes(value, expected, label) {
  if (!value.includes(expected)) {
    throw new Error(`${label} did not include "${expected}"\nreceived:\n${value}`);
  }
}

await rm(tempRoot, { force: true, recursive: true });
await mkdir(tempRoot, { recursive: true });

try {
  let result = run(["--version"]);
  assertExit(result, 0, "--version");
  assertIncludes(result.stdout, "0.1.0-alpha.0", "--version stdout");

  result = run(["--yes", "--no-install", "--no-git"], { cwd: tempRoot });
  assertExit(result, 0, "--yes flow");
  assertIncludes(result.stdout, "Project name: my-bankstack-app", "--yes stdout");
  assertIncludes(result.stdout, "Install dependencies: no", "--yes stdout");
  assertIncludes(result.stdout, "Rendered placeholder template with 4 files.", "--yes stdout");
  await assertRenderedPlaceholder(join(tempRoot, "my-bankstack-app"), "my-bankstack-app");

  result = run(["sample-app", "--name", "sample-app", "--no-install", "--no-git"], { cwd: tempRoot });
  assertExit(result, 0, "explicit flags");
  assertIncludes(result.stdout, "Target directory: sample-app", "explicit flags stdout");
  assertIncludes(result.stdout, "TASK-005 will replace this placeholder", "explicit flags stdout");
  await assertRenderedPlaceholder(join(tempRoot, "sample-app"), "sample-app");

  result = run(["--help"]);
  assertExit(result, 0, "--help");
  assertIncludes(result.stdout, "Usage:", "--help stdout");

  result = run(["BadName", "--name", "BadName"], { cwd: tempRoot });
  assertExit(result, 1, "invalid name");
  assertIncludes(result.stderr, "Target directory must use lowercase letters", "invalid name stderr");

  result = run(["..", "--name", "parent-app"], { cwd: tempRoot });
  assertExit(result, 1, "parent directory");
  assertIncludes(result.stderr, "without path separators", "parent directory stderr");

  result = run(["nested/app", "--name", "nested-app"], { cwd: tempRoot });
  assertExit(result, 1, "nested directory");
  assertIncludes(result.stderr, "without path separators", "nested directory stderr");

  result = run([join(tempRoot, "absolute-app"), "--name", "absolute-app"], { cwd: tempRoot });
  assertExit(result, 1, "absolute directory");
  assertIncludes(result.stderr, "not an absolute path", "absolute directory stderr");

  await mkdir(join(tempRoot, "nonempty-app"));
  await writeFile(join(tempRoot, "nonempty-app", "existing.txt"), "existing\n", "utf8");

  result = run(["nonempty-app", "--name", "nonempty-app"], { cwd: tempRoot });
  assertExit(result, 1, "non-empty directory");
  assertIncludes(result.stderr, "Target directory is not empty", "non-empty directory stderr");

  result = run(["nonempty-app", "--name", "nonempty-app", "--force", "--no-install", "--no-git"], { cwd: tempRoot });
  assertExit(result, 0, "forced non-empty directory");
  assertIncludes(result.stdout, "Force non-empty directory: yes", "forced non-empty directory stdout");

  await symlink(join(tempRoot, "nonempty-app"), join(tempRoot, "linked-app"));

  result = run(["linked-app", "--name", "linked-app", "--force"], { cwd: tempRoot });
  assertExit(result, 1, "symlink directory");
  assertIncludes(result.stderr, "cannot be a symbolic link", "symlink directory stderr");
} finally {
  await rm(tempRoot, { force: true, recursive: true });
}

async function assertRenderedPlaceholder(targetDirectory, projectName) {
  const readme = await readFile(join(targetDirectory, "README.md"), "utf8");
  assertIncludes(readme, `# ${projectName}`, "CLI rendered README");

  const manifest = await readFile(join(targetDirectory, ".bankstack-template.json"), "utf8");
  assertIncludes(manifest, "\"name\": \"placeholder\"", "CLI rendered manifest");

  const marker = await readFile(join(targetDirectory, "assets", "marker.bin"), "utf8");
  assertIncludes(marker, "BANKSTACK_PLACEHOLDER_BINARY_MARKER", "CLI rendered marker");

  const projectMarker = await readFile(join(targetDirectory, `${projectName}.txt`), "utf8");
  assertIncludes(projectMarker, `Rendered marker for ${projectName}.`, "CLI rendered filename interpolation marker");
}
