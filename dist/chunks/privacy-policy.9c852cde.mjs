import { c as createAstro, a as createComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute, e as renderComponent, g as renderHead, r as renderSlot } from './astro.e9786f67.mjs';
import { g as getLanguageFromUrl, $ as $$DefaultHead, a as $$Header, b as $$Footer } from './Footer.828c810f.mjs';
import { af as $$Icon } from './pages/all.14f8edd5.mjs';
import 'html-escaper';
/* empty css                            */import 'string-strip-html';
import 'linkedom';
import '@astrojs/markdown-remark';
import 'svgo';

const $$Astro$1 = createAstro("https://thenewoil.org");
const $$TableOfContents = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TableOfContents;
  const { headings } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<nav class="hidden w-full flex-col overflow-auto bg-tertiary px-6 py-4 dark:bg-tertiary-dark lg:flex lg:w-1/4">
  <p class="my-4 text-center text-lg font-bold" aria-hidden>Navigation</p>
  <ul aria-label="Headings" class="flex flex-col gap-4 p-0">
    ${headings.filter((heading) => heading.depth != 1).map((heading) => renderTemplate`<li${addAttribute(`p-0 ${heading.depth === 2 && "list-none font-medium"}`, "class")}${addAttribute({ marginLeft: heading.depth !== 2 && `${(heading.depth - 2) * 2}rem` }, "style")}>
            <a class="border-gradient-primary border-bg-tertiary hover:border-b-4 dark:border-bg-tertiary-dark"${addAttribute(`#${heading.slug}`, "href")}>
              ${heading.text}
            </a>
          </li>`)}
  </ul>
</nav>

<details class="group/sidebar-mobile flex w-full flex-col overflow-auto bg-tertiary p-4 dark:bg-tertiary-dark lg:hidden">
  <summary class="flex items-center justify-center rounded-lg border-2 border-black border-opacity-10 p-4 text-center text-lg font-bold transition-all group-open/sidebar-mobile:border-opacity-20 dark:border-white/[var(--tw-border-opacity)]" aria-hidden>
    Navigation
    ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:chevron-up", "class": "w-6 h-6 group-open/sidebar-mobile:rotate-180 transition-all", "role": "img", "aria-label": "Dropbown button icon" })}
  </summary>
  <ul aria-label="Headings" class="flex flex-col gap-4 p-4">
    ${headings.filter((heading) => heading.depth != 1).map((heading) => renderTemplate`<li${addAttribute(`p-0 ${heading.depth === 2 && "list-none font-medium"}`, "class")}${addAttribute({ marginLeft: heading.depth !== 2 && `${(heading.depth - 2) * 2}rem` }, "style")}>
            <a class="border-gradient-primary border-bg-tertiary hover:border-b-4 dark:border-bg-tertiary-dark"${addAttribute(`#${heading.slug}`, "href")}>
              ${heading.text}
            </a>
          </li>`)}
  </ul>
</details>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/layout/TableOfContents.astro");

const $$Astro = createAstro("https://thenewoil.org");
const $$PrivacyPolicy = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PrivacyPolicy;
  const { frontmatter, headings } = Astro2.props;
  const language = getLanguageFromUrl(Astro2.url);
  return renderTemplate`<html${addAttribute(language.code, "lang")}>
  <head>
    ${renderComponent($$result, "DefaultHead", $$DefaultHead, { "pageTitle": frontmatter.title })}
  ${renderHead($$result)}</head>

  <body>
    ${renderComponent($$result, "Header", $$Header, { "title": frontmatter.title })}
    <div class="flex flex-col overflow-hidden lg:flex-row">
      ${renderComponent($$result, "TableOfContents", $$TableOfContents, { "headings": headings })}
      <div class="flex w-full flex-col items-center justify-between overflow-auto">
        <main class="flex w-full max-w-screen-2xl flex-col gap-8">
          ${renderSlot($$result, $$slots["default"])}
        </main>
        ${renderComponent($$result, "Footer", $$Footer, { "transparent": true })}
      </div>
    </div>
  </body></html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/layouts/privacy-policy.astro");

export { $$PrivacyPolicy as default };
