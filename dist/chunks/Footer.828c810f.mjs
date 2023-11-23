import { c as createAstro, a as createComponent, b as renderTemplate, d as addAttribute, m as maybeRenderHead, e as renderComponent, r as renderSlot } from './astro.e9786f67.mjs';
/* empty css                            */import { af as $$Icon } from './pages/all.14f8edd5.mjs';

const title = "The New Oil";
const metatags = [
	{
		name: "description",
		content: "Data is the new oil"
	},
	{
		name: "monetization",
		content: "$ilp.uphold.com/gywWRZd488m6"
	},
	{
		name: "author",
		content: "Nathan Bartram"
	}
];
const languages$1 = [
	{
		code: "en",
		name: "English",
		weight: 1,
		image: "/images/languages/en.svg",
		isDefault: true
	}
];
const config = {
	title: title,
	metatags: metatags,
	languages: languages$1
};

const $$Astro$5 = createAstro("https://thenewoil.org");
const $$DefaultHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$DefaultHead;
  const { pageTitle } = Astro2.props;
  const title = `${config.title}${pageTitle && ` | ${pageTitle}`}`;
  return renderTemplate`<!-- Title --><title>${title}</title>
<meta name="og:title"${addAttribute(title, "content")}>

<!-- Favicon -->
<link rel="icon" href="/favicon.ico" type="image/x-icon">

<!-- Metadata headers -->
${config.metatags.map((metatag) => {
    return renderTemplate`<meta${addAttribute(metatag.name, "name")}${addAttribute(metatag.content, "content")}>`;
  })}

<!-- Misc -->
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="onion-location" content="http://vyrgfx4jz2lnejqduons56ph5xtsrtaoo7ovny53dd7okyzhfsgkzbad.onion">
<link rel="me" href="https://mastodon.thenewoil.org/@thenewoil">
<link rel="me" href="https://mastodon.thenewoil.org/@admin">
<link rel="me" href="https://mastodon.thenewoil.org/@nateb">`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/layout/DefaultHead.astro");

