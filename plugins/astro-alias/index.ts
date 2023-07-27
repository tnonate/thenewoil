import type { AstroIntegration } from "astro";
import * as fs from "fs/promises";
import { existsSync as fileExists } from "fs";
import * as path from "path";

const PLUGIN_NAME = "astro-alias-plugin";
const CONSOLE_TAG = "Astro Alias -";

interface Alias {
  source: string;
  target: string;
}

interface Options {
  aliasFile: string;
  pagesDir: string;
}

const plugin = (options: Options): AstroIntegration => {
  return {
    name: PLUGIN_NAME,
    hooks: {
      "astro:config:setup": async () => {
        const aliasFileContent = (
          await fs.readFile(options.aliasFile)
        ).toString();

        let aliases = null;

        try {
          aliases = JSON.parse(aliasFileContent);
        } catch (error) {
          throw Error(
            `${CONSOLE_TAG} Invalid JSOn in file "${options.aliasFile}"`
          );
        }

        if (!Array.isArray(aliases))
          throw Error(
            `${CONSOLE_TAG} Root element of "${options.aliasFile}" has to be a JSON array`
          );

        Promise.all(
          aliases.map(async (possibleAlias, i) => {
            if (!possibleAlias.target || !possibleAlias.source)
              return console.warn(
                `${CONSOLE_TAG} Alias index: ${i} does not have a "target" or a "source"`
              );
            const alias: Alias = possibleAlias;

            const sourceFilepath = path.join(options.pagesDir, alias.source);
            const targetFilepath = path.join(options.pagesDir, alias.target);

            if (!fileExists(sourceFilepath))
              return console.warn(
                `${CONSOLE_TAG} File: "${sourceFilepath}" does not exist. To create an alias point to a file that exists`
              );
            if (fileExists(targetFilepath))
              return console.warn(
                `${CONSOLE_TAG} File: ${targetFilepath} already exists. Cannot overwrite existing file, so I will skip it`
              );

            await fs.link(sourceFilepath, targetFilepath);
          })
        );
      },
    },
  };
};
export default plugin;
