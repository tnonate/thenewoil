import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

import type { AstroIntegration } from "astro";
import { HTMLAnchorElement, HTMLElement, parseHTML } from "linkedom";

import { createAnchorTransformer } from "./module/transform-anchor";
import { packageDir } from "./utils/packager";

const PLUGIN_NAME = "astro-language-plugin";
const CONSOLE_TAG = "🌐 Language-plugin: ";
const NODE_MODULE_NAME = `local-${PLUGIN_NAME}`;

const LOCAL_PATH_PREFIXES = ["/"] as const;
const PROTOCOL_IDENTIFIER = "://";
const EXCLUDE_START_WITH_PATTERNS = ["mailto:", "./", "../"];

const PUBLIC_PREFIX = "*PUBLIC*";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

type Resolver<T> = () => Promise<T> | T;

const runResolver = async <T>(resolver: T | Resolver<T>) => {
  if (typeof resolver !== "function") return resolver;
  const resolved = (resolver as Resolver<T>)();
  return resolved instanceof Promise ? await resolved : resolved;
};

interface Options {
  supportedLanguageCodes: string[] | Resolver<string[]>;
  logChanges?: boolean;
  pathToNodeModules?: string;
}

interface Config {
  supportedLanguageCodes: string[];
  logChanges: boolean;
  pathToNodeModules: string;
}

const plugin = (options: Options): AstroIntegration => {
  let config: undefined | Config;

  return {
    name: PLUGIN_NAME,
    hooks: {
      "astro:config:setup": async ({ injectScript, command }) => {
        const supportedLanguageCodes = await runResolver(
          options.supportedLanguageCodes,
        );
        if (supportedLanguageCodes.length < 0)
          throw Error(
            "Language plugin requires at least 1 language code to be supported",
          );

        config = {
          supportedLanguageCodes,
          logChanges: options.logChanges ?? false,
          pathToNodeModules: options.pathToNodeModules ?? "./node_modules",
        };

        if (command === "dev") {
          const nodeModulePath = path.join(
            process.cwd(),
            config.pathToNodeModules,
            NODE_MODULE_NAME,
          );

          try {
            await fs.mkdir(nodeModulePath);
          } catch (err) {
            if (err.code !== "EEXIST") throw err;
          }

          const moduleFilesDir = path.join(DIRNAME, "module");

          await packageDir({
            name: NODE_MODULE_NAME,
            version: "0.0.9",
            type: "module",
            entryModule: "./client.js",
            entryTypes: "./client.d.ts",
            packageDir: moduleFilesDir,
            targetDir: nodeModulePath,
            exports: {
              ".": {
                import: "./client.js",
                types: "./client.d.ts",
              },
            },
          });

          injectScript(
            "page",
            `import { transformAllAnchors } from "${NODE_MODULE_NAME}";
                        transformAllAnchors(${JSON.stringify({
                          logChanges: config.logChanges,
                          supportedLanguageCodes: config.supportedLanguageCodes,
                          consoleTag: CONSOLE_TAG,
                          excludeStartWithPatterns: EXCLUDE_START_WITH_PATTERNS,
                          localPathPrefixes: LOCAL_PATH_PREFIXES,
                          protocolIdentifier: PROTOCOL_IDENTIFIER,
                          publicPrefix: PUBLIC_PREFIX,
                        })}).then().catch();`,
          );
        }
      },
      "astro:build:done": async ({ assets }) => {
        let transformedAnchorsTotal = 0;
        let transformedFilesTotal = 0;

        console.log(CONSOLE_TAG + "Transforming files...");

        const transformFilePromises = Array.from(assets.values())
          .flat()
          .map(async (url) => {
            if (!url.pathname.endsWith(".html")) {
              return;
            }

            const filePath = fileURLToPath(url);
            const fileContent = (await fs.readFile(filePath)).toString();

            const { document } = parseHTML(fileContent);
            const rootElement: HTMLElement = document.querySelector("html");
            if (!rootElement || !rootElement.lang) {
              return;
            }

            const language = rootElement.lang;

            const anchorTransformer = createAnchorTransformer({
              language: language,
              excludeStartWithPatterns: EXCLUDE_START_WITH_PATTERNS,
              localPathPrefixes: LOCAL_PATH_PREFIXES,
              protocolIdentifier: PROTOCOL_IDENTIFIER,
              publicPrefix: PUBLIC_PREFIX,
            });

            const anchorElements = Array.from(
              document.querySelectorAll("a"),
            ) as HTMLAnchorElement[];

            const transformAnchorTasks = anchorElements.map(anchorTransformer);
            const changedAnchorsHrefs = (
              await Promise.all(transformAnchorTasks)
            ).filter(Boolean);

            if (changedAnchorsHrefs.length > 0) {
              transformedAnchorsTotal += changedAnchorsHrefs.length;
              transformedFilesTotal += 1;

              if (config!.logChanges) {
                console.log(`Changed "${filePath}":`);
                changedAnchorsHrefs.forEach((href) =>
                  console.log(` - ${href}`),
                );
                console.log("");
              }
            }

            await fs.writeFile(filePath, document.toString());
          });

        await Promise.all(transformFilePromises);

        console.log(
          CONSOLE_TAG +
            `Done! A total of ${transformedAnchorsTotal} A-tags were changed, in a total of ${transformedFilesTotal} files`,
        );
        console.log("");
      },
    },
  };
};
export default plugin;
