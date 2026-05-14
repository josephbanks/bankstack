#!/usr/bin/env node

import { relative } from "node:path";

import {
  parseCliArgs,
  resolveOptions,
  type ResolvedCliOptions,
} from "./options.js";
import { readPackageVersion } from "./package-info.js";
import {
  renderTemplate,
  type RenderedTemplateFile,
} from "./render-template.js";
import { variablesForOptions } from "./template-variables.js";

function printHelp(): void {
  console.log(`create-bankstack ${readPackageVersion()}`);
  console.log("");
  console.log("Usage:");
  console.log("  create-bankstack [directory] [options]");
  console.log("");
  console.log("Options:");
  console.log(
    "  --name <name>   Project/package name to use in generated metadata.",
  );
  console.log("  --yes           Use safe defaults for omitted choices.");
  console.log(
    "  --no-install    Skip dependency installation in the generated project.",
  );
  console.log(
    "  --no-git        Skip git initialization in the generated project.",
  );
  console.log("  --force         Allow using a non-empty target directory.");
  console.log("  -v, --version   Print the CLI version.");
  console.log("  -h, --help      Print this help message.");
}

function formatDirectoryForOutput(targetDirectory: string): string {
  const relativePath = relative(process.cwd(), targetDirectory);
  if (relativePath === "") {
    return ".";
  }

  return relativePath.startsWith("..") ? targetDirectory : relativePath;
}

function printResolvedOptions(options: ResolvedCliOptions): void {
  const directory = formatDirectoryForOutput(options.targetDirectory);

  console.log("create-bankstack");
  console.log(`version ${readPackageVersion()}`);
  console.log("");
  console.log("Resolved options:");
  console.log(`  Project name: ${options.projectName}`);
  console.log(`  Target directory: ${directory}`);
  console.log(
    `  Install dependencies: ${options.installDependencies ? "yes" : "no"}`,
  );
  console.log(`  Initialize git: ${options.initializeGit ? "yes" : "no"}`);
  console.log(`  Force non-empty directory: ${options.force ? "yes" : "no"}`);
}

function printRenderSummary(
  options: ResolvedCliOptions,
  renderedFiles: RenderedTemplateFile[],
): void {
  const directory = formatDirectoryForOutput(options.targetDirectory);

  console.log("");
  console.log(
    `Rendered placeholder template with ${renderedFiles.length} files.`,
  );
  console.log(
    "TASK-005 will replace this placeholder with the generated workspace foundation.",
  );
  console.log("");
  console.log("Next steps:");
  console.log(`  cd ${directory}`);
  console.log(
    options.installDependencies
      ? "  pnpm install will run automatically after generation."
      : "  Dependency installation was skipped; run pnpm install when ready.",
  );
  console.log(
    options.initializeGit
      ? "  git init will run automatically after generation."
      : "  Git initialization was skipped; run git init if desired.",
  );
}

async function main(args: string[]): Promise<void> {
  const parsed = parseCliArgs(args);

  if (parsed.version) {
    console.log(readPackageVersion());
    return;
  }

  if (parsed.help) {
    printHelp();
    return;
  }

  const options = await resolveOptions(parsed);
  const renderedFiles = await renderTemplate({
    targetDirectory: options.targetDirectory,
    templateName: "placeholder",
    variables: variablesForOptions(options),
  });

  printResolvedOptions(options);
  printRenderSummary(options, renderedFiles);
}

main(process.argv.slice(2)).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`create-bankstack: ${message}`);
  process.exitCode = 1;
});
