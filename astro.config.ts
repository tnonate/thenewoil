// https://astro.build/config
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import compress from "astro-compress";
import robotsTxt from "astro-robots-txt";
import languagePlugin from "./plugins/astro-language";

import config from "./config.json";

// https://astro.build/config
export default defineConfig({
  site: "https://thenewoil.org",
  outDir: "./www",
  redirects: {
    "/": "/en/",
    "/btc/": "/en/crypto#bitcoin-btc",
    "/xmr/": "/en/crypto#monero-xmr",

    // Self-owned
    "/stats/": "https://stats.thenewoil.org/share/jnR7d6tGklwToSOJ/thenewoil.org",
    "/uptime/": "https://uptime.thenewoil.org/status/thenewoil",
    "/black-friday/": "https://blog.thenewoil.org/black-friday-2024-privacy-deals",

    // External redirects
    "/filen/": "https://filen.io/r/834a3bd235bca0caa53141f2ebc30438",
    "/liberapay/": "https://liberapay.com/thenewoil",
    "/mega/": "https://mega.nz/aff=UBJLjO7sxZU",
    "/nitrokey/": "https://shop.nitrokey.com/shop?aff_ref=14",
    "/opencollective/": "https://opencollective.com/thenewoil/donate",
    "/patreon/": "https://www.patreon.com/TheNewOil413",
    "/paypal/": "https://www.paypal.com/donate/?hosted_button_id=2LLRWFZQS4E94",
    "/privacy/": "https://privacy.com/join/UZ9WY",
    "/proton/": "https://go.getproton.me/aff_c?offer_id=7&aff_id=2187",
    "/redact/": "https://redact.dev?affiliateCode=THENEWOIL",
    "/simplelogin/": "https://simplelogin.io/?slref=thenewoil",
    "/tuta/": "https://tuta.com/?t-src=the-new-oil",
    "/skiff/": "https://app.skiff.com/signup?mail=&referral=thenewoil",
    "/voipms/": "https://voip.ms/en/code/TheNewOil",
  },
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
