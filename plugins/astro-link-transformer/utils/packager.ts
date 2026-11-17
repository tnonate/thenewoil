import path from "path";
import fs from "fs/promises";

export const copyDir = async (packageDir: string, targetDir: string) => {
  const filesToCopy = await fs.readdir(packageDir);

  return await Promise.all(
    filesToCopy.map(async (filename) => {
      await fs.copyFile(
        path.join(packageDir, filename),
        path.join(targetDir, filename),
      );
      return filename;
    }),
  );
};

export interface Export {
  types?: string;
  import?: string;
  default?: string;
  require?: string;
  node?: string;
}

export interface PackageJsonOptions {
  name: string;
  version: string;
  entryModule?: string;
  entryMain?: string;
  entryTypes?: string;
  type?: "module" | "commonjs";
  exports?: Record<string, Export | string>;
}

export interface PackageDirOptions extends PackageJsonOptions {
  packageDir: string;
  targetDir: string;
}

export const packageDir = async (options: PackageDirOptions) => {
  const { packageDir, targetDir, ...packageOptions } = options;

  await fs.mkdir(targetDir, { recursive: true });
  await copyDir(packageDir, targetDir);

  await fs.writeFile(
    path.join(targetDir, "package.json"),
    JSON.stringify({
      name: packageOptions.name,
      version: packageOptions.version,
      type: packageOptions.type || "commonjs",
      module: packageOptions.entryModule,
      main: packageOptions.entryMain,
      types: packageOptions.entryTypes,
      exports: packageOptions.exports,
    }),
  );
};
