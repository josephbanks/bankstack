import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export type TemplateVariables = Record<string, string>;

export type RenderTemplateOptions = {
  targetDirectory: string;
  templateName: string;
  variables: TemplateVariables;
};

export type RenderedTemplateFile = {
  outputPath: string;
  rendered: boolean;
  templatePath: string;
};

const TEXT_TEMPLATE_EXTENSIONS = new Set([
  ".css",
  ".env",
  ".gitignore",
  ".html",
  ".json",
  ".jsonc",
  ".md",
  ".mjs",
  ".sql",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml",
]);

const SKIPPED_TEMPLATE_NAMES = new Set([".DS_Store"]);

export function templatesRoot(): string {
  return join(dirname(fileURLToPath(import.meta.url)), "..", "templates");
}

function assertTemplateVariableName(name: string): void {
  if (!/^[A-Z][A-Z0-9_]*$/.test(name)) {
    throw new Error(`Invalid template variable name "${name}". Use uppercase snake case.`);
  }
}

function isContainedBy(root: string, candidate: string): boolean {
  const relativePath = relative(root, candidate);
  return relativePath === "" || (!relativePath.startsWith("..") && !isAbsolute(relativePath));
}

function assertContainedPath(root: string, candidate: string, label: string): void {
  if (!isContainedBy(root, candidate)) {
    throw new Error(`${label} escapes its root: ${relative(root, candidate)}`);
  }
}

function renderString(input: string, variables: TemplateVariables): string {
  return input.replaceAll(/\{\{([A-Z][A-Z0-9_]*)\}\}/g, (token, name: string) => {
    if (Object.hasOwn(variables, name)) {
      return variables[name];
    }

    throw new Error(`Missing template variable for ${token}.`);
  });
}

function isTextTemplate(fileName: string): boolean {
  if (fileName.endsWith(".template")) {
    return true;
  }

  const extension = fileName.slice(fileName.lastIndexOf("."));
  return TEXT_TEMPLATE_EXTENSIONS.has(extension);
}

function destinationName(templateName: string, variables: TemplateVariables): string {
  const renderedName = renderString(templateName, variables);
  return renderedName.endsWith(".template") ? renderedName.slice(0, -".template".length) : renderedName;
}

function relativeTemplatePath(root: string, path: string): string {
  return relative(root, path).split("\\").join("/");
}

async function renderEntry(
  templateRoot: string,
  targetRoot: string,
  sourcePath: string,
  targetPath: string,
  variables: TemplateVariables,
  renderedFiles: RenderedTemplateFile[],
): Promise<void> {
  const entries = await readdir(sourcePath, { withFileTypes: true });

  await mkdir(targetPath, { recursive: true });

  for (const entry of entries) {
    if (SKIPPED_TEMPLATE_NAMES.has(entry.name)) {
      continue;
    }

    if (entry.isSymbolicLink()) {
      throw new Error(`Template symlinks are not allowed: ${relativeTemplatePath(templateRoot, join(sourcePath, entry.name))}`);
    }

    const nextSource = join(sourcePath, entry.name);
    const nextTarget = resolve(targetPath, destinationName(entry.name, variables));
    assertContainedPath(targetRoot, nextTarget, "Rendered template path");

    if (entry.isDirectory()) {
      await renderEntry(templateRoot, targetRoot, nextSource, nextTarget, variables, renderedFiles);
      continue;
    }

    if (!entry.isFile()) {
      throw new Error(`Unsupported template entry: ${relativeTemplatePath(templateRoot, nextSource)}`);
    }

    await mkdir(dirname(nextTarget), { recursive: true });

    if (isTextTemplate(entry.name)) {
      const content = await readFile(nextSource, "utf8");
      await writeFile(nextTarget, renderString(content, variables), "utf8");
      renderedFiles.push({
        outputPath: nextTarget,
        rendered: true,
        templatePath: relativeTemplatePath(templateRoot, nextSource),
      });
      continue;
    }

    await copyFile(nextSource, nextTarget);
    renderedFiles.push({
      outputPath: nextTarget,
      rendered: false,
      templatePath: relativeTemplatePath(templateRoot, nextSource),
    });
  }
}

export async function renderTemplate(options: RenderTemplateOptions): Promise<RenderedTemplateFile[]> {
  for (const name of Object.keys(options.variables)) {
    assertTemplateVariableName(name);
  }

  const root = templatesRoot();
  const templateRoot = resolve(root, options.templateName);
  const targetRoot = resolve(options.targetDirectory);
  const renderedFiles: RenderedTemplateFile[] = [];

  assertContainedPath(root, templateRoot, "Template path");
  await renderEntry(templateRoot, targetRoot, templateRoot, targetRoot, options.variables, renderedFiles);

  return renderedFiles;
}
