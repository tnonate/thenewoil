import { c as createAstro, a as createComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute, r as renderSlot, e as renderComponent } from './astro.e9786f67.mjs';
import { f as fuzzyCompareUrl, g as getLanguageFromUrl } from './Footer.828c810f.mjs';
import { af as $$Icon } from './pages/all.14f8edd5.mjs';

const $$Astro$2 = createAstro("https://thenewoil.org");
const $$SidebarPageLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SidebarPageLink;
  const { url, isCurrentPage } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(url, "href")}${addAttribute(String(isCurrentPage), "data-current-page")}${addAttribute(`motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out opacity-50 hover:opacity-75 data-[current-page='true']:opacity-100 data-[current-page='true']:hover:opacity-100`, "class")}>
  ${renderSlot($$result, $$slots["default"])}
</a>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/guides/sidebar/SidebarPageLink.astro");

const $$Astro$1 = createAstro("https://thenewoil.org");
const $$SidebarSectionDropdown = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SidebarSectionDropdown;
  const { section, sectionPages } = Astro2.props;
  const currentPagePath = Astro2.url.pathname;
  const isInSection = currentPagePath.includes(section.url);
  return renderTemplate`${maybeRenderHead($$result)}<details${addAttribute(isInSection, "open")} class="group/sidebar-dropdown">
  <summary class="flex items-center gap-4 rounded-lg bg-black bg-opacity-0 px-4 py-3 font-medium hover:bg-opacity-5 group-open/sidebar-dropdown:mb-3 group-open/sidebar-dropdown:bg-opacity-[.15] motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out dark:bg-white dark:bg-opacity-0">
    <span>${section.frontmatter.section_title}</span>
    <span class="ml-auto flex h-fit w-fit select-none group-open/sidebar-dropdown:rotate-180 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out">
      ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:chevron-up", "class": "w-6 h-6", "role": "img", "aria-label": "Dropbown button icon" })}
    </span>
  </summary>
  <div class="-mt-3 flex flex-col gap-4 p-4 font-roboto">
    ${sectionPages.map((child) => renderTemplate`${renderComponent($$result, "SidebarPagelink", $$SidebarPageLink, { "url": child.url, "isCurrentPage": fuzzyCompareUrl(currentPagePath, child.url) }, { "default": ($$result2) => renderTemplate`${child.frontmatter.title}` })}`)}
  </div>
</details>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/guides/sidebar/SidebarSectionDropdown.astro");

const $$Astro = createAstro("https://thenewoil.org");
const $$Sidebar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const { class: className } = Astro2.props;
  const language = getLanguageFromUrl(Astro2.url);
  const allGuides = await Astro2.glob(/* #__PURE__ */ Object.assign({"../../../pages/en/guides/less-important/disinformation.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.L),"../../../pages/en/guides/less-important/five-eyes.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.M),"../../../pages/en/guides/less-important/habits.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.O),"../../../pages/en/guides/less-important/index.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.K),"../../../pages/en/guides/less-important/iot.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.R),"../../../pages/en/guides/less-important/messaging.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.N),"../../../pages/en/guides/less-important/voip.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.P),"../../../pages/en/guides/less-important/vpns.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.Q),"../../../pages/en/guides/moderately-important/backups.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.H),"../../../pages/en/guides/moderately-important/desktop-settings.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.C),"../../../pages/en/guides/moderately-important/devices.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.I),"../../../pages/en/guides/moderately-important/email-aliasing.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.D),"../../../pages/en/guides/moderately-important/email.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.J),"../../../pages/en/guides/moderately-important/encryption.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.F),"../../../pages/en/guides/moderately-important/index.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.A),"../../../pages/en/guides/moderately-important/metadata.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.G),"../../../pages/en/guides/moderately-important/mobile-habits.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.E),"../../../pages/en/guides/moderately-important/public-protections.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.B),"../../../pages/en/guides/most-important/browser.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.Y),"../../../pages/en/guides/most-important/credit.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.Z),"../../../pages/en/guides/most-important/data-breaches.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.U),"../../../pages/en/guides/most-important/index.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.S),"../../../pages/en/guides/most-important/mfa.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a0),"../../../pages/en/guides/most-important/mobile-apps.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.V),"../../../pages/en/guides/most-important/mobile-settings.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.T),"../../../pages/en/guides/most-important/mobile.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.$),"../../../pages/en/guides/most-important/passwords.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.W),"../../../pages/en/guides/most-important/payments.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.X),"../../../pages/en/guides/prologue/communication.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a4),"../../../pages/en/guides/prologue/index.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a3),"../../../pages/en/guides/prologue/open-source.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a7),"../../../pages/en/guides/prologue/secprivanon.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a8),"../../../pages/en/guides/prologue/surveillance.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a5),"../../../pages/en/guides/prologue/threat-model.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a6),"../../../pages/en/guides/prologue/why.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a9),"../../../pages/en/guides/quick-start/streamer-guide.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a1),"../../../pages/en/guides/quick-start/wifi-guide.mdx": () => import('./pages/all.14f8edd5.mjs').then(n => n.a2)}), () => "../../../pages/*/guides/*/*");
  const sections = allGuides.filter((page) => page.frontmatter.section_weight && page.url?.includes(language.code + "/guides")).sort((a, b) => b.frontmatter.section_weight - a.frontmatter.section_weight);
  return renderTemplate`${maybeRenderHead($$result)}<aside aria-label="Guides navigation"${addAttribute(`flex flex-col absolute w-full lg:w-1/4 lg:static right-0 lg:right-auto overflow-auto bg-tertiary dark:bg-tertiary-dark py-4 font-robotomono ${className}`, "class")}>
  ${sections.map((section) => {
    const childPages = allGuides.filter((page) => page.url?.includes(section.url)).sort((a, b) => a.frontmatter.weight - b.frontmatter.weight);
    return renderTemplate`${renderComponent($$result, "SidebarSectionDropdown", $$SidebarSectionDropdown, { "section": section, "sectionPages": childPages })}`;
  })}
</aside>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/guides/sidebar/Sidebar.astro");

export { $$Sidebar as $ };
