import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";

export const copyDir = async (packageDir: string, targetDir: string) => {
  const filesToCopy = await fs.readdir(packageDir);

  return await Promise.all(
    filesToCopy.map((filename) => {
      fs.copyFile(
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
  const packageJsonPath = path.join(targetDir, "package.json");
  const packageJsonExists = existsSync(packageJsonPath);

  if (packageJsonExists) {
    const packageJsonContent = (
      await fs.readFile(packageJsonPath, { flag: "r+" })
    ).toString();

    try {
      const packageData = JSON.parse(packageJsonContent);
      if (packageData.version === options.version) {
        return;
      }
    } catch (error) {
      // Something in the package json is wrong, so upload a new one
    }
  }

  await fs.writeFile(
    packageJsonPath,
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

  await copyDir(packageDir, targetDir);
};
