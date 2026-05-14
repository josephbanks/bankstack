#!/usr/bin/env node

import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const tempRoot = await mkdtemp(join(tmpdir(), "create-bankstack-render-"));

function assertIncludes(value, expected, label) {
  if (!value.includes(expected)) {
    throw new Error(
      `${label} did not include "${expected}"\nreceived:\n${value}`,
    );
  }
}

try {
  const { renderTemplate } = await import(
    join(root, "dist", "render-template.js")
  );
  const targetDirectory = join(tempRoot, "rendered-app");
  const renderedFiles = await renderTemplate({
    targetDirectory,
    templateName: "placeholder",
    variables: {
      PROJECT_NAME: "rendered-app",
    },
  });

  if (renderedFiles.length !== 4) {
    throw new Error(
      `Expected 4 rendered files, received ${renderedFiles.length}.`,
    );
  }

  const readme = await readFile(join(targetDirectory, "README.md"), "utf8");
  assertIncludes(readme, "# rendered-app", "rendered README");
  assertIncludes(
    readme,
    "TASK-005 replaces this placeholder",
    "rendered README",
  );

  const manifest = await readFile(
    join(targetDirectory, ".bankstack-template.json"),
    "utf8",
  );
  assertIncludes(manifest, '"name": "placeholder"', "copied manifest");

  const marker = await readFile(
    join(targetDirectory, "assets", "marker.bin"),
    "utf8",
  );
  assertIncludes(
    marker,
    "BANKSTACK_PLACEHOLDER_BINARY_MARKER",
    "copied marker",
  );

  const projectMarker = await readFile(
    join(targetDirectory, "rendered-app.txt"),
    "utf8",
  );
  assertIncludes(
    projectMarker,
    "Rendered marker for rendered-app.",
    "rendered filename interpolation marker",
  );

  const sourceMarker = await readFile(
    join(root, "templates", "placeholder", "assets", "marker.bin"),
  );
  const copiedMarker = await readFile(
    join(targetDirectory, "assets", "marker.bin"),
  );

  if (!sourceMarker.equals(copiedMarker)) {
    throw new Error("Binary marker file was not copied byte-for-byte.");
  }

  await assertRejects(
    () =>
      renderTemplate({
        targetDirectory: join(tempRoot, "escape-template"),
        templateName: "../placeholder",
        variables: {
          PROJECT_NAME: "escape-template",
        },
      }),
    "Template path escapes its root",
    "template root escape",
  );

  await assertRejects(
    () =>
      renderTemplate({
        targetDirectory: join(tempRoot, "escape-output"),
        templateName: "placeholder",
        variables: {
          PROJECT_NAME: "../escape-output",
        },
      }),
    "Rendered template path escapes its root",
    "rendered output escape",
  );
} finally {
  await rm(tempRoot, { force: true, recursive: true });
}

async function assertRejects(action, expectedMessage, label) {
  try {
    await action();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    assertIncludes(message, expectedMessage, label);
    return;
  }

  throw new Error(`${label} did not reject.`);
}