const __variableDynamicImportRuntimeHelper = (glob, path) => {
    const v = glob[path];
    if (v) {
        return typeof v === 'function' ? v() : Promise.resolve(v);
    }
    return new Promise((_, reject) => {
        (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(reject.bind(null, new Error('Unknown variable dynamic import: ' + path)));
    });
};

config.languages.map((lang) => lang.code);
const languages = config.languages.sort(
  (a, b) => a.weight - b.weight
);
const defaultLanguage = config.languages.find(
  (lang) => lang.isDefault === true
);
if (!defaultLanguage)
  throw Error(
    "A default language needs to be set in the config.json. Add 'isDefault: true' to any language"
  );
const findLanguage = (language) => {
  return config.languages.find((lang) => lang.code === language);
};
const getLanguageFromUrl = (url) => {
  const language = url.pathname.split("/")[1];
  return findLanguage(language) || defaultLanguage;
};
const getRelativePath = (url) => {
  const pathname = url.pathname;
  const secondSeparatorIndex = pathname.indexOf("/", 1);
  return secondSeparatorIndex !== -1 ? pathname.substring(secondSeparatorIndex + 1) : "";
};
const getUrlInLanguage = async (url, targetLanguage) => {
  const relativePath = getRelativePath(url);
  const toLanguage = findLanguage(targetLanguage)?.code || defaultLanguage;
  return `/${toLanguage}${relativePath ? "/" + relativePath : ""}`;
};

const $$Astro$4 = createAstro("https://thenewoil.org");
const $$LanguageSwitcher = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$LanguageSwitcher;
  const { class: className = "", summaryClass = "", contentClass = "" } = Astro2.props;
  const currentLanguage = getLanguageFromUrl(Astro2.url);
  return renderTemplate`${maybeRenderHead($$result)}<details${addAttribute(`group relative h-fit flex-col justify-center gap-2 ${className}`, "class")}>
  <summary${addAttribute(`flex items-center rounded-md bg-white bg-opacity-0 px-5 py-2 transition-all hover:bg-opacity-5 group-open:bg-opacity-[.15] ${summaryClass}`, "class")}>
    ${renderComponent($$result, "Icon", $$Icon, { "pack": "mdi", "name": "web", "class": "w-7 h-7", "role": "img", "aria-label": "Web icon" })}
    ${renderComponent($$result, "Icon", $$Icon, { "pack": "mdi", "name": "chevron-up", "class": "w-6 h-6 group-open:rotate-180 motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out", "role": "img", "aria-label": "Dropbown button icon" })}
  </summary>
  <div${addAttribute(`absolute top-full right-0 flex translate-y-4 flex-col rounded-md bg-secondary text-primary-dark-contrast shadow-md ${contentClass}`, "class")}>
    ${languages.map(async (language) => {
    const url = await getUrlInLanguage(Astro2.url, language.code);
    return renderTemplate`<a${addAttribute(currentLanguage.code === language.code, "aria-disabled")} class="flex w-full min-w-max items-center gap-4 rounded-md bg-white bg-opacity-0 px-4 py-3 font-medium transition-all hover:bg-opacity-5 aria-disabled:pointer-events-none aria-disabled:bg-opacity-[.15] aria-disabled:hover:bg-opacity-[.15]"${addAttribute(url, "href")}${addAttribute(language.code, "hreflang")}>
            <img${addAttribute(language.image || `/images/languages/${language.code}.png`, "src")}${addAttribute(`${language.name} icon`, "alt")} class="h-10 w-10 rounded-full object-cover">
            <span>${language.name}</span>
          </a>`;
  })}
  </div>
</details>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/header/LanguageSwitcher.astro");

const fuzzyCompareUrl = (url1, url2) => {
  url1 = url1.trim().toLowerCase();
  url2 = url2.trim().toLowerCase();
  return url1 === url2 || `${url1}/` === url2 || url1 === `${url2}/`;
};

const $$Astro$3 = createAstro("https://thenewoil.org");
const $$HeaderLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$HeaderLink;
  const { lang } = Astro2.props;
  let { href, active } = Astro2.props;
  if (lang) {
    href = `/${lang}${href}`;
  }
  if (active === void 0) {
    active = fuzzyCompareUrl(Astro2.url.pathname, href);
  }
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")}${addAttribute(String(active), "data-active")} class="rounded-md bg-white bg-opacity-0 py-2 px-5 font-medium transition-all hover:bg-opacity-5 data-[active='true']:bg-opacity-[.15]"${addAttribute(lang, "hreflang")}>
  ${renderSlot($$result, $$slots["default"])}
</a>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/header/HeaderLink.astro");

const $$Astro$2 = createAstro("https://thenewoil.org");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const language = getLanguageFromUrl(Astro2.url);
  const languageCode = language.code;
  const headerTexts = (await __variableDynamicImportRuntimeHelper((/* #__PURE__ */ Object.assign({"../../assets/data/layout/en/Header.json": () => import('./Header.abdb91ab.mjs'),"../../assets/data/layout/nl/Header.json": () => import('./Header.94558908.mjs')})), `../../assets/data/layout/${languageCode}/Header.json`)).default;
  return renderTemplate`${maybeRenderHead($$result)}<header class="flex min-h-[4rem] items-center justify-between bg-secondary px-6 text-primary-dark-contrast lg:shadow lg:drop-shadow-sm">
  <div class="hidden flex-1 gap-2 lg:flex">
    ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "", "lang": languageCode }, { "default": ($$result2) => renderTemplate`${headerTexts.home}` })}
    ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/guides/prologue", "lang": languageCode, "active": Astro2.url.pathname.includes(`/${languageCode}/guides`) }, { "default": ($$result2) => renderTemplate`${headerTexts.guides}` })}
  </div>

  <a${addAttribute(`/${languageCode}`, "href")} class="flex h-4 items-center gap-2 text-2xl font-black" tabindex="">
    <p class="w-max break-normal uppercase">The New Oil</p>
    <img src="/images/graphics/header.png" alt="The New Oil logo" width="68" height="100" class="h-auto max-w-[1.25rem] text-[0px]">
  </a>

  <div class="hidden flex-1 items-center justify-end gap-2 lg:flex">
    ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/about", "lang": languageCode }, { "default": ($$result2) => renderTemplate`${headerTexts.about}` })}
    ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/links", "lang": languageCode }, { "default": ($$result2) => renderTemplate`${headerTexts.links}` })}
    ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/support", "lang": languageCode }, { "default": ($$result2) => renderTemplate`${headerTexts.support}` })}
    ${languages.length > 1 && renderTemplate`${renderComponent($$result, "LanguageSwitcher", $$LanguageSwitcher, {})}`}
  </div>

  <details class="group/mobile-menu flex flex-col lg:hidden">
    <summary class="rounded-full bg-white bg-opacity-0 p-2 transition-all hover:bg-opacity-5 group-open/mobile-menu:bg-opacity-[.15]">
      <div class="relative flex h-7 w-7 items-center justify-center">
        ${renderComponent($$result, "Icon", $$Icon, { "pack": "mdi", "name": "menu", "class": "absolute group-open/mobile-menu:-rotate-90 group-open/mobile-menu:opacity-0 transition-all", "role": "img", "aria-label": "Menu icon" })}
        ${renderComponent($$result, "Icon", $$Icon, { "pack": "mdi", "name": "chevron-up", "class": "absolute w-7 h-7 rotate-90 group-open/mobile-menu:rotate-0 opacity-0 group-open/mobile-menu:opacity-100 transition-all", "role": "img", "aria-label": "Menu icon" })}
      </div>
    </summary>
    <div class="absolute right-0 z-50 flex w-full flex-col gap-2 bg-secondary p-4 text-primary-dark-contrast shadow-md lg:hidden">
      ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/guides/prologue", "lang": languageCode, "active": Astro2.url.pathname.includes(`/${languageCode}/guides`) }, { "default": ($$result2) => renderTemplate`${headerTexts.guides}` })}
      ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/about", "lang": languageCode }, { "default": ($$result2) => renderTemplate`${headerTexts.about}` })}
      ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/links", "lang": languageCode }, { "default": ($$result2) => renderTemplate`${headerTexts.links}` })}
      ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/support", "lang": languageCode }, { "default": ($$result2) => renderTemplate`${headerTexts.support}` })}
      ${languages.length > 1 && renderTemplate`${renderComponent($$result, "LanguageSwitcher", $$LanguageSwitcher, { "contentClass": "w-full" })}`}
    </div>
  </details>
