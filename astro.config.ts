import fs from "fs/promises";
import path from "path";

import { defineConfig } from "astro/config";

import type Config from "./typings/config";

const config: Config = JSON.parse(
  (
    await fs.readFile(path.resolve(import.meta.dirname, "config.json"))
  ).toString(),
);

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import compress from "astro-compress";
import robotsTxt from "astro-robots-txt";
import languagePlugin from "./plugins/astro-language";

// https://astro.build/config
export default defineConfig({
  site: "https://thenewoil.org",
  outDir: "./www",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
    icon(),
    robotsTxt({
      sitemap: false,
      policy: [
        { disallow: "/", userAgent: "GPTBot" },
        { disallow: "/", userAgent: "ia_archiver" },
        { disallow: "/", userAgent: "User-Agent: Google-Extended" },
      ],
    }),
    compress({
      Logger: 1,
      JavaScript: false,
      CSS: {
        csso: {
          comments: false,
        },
      },
      HTML: {
        "html-minifier-terser": {
          removeComments: true,
        },
      },
    }),
    languagePlugin({
      supportedLanguageCodes: config.languages.map((lang) => lang.code),
    }),
  ],
});
