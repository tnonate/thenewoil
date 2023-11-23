import { c as createAstro, a as createComponent, b as renderTemplate, e as renderComponent, m as maybeRenderHead, r as renderSlot, d as addAttribute, g as renderHead } from './astro.e9786f67.mjs';
import { g as getLanguageFromUrl, f as fuzzyCompareUrl, _ as __variableDynamicImportRuntimeHelper, $ as $$DefaultHead, a as $$Header, b as $$Footer } from './Footer.828c810f.mjs';
import { $ as $$Sidebar } from './Sidebar.bc9641d7.mjs';
import { af as $$Icon, ag as $$Button } from './pages/all.14f8edd5.mjs';
import 'html-escaper';
/* empty css                            */import 'string-strip-html';
import 'linkedom';
import '@astrojs/markdown-remark';
import 'svgo';

const $$Astro$2 = createAstro("https://thenewoil.org");
const $$ActionLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ActionLink;
  const { url, icon, iconLeft, iconRight, class: className = "" } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Button", $$Button, { "variant": "outlined", "color": "primary", "bgColor": "primary", "href": url, "class": `flex items-center justify-center gap-1 border-4 ${className}` }, { "default": ($$result2) => renderTemplate`${iconLeft && renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": icon, "class": "h-6 w-6", "role": "img", "aria-label": "Previous button icon", "aria-hidden": true })}`}${maybeRenderHead($$result2)}<span>
    ${renderSlot($$result2, $$slots["default"])}
  </span>${iconRight && renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": icon, "class": "h-6 w-6", "role": "img", "aria-label": "Next button icon", "aria-hidden": true })}`}` })}`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/guides/actions/ActionLink.astro");

const $$Astro$1 = createAstro("https://thenewoil.org");
const $$Actions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Actions;
  const language = getLanguageFromUrl(Astro2.url);
  const guides = [];
  const allGuides = (await Astro2.glob(/* #__PURE__ */ Object.assign({"../../../pages/en/guides/less-important/disinformation.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.L),"../../../pages/en/guides/less-important/five-eyes.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.M),"../../../pages/en/guides/less-important/habits.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.O),"../../../pages/en/guides/less-important/index.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.K),"../../../pages/en/guides/less-important/iot.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.R),"../../../pages/en/guides/less-important/messaging.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.N),"../../../pages/en/guides/less-important/voip.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.P),"../../../pages/en/guides/less-important/vpns.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.Q),"../../../pages/en/guides/moderately-important/backups.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.H),"../../../pages/en/guides/moderately-important/desktop-settings.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.C),"../../../pages/en/guides/moderately-important/devices.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.I),"../../../pages/en/guides/moderately-important/email-aliasing.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.D),"../../../pages/en/guides/moderately-important/email.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.J),"../../../pages/en/guides/moderately-important/encryption.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.F),"../../../pages/en/guides/moderately-important/index.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.A),"../../../pages/en/guides/moderately-important/metadata.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.G),"../../../pages/en/guides/moderately-important/mobile-habits.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.E),"../../../pages/en/guides/moderately-important/public-protections.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.B),"../../../pages/en/guides/most-important/browser.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.Y),"../../../pages/en/guides/most-important/credit.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.Z),"../../../pages/en/guides/most-important/data-breaches.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.U),"../../../pages/en/guides/most-important/index.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.S),"../../../pages/en/guides/most-important/mfa.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a0),"../../../pages/en/guides/most-important/mobile-apps.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.V),"../../../pages/en/guides/most-important/mobile-settings.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.T),"../../../pages/en/guides/most-important/mobile.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.$),"../../../pages/en/guides/most-important/passwords.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.W),"../../../pages/en/guides/most-important/payments.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.X),"../../../pages/en/guides/prologue/communication.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a4),"../../../pages/en/guides/prologue/index.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a3),"../../../pages/en/guides/prologue/open-source.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a7),"../../../pages/en/guides/prologue/secprivanon.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a8),"../../../pages/en/guides/prologue/surveillance.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a5),"../../../pages/en/guides/prologue/threat-model.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a6),"../../../pages/en/guides/prologue/why.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a9),"../../../pages/en/guides/quick-start/streamer-guide.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a1),"../../../pages/en/guides/quick-start/wifi-guide.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a2)}), () => "../../../pages/*/guides/*/*")).filter(
    (page) => page.url
  );
  const sections = allGuides.filter((page) => page.frontmatter.section_weight && page.url?.includes(language.code + "/guides")).sort((a, b) => b.frontmatter.section_weight - a.frontmatter.section_weight);
  sections.forEach((section) => {
    const sectionPages = allGuides.filter((page) => page.url?.includes(section.url)).sort((a, b) => a.frontmatter.weight - b.frontmatter.weight);
    sectionPages.forEach((page) => {
      guides.push(page);
    });
  });
  const currentPageIndex = guides.findIndex((page) => fuzzyCompareUrl(page.url, Astro2.url.pathname));
  const previousPage = guides[currentPageIndex - 1];
  const nextPage = guides[currentPageIndex + 1];
  const actionTexts = (await __variableDynamicImportRuntimeHelper((/* #__PURE__ */ Object.assign({"../../../assets/data/layout/en/guides/Actions.json": () => import('./Actions.d70ab774.mjs'),"../../../assets/data/layout/nl/guides/Actions.json": () => import('./Actions.e8df2309.mjs')})), `../../../assets/data/layout/${language.code}/guides/Actions.json`)).default;
  return renderTemplate`${maybeRenderHead($$result)}<div class="flex w-full">
  ${previousPage && renderTemplate`${renderComponent($$result, "ActionLink", $$ActionLink, { "url": previousPage.url, "icon": "mdi:arrow-left", "iconLeft": true, "class": "mr-auto" }, { "default": ($$result2) => renderTemplate`${actionTexts.previous}` })}`}
  <br>
  ${nextPage && renderTemplate`${renderComponent($$result, "ActionLink", $$ActionLink, { "url": nextPage.url, "icon": "mdi:arrow-right", "iconRight": true, "class": "ml-auto" }, { "default": ($$result2) => renderTemplate`${actionTexts.next}` })}`}
</div>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/guides/actions/Actions.astro");

const $$Astro = createAstro("https://thenewoil.org");
const $$Guides = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Guides;
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
          ${renderComponent($$result, "Actions", $$Actions, {})}
        </main>
        ${renderComponent($$result, "Footer", $$Footer, { "transparent": true })}
      </div>
    </div>
  </body></html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/layouts/guides.astro");

export { $$Guides as default };
