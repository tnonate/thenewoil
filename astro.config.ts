import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";

import { defineConfig } from "astro/config";

import type Config from "./typings/config";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

const config = JSON.parse(
  (await fs.readFile(path.resolve(DIRNAME, "config.json"))).toString()
) as Config;

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import mdx from "@astrojs/mdx";

import compress from "astro-compress";

import robotsTxt from "astro-robots-txt";

import aliasPlugin from "./plugins/astro-alias";
import languagePlugin from "./plugins/astro-language";

// https://astro.build/config
export default defineConfig({
  site: "https://thenewoil.org",
  outDir: "./www",
  integrations: [
    tailwind({ config: { applyBaseStyles: false } }),
    mdx(),
    sitemap(),
    robotsTxt({ sitemap: false, policy: [{disallow: "/", userAgent: "GPTBot"}, {disallow: "/", userAgent: "ia_archiver"}, {disallow: "/", userAgent: "User-Agent: Google-Extended"}] }),
    compress({
      css: { comments: false },
      html: { removeComments: true },
      js: false,
      logger: 1,
    }),
    languagePlugin({
      supportedLanguageCodes: config.languages.map((lang) => lang.code),
    }),
    aliasPlugin({
      aliasFile: path.resolve(DIRNAME, "aliases.json"),
      pagesDir: path.resolve(DIRNAME, "src", "pages"),
    }),
  ],
});