</header>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/header/Header.astro");

const $$Astro$1 = createAstro("https://thenewoil.org");
const $$FooterLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FooterLink;
  const { lang } = Astro2.props;
  let { href } = Astro2.props;
  if (lang) {
    href = `/${lang}${href}`;
  }
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")}${addAttribute(lang, "hreflang")} class="text-center transition-all hover:opacity-75 active:opacity-60 sm:text-start">
  ${renderSlot($$result, $$slots["default"])}
</a>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/footer/FooterLink.astro");

const $$Astro = createAstro("https://thenewoil.org");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Footer;
  const { transparent } = Astro2.props;
  const language = getLanguageFromUrl(Astro2.url);
  const footerTexts = (await __variableDynamicImportRuntimeHelper((/* #__PURE__ */ Object.assign({"../../assets/data/layout/en/Footer.json": () => import('./Footer.c7febbd5.mjs'),"../../assets/data/layout/nl/Footer.json": () => import('./Footer.19b567e4.mjs')})), `../../assets/data/layout/${language.code}/Footer.json`)).default;
  return renderTemplate`${maybeRenderHead($$result)}<footer${addAttribute(String(transparent ?? "false"), "data-transparent")} class="grid w-full grid-cols-1 items-center justify-center gap-4 bg-secondary p-4 text-secondary-contrast data-[transparent='true']:bg-transparent data-[transparent='true']:text-primary-contrast data-[transparent='true']:dark:text-primary-dark-contrast xs:grid-cols-2 sm:flex sm:gap-20">
  ${renderComponent($$result, "FooterLink", $$FooterLink, { "href": "https://gitlab.com/thenewoil/website/-/blob/main/LICENSE.md" }, { "default": ($$result2) => renderTemplate`${footerTexts.license}` })}
  ${renderComponent($$result, "FooterLink", $$FooterLink, { "href": "/privacy-policy" }, { "default": ($$result2) => renderTemplate`${footerTexts.privacy_policy}` })}
  ${renderComponent($$result, "FooterLink", $$FooterLink, { "href": "https://gitlab.com/thenewoil/website" }, { "default": ($$result2) => renderTemplate`${footerTexts.repository}` })}
  ${renderComponent($$result, "FooterLink", $$FooterLink, { "href": "/roadmap" }, { "default": ($$result2) => renderTemplate`${footerTexts.roadmap}` })}
</footer>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/footer/Footer.astro");

export { $$DefaultHead as $, __variableDynamicImportRuntimeHelper as _, $$Header as a, $$Footer as b, fuzzyCompareUrl as f, getLanguageFromUrl as g };
