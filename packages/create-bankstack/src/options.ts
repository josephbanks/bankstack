import { existsSync, lstatSync, readdirSync } from "node:fs";
import { basename, isAbsolute, resolve } from "node:path";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import { parseArgs } from "node:util";

export type ParsedCliOptions = {
  directory?: string;
  force: boolean;
  help: boolean;
  initializeGit?: boolean;
  installDependencies?: boolean;
  name?: string;
  version: boolean;
  yes: boolean;
};

export type ResolvedCliOptions = {
  force: boolean;
  initializeGit: boolean;
  installDependencies: boolean;
  interactive: boolean;
  projectName: string;
  targetDirectory: string;
  yes: boolean;
};

export function parseCliArgs(args: string[]): ParsedCliOptions {
  const { values, positionals } = parseArgs({
    args,
    allowNegative: true,
    allowPositionals: true,
    options: {
      force: { type: "boolean", default: false },
      git: { type: "boolean" },
      help: { type: "boolean", short: "h", default: false },
      install: { type: "boolean" },
      name: { type: "string" },
      version: { type: "boolean", short: "v", default: false },
      yes: { type: "boolean", default: false },
    },
    strict: true,
  });

  if (positionals.length > 1) {
    throw new Error(`Expected at most one target directory, received ${positionals.length}.`);
  }

  return {
    directory: positionals[0],
    force: values.force ?? false,
    help: values.help ?? false,
    initializeGit: values.git,
    installDependencies: values.install,
    name: values.name,
    version: values.version ?? false,
    yes: values.yes ?? false,
  };
}

function isInteractive(yes: boolean): boolean {
  return !yes && Boolean(input.isTTY) && Boolean(output.isTTY);
}

function defaultDirectoryName(name?: string): string {
  return name ?? "my-bankstack-app";
}

function validateProjectName(name: string): string | undefined {
  if (!name) {
    return "Project name is required.";
  }

  if (name.length > 214) {
    return "Project name must be 214 characters or fewer.";
  }

  if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/.test(name)) {
    return "Project name must use lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen.";
  }

  if (name.includes("--")) {
    return "Project name cannot contain consecutive hyphens.";
  }

  return undefined;
}

function validateDirectoryInput(directory: string): string | undefined {
  if (!directory) {
    return "Target directory is required.";
  }

  if (isAbsolute(directory)) {
    return "Target directory must be a relative child directory name, not an absolute path.";
  }

  if (directory === "." || directory === ".." || directory.includes("/") || directory.includes("\\")) {
    return "Target directory must be a child directory name without path separators.";
  }

  if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/.test(directory)) {
    return "Target directory must use lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen.";
  }

  if (directory.includes("--")) {
    return "Target directory cannot contain consecutive hyphens.";
  }

  return undefined;
}

function validateTargetDirectory(targetDirectory: string, force: boolean): string | undefined {
  if (!existsSync(targetDirectory)) {
    return undefined;
  }

  const targetStats = lstatSync(targetDirectory);

  if (targetStats.isSymbolicLink()) {
    return `Target directory cannot be a symbolic link: ${targetDirectory}.`;
  }

  if (!targetStats.isDirectory()) {
    return `Target path exists but is not a directory: ${targetDirectory}.`;
  }

  if (readdirSync(targetDirectory).length > 0 && !force) {
    return `Target directory is not empty: ${targetDirectory}. Use --force to continue intentionally.`;
  }

  return undefined;
}

function normalizePromptValue(value: string, fallback: string): string {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

async function promptText(
  rl: readline.Interface,
  message: string,
  fallback: string,
  validate?: (value: string) => string | undefined,
): Promise<string> {
  while (true) {
    const answer = normalizePromptValue(await rl.question(`${message} (${fallback}): `), fallback);
    const validationError = validate?.(answer);

    if (!validationError) {
      return answer;
    }

    console.error(validationError);
  }
}

async function promptBoolean(rl: readline.Interface, message: string, fallback: boolean): Promise<boolean> {
  const hint = fallback ? "Y/n" : "y/N";

  while (true) {
    const answer = (await rl.question(`${message} (${hint}): `)).trim().toLowerCase();

    if (answer === "") {
      return fallback;
    }

    if (["y", "yes"].includes(answer)) {
      return true;
    }

    if (["n", "no"].includes(answer)) {
      return false;
    }

    console.error("Please answer yes or no.");
  }
}

export async function resolveOptions(parsed: ParsedCliOptions): Promise<ResolvedCliOptions> {
  const interactive = isInteractive(parsed.yes);
  const rl = readline.createInterface({ input, output });

  try {
    const fallbackDirectory = defaultDirectoryName(parsed.name);
    const directory =
      parsed.directory ??
      (interactive ? await promptText(rl, "Target directory", fallbackDirectory, validateDirectoryInput) : fallbackDirectory);
    const directoryValidationError = validateDirectoryInput(directory);

    if (directoryValidationError) {
      throw new Error(directoryValidationError);
    }

    const targetDirectory = resolve(process.cwd(), directory);
    const fallbackName = parsed.name ?? basename(targetDirectory);
    const projectName =
      parsed.name ??
      (interactive ? await promptText(rl, "Project name", fallbackName, validateProjectName) : fallbackName);
    const validationError = validateProjectName(projectName);

    if (validationError) {
      throw new Error(validationError);
    }

    const targetDirectoryError = validateTargetDirectory(targetDirectory, parsed.force);

    if (targetDirectoryError) {
      throw new Error(targetDirectoryError);
    }

    const installDependencies =
      parsed.installDependencies ??
      (interactive ? await promptBoolean(rl, "Install dependencies after generation", true) : true);
    const initializeGit =
      parsed.initializeGit ?? (interactive ? await promptBoolean(rl, "Initialize a git repository", true) : true);

    return {
      force: parsed.force,
      initializeGit,
      installDependencies,
      interactive,
      projectName,
      targetDirectory,
      yes: parsed.yes,
    };
  } finally {
    rl.close();
  }
}
