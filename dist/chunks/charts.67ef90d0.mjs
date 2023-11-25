import { c as createAstro, a as createComponent, b as renderTemplate, d as addAttribute, e as renderComponent, g as renderHead, r as renderSlot } from './astro.e9786f67.mjs';
import { g as getLanguageFromUrl, $ as $$DefaultHead, a as $$Header, b as $$Footer } from './Footer.828c810f.mjs';
import { $ as $$Sidebar } from './Sidebar.bc9641d7.mjs';
import { af as $$Icon } from './pages/all.14f8edd5.mjs';
import 'html-escaper';
/* empty css                            */import 'string-strip-html';
import 'linkedom';
import '@astrojs/markdown-remark';
import 'svgo';

const $$Astro = createAstro("https://thenewoil.org");
const $$Charts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Charts;
  const { frontmatter } = Astro2.props;
  const language = getLanguageFromUrl(Astro2.url);
  return renderTemplate`<html${addAttribute(language.code, "lang")}>
  <head>
    ${renderComponent($$result, "DefaultHead", $$DefaultHead, { "pageTitle": frontmatter.title })}
  ${renderHead($$result)}</head>

  <body>
    ${renderComponent($$result, "Header", $$Header, {})}
    <div class="flex flex-1 flex-col overflow-auto lg:flex-row">
      <details class="group/sidebar-mobile flex flex-col items-center bg-tertiary py-4 shadow drop-shadow-sm dark:bg-tertiary-dark lg:hidden">
        <summary class="mx-4 flex items-center justify-center rounded-lg border-2 border-black border-opacity-10 p-4 text-lg font-bold transition-all group-open/sidebar-mobile:border-opacity-20 dark:border-white/[var(--tw-border-opacity)]">
          ${frontmatter.title}
          ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:chevron-up", "class": "w-6 h-6 group-open/sidebar-mobile:rotate-180 transition-all", "role": "img", "aria-label": "Dropbown button icon" })}
        </summary>
        ${renderComponent($$result, "Sidebar", $$Sidebar, { "class": "p-4" })}
      </details>
      ${renderComponent($$result, "Sidebar", $$Sidebar, { "class": "hidden lg:block" })}
      <div class="flex w-full flex-col items-center justify-between overflow-auto">
        <main class="flex w-full max-w-screen-2xl flex-col gap-8 px-8 md:px-20">
          ${renderSlot($$result, $$slots["default"])}
        </main>
        ${renderComponent($$result, "Footer", $$Footer, { "transparent": true })}
      </div>
    </div>
  </body></html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/layouts/charts.astro");

export { $$Charts as default };
