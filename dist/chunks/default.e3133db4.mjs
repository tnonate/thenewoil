import { c as createAstro, a as createComponent, b as renderTemplate, d as addAttribute, e as renderComponent, g as renderHead, r as renderSlot } from './astro.e9786f67.mjs';
import { g as getLanguageFromUrl, $ as $$DefaultHead, a as $$Header, b as $$Footer } from './Footer.828c810f.mjs';
import 'html-escaper';
/* empty css                            */import './pages/all.14f8edd5.mjs';
import 'string-strip-html';
import 'linkedom';
import '@astrojs/markdown-remark';
import 'svgo';

const $$Astro = createAstro("https://thenewoil.org");
const $$Default = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Default;
  const { frontmatter } = Astro2.props;
  const language = getLanguageFromUrl(Astro2.url);
  return renderTemplate`<html${addAttribute(language.code, "lang")}>
  <head>
    ${renderComponent($$result, "DefaultHead", $$DefaultHead, { "pageTitle": frontmatter.title })}
  ${renderHead($$result)}</head>

  <body>
    ${renderComponent($$result, "Header", $$Header, { "title": frontmatter.title })}
    <div class="flex flex-1 flex-col items-center overflow-auto">
      <main${addAttribute(`flex flex-1 flex-col gap-8 w-full max-w-screen-2xl px-6 md:px-20 ${frontmatter.center_content && "items-center"}`, "class")}>
        ${renderSlot($$result, $$slots["default"])}
      </main>
      ${renderComponent($$result, "Footer", $$Footer, {})}
    </div>
  </body></html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/layouts/default.astro");

export { $$Default as default };
