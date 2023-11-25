import { r as renderSlot, c as createAstro, a as createComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute, e as renderComponent, _ as __astro_tag_component__, f as createVNode, F as Fragment, g as renderHead, s as spreadAttributes, u as unescapeHTML } from '../astro.e9786f67.mjs';
import { stripHtml } from 'string-strip-html';
import { parseHTML } from 'linkedom';
import { renderMarkdown } from '@astrojs/markdown-remark';
import { optimize } from 'svgo';

const sections = [
	{
		title: "Getting Started",
		description: "New here? Not sure why privacy matters, how to build a threat model, or the difference between security and privacy? Start here!",
		link: "/guides/prologue"
	},
	{
		title: "Most Important",
		description: "Are you ready to patch up the most important holes in your security? Looking for the easiest steps to take with the maximum impact? Read this section!",
		link: "/guides/most-important"
	},
	{
		title: "Moderately Important",
		description: "Already got the basics covered but ready to take your privacy and security to the next step? Read this section!",
		link: "/guides/moderately-important"
	},
	{
		title: "Less Important",
		description: "Ready for more advanced topics? Ready to start working on those last few tiny leaks you have left in your digital life? This section is for you!",
		link: "/guides/less-important"
	}
];

const guides = [
	{
		title: "Mobile Devices",
		description: "Got a new stock Android or iPhone and looking to get as much privacy and security out of it as possible? Start here.",
		link: "/guides/most-important/mobile"
	},
	{
		title: "Desktop & Laptop Computers",
		description: "Unable to switch to Linux yet, but still want to protect your Mac or PC as much as possible? This guide is for you!",
		link: "/guides/moderately-important/desktop-settings"
	},
	{
		title: "Home Network",
		description: "If you just got a new router, are thinking about getting a new router, or simply want to know the best way to protect your home network from threats, this guide a must-read starting point.",
		link: "/guides/quick-start/wifi-guide"
	},
	{
		title: "Content Creators",
		description: "If you want to be an influencer, streamer, or other type of content creator, this guide will help protect you from doxxers, stalkers, and data leaks.",
		link: "/guides/quick-start/streamer-guide"
	}
];

const symbol = Symbol.for('@astropub/md');

const shared = /** @type {Shared} */ (
	globalThis[symbol] || (
		globalThis[symbol] = {
			markdownConfig: {},
		}
	)
);

/** @typedef {import('./shared').Shared} Shared */

class HTMLString extends String {
	get [Symbol.toStringTag]() {
		return 'HTMLString'
	}
}

async function markdown(
	/** @type {string} */ content,
	/** @type {MarkdownRenderingOptions} */ options = null
) {
	return await renderMarkdown(content, {
		...shared.markdownConfig,
		...Object(options),
	}).then(
		result => new HTMLString(result.code)
	)
}

markdown.inline = async function inlinemarkdown(
	/** @type {string} */ content,
	/** @type {MarkdownRenderingOptions} */ options = null
) {
	return await renderMarkdown(content, {
		...shared.markdownConfig,
		...Object(options),
	}).then(
		result => new HTMLString(
			result.code.indexOf('<p>') === 0 &&
			result.code.indexOf('</p>') === result.code.length - 4
				? result.code.slice(3, -4)
			: result.code
		)
	)
};

/** @typedef {import('./markdown').MarkdownRenderingOptions} MarkdownRenderingOptions */

const Markdown = Object.assign(
	function Markdown(result, attributes, slots) {
		return {
			get [Symbol.toStringTag]() {
				return 'AstroComponent'
			},
			async *[Symbol.asyncIterator]() {
				const mdl = attributes.of;

				if (typeof mdl === 'string') {
					yield await markdown(mdl, {
						fileURL: new URL(import.meta.url),
					});
				} else {
					yield renderSlot(result, slots.default);
				}
			},
		}
	},
	{
		isAstroComponentFactory: true,
		Inline: Object.assign(
			function MarkdownInline(result, attributes, slots) {
				return {
					get [Symbol.toStringTag]() {
						return 'AstroComponent'
					},
					async *[Symbol.asyncIterator]() {
						const mdl = attributes.of;

						if (typeof mdl === 'string') {
							yield await markdown.inline(mdl, {
								fileURL: new URL(import.meta.url),
							});
						} else {
							yield renderSlot(result, slots.default);
						}
					},
				}
			},
			{
				isAstroComponentFactory: true,
			}
		)
	}
);

const idFromText = async (text) => {
  const htmlString = await markdown(`# ${text}`);
  const { document } = parseHTML(htmlString);
  const nsHeading = document.querySelector("h1");
  return nsHeading.id;
};
const textToHeadingId = async ({
  text,
  namespace,
  prefix
}) => {
  let outputId = "";
  if (namespace)
    outputId += await idFromText(namespace);
  const textId = await idFromText(text);
  if (outputId)
    outputId += "-";
  outputId += textId;
  if (prefix)
    outputId = prefix + outputId;
  return outputId;
};

const $$Astro$A = createAstro("https://thenewoil.org");
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$A, $$props, $$slots);
  Astro2.self = $$Hero;
  const headingId = await textToHeadingId({
    text: stripHtml(await Astro2.slots.render("title")).result.replace(/(?:\r\n|\r|\n)/g, " ").replace("&", "and")
  });
  return renderTemplate`${maybeRenderHead($$result)}<div class="mx-auto flex w-11/12 flex-col items-center justify-center xl:flex-row">
  <h1${addAttribute(headingId, "id")} class="border-none text-center xl:w-2/5">
    ${renderSlot($$result, $$slots["title"])}
  </h1>

  <div class="border-0 py-8 xl:ml-10 xl:w-3/5 xl:border-l-4 xl:pl-12 xl:border-gradient-primary xl:border-bg-primary xl:dark:border-bg-primary-dark 2xl:ml-0">
    ${renderSlot($$result, $$slots["default"])}
  </div>
</div>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/pages/front-page/Hero.astro");

const $$Astro$z = createAstro("https://thenewoil.org");
const $$Section = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$z, $$props, $$slots);
  Astro2.self = $$Section;
  return renderTemplate`${maybeRenderHead($$result)}<section class="flex flex-col items-center gap-8">
  ${renderSlot($$result, $$slots["default"])}
</section>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/pages/front-page/Section.astro");

const $$Astro$y = createAstro("https://thenewoil.org");
const $$Button = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$y, $$props, $$slots);
  Astro2.self = $$Button;
  const VARIANTS = {
    contained: {
      classes: "is:text-primary",
      color: {
        primary: "where:shadow-md border-none bg-gradient-primary text-primary-dark",
        secondary: "where:shadow-md border-none bg-gradient-secondary text-primary-dark"
      }
    },
    outlined: {
      classes: "border-solid border-1 text-primary-dark dark:text-primary",
      color: {
        primary: "border-gradient-primary",
        secondary: "border-gradient-secondary"
      }
    },
    flat: {
      classes: "is:text-primary-dark dark:is:text-primary"
    }
  };
  const BG_COLOR_CLASSES = {
    primary: "border-bg-primary dark:border-bg-primary-dark",
    secondary: "border-bg-secondary dark:border-bg-secondary-dark",
    tertiary: "border-bg-tertiary dark:border-bg-tertiary-dark"
  };
  const {
    class: className = "",
    variant: variantKey,
    color: colorKey,
    bgColor: bgColorKey,
    external,
    ...props
  } = Astro2.props;
  const variant = VARIANTS[variantKey];
  const variantClasses = variant.classes ?? "";
  const colorClasses = variant.color?.[colorKey] ?? "";
  const bgColorClasses = bgColorKey && variantKey === "outlined" ? BG_COLOR_CLASSES[bgColorKey] : "";
  const Component = props.href !== void 0 ? "a" : "button";
  return renderTemplate`${renderComponent($$result, "Component", Component, { "class": `is:uppercase where:w-fit where:rounded-lg is:px-4 is:py-3 where:text-center ${colorClasses} ${variantClasses} ${bgColorClasses} ${className}`, "target": external && "_blank", ...props }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/controls/Button.astro");

const $$Astro$x = createAstro("https://thenewoil.org");
const $$Card$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$x, $$props, $$slots);
  Astro2.self = $$Card$1;
  const COLOR_CLASSES = {
    primary: "border-gradient-primary",
    secondary: "border-gradient-secondary"
  };
  const { title, description, link, color } = Astro2.props;
  const colorClasses = COLOR_CLASSES[color];
  return renderTemplate`${maybeRenderHead($$result)}<article${addAttribute(`hidden sm:flex min-w-[18rem] flex-1 flex-col items-center justify-between gap-8 border-4 px-4 py-12 text-center rounded-lg border-bg-primary dark:border-bg-primary-dark ${colorClasses}`, "class")}>
  <h3 class="font-robotomono">${title}</h3>
  <p>${description}</p>
  ${renderComponent($$result, "Button", $$Button, { "variant": "contained", "href": link, "color": color, "bgColor": "primary", "class": "font-robotomono" }, { "default": ($$result2) => renderTemplate`Go to Page` })}
</article>

${renderComponent($$result, "Button", $$Button, { "variant": "contained", "href": link, "color": color, "bgColor": "primary", "class": "font-robotomono sm:hidden w-full flex items-center justify-center h-24 text-sm xs:text-base p-1 xs:p-2" }, { "default": ($$result2) => renderTemplate`${title}` })}`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/pages/front-page/Card.astro");

const $$Astro$w = createAstro("https://thenewoil.org");
const $$Cards = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$w, $$props, $$slots);
  Astro2.self = $$Cards;
  const { items, color } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div class="grid w-full grid-cols-2 justify-center gap-2 overflow-auto motion-safe:transition-all xs:gap-4 sm:gap-8 2xl:grid-cols-4">
  ${items.map((item) => {
    return renderTemplate`${renderComponent($$result, "Card", $$Card$1, { "title": item.title, "description": item.description, "link": item.link, "color": color })}`;
  })}
</div>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/pages/front-page/Cards.astro");

const $$Astro$v = createAstro("https://thenewoil.org");
const $$Sponsor = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$v, $$props, $$slots);
  Astro2.self = $$Sponsor;
  const { name, link, source, description } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<li class="w-full list-none py-0 sm:w-auto" aria-label="Sponsor">
  <a${addAttribute(link, "href")} target="_blank" class="align-center flex flex-col flex-wrap items-center justify-end gap-4 rounded-lg border-4 border-solid px-6 py-8 border-gradient-primary border-bg-primary dark:border-bg-primary-dark">
    <img class="h-14 w-44 object-contain motion-safe:transition-all sm:h-20 sm:w-60" loading="lazy"${addAttribute(source, "src")}${addAttribute(`${name} logo`, "alt")}>
    <p aria-label="Name" class="text-xl font-semibold sm:text-2xl" aria-label="Name">${name}</p>
    <p class="m-0 text-center font-medium text-opacity-80" aria-label="Description">${description}</p>
  </a>
</li>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/pages/front-page/Sponsor.astro");

const $$Astro$u = createAstro("https://thenewoil.org");
const $$Sponsors = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$u, $$props, $$slots);
  Astro2.self = $$Sponsors;
  const { items } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<ul class="flex w-full flex-wrap justify-center gap-8 p-0" aria-label="Sponsors">
  ${items.map((item) => {
    return renderTemplate`${renderComponent($$result, "Sponsor", $$Sponsor, { "name": item.name, "source": item.source, "description": item.description, "link": item.link })}`;
  })}
</ul>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/pages/front-page/Sponsors.astro");

const MDXLayout$T = async function ({
  children
}) {
  const Layout = (await import('../default.e3133db4.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$T;
  content.file = file$T;
  content.url = url$T;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$T,
    url: url$T,
    content,
    frontmatter: content,
    headings: getHeadings$T(),
    "server:root": true,
    children
  });
};
const frontmatter$T = {
  "layout": "@layouts/default.astro",
  "title": "Home",
  "draft": false
};
const _internal$T = {
  injectedFrontmatter: {}
};
function getHeadings$T() {
  return [{
    "depth": 2,
    "slug": "sections",
    "text": "Sections"
  }, {
    "depth": 2,
    "slug": "quickstart-guides",
    "text": "QuickStart Guides"
  }];
}
function _createMdxContent$T(props) {
  const _components = Object.assign({
    p: "p",
    strong: "strong",
    em: "em",
    h2: "h2"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode($$Hero, {
      children: [createVNode("span", {
        slot: "title",
        children: createVNode(_components.p, {
          children: [createVNode("div", {
            children: "The Beginner\u2019s Guide to"
          }), "\n", createVNode("span", {
            class: "text-gradient-primary",
            children: "Data Privacy"
          }), "\n&\n", createVNode("span", {
            class: "text-gradient-primary",
            children: "Cybersecurity"
          })]
        })
      }), createVNode(_components.p, {
        children: [createVNode(_components.strong, {
          children: ["How would you like to feel - and more importantly, ", createVNode(_components.em, {
            children: "be"
          }), " - safe online again?"]
        }), " Most of us know that we could be doing better when it comes to our online habits: we reuse bad passwords, overshare personal information, and leave ourselves exposed to all kinds of risks all over the internet. But it doesn\u2019t have to be that way and it doesn\u2019t have to be hard, either."]
      }), createVNode(_components.p, {
        children: [createVNode(_components.em, {
          children: "Welcome to The New Oil."
        }), " This site is designed to help readers take back control of their data and regain their privacy online. ", createVNode(_components.strong, {
          children: "Are you a programmer, sysadmin, networking expert, or hacker? If you answered \u201Cno,\u201D you\u2019re in the right place!"
        }), " This site is not aimed at tech experts. If you know how to download an app on your phone, how to sign up for an email account, or what a password is, you\u2019ve got the qualifications to tackle the advice and content on this site."]
      }), createVNode(_components.p, {
        children: ["Whether you\u2019re looking to keep yourself safe from identity theft and common hacks, whether you simply object to mass surveillance, or anything in between, this site will help you learn the basics about protecting your identity, your safety, and your data in a way that\u2019s accessible and achievable. ", createVNode(_components.strong, {
          children: "Welcome to privacy made easy."
        })]
      })]
    }), "\n", createVNode($$Section, {
      children: [createVNode(_components.h2, {
        id: "sections",
        children: "Sections"
      }), createVNode(_components.p, {
        children: "Guides that cover security, privacy, and anonymity grouped by their importance."
      }), createVNode($$Cards, {
        items: sections,
        color: "primary"
      })]
    }), "\n", createVNode($$Section, {
      children: [createVNode(_components.h2, {
        id: "quickstart-guides",
        children: "QuickStart Guides"
      }), createVNode(_components.p, {
        children: "Guides that are frequently shared in response to popular questions."
      }), createVNode($$Cards, {
        items: guides,
        color: "secondary"
      })]
    })]
  });
}
function MDXContent$T(props = {}) {
  return createVNode(MDXLayout$T, {
    ...props,
    children: createVNode(_createMdxContent$T, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$T, "astro:jsx");
__astro_tag_component__(MDXContent$T, "astro:jsx");
const url$T = "";
const file$T = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/index.mdx";
function rawContent$T() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$T() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$T = (props = {}) => MDXContent$T({
											...props,
											components: { Fragment, ...props.components },
										});
Content$T[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$T.layout);

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$T,
  _internal: _internal$T,
  compiledContent: compiledContent$T,
  default: Content$T,
  file: file$T,
  frontmatter: frontmatter$T,
  getHeadings: getHeadings$T,
  rawContent: rawContent$T,
  url: url$T
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$t = createAstro("https://thenewoil.org");
const $$Opencollective = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$t, $$props, $$slots);
  Astro2.self = $$Opencollective;
  return renderTemplate`<html lang="en">
  <head>
    <title>Redirecting to Open Collective...</title>
    <meta http-equiv="refresh" content="0; URL=https://opencollective.com/thenewoil/donate">
  ${renderHead($$result)}</head>
</html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/opencollective.astro");

const $$file$c = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/opencollective.astro";
const $$url$c = "/opencollective";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Opencollective,
  file: $$file$c,
  url: $$url$c
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$s = createAstro("https://thenewoil.org");
const $$Simplelogin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$Simplelogin;
  return renderTemplate`<html lang="en">
  <head>
    <title>Redirecting to SimpleLogin...</title>
    <meta http-equiv="refresh" content="0; URL=https://simplelogin.io/?slref=thenewoil">
  ${renderHead($$result)}</head>
</html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/simplelogin.astro");

const $$file$b = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/simplelogin.astro";
const $$url$b = "/simplelogin";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Simplelogin,
  file: $$file$b,
  url: $$url$b
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$r = createAstro("https://thenewoil.org");
const $$Liberapay = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$Liberapay;
  return renderTemplate`<html lang="en">
  <head>
    <title>Redirecting to Liberapay...</title>
    <meta http-equiv="refresh" content="0; URL=https://liberapay.com/thenewoil">
  ${renderHead($$result)}</head>
</html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/liberapay.astro");

const $$file$a = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/liberapay.astro";
const $$url$a = "/liberapay";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Liberapay,
  file: $$file$a,
  url: $$url$a
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$q = createAstro("https://thenewoil.org");
const $$Nitrokey = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$Nitrokey;
  return renderTemplate`<html lang="en">
  <head>
    <title>Redirecting to Nitrokey...</title>
    <meta http-equiv="refresh" content="0; URL=https://shop.nitrokey.com/shop?aff_ref=14">
  ${renderHead($$result)}</head>
</html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/nitrokey.astro");

const $$file$9 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/nitrokey.astro";
const $$url$9 = "/nitrokey";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Nitrokey,
  file: $$file$9,
  url: $$url$9
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$p = createAstro("https://thenewoil.org");
const $$Patreon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$Patreon;
  return renderTemplate`<html lang="en">
  <head>
    <title>Redirecting to Patreon...</title>
    <meta http-equiv="refresh" content="0; URL=https://www.patreon.com/TheNewOil413">
  ${renderHead($$result)}</head>
</html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/patreon.astro");

const $$file$8 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/patreon.astro";
const $$url$8 = "/patreon";

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Patreon,
  file: $$file$8,
  url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$o = createAstro("https://thenewoil.org");
const $$Privacy = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Privacy;
  return renderTemplate`<html lang="en">
  <head>
    <title>Redirecting to Privacy.com...</title>
    <meta http-equiv="refresh" content="0; URL=https://privacy.com/join/UZ9WY">
  ${renderHead($$result)}</head>
</html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/privacy.astro");

const $$file$7 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/privacy.astro";
const $$url$7 = "/privacy";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Privacy,
  file: $$file$7,
  url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$n = createAstro("https://thenewoil.org");
const $$Paypal = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$Paypal;
  return renderTemplate`<html lang="en">
  <head>
    <title>Redirecting to Paypal...</title>
    <meta http-equiv="refresh" content="0; URL=https://www.paypal.com/donate/?hosted_button_id=2LLRWFZQS4E94">
  ${renderHead($$result)}</head>
</html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/paypal.astro");

const $$file$6 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/paypal.astro";
const $$url$6 = "/paypal";

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Paypal,
  file: $$file$6,
  url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$m = createAstro("https://thenewoil.org");
const $$Proton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$Proton;
  return renderTemplate`<html lang="en">
  <head>
    <title>Redirecting to Proton...</title>
    <meta http-equiv="refresh" content="0; URL=https://go.getproton.me/aff_c?offer_id=26&aff_id=2187&url=https%3A%2F%2Fproton.me%2F%3FvisitorId%3Dho-{transaction_id}%26aid%3D{affiliate_id}%26offer_id%3D{offer_id}%26url_id%3D{offer_url_id}%26utm_campaign%3Dww-all-2c-vpn-gro_aff-g_acq-partners_program%26utm_source%3Daid-tune-{affiliate_id}%26utm_medium%3Dlink%26utm_term%3Dgeneric_vpn_landing%26utm_content%3D{offer_id}%26hfp%3Dfalse%26spl%3D{affiliate_id}%26aap%3D{affiliate_id}">
  ${renderHead($$result)}</head>
</html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/proton.astro");

const $$file$5 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/proton.astro";
const $$url$5 = "/proton";

const _page8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Proton,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$l = createAstro("https://thenewoil.org");
const $$Filen = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$Filen;
  return renderTemplate`<html lang="en">
  <head>
    <title>Redirecting to Filen...</title>
    <meta http-equiv="refresh" content="0; URL=https://filen.io/r/834a3bd235bca0caa53141f2ebc30438">
  ${renderHead($$result)}</head>
</html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/filen.astro");

const $$file$4 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/filen.astro";
const $$url$4 = "/filen";

const _page9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Filen,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$k = createAstro("https://thenewoil.org");
const $$Skiff = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$Skiff;
  return renderTemplate`<html lang="en">
  <head>
    <title>Redirecting to Skiff...</title>
    <meta http-equiv="refresh" content="0; URL=https://app.skiff.com/signup?mail=&referral=thenewoil">
  ${renderHead($$result)}</head>
</html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/skiff.astro");

const $$file$3 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/skiff.astro";
const $$url$3 = "/skiff";

const _page10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Skiff,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$j = createAstro("https://thenewoil.org");
const $$Mega = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$Mega;
  return renderTemplate`<html lang="en">
  <head>
    <title>Redirecting to Mega...</title>
    <meta http-equiv="refresh" content="0; URL=https://mega.nz/aff=UBJLjO7sxZU">
  ${renderHead($$result)}</head>
</html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/mega.astro");

const $$file$2 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/mega.astro";
const $$url$2 = "/mega";

const _page11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Mega,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const SPRITESHEET_NAMESPACE = `astroicon`;

const baseURL = "https://api.astroicon.dev/v1/";
const requests = /* @__PURE__ */ new Map();
const fetchCache = /* @__PURE__ */ new Map();
async function get(pack, name) {
  const url = new URL(`./${pack}/${name}`, baseURL).toString();
  if (requests.has(url)) {
    return await requests.get(url);
  }
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }
  let request = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("svg")) {
      throw new Error(`[astro-icon] Unable to load "${name}" because it did not resolve to an SVG!

Recieved the following "Content-Type":
${contentType}`);
    }
    const svg = await res.text();
    fetchCache.set(url, svg);
    requests.delete(url);
    return svg;
  };
  let promise = request();
  requests.set(url, promise);
  return await promise;
}

const splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
const splitAttrs = (str) => {
  let res = {};
  let token;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = " " + (str || "") + " ";
    while (token = splitAttrsTokenizer.exec(str)) {
      res[token[1]] = token[3];
    }
  }
  return res;
};
function optimizeSvg(contents, name, options) {
  return optimize(contents, {
    plugins: [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs",
      {
        name: "cleanupIDs",
        params: { prefix: `${SPRITESHEET_NAMESPACE}:${name}` }
      },
      "removeRasterImages",
      "removeUselessDefs",
      "cleanupNumericValues",
      "cleanupListOfValues",
      "convertColors",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeViewBox",
      "cleanupEnableBackground",
      "removeHiddenElems",
      "removeEmptyText",
      "convertShapeToPath",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      "convertPathData",
      "convertTransform",
      "removeEmptyAttrs",
      "removeEmptyContainers",
      "mergePaths",
      "removeUnusedNS",
      "sortAttrs",
      "removeTitle",
      "removeDesc",
      "removeDimensions",
      "removeStyleElement",
      "removeScriptElement"
    ]
  }).data;
}
const preprocessCache = /* @__PURE__ */ new Map();
function preprocess(contents, name, { optimize }) {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  if (optimize) {
    contents = optimizeSvg(contents, name);
  }
  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while (token = domParserTokenizer.exec(contents)) {
      const tag = token[2];
      if (tag === "svg") {
        const attrs = splitAttrs(token[3]);
        result = contents.slice(domParserTokenizer.lastIndex).replace(/<\/svg>/gim, "").trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }
}
function normalizeProps(inputProps) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : void 0;
  const height = h ? toAttributeSize(h) : void 0;
  return { ...inputProps, width, height };
}
const toAttributeSize = (size) => String(size).replace(/(?<=[0-9])x$/, "em");
async function load(name, inputProps, optimize) {
  const key = name;
  if (!name) {
    throw new Error("<Icon> requires a name!");
  }
  let svg = "";
  let filepath = "";
  if (name.includes(":")) {
    const [pack, ..._name] = name.split(":");
    name = _name.join(":");
    filepath = `/src/icons/${pack}`;
    let get$1;
    try {
      const files = /* #__PURE__ */ Object.assign({

});
      const keys = Object.fromEntries(
        Object.keys(files).map((key2) => [key2.replace(/\.[cm]?[jt]s$/, ""), key2])
      );
      if (!(filepath in keys)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const mod = files[keys[filepath]];
      if (typeof mod.default !== "function") {
        throw new Error(
          `[astro-icon] "${filepath}" did not export a default function!`
        );
      }
      get$1 = mod.default;
    } catch (e) {
    }
    if (typeof get$1 === "undefined") {
      get$1 = get.bind(null, pack);
    }
    const contents = await get$1(name, inputProps);
    if (!contents) {
      throw new Error(
        `<Icon pack="${pack}" name="${name}" /> did not return an icon!`
      );
    }
    if (!/<svg/gim.test(contents)) {
      throw new Error(
        `Unable to process "<Icon pack="${pack}" name="${name}" />" because an SVG string was not returned!

Recieved the following content:
${contents}`
      );
    }
    svg = contents;
  } else {
    filepath = `/src/icons/${name}.svg`;
    try {
      const files = /* #__PURE__ */ Object.assign({});
      if (!(filepath in files)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const contents = files[filepath];
      if (!/<svg/gim.test(contents)) {
        throw new Error(
          `Unable to process "${filepath}" because it is not an SVG!

Recieved the following content:
${contents}`
        );
      }
      svg = contents;
    } catch (e) {
      throw new Error(
        `[astro-icon] Unable to load "${filepath}". Does the file exist?`
      );
    }
  }
  const { innerHTML, defaultProps } = preprocess(svg, key, { optimize });
  if (!innerHTML.trim()) {
    throw new Error(`Unable to parse "${filepath}"!`);
  }
  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) }
  };
}

const $$Astro$i = createAstro("https://thenewoil.org");
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$Icon;
  let { name, pack, title, optimize = true, class: className, ...inputProps } = Astro2.props;
  let props = {};
  if (pack) {
    name = `${pack}:${name}`;
  }
  let innerHTML = "";
  try {
    const svg = await load(name, { ...inputProps, class: className }, optimize);
    innerHTML = svg.innerHTML;
    props = svg.props;
  } catch (e) {
    {
      throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
    }
  }
  return renderTemplate`${maybeRenderHead($$result)}<svg${spreadAttributes(props)}${addAttribute(name, "astro-icon")}>${unescapeHTML((title ? `<title>${title}</title>` : "") + innerHTML)}</svg>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/node_modules/astro-icon/lib/Icon.astro");

const sprites = /* @__PURE__ */ new WeakMap();
function trackSprite(request, name) {
  let currentSet = sprites.get(request);
  if (!currentSet) {
    currentSet = /* @__PURE__ */ new Set([name]);
  } else {
    currentSet.add(name);
  }
  sprites.set(request, currentSet);
}
const warned = /* @__PURE__ */ new Set();
async function getUsedSprites(request) {
  const currentSet = sprites.get(request);
  if (currentSet) {
    return Array.from(currentSet);
  }
  if (!warned.has(request)) {
    const { pathname } = new URL(request.url);
    console.log(`[astro-icon] No sprites found while rendering "${pathname}"`);
    warned.add(request);
  }
  return [];
}

const $$Astro$h = createAstro("https://thenewoil.org");
const $$Spritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Spritesheet;
  const { optimize = true, style, ...props } = Astro2.props;
  const names = await getUsedSprites(Astro2.request);
  const icons = await Promise.all(names.map((name) => {
    return load(name, {}, optimize).then((res) => ({ ...res, name })).catch((e) => {
      {
        throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
      }
    });
  }));
  return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(`position: absolute; width: 0; height: 0; overflow: hidden; ${style ?? ""}`.trim(), "style")}${spreadAttributes({ "aria-hidden": true, ...props })} astro-icon-spritesheet>
    ${icons.map((icon) => renderTemplate`<symbol${spreadAttributes(icon.props)}${addAttribute(`${SPRITESHEET_NAMESPACE}:${icon.name}`, "id")}>${unescapeHTML(icon.innerHTML)}</symbol>`)}
</svg>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/node_modules/astro-icon/lib/Spritesheet.astro");

const $$Astro$g = createAstro("https://thenewoil.org");
const $$SpriteProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$SpriteProvider;
  const content = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}
${renderComponent($$result, "Spritesheet", $$Spritesheet, {})}`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/node_modules/astro-icon/lib/SpriteProvider.astro");

const $$Astro$f = createAstro("https://thenewoil.org");
const $$Sprite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Sprite;
  let { name, pack, title, class: className, x, y, ...inputProps } = Astro2.props;
  const props = normalizeProps(inputProps);
  if (pack) {
    name = `${pack}:${name}`;
  }
  const href = `#${SPRITESHEET_NAMESPACE}:${name}`;
  trackSprite(Astro2.request, name);
  return renderTemplate`${maybeRenderHead($$result)}<svg${spreadAttributes(props)}${addAttribute(className, "class")}${addAttribute(name, "astro-icon")}>
    ${title ? renderTemplate`<title>${title}</title>` : ""}
    <use${spreadAttributes({ "xlink:href": href, width: props.width, height: props.height, x, y })}></use>
</svg>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/node_modules/astro-icon/lib/Sprite.astro");

Object.assign($$Sprite, { Provider: $$SpriteProvider });

const $$Astro$e = createAstro("https://thenewoil.org");
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Card;
  const { title } = Astro2.props;
  const headingId = await textToHeadingId({
    text: title
  });
  return renderTemplate`${maybeRenderHead($$result)}<div class="m-auto flex flex-col gap-8 rounded-lg bg-tertiary p-8 text-center shadow-md dark:bg-tertiary-dark">
  <h1${addAttribute(headingId, "id")} class="border-none p-0 text-center">${title}</h1>
  <div class="text-lg font-bold">
    ${renderSlot($$result, $$slots["default"])}
    <div class="text-center text-base font-normal opacity-80">
      ${renderSlot($$result, $$slots["subtext"])}
    </div>
  </div>
  ${renderSlot($$result, $$slots["action"])}
</div>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/pages/404/Card.astro");

const MDXLayout$S = async function ({
  children
}) {
  const Layout = (await import('../default.e3133db4.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$S;
  content.file = file$S;
  content.url = url$S;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$S,
    url: url$S,
    content,
    frontmatter: content,
    headings: getHeadings$S(),
    "server:root": true,
    children
  });
};
const frontmatter$S = {
  "layout": "@layouts/default.astro",
  "title": "404 Page Not Found",
  "draft": false,
  "center_content": true
};
const _internal$S = {
  injectedFrontmatter: {}
};
function getHeadings$S() {
  return [];
}
function _createMdxContent$S(props) {
  const _components = Object.assign({
    p: "p"
  }, props.components);
  return createVNode($$Card, {
    title: "Error 404",
    children: [createVNode(_components.p, {
      children: "Page not found"
    }), createVNode("span", {
      slot: "subtext",
      children: createVNode(_components.p, {
        children: "There is no oil to be found here!"
      })
    }), createVNode($$Button, {
      href: "/",
      slot: "action",
      variant: "contained",
      color: "primary",
      class: "w-full flex justify-center items-center gap-2",
      children: [createVNode(_components.p, {
        children: "Go Back Home"
      }), createVNode($$Icon, {
        pack: "mdi",
        name: "house",
        class: "h-7 w-7"
      })]
    })]
  });
}
function MDXContent$S(props = {}) {
  return createVNode(MDXLayout$S, {
    ...props,
    children: createVNode(_createMdxContent$S, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$S, "astro:jsx");
__astro_tag_component__(MDXContent$S, "astro:jsx");
const url$S = "/404";
const file$S = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/404.mdx";
function rawContent$S() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$S() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$S = (props = {}) => MDXContent$S({
											...props,
											components: { Fragment, ...props.components },
										});
Content$S[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$S.layout);

const _page12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$S,
  _internal: _internal$S,
  compiledContent: compiledContent$S,
  default: Content$S,
  file: file$S,
  frontmatter: frontmatter$S,
  getHeadings: getHeadings$S,
  rawContent: rawContent$S,
  url: url$S
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$d = createAstro("https://thenewoil.org");
const $$Btc = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Btc;
  return renderTemplate`<html lang="en">
  <head>
    <title>Redirecting to Bitcoin info...</title>
    <meta http-equiv="refresh" content="0; URL=https://thenewoil.org/en/crypto#bitcoin-btc">
  ${renderHead($$result)}</head>
</html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/btc.astro");

const $$file$1 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/btc.astro";
const $$url$1 = "/btc";

const _page13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Btc,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$c = createAstro("https://thenewoil.org");
const $$Xmr = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Xmr;
  return renderTemplate`<html lang="en">
  <head>
    <title>Redirecting to Monero info...</title>
    <meta http-equiv="refresh" content="0; URL=https://thenewoil.org/en/crypto#monero-xmr">
  ${renderHead($$result)}</head>
</html>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/xmr.astro");

const $$file = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/xmr.astro";
const $$url = "/xmr";

const _page14 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Xmr,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$R = async function ({
  children
}) {
  const Layout = (await import('../default.e3133db4.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$R;
  content.file = file$R;
  content.url = url$R;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$R,
    url: url$R,
    content,
    frontmatter: content,
    headings: getHeadings$R(),
    "server:root": true,
    children
  });
};
const frontmatter$R = {
  "layout": "@layouts/default.astro",
  "title": "Home",
  "draft": false
};
const _internal$R = {
  injectedFrontmatter: {}
};
function getHeadings$R() {
  return [{
    "depth": 2,
    "slug": "sections",
    "text": "Sections"
  }, {
    "depth": 2,
    "slug": "quickstart-guides",
    "text": "QuickStart Guides"
  }];
}
function _createMdxContent$R(props) {
  const _components = Object.assign({
    p: "p",
    strong: "strong",
    em: "em",
    h2: "h2"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode($$Hero, {
      children: [createVNode("span", {
        slot: "title",
        children: createVNode(_components.p, {
          children: [createVNode("div", {
            children: "The Beginner\u2019s Guide to"
          }), "\n", createVNode("span", {
            class: "text-gradient-primary",
            children: "Data Privacy"
          }), "\n&\n", createVNode("span", {
            class: "text-gradient-primary",
            children: "Cybersecurity"
          })]
        })
      }), createVNode(_components.p, {
        children: [createVNode(_components.strong, {
          children: ["How would you like to feel - and more importantly, ", createVNode(_components.em, {
            children: "be"
          }), " - safe online again?"]
        }), " Most of us know that we could be doing better when it comes to our online habits: we reuse bad passwords, overshare personal information, and leave ourselves exposed to all kinds of risks all over the internet. But it doesn\u2019t have to be that way and it doesn\u2019t have to be hard, either."]
      }), createVNode(_components.p, {
        children: [createVNode(_components.em, {
          children: "Welcome to The New Oil."
        }), " This site is designed to help readers take back control of their data and regain their privacy online. ", createVNode(_components.strong, {
          children: "Are you a programmer, sysadmin, networking expert, or hacker? If you answered \u201Cno,\u201D you\u2019re in the right place!"
        }), " This site is not aimed at tech experts. If you know how to download an app on your phone, how to sign up for an email account, or what a password is, you\u2019ve got the qualifications to tackle the advice and content on this site."]
      }), createVNode(_components.p, {
        children: ["Whether you\u2019re looking to keep yourself safe from identity theft and common hacks, whether you simply object to mass surveillance, or anything in between, this site will help you learn the basics about protecting your identity, your safety, and your data in a way that\u2019s accessible and achievable. ", createVNode(_components.strong, {
          children: "Welcome to privacy made easy."
        })]
      })]
    }), "\n", createVNode($$Section, {
      children: [createVNode(_components.h2, {
        id: "sections",
        children: "Sections"
      }), createVNode(_components.p, {
        children: "Guides that cover security, privacy, and anonymity grouped by their importance."
      }), createVNode($$Cards, {
        items: sections,
        color: "primary"
      })]
    }), "\n", createVNode($$Section, {
      children: [createVNode(_components.h2, {
        id: "quickstart-guides",
        children: "QuickStart Guides"
      }), createVNode(_components.p, {
        children: "Guides that are frequently shared in response to popular questions."
      }), createVNode($$Cards, {
        items: guides,
        color: "secondary"
      })]
    })]
  });
}
function MDXContent$R(props = {}) {
  return createVNode(MDXLayout$R, {
    ...props,
    children: createVNode(_createMdxContent$R, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$R, "astro:jsx");
__astro_tag_component__(MDXContent$R, "astro:jsx");
const url$R = "/en";
const file$R = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/index.mdx";
function rawContent$R() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$R() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$R = (props = {}) => MDXContent$R({
											...props,
											components: { Fragment, ...props.components },
										});
Content$R[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$R.layout);

const _page15 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$R,
  _internal: _internal$R,
  compiledContent: compiledContent$R,
  default: Content$R,
  file: file$R,
  frontmatter: frontmatter$R,
  getHeadings: getHeadings$R,
  rawContent: rawContent$R,
  url: url$R
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$Q = async function ({
  children
}) {
  const Layout = (await import('../privacy-policy.9c852cde.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$Q;
  content.file = file$Q;
  content.url = url$Q;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$Q,
    url: url$Q,
    content,
    frontmatter: content,
    headings: getHeadings$Q(),
    "server:root": true,
    children
  });
};
const frontmatter$Q = {
  "layout": "@layouts/privacy-policy.astro",
  "title": "Privacy Policy",
  "draft": false
};
const _internal$Q = {
  injectedFrontmatter: {}
};
function getHeadings$Q() {
  return [{
    "depth": 1,
    "slug": "privacy-policy",
    "text": "Privacy Policy"
  }, {
    "depth": 2,
    "slug": "what-data-is-collected-and-why",
    "text": "What data is collected and why"
  }, {
    "depth": 3,
    "slug": "what-data-is-collected",
    "text": "What data is collected"
  }, {
    "depth": 3,
    "slug": "how-we-use-this-data",
    "text": "How we use this data"
  }, {
    "depth": 2,
    "slug": "when-is-your-data-collected-accessed-and-shared",
    "text": "When is your data collected, accessed, and shared"
  }, {
    "depth": 3,
    "slug": "when-do-we-collect-your-data",
    "text": "When do we collect your data"
  }, {
    "depth": 3,
    "slug": "who-has-access-to-your-data",
    "text": "Who has access to your data"
  }, {
    "depth": 3,
    "slug": "when-is-your-data-shared",
    "text": "When is your data shared"
  }, {
    "depth": 2,
    "slug": "where-is-your-data-stored-and-how-do-we-protect-it",
    "text": "Where is your data stored and how do we protect it"
  }, {
    "depth": 3,
    "slug": "where-is-your-data-stored",
    "text": "Where is your data stored"
  }, {
    "depth": 3,
    "slug": "how-do-we-protect-your-data",
    "text": "How do we protect your data"
  }, {
    "depth": 2,
    "slug": "gdpr-the-general-data-protection-regulation-compliance",
    "text": "GDPR (The General Data Protection Regulation) Compliance"
  }, {
    "depth": 3,
    "slug": "europeans-rights-under-the-gdpr",
    "text": "European\u2019s rights under the GDPR"
  }, {
    "depth": 3,
    "slug": "gdpr-contact",
    "text": "GDPR Contact"
  }, {
    "depth": 3,
    "slug": "finding-a-supervisory-authority",
    "text": "Finding a supervisory authority"
  }, {
    "depth": 2,
    "slug": "ccpa-california-consumer-privacy-act-compliance",
    "text": "CCPA (California Consumer Privacy Act) Compliance"
  }, {
    "depth": 3,
    "slug": "california-consumerss-rights-under-the-ccpa",
    "text": "California Consumers\u2019s rights under the CCPA"
  }, {
    "depth": 3,
    "slug": "ccpa-contact",
    "text": "CCPA Contact"
  }, {
    "depth": 3,
    "slug": "file-a-ccpa-complaint",
    "text": "File a CCPA Complaint"
  }, {
    "depth": 2,
    "slug": "communications-with-the-new-oil-media-llc",
    "text": "Communications with The New Oil Media LLC"
  }, {
    "depth": 3,
    "slug": "processing-of-contact-information",
    "text": "Processing of Contact Information"
  }, {
    "depth": 3,
    "slug": "retention-of-the-communications",
    "text": "Retention of The Communications"
  }, {
    "depth": 3,
    "slug": "confidentiality-of-the-communications",
    "text": "Confidentiality of The Communications"
  }, {
    "depth": 3,
    "slug": "security-of-the-communications",
    "text": "Security of The Communications"
  }, {
    "depth": 2,
    "slug": "modifications-to-the-privacy-policy",
    "text": "Modifications to the Privacy Policy"
  }, {
    "depth": 2,
    "slug": "questions--contact",
    "text": "Questions & Contact"
  }, {
    "depth": 2,
    "slug": "namecheap",
    "text": "NameCheap"
  }, {
    "depth": 3,
    "slug": "websitelinks",
    "text": "Website/links"
  }, {
    "depth": 3,
    "slug": "emails",
    "text": "Emails"
  }, {
    "depth": 3,
    "slug": "other",
    "text": "Other"
  }];
}
function _createMdxContent$Q(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    h2: "h2",
    h3: "h3",
    ul: "ul",
    li: "li",
    a: "a",
    ol: "ol",
    em: "em"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "privacy-policy",
      children: "Privacy Policy"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Creation Date: M10/D17/Y21 (October 17, 2021)"
      }), " | ", createVNode(_components.strong, {
        children: "Modification Date: M05/D27/Y22 (June 12, 2022)"
      })]
    }), "\n", createVNode(_components.p, {
      children: "This privacy policy will explain what information is collected when you access and make use of this website. This privacy policy will explain the following: the uses of the information, the way we secure and protect such information, who has access to this information, the location where this information is stored, and when the information is collected. This policy attempts to be more comprehensive and simplified than our hosting provider\u2019s (Namecheap, Inc.) privacy policy."
    }), "\n", createVNode(_components.h2, {
      id: "what-data-is-collected-and-why",
      children: "What data is collected and why"
    }), "\n", createVNode(_components.h3, {
      id: "what-data-is-collected",
      children: "What data is collected"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "The IP address (Internet Protocol address) of the user/visitor."
      }), "\n", createVNode(_components.li, {
        children: "The geographical location of the user/visitor (based on IP address)."
      }), "\n", createVNode(_components.li, {
        children: "The visit duration of how long the user/visitor has stayed on the website."
      }), "\n", createVNode(_components.li, {
        children: "The OS (operating system) of the user/visitor."
      }), "\n", createVNode(_components.li, {
        children: "The browser type of the user/visitor."
      }), "\n", createVNode(_components.li, {
        children: "The referrer URL (the website the user came from) of the user/visitor."
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "how-we-use-this-data",
      children: "How we use this data"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "To understand how visitors access the site to better optimise the website and services of the hosting provider (for example, do we have a lot of mobile visitors? What browser engine are people using?)."
      }), "\n", createVNode(_components.li, {
        children: "To understand how the site is performing (if we are seeing more or less visitors on average)."
      }), "\n", createVNode(_components.li, {
        children: "To diagnose and debug technical problems and errors."
      }), "\n", createVNode(_components.li, {
        children: "To defending & protect the website and services of the hosting provider from abuse."
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "when-is-your-data-collected-accessed-and-shared",
      children: "When is your data collected, accessed, and shared"
    }), "\n", createVNode(_components.h3, {
      id: "when-do-we-collect-your-data",
      children: "When do we collect your data"
    }), "\n", createVNode(_components.p, {
      children: ["The New Oil Media LLC likes to adhere to a \u201Cthe less we know the better\u201D policy, meaning that we try to collect as little user/visitor information as possible. When you access this website, the hosting provider (Namecheap, Inc.) will collect the data listed above. The New Oil Media LLC does not have control over this collection process, and therefore cannot reduce or expand it. The New Oil Media LLC highly encourages you to visit this website with a ", createVNode(_components.a, {
        href: "/guides/less-important/vpns",
        children: "VPN"
      }), " or ", createVNode(_components.a, {
        href: "/guides/most-important/browser#tor-browser",
        children: "Tor"
      }), " connection to avoid this data collection. The data collected by the hosting provider is - to our knowledge - limited to your access and use of this website and does not use any tracking technologies such as cookies, pixels, or FLoC to track or identify the user/visters of our website or their activities on other websites."]
    }), "\n", createVNode(_components.h3, {
      id: "who-has-access-to-your-data",
      children: "Who has access to your data"
    }), "\n", createVNode(_components.p, {
      children: "Both Namecheap, Inc. and The New Oil Media LLC have access to this information."
    }), "\n", createVNode(_components.p, {
      children: "The New Oil Media LLC is primarily interested in the number of unique visits. While we do occassionally check the device and browser information, we do not record this information nor do we analyze this data in any kind of depth. We do not pay any attention to any of the other information listed above. None of The New Oil Media, LLC\u2019s members or volunteers ever copies, screenshots, or in other ways record this data, except for in the annual transparency report (see \u201CWhen is your data shared\u201D below). The only data recorded is the unique visitor total, which is ."
    }), "\n", createVNode(_components.h3, {
      id: "when-is-your-data-shared",
      children: "When is your data shared"
    }), "\n", createVNode(_components.p, {
      children: "The New Oil Media LLC and its members & volunteers will never share any of the data listed above except in the following conditions:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "The total unique number of visitors each year is shared in January as part of The New Oil Media, LLC\u2019s annual transparency report."
      }), "\n", createVNode(_components.li, {
        children: "The New Oil Media LLC is US based corporation and will comply with any legally binding orders from law enforcement or government agency for user data. (Please note: given that the hosting provider collects the same data, law enforcement agencies are much more likely to approach them.)"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "where-is-your-data-stored-and-how-do-we-protect-it",
      children: "Where is your data stored and how do we protect it"
    }), "\n", createVNode(_components.h3, {
      id: "where-is-your-data-stored",
      children: "Where is your data stored"
    }), "\n", createVNode(_components.p, {
      children: "Your data is stored with Namecheap, Inc. which is based in the US, but has data centres in the US, EU, UK. We do not control those data centres and therefore do not have control over the security of your data. The specific locations of those data centres and servers are as followed."
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "The European data centre is based in the Netherlands, Amsterdam."
      }), "\n", createVNode(_components.li, {
        children: "The United Kingdom data centre is located close to Nottinghamn, in the Midlands."
      }), "\n", createVNode(_components.li, {
        children: "The United States data centre is located in Phoenix, Arizona."
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "how-do-we-protect-your-data",
      children: "How do we protect your data"
    }), "\n", createVNode(_components.p, {
      children: "As stated in the text above, \u201Cwe do not control those data centres and there for do not have control over the security of your data\u201C. However, The New Oil Media LLC attemps to help protact the information of it\u2019s users/visitors as best as possible. The New Oil Media LLC and its members & volunteers all use the most modern and up-to-date available security features (e.g. strong, unique passwords and two-step verification/authentication to protect online accounts from unauthorized access and abuse). All other services are also hardened in accordance with recommendations from the system administrator and relevant/trusted authorities including government bodies and policymakers."
    }), "\n", createVNode(_components.p, {
      children: "Additionally, The New Oil Media LLC deletes all analytics logs manually at the start of each month. While we cannot ensure that Namecheap respects this deletion, we can ensure that all collected data is deleted on our end. The only information we retain is total unique visitors in accordnace with the above stated goals and uses."
    }), "\n", createVNode(_components.h2, {
      id: "gdpr-the-general-data-protection-regulation-compliance",
      children: "GDPR (The General Data Protection Regulation) Compliance"
    }), "\n", createVNode(_components.h3, {
      id: "europeans-rights-under-the-gdpr",
      children: "European\u2019s rights under the GDPR"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["The Right to Access. (", createVNode(_components.em, {
          children: ["Article 15 of the GDPR, ", createVNode(_components.a, {
            href: "https://gdpr.eu/article-15-right-of-access/",
            children: "link"
          })]
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["The Right to Rectification. (", createVNode(_components.em, {
          children: ["Article 16 of the GDPR, ", createVNode(_components.a, {
            href: "https://gdpr.eu/article-16-right-to-rectification/",
            children: "link"
          })]
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["The Right to Erasure. (", createVNode(_components.em, {
          children: ["Article 17 of the GDPR. ", createVNode(_components.a, {
            href: "https://gdpr.eu/article-17-right-to-be-forgotten/",
            children: "link"
          })]
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["The Right to Restrict Processing. (", createVNode(_components.em, {
          children: ["Article 18 of the GDPR, ", createVNode(_components.a, {
            href: "https://gdpr.eu/article-18-right-to-restriction-of-processing/",
            children: "link"
          })]
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["The Right to Data Portability. (", createVNode(_components.em, {
          children: ["Article 20 of the GDPR, ", createVNode(_components.a, {
            href: "https://gdpr.eu/article-20-right-to-data-portability/",
            children: "link"
          })]
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["The Right to Object. (", createVNode(_components.em, {
          children: ["Article 21 of the GDPR, ", createVNode(_components.a, {
            href: "https://gdpr.eu/article-21-right-to-object/",
            children: "link"
          })]
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["The Right to Lodge a Complaint with a Supervisory Authority. (", createVNode(_components.em, {
          children: ["Article 77 of the GDPR, ", createVNode(_components.a, {
            href: "https://gdpr.eu/article-77-data-subjects-right-to-lodge-a-complaint/",
            children: "link"
          })]
        }), ")"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "The rights above are for European citizens only. If you are not a European citizen, then please refer to your country\u2019s privacy laws and regulations for further help."
    }), "\n", createVNode(_components.h3, {
      id: "gdpr-contact",
      children: "GDPR Contact"
    }), "\n", createVNode(_components.p, {
      children: "European Data Protection Board"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Website: ", createVNode(_components.a, {
          href: "https://edpb.europa.eu/edpb_en",
          children: "https://edpb.europa.eu/edpb_en"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["Email: ", createVNode(_components.a, {
          href: "mailto:edpb@edpb.europa.eu",
          children: "edpb@edpb.europa.eu"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["Wiki: ", createVNode(_components.a, {
          href: "https://en.wikipedia.org/wiki/European_Data_Protection_Board",
          children: "https://en.wikipedia.org/wiki/European_Data_Protection_Board"
        })]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "European Data Protection Supervisor"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Website: ", createVNode(_components.a, {
          href: "https://edps.europa.eu/_en",
          children: "https://edps.europa.eu/_en"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["Email: ", createVNode(_components.a, {
          href: "mailto:edpb@edpb.europa.eu",
          children: "edpb@edpb.europa.eu"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["wiki: ", createVNode(_components.a, {
          href: "https://en.wikipedia.org/wiki/European_Data_Protection_Supervisor",
          children: "https://en.wikipedia.org/wiki/European_Data_Protection_Supervisor"
        })]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "finding-a-supervisory-authority",
      children: "Finding a supervisory authority"
    }), "\n", createVNode(_components.p, {
      children: ["Please use the following link to find your country\u2019s supervisory authority ", createVNode(_components.a, {
        href: "https://edpb.europa.eu/about-edpb/board/members_en",
        children: "https://edpb.europa.eu/about-edpb/board/members_en"
      })]
    }), "\n", createVNode(_components.h2, {
      id: "ccpa-california-consumer-privacy-act-compliance",
      children: "CCPA (California Consumer Privacy Act) Compliance"
    }), "\n", createVNode(_components.h3, {
      id: "california-consumerss-rights-under-the-ccpa",
      children: "California Consumers\u2019s rights under the CCPA"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["The Right to Know. (", createVNode(_components.em, {
          children: ["selection C, paragraph 1-6, ", createVNode(_components.a, {
            href: "https://www.oag.ca.gov/privacy/ccpa#sectionc",
            children: "link"
          })]
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["The Right to Delete. (", createVNode(_components.em, {
          children: ["selection E, paragraph 1-8, ", createVNode(_components.a, {
            href: "https://www.oag.ca.gov/privacy/ccpa#sectione",
            children: "link"
          })]
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["The Right to Opt-Out. (", createVNode(_components.em, {
          children: ["selection B, paragraph 1-8, ", createVNode(_components.a, {
            href: "https://www.oag.ca.gov/privacy/ccpa#sectionb",
            children: "link"
          })]
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["The Right to Non-Discrimination. (", createVNode(_components.em, {
          children: ["selection F, paragraph 1-1, ", createVNode(_components.a, {
            href: "https://www.oag.ca.gov/privacy/ccpa#sectionf",
            children: "link"
          })]
        }), ")"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "The rights above are for California Consumers only. If you are not a California Consumer, then please refer to your your state\u2019s privacy laws and regulations for further help."
    }), "\n", createVNode(_components.h3, {
      id: "ccpa-contact",
      children: "CCPA Contact"
    }), "\n", createVNode(_components.p, {
      children: "Attorney General"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Website: ", createVNode(_components.a, {
          href: "https://www.oag.ca.gov/privacy/ccpa",
          children: "https://www.oag.ca.gov/privacy/ccpa"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["Form: ", createVNode(_components.a, {
          href: "https://www.oag.ca.gov/contact/general-comment-question-or-complaint-form",
          children: "https://www.oag.ca.gov/contact/general-comment-question-or-complaint-form"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["wiki: ", createVNode(_components.a, {
          href: "https://en.wikipedia.org/wiki/Attorney_General_of_California",
          children: "https://en.wikipedia.org/wiki/Attorney_General_of_California"
        })]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "file-a-ccpa-complaint",
      children: "File a CCPA Complaint"
    }), "\n", createVNode(_components.p, {
      children: ["Please use the following link to file a CCPA (California Consumer Privacy Act) complaint with the attorney general\u2019s office in California: ", createVNode(_components.a, {
        href: "https://oag.ca.gov/contact/consumer-complaint-against-business-or-company",
        children: "https://oag.ca.gov/contact/consumer-complaint-against-business-or-company"
      })]
    }), "\n", createVNode(_components.h2, {
      id: "communications-with-the-new-oil-media-llc",
      children: "Communications with The New Oil Media LLC"
    }), "\n", createVNode(_components.p, {
      children: "Your communications with The New Oil Media LLC such as support requests, bug reports, feature requests, personal question, etc will be covered here."
    }), "\n", createVNode(_components.h3, {
      id: "processing-of-contact-information",
      children: "Processing of Contact Information"
    }), "\n", createVNode(_components.p, {
      children: "Processing of this information is in our legitimate interest. We process and keep a record of your communications with The New Oil Media LLC to better protect ourselves legally, to troubleshoot and improve security, to improve the site based on user questions, support, & feedback and to better manage and coordinate with members & volunteers from The New Oil Media LLC."
    }), "\n", createVNode(_components.h3, {
      id: "retention-of-the-communications",
      children: "Retention of The Communications"
    }), "\n", createVNode(_components.p, {
      children: "All communications with The New Oil Media LLC in an official capacity are retained indefinitely unless otherwise noted. If you are communicating with one of The New Oil Media, LLC\u2019s members or volunteers in a personal capacity, then data retention practices may differ. All communications in official capacity with The New Oil Media LLC may be set to expire by the sender of said message. The sender of said message may also request to have their official communications with The New Oil Media, LLC\u2019s be deleted (by sending an email to one of the email addreses below)."
    }), "\n", createVNode(_components.h3, {
      id: "confidentiality-of-the-communications",
      children: "Confidentiality of The Communications"
    }), "\n", createVNode(_components.p, {
      children: "Communications with The New Oil Media LLC and its members & volunteers are kept with the utmost confidentiality and shall not be shared with anyone else besides The New Oil Media LLC and its members & volunteers except under two conditions. The first is with express, written consent of the message sender. The second is if The New Oil Media, LLC\u2019s message holder(s) are legally obliged to do so by a valid court order of their respective jurisdictions. Consulting communications will not be shared with any internal members of The New Oil LLC without a valid legal order or the consent of the client, as outlined in the consulting contract. All official communications with The New Oil Media LLC via email are stored with zero access (zero knowledge) email provider(s) to better help protect our communications."
    }), "\n", createVNode(_components.h3, {
      id: "security-of-the-communications",
      children: "Security of The Communications"
    }), "\n", createVNode(_components.p, {
      children: "All of The New Oil Media, LLC\u2019s members & volunteers use all available security measures. All communications by default should not be considered End-to-End Encrypted, but we provide different options to users (e.g. pgp, different email providers to use native encryption with, etc) to better help keep all communications between you and The New Oil Media LLC as private & secure as possible and to also comply with your preferences and threat models. Please refer to the privacy policies of these providers for additional information."
    }), "\n", createVNode(_components.h2, {
      id: "modifications-to-the-privacy-policy",
      children: "Modifications to the Privacy Policy"
    }), "\n", createVNode(_components.p, {
      children: "The New Oil Media LLC reserves the right to change this Policy at any time. We will never knowingly reduce your rights under this Policy, and if we are made aware of any addition to data collection or reduction of rights imposed by Namecheap, Inc. then we will do our best to advise and announce any changes to our privacy policy on any of our social platforms. Please note: we cannot notify individuals about every change made to this policy, because we do not collect contact information about our website visitors/users without them willingly providing it to us. We do however reserve the right to not publicly announce any minor changes to this policy, so for that reason we recommend you check this policy from time to time to see if any changes were made."
    }), "\n", createVNode(_components.h2, {
      id: "questions--contact",
      children: "Questions & Contact"
    }), "\n", createVNode(_components.p, {
      children: ["For any legal request(s), question(s), or concern(s) in regards to this policy or your data, please email us a ", createVNode(_components.a, {
        href: "mailto:legal@thenewoil.org",
        children: "legal@thenewoil.org"
      }), " for assistance in regards to said request(s) or concern(s) about this policy or your data."]
    }), "\n", createVNode(_components.h2, {
      id: "namecheap",
      children: "NameCheap"
    }), "\n", createVNode(_components.p, {
      children: "If you would like to contact Namecheap, Inc. regarding their privacy practices, then you can do so via any of the links/emails listed below."
    }), "\n", createVNode(_components.h3, {
      id: "websitelinks",
      children: "Website/links"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Website: ", createVNode(_components.a, {
          href: "https://www.namecheap.com/",
          children: "https://www.namecheap.com/"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["Legal: ", createVNode(_components.a, {
          href: "https://www.namecheap.com/legal/",
          children: "https://www.namecheap.com/legal/"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["Privacy Policy: ", createVNode(_components.a, {
          href: "https://www.namecheap.com/legal/general/privacy-policy/",
          children: "https://www.namecheap.com/legal/general/privacy-policy/"
        })]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "emails",
      children: "Emails"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Legal: ", createVNode(_components.a, {
          href: "mailto:legalandabuse@namecheap.com",
          children: "legalandabuse@namecheap.com"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["DPO: ", createVNode(_components.a, {
          href: "mailto:dpo@namecheap.com",
          children: "dpo@namecheap.com"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["Support: ", createVNode(_components.a, {
          href: "mailto:support@namecheap.com",
          children: "support@namecheap.com"
        })]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "other",
      children: "Other"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Live Chat: ", createVNode(_components.a, {
          href: "https://www.namecheap.com/help-center/live-chat/",
          children: "https://www.namecheap.com/help-center/live-chat/"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["Ticket: ", createVNode(_components.a, {
          href: "https://support.namecheap.com/index.php?/Tickets/Submit",
          children: "https://support.namecheap.com/index.php?/Tickets/Submit"
        })]
      }), "\n", createVNode(_components.li, {
        children: ["Knowledgebase: ", createVNode(_components.a, {
          href: "https://www.namecheap.com/Support/Knowledgebase/",
          children: "https://www.namecheap.com/Support/Knowledgebase/"
        })]
      }), "\n"]
    })]
  });
}
function MDXContent$Q(props = {}) {
  return createVNode(MDXLayout$Q, {
    ...props,
    children: createVNode(_createMdxContent$Q, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$Q, "astro:jsx");
__astro_tag_component__(MDXContent$Q, "astro:jsx");
const url$Q = "/en/privacy-policy";
const file$Q = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/privacy-policy.mdx";
function rawContent$Q() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$Q() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$Q = (props = {}) => MDXContent$Q({
											...props,
											components: { Fragment, ...props.components },
										});
Content$Q[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$Q.layout);

const _page16 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$Q,
  _internal: _internal$Q,
  compiledContent: compiledContent$Q,
  default: Content$Q,
  file: file$Q,
  frontmatter: frontmatter$Q,
  getHeadings: getHeadings$Q,
  rawContent: rawContent$Q,
  url: url$Q
}, Symbol.toStringTag, { value: 'Module' }));

const BlogPages = [
	{
		slug: "safe-shopping-2023-edition",
		created: "Safe Shopping: 2023 Edition",
		title: "Safe Shopping: 2023 Edition"
	},
	{
		slug: "the-new-oil-hidden-service-now-available",
		created: "2023-10-29T22:32:07Z",
		title: "The New Oil Hidden Service Now Available!"
	},
	{
		slug: "bypassing-most-but-not-all-paywalls",
		created: "2023-10-14T18:07:30Z",
		title: "Bypassing Most (But Not All) Paywalls"
	},
	{
		slug: "making-privacy-tools-worth-it-part-2-the-developers-and-community",
		created: "2023-10-08T18:44:59Z",
		title: "Making Privacy Tools Worth It Part 2: The Developers (& Community)"
	},
	{
		slug: "making-privacy-tools-worth-it-part-1-the-end-user",
		created: "2023-10-01T17:48:28Z",
		title: "Making Privacy Tools Worth It Part 1: The End User"
	},
	{
		slug: "2023-proton-vpn-review",
		created: "2023-09-24T22:36:01Z",
		title: "2023 Proton VPN Review"
	},
	{
		slug: "the-best-password-managers-in-2023",
		created: "2023-09-09T22:00:26Z",
		title: "The Best Password Managers in 2023"
	},
	{
		slug: "2023-review-threema",
		created: "2023-09-03T00:18:24Z",
		title: "2023 Review: Threema"
	},
	{
		slug: "parenting-and-privacy-with-the-privacy-dad",
		created: "2023-08-06T23:59:29Z",
		title: "Parenting & Privacy with The Privacy Dad"
	},
	{
		slug: "2023-review-anonaddy-and-simplelogin",
		created: "2023-07-24T02:10:59Z",
		title: "2023 Review: AnonAddy & SimpleLogin"
	},
	{
		slug: "finding-balance",
		created: "2023-07-16T23:10:09Z",
		title: "Finding Balance"
	},
	{
		slug: "prime-day-is-this-week-fdmg",
		created: "2023-07-08T17:16:44Z",
		title: "Prime Day is This Week. Here’s Why You Should Stop Using Amazon"
	},
	{
		slug: "death-of-a-server",
		created: "2023-06-04T23:41:33Z",
		title: "Death of a Server"
	},
	{
		slug: "2023-review-mullvad-vpn",
		created: "2023-05-30T01:00:41Z",
		title: "2023 Review: Mullvad VPN"
	},
	{
		slug: "revisiting-financial-privacy",
		created: "2023-05-22T02:52:05Z",
		title: "Revisiting Financial Privacy"
	},
	{
		slug: "2023-review-cloud-storage-solutions",
		created: "2023-05-16T02:49:44Z",
		title: "2023 Review: Cloud Storage Solutions"
	},
	{
		slug: "a-long-overdue-update",
		created: "2023-05-07T16:07:43Z",
		title: "A Long Overdue Update"
	},
	{
		slug: "2023-review-the-safing-private-network-spn",
		created: "2023-04-01T20:13:02Z",
		title: "2023 Review: The Safing Private Network (SPN)"
	},
	{
		slug: "2023-review-skiff-mail",
		created: "2023-03-19T17:14:25Z",
		title: "2023 Review: Skiff Mail"
	},
	{
		slug: "the-not-so-scary-truth-behind-intel-me",
		created: "2023-03-04T00:38:57Z",
		title: "The (Not So) Scary Truth Behind Intel ME"
	},
	{
		slug: "book-review-stuff-they-dont-want-you-to-know-by-ben-bowlin-matt-frederick-and",
		created: "2023-02-19T19:39:13Z",
		title: "Book Review: _Stuff They Don't Want You To know by Ben Bowlin_, Matt Frederick, & Noel Brown"
	},
	{
		slug: "custom-domains-101",
		created: "2023-02-05T01:32:57Z",
		title: "Custom Domains 101"
	},
	{
		slug: "2023-review-ivpn",
		created: "2023-01-29T17:27:46Z",
		title: "2023 Review: IVPN"
	},
	{
		slug: "new-years-checkup-r3c3",
		created: "2023-01-22T16:51:47Z",
		title: "New Year's Checkup"
	},
	{
		slug: "2022-review-mysudo",
		created: "2022-10-09T15:36:07Z",
		title: "2022 Review: MySudo"
	},
	{
		slug: "how-to-read-a-privacy-policy",
		created: "2022-10-17T01:33:37Z",
		title: "How to Read a Privacy Policy"
	},
	{
		slug: "2022-review-wire",
		created: "2022-10-22T16:56:46Z",
		title: "2022 Review: Wire"
	},
	{
		slug: "safe-shopping-2022-edition",
		created: "2022-11-20T16:34:10Z",
		title: "Safe Shopping: 2022 Edition"
	},
	{
		slug: "book-review-_the-age-of-surveillance-capitalism_-by-shoshana-zuboff",
		created: "2022-11-26T23:40:15Z",
		title: "Book Review: _The Age of Surveillance Capitalism_ by Shoshana Zuboff"
	},
	{
		slug: "the-sandbox-is-a-lie",
		created: "2022-12-04T21:35:20Z",
		title: "The Sandbox is a Lie"
	},
	{
		slug: "twitter-may-be-hacked-and-nobodys-talking-about-it",
		created: "2022-12-13T02:23:05Z",
		title: "Twitter May Be Hacked and Nobody's Talking About It"
	},
	{
		slug: "book-review-weapons-of-math-destruction-by-cathy-oneil",
		created: "2023-01-01T18:21:16Z",
		title: "Book Review: _Weapons of Math Destruction_ by Cathy O'Neil"
	},
	{
		slug: "transparency-report-2022-and-goals-for-2023",
		created: "2023-01-07T21:24:15Z",
		title: "Transparency Report: 2022 (And Goals for 2023)"
	},
	{
		slug: "2022-review-aegis-and-ravio",
		created: "2023-01-14T22:59:02Z",
		title: "2022 Review: Aegis & Raivo"
	},
	{
		slug: "lets-talk-about-roe-v-wade",
		created: "2022-06-25T18:18:39Z",
		title: "Let's Talk About *Roe v Wade*"
	},
	{
		slug: "2022-review-signal-messenger",
		created: "2022-07-03T01:25:24Z",
		title: "2022 Review: Signal Messenger"
	},
	{
		slug: "prime-day-is-this-week",
		created: "2022-07-10T15:38:32Z",
		title: "Prime Day is This Week. Here's Why You Should Stop Using Amazon"
	},
	{
		slug: "2022-review-protonmail",
		created: "2022-07-16T18:01:09Z",
		title: "2022 Review: ProtonMail"
	},
	{
		slug: "the-new-oil-has-a-merch-store-now",
		created: "2022-08-06T17:31:34Z",
		title: "The New Oil Has a Merch Store Now"
	},
	{
		slug: "2022-review-threema",
		created: "2022-08-27T16:45:48Z",
		title: "2022 Review: Threema"
	},
	{
		slug: "your-loved-ones-are-betraying-your-privacy",
		created: "2022-09-03T15:16:29Z",
		title: "Your Loved Ones Are Betraying Your Privacy"
	},
	{
		slug: "2022-review-bitwarden-and-keepass",
		created: "2022-09-10T20:00:35Z",
		title: "2022 Review: Bitwarden & KeePass"
	},
	{
		slug: "2022-review-proton-vpn",
		created: "2022-09-26T21:22:04Z",
		title: "2022 Review: ProtonVPN"
	},
	{
		slug: "the-rising-standard-of-tech-literacy",
		created: "2022-10-03T01:14:25Z",
		title: "The Rising Standard of Tech Literacy"
	},
	{
		slug: "why-to-care-about-privacy-after-years-of-sharing-data",
		created: "2022-04-03T00:08:47Z",
		title: "Why to Care About Privacy After Years of Sharing Data"
	},
	{
		slug: "2022-review-anonaddy-and-simplelogin",
		created: "2022-04-09T19:58:05Z",
		title: "2022 Review: AnonAddy & SimpleLogin"
	},
	{
		slug: "haven-self-host-a-private-blog-instead-of-using-facebook",
		created: "2022-04-16T21:55:28Z",
		title: "Haven: \"Self-Host a Private Blog Instead of Using Facebook”"
	},
	{
		slug: "2022-review-session",
		created: "2022-04-23T14:42:30Z",
		title: "2022 Review: Session"
	},
	{
		slug: "ctemplar-is-dead-aka-lessons-about-email-sovereignty",
		created: "2022-04-30T14:06:08Z",
		title: "CTemplar is Dead (AKA Lessons About Email Sovereignty)"
	},
	{
		slug: "disinformation-part-1",
		created: "2022-05-07T18:06:13Z",
		title: "Disinformation, Part 1"
	},
	{
		slug: "disinformation-part-2",
		created: "2022-05-23T14:12:47Z",
		title: "Disinformation Part 2"
	},
	{
		slug: "2022-review-mullvad",
		created: "2022-05-29T20:04:40Z",
		title: "2022 Review: Mullvad VPN"
	},
	{
		slug: "daily-driving-the-pinephone-pro",
		created: "2022-06-04T17:37:43Z",
		title: "Daily Driving the Pinephone Pro"
	},
	{
		slug: "upping-your-privacy-game",
		created: "2022-06-18T12:31:19Z",
		title: "Upping Your Privacy Game"
	},
	{
		slug: "data-privacy-week-spotlight-backups",
		created: "2022-01-26T19:31:28Z",
		title: "Data Privacy Week Spotlight: Backups"
	},
	{
		slug: "data-privacy-week-spotlight-backups-ngp6",
		created: "2022-01-27T19:41:35Z",
		title: "Data Privacy Week Spotlight: Disinformation"
	},
	{
		slug: "data-privacy-week-day-spotlight-overrated-tools",
		created: "2022-01-28T18:08:01Z",
		title: "Data Privacy Week/Day Spotlight: Overrated Tools"
	},
	{
		slug: "relationships-101",
		created: "2022-02-05T19:52:14Z",
		title: "Relationships 101"
	},
	{
		slug: "aint-nobody-perfect",
		created: "2022-02-09T18:11:46Z",
		title: "Ain't Nobody Perfect"
	},
	{
		slug: "valentines-day-qanda",
		created: "2022-02-20T17:25:38Z",
		title: "Valentine's Day Q&A"
	},
	{
		slug: "physical-home-security",
		created: "2022-03-05T20:02:46Z",
		title: "Physical Home Security"
	},
	{
		slug: "2022-review-ctemplar",
		created: "2022-03-12T16:31:52Z",
		title: "2022 Review: CTemplar"
	},
	{
		slug: "how-to-make-people-care-about-privacy",
		created: "2022-03-19T19:08:34Z",
		title: "How to Make People Care About Privacy"
	},
	{
		slug: "one-week-of-lineageos",
		created: "2022-03-27T21:35:28Z",
		title: "One Week of LineageOS"
	},
	{
		slug: "safe-shopping-2021-edition",
		created: "2021-11-20T15:46:46Z",
		title: "Safe Shopping: 2021 Edition"
	},
	{
		slug: "privacy-can-protect-you-from-manipulation",
		created: "2021-11-27T18:22:18Z",
		title: "Privacy Can Protect You From Manipulation"
	},
	{
		slug: "bad-gift-ideas-for-privacy",
		created: "2021-12-05T17:45:58Z",
		title: "Bad Gift Ideas for Privacy"
	},
	{
		slug: "i-doxxed-myself-this-week",
		created: "2021-12-11T19:57:37Z",
		title: "I Doxxed Myself This Week"
	},
	{
		slug: "some-christmas-gift-tips",
		created: "2021-12-25T20:58:23Z",
		title: "Some Christmas Gift Tips"
	},
	{
		slug: "transparency-report-2021-and-goals-for-2022",
		created: "2022-01-01T18:34:53Z",
		title: "Transparency Report: 2021 (And Goals for 2022)"
	},
	{
		slug: "reducing-streaming-services-tracking",
		created: "2022-01-15T17:39:30Z",
		title: "Reducing Streaming Services' Tracking"
	},
	{
		slug: "2022-review-ivpn",
		created: "2022-01-22T20:22:00Z",
		title: "2022 Review: IVPN"
	},
	{
		slug: "data-privacy-week-spotlight-settings",
		created: "2022-01-24T20:44:23Z",
		title: "Data Privacy Week Spotlight: Settings"
	},
	{
		slug: "data-privacy-week-spotlight-mobile-habits",
		created: "2022-01-25T17:58:08Z",
		title: "Data Privacy Week Spotlight: Mobile Habits"
	},
	{
		slug: "things-i-wish-id-known-done-differently",
		created: "2021-09-05T15:24:31Z",
		title: "Things I Wish I'd Known/Done Differently"
	},
	{
		slug: "backup-solutions-roundup",
		created: "2021-09-11T14:29:13Z",
		title: "Backup Solutions Roundup"
	},
	{
		slug: "when-to-switch-services",
		created: "2021-09-18T17:34:06Z",
		title: "When to Switch Services"
	},
	{
		slug: "2021-review-protonvpn",
		created: "2021-09-25T18:52:29Z",
		title: "2021 Review: ProtonVPN"
	},
	{
		slug: "4-cybersecurity-basics",
		created: "2021-10-02T17:29:21Z",
		title: "4 Cybersecurity Basics"
	},
	{
		slug: "2021-review-wire-messenger",
		created: "2021-10-09T15:59:47Z",
		title: "2021 Review: Wire Messenger"
	},
	{
		slug: "network-security",
		created: "2021-10-16T14:40:56Z",
		title: "Network Security"
	},
	{
		slug: "2021-review-tutanota",
		created: "2021-10-23T14:41:48Z",
		title: "2021 Review: Tutanota"
	},
	{
		slug: "types-of-security",
		created: "2021-10-30T16:29:19Z",
		title: "Types of Security"
	},
	{
		slug: "2021-review-xmpp",
		created: "2021-11-13T16:47:26Z",
		title: "2021 Review: XMPP"
	},
	{
		slug: "cool-privacy-and-security-toys-for-fathers-day",
		created: "2021-06-19T22:49:03Z",
		title: "Cool Privacy & Security Toys for Father's Day"
	},
	{
		slug: "i-was-supposed-to-review-mailbox-org-this-week",
		created: "2021-06-26T15:38:49Z",
		title: "I Was Supposed to Review Mailbox.org This Week."
	},
	{
		slug: "staying-informed-without-big-tech",
		created: "2021-07-03T14:37:44Z",
		title: "Staying Informed Without Big Tech"
	},
	{
		slug: "the-best-password-manager-in-2021",
		created: "2021-07-10T18:11:02Z",
		title: "The Best Password Manager in 2021"
	},
	{
		slug: "critical-thinking-101",
		created: "2021-07-17T18:46:10Z",
		title: "Critical Thinking 101"
	},
	{
		slug: "ios-2fa-apps-review-2021-or-ravio-otp-the-only-ios-2fa-app-worth-recommending",
		created: "2021-07-24T20:40:36Z",
		title: "iOS 2FA Apps Review 2021 (or Raivo OTP: The Only iOS 2FA App Worth Recommending in 2021)"
	},
	{
		slug: "sanity-check-people-dont-spy-just-because",
		created: "2021-07-31T14:14:56Z",
		title: "Sanity Check: People Don't Spy Just Because"
	},
	{
		slug: "privacy-is-not-political",
		created: "2021-08-07T17:34:53Z",
		title: "Privacy is Not Political"
	},
	{
		slug: "2021-review-mysudo",
		created: "2021-08-14T23:26:50Z",
		title: "2021 Review: MySudo"
	},
	{
		slug: "recognizing-progress-or-an-appreciation-post-for-newbies",
		created: "2021-08-21T23:03:31Z",
		title: "Recognizing Progress (or, An Appreciation Post for Newbies)"
	},
	{
		slug: "an-important-update-about-credit-freezes-in-the-united-states",
		created: "2021-04-03T14:10:52Z",
		title: "An Important Update About Credit Freezes in the United States"
	},
	{
		slug: "movie-review-coded-bias",
		created: "2021-04-10T17:42:44Z",
		title: "Movie Review: _Coded Bias_"
	},
	{
		slug: "the-privacy-paradox",
		created: "2021-04-18T15:41:24Z",
		title: "The Privacy Paradox"
	},
	{
		slug: "the-expectation-of-stalking",
		created: "2021-05-01T19:48:34Z",
		title: "The Expectation of Stalking"
	},
	{
		slug: "moms-guide-to-online-child-safety",
		created: "2021-05-08T15:03:35Z",
		title: "Mom's Guide to Online Child Safety"
	},
	{
		slug: "what-really-is-the-best-ios-browser",
		created: "2021-05-15T17:07:00Z",
		title: "What REALLY is the Best iOS Browser?"
	},
	{
		slug: "2021-review-anonaddy-and-simplelogin",
		created: "2021-05-22T14:44:38Z",
		title: "2021 Review: AnonAddy & SimpleLogin"
	},
	{
		slug: "what-really-is-the-best-ios-browser-addendum-snowhaze",
		created: "2021-05-29T16:40:51Z",
		title: "What REALLY is the Best iOS Browser? Addendum: SnowHaze"
	},
	{
		slug: "prime-day-is-this-month",
		created: "2021-06-05T13:17:04Z",
		title: "Prime Day is This Month. Here's Why You Should Stop Using Amazon"
	},
	{
		slug: "2021-review-signal",
		created: "2021-06-12T15:58:54Z",
		title: "2021 Review: Signal"
	},
	{
		slug: "privacy-and-security-101-social-media",
		created: "2021-01-16T15:51:14Z",
		title: "Privacy & Security 101: Social Media"
	},
	{
		slug: "i-locked-myself-out-of-my-sim-card-this-weekend",
		created: "2021-01-23T15:42:00Z",
		title: "I Locked Myself Out of My SIM Card This Weekend"
	},
	{
		slug: "today-is-data-privacy-day",
		created: "2021-01-28T16:46:26Z",
		title: "Today is Data Privacy Day. Here's Another List"
	},
	{
		slug: "burnout",
		created: "2021-01-30T14:46:07Z",
		title: "Burnout"
	},
	{
		slug: "love-is-in-the-air-via-wifi-and-dating-apps",
		created: "2021-02-06T16:32:09Z",
		title: "Love is in the Air (via WiFi and Dating Apps)"
	},
	{
		slug: "how-to-handle-old-accounts",
		created: "2021-02-13T19:10:28Z",
		title: "How to Handle Old Accounts"
	},
	{
		slug: "lessons-in-disasters-and-redundancy",
		created: "2021-02-20T19:45:17Z",
		title: "Lessons in Disasters and Redundancy"
	},
	{
		slug: "review-mullvad-vpn-2021-insultingly-easy",
		created: "2021-02-27T15:37:54Z",
		title: "Review: Mullvad VPN 2021 - Insultingly Easy"
	},
	{
		slug: "financial-privacy",
		created: "2021-03-20T16:09:49Z",
		title: "Financial Privacy"
	},
	{
		slug: "the-peripheral-benefits-of-privacy",
		created: "2021-03-27T12:45:03Z",
		title: "The Peripheral Benefits of Privacy"
	},
	{
		slug: "a-detour-into-diet-apps",
		created: "2020-11-07T15:21:15Z",
		title: "A Detour into Diet Apps"
	},
	{
		slug: "safe-shopping-2020-edition",
		created: "2020-11-14T14:55:48Z",
		title: "Safe Shopping: 2020 Edition"
	},
	{
		slug: "does-the-country-a-service-is-headquartered-in-matter",
		created: "2020-11-21T16:00:27Z",
		title: "Does the Country a Service is Headquartered in Matter?"
	},
	{
		slug: "five-privacy-respecting-gift-ideas",
		created: "2020-11-28T18:00:47Z",
		title: "Five Privacy Respecting Gift Ideas"
	},
	{
		slug: "open-source-does-not-always-equal-safe",
		created: "2020-12-05T17:47:41Z",
		title: "\"Open Source\" Does Not Always Equal \"Safe\""
	},
	{
		slug: "theres-a-problem-with-your-package-from-amazon",
		created: "2020-12-12T14:58:08Z",
		title: "“There's A Problem With Your Package From Amazon”"
	},
	{
		slug: "privacy-respecting-video-chat-apps-for-the-holidays",
		created: "2020-12-19T15:31:59Z",
		title: "Privacy-Respecting Video Chat Apps for the Holidays"
	},
	{
		slug: "how-to-fail-at-privacy-and-security",
		created: "2020-12-26T13:54:21Z",
		title: "How to Fail at Privacy & Security"
	},
	{
		slug: "2020-recap-2021-plans",
		created: "2021-01-02T15:15:50Z",
		title: "2020 Recap/2021 Plans"
	},
	{
		slug: "whats-the-buzz-about-bitcoin",
		created: "2021-01-09T19:47:31Z",
		title: "What's the Buzz About Bitcoin?"
	},
	{
		slug: "book-review-_extreme-privacy-what-it-takes-to-disappear-2nd-edition-_-by",
		created: "2020-08-29T14:11:11Z",
		title: "Book Review: _Extreme Privacy: What It Takes to Disappear (2nd Edition)_ by Michael Bazzell"
	},
	{
		slug: "sanity-check-threat-modeling",
		created: "2020-09-05T15:14:39Z",
		title: "Sanity Check: Threat Modeling"
	},
	{
		slug: "book-review-click-here-to-kill-everybody-by-bruce-schneier",
		created: "2020-09-12T15:33:17Z",
		title: "Book Review: _Click Here to Kill Everybody_ by Bruce Schneier"
	},
	{
		slug: "movie-review-the-social-dilemma",
		created: "2020-09-19T14:57:04Z",
		title: "Movie Review: _The Social Dilemma_"
	},
	{
		slug: "avoiding-robocalls",
		created: "2020-09-26T15:37:49Z",
		title: "Avoiding Robocalls"
	},
	{
		slug: "back-to-the-basics",
		created: "2020-10-03T18:17:45Z",
		title: "Back to the Basics"
	},
	{
		slug: "school-issued-chromebooks-and-privacy",
		created: "2020-10-10T16:38:26Z",
		title: "School-Issued Chromebooks and Privacy"
	},
	{
		slug: "interacting-with-non-privacy-people",
		created: "2020-10-17T15:24:02Z",
		title: "Interacting With Non-Privacy People"
	},
	{
		slug: "how-ive-convinced-people-around-me-to-care-about-privacy",
		created: "2020-10-24T16:13:27Z",
		title: "How I've Convinced People Around Me to Care About Privacy"
	},
	{
		slug: "should-you-use-biometric-locks-on-your-devices",
		created: "2020-10-31T20:09:54Z",
		title: "Should You Use Biometric Locks on Your Devices?"
	},
	{
		slug: "case-study-online-dating-scams-and-why-privacy-is-not-a-reactive-issue",
		created: "2020-06-07T17:13:29Z",
		title: "Case Study: Online Dating, Scams, and Why Privacy is Not a Reactive Issue"
	},
	{
		slug: "why-you-dont-need-a-vpn",
		created: "2020-06-13T16:30:50Z",
		title: "Why You Don't Need a VPN"
	},
	{
		slug: "an-open-letter-to-congresspeople-regarding-s",
		created: "2020-06-27T21:30:39Z",
		title: "An Open Letter to Congresspeople Regarding S. 4051 (Lindsey Graham's Bill to Outlaw End-to-End Encryption)"
	},
	{
		slug: "i-lost-my-debit-card-last-weekend",
		created: "2020-07-11T15:59:06Z",
		title: "I Lost My Debit Card Last Weekend"
	},
	{
		slug: "privacy-and-security-101-layering-your-strategies",
		created: "2020-07-18T17:04:08Z",
		title: "Privacy & Security 101: Layering Your Strategies"
	},
	{
		slug: "privacy-and-security-101-compartmentalization",
		created: "2020-07-25T13:45:51Z",
		title: "Privacy & Security 101: Compartmentalization"
	},
	{
		slug: "privacy-and-death",
		created: "2020-08-01T19:37:30Z",
		title: "Privacy and Death"
	},
	{
		slug: "privacy-and-voting",
		created: "2020-08-08T13:09:13Z",
		title: "Privacy and Voting"
	},
	{
		slug: "the-self-destructive-quest-for-perfection",
		created: "2020-08-15T16:12:08Z",
		title: "The Self-Destructive Quest for Perfection"
	},
	{
		slug: "the-privacy-of-dna",
		created: "2020-08-22T15:27:21Z",
		title: "The Privacy of DNA"
	},
	{
		slug: "one-size-does-not-fit-all",
		created: "2020-03-07T19:24:09Z",
		title: "One Size Does Not Fit All"
	},
	{
		slug: "lets-not-talk-about-covid-19",
		created: "2020-03-14T15:31:17Z",
		title: "Let's (Not) Talk About COVID-19"
	},
	{
		slug: "the-earn-it-act",
		created: "2020-03-21T14:29:26Z",
		title: "The EARN IT Act"
	},
	{
		slug: "website-overhaul",
		created: "2020-04-12T16:18:17Z",
		title: "Website Overhaul"
	},
	{
		slug: "why-you-yes-you-reading-this-need-to-take-the-lead-in-privacy-and-security",
		created: "2020-04-26T19:21:24Z",
		title: "Why You (Yes You, Reading This) Need to Take the Lead in Privacy & Security"
	},
	{
		slug: "decentralized-communication-the-way-of-the-future",
		created: "2020-05-03T13:53:09Z",
		title: "Decentralized Communication: The Way of the Future"
	},
	{
		slug: "privacy-in-the-workplace",
		created: "2020-05-10T16:16:50Z",
		title: "Privacy in the Workplace"
	},
	{
		slug: "a-plea-for-patience-from-a-privacy-enthusiast",
		created: "2020-05-16T18:00:04Z",
		title: "A Plea for Patience From a Privacy Enthusiast"
	},
	{
		slug: "book-review-the-art-of-invisibility-by-kevin-mitnick",
		created: "2020-05-23T14:37:20Z",
		title: "Book Review: *The Art of Invisibility* by Kevin Mitnick"
	},
	{
		slug: "protesting",
		created: "2020-05-30T16:46:17Z",
		title: "Protesting"
	},
	{
		slug: "the-rise-of-ransomware",
		created: "2019-08-19T23:39:44Z",
		title: "The Rise of Ransomware"
	},
	{
		slug: "the-case-for-linux",
		created: "2019-09-02T17:08:08Z",
		title: "The Case for Linux"
	},
	{
		slug: "limiting-social-media",
		created: "2019-11-16T16:47:37Z",
		title: "Limiting Social Media"
	},
	{
		slug: "safe-shopping",
		created: "2019-12-02T23:33:56Z",
		title: "Safe Shopping"
	},
	{
		slug: "the-privacy-myth-binary-vs-spectrum",
		created: "2019-12-22T18:06:47Z",
		title: "The Privacy Myth: Binary vs Spectrum"
	},
	{
		slug: "why-your-individual-privacy-matters-for-the-wider-population",
		created: "2019-12-28T17:06:16Z",
		title: "Why Your Individual Privacy Matters for the Wider Population"
	},
	{
		slug: "looking-ahead",
		created: "2020-01-04T14:19:53Z",
		title: "Looking Ahead"
	},
	{
		slug: "tracking-links",
		created: "2020-01-12T18:25:18Z",
		title: "Tracking Links"
	},
	{
		slug: "your-phone-is-not-your-friend",
		created: "2020-02-09T16:37:11Z",
		title: "Your Phone is Not Your Friend"
	},
	{
		slug: "the-question-of-trust",
		created: "2020-02-29T16:48:43Z",
		title: "The Question of Trust"
	},
	{
		slug: "threat-modeling",
		created: "2018-12-24T17:39:41Z",
		title: "Threat Modeling"
	}
];

const $$Astro$b = createAstro("https://thenewoil.org");
const $$BlogList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$BlogList;
  const length = BlogPages.length;
  BlogPages.sort((a, b) => {
    return new Date(b.created).getTime() - new Date(a.created).getTime();
  });
  return renderTemplate`${maybeRenderHead($$result)}<div class="flex w-full flex-col overflow-auto rounded-lg border-4 border-gradient-secondary border-bg-primary dark:border-bg-primary-dark">
  ${BlogPages.map((page, index) => {
    const createdDate = new Date(page.created).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    return renderTemplate`<a${addAttribute(`flex items-center justify-between rounded-t-lg p-4 ${index != length - 1 && "border-0 border-b-4 border-gradient-secondary"}`, "class")}${addAttribute(`https://blog.thenewoil.org/${page.slug}`, "href")}>
          ${renderComponent($$result, "Markdown", Markdown, { "of": page.title })}
          <p>${createdDate}</p>
        </a>`;
  })}
</div>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/pages/blog-index/BlogList.astro");

const MDXLayout$P = async function ({
  children
}) {
  const Layout = (await import('../default.e3133db4.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$P;
  content.file = file$P;
  content.url = url$P;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$P,
    url: url$P,
    content,
    frontmatter: content,
    headings: getHeadings$P(),
    "server:root": true,
    children
  });
};
const frontmatter$P = {
  "layout": "@layouts/default.astro",
  "title": "Blog Index",
  "draft": false,
  "center_content": true
};
const _internal$P = {
  injectedFrontmatter: {}
};
function getHeadings$P() {
  return [{
    "depth": 1,
    "slug": "blog-table-of-contents",
    "text": "Blog Table of Contents"
  }];
}
function _createMdxContent$P(props) {
  const _components = Object.assign({
    h1: "h1"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "blog-table-of-contents",
      children: "Blog Table of Contents"
    }), "\n", createVNode($$BlogList, {})]
  });
}
function MDXContent$P(props = {}) {
  return createVNode(MDXLayout$P, {
    ...props,
    children: createVNode(_createMdxContent$P, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$P, "astro:jsx");
__astro_tag_component__(MDXContent$P, "astro:jsx");
const url$P = "/en/blog-index";
const file$P = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/blog-index.mdx";
function rawContent$P() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$P() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$P = (props = {}) => MDXContent$P({
											...props,
											components: { Fragment, ...props.components },
										});
Content$P[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$P.layout);

const _page17 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$P,
  _internal: _internal$P,
  compiledContent: compiledContent$P,
  default: Content$P,
  file: file$P,
  frontmatter: frontmatter$P,
  getHeadings: getHeadings$P,
  rawContent: rawContent$P,
  url: url$P
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$O = async function ({
  children
}) {
  const Layout = (await import('../default.e3133db4.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$O;
  content.file = file$O;
  content.url = url$O;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$O,
    url: url$O,
    content,
    frontmatter: content,
    headings: getHeadings$O(),
    "server:root": true,
    children
  });
};
const frontmatter$O = {
  "layout": "@layouts/default.astro",
  "title": "The Library",
  "draft": false
};
const _internal$O = {
  injectedFrontmatter: {}
};
function getHeadings$O() {
  return [{
    "depth": 1,
    "slug": "the-library",
    "text": "The Library"
  }, {
    "depth": 2,
    "slug": "books",
    "text": "Books"
  }, {
    "depth": 3,
    "slug": "fiction",
    "text": "Fiction"
  }, {
    "depth": 3,
    "slug": "nonfiction",
    "text": "Nonfiction"
  }, {
    "depth": 2,
    "slug": "movies",
    "text": "Movies"
  }, {
    "depth": 3,
    "slug": "fiction-1",
    "text": "Fiction"
  }, {
    "depth": 3,
    "slug": "nonfiction-1",
    "text": "Nonfiction"
  }, {
    "depth": 2,
    "slug": "podcasts",
    "text": "Podcasts"
  }, {
    "depth": 3,
    "slug": "fiction-2",
    "text": "Fiction"
  }, {
    "depth": 3,
    "slug": "nonfiction-2",
    "text": "Nonfiction"
  }, {
    "depth": 2,
    "slug": "shows",
    "text": "Shows"
  }, {
    "depth": 3,
    "slug": "fiction-3",
    "text": "Fiction"
  }, {
    "depth": 3,
    "slug": "nonfiction-3",
    "text": "Nonfiction"
  }];
}
function _createMdxContent$O(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    h2: "h2",
    h3: "h3",
    ul: "ul",
    li: "li",
    em: "em"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "the-library",
      children: "The Library"
    }), "\n", createVNode(_components.p, {
      children: ["The following is a crowd-sourced list of content related to privacy & security. Please note that ", createVNode(_components.strong, {
        children: "the content listed here is provided as-is"
      }), " with little or no verification. In other words, it is up to you to do your research on the quality of the content (if it\u2019s worth your time), the content itself (if it\u2019s age appropriate for the viewers intended), and exactly how privacy/security-related it actually is. We are also not responsible for helping you figure out where the content is currently available (for example, which streaming service it may be available on)."]
    }), "\n", createVNode(_components.h2, {
      id: "books",
      children: "Books"
    }), "\n", createVNode(_components.h3, {
      id: "fiction",
      children: "Fiction"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.em, {
          children: "1984"
        }), " by George Orwell"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.em, {
          children: "Little Brother"
        }), " by Cory Doctorow"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.em, {
          children: "The Circle"
        }), " by Dave Eggers"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "nonfiction",
      children: "Nonfiction"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.em, {
          children: "Permanent Record"
        }), " by Edward Snowden"]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "movies",
      children: "Movies"
    }), "\n", createVNode(_components.h3, {
      id: "fiction-1",
      children: "Fiction"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Enemy of the State"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Kimi"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Snowden"
        })
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "nonfiction-1",
      children: "Nonfiction"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Citizenfour"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Coded Bias"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "The Great Hack"
        })
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "podcasts",
      children: "Podcasts"
    }), "\n", createVNode(_components.h3, {
      id: "fiction-2",
      children: "Fiction"
    }), "\n", createVNode(_components.h3, {
      id: "nonfiction-2",
      children: "Nonfiction"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Darknet Diaries"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Surveillance Report"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "The Privacy, Security, & OSINT Show"
        })
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "shows",
      children: "Shows"
    }), "\n", createVNode(_components.h3, {
      id: "fiction-3",
      children: "Fiction"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Black Mirror"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Mr Robot"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Person of Interest"
        })
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "nonfiction-3",
      children: "Nonfiction"
    })]
  });
}
function MDXContent$O(props = {}) {
  return createVNode(MDXLayout$O, {
    ...props,
    children: createVNode(_createMdxContent$O, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$O, "astro:jsx");
__astro_tag_component__(MDXContent$O, "astro:jsx");
const url$O = "/en/library";
const file$O = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/library.mdx";
function rawContent$O() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$O() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$O = (props = {}) => MDXContent$O({
											...props,
											components: { Fragment, ...props.components },
										});
Content$O[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$O.layout);

const _page18 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$O,
  _internal: _internal$O,
  compiledContent: compiledContent$O,
  default: Content$O,
  file: file$O,
  frontmatter: frontmatter$O,
  getHeadings: getHeadings$O,
  rawContent: rawContent$O,
  url: url$O
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$a = createAstro("https://thenewoil.org");
const $$Roadmap = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Roadmap;
  return renderTemplate`${maybeRenderHead($$result)}<div class="flex flex-col">
  ${renderSlot($$result, $$slots["default"])}
</div>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/pages/roadmap/Roadmap.astro");

const $$Astro$9 = createAstro("https://thenewoil.org");
const $$RoadmapItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$RoadmapItem;
  const { title } = Astro2.props;
  const headingId = await textToHeadingId({
    text: title,
    prefix: "roadmap-item-"
  });
  return renderTemplate`${maybeRenderHead($$result)}<article class="flex min-h-[4rem]">
  <header class="hidden w-1/3 max-w-xs items-center break-all px-4 py-2 sm:flex sm:break-words">
    <h2${addAttribute(headingId, "id")} class="text-2xl font-medium">${title}</h2>
  </header>
  <div class="relative order-first w-[2px] bg-gradient-secondary-center sm:order-none" aria-hidden>
    <div class="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-solid bg-primary border-gradient-secondary border-bg-primary dark:bg-primary-dark dark:border-bg-primary-dark">
    </div>
  </div>
  <div class="flex flex-1 flex-col items-center gap-2 px-4 py-4 transition-all sm:flex-row sm:py-2">
    <header class="flex w-full items-center break-all sm:hidden sm:break-words">
      <h2${addAttribute(`${headingId}-mobile`, "id")} class="text-2xl font-medium">${title}</h2>
    </header>
    ${renderSlot($$result, $$slots["default"])}
  </div>
</article>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/pages/roadmap/RoadmapItem.astro");

const MDXLayout$N = async function ({
  children
}) {
  const Layout = (await import('../default.e3133db4.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$N;
  content.file = file$N;
  content.url = url$N;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$N,
    url: url$N,
    content,
    frontmatter: content,
    headings: getHeadings$N(),
    "server:root": true,
    children
  });
};
const frontmatter$N = {
  "layout": "@layouts/default.astro",
  "title": "Roadmap",
  "draft": false
};
const _internal$N = {
  injectedFrontmatter: {}
};
function getHeadings$N() {
  return [{
    "depth": 1,
    "slug": "current-roadmap",
    "text": "Current Roadmap"
  }];
}
function _createMdxContent$N(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    a: "a",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "current-roadmap",
      children: "Current Roadmap"
    }), "\n", createVNode(_components.p, {
      children: ["The following is a list of upcoming projects that The New Oil is working to implement using the financial support of our readers. If you want to support us to make any of these projects possible, then please consider ", createVNode(_components.a, {
        href: "/support",
        children: "donating"
      }), ". Keep in mind that these projects may be implemented earlier than expected or pushed back depending on funding and time constraints."]
    }), "\n", createVNode($$Roadmap, {
      children: [createVNode($$RoadmapItem, {
        title: "H1 2024 (January-June)",
        children: createVNode(_components.p, {
          children: createVNode(_components.strong, {
            children: "Matrix Homeserver"
          })
        })
      }), createVNode($$RoadmapItem, {
        children: createVNode(_components.p, {
          children: createVNode(_components.strong, {
            children: "Lemmy Instance"
          })
        })
      }), createVNode($$RoadmapItem, {
        title: "Ongoing",
        children: createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "Site translation:"
          }), " Crowdsourced translations efforts are already underway via ", createVNode(_components.a, {
            href: "https://crowdin.com/project/the-new-oil",
            children: "Crowdin"
          }), ". If you speak another language, we would love your help translating the site. If the language you speak isn\u2019t listed, please ", createVNode(_components.a, {
            href: "/links#contact",
            children: "contact us"
          }), " so that we can add it."]
        })
      }), createVNode($$RoadmapItem, {
        title: "No Timeline",
        children: createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "Macbook"
          }), " Having a budget-model Macbook would help us with testing, reviewing, and troubleshooting various tools and techniques for the website. We would also be able to keep the recommended settings current. In the past we were able to run MacOS in a virtual machine, however Apple is making this increasingly difficult to the point where it is no longer possible for us."]
        })
      })]
    })]
  });
}
function MDXContent$N(props = {}) {
  return createVNode(MDXLayout$N, {
    ...props,
    children: createVNode(_createMdxContent$N, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$N, "astro:jsx");
__astro_tag_component__(MDXContent$N, "astro:jsx");
const url$N = "/en/roadmap";
const file$N = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/roadmap.mdx";
function rawContent$N() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$N() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$N = (props = {}) => MDXContent$N({
											...props,
											components: { Fragment, ...props.components },
										});
Content$N[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$N.layout);

const _page19 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$N,
  _internal: _internal$N,
  compiledContent: compiledContent$N,
  default: Content$N,
  file: file$N,
  frontmatter: frontmatter$N,
  getHeadings: getHeadings$N,
  rawContent: rawContent$N,
  url: url$N
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$8 = createAstro("https://thenewoil.org");
const $$LinkGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$LinkGrid;
  const { items } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<ul class="mb-10 grid w-full grid-cols-1 gap-4 overflow-auto p-0 sm:mb-20 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3">
  ${items.map((item) => {
    const hasSubLink = !!item.sublink;
    const Container = hasSubLink ? "div" : "a";
    const PossibleLink = !hasSubLink ? "div" : "a";
    return renderTemplate`<li class="flex list-none"${addAttribute(item.not_encouraged ? "Not encouraged" : "", "title")}>
          ${renderComponent($$result, "Container", Container, { "class": `flex flex-1 items-center gap-4 rounded-lg border-4 p-4 border-bg-primary dark:border-bg-primary-dark ${item.not_encouraged ? "border-gradient-warning" : "border-gradient-secondary"}`, "href": !hasSubLink && item.link }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "PossibleLink", PossibleLink, { "href": hasSubLink && item.link, "class": "aspect-square h-10 w-10 border-none transition-all xs:h-16 xs:w-16 sm:h-20 sm:w-20 md:h-24 md:w-24" }, { "default": ($$result3) => renderTemplate`<img loading="lazy"${addAttribute(item.img, "src")}${addAttribute(`${item.name} Logo`, "alt")} class="aspect-square h-auto w-full object-contain">` })}<div class="flex w-fit flex-col justify-center">
              ${renderComponent($$result2, "PossibleLink", PossibleLink, { "href": hasSubLink && item.link, "class": "border-none text-base font-medium motion-safe:transition-all xs:text-lg sm:break-normal sm:text-xl" }, { "default": ($$result3) => renderTemplate`${item.name}` })}
              ${item.sublink && item.subtext && renderTemplate`<a${addAttribute(item.sublink, "href")} class="w-fit text-primary-contrast text-opacity-80 dark:text-primary-dark-contrast dark:text-opacity-80">
                  ${item.subtext}
                </a>`}
              ${!item.sublink && item.subtext && renderTemplate`<p class="block w-fit text-primary-contrast text-opacity-80 dark:text-primary-dark-contrast dark:text-opacity-80">
                  ${item.subtext}
                </p>`}
            </div>` })}
        </li>`;
  })}
</ul>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/common/LinkGrid.astro");

const $$Astro$7 = createAstro("https://thenewoil.org");
const $$ShopHero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$ShopHero;
  const { img, link } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div class="mb-10 flex flex-col items-center justify-center gap-4 sm:mb-20 sm:flex-row sm:gap-8">
  <div class="flex max-w-lg flex-col items-center justify-center gap-4 text-center">
    <div>
      ${renderSlot($$result, $$slots["title"])}
    </div>
    <div>
      ${renderSlot($$result, $$slots["default"])}
    </div>
    ${renderComponent($$result, "Button", $$Button, { "color": "primary", "variant": "contained", "href": link, "external": true }, { "default": ($$result2) => renderTemplate`Go to Store` })}
  </div>
  <img${addAttribute(img, "src")} class="aspect-square w-full max-w-sm rounded-lg object-contain motion-safe:transition-all lg:max-w-md">
</div>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/pages/support/ShopHero.astro");

const affiliateLinks = [
	{
		name: "Filen",
		link: "https://filen.io/r/834a3bd235bca0caa53141f2ebc30438",
		img: "/images/logos/filen.png",
		subtext: "Cloud storage"
	},
	{
		name: "Mega",
		link: "https://mega.nz/aff=UBJLjO7sxZU",
		img: "/images/logos/mega.png",
		subtext: "Cloud storage"
	},
	{
		name: "Nitrokey",
		link: "https://shop.nitrokey.com/shop?aff_ref=14",
		img: "/images/logos/nitrokey.png",
		subtext: "Open source privacy & security hardware"
	},
	{
		name: "Privacy.com",
		link: "https://privacy.com/join/UZ9WY",
		img: "/images/logos/privacy.png",
		subtext: "Digital payment card masking"
	},
	{
		name: "ProtonDrive",
		link: "https://go.getproton.me/aff_c?offer_id=26&aff_id=2187&url=https%3A%2F%2Fproton.me%2F%3FvisitorId%3Dho-{transaction_id}%26aid%3D{affiliate_id}%26offer_id%3D{offer_id}%26url_id%3D{offer_url_id}%26utm_campaign%3Dww-all-2c-vpn-gro_aff-g_acq-partners_program%26utm_source%3Daid-tune-{affiliate_id}%26utm_medium%3Dlink%26utm_term%3Dgeneric_vpn_landing%26utm_content%3D{offer_id}%26hfp%3Dfalse%26spl%3D{affiliate_id}%26aap%3D{affiliate_id}",
		img: "/images/logos/protondrive.png",
		subtext: "Cloud storage"
	},
	{
		name: "ProtonPass",
		link: "https://go.getproton.me/aff_c?offer_id=26&aff_id=2187&url=https%3A%2F%2Fproton.me%2F%3FvisitorId%3Dho-{transaction_id}%26aid%3D{affiliate_id}%26offer_id%3D{offer_id}%26url_id%3D{offer_url_id}%26utm_campaign%3Dww-all-2c-vpn-gro_aff-g_acq-partners_program%26utm_source%3Daid-tune-{affiliate_id}%26utm_medium%3Dlink%26utm_term%3Dgeneric_vpn_landing%26utm_content%3D{offer_id}%26hfp%3Dfalse%26spl%3D{affiliate_id}%26aap%3D{affiliate_id}",
		img: "/images/logos/protonpass.png",
		subtext: "Cloud-based password manager"
	},
	{
		name: "ProtonMail",
		link: "https://go.getproton.me/aff_c?offer_id=26&aff_id=2187&url=https%3A%2F%2Fproton.me%2F%3FvisitorId%3Dho-{transaction_id}%26aid%3D{affiliate_id}%26offer_id%3D{offer_id}%26url_id%3D{offer_url_id}%26utm_campaign%3Dww-all-2c-vpn-gro_aff-g_acq-partners_program%26utm_source%3Daid-tune-{affiliate_id}%26utm_medium%3Dlink%26utm_term%3Dgeneric_vpn_landing%26utm_content%3D{offer_id}%26hfp%3Dfalse%26spl%3D{affiliate_id}%26aap%3D{affiliate_id}",
		img: "/images/logos/protonmail2.png",
		subtext: "Email provider"
	},
	{
		name: "Proton VPN",
		link: "https://go.getproton.me/aff_c?offer_id=26&aff_id=2187&url=https%3A%2F%2Fproton.me%2F%3FvisitorId%3Dho-{transaction_id}%26aid%3D{affiliate_id}%26offer_id%3D{offer_id}%26url_id%3D{offer_url_id}%26utm_campaign%3Dww-all-2c-vpn-gro_aff-g_acq-partners_program%26utm_source%3Daid-tune-{affiliate_id}%26utm_medium%3Dlink%26utm_term%3Dgeneric_vpn_landing%26utm_content%3D{offer_id}%26hfp%3Dfalse%26spl%3D{affiliate_id}%26aap%3D{affiliate_id}",
		img: "/images/logos/protonvpn2.png",
		subtext: "Virtual private network"
	},
	{
		name: "SimpleLogin",
		link: "https://simplelogin.io/?slref=thenewoil",
		img: "/images/logos/simplelogin.png",
		subtext: "Email address masking service"
	},
	{
		name: "Skiff",
		link: "https://app.skiff.com/signup?mail=&referral=thenewoil",
		img: "/images/logos/skiff.png",
		subtext: "Email provider"
	}
];

const donations = [
	{
		link: "https://opencollective.com/thenewoil/donate",
		img: "/images/logos/opencollective.png",
		name: "Open Collective"
	},
	{
		link: "https://liberapay.com/thenewoil",
		img: "/images/logos/liberapay.png",
		name: "Liberapay"
	},
	{
		link: "https://www.patreon.com/TheNewOil413",
		img: "/images/logos/patreon.png",
		name: "Patreon",
		not_encouraged: true
	},
	{
		link: "https://www.paypal.com/donate/?hosted_button_id=2LLRWFZQS4E94",
		img: "/images/logos/paypal.png",
		name: "PayPal",
		not_encouraged: true
	},
	{
		link: "https://support.brave.com/hc/en-us/articles/360021123971-How-do-I-tip-websites-and-Content-Creators-in-Brave-Rewards-",
		img: "/images/logos/brave.png",
		name: "Tip with Brave (BAT)"
	},
	{
		link: "/crypto#bitcoin-btc",
		img: "/images/logos/bitcoin.png",
		name: "Bitcoin (BTC)"
	},
	{
		link: "/crypto#monero-xmr",
		img: "/images/logos/monero.png",
		name: "Monero (XMR)"
	},
	{
		link: "/crypto#all-other-cryptocurrencies",
		img: "/images/graphics/donate-nowpayments.png",
		name: "NowPayments"
	}
];

const MDXLayout$M = async function ({
  children
}) {
  const Layout = (await import('../default.e3133db4.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$M;
  content.file = file$M;
  content.url = url$M;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$M,
    url: url$M,
    content,
    frontmatter: content,
    headings: getHeadings$M(),
    "server:root": true,
    children
  });
};
const frontmatter$M = {
  "layout": "@layouts/default.astro",
  "title": "Support",
  "draft": false,
  "center_content": true
};
const _internal$M = {
  injectedFrontmatter: {}
};
function getHeadings$M() {
  return [{
    "depth": 1,
    "slug": "support-methods",
    "text": "Support Methods"
  }, {
    "depth": 2,
    "slug": "shop",
    "text": "Shop"
  }, {
    "depth": 2,
    "slug": "donations",
    "text": "Donations"
  }, {
    "depth": 2,
    "slug": "affiliate-links",
    "text": "Affiliate links"
  }];
}
function _createMdxContent$M(props) {
  const _components = Object.assign({
    h1: "h1",
    h2: "h2",
    p: "p",
    strong: "strong",
    a: "a"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "support-methods",
      children: "Support Methods"
    }), "\n", createVNode($$ShopHero, {
      img: "/images/graphics/shop-tshirt.webp",
      link: "https://shop.thenewoil.org/",
      children: [createVNode("span", {
        slot: "title",
        children: createVNode(_components.h2, {
          id: "shop",
          children: "Shop"
        })
      }), createVNode(_components.p, {
        children: createVNode(_components.strong, {
          children: "If you are interested in supporting us and want to get something back, check out our merch store."
        })
      })]
    }), "\n", createVNode(_components.h2, {
      id: "donations",
      children: "Donations"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: [createVNode(_components.a, {
          href: "/roadmap",
          children: "See the roadmap"
        }), " to find out where your donations will go."]
      })
    }), "\n", createVNode($$LinkGrid, {
      items: donations
    }), "\n", createVNode(_components.h2, {
      id: "affiliate-links",
      children: "Affiliate links"
    }), "\n", createVNode($$LinkGrid, {
      items: affiliateLinks
    })]
  });
}
function MDXContent$M(props = {}) {
  return createVNode(MDXLayout$M, {
    ...props,
    children: createVNode(_createMdxContent$M, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$M, "astro:jsx");
__astro_tag_component__(MDXContent$M, "astro:jsx");
const url$M = "/en/support";
const file$M = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/support.mdx";
function rawContent$M() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$M() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$M = (props = {}) => MDXContent$M({
											...props,
											components: { Fragment, ...props.components },
										});
Content$M[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$M.layout);

const _page20 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$M,
  _internal: _internal$M,
  compiledContent: compiledContent$M,
  default: Content$M,
  file: file$M,
  frontmatter: frontmatter$M,
  getHeadings: getHeadings$M,
  rawContent: rawContent$M,
  url: url$M
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$6 = createAstro("https://thenewoil.org");
const $$Criterias = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Criterias;
  const GRID_DIRECTION_CLASSES = {
    col: "grid-flow-row grid-cols-[repeat(var(--length),auto)]",
    row: "grid-flow-col grid-rows-[repeat(var(--length),auto)]"
  };
  const { data, direction: directionKey = "col", nonReferralLinkText = "Non-referral link" } = Astro2.props;
  const directionClasses = GRID_DIRECTION_CLASSES[directionKey];
  return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`overflow-auto border-4 rounded-lg border-gradient-secondary border-bg-primary dark:border-bg-primary-dark grid w-full auto-cols-fr ${directionClasses}`, "class")}${addAttribute({ "--length": data.criterias.length + 1 }, "style")}>
  <div class="h-full rounded-none border-b-4 border-gradient-secondary-center p-4 text-center"></div>
  ${data.criterias.map((criteria, index) => {
    const isLastCriteria = index === data.criterias.length - 1;
    return renderTemplate`<div${addAttribute(`h-full p-4 text-center ${directionKey === "col" || directionKey === "row" && !isLastCriteria ? "border-b-4 border-gradient-secondary-center" : ""}`, "class")}>
          ${criteria}
        </div>`;
  })}

  ${Object.values(data.tools).map((tool, toolIndex) => {
    const isLastTool = toolIndex === Object.values(data.tools).length - 1;
    return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<div${addAttribute(` flex w-full flex-col items-center p-4 text-center ${directionKey === "row" || directionKey === "col" && !isLastTool ? "border-b-4 border-gradient-secondary-center" : ""}`, "class")}>
            ${tool.logo && renderTemplate`<a class="border-none"${addAttribute(tool.referral_link ? tool.referral_link : tool.link, "href")}>
                <img${addAttribute(tool.logo, "src")}${addAttribute(`${tool.name} logo`, "alt")}>
              </a>`}
            <div class="flex flex-col items-center">
              ${(tool.referral_link || tool.link) && renderTemplate`<a${addAttribute(tool.referral_link ? tool.referral_link : tool.link, "href")}>${tool.name}</a>`}
              ${tool.referral_link && tool.link && renderTemplate`<a${addAttribute(tool.link, "href")}>${nonReferralLinkText}</a>`}
              ${!tool.referral_link && !tool.link && renderTemplate`<p>${tool.name}</p>`}
            </div>
          </div>${data.criterias.map((criteria, index) => {
      const isLastCriteria = index === data.criterias.length - 1;
      const criteriaValue = tool.values[criteria];
      if (criteriaValue === void 0)
        throw Error(`Error: criteria "${criteria}" not defined on tool "${tool.name}"`);
      return renderTemplate`<div${addAttribute(`h-full p-4 ${directionKey === "col" && !isLastTool || directionKey === "row" && !isLastCriteria ? "border-b-4 border-gradient-secondary-center" : ""}`, "class")}>
                ${Array.isArray(criteriaValue) ? criteriaValue.map((text) => renderTemplate`${renderComponent($$result2, "Markdown", Markdown, { "of": String(text) })}`) : renderTemplate`${renderComponent($$result2, "Markdown", Markdown, { "of": String(criteriaValue) })}`}
              </div>`;
    })}` })}`;
  })}
</div>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/charts/Criterias.astro");

const criterias$8 = [
	"Audited?",
	"Available on Linux?",
	"Available on Mac?",
	"Available on Windows?",
	"Available on Android?",
	"Available in F-Droid?",
	"Available on iOS?",
	"Decentralized?",
	"Phone number or username?",
	"Disappearing messages?",
	"Additional notes?"
];
const tools$8 = {
	matrix: {
		name: "Matrix",
		values: {
			"Audited?": "No",
			"Available on Linux?": "Yes",
			"Available on Mac?": "Yes",
			"Available on Windows?": "Yes",
			"Available on Android?": "Yes",
			"Available in F-Droid?": "Some clients",
			"Available on iOS?": "Yes",
			"Decentralized?": "Yes",
			"Phone number or username?": "Username",
			"Disappearing messages?": "No",
			"Additional notes?": [
				"Matrix is the protocol, not the client",
				"Can be self-hosted"
			]
		}
	},
	session: {
		name: "Session",
		values: {
			"Audited?": "Yes",
			"Available on Linux?": "Yes",
			"Available on Mac?": "Yes",
			"Available on Windows?": "Yes",
			"Available on Android?": "Yes",
			"Available in F-Droid?": "Directly ([from here](https://fdroid.getsession.org/fdroid/repo/))",
			"Available on iOS?": "Yes",
			"Decentralized?": "Yes",
			"Phone number or username?": "Yes",
			"Disappearing messages?": "Yes",
			"Additional notes?": [
			]
		}
	},
	signal: {
		name: "Signal",
		values: {
			"Audited?": "Yes",
			"Available on Linux?": "Yes",
			"Available on Mac?": "Yes",
			"Available on Windows?": "Yes",
			"Available on Android?": "Yes",
			"Available in F-Droid?": "No",
			"Available on iOS?": "Yes",
			"Decentralized?": "No",
			"Phone number or username?": "Phone number",
			"Disappearing messages?": "Yes",
			"Additional notes?": [
			]
		}
	},
	threema: {
		name: "Threema",
		values: {
			"Audited?": "Yes",
			"Available on Linux?": "Web only",
			"Available on Mac?": "Web only",
			"Available on Windows?": "Web only",
			"Available on Android?": "Yes",
			"Available in F-Droid?": "No",
			"Available on iOS?": "Yes",
			"Decentralized?": "No",
			"Phone number or username?": "Yes",
			"Disappearing messages?": "No",
			"Additional notes?": [
			]
		}
	}
};
const data$f = {
	criterias: criterias$8,
	tools: tools$8
};

const MDXLayout$L = async function ({
  children
}) {
  const Layout = (await import('../charts.67ef90d0.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$L;
  content.file = file$L;
  content.url = url$L;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$L,
    url: url$L,
    content,
    frontmatter: content,
    headings: getHeadings$L(),
    "server:root": true,
    children
  });
};
const frontmatter$L = {
  "layout": "@layouts/charts.astro",
  "title": "Privacy: Encrypted Messaging",
  "draft": false
};
const _internal$L = {
  injectedFrontmatter: {}
};
function getHeadings$L() {
  return [{
    "depth": 1,
    "slug": "privacy-encrypted-messaging",
    "text": "Privacy: Encrypted Messaging"
  }];
}
function _createMdxContent$L(props) {
  const _components = Object.assign({
    h1: "h1"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "privacy-encrypted-messaging",
      children: "Privacy: Encrypted Messaging"
    }), "\n", createVNode($$Criterias, {
      data: data$f,
      direction: "row"
    })]
  });
}
function MDXContent$L(props = {}) {
  return createVNode(MDXLayout$L, {
    ...props,
    children: createVNode(_createMdxContent$L, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$L, "astro:jsx");
__astro_tag_component__(MDXContent$L, "astro:jsx");
const url$L = "/en/charts/messaging";
const file$L = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/charts/messaging.mdx";
function rawContent$L() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$L() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$L = (props = {}) => MDXContent$L({
											...props,
											components: { Fragment, ...props.components },
										});
Content$L[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$L.layout);

const _page21 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$L,
  _internal: _internal$L,
  compiledContent: compiledContent$L,
  default: Content$L,
  file: file$L,
  frontmatter: frontmatter$L,
  getHeadings: getHeadings$L,
  rawContent: rawContent$L,
  url: url$L
}, Symbol.toStringTag, { value: 'Module' }));

const criterias$7 = [
	"Audited?",
	"Available on Linux?",
	"Available on Mac?",
	"Available on Windows?",
	"Available on Android?",
	"Available on iOS?",
	"Can act as 2FA app?",
	"Cloud based?",
	"Cost?",
	"Passkey support?"
];
const tools$7 = {
	bitwarden: {
		name: "Bitwarden",
		values: {
			"Audited?": "Yes",
			"Available on Linux?": "Yes",
			"Available on Mac?": "Yes",
			"Available on Windows?": "Yes",
			"Available on Android?": "Yes",
			"Available on iOS?": "Yes",
			"Can act as 2FA app?": "Yes",
			"Cloud based?": "Yes",
			"Cost?": "Freemium",
			"Passkey support?": "Yes"
		}
	},
	keepass: {
		name: "KeePass",
		values: {
			"Audited?": "Depends on the client",
			"Available on Linux?": "Yes",
			"Available on Mac?": "Yes",
			"Available on Windows?": "Yes",
			"Available on Android?": "Yes",
			"Available on iOS?": "Yes",
			"Can act as 2FA app?": "Depends on the client",
			"Cloud based?": "No",
			"Cost?": "Free",
			"Passkey support?": "Only in KeePassXC (Beta)"
		}
	},
	protonpass: {
		name: "Proton Pass",
		values: {
			"Audited?": "Yes",
			"Available on Linux?": "Yes",
			"Available on Mac?": "Yes",
			"Available on Windows?": "Yes",
			"Available on Android?": "Yes",
			"Available on iOS?": "Yes",
			"Can act as 2FA app?": "Yes",
			"Cloud based?": "Yes",
			"Cost?": "Free",
			"Passkey support?": "No"
		}
	}
};
const data$e = {
	criterias: criterias$7,
	tools: tools$7
};

const MDXLayout$K = async function ({
  children
}) {
  const Layout = (await import('../charts.67ef90d0.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$K;
  content.file = file$K;
  content.url = url$K;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$K,
    url: url$K,
    content,
    frontmatter: content,
    headings: getHeadings$K(),
    "server:root": true,
    children
  });
};
const frontmatter$K = {
  "layout": "@layouts/charts.astro",
  "title": "Data Breach Defense: Strong Passwords",
  "draft": false
};
const _internal$K = {
  injectedFrontmatter: {}
};
function getHeadings$K() {
  return [{
    "depth": 1,
    "slug": "data-breach-defense-strong-passwords",
    "text": "Data Breach Defense: Strong Passwords"
  }];
}
function _createMdxContent$K(props) {
  const _components = Object.assign({
    h1: "h1"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "data-breach-defense-strong-passwords",
      children: "Data Breach Defense: Strong Passwords"
    }), "\n", createVNode($$Criterias, {
      data: data$e,
      direction: "row"
    })]
  });
}
function MDXContent$K(props = {}) {
  return createVNode(MDXLayout$K, {
    ...props,
    children: createVNode(_createMdxContent$K, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$K, "astro:jsx");
__astro_tag_component__(MDXContent$K, "astro:jsx");
const url$K = "/en/charts/passwords";
const file$K = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/charts/passwords.mdx";
function rawContent$K() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$K() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$K = (props = {}) => MDXContent$K({
											...props,
											components: { Fragment, ...props.components },
										});
Content$K[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$K.layout);

const _page22 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$K,
  _internal: _internal$K,
  compiledContent: compiledContent$K,
  default: Content$K,
  file: file$K,
  frontmatter: frontmatter$K,
  getHeadings: getHeadings$K,
  rawContent: rawContent$K,
  url: url$K
}, Symbol.toStringTag, { value: 'Module' }));

const criterias$6 = [
	"Source Available?",
	"Additional notes"
];
const tools$6 = {
	filen: {
		name: "Filen",
		values: {
			"Source Available?": "Client",
			"Additional notes": [
				"[Concerns](https://github.com/privacyguides/privacyguides.org/pull/345#issuecomment-976415846) raised about encryption implementation"
			]
		}
	},
	mega: {
		name: "Mega",
		values: {
			"Source Available?": "Client",
			"Offers multifactor authentication?": "Yes",
			"Additional notes": [
				"[Research](https://arstechnica.com/information-technology/2022/06/mega-says-it-cant-decrypt-your-files-new-poc-exploit-shows-otherwise/) suggests sloppy code",
				"[Implicated](https://gitlab.com/thenewoil/website/-/issues/79) in the drafting of anti-privacy legislation"
			]
		}
	},
	protondrive: {
		name: "ProtonDrive",
		values: {
			"Source Available?": "Client",
			"Additional notes": [
				"No desktop app"
			]
		}
	},
	sync: {
		name: "Sync",
		values: {
			"Source Available?": "No",
			"Additional notes": [
				"Audited"
			]
		}
	}
};
const data$d = {
	criterias: criterias$6,
	tools: tools$6
};

const MDXLayout$J = async function ({
  children
}) {
  const Layout = (await import('../charts.67ef90d0.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$J;
  content.file = file$J;
  content.url = url$J;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$J,
    url: url$J,
    content,
    frontmatter: content,
    headings: getHeadings$J(),
    "server:root": true,
    children
  });
};
const frontmatter$J = {
  "layout": "@layouts/charts.astro",
  "title": "Protection: Backups",
  "draft": false
};
const _internal$J = {
  injectedFrontmatter: {}
};
function getHeadings$J() {
  return [{
    "depth": 1,
    "slug": "protection-backups",
    "text": "Protection: Backups"
  }];
}
function _createMdxContent$J(props) {
  const _components = Object.assign({
    h1: "h1"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "protection-backups",
      children: "Protection: Backups"
    }), "\n", createVNode($$Criterias, {
      data: data$d,
      direction: "row"
    })]
  });
}
function MDXContent$J(props = {}) {
  return createVNode(MDXLayout$J, {
    ...props,
    children: createVNode(_createMdxContent$J, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$J, "astro:jsx");
__astro_tag_component__(MDXContent$J, "astro:jsx");
const url$J = "/en/charts/backups";
const file$J = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/charts/backups.mdx";
function rawContent$J() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$J() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$J = (props = {}) => MDXContent$J({
											...props,
											components: { Fragment, ...props.components },
										});
Content$J[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$J.layout);

const _page23 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$J,
  _internal: _internal$J,
  compiledContent: compiledContent$J,
  default: Content$J,
  file: file$J,
  frontmatter: frontmatter$J,
  getHeadings: getHeadings$J,
  rawContent: rawContent$J,
  url: url$J
}, Symbol.toStringTag, { value: 'Module' }));

const criterias$5 = [
	"Audited?",
	"Available on Linux?",
	"Available on Mac?",
	"Available on Windows?",
	"Available on Android?",
	"Available in F-Droid?",
	"Available on iOS?",
	"Free plan available?",
	"PGP support?",
	"Backup/Export available?",
	"Additional notes"
];
const tools$5 = {
	protonmail: {
		name: "ProtonMail",
		values: {
			"Audited?": "Yes",
			"Available on Linux?": "Web or Paid Bridge Only",
			"Available on Mac?": "Web or Paid Bridge Only",
			"Available on Windows?": "Web or Paid Bridge Only",
			"Available on Android?": "Yes",
			"Available in F-Droid?": "Yes",
			"Available on iOS?": "Yes",
			"Free plan available?": "Yes",
			"PGP support?": "Yes",
			"Backup/Export available?": "Yes",
			"Additional notes": [
				"Includes VPN service, Calendar, and Drive storage with all plans"
			]
		}
	},
	skiff: {
		name: "Skiff",
		values: {
			"Audited?": "Results not released",
			"Available on Linux?": "Web only",
			"Available on Mac?": "Yes",
			"Available on Windows?": "Web only",
			"Available on Android?": "Yes",
			"Available in F-Droid?": "No",
			"Available on iOS?": "Yes",
			"Free plan available?": "Yes",
			"PGP support?": "No",
			"Backup/Export available?": "Import only",
			"Additional notes": [
				"Includes collaborative workspace, calendar, and Drive storage with all plans"
			]
		}
	},
	tuta: {
		name: "Tuta",
		values: {
			"Audited?": "Web client only",
			"Available on Linux?": "Yes",
			"Available on Mac?": "Yes",
			"Available on Windows?": "Web only",
			"Available on Android?": "Yes",
			"Available in F-Droid?": "Yes",
			"Available on iOS?": "Yes",
			"Free plan available?": "Yes",
			"PGP support?": "No",
			"Backup/Export available?": "Individual export only",
			"Additional notes": [
				"Includes Calendar with all plans"
			]
		}
	}
};
const data$c = {
	criterias: criterias$5,
	tools: tools$5
};

const MDXLayout$I = async function ({
  children
}) {
  const Layout = (await import('../charts.67ef90d0.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$I;
  content.file = file$I;
  content.url = url$I;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$I,
    url: url$I,
    content,
    frontmatter: content,
    headings: getHeadings$I(),
    "server:root": true,
    children
  });
};
const frontmatter$I = {
  "layout": "@layouts/charts.astro",
  "title": "Privacy: Encrypted Email",
  "draft": false
};
const _internal$I = {
  injectedFrontmatter: {}
};
function getHeadings$I() {
  return [{
    "depth": 1,
    "slug": "privacy-encrypted-email",
    "text": "Privacy: Encrypted Email"
  }];
}
function _createMdxContent$I(props) {
  const _components = Object.assign({
    h1: "h1"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "privacy-encrypted-email",
      children: "Privacy: Encrypted Email"
    }), "\n", createVNode($$Criterias, {
      data: data$c,
      direction: "row"
    })]
  });
}
function MDXContent$I(props = {}) {
  return createVNode(MDXLayout$I, {
    ...props,
    children: createVNode(_createMdxContent$I, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$I, "astro:jsx");
__astro_tag_component__(MDXContent$I, "astro:jsx");
const url$I = "/en/charts/email";
const file$I = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/charts/email.mdx";
function rawContent$I() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$I() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$I = (props = {}) => MDXContent$I({
											...props,
											components: { Fragment, ...props.components },
										});
Content$I[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$I.layout);

const _page24 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$I,
  _internal: _internal$I,
  compiledContent: compiledContent$I,
  default: Content$I,
  file: file$I,
  frontmatter: frontmatter$I,
  getHeadings: getHeadings$I,
  rawContent: rawContent$I,
  url: url$I
}, Symbol.toStringTag, { value: 'Module' }));

const criterias$4 = [
	"Available on Android?",
	"Available in F-Droid?",
	"Available on iOS?",
	"Offers backups?",
	"Additional notes?"
];
const tools$4 = {
	"2fas": {
		name: "2FAS",
		values: {
			"Available on Android?": "Yes",
			"Available in F-Droid?": "No",
			"Available on iOS?": "Yes",
			"Offers backups?": "Yes",
			"Additional notes?": [
				"Syncs via iCloud, which is not [end-to-end encrypted](/guides/moderately-important/encryption/) even with Advanced Data Protection"
			]
		}
	},
	aegis: {
		name: "Aegis",
		values: {
			"Available on Android?": "Yes",
			"Available in F-Droid?": "Yes",
			"Available on iOS?": "No",
			"Offers backups?": "Yes",
			"Additional notes?": [
				"Automatic backups optional",
				"Optional backup straight to cloud"
			]
		}
	},
	ente: {
		name: "ente Authenticator",
		values: {
			"Available on Android?": "Yes",
			"Available in F-Droid?": "Yes",
			"Available on iOS?": "Yes",
			"Offers backups?": "Yes",
			"Additional notes?": [
				"Account required"
			]
		}
	}
};
const data$b = {
	criterias: criterias$4,
	tools: tools$4
};

const MDXLayout$H = async function ({
  children
}) {
  const Layout = (await import('../charts.67ef90d0.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$H;
  content.file = file$H;
  content.url = url$H;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$H,
    url: url$H,
    content,
    frontmatter: content,
    headings: getHeadings$H(),
    "server:root": true,
    children
  });
};
const frontmatter$H = {
  "layout": "@layouts/charts.astro",
  "title": "Data Breach Defense: Multifactor Authentication",
  "draft": false
};
const _internal$H = {
  injectedFrontmatter: {}
};
function getHeadings$H() {
  return [{
    "depth": 1,
    "slug": "data-breach-defense-multifactor-authentication",
    "text": "Data Breach Defense: Multifactor Authentication"
  }];
}
function _createMdxContent$H(props) {
  const _components = Object.assign({
    h1: "h1"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "data-breach-defense-multifactor-authentication",
      children: "Data Breach Defense: Multifactor Authentication"
    }), "\n", createVNode($$Criterias, {
      data: data$b,
      direction: "row"
    })]
  });
}
function MDXContent$H(props = {}) {
  return createVNode(MDXLayout$H, {
    ...props,
    children: createVNode(_createMdxContent$H, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$H, "astro:jsx");
__astro_tag_component__(MDXContent$H, "astro:jsx");
const url$H = "/en/charts/mfa";
const file$H = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/charts/mfa.mdx";
function rawContent$H() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$H() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$H = (props = {}) => MDXContent$H({
											...props,
											components: { Fragment, ...props.components },
										});
Content$H[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$H.layout);

const _page25 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$H,
  _internal: _internal$H,
  compiledContent: compiledContent$H,
  default: Content$H,
  file: file$H,
  frontmatter: frontmatter$H,
  getHeadings: getHeadings$H,
  rawContent: rawContent$H,
  url: url$H
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$G = async function ({
  children
}) {
  const Layout = (await import('../default.e3133db4.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$G;
  content.file = file$G;
  content.url = url$G;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$G,
    url: url$G,
    content,
    frontmatter: content,
    headings: getHeadings$G(),
    "server:root": true,
    children
  });
};
const frontmatter$G = {
  "layout": "@layouts/default.astro",
  "title": "Crypto",
  "draft": false,
  "center_content": true
};
const _internal$G = {
  injectedFrontmatter: {}
};
function getHeadings$G() {
  return [{
    "depth": 1,
    "slug": "cryptocurrencies",
    "text": "Cryptocurrencies"
  }, {
    "depth": 2,
    "slug": "bitcoin-btc",
    "text": "Bitcoin (BTC)"
  }, {
    "depth": 2,
    "slug": "monero-xmr",
    "text": "Monero (XMR)"
  }, {
    "depth": 2,
    "slug": "all-other-cryptocurrencies",
    "text": "All Other Cryptocurrencies"
  }];
}
function _createMdxContent$G(props) {
  const _components = Object.assign({
    h1: "h1",
    h2: "h2",
    p: "p",
    img: "img",
    a: "a"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "cryptocurrencies",
      children: "Cryptocurrencies"
    }), "\n", createVNode(_components.h2, {
      id: "bitcoin-btc",
      children: "Bitcoin (BTC)"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "/images/qr-codes/btc.png",
        alt: "bitcoin qr code"
      })
    }), "\n", createVNode(_components.p, {
      children: "bc1qs45ua2gunvtxyxq5s973xq9td57rad4jtxa2rn"
    }), "\n", createVNode(_components.h2, {
      id: "monero-xmr",
      children: "Monero (XMR)"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "/images/qr-codes/xmr.png",
        alt: "monero qr code"
      })
    }), "\n", createVNode(_components.p, {
      children: "86WGgZpadMze4PmDd7YAR2MjxUBaunv8oXBrkzQTLjdBAaA8onHWc5ZMNwnW6axFAC8wFSswxDoapXMHFDwydq5fHEra79W"
    }), "\n", createVNode(_components.h2, {
      id: "all-other-cryptocurrencies",
      children: "All Other Cryptocurrencies"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "https://nowpayments.io/donation?api_key=3S472YJ-Y2VMNCX-N77S2RP-TVJ2Q2K",
        children: createVNode(_components.img, {
          src: "/images/graphics/donate-nowpayments.png",
          alt: "Crypto donation button by NOWPayments"
        })
      })
    })]
  });
}
function MDXContent$G(props = {}) {
  return createVNode(MDXLayout$G, {
    ...props,
    children: createVNode(_createMdxContent$G, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$G, "astro:jsx");
__astro_tag_component__(MDXContent$G, "astro:jsx");
const url$G = "/en/crypto";
const file$G = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/crypto.mdx";
function rawContent$G() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$G() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$G = (props = {}) => MDXContent$G({
											...props,
											components: { Fragment, ...props.components },
										});
Content$G[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$G.layout);

const _page26 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$G,
  _internal: _internal$G,
  compiledContent: compiledContent$G,
  default: Content$G,
  file: file$G,
  frontmatter: frontmatter$G,
  getHeadings: getHeadings$G,
  rawContent: rawContent$G,
  url: url$G
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$5 = createAstro("https://thenewoil.org");
const $$GuidesList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$GuidesList;
  const allPages = await Astro2.glob(/* #__PURE__ */ Object.assign({"../../pages/en/guides/less-important/disinformation.mdx": () => Promise.resolve().then(() => _page38),"../../pages/en/guides/less-important/five-eyes.mdx": () => Promise.resolve().then(() => _page39),"../../pages/en/guides/less-important/habits.mdx": () => Promise.resolve().then(() => _page41),"../../pages/en/guides/less-important/index.mdx": () => Promise.resolve().then(() => _page37),"../../pages/en/guides/less-important/iot.mdx": () => Promise.resolve().then(() => _page44),"../../pages/en/guides/less-important/messaging.mdx": () => Promise.resolve().then(() => _page40),"../../pages/en/guides/less-important/voip.mdx": () => Promise.resolve().then(() => _page42),"../../pages/en/guides/less-important/vpns.mdx": () => Promise.resolve().then(() => _page43),"../../pages/en/guides/moderately-important/backups.mdx": () => Promise.resolve().then(() => _page34),"../../pages/en/guides/moderately-important/desktop-settings.mdx": () => Promise.resolve().then(() => _page29),"../../pages/en/guides/moderately-important/devices.mdx": () => Promise.resolve().then(() => _page35),"../../pages/en/guides/moderately-important/email-aliasing.mdx": () => Promise.resolve().then(() => _page30),"../../pages/en/guides/moderately-important/email.mdx": () => Promise.resolve().then(() => _page36),"../../pages/en/guides/moderately-important/encryption.mdx": () => Promise.resolve().then(() => _page32),"../../pages/en/guides/moderately-important/index.mdx": () => Promise.resolve().then(() => _page27),"../../pages/en/guides/moderately-important/metadata.mdx": () => Promise.resolve().then(() => _page33),"../../pages/en/guides/moderately-important/mobile-habits.mdx": () => Promise.resolve().then(() => _page31),"../../pages/en/guides/moderately-important/public-protections.mdx": () => Promise.resolve().then(() => _page28),"../../pages/en/guides/most-important/browser.mdx": () => Promise.resolve().then(() => _page51),"../../pages/en/guides/most-important/credit.mdx": () => Promise.resolve().then(() => _page52),"../../pages/en/guides/most-important/data-breaches.mdx": () => Promise.resolve().then(() => _page47),"../../pages/en/guides/most-important/index.mdx": () => Promise.resolve().then(() => _page45),"../../pages/en/guides/most-important/mfa.mdx": () => Promise.resolve().then(() => _page54),"../../pages/en/guides/most-important/mobile-apps.mdx": () => Promise.resolve().then(() => _page48),"../../pages/en/guides/most-important/mobile-settings.mdx": () => Promise.resolve().then(() => _page46),"../../pages/en/guides/most-important/mobile.mdx": () => Promise.resolve().then(() => _page53),"../../pages/en/guides/most-important/passwords.mdx": () => Promise.resolve().then(() => _page49),"../../pages/en/guides/most-important/payments.mdx": () => Promise.resolve().then(() => _page50),"../../pages/en/guides/prologue/communication.mdx": () => Promise.resolve().then(() => _page58),"../../pages/en/guides/prologue/index.mdx": () => Promise.resolve().then(() => _page57),"../../pages/en/guides/prologue/open-source.mdx": () => Promise.resolve().then(() => _page61),"../../pages/en/guides/prologue/secprivanon.mdx": () => Promise.resolve().then(() => _page62),"../../pages/en/guides/prologue/surveillance.mdx": () => Promise.resolve().then(() => _page59),"../../pages/en/guides/prologue/threat-model.mdx": () => Promise.resolve().then(() => _page60),"../../pages/en/guides/prologue/why.mdx": () => Promise.resolve().then(() => _page63),"../../pages/en/guides/quick-start/streamer-guide.mdx": () => Promise.resolve().then(() => _page55),"../../pages/en/guides/quick-start/wifi-guide.mdx": () => Promise.resolve().then(() => _page56)}), () => "../../pages/*/guides/*/*");
  const pages = allPages.filter((page) => page.url?.includes(Astro2.url.pathname)).sort((a, b) => a.frontmatter.weight - b.frontmatter.weight);
  return renderTemplate`${maybeRenderHead($$result)}<ul class="grid grid-cols-1 gap-8 px-0 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
  ${pages.map(
    (page) => page.frontmatter.topic && renderTemplate`<li class="w-full list-none">
            <a class="flex h-40 w-full items-center justify-center rounded-lg border-4 border-solid p-4 text-center font-semibold border-gradient-secondary border-bg-primary dark:border-bg-primary-dark"${addAttribute(page.url, "href")}>
              ${page.frontmatter.topic}
            </a>
          </li>`
  )}
</ul>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/common/GuidesList.astro");

const MDXLayout$F = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$F;
  content.file = file$F;
  content.url = url$F;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$F,
    url: url$F,
    content,
    frontmatter: content,
    headings: getHeadings$F(),
    "server:root": true,
    children
  });
};
const frontmatter$F = {
  "layout": "@layouts/guides.astro",
  "title": "Introduction",
  "section_title": "Moderately Important",
  "section_weight": 50,
  "weight": 1,
  "draft": false
};
const _internal$F = {
  injectedFrontmatter: {}
};
function getHeadings$F() {
  return [{
    "depth": 1,
    "slug": "moderately-important-section-introduction",
    "text": "Moderately Important: Section Introduction"
  }];
}
function _createMdxContent$F(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    a: "a",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "moderately-important-section-introduction",
      children: "Moderately Important: Section Introduction"
    }), "\n", createVNode(_components.p, {
      children: ["These are things that are important, but not critical. While the last section focused more on security, this section pertains mostly to privacy and offers concepts, tools, and tips to reduce data collection. In 2016, the world learned through the ", createVNode(_components.a, {
        href: "https://en.wikipedia.org/wiki/Facebook%E2%80%93Cambridge_Analytica_data_scandal",
        children: "Cambridge Analytica scandal"
      }), " that ", createVNode(_components.strong, {
        children: "data collection can easily be abused for more than just targeted advertising."
      }), " It can easily be abused to sway entire populations of people to vote in ways they wouldn\u2019t normally vote and change the course of history on a macroscopic level. Protecting your privacy isn\u2019t just about not being swayed by an advertisement, it\u2019s about protecting yourself from propaganda, misinformation, and other unseen, future threats."]
    }), "\n", createVNode(_components.p, {
      children: "This section covers the following:"
    }), "\n", createVNode($$GuidesList, {}), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: ["This section will help protect you from a lot of the \u201Cunconscious surveillance\u201D I mentioned in the ", createVNode(_components.a, {
          href: "/guides/prologue/surveillance",
          children: "Understanding Surveillance"
        }), " section."]
      }), " It will help protect you from bots that read your emails and texts, from location-scraping apps and services, ", createVNode(_components.strong, {
        children: "and future-proof you against unforeseen future threats."
      }), " Some of the advice in this section will take more effort on your part, but it will be worth it."]
    })]
  });
}
function MDXContent$F(props = {}) {
  return createVNode(MDXLayout$F, {
    ...props,
    children: createVNode(_createMdxContent$F, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$F, "astro:jsx");
__astro_tag_component__(MDXContent$F, "astro:jsx");
const url$F = "/en/guides/moderately-important";
const file$F = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/moderately-important/index.mdx";
function rawContent$F() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$F() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$F = (props = {}) => MDXContent$F({
											...props,
											components: { Fragment, ...props.components },
										});
Content$F[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$F.layout);

const _page27 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$F,
  _internal: _internal$F,
  compiledContent: compiledContent$F,
  default: Content$F,
  file: file$F,
  frontmatter: frontmatter$F,
  getHeadings: getHeadings$F,
  rawContent: rawContent$F,
  url: url$F
}, Symbol.toStringTag, { value: 'Module' }));

const removal = [
	{
		link: "https://joindeleteme.com/",
		img: "/images/logos/deleteme.svg",
		name: "DeleteMe"
	},
	{
		link: "https://easyoptouts.com/",
		img: "/images/logos/easyoptouts.png",
		name: "EasyOptOuts"
	},
	{
		link: "https://www.mydataremoval.com/",
		img: "/images/logos/mydataremoval.png",
		name: "MyDataRemoval"
	}
];

const MDXLayout$E = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$E;
  content.file = file$E;
  content.url = url$E;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$E,
    url: url$E,
    content,
    frontmatter: content,
    headings: getHeadings$E(),
    "server:root": true,
    children
  });
};
const frontmatter$E = {
  "layout": "@layouts/guides.astro",
  "title": "Protection: Trusts, LLCs, and Public Data",
  "topic": "People Search Sites and Some Ways Around Them",
  "weight": 10,
  "draft": false
};
const _internal$E = {
  injectedFrontmatter: {}
};
function getHeadings$E() {
  return [{
    "depth": 1,
    "slug": "protection-trusts-llcs-and-public-data",
    "text": "Protection: Trusts, LLCs, and Public Data"
  }, {
    "depth": 2,
    "slug": "why-should-i-care",
    "text": "Why Should I Care?"
  }, {
    "depth": 2,
    "slug": "removing-the-data",
    "text": "Removing the Data"
  }, {
    "depth": 2,
    "slug": "keeping-the-data-gone",
    "text": "Keeping the Data Gone"
  }];
}
function _createMdxContent$E(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    em: "em",
    a: "a",
    h2: "h2"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "protection-trusts-llcs-and-public-data",
      children: "Protection: Trusts, LLCs, and Public Data"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Disclaimer: I am not a lawyer."
      }), " Laws vary from place to place. I am sharing my experiences and what I\u2019ve read from other experts. If you are intrigued by this subject, I highly recommend you read ", createVNode(_components.em, {
        children: createVNode(_components.a, {
          href: "https://inteltechniques.com/book7.html",
          children: "Extreme Privacy"
        })
      }), " by Michael Bazzell or ", createVNode(_components.em, {
        children: createVNode(_components.a, {
          href: "https://www.amazon.com/dp/1250010454",
          children: "How to be Invisible (3rd Edition)"
        })
      }), " by JJ Luna and speak to an estate planning attorney in your area."]
    }), "\n", createVNode(_components.p, {
      children: "I\u2019ve mentioned how public information gets sold, resold, and scraped up and eventually finds its way onto the internet. If you\u2019ve never done this before, I encourage you to Google your full name, your SIM phone number, your address, or your email address (or any combination of those). You might be surprised what turns up. I strongly recommend that remove as much of this information as you can."
    }), "\n", createVNode(_components.h2, {
      id: "why-should-i-care",
      children: "Why Should I Care?"
    }), "\n", createVNode(_components.p, {
      children: ["Previously, this was not a subject I included on my website, but recently I\u2019ve felt it more and more important to list it. ", createVNode(_components.strong, {
        children: "With the rise of people search websites, and the rise of ideologically based violence in the world, I feel like not only has this extreme measure become worth listing, but also one worth taking seriously."
      }), " I know this sounds paranoid, but consider the following:"]
    }), "\n", createVNode(_components.p, {
      children: ["Good privacy and security are proactive, not reactive. You never know when you might suddenly end up in the spotlight. You never know when some angry kid on the internet will ", createVNode(_components.a, {
        href: "https://edition.cnn.com/2019/03/30/us/swatting-what-is-explained/index",
        children: "SWAT"
      }), " you, or if something innocent like your ", createVNode(_components.a, {
        href: "https://www.nbcnews.com/news/us-news/tennessee-man-targeted-his-twitter-handle-dies-after-swatting-call-n1274747",
        children: "Twitter handle"
      }), " will land you in hot water with a cyber criminal. You could even ", createVNode(_components.a, {
        href: "https://people.com/celebrity/employees-who-were-fired-because-of-social-media-posts/",
        children: "lose your job"
      }), " over it or have your life ruined by ", createVNode(_components.a, {
        href: "https://write.as/thenewoil/case-study-online-dating-scams-and-why-privacy-is-not-a-reactive-issue",
        children: "false accusations"
      }), " and honest mistakes. ", createVNode(_components.strong, {
        children: "By the time you\u2019re in the hot seat, it\u2019s too late."
      }), " You can\u2019t unpublish your information or nicely ask the press to leave you alone. No matter your opinions, occupation, or goals, I consider it extremely important to try to keep your personal information out of public record."]
    }), "\n", createVNode(_components.h2, {
      id: "removing-the-data",
      children: "Removing the Data"
    }), "\n", createVNode(_components.p, {
      children: "There are two main ways to go about doing this: the automated way, and the manual way. The automated way is easiest and will likely work for the vast majority of people with low threat models. In that case, you can go with a data removal service such as the ones listed here. You can go with others if you feel more comfortable, but sure to ask them what data they remove. Some only remove information like email address, while others remove far more. The ones here remove, at a minimum, name, phone number, and home address from the major known people search sites and do so at least once every six months."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "Listed in alphabetical order, not order of recommendation"
      })
    }), "\n", createVNode($$LinkGrid, {
      items: removal
    }), "\n", createVNode(_components.p, {
      children: ["For those who wish to do so manually, Michael Bazzell offers a ", createVNode(_components.a, {
        href: "https://inteltechniques.com/links.html",
        children: "free workbook"
      }), " that you can use to help scrub this information. This workbook is the golden standard. For those with the time, the manual removal is by far the best. It allows you to ensure you\u2019ve got all the data possible and even catches stuff the automated services may miss, or you can decide if you want to leave certain information up for any reason (like incorrect information to throw off a would-be stalker)."]
    }), "\n", createVNode(_components.p, {
      children: "For those with some time to spare but not a lot, I recommend a mix of both approaches. An automated service can be a great way to get the bulk of the removal done, all the \u201Clow-hanging fruit.\u201D Then you can come back a few months later after all that easy stuff has been removed and check for any remnants."
    }), "\n", createVNode(_components.p, {
      children: "In my experience, the best way to manually check for data outside of the sites listed by your service of choice and Michael Bazzell\u2019s workbook is to use Google (or another effective search engine) for your name, email address, or phyiscal address in quotes. The more data you remove, the more the old, forgotten stuff will rise to the surface. Therefore I encourage you to go back a few times a year and check for anything the automated services have missed. This may include forgotten social media posts, accounts, or new, smaller public data sites."
    }), "\n", createVNode(_components.h2, {
      id: "keeping-the-data-gone",
      children: "Keeping the Data Gone"
    }), "\n", createVNode(_components.p, {
      children: "It\u2019s important to note that whichever method you use to remove your data, it will just come back unless you cut off the flow of information at the sources. There are a number of ways to tackle this, and they range from complicated to illegal. As such, I want to again remind you that I am not encouraging you to use these techniques to defraud anyone. Pay attention to your finances, pay your bills, and keep true to your word."
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Obscuring your home address is not difficult, but require a lot of work and determination."
      }), " The first option for housing is to rent from an individual landlord and ask them to keep all the utilities in their name. This is an unusual request, so expect to be met with resistance. You\u2019ll have better luck if you offer all or a large chunk of the rent up front or if you agree to pay a premium. You could also try a white lie, saying that you have an abusive ex or stalker in your past and you\u2019re trying to keep your name off public records. That might help sway them to your cause. As long as you can get them to trust that you\u2019re paying, they probably won\u2019t mind."]
    }), "\n", createVNode(_components.p, {
      children: ["The second option for housing depends on whether you plan to buy or rent. If you plan to buy, buy your home in a trust and cite estate planning purposes as your reason. That way the trust will show up in public records but not your name. Michael Bazzell talks about this extensively in his book. If you plan to rent from a larger landlord who won\u2019t let you stay there \u201Cunder the table,\u201D a shell corporation is typically the best approach. When seeking an apartment that will rent to a shell corporation, ask if they do \u201Ccorporate rentals.\u201D ", createVNode(_components.strong, {
        children: "Be sure to do your research and check your local laws."
      }), " Most states require an LLC to publicly name an agent. For most people this won\u2019t be an issue, as this still creates a layer between your name and your home, however be aware that it is only one layer and may not deter a more advanced advesary. If you require additional protection, you could hire a lawyer and have them listed, protecting you by attorney-client privilege. Typically as long as you don\u2019t do any business or have any income as that shell corporation, you won\u2019t have to pay any taxes (though you may still have to file and may have to pay an annual fee depending on the state). This is a complex subject but in most cases this is ideal for most people. Again, be sure to consult with a lawyer for a full idea of your options and available protections."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "If you have a home in a trust or LLC, utilities and vehicles are easier at that point."
      }), " If your threat level is low, you can just register them in the same name as the trust/LLC. For most people, this is adequate. If you need additional layers of protection, you can register your vehicle in a different trust/LLC. You could also do utilities in a separate trust/LlC but since the utilities will be servicing the home address, this is likely overkill in most situations. Your car insurance may cost a bit if you use an LLC as opposed to a trust more due to being a \u201Ccompany vehicle\u201D but sadly some of the more advanced privacy techniques require extra funds. For most people this may not be as vital as the home address and can be safely skipped altogether, but for those with more advanced threat models this should be considered."]
    }), "\n", createVNode(_components.p, {
      children: ["The final public record I\u2019ll mention here is DMV records. ", createVNode(_components.strong, {
        children: ["It\u2019s becoming increasingly popuplar for state motor vehicle agencies to ", createVNode(_components.a, {
          href: "https://www.cpomagazine.com/data-privacy/state-dmvs-selling-personal-data-for-millions-of-dollars-in-profit/",
          children: "sell"
        }), " drivers license information to data brokers"]
      }), " for an easy income stream, at which point that data can further make its way onto the internet. The best way to defend against this is a nomad driver\u2019s license, but again these are complicated. According to Michael Bazzell, Texas and South Dakota are the best states for this, but even so this may not be an ideal strategy for many people. There are a lot of factors at play regarding the state you wish to reside in, and many states are doing away with this license. In my experience, the best strategy is contact your local DMV, claim that you are caruious about taking up an RV lifestyle in the near future and how you can still maintain your state license in that situation."]
    }), "\n", createVNode(_components.p, {
      children: ["Finally, ", createVNode(_components.strong, {
        children: "those with advanced threat models may wish to consider getting an anonymous phone."
      }), " Certain companies will sell phone location data to anyone who asks, allowing a stalker with your phone number to easily track down your location history, including your home. Start by checking my ", createVNode(_components.a, {
        href: "/guides/moderately-important/mobile-habits",
        children: "Mobile Habits"
      }), " page. Couple that advice with ", createVNode(_components.a, {
        href: "/guides/less-important/disinformation",
        children: "disinformation"
      }), " when registering, and use ", createVNode(_components.a, {
        href: "/guides/less-important/voip",
        children: "Voice-over-IP"
      }), " so nobody even knows what number to look for. Not everyone needs to take this advanced step, but if you\u2019re able to, I definitely encourage readers to be proactive."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Note:"
      }), " Be sure to couple these strategies with a PO Box or ghost address. All this hard work can be easily undone if you do things like have packages shipped to your home or use your real address for a mailing address."]
    }), "\n", createVNode(_components.p, {
      children: "There are many, many more public records and hidden deals that could leak your personal data, from marriage licenses to university records. I could dedicate an entire site just to that stuff alone. The goal of this particular page was not to be a comprehensive source, but rather just to get you thinking about this stuff. I recommend you consult Michael Bazzell\u2019s book or a lawyer for more information."
    })]
  });
}
function MDXContent$E(props = {}) {
  return createVNode(MDXLayout$E, {
    ...props,
    children: createVNode(_createMdxContent$E, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$E, "astro:jsx");
__astro_tag_component__(MDXContent$E, "astro:jsx");
const url$E = "/en/guides/moderately-important/public-protections";
const file$E = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/moderately-important/public-protections.mdx";
function rawContent$E() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$E() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$E = (props = {}) => MDXContent$E({
											...props,
											components: { Fragment, ...props.components },
										});
Content$E[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$E.layout);

const _page28 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$E,
  _internal: _internal$E,
  compiledContent: compiledContent$E,
  default: Content$E,
  file: file$E,
  frontmatter: frontmatter$E,
  getHeadings: getHeadings$E,
  rawContent: rawContent$E,
  url: url$E
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$D = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$D;
  content.file = file$D;
  content.url = url$D;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$D,
    url: url$D,
    content,
    frontmatter: content,
    headings: getHeadings$D(),
    "server:root": true,
    children
  });
};
const frontmatter$D = {
  "layout": "@layouts/guides.astro",
  "title": "Privacy: Securing Desktop",
  "topic": "Recommended Desktop/Laptop Settings",
  "weight": 6,
  "draft": false
};
const _internal$D = {
  injectedFrontmatter: {}
};
function getHeadings$D() {
  return [{
    "depth": 1,
    "slug": "privacy-securing-computers",
    "text": "Privacy: Securing Computers"
  }, {
    "depth": 2,
    "slug": "mac-os-13-ventura",
    "text": "Mac OS 13: Ventura"
  }, {
    "depth": 2,
    "slug": "windows-11",
    "text": "Windows 11"
  }, {
    "depth": 3,
    "slug": "windows-10",
    "text": "Windows 10"
  }, {
    "depth": 2,
    "slug": "best-practices",
    "text": "Best Practices"
  }];
}
function _createMdxContent$D(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    a: "a",
    strong: "strong",
    h2: "h2",
    ul: "ul",
    li: "li",
    h3: "h3"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "privacy-securing-computers",
      children: "Privacy: Securing Computers"
    }), "\n", createVNode(_components.p, {
      children: ["Just like cell phones, desktop operating systems like Windows and Mac track their users to an excessive degree. ", createVNode(_components.a, {
        href: "https://web.archive.org/web/20220313023015/https://www.privacyguides.org/operating-systems/#win10",
        children: "Windows 10 is by far the worst offender"
      }), ", however Mac also has their share of telemetry."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: ["In a perfect world, the best option is ", createVNode(_components.a, {
          href: "https://io9.gizmodo.com/getting-started-with-linux-the-complete-guide-5778882",
          children: "Linux"
        }), "."]
      }), " Linux is an open-source operating system with dozens of variants (called \u201Cdistros,\u201D short for \u201Cdistributions\u201D), each offering their own unique set of features and target audience. Most linux distros are considerably more private compared to Windows and Mac, though some place additional emphasis on privacy or security. My recommended distro depends on your plans. If you want something that \u201Cjust works\u201D out of the box and you have no desire to really master the command line, become a Linux expert, or advance on to further Linux-based subjects (such as self-hosting), then I strongly recommend ", createVNode(_components.a, {
        href: "https://silverblue.fedoraproject.org/",
        children: "Fedora Silverblue"
      }), ". Silverblue is an official variant of Fedora that offers an \u201Cimmutable\u201D base operating system, making it quite resilient (though not impervious) against malware and other unwanted changes. Users can find most common programs as a ", createVNode(_components.a, {
        href: "https://flathub.org/home",
        children: "Flatpak"
      }), " or ", createVNode(_components.a, {
        href: "https://snapcraft.io/",
        children: "Snap"
      }), " package, which basically installs programs as self-contained, sandboxed \u201Capps\u201D which improves security without sacrificing stability or usability. (This is an oversimplification, but should give you a general idea of how Flatpaks and Snaps works.)"]
    }), "\n", createVNode(_components.p, {
      children: ["For those who wish to someday become Linux experts or move on to things like self-hosting, I recommend starting with ", createVNode(_components.a, {
        href: "https://pop.system76.com/",
        children: "Pop! OS"
      }), ". It is based on Ubuntu, so you\u2019ll find the most abundant and easy-to-understand support from a plethora of online resources, and it has a very user-friendly interface that most users will easily adjust to while learning more advanced skills like the terminal. Whatever distro you choose, please note that while Linux is usually significantly better for privacy, it is not necessarily a huge improvement in security and in some cases can actually be ", createVNode(_components.a, {
        href: "https://madaidans-insecurities.github.io/linux.html",
        children: "worse"
      }), ". However, as with ", createVNode(_components.a, {
        href: "/guides/most-important/browser",
        children: "web browsers"
      }), ", I believe that this tradeoff is insignificant for most users, provided that you use good ", createVNode(_components.a, {
        href: "/guides/less-important/habits",
        children: "online habits"
      }), " and are reasonably cautious."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Not everybody has the luxury of switching to Linux"
      }), " for any number of reasons, such as needing a a specialized program that only runs on Mac/Windows or being in possession of a device that is technically not yours and therefore you can\u2019t make such changes to. For those situations, I have listed a set of recommend settings for both Mac and Windows that I encourage you to change (if you can) to make your device a little more private and secure. You can see my criteria for this page and why I recommended these settings ", createVNode(_components.a, {
        href: "https://gitlab.com/thenewoil/website/-/wikis/Mobile-&-Destkop-Settings-and-Apps-Criteria",
        children: "here"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "mac-os-13-ventura",
      children: "Mac OS 13: Ventura"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "If you are setting up a new device from scratch, please note that you should be able to continue through setup without entering an Apple ID. You can get all of the programs I recommend without using the App Store, and major system updates will still be applied even without signing in. Note that your apps will not auto-update, however (the system will if you apply the appropriate setting below)."
      }), "\n", createVNode(_components.li, {
        children: "Wi-Fi > Details (next to your current network) > Limit IP address tracking: enable"
      }), "\n", createVNode(_components.li, {
        children: ["Wi-Fi > Details (next to your current network) > DNS: Set a privacy-respecting ", createVNode(_components.a, {
          href: "/guides/prologue/communication#dns",
          children: "DNS"
        }), " (ignore this if you plan to use a ", createVNode(_components.a, {
          href: "/guides/less-important/vpns",
          children: "VPN"
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: "Bluetooth: Turn off whenever not in use"
      }), "\n", createVNode(_components.li, {
        children: "Network > Firewall > Firewall: Enable"
      }), "\n", createVNode(_components.li, {
        children: "Notifications > Allow notifications when the display is sleeping: Off"
      }), "\n", createVNode(_components.li, {
        children: "Notifications > Allow notifications when the screen is locked: Off"
      }), "\n", createVNode(_components.li, {
        children: "Notifications > Allow notifications when mirroring or sharing: Off"
      }), "\n", createVNode(_components.li, {
        children: "General > Software Update: Enable all"
      }), "\n", createVNode(_components.li, {
        children: "General > AirDrop & Handoff: Disable all"
      }), "\n", createVNode(_components.li, {
        children: "General > Sharing: Disable all"
      }), "\n", createVNode(_components.li, {
        children: "Time Machine: Back Up Automatically?"
      }), "\n", createVNode(_components.li, {
        children: "General > Time Machine: Select Backup Disk"
      }), "\n", createVNode(_components.li, {
        children: "General > Time Machine > Options: Back up frequency: Set to your desired frequency"
      }), "\n", createVNode(_components.li, {
        children: "Siri & Spotlight: Disable all"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & Security > Location Services: Disable anything you don\u2019t need"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & Security: Examine all other apps to ensure they only have the necessary permissions"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & Security > Analytics & Improvements: Disable all"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & Security > Apple Advertising > Personalized Ads: Disable"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & Securityy > Security > Allow apps downloaded from: App Store and identified developers"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & Security > Allow accessories to connect: Ask for new"
      }), "\n", createVNode(_components.li, {
        children: ["Privacy & Security > FileVault: Turn On FileVault (or use ", createVNode(_components.a, {
          href: "/guides/moderately-important/devices",
          children: "Veracrypt"
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["Privacy & Security > Lockdown Mode: On (This will ", createVNode(_components.a, {
          href: "https://support.apple.com/en-us/HT212650",
          children: "disable"
        }), " a significant number of features, however if you are able to live without them, it will help protect other users who need this feature from being ", createVNode(_components.a, {
          href: "https://www.techspot.com/news/95767-apple-upcoming-lockdown-mode-make-devices-easier-fingerprint.html",
          children: "easily identified"
        }), ".)"]
      }), "\n", createVNode(_components.li, {
        children: ["Desktop & Dock > Default web browser: ", createVNode(_components.a, {
          href: "/guides/most-important/browser",
          children: "Brave/Firefox"
        })]
      }), "\n", createVNode(_components.li, {
        children: "Lock Screen > Require password after screen saver begins or display is turned off: Immediately"
      }), "\n", createVNode(_components.li, {
        children: "Touch ID & Password: Use of a fingerprint is personal preference, so long as a strong password or passphrase is also in use."
      }), "\n", createVNode(_components.li, {
        children: ["Internet Accounts > iCloud: I strongly discourage the use of iCloud as I believe most of its benefits can be replicated in a more privacy-respecting way using other services listed on this site. However, if you wish to use iCloud, enable ", createVNode(_components.a, {
          href: "#",
          children: "Advanced Data Protection"
        }), "."]
      }), "\n", createVNode(_components.li, {
        children: "Wallet & Apple Pay: I do not recommend the use of these services"
      }), "\n", createVNode(_components.li, {
        children: "Keyboard > Dictation: Off"
      }), "\n", createVNode(_components.li, {
        children: ["Advanced users who want more granular control and feel comfortable making extreme changes may want to look into ", createVNode(_components.a, {
          href: "https://www.obdev.at/products/littlesnitch/index.html",
          children: "Little Snitch"
        }), " or ", createVNode(_components.a, {
          href: "https://objective-see.com/products/lulu.html",
          children: "LuLu"
        }), ". These are firewalls to help further control the traffic leaving your device and reduce data collection by Apple and others."]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "windows-11",
      children: "Windows 11"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "If you are installing Windows 11 from scratch, please note that the Home version will offer you the least amount of control regarding settings and disabling telemetry and analytics. If possible, you should try to get Pro, Education, or Enterprise editions. However, these frequently cost more than the Home version (which is usually included free when purchasing the device), sometimes several hundred dollars for a single license. As such, this guide is written for the Home version."
      }), "\n", createVNode(_components.li, {
        children: "If you are installing Windows 11 from scratch, please note that you can install it without a Microsoft account. This can be done by simply unplugging the ethernet cable and skipping the WiFi connection during install. You will receive a warning that you\u2019ll miss out on features, but these features are not relevant to security and avoiding an online account will improve your privacy slightly."
      }), "\n", createVNode(_components.li, {
        children: "Finally, if you are installing Windows 11 from scratch, you should select \u201CEnglish (World)\u201D as a language during the setup. I\u2019ve seen several sources claim that this will dramatically reduce (if not entirely eliminate) the number of preinstalled third-party apps and software (aka \u201Cbloatware\u201D) such as Candy Crush and Spotify. I have not tested this myself yet, but I see no reason not to at least try it."
      }), "\n", createVNode(_components.li, {
        children: "System > Notifications: Off"
      }), "\n", createVNode(_components.li, {
        children: "System > Storage > Storage Sense: On"
      }), "\n", createVNode(_components.li, {
        children: "System > Nearby sharing: Off"
      }), "\n", createVNode(_components.li, {
        children: "Bluetooth & devices > Bluetooth: Off whenever not in use"
      }), "\n", createVNode(_components.li, {
        children: "Bluetooth & devices > Phone Link: Do not link your phone"
      }), "\n", createVNode(_components.li, {
        children: "Bluetooth & devices > AutoPlay: Off"
      }), "\n", createVNode(_components.li, {
        children: "Network & internet > Wi-Fi > Random hardware addresses: On"
      }), "\n", createVNode(_components.li, {
        children: "Network & internet > Ethernet > Network profile type: Public network"
      }), "\n", createVNode(_components.li, {
        children: "Personalization > Lock screen: Leave the default picture, or pick something that does not reveal any personal information (ex, don\u2019t put a family photo as your lock screen)"
      }), "\n", createVNode(_components.li, {
        children: "Personalization > Device usage: Turn everything off"
      }), "\n", createVNode(_components.li, {
        children: "Apps > Installed apps: Uninstall anything you don\u2019t use"
      }), "\n", createVNode(_components.li, {
        children: "Apps > Advanced app settings > Choose were to get apps: installing apps from the Microsoft Store offers better security due to sandboxing, but may also affect privacy by introducing additional analytics and telemetry. Pick this setting accordingly."
      }), "\n", createVNode(_components.li, {
        children: "Accounts: Give your account a nondescript username, like \u201Cuser\u201D or \u201Cadmin\u201D instead of \u201CBob\u201D or \u201Cbsmith\u201D (this can be done in Control Panel > User Accounts > User Accounts)"
      }), "\n", createVNode(_components.li, {
        children: "Accounts > Your info: pick a profile picture that doesn\u2019t reveal any personal information."
      }), "\n", createVNode(_components.li, {
        children: ["Accounts > Sign-in options > Ways to sign in: (in order of recommendation) Security key, Fingerprint recognition, Password (ideally a ", createVNode(_components.a, {
          href: "/guides/most-important/passwords",
          children: "passphrase"
        }), "), PIN, Picture Password, or Facial recognition."]
      }), "\n", createVNode(_components.li, {
        children: "Accounts > Sign-in options > Additional settings > If you\u2019ve been away\u2026: \u201CWhen PC wakes up from sleep.\u201D"
      }), "\n", createVNode(_components.li, {
        children: "Accounts > Sign-in options > Additional settings > Automatically save my restartable apps\u2026: Off"
      }), "\n", createVNode(_components.li, {
        children: "Accounts > Sign-in options > Additional settings > Show account details\u2026: Off"
      }), "\n", createVNode(_components.li, {
        children: "Accounts > Access work or school: Do not connect a work or school account. Legally, in the United States, your employer or school cannot force you to use a personal device. They must provide a device. Giving them access will give them some access to your data and some control over your device. (Note: I am not a lawyer, this is not legal advice, consult an actual lawyer if you are being pressued to use this setting.)"
      }), "\n", createVNode(_components.li, {
        children: "Time & language > Typing > Show text suggestions\u2026: Off"
      }), "\n", createVNode(_components.li, {
        children: "Time & language > Typing > Multilingual text suggestions: Off"
      }), "\n", createVNode(_components.li, {
        children: "Time & language > Typing > Autocorrect mispelled words: Off"
      }), "\n", createVNode(_components.li, {
        children: "Time & language > Typing > Highlight mispelled words: Off"
      }), "\n", createVNode(_components.li, {
        children: "Time & language > Typing > Typing insights: Off"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & security > Windows Security: Ensure you have green checks on \u201CVirus & threat protection,\u201D \u201CAccount protection,\u201D \u201CFirewall & network protection,\u201D \u201CApp & browser control,\u201D and \u201CDevice security.\u201D"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & security > General: Turn everything Off."
      }), "\n", createVNode(_components.li, {
        children: "Privacy & security > Speech: Off"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & security > Inking & typing personalizaton > Personal inking and typing dictionary: Off"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & security > Diganostics & feedback: Turn everythign Off."
      }), "\n", createVNode(_components.li, {
        children: "Privacy & security > Diagnostics & feedback > Delete diagnostic data: Delete"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & security > Activity history: Turn everything off"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & security > Activity history > Clear activity history for this account: Clear history"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & security > Search permissions > History: Off"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & security > Search permissions > History: Clear device search history"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & security > Search permissions > More settings: off"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & security > App permissions: Evaluate each of these categories, completely turn off any settings you don\u2019t use. For categories you do use, examine which apps have permission and revoke any apps that don\u2019t have a valid need for it."
      }), "\n", createVNode(_components.li, {
        children: "Windows Update: By default, Windows 11 automatic updates are enabled. I still recommending checking this tab periodically to ensure there were no errors updating (especially after the second Tuesday of each month, as this is when Microsoft pushes most of their updates)."
      }), "\n", createVNode(_components.li, {
        children: "Windows Update > Advanced options > Optional updates: I recommend checking this setting while you\u2019re checking your other system updates. These updates include things like drivers that will help keep your system running as smoothly as possible."
      }), "\n", createVNode(_components.li, {
        children: ["Download ", createVNode(_components.a, {
          href: "https://github.com/crazy-max/WindowsSpyBlocker/releases",
          children: "WindowsSpyBlocker"
        }), " and run it. Select option 1 \u201CTelemetry,\u201D then option 1 \u201CFirewall,\u201D and finally options 1 and 2, \u201CAdd extra rules,\u201D and \u201CAdd spy rules.\u201D After that\u2019s done, type \u201Cback\u201D to go back to the previous menu, then select option 2 \u201CNCSI,\u201D then select either option 2 or option 3, \u201CApply Debian NCSI\u201D or \u201CApply Firefox NCSI.\u201D"]
      }), "\n", createVNode(_components.li, {
        children: ["If you don\u2019t plan to use a ", createVNode(_components.a, {
          href: "/guides/less-important/vpns",
          children: "VPN"
        }), ", then I encourage you to use an ", createVNode(_components.a, {
          href: "https://www.privacyguides.org/dns/",
          children: "Encrypted DNS Resolver"
        }), ". Follow ", createVNode(_components.a, {
          href: "https://www.bleepingcomputer.com/news/microsoft/how-to-enable-dns-over-https-doh-in-windows-10/",
          children: "these instructions"
        }), " to change your DNS. Select \u201CEncrypted preferred, unencrypted allowed\u201D if the option is available. If the option is not available, the rest of the steps should still apply."]
      }), "\n", createVNode(_components.li, {
        children: ["Advanced users who want more granular control and feel comfortable making extreme changes may want to look into ", createVNode(_components.a, {
          href: "https://www.w10privacy.de/english-home/",
          children: "W10Privacy"
        }), " and ", createVNode(_components.a, {
          href: "https://www.bcuninstaller.com/",
          children: "Bulk Crap Uninstaller"
        }), " to remove additional, pre-installed bloatware and ", createVNode(_components.a, {
          href: "https://safing.io/portmaster/",
          children: "Portmaster"
        }), " or ", createVNode(_components.a, {
          href: "https://www.henrypp.org/product/simplewall",
          children: "Simplewall"
        }), " for additional firewall controls to block outgoing connections and further reduce data collection by Microsoft and other third parties."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Given the choice between Windows 10 and 11, you should pick Windows 11."
      }), " Experts agree that Windows 11 is ", createVNode(_components.a, {
        href: "https://www.pcmag.com/opinions/windows-11-is-ultra-secure-dont-mess-it-up",
        children: "significantly more secure"
      }), " than Windows 10. However, Windows 11 also comes with some strict hardware requirements. If you are unable to use Windows 11 for any reason, I have listed my recommended settings for Windows 10 below."]
    }), "\n", createVNode(_components.h3, {
      id: "windows-10",
      children: "Windows 10"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "If you are installing Windows 10 from scratch, please note that the Home version will offer you the least amount of control regarding settings and disabling telemetry and analytics. If possible, you should try to get Pro, Education, or Enterprise editions. However, these frequently cost more than the Home version (which is usually included free when purchasing the device), sometimes several hundred dollars for a single license. As such, this guide is written for the Home version."
      }), "\n", createVNode(_components.li, {
        children: "If you are installing Windows 10 from scratch, please note that you can install it without a Microsoft account. This can be done by simply unplugging the ethernet cable and skipping the WiFi connection during install. You will receive a warning that you\u2019ll miss out on features, but these features are not relevant to security and avoiding an online account will improve your privacy slightly."
      }), "\n", createVNode(_components.li, {
        children: "Finally, if you are installing Windows 10 from scratch, you should select \u201CEnglish (World)\u201D as a language during the setup. I\u2019ve seen several sources claim that this will dramatically reduce (if not entirely eliminate) the number of preinstalled third-party apps and software (aka \u201Cbloatware\u201D) such as Candy Crush and Spotify. I have not tested this myself yet, but I see no reason not to at least try it."
      }), "\n", createVNode(_components.li, {
        children: "System > Notifications & actions > Show notifications on the lock screen: Off"
      }), "\n", createVNode(_components.li, {
        children: "System > Storage > Storage Sense: On"
      }), "\n", createVNode(_components.li, {
        children: "System > Shared experiences > Share across devices: Off"
      }), "\n", createVNode(_components.li, {
        children: "Devices > Typing: Everything off"
      }), "\n", createVNode(_components.li, {
        children: "Devices > AutoPlay: Off"
      }), "\n", createVNode(_components.li, {
        children: "Phone: Do not link"
      }), "\n", createVNode(_components.li, {
        children: "Network & Internet > Wi-Fi > Use random hardware addresses: On"
      }), "\n", createVNode(_components.li, {
        children: "Apps > Apps & features: Uninstall anything you don\u2019t use"
      }), "\n", createVNode(_components.li, {
        children: "Accounts > Sign-in options > Require sign-in: When PC wakes up from sleep"
      }), "\n", createVNode(_components.li, {
        children: "Accounts > Sign-in options > Password: Use a passphrase"
      }), "\n", createVNode(_components.li, {
        children: "Accounts > Sign-in options > Privacy > Show account details on sign-in screen: Off"
      }), "\n", createVNode(_components.li, {
        children: "Privacy > General: All off"
      }), "\n", createVNode(_components.li, {
        children: "Privacy > Speech: Online speech recognition: Off"
      }), "\n", createVNode(_components.li, {
        children: "Privacy > Inking & typing presonaliziation > Getting to know you: Off"
      }), "\n", createVNode(_components.li, {
        children: "Privacy > Diagnostics & feedback > Diagnostic data: Required diagnostic data"
      }), "\n", createVNode(_components.li, {
        children: "Privacy > Diagnostics & feedback > Improve inking & typing recognition: Off"
      }), "\n", createVNode(_components.li, {
        children: "Privacy > Diagnostics & feedback > Tailored experiences: Off"
      }), "\n", createVNode(_components.li, {
        children: "Privacy > Activity history > Send my activity history to Microsoft: Off"
      }), "\n", createVNode(_components.li, {
        children: "Privacy > App permisions: Review each setting and disable accordingly"
      }), "\n", createVNode(_components.li, {
        children: "Update & Security > Windows Security > Open Windows Security > Virus & Threat Protection: All protections on"
      }), "\n", createVNode(_components.li, {
        children: "Update & Security > Windows Security > Open Windows Security > Firewall & Network Protection: All firewalls on"
      }), "\n", createVNode(_components.li, {
        children: "Update & Security: Backup:"
      }), "\n", createVNode(_components.li, {
        children: ["Download ", createVNode(_components.a, {
          href: "https://github.com/crazy-max/WindowsSpyBlocker/releases",
          children: "WindowsSpyBlocker"
        }), " and run it. Select option 1 \u201CTelemetry,\u201D then option 1 \u201CFirewall,\u201D and finally options 1 and 2, \u201CAdd extra rules,\u201D and \u201CAdd spy rules.\u201D After that\u2019s done, type \u201Cback\u201D to go back to the previous menu, then select option 2 \u201CNCSI,\u201D then select either option 2 or option 3, \u201CApply Debian NCSI\u201D or \u201CApply Firefox NCSI.\u201D"]
      }), "\n", createVNode(_components.li, {
        children: ["If you don\u2019t plan to use a ", createVNode(_components.a, {
          href: "/guides/less-important/vpns",
          children: "VPN"
        }), ", then I encourage you to use an ", createVNode(_components.a, {
          href: "https://www.privacyguides.org/dns/",
          children: "Encrypted DNS Resolver"
        }), ". Follow ", createVNode(_components.a, {
          href: "https://www.bleepingcomputer.com/news/microsoft/how-to-enable-dns-over-https-doh-in-windows-10/",
          children: "these instructions"
        }), " to change your DNS. Select \u201CEncrypted preferred, unencrypted allowed\u201D if the option is available. If the option is not available, the rest of the steps should still apply."]
      }), "\n", createVNode(_components.li, {
        children: ["Advanced users who want more granular control and feel comfortable making extreme changes may want to look into ", createVNode(_components.a, {
          href: "https://www.w10privacy.de/english-home/",
          children: "W10Privacy"
        }), " and ", createVNode(_components.a, {
          href: "https://www.bcuninstaller.com/",
          children: "Bulk Crap Uninstaller"
        }), " to remove additional, pre-installed bloatware and ", createVNode(_components.a, {
          href: "https://safing.io/portmaster/",
          children: "Portmaster"
        }), " or ", createVNode(_components.a, {
          href: "https://www.henrypp.org/product/simplewall",
          children: "Simplewall"
        }), " for additional firewall controls to block outoing connections and further reduce data collection by Microsoft and other third parties."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "By enabling all of these settings, you are significantly reducing the amount of tracking and data collection these devices perform."
    }), "\n", createVNode(_components.h2, {
      id: "best-practices",
      children: "Best Practices"
    }), "\n", createVNode(_components.p, {
      children: ["By default, both Mac and Windows will create an administrator account when you sign up. After signing up, ", createVNode(_components.strong, {
        children: "create a second non-admin account and use that as your main account."
      }), " This makes it harder for programs to be installed without your knowledge and reduces the risk of malware and viruses getting installed."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Third-party antivirus software has become unnecessary."
      }), " Using a good ", createVNode(_components.a, {
        href: "/guides/most-important/browser",
        children: "ad blocker"
      }), " and good ", createVNode(_components.a, {
        href: "/guides/less-important/habits",
        children: "online habits"
      }), " is generally enough to keep any generic malware off your device. Both Windows and Mac both come with built-in malware protection that I encourage you to make use of. On Windows it\u2019s called ", createVNode(_components.a, {
        href: "https://www.microsoft.com/en-us/windows/comprehensive-security",
        children: "Defender"
      }), ". Macs come with ", createVNode(_components.a, {
        href: "https://www.howtogeek.com/217043/xprotect-explained-how-your-macs-built-in-anti-malware-works/",
        children: "XProtect"
      }), ". Linux does not ship with any stock antivirus programs, but ", createVNode(_components.a, {
        href: "https://www.clamav.net/",
        children: "Clam AV"
      }), " is the most commonly recommended.\nEven with all the ", createVNode(_components.a, {
        href: "/guides/most-important/browser",
        children: "plugins"
      }), ", tweaks, and changes we\u2019ve made to the operating system and the browser, sometimes tracking and other unnecessary files still get through."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Cleaning out these files will not only protect your privacy and security, but improve your computer\u2019s performance."
      }), " I recommend using ", createVNode(_components.a, {
        href: "https://www.bleachbit.org/",
        children: "BleachBit"
      }), " for this. This is a powerful program that securely deletes your unused files, removes errors from the registry, and fixes broken shortcuts among other things."]
    }), "\n", createVNode(_components.p, {
      children: ["Just as with ", createVNode(_components.a, {
        href: "/guides/moderately-important/mobile-habits",
        children: "phones"
      }), ", ", createVNode(_components.strong, {
        children: "I encourage you to have as few apps, programs, and files as possible on your computer."
      }), " Sometimes this is either impossible or just not a reasonable request but, for example, you can use your browser instead of an app to access Netflix or Hulu. I also encourage you to regularly look for and get rid of files you no longer want or need, such as photos of exes or documents you downloaded once so you could print them off. This could potentially be dangerous if your device falls into the wrong hands."]
    }), "\n", createVNode(_components.p, {
      children: "Keep in mind that forensic software can still often recover \u201Cdeleted\u201D items so if you have anything you want gone for good, be sure to perform a disk wipe, which is offered by Bleachbit. Don\u2019t do disk wipes on Solid State Drives as this will shorten their lifespans."
    })]
  });
}
function MDXContent$D(props = {}) {
  return createVNode(MDXLayout$D, {
    ...props,
    children: createVNode(_createMdxContent$D, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$D, "astro:jsx");
__astro_tag_component__(MDXContent$D, "astro:jsx");
const url$D = "/en/guides/moderately-important/desktop-settings";
const file$D = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/moderately-important/desktop-settings.mdx";
function rawContent$D() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$D() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$D = (props = {}) => MDXContent$D({
											...props,
											components: { Fragment, ...props.components },
										});
Content$D[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$D.layout);

const _page29 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$D,
  _internal: _internal$D,
  compiledContent: compiledContent$D,
  default: Content$D,
  file: file$D,
  frontmatter: frontmatter$D,
  getHeadings: getHeadings$D,
  rawContent: rawContent$D,
  url: url$D
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro("https://thenewoil.org");
const $$Plans = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Plans;
  const { data, direction: directionKey = "col", nonReferralLinkText = "Non-referral link" } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`rounded-lg border-4 border-gradient-secondary border-bg-primary dark:border-bg-primary-dark grid w-full overflow-auto ${directionKey === "row" ? `grid-flow-row grid-cols-[repeat(var(--length),auto)]` : `grid-flow-col grid-rows-[repeat(var(--length),auto)]`}`, "class")}${addAttribute(`--length: ${data.criterias.length + 2}`, "style")}>
  <div class="h-full rounded-none border-b-4 border-gradient-secondary-center p-4"></div>
  <div class="h-full rounded-none border-b-4 border-gradient-secondary-center p-4"></div>
  ${data.criterias.map((criteria, index) => {
    return renderTemplate`<div${addAttribute(`h-full p-4 ${(directionKey === "row" || index != data.criterias.length - 1) && "border-b-4 border-gradient-secondary-center"}`, "class")}>
          ${renderComponent($$result, "Markdown", Markdown, { "of": String(criteria) })}
        </div>`;
  })}

  ${Object.values(data.tools).map((tool, toolIndex) => {
    const plansKeys = Object.keys(tool.plans);
    return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<div${addAttribute(`flex w-full flex-col items-center justify-between gap-4 p-4 ${(directionKey != "row" || toolIndex != Object.values(data.tools).length - 1) && "border-b-4 border-gradient-secondary-center"}`, "class")}${addAttribute(`grid-column: span ${plansKeys.length} / span ${plansKeys.length}`, "style")}>
            ${tool.logo && renderTemplate`<a class="my-auto border-none"${addAttribute(tool.referral_link ? tool.referral_link : tool.link, "href")}>
                <img${addAttribute(tool.logo, "src")}${addAttribute(`${tool.name} logo`, "alt")}>
              </a>`}
            <div class="flex flex-col items-center">
              ${(tool.referral_link || tool.link) && renderTemplate`<a${addAttribute(tool.referral_link ? tool.referral_link : tool.link, "href")}>${tool.name}</a>`}
              ${tool.referral_link && tool.link && renderTemplate`<a${addAttribute(tool.link, "href")}>${nonReferralLinkText}</a>`}
              ${!tool.referral_link && !tool.link && renderTemplate`<p>${tool.name}</p>`}
            </div>
          </div>${plansKeys.map((planKey, planIndex) => {
      return renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`<div${addAttribute(`h-full p-4 ${(directionKey === "row" ? toolIndex != Object.values(data.tools).length - 1 : planIndex != data.criterias.length - 1) && "border-b-4 border-gradient-secondary-center"}`, "class")}>
                  ${renderComponent($$result3, "Markdown", Markdown, { "of": String(planKey) })}
                </div>${Object.values(tool.plans[planKey]).map((criteriaValue, index) => {
        return renderTemplate`<div${addAttribute(`h-full p-4 ${(directionKey === "row" ? toolIndex != Object.values(data.tools).length - 1 : index != data.criterias.length - 1) && "border-b-4 border-gradient-secondary-center"}`, "class")}>
                      ${renderComponent($$result3, "Markdown", Markdown, { "of": String(criteriaValue) })}
                    </div>`;
      })}` })}`;
    })}` })}`;
  })}
</div>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/charts/Plans.astro");

const criterias$3 = [
	"Aliases",
	"Bandwidth",
	"Reply/Send",
	"Mailboxes",
	"Custom domains",
	"PGP Encryption"
];
const tools$3 = {
	anonaddy: {
		name: "Addy.io",
		logo: "/images/logos/addyio.png",
		link: "https://addy.io/",
		plans: {
			Free: {
				Aliases: "Unlimited",
				Bandwidth: "10MB",
				"Reply/Send": 0,
				Mailboxes: 2,
				"Custom domains": 0,
				"PGP Encryption": "Yes"
			},
			Lite: {
				Aliases: "Unlimited",
				Bandwidth: "50MB",
				"Reply/Send": "20/day",
				Mailboxes: 5,
				"Custom domains": 1,
				"PGP Encryption": "Yes"
			},
			Pro: {
				Aliases: "Unlimited",
				Bandwidth: "Unlimited",
				"Reply/Send": "100/day",
				Mailboxes: 30,
				"Custom domains": 20,
				"PGP Encryption": "Yes"
			}
		}
	},
	simplelogin: {
		name: "SimpleLogin",
		logo: "/images/logos/simplelogin.png",
		referral_link: "https://simplelogin.io?slref=thenewoil",
		link: "https://simplelogin.io/",
		plans: {
			Free: {
				Aliases: 10,
				Bandwidth: "Unlimited",
				"Reply/Send": "Unlimited",
				Mailboxes: 1,
				"Custom domains": 0,
				"PGP Encryption": "No"
			},
			"Premium ($30/yr)": {
				Aliases: "Unlimited",
				Bandwidth: "Unlimited",
				"Reply/Send": "Unlimited",
				Mailboxes: "Unlimited",
				"Custom domains": "Unlimited",
				"PGP Encryption": "Yes"
			}
		}
	}
};
const data$a = {
	criterias: criterias$3,
	tools: tools$3
};

const MDXLayout$C = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$C;
  content.file = file$C;
  content.url = url$C;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$C,
    url: url$C,
    content,
    frontmatter: content,
    headings: getHeadings$C(),
    "server:root": true,
    children
  });
};
const frontmatter$C = {
  "layout": "@layouts/guides.astro",
  "title": "Data Breach Defense: Email Aliasing",
  "topic": "Email Aliasing",
  "weight": 8,
  "draft": false
};
const _internal$C = {
  injectedFrontmatter: {}
};
function getHeadings$C() {
  return [{
    "depth": 1,
    "slug": "data-breach-defense-email-aliasing",
    "text": "Data Breach Defense: Email Aliasing"
  }, {
    "depth": 2,
    "slug": "what-is-email-aliasing",
    "text": "What is Email Aliasing?"
  }, {
    "depth": 2,
    "slug": "why-do-i-need-email-aliasing",
    "text": "Why do I Need Email Aliasing?"
  }, {
    "depth": 2,
    "slug": "getting-started--tips--tricks",
    "text": "Getting Started + Tips & Tricks"
  }];
}
function _createMdxContent$C(props) {
  const _components = Object.assign({
    h1: "h1",
    h2: "h2",
    p: "p",
    a: "a",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "data-breach-defense-email-aliasing",
      children: "Data Breach Defense: Email Aliasing"
    }), "\n", createVNode(_components.h2, {
      id: "what-is-email-aliasing",
      children: "What is Email Aliasing?"
    }), "\n", createVNode(_components.p, {
      children: "Email aliasing services allow you to create unique, random email address for each situation where you would need a functional email address - signing up for a website, subscribing to a newsletter, etc - and have them forward to your true inbox."
    }), "\n", createVNode(_components.h2, {
      id: "why-do-i-need-email-aliasing",
      children: "Why do I Need Email Aliasing?"
    }), "\n", createVNode(_components.p, {
      children: ["Consider the following: a random online account of yours gets caught up in a data breach. When you registered for this account, you registered with your main email, ", createVNode(_components.a, {
        href: "mailto:yourname@gmail.com",
        children: "yourname@gmail.com"
      }), ". There are now a variety of ways that I can search for this email address to see where else you have accounts, such as Twitter, Facebook, even bank accounts. Furthermore, I can see from your email address that you use Gmail and I already have one half of your login. Now I just need to guess your password. ", createVNode(_components.strong, {
        children: "If I take over your primary email, I can easily take over all your other accounts by abusing the password reset option."
      }), " Of course, even without taking over the primary account, it\u2019s pretty common for people to reuse the same username (which in many cases is your email address) across several accounts, so now I already have half of your login on many websites (this is known as ", createVNode(_components.a, {
        href: "https://owasp.org/www-community/attacks/Credential_stuffing",
        children: "credential stuffing"
      }), ".) Another peripheral benefit is the ability to control spam. If one of your email addresses gets sold or breached (or the service you gave it to just sucks) and you start getting spam, you can simply disable it and no longer receive that spam. Finally, if you ever switch email providers, these services offer a simple way to change the recipient email inbox without having to log in to dozens (or hundreds) of services and change the email address."]
    }), "\n", createVNode(_components.p, {
      children: "Below I have listed two services that offer email aliasing. Both services offer a free tier that should work just fine for most users, but offer additional useful features for paid users. I have signed up for both and found them both to be functionally the same. The only real difference between the two services is their user interface and their pricing, both of which are affordable and reasonable. I encourage you to try both out and go with whichever one you find most appealing."
    }), "\n", createVNode(_components.p, {
      children: ["There is one small difference: SimpleLogin recently joined ", createVNode(_components.a, {
        href: "https://simplelogin.io/blog/simplelogin-join-proton/",
        children: "Proton"
      }), ", likely in some sort of \u201Csubsidiary\u201D capacity. They continue to operate independently, but they will have access to Proton\u2019s infrastructure, resources, and will be integrated into ProtonMail\u2019s service in time. If you like and use Proton, this may be the best solution for you. If you dislike or distrust Proton (or simply don\u2019t want all your eggs in one basket), you may prefer AnonAddy. If you don\u2019t care either way, then this shouldn\u2019t affect your decision-making."]
    }), "\n", createVNode($$Plans, {
      data: data$a
    }), "\n", createVNode(_components.h2, {
      id: "getting-started--tips--tricks",
      children: "Getting Started + Tips & Tricks"
    }), "\n", createVNode(_components.p, {
      children: "Like the other tools I have suggested on this site, I encourage you to make the changes one by one. Every time you use a website, take a moment to change your email address to an alias email address. I then encourage you to use your alias email addresses going forward."
    }), "\n", createVNode(_components.p, {
      children: "The biggest tip I have for using these services is to not use them for critically important accounts such as banking, medical, or other accounts you cannot afford to lose access to (unless you are using the custom domian feature). Email aliasing services are constantly getting blocklisted by companies, or they may go out of business. Have a separate encrypted email account directly with an established provider for use with important services (or, again, preferrably use a custom domain)."
    }), "\n", createVNode(_components.p, {
      children: ["With both AnonAddy and SimpleLogin, you can use a custom domain and a \u201Cwildcard\u201D (or \u201Ccreate on the fly\u201D) addresses. This can be a great tool for protecting your inbox and compartmentalizing, while still maintaining control of those email addresses. For example, you can add \u201Cmydomain.com\u201D to your forwarding (email alias) provider\u2019s account and then create \u201D", createVNode(_components.a, {
        href: "mailto:example1@mydomain.com",
        children: "example1@mydomain.com"
      }), "\u201D and \u201D", createVNode(_components.a, {
        href: "mailto:example2@mydomain.com",
        children: "example2@mydomain.com"
      }), ",\u201D etc. So if you\u2019re ever unable to use your alias email provider\u2019s service for any reason, you can just simply redirect that domain to a different provider. Some commonly-recommended domain registrars in the privacy community include ", createVNode(_components.a, {
        href: "https://www.1984hosting.com/",
        children: "1984hosting"
      }), ", ", createVNode(_components.a, {
        href: "https://www.namecheap.com/",
        children: "NameCheap"
      }), ", and ", createVNode(_components.a, {
        href: "https://www.orangewebsite.com/",
        children: "OrangeWebsite"
      }), "."]
    })]
  });
}
function MDXContent$C(props = {}) {
  return createVNode(MDXLayout$C, {
    ...props,
    children: createVNode(_createMdxContent$C, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$C, "astro:jsx");
__astro_tag_component__(MDXContent$C, "astro:jsx");
const url$C = "/en/guides/moderately-important/email-aliasing";
const file$C = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/moderately-important/email-aliasing.mdx";
function rawContent$C() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$C() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$C = (props = {}) => MDXContent$C({
											...props,
											components: { Fragment, ...props.components },
										});
Content$C[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$C.layout);

const _page30 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$C,
  _internal: _internal$C,
  compiledContent: compiledContent$C,
  default: Content$C,
  file: file$C,
  frontmatter: frontmatter$C,
  getHeadings: getHeadings$C,
  rawContent: rawContent$C,
  url: url$C
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$B = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$B;
  content.file = file$B;
  content.url = url$B;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$B,
    url: url$B,
    content,
    frontmatter: content,
    headings: getHeadings$B(),
    "server:root": true,
    children
  });
};
const frontmatter$B = {
  "layout": "@layouts/guides.astro",
  "title": "Privacy: Mobile Habits",
  "topic": "Additonal Recommended Mobile Device Habits",
  "weight": 9,
  "draft": false
};
const _internal$B = {
  injectedFrontmatter: {}
};
function getHeadings$B() {
  return [{
    "depth": 1,
    "slug": "privacy-mobile-habits",
    "text": "Privacy: Mobile Habits"
  }];
}
function _createMdxContent$B(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    a: "a",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "privacy-mobile-habits",
      children: "Privacy: Mobile Habits"
    }), "\n", createVNode(_components.p, {
      children: ["Earlier, I talked about some ", createVNode(_components.a, {
        href: "/guides/most-important/mobile",
        children: "settings"
      }), " to help reduce the data collection on your phone and improve your mobile device\u2019s security. I also briefly touched on replacement apps and habits. In this sub-section, I want to expand on that and talk about some additional practices to further improve your mobile privacy and security."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: ["The biggest thing you can do with your phone is consider your ", createVNode(_components.a, {
          href: "/guides/moderately-important/metadata",
          children: "metadata"
        }), "."]
      }), " The biggest habit you can change is just to not have your phone around as often as possible and to use it as little as possible. Classic non-smart alarm clocks are only $10 at Target, and you can charge your phone in another room. When going out with friends, leave your phone at home. Little things like this can add up."]
    }), "\n", createVNode(_components.p, {
      children: ["Second, ", createVNode(_components.strong, {
        children: "consider what you do on your phone."
      }), " For example, try to send emails and do web browsing from your computer rather than your phone. You have significantly more control over your computer\u2019s ", createVNode(_components.a, {
        href: "/guides/moderately-important/desktop-settings",
        children: "data collection"
      }), " than your phone\u2019s."]
    }), "\n", createVNode(_components.p, {
      children: ["Third, ", createVNode(_components.strong, {
        children: "try to keep your phone as clean of apps and data as possible."
      }), " Apps are a potential risk, both in terms of the data they could be collecting and the malware they could be hiding. The less apps you have, the better off you are. Most tasks we do on demand can wait until we get to a more controlled desktop environment. Of course this doesn\u2019t mean you can never have anything on your phone, just make sure you\u2019ve weighed the risks and really need it."]
    }), "\n", createVNode(_components.p, {
      children: ["If you must download an app, ", createVNode(_components.strong, {
        children: ["on Android consider using ", createVNode(_components.a, {
          href: "https://f-droid.org/",
          children: "F-Droid"
        }), " or ", createVNode(_components.a, {
          href: "https://auroraoss.com/",
          children: "Aurora Store"
        }), "."]
      }), " F-Droid is an app store featuring only ", createVNode(_components.a, {
        href: "/guides/prologue/open-source",
        children: "open source"
      }), " apps while Aurora is a proxy for the Google Play store allowing you to download apps without a Google account and without Google tracking your download (please note that it will not remove any in-app tracking). If you are using a newer Android version, you should consider using ", createVNode(_components.a, {
        href: "https://github.com/NeoApplications/Neo-Store",
        children: "Neo Store"
      }), ". This an F-Droid alternative that offers automatic updates and better app security."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "A more advanced step is to get a phone that\u2019s not in your name."
      }), " Rather than buying a phone on credit - which ties it back to your true identity via a credit check - you can buy a phone up front in cash, then get a pay-as-you-go plan. In addition to offering more privacy, these plans are often much less expensive. Be aware that metadata such as location at home every night means your identity can be determined, but this strategy can still offer a lot of defense against public records, doxxing, and stalking."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: ["I strongly urge anyone privacy-oriented to stop using your SIM number and instead use ", createVNode(_components.a, {
          href: "/guides/less-important/voip",
          children: "Voice-over-IP"
        }), " for all non-encrypted communications."]
      }), " This is a large subject, and as such I have dedicated an entire page to explaining this, and I encourage you to check it out if you\u2019re interested."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Restart your phone once per week."
      }), " Phones are typically much more stable than an average computer, and such we can and often do run them for weeks or even months at a time without ever thinking of restarting them. Most malware, except the most advanced kind, cannot withstand a device reset. While it is unlikely that you\u2019ll get malware if you have good online habits, it only takes a few minutes to restart and it\u2019s worth the caution."]
    }), "\n", createVNode(_components.p, {
      children: ["Finally, for those desiring maximum privacy, I encourage you to consider flashing a custom Android ROM onto your phone. This is a more advanced technique that falls outside the scope of this website, but I can at least point you in a starting direction. While there are some niche shops who sell pre-flashed devices, I recommend flashing the devices yourself to ensure maximum security. Unarguably the most secure ROM is ", createVNode(_components.a, {
        href: "https://grapheneos.org/",
        children: "GrapheneOS"
      }), ", which places a heavy emphasis on security by hardening the Android kernel it\u2019s based on, sandboxing Google Play services for security and usability, and recommending only apps and services that demonstrate a security-minded approach. A common alternative to Graphene is ", createVNode(_components.a, {
        href: "https://calyxinstitute.org/projects/calyx-os",
        children: "CalyxOS"
      }), ", which focuses more heavily on incorporating open-source projects into the device but does not make any significant security improvements the way Graphene does. Graphene and Calyx only support a few devices, so if your device is not compatible you could also check into ", createVNode(_components.a, {
        href: "https://divestos.org/",
        children: "DivestOS"
      }), ". ", createVNode(_components.a, {
        href: "https://lineage.microg.org/",
        children: "LineageOS"
      }), " and ", createVNode(_components.a, {
        href: "https://e.foundation/e-os/",
        children: "/e/OS"
      }), " are popular choices that support a wide variety of devices, but also suffer from significant ", createVNode(_components.a, {
        href: "https://www.howtogeek.com/142502/htg-explains-the-security-risks-of-unlocking-your-android-phones-bootloader/",
        children: "security shortcomings"
      }), ". The risks of these are considered to be relatively low, but they will render some apps incompatible with your device (such as banking apps) and you should be aware of the risks before making your decision. I recommend visiting Techlore\u2019s ", createVNode(_components.a, {
        href: "https://plexus.techlore.tech/",
        children: "Plexus"
      }), " project to see if the apps you need are compatible on custom ROMs. There are also Linux-based phones, but these are considerably more complex and I do not recommend them for the faint of heart. One solution is the ", createVNode(_components.a, {
        href: "https://puri.sm/products/librem-5/",
        children: "Librem 5"
      }), ", however many reviews suggest the operating system incomplete and missing important features, the hardware is outdated and \u201Clow-spec\u201D compared to most modern smarphones, and the device is backordered by years anyways. The other common choice is the ", createVNode(_components.a, {
        href: "https://www.pine64.org/pinephone/",
        children: "Pinephone"
      }), " but you will have to install the OS of your choice upon arrival. In my experience, none of the current Linux phones are ready for daily use."]
    })]
  });
}
function MDXContent$B(props = {}) {
  return createVNode(MDXLayout$B, {
    ...props,
    children: createVNode(_createMdxContent$B, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$B, "astro:jsx");
__astro_tag_component__(MDXContent$B, "astro:jsx");
const url$B = "/en/guides/moderately-important/mobile-habits";
const file$B = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/moderately-important/mobile-habits.mdx";
function rawContent$B() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$B() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$B = (props = {}) => MDXContent$B({
											...props,
											components: { Fragment, ...props.components },
										});
Content$B[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$B.layout);

const _page31 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$B,
  _internal: _internal$B,
  compiledContent: compiledContent$B,
  default: Content$B,
  file: file$B,
  frontmatter: frontmatter$B,
  getHeadings: getHeadings$B,
  rawContent: rawContent$B,
  url: url$B
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$A = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$A;
  content.file = file$A;
  content.url = url$A;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$A,
    url: url$A,
    content,
    frontmatter: content,
    headings: getHeadings$A(),
    "server:root": true,
    children
  });
};
const frontmatter$A = {
  "layout": "@layouts/guides.astro",
  "title": "Understanding Encryption",
  "topic": "What is Encryption?",
  "weight": 3,
  "draft": false
};
const _internal$A = {
  injectedFrontmatter: {}
};
function getHeadings$A() {
  return [{
    "depth": 1,
    "slug": "understanding-encryption",
    "text": "Understanding Encryption"
  }];
}
function _createMdxContent$A(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    a: "a",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "understanding-encryption",
      children: "Understanding Encryption"
    }), "\n", createVNode(_components.p, {
      children: ["Encryption is basically using a code to hide your data. When you were young, you may have used a hidden language to pass notes to your friends in class, such as A=1, B=2, etc. This is, technically, a type of encryption. More modern encryption protocols, like ", createVNode(_components.a, {
        href: "https://en.wikipedia.org/wiki/Signal_Protocol",
        children: "Signal"
      }), " and ", createVNode(_components.a, {
        href: "https://en.wikipedia.org/wiki/Advanced_Encryption_Standard",
        children: "AES"
      }), ", are significantly more complicated but at the core the concept is the same: ", createVNode(_components.strong, {
        children: "replacing easily understood words with complex substitutes that can - ideally - only be reverted with a \u201Ckey\u201D."
      }), " In the grade school example I gave earlier, the \u201Ckey\u201D is knowing that A=1, B=2, and so forth. In more advanced software encryption, the key takes the form of you your password. Please note, this is a tremendously oversimplified explanation."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Encryption is a central concept in this section as well as privacy and security in general."
      }), " When a local device is not encrypted, anyone can plug it into a computer and freely read the contents. For online and communication services, we want a specific type of encryption called \u201CEnd-to-End Encryption,\u201D also known as \u201Czero-knowledge\u201D (or E2EE or zero-access). I mentioned on the ", createVNode(_components.a, {
        href: "/guides/moderately-important/metadata",
        children: "last page"
      }), " that most of the internet is already encrypted, but only between your device and the provider\u2019s server. If you use Gmail, Google holds the encryption keys allowing them to read your emails any time they want. This way of doing things leaves your data easily readable by any unauthorized party who gains access, be it a data breach or a ", createVNode(_components.a, {
        href: "https://arstechnica.com/information-technology/2019/10/former-yahoo-engineer-admits-he-hacked-user-accounts-in-search-of-sexual-images/",
        children: "rogue employee"
      }), ". ", createVNode(_components.strong, {
        children: "E2EE messages can only be read by you and the recipient"
      }), ", provided you used the service correctly."]
    }), "\n", createVNode(_components.p, {
      children: ["Encryption can and should be used in a variety of situations. It can be used to protect communication, like in encrypted emails and messages, or it can be used to protect data at rest like an encrypted hard drive or zero-knowledge cloud storage provider. As we continue through this section, remember that: ", createVNode(_components.strong, {
        children: "when dealing with devices, demand encryption. When dealing with online services, demand end-to-end or zero-knowledge encryption specifically."
      })]
    })]
  });
}
function MDXContent$A(props = {}) {
  return createVNode(MDXLayout$A, {
    ...props,
    children: createVNode(_createMdxContent$A, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$A, "astro:jsx");
__astro_tag_component__(MDXContent$A, "astro:jsx");
const url$A = "/en/guides/moderately-important/encryption";
const file$A = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/moderately-important/encryption.mdx";
function rawContent$A() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$A() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$A = (props = {}) => MDXContent$A({
											...props,
											components: { Fragment, ...props.components },
										});
Content$A[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$A.layout);

const _page32 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$A,
  _internal: _internal$A,
  compiledContent: compiledContent$A,
  default: Content$A,
  file: file$A,
  frontmatter: frontmatter$A,
  getHeadings: getHeadings$A,
  rawContent: rawContent$A,
  url: url$A
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro("https://thenewoil.org");
const $$Highlighting = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Highlighting;
  const { variant, class: className = "" } = Astro2.props;
  const borderColor = variant === "warning" ? "border-gradient-warning" : "border-gradient-secondary";
  return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`px-2 py-8 rounded-lg border-4 border-bg-primary dark:border-bg-primary-dark ${borderColor} ${className}`, "class")}>
  ${renderSlot($$result, $$slots["default"])}
</div>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/common/Highlighting.astro");

const MDXLayout$z = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$z;
  content.file = file$z;
  content.url = url$z;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$z,
    url: url$z,
    content,
    frontmatter: content,
    headings: getHeadings$z(),
    "server:root": true,
    children
  });
};
const frontmatter$z = {
  "layout": "@layouts/guides.astro",
  "title": "Understanding Metadata",
  "topic": "What is Metadata and Why Does it Matter?",
  "weight": 2,
  "draft": false
};
const _internal$z = {
  injectedFrontmatter: {}
};
function getHeadings$z() {
  return [{
    "depth": 1,
    "slug": "understanding-metadata",
    "text": "Understanding Metadata"
  }, {
    "depth": 2,
    "slug": "what-is-metadata",
    "text": "What is Metadata?"
  }, {
    "depth": 2,
    "slug": "how-to-deal-with-metadata",
    "text": "How to Deal with Metadata"
  }];
}
function _createMdxContent$z(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    a: "a",
    h2: "h2",
    ul: "ul",
    li: "li",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "understanding-metadata",
      children: "Understanding Metadata"
    }), "\n", createVNode(_components.p, {
      children: ["Ninety-five percent of the web is ", createVNode(_components.a, {
        href: "https://twitter.com/jlivingood/status/1389584630299385856",
        children: "encrypted"
      }), ". That means that if you visit Facebook, your Internet Service Provider (ISP) can see that you visited and how long stayed, but they can\u2019t see your login credentials (username and password) or which exact pages you went to. This is done with the use of ", createVNode(_components.a, {
        href: "https://en.wikipedia.org/wiki/Transport_Layer_Security",
        children: "Transport Layer Security"
      }), ", or TLS, a powerful and increasingly popular encryption protocol used online.\nThere are two problems with relying strictly on the current TLS model of the intert, however. First, it only protects data in transit. When you connect to Amazon, your ISP can see that you visited Amazon, but Amazon can see every page, click, and purchase without restriction. Second and more importantly, **often you don\u2019t need to see the content itself to start making powerful, accurate assumptions."]
    }), "\n", createVNode(_components.h2, {
      id: "what-is-metadata",
      children: "What is Metadata?"
    }), "\n", createVNode(_components.p, {
      children: "Metadata is often described as \u201Cdata about the data.\u201D For example, the content of an email is not metadata, but who you emailed, what time, the subject, and the size of the email are. On the surface this may not seem very revealing. However, take this excellent article from the Electronic Frontier Foundation, for example. A couple examples they list of metadata that has the potential to be too revealing include:"
    }), "\n", createVNode($$Highlighting, {
      children: createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: "They know you called a gynecologist, spoke for a half hour, and then called the local Planned Parenthood\u2019s number later that day. But nobody knows what you spoke about."
        }), "\n", createVNode(_components.li, {
          children: "They know you got an email from an HIV testing service, then called your doctor, then visited an HIV support group website in the same hour. But they don\u2019t know what was in the email or what you talked about on the phone."
        }), "\n", createVNode(_components.li, {
          children: ["They know you called the suicide prevention hotline from the Golden Gate Bridge. But the topic of the call remains a secret.\n(Lifed directly from EFF\u2019s ", createVNode(_components.a, {
            href: "https://www.eff.org/deeplinks/2013/06/why-metadata-matters",
            children: "Surveillance Self Defense"
          }), " page)"]
        }), "\n"]
      })
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Metadata has the potential to be just as revealing as content itself,"
      }), " and therefore should be protected just as much as the actual data. These are not hypothetical abuses or situations. A former NSA Chief once said \u201D", createVNode(_components.a, {
        href: "https://abcnews.go.com/blogs/headlines/2014/05/ex-nsa-chief-we-kill-people-based-on-metadata",
        children: "[The US Government] kills people based on metadata,"
      }), "\u201D referring to how metadata can reveal so much information that it can be used to justify military strikes. In another instance, police were able to determine a man ", createVNode(_components.a, {
        href: "https://www.reuters.com/article/us-greece-robbers-murder-idUKKCN2DT2IP",
        children: "murdered his wife"
      }), " based on the metadata from his smartwatch and CCTV cameras. I could list many more stories like these. Metadata matters."]
    }), "\n", createVNode("img", {
      src: "/images/graphics/quote-metadata.png",
      alt: "Metadata is extraordinarily intrusive",
      class: "mx-auto w-80"
    }), "\n", createVNode(_components.h2, {
      id: "how-to-deal-with-metadata",
      children: "How to Deal with Metadata"
    }), "\n", createVNode(_components.p, {
      children: ["Unfortunately, ", createVNode(_components.strong, {
        children: "any digital action creates metadata."
      }), " The best you can do when attempting to protect your privacy is to be mindful of what metadata may be created by the action you\u2019re about to take and then determine how to best reduce or mitigate it. For example, reputable VPN providers (and some messengers like Signal) do not log the sites you visit, your IP address, or other metadata for longer than needed to make the service work. This is desirable but should not always be trusted. Another approach is to fake your metadata when possible. For example, using a VPN or Tor browser to access a website: the website now thinks your IP address is that of the VPN provider or exit node. Ideally you should find a way to combine these approaches for extra protection and redundancy.\nUnfortunately, the amount of metadata created and recorded can be quite extensive. For example, one smart TV ", createVNode(_components.a, {
        href: "https://www.scmp.com/tech/policy/article/3132091/chinese-tv-maker-skyworth-under-fire-excessive-data-collection-users",
        children: "manufacturer"
      }), " was caught scanning the names of nearby WiFi networks, as well as detecting every device on the local network and detailed information about them. protecting from that level of invasion requires more than just a reputable VPN. Fortunately, most of us don\u2019t need to be 100% anonymous, and situations like these fall largely outside of the ", createVNode(_components.a, {
        href: "/guides/prologue/threatmodel/",
        children: "threat model"
      }), " of most people reading this. However, ", createVNode(_components.strong, {
        children: "it\u2019s still a good idea whenever changing anything in your digital life to ask what metadata could potentially be leaked, what could be done to prevent that, and what your threat model requires."
      })]
    })]
  });
}
function MDXContent$z(props = {}) {
  return createVNode(MDXLayout$z, {
    ...props,
    children: createVNode(_createMdxContent$z, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$z, "astro:jsx");
__astro_tag_component__(MDXContent$z, "astro:jsx");
const url$z = "/en/guides/moderately-important/metadata";
const file$z = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/moderately-important/metadata.mdx";
function rawContent$z() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$z() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$z = (props = {}) => MDXContent$z({
											...props,
											components: { Fragment, ...props.components },
										});
Content$z[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$z.layout);

const _page33 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$z,
  _internal: _internal$z,
  compiledContent: compiledContent$z,
  default: Content$z,
  file: file$z,
  frontmatter: frontmatter$z,
  getHeadings: getHeadings$z,
  rawContent: rawContent$z,
  url: url$z
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro("https://thenewoil.org");
const $$ProsAndCons = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ProsAndCons;
  const {
    data,
    headingLevel,
    prosName = "Pros",
    consName = "Cons",
    nonReferralLinkText = "Non-referral link"
  } = Astro2.props;
  const NameHeading = `h${headingLevel}`;
  const ChildrenHeading = headingLevel < 6 ? `h${headingLevel + 1}` : "p";
  return renderTemplate`${Object.values(data).map(async (tool) => {
    const nameHeadingId = await textToHeadingId({
      text: tool.name,
      prefix: `pros-and-cons-`
    });
    const prosHeadingId = await textToHeadingId({
      text: "Pros",
      prefix: nameHeadingId + "-"
    });
    const consHeadingId = await textToHeadingId({
      text: "Cons",
      prefix: nameHeadingId + "-"
    });
    return renderTemplate`${maybeRenderHead($$result)}<div class="markdown--disabled flex flex-col items-center gap-4 rounded-lg border-4 p-4 pb-12 border-gradient-secondary border-bg-primary motion-safe:transition-[padding] motion-safe:duration-200 motion-safe:ease-in-out dark:border-bg-primary-dark lg:gap-6 lg:p-6 xl:gap-8 xl:p-8 2xl:flex-row">
        <div class="my-4 flex max-h-40 flex-col items-center justify-center gap-4 border-none text-center lg:my-0 xl:w-1/5">
          <a${addAttribute(tool.referral_link ? tool.referral_link : tool.link, "href")} class="border-none">
            <img class="max-h-16 w-auto object-contain"${addAttribute(tool.logo, "src")}${addAttribute(tool.logo_alt || `${tool.name} logo`, "alt")}>
          </a>
          <a class="text-center xl:mb-0 2xl:w-min"${addAttribute(tool.referral_link ? tool.referral_link : tool.link, "href")}>
            ${renderComponent($$result, "NameHeading", NameHeading, { "id": nameHeadingId }, { "default": ($$result2) => renderTemplate`${tool.name}` })}
          </a>
          ${tool.referral_link && tool.link && renderTemplate`<a${addAttribute(tool.link, "href")}>${nonReferralLinkText}</a>`}
        </div>

        <div class="flex w-full flex-col gap-8 px-4 lg:flex-row">
          <div class="flex-1">
            ${renderComponent($$result, "ChildrenHeading", ChildrenHeading, { "id": prosHeadingId, "class": "mb-4 text-center" }, { "default": ($$result2) => renderTemplate`${prosName}` })}
            <ul class="lg:px-8 lg:py-0">
              ${tool.pros.map((pro) => {
      return renderTemplate`<li>
                    ${renderComponent($$result, "Markdown", Markdown, { "of": String(pro) })}
                  </li>`;
    })}
            </ul>
          </div>

          <div class="flex-1">
            ${renderComponent($$result, "ChildrenHeading", ChildrenHeading, { "id": consHeadingId, "class": "mb-4 text-center" }, { "default": ($$result2) => renderTemplate`${consName}` })}
            <ul class="lg:px-8 lg:py-0">
              ${tool.cons.map((con) => {
      return renderTemplate`<li>
                    ${renderComponent($$result, "Markdown", Markdown, { "of": String(con) })}
                  </li>`;
    })}
            </ul>
          </div>
        </div>
      </div>`;
  })}`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/charts/ProsAndCons.astro");

const filen = {
	name: "Filen",
	logo: "/images/logos/filen.png",
	logo_alt: "Filen logo",
	referral_link: "https://filen.io/r/834a3bd235bca0caa53141f2ebc30438",
	link: "https://filen.io/",
	pros: [
		"Source available clients",
		"No personal data required to sign up",
		"Offers [multifactor authentication](/guides/most-important/mfa)"
	],
	cons: [
		"Not audited",
		"Concerns have been [raised](https://github.com/privacyguides/privacyguides.org/pull/345#issuecomment-976415846) about their encryption implementation"
	]
};
const mega = {
	name: "Mega",
	logo: "/images/logos/mega.png",
	logo_alt: "MEGA Logo",
	referral_link: "https://mega.nz/aff=UBJLjO7sxZU",
	link: "https://mega.io",
	pros: [
		"Source available clients",
		"No personal data required to sign up",
		"Offers [multifactor authentication](/guides/most-important/mfa)"
	],
	cons: [
		"Not audited",
		"[Research](https://arstechnica.com/information-technology/2022/06/mega-says-it-cant-decrypt-your-files-new-poc-exploit-shows-otherwise/) suggests that Mega's code is very sloppy and convoluted, raising the risk of vulnerabilities",
		"Mega is [alleged](https://gitlab.com/thenewoil/website/-/issues/79) to have been involved in drafting anti-privacy legislation in the EU (unproven)"
	]
};
const protondrive = {
	name: "ProtonDrive",
	logo: "/images/logos/protondrive.png",
	logo_alt: "ProtonDrive Logo",
	referral_link: "https://go.getproton.me/aff_c?offer_id=15&aff_id=2187",
	link: "https://proton.me/drive",
	pros: [
		"No personal data required to sign up",
		"Offers [multifactor authentication](/guides/most-important/mfa)",
		"Source available clients"
	],
	cons: [
		"Apps only for Android, iOS, & Windows. Mac in beta, web-only on Linux",
		"Storage is shared with your email account",
		"Not audited",
		"Not available in F-Droid"
	]
};
const sync = {
	name: "Sync",
	logo: "/images/logos/sync.png",
	logo_alt: "Sync Logo",
	link: "https://www.sync.com/",
	pros: [
		"No personal data required to sign up",
		"Offers [multifactor authentication](/guides/most-important/mfa)",
		"[Audited](https://www.sync.com/blog/soc-2-means-safety-for-your-organization/)"
	],
	cons: [
		"Not source available"
	]
};
const data$9 = {
	filen: filen,
	mega: mega,
	protondrive: protondrive,
	sync: sync
};

const MDXLayout$y = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$y;
  content.file = file$y;
  content.url = url$y;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$y,
    url: url$y,
    content,
    frontmatter: content,
    headings: getHeadings$y(),
    "server:root": true,
    children
  });
};
const frontmatter$y = {
  "layout": "@layouts/guides.astro",
  "title": "Protection: Backups",
  "topic": "How to Keep Good Backups",
  "weight": 5,
  "draft": false
};
const _internal$y = {
  injectedFrontmatter: {}
};
function getHeadings$y() {
  return [{
    "depth": 1,
    "slug": "protection-backups",
    "text": "Protection: Backups"
  }, {
    "depth": 2,
    "slug": "the-3-2-1-rule",
    "text": "The 3-2-1 Rule"
  }, {
    "depth": 2,
    "slug": "privacy-respecting-cloud-backups",
    "text": "Privacy-Respecting Cloud Backups"
  }, {
    "depth": 3,
    "slug": "mainstream-cloud-providers",
    "text": "Mainstream Cloud Providers"
  }];
}
function _createMdxContent$y(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    ul: "ul",
    li: "li",
    a: "a",
    h2: "h2",
    em: "em",
    h3: "h3"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "protection-backups",
      children: "Protection: Backups"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Backups are critical since devices regularly fail, break, or get stolen, lost, or corrupted."
      }), " To develop good backup habits, ", createVNode(_components.strong, {
        children: "first you need to decide how much space you need."
      }), " This comes in three parts: size, frequency, and range of backups."]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Size"
        }), ": If you\u2019re only worried about backing up important text files and financial documents, the size will likely be small. If you\u2019ll be backing up videos and images, you\u2019ll want something more in the hundreds of gigabytes or few terabytes range."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Frequency"
        }), ": In corporate environments, backups are often performed daily or multiple times per day. At home, once a week or even less may be appropriate. It\u2019s up to you. Keep backups often enough that if your computer crashed right before the next backup, it wouldn\u2019t be a crippling loss, but not so often that it\u2019s disruptive to your routines."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Range"
        }), ": In a business environment, you may be required to keep certian records for a set period of time, up to 10 years or more in some industries. At home, this is once again personal preference. Do you want at least 6 months worth of backups? 12? More?"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["Even if your one-time backup is small, keeping frequent copies can add up quickly. ", createVNode(_components.strong, {
        children: "I recommend creating your first backup file or folder, looking at the size, then use that information to calculate how much storage space you need based on your desired backup frequency and range."
      })]
    }), "\n", createVNode(_components.p, {
      children: ["Generally speaking, manual backups are frowned upon. It\u2019s far too easy to forget to do them. ", createVNode(_components.strong, {
        children: "It is recommended you use some kind of automated backup software when possible."
      }), " Windows and Mac have features that allow you to automate the backup process including frequency, which files to include, and where to store them. If you decide to manually handle your backups for any reason, be sure to set effective recurring reminders so you don\u2019t forget."]
    }), "\n", createVNode(_components.p, {
      children: ["Finally, ", createVNode(_components.strong, {
        children: "test your backups."
      }), " In the IT industry, there\u2019s a saying: if you haven\u2019t tested your backups, you don\u2019t have backups. After first adopting your backup strategy, test out a recovery to ensure you understand how it works and that you did both the backup and recovery correctly. Do a test recovery every so often to ensure that nothing has changed or become corrupted. Nothing is worse than suffering a data loss and finding out that you weren\u2019t backing up what you thought you were or that the restoration process is more confusing than you expected and you did it wrong."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Note"
      }), ": Be sure to encrypt your backup devices - local or offsite - using the instructions in the ", createVNode(_components.a, {
        href: "/guides/moderately-important/devices",
        children: "previous section"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "the-3-2-1-rule",
      children: "The 3-2-1 Rule"
    }), "\n", createVNode(_components.p, {
      children: ["The 3-2-1 Rule is a guideline for considering how to organize your backups effectively. It states that you should have 3 copies of your data - 2 backups plus your live (daily in-use) copy. You should have 2 separate formats for your backups - such as an external hard drive and a DVD. Finally, you should have 1 of those copies offsite, such as in the cloud or at a friend\u2019s house in case of physical damage or disaster at your location. I strongly recommending ", createVNode(_components.a, {
        href: "/guides/moderately-important/encryption",
        children: "encrypting"
      }), " all your backups (and other devices), especially your remote copies. Whether it\u2019s a close friend or a cloud provider, you\u2019re entrusting a lot of sensitive data to that location. Perhaps your friend is trustworthy, but someone who comes over and accidentally finds your backup isn\u2019t. In the next section, I\u2019ll discuss some privacy-friendly cloud options."]
    }), "\n", createVNode(_components.h2, {
      id: "privacy-respecting-cloud-backups",
      children: "Privacy-Respecting Cloud Backups"
    }), "\n", createVNode(_components.p, {
      children: ["Generally speaking, ", createVNode(_components.strong, {
        children: "I advise against using Google Drive, Dropbox, iCloud, or similar services"
      }), ", primarly because they are not ", createVNode(_components.a, {
        href: "/guides/moderately-important/encryption",
        children: "zero-knowledge"
      }), ". The exception here is iCloud. As of 2023, iCloud can be optionally encrypted in a zero-knowledge format by enabling the Advanced Data Protection option under Settings > Account (your name at the top of the Settings menu) > iCloud > Advanced Data Protection. Be aware that this does not encrypt everything. You can get more information ", createVNode(_components.a, {
        href: "https://support.apple.com/en-us/HT212520",
        children: "here"
      }), ". If you must use iCloud, I would consider enabling this a requirement. If you must use one of the other mainstream providers, ", createVNode(_components.a, {
        href: "/guides/moderately-important/backups#mainstream-cloud-providers",
        children: "see below"
      }), "."]
    }), "\n", createVNode("img", {
      src: "/images/logos/nextcloud.png",
      alt: "Nextcloud logo",
      class: "float-right mx-6 w-24"
    }), "\n", createVNode(_components.p, {
      children: ["If you decide that your offsite backup solution should involve a cloud service for\nany reason, ", createVNode(_components.strong, {
        children: "there are several secure and private cloud backup solutions."
      }), " The\nbest-case scenario is to self-host a ", createVNode(_components.a, {
        href: "https://nextcloud.com/",
        children: "Nextcloud"
      }), " server so\nyou have complete and total control of the data on a trusted, open source platform.\nNextcloud is a fully-featured office suite complete with storage, online document\nediting, calendars, to-do lists, and many, many more features via third-party plugins.\nHowever, this can be unrealistic to many for a number of reasons, so one option is\nto select a ", createVNode(_components.a, {
        href: "https://nextcloud.com/signup/",
        children: "provider"
      }), ". (Please note that Nextcloud\nessentially ", createVNode(_components.a, {
        href: "https://nextcloud.com/blog/encryption-in-nextcloud/",
        children: "cannot"
      }), " be zero-knowledge\nat this time. Make sure you trust the provider or use Cryptomator (discussed below)\nfor added protection.) If this option doesn\u2019t meet your needs, I have selected several\nsuggestions below."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "Listed in alphabetical order, not order of recommendation"
      })
    }), "\n", createVNode($$ProsAndCons, {
      data: data$9,
      headingLevel: 4
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: createVNode(_components.a, {
          href: "https://gitlab.com/thenewoil/website/-/wikis/Backup-&-Cloud-Storage-Criteria",
          children: "Click here to see my criteria for selecting these services"
        })
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: createVNode(_components.a, {
          href: "/charts/backups",
          children: "Click here for a visual version of this chart"
        })
      })
    }), "\n", createVNode(_components.h3, {
      id: "mainstream-cloud-providers",
      children: "Mainstream Cloud Providers"
    }), "\n", createVNode("img", {
      src: "/images/logos/cryptomator.png",
      alt: "Cryptomator logo",
      class: "float-left mx-6 w-24"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "If none of these options work for you, there are two ways to upload encrypted content\nto mainstream cloud providers"
      }), " such as Google Drive or Dropbox. The first is ", createVNode(_components.a, {
        href: "https://cryptomator.org/",
        children: "Cryptomator"
      }), ",\nan open source tool that allows you to encrypt each individual file and sync it with\nthe cloud. If you don\u2019t want to use Cryptomator for any reason, then consider creating\nan encrypted container with VeraCrypt and uploading it to the provider. (For the\nrecord, this is basically what Cryptomator does, but Cryptomator makes it easier.)\nBelow are the instructions for creating an encrypted container with VeraCrypt."]
    }), "\n", createVNode(_components.p, {
      children: ["First, figure out how much storage you need. Google Drive offers 15 gigabytes for free, OneDrive offers 5 gigabytes for free, and Dropbox offers 2 gigabytes for free. Now open up Veracrypt, select the \u201CTools\u201D menu, and choose \u201CVolume Creation Wizard.\u201D Pick \u201D", createVNode(_components.a, {
        href: "*PUBLIC*/images/steps/vera-crypt-encrypting/c01.jpg",
        children: "Create"
      }), " an encrypted file container,\u201D \u201D", createVNode(_components.a, {
        href: "*PUBLIC*/images/steps/vera-crypt-external-encrypting/b02.jpg",
        children: "Standard"
      }), " Veracrypt Volume,\u201D then click \u201CSelect File\u201D and ", createVNode(_components.a, {
        href: "*PUBLIC*/images/steps/vera-crypt-encrypting/c03.jpg",
        children: "navigate"
      }), " to your cloud service folder. Once in the folder, you\u2019ll have to makeup a nonexistant file name. Anything works, from \u201CBackup\u201D to \u201Cveracrypt_containter\u201D or whatever you want. Once you hit \u201Csave,\u201D it should show you the file path. Continue onward, making sure you\u2019ve selected \u201D", createVNode(_components.a, {
        href: "*PUBLIC*/images/steps/vera-crypt-encrypting/c04.jpg",
        children: "AES"
      }), "\u201D and \u201CSHA-512\u201D for your algorithms, and then move on. The next screen will ask you for a ", createVNode(_components.a, {
        href: "*PUBLIC*/images/steps/vera-crypt-encrypting/c05.jpg",
        children: "volume size"
      }), ". Ideally, I would say use as much as you can. If you use your Dropbox or Google Drive for other sharing purposes, leave enough space free for that or maybe only use the exact amount of space you require for your backup strategy. Once you decide what storage size is appropriate for you, go to the next screen where it requires a password. From there, it\u2019s pretty self explanatory. Just answer the questions and it will pick the best formats and such for you. After creating your encrypted container, upload it to your cloud service of choice, either using the service\u2019s desktop app or manually through a web portal."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "If you follow these steps, you should have created secure, consistent backups"
      }), " that will protect you in the event of a lost, stolen, or damaged device, or even the dreaded ransomware."]
    })]
  });
}
function MDXContent$y(props = {}) {
  return createVNode(MDXLayout$y, {
    ...props,
    children: createVNode(_createMdxContent$y, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$y, "astro:jsx");
__astro_tag_component__(MDXContent$y, "astro:jsx");
const url$y = "/en/guides/moderately-important/backups";
const file$y = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/moderately-important/backups.mdx";
function rawContent$y() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$y() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$y = (props = {}) => MDXContent$y({
											...props,
											components: { Fragment, ...props.components },
										});
Content$y[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$y.layout);

const _page34 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$y,
  _internal: _internal$y,
  compiledContent: compiledContent$y,
  default: Content$y,
  file: file$y,
  frontmatter: frontmatter$y,
  getHeadings: getHeadings$y,
  rawContent: rawContent$y,
  url: url$y
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$x = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$x;
  content.file = file$x;
  content.url = url$x;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$x,
    url: url$x,
    content,
    frontmatter: content,
    headings: getHeadings$x(),
    "server:root": true,
    children
  });
};
const frontmatter$x = {
  "layout": "@layouts/guides.astro",
  "title": "Protection: Device Encryption",
  "topic": "Device Encryption",
  "weight": 4,
  "draft": false
};
const _internal$x = {
  injectedFrontmatter: {}
};
function getHeadings$x() {
  return [{
    "depth": 1,
    "slug": "protection-device-encryption",
    "text": "Protection: Device Encryption"
  }, {
    "depth": 2,
    "slug": "using-veracrypt",
    "text": "Using Veracrypt"
  }];
}
function _createMdxContent$x(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    a: "a",
    h2: "h2",
    img: "img"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "protection-device-encryption",
      children: "Protection: Device Encryption"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Encrypting phones is easy."
      }), " Both Android and iOS are automatically encrypted if you assign a lock PIN, pattern, or other form of authentication. I recommended enabling this feature ", createVNode(_components.a, {
        href: "/guides/most-important/mobile-settings",
        children: "earlier"
      }), ". Encrypting desktops and laptops takes a little more effort. ", createVNode(_components.strong, {
        children: "I recommend putting priority on encrypting devices that are easily portable."
      }), " Phones should be encrypted as they get lost and stolen often and contain sensitive information (though if you followed my ", createVNode(_components.a, {
        href: "/guides/most-important/mobile",
        children: "advice"
      }), " there should be less sensitive data on your phone than most people). Next are laptops, even if you don\u2019t ever take them off your desk or out of the house. It\u2019s easy for a thief to pick one up and take off with it, so they should be encrypted. The same logic goes for external harddrives, thumb drives, and and other similar devices. Finally, desktop computers. Encryption is free, so I recommend encrypting everything you can, just be careful not to forget your password and to keep diligent ", createVNode(_components.a, {
        href: "/guides/moderately-important/backups",
        children: "backups"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["Mac devices come with a proprietary encryption program called ", createVNode(_components.a, {
        href: "https://support.apple.com/en-us/HT204837",
        children: "FileVault"
      }), ". This is relatively secure and easy, so it should work for most people. Some Windows devices also come with an easy-to-use proprietary service called \u201C", createVNode(_components.a, {
        href: "https://docs.microsoft.com/en-us/windows/security/information-protection/bitlocker/bitlocker-overview",
        children: "BitLocker"
      }), "\u201D that should work for those who have it. Most Linux distributions also offer the chance to full-disk encrypt your device with LUKS during installation, as well. If you have a Windows device without BitLocker, or if you don\u2019t want to use a proprietary encryption software (or LUKS), then I recommend ", createVNode(_components.a, {
        href: "https://www.veracrypt.fr/en/Home.html",
        children: "VeraCrypt"
      }), ". Veracrypt is a free, open source software that allows various forms of encryption. For most of my readers and in most cases, ", createVNode(_components.strong, {
        children: "use \u201Cfull disk encryption,\u201D meaning that the entire device is encrypted completely."
      })]
    }), "\n", createVNode(_components.h2, {
      id: "using-veracrypt",
      children: "Using Veracrypt"
    }), "\n", createVNode(_components.p, {
      children: "In this paragraph I\u2019ll talk you through how to encrypt an external device using Veracraypt. To encrypt an external device, run Veracrypt. Go to the \u201CVolume Creation Wizard\u201D under the Tools menu, and select"
    }), "\n", createVNode(_components.p, {
      children: ["\u201CEncrypt a non-system partition/drive\u201D.\n", createVNode(_components.img, {
        src: "/images/steps/vera-crypt-external-encrypting/b01.jpg",
        alt: "Encrypt"
      })]
    }), "\n", createVNode(_components.p, {
      children: ["Pick \u201CStandard VeraCrypt Volume\u201D.\n", createVNode(_components.img, {
        src: "/images/steps/vera-crypt-external-encrypting/b02.jpg",
        alt: "Standard"
      })]
    }), "\n", createVNode(_components.p, {
      children: "Then \u201CCreate encrypted volume and format it\u201D."
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Note:"
      }), " this will wipe all the data already on your drive, so I recommend only using this with a fresh, empty drive.\n", createVNode(_components.img, {
        src: "/images/steps/vera-crypt-external-encrypting/b03.jpg",
        alt: "Create"
      })]
    }), "\n", createVNode(_components.p, {
      children: ["Finally, make sure the algorithsm are set to AES and SHA-512\n", createVNode(_components.img, {
        src: "/images/steps/vera-crypt-external-encrypting/b04.jpg",
        alt: "AES and SHA-512"
      })]
    }), "\n", createVNode(_components.p, {
      children: ["Select a ", createVNode(_components.a, {
        href: "/guides/most-important/passwords",
        children: "good password"
      }), " on the next screen and pick your file system format. If you\u2019re only using Windows systems, NTFS is the best choice. If you plan to switch between various operating systems like Mac or Linux, then exFAT is is the better choice. After making this choice, simply continue on and follow the prompts accordingly."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Note:"
      }), " while installing Veracrypt, you will be asked to create a \u201Crecovery USB.\u201D I highly encourage you to do so and to store it somewhere safe. Even something as simple as a routine update has the potential to go wrong and the only way to recover your data will be to decrypt the drive using this USB."]
    })]
  });
}
function MDXContent$x(props = {}) {
  return createVNode(MDXLayout$x, {
    ...props,
    children: createVNode(_createMdxContent$x, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$x, "astro:jsx");
__astro_tag_component__(MDXContent$x, "astro:jsx");
const url$x = "/en/guides/moderately-important/devices";
const file$x = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/moderately-important/devices.mdx";
function rawContent$x() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$x() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$x = (props = {}) => MDXContent$x({
											...props,
											components: { Fragment, ...props.components },
										});
Content$x[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$x.layout);

const _page35 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$x,
  _internal: _internal$x,
  compiledContent: compiledContent$x,
  default: Content$x,
  file: file$x,
  frontmatter: frontmatter$x,
  getHeadings: getHeadings$x,
  rawContent: rawContent$x,
  url: url$x
}, Symbol.toStringTag, { value: 'Module' }));

const protonmail = {
	name: "ProtonMail",
	logo: "/images/logos/protonmail.png",
	logo_alt: "Protonmail Logo",
	link: "https://proton.me/mail",
	referral_link: "https://go.getproton.me/aff_c?offer_id=15&aff_id=2187",
	pros: [
		"[Audited](https://protonmail.com/blog/security-audit/)",
		"Based on PGP",
		"Offers a free tier",
		"Includes a VPN account, calendar, and cloud storage with all plans",
		"Import/export emails available"
	],
	cons: [
		"No desktop app, web or third-party email client only."
	]
};
const skiff = {
	name: "Skiff",
	logo: "/images/logos/skiff.png",
	logo_alt: "Skiff Logo",
	link: "https://skiff.com/",
	referral_link: "https://app.skiff.com/signup?mail=&referral=thenewoil",
	pros: [
		"Apps available for Android, iOS, and Mac",
		"Offers a free tier",
		"Includes a collaborative workspace, calendar, and cloud storage with all plans",
		"Import emails available"
	],
	cons: [
		"No desktop app for Windows or Linux, or third-party email client, web only",
		"No PGP support",
		"Export emails not available",
		"Audited, but results have not been publicly released yet"
	]
};
const tuta = {
	name: "Tuta",
	logo: "/images/logos/tuta.png",
	logo_alt: "Tuta Logo",
	link: "https://tuta.com/",
	pros: [
		"[Audited](https://tuta.com/blog/posts/desktop-clients-tutanota/)",
		"Offers a free tier",
		"Includes a calendar with all plans",
		"Export emails available (individual emails only)"
	],
	cons: [
		"No PGP support",
		"Import emails not available"
	]
};
const data$8 = {
	protonmail: protonmail,
	skiff: skiff,
	tuta: tuta
};

const MDXLayout$w = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$w;
  content.file = file$w;
  content.url = url$w;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$w,
    url: url$w,
    content,
    frontmatter: content,
    headings: getHeadings$w(),
    "server:root": true,
    children
  });
};
const frontmatter$w = {
  "layout": "@layouts/guides.astro",
  "title": "Privacy: Encrypted Email",
  "topic": "Encrypted Email",
  "weight": 7,
  "draft": false
};
const _internal$w = {
  injectedFrontmatter: {}
};
function getHeadings$w() {
  return [{
    "depth": 1,
    "slug": "privacy-encrypted-email",
    "text": "Privacy: Encrypted Email"
  }, {
    "depth": 2,
    "slug": "what-is-encrypted-email",
    "text": "What is Encrypted Email?"
  }, {
    "depth": 2,
    "slug": "why-do-i-need-encrypted-email",
    "text": "Why do I Need Encrypted Email?"
  }, {
    "depth": 2,
    "slug": "what-should-i-look-for-in-an-encrypted-email-provider",
    "text": "What Should I Look For in an Encrypted Email Provider?"
  }, {
    "depth": 2,
    "slug": "honorable-mention-pgp",
    "text": "Honorable Mention: PGP"
  }, {
    "depth": 2,
    "slug": "tips--tricks",
    "text": "Tips & Tricks"
  }];
}
function _createMdxContent$w(props) {
  const _components = Object.assign({
    h1: "h1",
    h2: "h2",
    p: "p",
    strong: "strong",
    a: "a",
    em: "em"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "privacy-encrypted-email",
      children: "Privacy: Encrypted Email"
    }), "\n", createVNode(_components.h2, {
      id: "what-is-encrypted-email",
      children: "What is Encrypted Email?"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "End-to-end encryted (also known as zero-knowledge or zero-access) email is a form of communication where the messages are encrypted in such a way that only the people involved in the conversation can read them. Additionally, the emails in your inbox are stored in such a way that your provider cannot access and read them."
      }), " See ", createVNode(_components.a, {
        href: "/guides/moderately-important/encryption",
        children: "Understanding Encryption"
      }), " for more information on this."]
    }), "\n", createVNode(_components.h2, {
      id: "why-do-i-need-encrypted-email",
      children: "Why do I Need Encrypted Email?"
    }), "\n", createVNode(_components.p, {
      children: ["Regular email providers like Google, Yahoo, and others regularly ", createVNode(_components.a, {
        href: "https://www.maketecheasier.com/which-email-providers-scanning-emails/",
        children: "read"
      }), " your emails for a variety of purposes such as advertising and training their AI. The fact that these communications are readable by employees (even if only certain ones) means that any sensitive information is ", createVNode(_components.a, {
        href: "https://thehackernews.com/2019/10/yahoo-email-hacking",
        children: "not safe"
      }), " and can be potentially stolen. Consider that most people have sensitive information in their email inboxes, like bank statements, medical reminders, and more. By using a zero-knowledge provider you are giving your inbox another layer of protection against data breaches and rogue employees."]
    }), "\n", createVNode(_components.h2, {
      id: "what-should-i-look-for-in-an-encrypted-email-provider",
      children: "What Should I Look For in an Encrypted Email Provider?"
    }), "\n", createVNode(_components.p, {
      children: "Make sure to see how the provider makes money. Running an email server is expensive and requires great technical resources. \u201CIf a product is free, you are the product.\u201D Make sure the company has a viable business plan or else assume they are likely accessing and selling your data.\nIf you want to take full advantage of encrypted email services, **be sure to pick a provider that is also being used by the people you email regularly. Having an encrypted inbox can prevent warrantless searches and data breaches, but once the email leaves your inbox it will be decrypted. If you want the email to be encrypted from start to finish, you\u2019ll need to both be using the same service or protocol."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "Listed in alphabetical order, not order of recommendation"
      })
    }), "\n", createVNode($$ProsAndCons, {
      data: data$8,
      headingLevel: 4
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: createVNode(_components.a, {
          href: "https://gitlab.com/thenewoil/website/-/wikis/Encrypted-Messaging-Criteria",
          children: "Click here to see my criteria for selecting these services"
        })
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: createVNode(_components.a, {
          href: "/charts/email",
          children: "Click here for a visual version of this chart"
        })
      })
    }), "\n", createVNode(_components.h2, {
      id: "honorable-mention-pgp",
      children: "Honorable Mention: PGP"
    }), "\n", createVNode(_components.p, {
      children: ["Many of the services I listed work with PGP, meaning that even non-users can initiate secure conversations with you and vice-versa. ", createVNode(_components.strong, {
        children: ["PGP stands for ", createVNode(_components.a, {
          href: "https://en.wikipedia.org/wiki/Pretty_Good_Privacy",
          children: "Pretty Good Privacy"
        }), " and is an open-source encryption program."]
      }), " Generally speaking, it is most commonly used for encrypted email but it can be used to encrypt other files as well."]
    }), "\n", createVNode(_components.p, {
      children: ["Explaining how PGP works is much more complicated than actually using it. When you use any type of encryption, including PGP, it creates two keys. One is called the \u201Cprivate key\u201D and one is called the \u201Cpublic key.\u201D The private key is private: it stays with you and should never be shared. The public key can be shared as much as you want. Think of the public key as your address and the private key as your door key. The more people you give your address to, the more people can write you. But only you can unlock the door and enter the house where you have some privacy. There are many programs and plugins that handle this process for you. While it is not advised, **you can use PGP with your existing email provider. The first method is a browser plugin called ", createVNode(_components.a, {
        href: "https://www.mailvelope.com/",
        children: "Mailvelope"
      }), ". For most people, this will be the best solution. The second method is with ", createVNode(_components.a, {
        href: "https://www.enigmail.net/index.php/",
        children: "Enigmail"
      }), ", an email plugin for certain email clients that enables PGP."]
    }), "\n", createVNode(_components.h2, {
      id: "tips--tricks",
      children: "Tips & Tricks"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Never assume an email is secure."
      }), " Email was never designed to be a secure communication method, and even with PGP or other encryption protocols you can never guarantee that an email won\u2019t be screenshotted, printed, or otherwise shared with unauthorized people. Never put anything in writing you wouldn\u2019t be willing to have publicly displayed."]
    })]
  });
}
function MDXContent$w(props = {}) {
  return createVNode(MDXLayout$w, {
    ...props,
    children: createVNode(_createMdxContent$w, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$w, "astro:jsx");
__astro_tag_component__(MDXContent$w, "astro:jsx");
const url$w = "/en/guides/moderately-important/email";
const file$w = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/moderately-important/email.mdx";
function rawContent$w() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$w() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$w = (props = {}) => MDXContent$w({
											...props,
											components: { Fragment, ...props.components },
										});
Content$w[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$w.layout);

const _page36 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$w,
  _internal: _internal$w,
  compiledContent: compiledContent$w,
  default: Content$w,
  file: file$w,
  frontmatter: frontmatter$w,
  getHeadings: getHeadings$w,
  rawContent: rawContent$w,
  url: url$w
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$v = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$v;
  content.file = file$v;
  content.url = url$v;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$v,
    url: url$v,
    content,
    frontmatter: content,
    headings: getHeadings$v(),
    "server:root": true,
    children
  });
};
const frontmatter$v = {
  "layout": "@layouts/guides.astro",
  "title": "Introduction",
  "section_title": "Less Important",
  "section_weight": 25,
  "weight": 1,
  "draft": false
};
const _internal$v = {
  injectedFrontmatter: {}
};
function getHeadings$v() {
  return [{
    "depth": 1,
    "slug": "less-important-section-introduction",
    "text": "Less Important: Section Introduction"
  }];
}
function _createMdxContent$v(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "less-important-section-introduction",
      children: "Less Important: Section Introduction"
    }), "\n", createVNode(_components.p, {
      children: ["The final section of this site is titled \u201CLess Important.\u201D That name was chosen for a reason: ", createVNode(_components.strong, {
        children: "these things aren\u2019t unimportant, but they\u2019re not as critically important as the other steps, and they\u2019re a bit more abstract."
      }), " Using the techniques listed here require you to understand how surveillance and metadata work and how to think creatively to imagine possible unseen or future threats. In this section:"]
    }), "\n", createVNode($$GuidesList, {})]
  });
}
function MDXContent$v(props = {}) {
  return createVNode(MDXLayout$v, {
    ...props,
    children: createVNode(_createMdxContent$v, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$v, "astro:jsx");
__astro_tag_component__(MDXContent$v, "astro:jsx");
const url$v = "/en/guides/less-important";
const file$v = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/less-important/index.mdx";
function rawContent$v() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$v() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$v = (props = {}) => MDXContent$v({
											...props,
											components: { Fragment, ...props.components },
										});
Content$v[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$v.layout);

const _page37 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$v,
  _internal: _internal$v,
  compiledContent: compiledContent$v,
  default: Content$v,
  file: file$v,
  frontmatter: frontmatter$v,
  getHeadings: getHeadings$v,
  rawContent: rawContent$v,
  url: url$v
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$u = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$u;
  content.file = file$u;
  content.url = url$u;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$u,
    url: url$u,
    content,
    frontmatter: content,
    headings: getHeadings$u(),
    "server:root": true,
    children
  });
};
const frontmatter$u = {
  "layout": "@layouts/guides.astro",
  "title": "Protection: Disinformation",
  "topic": "Disinformation",
  "weight": 6,
  "draft": false
};
const _internal$u = {
  injectedFrontmatter: {}
};
function getHeadings$u() {
  return [{
    "depth": 1,
    "slug": "protection-disinformation",
    "text": "Protection: Disinformation"
  }, {
    "depth": 2,
    "slug": "what-not-to-do",
    "text": "What Not to Do"
  }, {
    "depth": 2,
    "slug": "what-to-do",
    "text": "What to Do"
  }];
}
function _createMdxContent$u(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    a: "a",
    h2: "h2",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "protection-disinformation",
      children: "Protection: Disinformation"
    }), "\n", createVNode(_components.p, {
      children: ["I mentioned disinformation in the online habits ", createVNode(_components.a, {
        href: "/guides/less-important/habits",
        children: "section"
      }), ". This is probably one of the most powerful techniques for preserving your digital privacy, but it\u2019s important to understand how to use it properly so you don\u2019t land yourself in trouble, legal or otherwise."]
    }), "\n", createVNode(_components.h2, {
      id: "what-not-to-do",
      children: "What Not to Do"
    }), "\n", createVNode(_components.p, {
      children: ["Never knowingly give false information on a legal document, to a law enforcement officer, to a federal agency, to the IRS, or to medical personnel. ", createVNode(_components.strong, {
        children: "When using disinformation as a strategy, the main question to ask yourself is \u201Cdoes this person need the information they are requesting?\u201D"
      }), " Does an officer need your real name when detaining you? Yes. It\u2019s illegal to lie to the police when they are performing official duties. Does your doctor need to be able to contact you? Yes. Does the IRS need your real social security number? Absolutely. Does Facebook need your phone number? No."]
    }), "\n", createVNode(_components.h2, {
      id: "what-to-do",
      children: "What to Do"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "The best defense is usually invisibility."
      }), " Before providing false information, you should provide as little information as possible. When given a a form to fill out for example, don\u2019t be afraid to ask \u201Cwhat information on this is required?\u201D Privacy is becoming less stigmatized these days, so as long as you\u2019re not obnoxious, most people will be willing to find out what information is mandatory. Sometimes this is self-explanatory: again, does Applebee\u2019s need your email? No. Does your doctor need to know the date of your last visit? Maybe not. Ask."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Once you know what information is unavoidable, you\u2019re now faced with the decision only you can answer of what information to provide and what to fake."
      }), " In online shopping, for example, a name and address is needed, so I use a generic name and my PO Box. An email and a phone number are also usually required. For email, I\u2019ll use an ", createVNode(_components.a, {
        href: "/guides/moderately-important/email-masking",
        children: "email masking service"
      }), ". After all, I do want updates on my item and a place to submit feedback if something goes wrong. For phone number, I use my area code plus 867-5309, which is from a hit 80\u2019s pop song. They don\u2019t need my number as they already have an email address to contact me if there are any problems."]
    }), "\n", createVNode(_components.p, {
      children: ["Finally, ", createVNode(_components.strong, {
        children: "an important part of this strategy is to have both excuses and information ready for everything."
      }), " I have a list of phone numbers and addresses saved in my notes. If someone asks for one I haven\u2019t memorized, I pull out my phone and make the excuse \u201Csorry, I just moved so I haven\u2019t memorized my address yet\u201D or \u201Csorry, I just switched phones and I haven\u2019t memorized my new number yet.\u201D I like to have a variety of addresses to pull from in the local area. Some are quite close by. Others are in surrounding towns up to an hour away. Whatever backs up my story. Public libraries, hotels, and other public buildings are all great choices for a fake address. Typically only official businesses - like the DMV or a bank - will be verifying those addresses, and in those situations you shouldn\u2019t be lying anyways. Remember: Treat every request for information as a data breach waiting to happen."]
    })]
  });
}
function MDXContent$u(props = {}) {
  return createVNode(MDXLayout$u, {
    ...props,
    children: createVNode(_createMdxContent$u, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$u, "astro:jsx");
__astro_tag_component__(MDXContent$u, "astro:jsx");
const url$u = "/en/guides/less-important/disinformation";
const file$u = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/less-important/disinformation.mdx";
function rawContent$u() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$u() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$u = (props = {}) => MDXContent$u({
											...props,
											components: { Fragment, ...props.components },
										});
Content$u[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$u.layout);

const _page38 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$u,
  _internal: _internal$u,
  compiledContent: compiledContent$u,
  default: Content$u,
  file: file$u,
  frontmatter: frontmatter$u,
  getHeadings: getHeadings$u,
  rawContent: rawContent$u,
  url: url$u
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$t = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$t;
  content.file = file$t;
  content.url = url$t;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$t,
    url: url$t,
    content,
    frontmatter: content,
    headings: getHeadings$t(),
    "server:root": true,
    children
  });
};
const frontmatter$t = {
  "layout": "@layouts/guides.astro",
  "title": "Privacy: The Five Eyes Surveillance Network",
  "topic": "Countries of Origin",
  "weight": 2,
  "draft": false
};
const _internal$t = {
  injectedFrontmatter: {}
};
function getHeadings$t() {
  return [{
    "depth": 1,
    "slug": "privacy-the-five-eyes-surveillance-network--countries-of-origin",
    "text": "Privacy: The Five Eyes Surveillance Network & Countries of Origin"
  }, {
    "depth": 2,
    "slug": "what-are-the-five-eyes",
    "text": "What Are \u201CThe Five Eyes\u201D?"
  }, {
    "depth": 2,
    "slug": "does-this-matter",
    "text": "Does This Matter?"
  }];
}
function _createMdxContent$t(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    h2: "h2",
    a: "a",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "privacy-the-five-eyes-surveillance-network--countries-of-origin",
      children: "Privacy: The Five Eyes Surveillance Network & Countries of Origin"
    }), "\n", createVNode(_components.p, {
      children: "In the privacy community, people will frequently ask about or cite the country that a particular service is based in. This site used to do this very thing, citing the country as either a pro or con for a particular service. We no longer do this, nor do we believe this should be a consideration for most people."
    }), "\n", createVNode(_components.h2, {
      id: "what-are-the-five-eyes",
      children: "What Are \u201CThe Five Eyes\u201D?"
    }), "\n", createVNode(_components.p, {
      children: ["The \u201C", createVNode(_components.a, {
        href: "https://en.wikipedia.org//wiki/Five_Eyes",
        children: "Five Eyes"
      }), "\u201D refers to an intelligence agreement between the United States, United Kingdom, Australia, Canada, and New Zealand. It was originally born out of the Cold War as a way for Democratic countries to keep an eye on the spread of Communism, but the agreement lives on to this day. The basic premise of Five Eyes is that those five countries share intelligence with each other generously. The agreement is primarily aimed at \u201Csignals intelligence,\u201D which means basically any form of electronic or telephony communication."]
    }), "\n", createVNode(_components.p, {
      children: "The problem that pertains particularly to privacy is what Edward Snowden revealed about the Five Eyes agreement in 2013, which basically boils down to \u201Cthe Five Eyes countries spy on each other\u2019s citizens then share with each other as a loophole.\u201D In the US, for example, the US intelligence agencies aren\u2019t supposed to spy on US citizens without court approval. The same goes for the UK. But the US is free to spy on UK citizens and then share that data with the UK, and vice versa. That\u2019s a simplified version of how it works."
    }), "\n", createVNode(_components.p, {
      children: "There are also other \u201CEyes,\u201D such as Nine and Fourteen, as well as specific \u201CEyes\u201D aimed at certain counties (ex: \u201CFive Eyes Plus Three Against North Korea\u201D). All this really means is how many countries are involved. Typically the wider the Eyes, the less comprehensive the data sharing. So the Five Eyes are the most invasive countries and share the most openly, while the Fourteen eyes are less invasive and share less (but still invasive)."
    }), "\n", createVNode(_components.h2, {
      id: "does-this-matter",
      children: "Does This Matter?"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "For the average person, no."
      }), " For privacy-minded individuals, the main logic behind avoiding a service based in the Five Eyes country is the idea that such services are more susceptible to sharing with intelligence agencies or law enforcement. There are several reasons this website does not address this. First, if an intelligence agency wants information about you, they are not above using illegal means. This was the entire crux of Snowden\u2019s revelations in 2013: the NSA\u2019s spying was illegal (courts around the world have since ", createVNode(_components.a, {
        href: "https://threatpost.com/nsa-mass-surveillance-program-illegal-u-s-court-rules/158924/",
        children: "agreed"
      }), " with this sentiment). This website does not cater to people who are being individually targeted by advanced adversaries. If that sentence doesn\u2019t describe you, you generally don\u2019t need to worry about country of origin. If it does describe you, then you are likely being individually targeted by a highly-resourced state actor, and you should be taking measures far above what this site has to offer."]
    }), "\n", createVNode(_components.p, {
      children: ["For the average person who is not being targeted, the main reason not to care comes down to the trustworthiness of the service. For example: Signal is a US-based company, yet numerous court orders have ", createVNode(_components.a, {
        href: "https://signal.org/bigbrother/",
        children: "repeatedly"
      }), " proven that Signal has nothing of value to turn over. Furthermore, Signal\u2019s open source nature allows experts to ensure that the data truly is end-to-end encrypted and secure: the only way a government can access Signal messages - at this time - is to gain control of the device on either end. The country of origin means nothing here. The CIA\u2019s own ", createVNode(_components.a, {
        href: "https://en.wikipedia.org/wiki/Vault_7#Messaging_services",
        children: "Vault 7 leaks"
      }), " confirmed this in 2017: Signal is secure, even the US intelligence agencies - epicenter of the Five Eyes surveillance network - could only get around it by compromising the devices where the messages are decrypted and vulnerable. ProtonMail is another ", createVNode(_components.a, {
        href: "https://proton.me/blog/belarus-ryanair",
        children: "example"
      }), " of this: despite compliance with law enforcement, they simply do not have access to certain data or metadata."]
    }), "\n", createVNode(_components.p, {
      children: "The only time, in my opinion, that a country of origin matters is for the individual. Being a citizen of the European Union, for example, allows one access to certain rights and recourses under the EU\u2019s General Data Protection Regulation (GDPR), such as the right to be forgotten, the right to request deletion of your data, and the right to get certain government authorities involved if your requests are not honored. Being a citizen of the United States, on the other hand, offers virtually no suc protections or recourses, except in a few states, and even then the laws are generally very limited. This is not a call for readers to move to the EU - that is a highly personal decision with many, many other factors to consider like family, resources, economic opportunity, and more. But it does show that there can sometimes be advantages to where you live worth being aware of. Again though, this applies to where the individual user lives, not where the service is based out of. Even US companies are subject to GDPR if there is reasonable expectation that they may have EU customers."
    })]
  });
}
function MDXContent$t(props = {}) {
  return createVNode(MDXLayout$t, {
    ...props,
    children: createVNode(_createMdxContent$t, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$t, "astro:jsx");
__astro_tag_component__(MDXContent$t, "astro:jsx");
const url$t = "/en/guides/less-important/five-eyes";
const file$t = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/less-important/five-eyes.mdx";
function rawContent$t() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$t() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$t = (props = {}) => MDXContent$t({
											...props,
											components: { Fragment, ...props.components },
										});
Content$t[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$t.layout);

const _page39 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$t,
  _internal: _internal$t,
  compiledContent: compiledContent$t,
  default: Content$t,
  file: file$t,
  frontmatter: frontmatter$t,
  getHeadings: getHeadings$t,
  rawContent: rawContent$t,
  url: url$t
}, Symbol.toStringTag, { value: 'Module' }));

const matrix = {
	name: "Matrix",
	logo: "/images/logos/matrix.png",
	logo_alt: "Matrix Logo",
	link: "https://matrix.org/",
	pros: [
		"Available on all operating systems",
		"Decentralized",
		"Username-based",
		"No identifiable user data required at signup",
		"Can be self-hosted",
		"Can be bridged to communicate with other services such as Slack, Telegram, Signal, Discord, Facebook, and more.",
		"Popular clients include [Element](https://element.io/), [FluffyChat](https://fluffychat.im/), and [SchildiChat](https://schildi.chat/)."
	],
	cons: [
		"Not audited",
		"Not metadata resistant",
		"No disappearing messages."
	]
};
const session = {
	name: "Session",
	logo: "/images/logos/session.png",
	logo_alt: "Session Logo",
	link: "https://getsession.org/",
	pros: [
		"[Audited](https://getsession.org/session-code-audit/)",
		"Available on all operating systems",
		"Decentralized",
		"Username-based",
		"Metadata resistant",
		"No identifiable user data required at signup",
		"Offers disappearing messages"
	],
	cons: [
		"Voice & video calls in beta"
	]
};
const signal = {
	name: "Signal",
	logo: "/images/logos/signal.png",
	logo_alt: "Signal Logo",
	link: "https://signal.org/",
	pros: [
		"[Audited](https://community.signalusers.org/t/wiki-overview-of-third-party-security-audits/13243)",
		"Available on all operating systems",
		"Offers disappearing messages"
	],
	cons: [
		"Centralized",
		"Phone number required",
		"[Server source code went almost a year without a public update with no explanation](https://linuxreviews.org/Signal_Just_Made_One_Years_Worth_Of_Server-Side_Source_Code_Available_In_One_Huge_Dump)"
	]
};
const threema = {
	name: "Threema",
	logo: "/images/logos/threema.png",
	logo_alt: "Threema Logo",
	link: "https://threema.ch/",
	pros: [
		"[Audited](https://threema.ch/en/blog/posts/audit-2020-en)",
		"Available on Android, and iOS",
		"Username-based"
	],
	cons: [
		"Centralized",
		"Not free",
		"Desktop app must be synced every time",
		"No disappearing messages",
		"Small userbase",
		"Missing mainstream features such as stickers and GIF support"
	]
};
const data$7 = {
	matrix: matrix,
	session: session,
	signal: signal,
	threema: threema
};

const MDXLayout$s = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$s;
  content.file = file$s;
  content.url = url$s;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$s,
    url: url$s,
    content,
    frontmatter: content,
    headings: getHeadings$s(),
    "server:root": true,
    children
  });
};
const frontmatter$s = {
  "layout": "@layouts/guides.astro",
  "title": "Privacy: Encrypted Texting/Calling",
  "topic": "Encrypted Messaging",
  "weight": 4,
  "draft": false
};
const _internal$s = {
  injectedFrontmatter: {}
};
function getHeadings$s() {
  return [{
    "depth": 1,
    "slug": "privacy-encrypted-messaging",
    "text": "Privacy: Encrypted Messaging"
  }, {
    "depth": 2,
    "slug": "what-is-encrypted-messaging",
    "text": "What is Encrypted Messaging?"
  }, {
    "depth": 2,
    "slug": "why-do-i-need-encrypted-messaging",
    "text": "Why do I Need Encrypted Messaging?"
  }, {
    "depth": 2,
    "slug": "what-should-i-look-for-in-an-encrypted-messenger",
    "text": "What Should I Look For in an Encrypted Messenger?"
  }, {
    "depth": 2,
    "slug": "avoid-the-following",
    "text": "Avoid The Following"
  }, {
    "depth": 2,
    "slug": "honorable-mention-briar",
    "text": "Honorable Mention: Briar"
  }, {
    "depth": 2,
    "slug": "honorable-mention-simplex",
    "text": "Honorable Mention: SimpleX"
  }, {
    "depth": 3,
    "slug": "tips--tricks",
    "text": "Tips & Tricks"
  }];
}
function _createMdxContent$s(props) {
  const _components = Object.assign({
    h1: "h1",
    h2: "h2",
    p: "p",
    strong: "strong",
    a: "a",
    ul: "ul",
    li: "li",
    em: "em",
    h3: "h3"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "privacy-encrypted-messaging",
      children: "Privacy: Encrypted Messaging"
    }), "\n", createVNode(_components.h2, {
      id: "what-is-encrypted-messaging",
      children: "What is Encrypted Messaging?"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "End-to-end encrytion (E2EE) is a form of communication where the messages are encrypted in such a way that only the people involved in the conversation can read them."
      }), " See ", createVNode(_components.a, {
        href: "/guides/moderately-important/encryption",
        children: "Understanding Encryption"
      }), " for more information on this."]
    }), "\n", createVNode(_components.h2, {
      id: "why-do-i-need-encrypted-messaging",
      children: "Why do I Need Encrypted Messaging?"
    }), "\n", createVNode(_components.p, {
      children: ["These days, all messages are encrypted (except SMS text messages), but the service provider (Google, Facebook, etc) has the keys to decrypt your messages and can read them if they want to or are ordered to by a warrant. This means that a company can scan your messages to ", createVNode(_components.a, {
        href: "https://twitter.com/chrismlacy/status/1409727836093513729",
        children: "insert unwelcome ads"
      }), " or ", createVNode(_components.a, {
        href: "https://www.theverge.com/2018/12/12/18137795/fcc-text-message-rule-classification-spam",
        children: "alter or block"
      }), " messages entirely, or that a ", createVNode(_components.a, {
        href: "https://www.uscybersecurity.net/cyberNews/shopify-breach/",
        children: "rogue employee"
      }), " can steal the images and information you transmit. E2EE Messaging makes this impossible."]
    }), "\n", createVNode(_components.h2, {
      id: "what-should-i-look-for-in-an-encrypted-messenger",
      children: "What Should I Look For in an Encrypted Messenger?"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "The most important thing is to make sure the person you\u2019re contacting is using the same service as you."
      }), " These services only work if both parties are using the same encryption system. When making your decision, you should consider if any of your contacts are already widely using an encrypted messenger. If none of your contacts are using an encrypted messenger or if you think there\u2019s room for improvement, consider one from the list below."]
    }), "\n", createVNode(_components.h2, {
      id: "avoid-the-following",
      children: "Avoid The Following"
    }), "\n", createVNode($$Highlighting, {
      variant: "warning",
      children: createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: "WhatsApp"
          }), " is owned by Meta (formerly Facebook), who is a notorious ", createVNode(_components.a, {
            href: "https://www.forbes.com/sites/thomasbrewster/2017/01/22/whatsapp-facebook-backdoor-government-data-request/#3be52f0c1030",
            children: "enemy of privacy"
          }), ", and collects massive amounts of ", createVNode(_components.a, {
            href: "/guides/moderately-important/metadata",
            children: "metadata"
          }), "."]
        }), "\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: "Telegram"
          }), " has several serious shorcomings such as collecting more ", createVNode(_components.a, {
            href: "https://telegram.org/privacy#3-what-personal-data-we-use",
            children: "user data"
          }), " than a private messenger ideally should, ", createVNode(_components.a, {
            href: "https://odysee.com/@surveillancereport:2/telegram-ain't-looking-hot.-sr120:f",
            children: "contadictary statements"
          }), " regarding their data disclosure practices, credible ", createVNode(_components.a, {
            href: "https://www.wired.com/story/the-kremlin-has-entered-the-chat/",
            children: "allegations"
          }), " of state-level compromise, and no encryption by default (and no ability to encrypt group chats at all). Use Telegram with caution."]
        }), "\n"]
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "Listed in alphabetical order, not order of recommendation"
      })
    }), "\n", createVNode($$ProsAndCons, {
      data: data$7,
      headingLevel: 4
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: createVNode(_components.a, {
          href: "https://gitlab.com/thenewoil/website/-/wikis/Encrypted-Messaging-Criteria",
          children: "Click here to see my criteria for selecting these services"
        })
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: createVNode(_components.a, {
          href: "/charts/messaging",
          children: "Click here for a visual version of this chart"
        })
      })
    }), "\n", createVNode(_components.h2, {
      id: "honorable-mention-briar",
      children: "Honorable Mention: Briar"
    }), "\n", createVNode("img", {
      src: "/images/logos/briar.png",
      alt: "Briar logo",
      class: "float-left mx-6 w-24"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.a, {
        href: "https://briarproject.org/",
        children: "Briar"
      }), " is only available on Android (and a Linux version\nstill in testing). As such it does not meet the requirements for listing on this\nwebsite. However, Androids are far more ", createVNode(_components.a, {
        href: "https://www.statista.com/statistics/272698/global-market-share-held-by-mobile-operating-systems-since-2009/",
        children: "common"
      }), "\nthan iPhones in most parts of the world. Additionally, Briar can work even in parts\nof the world where the infrastructure is unreliable or has been destroyed. This is\nbecause Briar - like Jami - is a peer-to-peer messenger that does not rely on any\nservers - it connects directly to other devices via Bluetooth or WiFi, making it\nboth impossible to censor and viable even when the internet or cell towers are not\nfunctional. What makes Briar stand out from Jami is that Briar is specifically designed\nfor journalists, activists, and those with particularly high threat models. It routes\ndata through Tor when possible to strip metadata. Briar is considered one of the\nmost secure options available for private messaging. Again, Briar is not officially\nrecommended here because it is not cross-platform, but if you live in a highly volatile\narea with unreliable networking and a high number of Android users in your area,\nBriar would be my top recommendation without reservation."]
    }), "\n", createVNode(_components.h2, {
      id: "honorable-mention-simplex",
      children: "Honorable Mention: SimpleX"
    }), "\n", createVNode("img", {
      src: "/images/logos/simplex.png",
      alt: "SimpleX logo",
      class: "float-left mx-6 w-24"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.a, {
        href: "https://simplex.chat",
        children: "SimpleX"
      }), " is a newcomer that has taken the privacy space by\nstorm. At this time, SimpleX does not qualify for full listing because it does not\nhave a desktop app (it does have a terminal app, but those do not meet our criteria).\nHowever, SimpleX has been audited, is decentralized, and aims to remove the user\nidentifiers entirely, making the messenger resistant to state-level attacks who would\nmap out your social network based on which IDs are talking to which. SimpleX is currently\nearly in development and missing many standard features, however it is developing\nquickly and is currently available for Android and iOS."]
    }), "\n", createVNode(_components.h3, {
      id: "tips--tricks",
      children: "Tips & Tricks"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "For high-risk individuals, the jurisdiction of the provider is important."
      }), " Jurisdiction determines what laws they follow and who can issue legal orders."]
    }), "\n", createVNode(_components.p, {
      children: ["Some additional resources for deciding which secure messaging is right for you could include the ", createVNode(_components.a, {
        href: "https://www.securemessagingapps.com/",
        children: "Secure Messaging Apps Comparison Chart"
      }), ", ", createVNode(_components.a, {
        href: "https://bkil.gitlab.io/secuchart/",
        children: "SecuChart"
      }), ", and ", createVNode(_components.a, {
        href: "https://www.messenger-matrix.de/messenger-matrix-en.html",
        children: "this chart"
      }), "."]
    })]
  });
}
function MDXContent$s(props = {}) {
  return createVNode(MDXLayout$s, {
    ...props,
    children: createVNode(_createMdxContent$s, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$s, "astro:jsx");
__astro_tag_component__(MDXContent$s, "astro:jsx");
const url$s = "/en/guides/less-important/messaging";
const file$s = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/less-important/messaging.mdx";
function rawContent$s() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$s() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$s = (props = {}) => MDXContent$s({
											...props,
											components: { Fragment, ...props.components },
										});
Content$s[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$s.layout);

const _page40 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$s,
  _internal: _internal$s,
  compiledContent: compiledContent$s,
  default: Content$s,
  file: file$s,
  frontmatter: frontmatter$s,
  getHeadings: getHeadings$s,
  rawContent: rawContent$s,
  url: url$s
}, Symbol.toStringTag, { value: 'Module' }));

const criterias$2 = [
	"Index",
	"Recommended Instance"
];
const tools$2 = {
	brave: {
		name: "Brave Search",
		logo: "/images/logos/brave.png",
		link: "https://search.brave.com/",
		values: {
			Index: "Brave",
			"Recommended Instance": "NA"
		}
	},
	ecosia: {
		name: "Ecosia",
		logo: "/images/logos/ecosia.png",
		link: "https://www.ecosia.com/",
		values: {
			Index: "[Bing](https://ecosia.helpscoutdocs.com/article/403-wie-entsteht-das-ranking-der-ergebnisse)",
			"Recommended Instance": "NA"
		}
	},
	metager: {
		name: "Metager",
		logo: "/images/logos/metager.png",
		link: "https://metager.org/",
		values: {
			Index: "[Bing](https://metager.org/search-engine), others",
			"Recommended Instance": "NA"
		}
	},
	mojeek: {
		name: "Mojeek",
		logo: "/images/logos/mojeek.png",
		link: "https://www.mojeek.com/",
		values: {
			Index: "Mojeek",
			"Recommended Instance": "NA"
		}
	},
	qwant: {
		name: "Qwant",
		logo: "/images/logos/qwant.png",
		link: "https://www.qwant.com/",
		values: {
			Index: "Qwant",
			"Recommended Instance": "NA"
		}
	},
	searx: {
		name: "SearX",
		logo: "/images/logos/searx.png",
		link: "https://searx.github.io/searx/",
		values: {
			Index: "Depends on the instance",
			"Recommended Instance": "https://searx.be"
		}
	},
	whoogle: {
		name: "Whoogle",
		logo: "/images/logos/whoogle.png",
		link: "https://github.com/benbusby/whoogle-search",
		values: {
			Index: "Google",
			"Recommended Instance": "https://search.sethforprivacy.com/"
		}
	}
};
const data$6 = {
	criterias: criterias$2,
	tools: tools$2
};

const MDXLayout$r = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$r;
  content.file = file$r;
  content.url = url$r;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$r,
    url: url$r,
    content,
    frontmatter: content,
    headings: getHeadings$r(),
    "server:root": true,
    children
  });
};
const frontmatter$r = {
  "layout": "@layouts/guides.astro",
  "title": "General Online Habits",
  "topic": "Healthy online Habits",
  "weight": 5,
  "draft": false
};
const _internal$r = {
  injectedFrontmatter: {}
};
function getHeadings$r() {
  return [{
    "depth": 1,
    "slug": "general-online-habits",
    "text": "General Online Habits"
  }, {
    "depth": 2,
    "slug": "phishing--clicking-links",
    "text": "Phishing & Clicking Links"
  }, {
    "depth": 2,
    "slug": "sharing-information",
    "text": "Sharing Information"
  }, {
    "depth": 2,
    "slug": "social-media",
    "text": "Social Media"
  }, {
    "depth": 2,
    "slug": "search-engines",
    "text": "Search Engines"
  }, {
    "depth": 2,
    "slug": "account-hygiene",
    "text": "Account Hygiene"
  }];
}
function _createMdxContent$r(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    h2: "h2",
    strong: "strong",
    a: "a",
    em: "em"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "general-online-habits",
      children: "General Online Habits"
    }), "\n", createVNode(_components.p, {
      children: "This section is a collection of general advice and miscellaneous tips that don\u2019t really make sense on any other pages."
    }), "\n", createVNode(_components.h2, {
      id: "phishing--clicking-links",
      children: "Phishing & Clicking Links"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: [createVNode(_components.a, {
          href: "https://en.wikipedia.org/wiki/Phishing",
          children: "Phishing"
        }), " has been and remains one of the top ways to gain unauthorized access to a specific machine, account, or network."]
      }), " Phishing occurs when a person clicks on a link and either enters information or downloads a payload that gives a malicious actor access to an account or device. In the case of malware, the attacker can access the data on that machine or the network the machine is connected to. Typically this link-clicking occurs in the form of an email that appears to be legitimate, such as an email that appears to be from your bank asking you to confirm account details or to see an enclosed attachment. Phishing could also come in the form of malicious, fake ads (called \u201Cmalvertising\u201D) which has become so prevalent that even the FBI now ", createVNode(_components.a, {
        href: "https://techcrunch.com/2022/12/22/fbi-ad-blocker/",
        children: "recommends"
      }), " that you use an ad-blocker. This is why ", createVNode(_components.a, {
        href: "/guides/most-important/browser",
        children: "ad-blockers"
      }), " are so important. The final common phishing technique is when an attacker contacts you claiming to be in a position of authority or expertise and asks you for sensitive information about yourself (for example, a phone call from someone claiming to be an IRS agent who needs to verify your information for tax purposes or the IT guy who needs to remote into your work device for some reason)."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "The best way to avoid phishing is to be overly cautious."
      }), " If something seems out of character, contact the person and ask about it. For example, if your bank sends an email requiring confirmation of something, ignore the email and go straight to their website. If it\u2019s legitimate, the same warning will pop up when you log in or be waiting in your messages. If you\u2019re still not sure, contact their support team and ask."]
    }), "\n", createVNode(_components.h2, {
      id: "sharing-information",
      children: "Sharing Information"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Think carefully about what information you share and what it reveals."
      }), " Back in the early days of social media, it was common that people would publicly share that they were going on vacation for a week, so criminals in the area would find the house and ", createVNode(_components.a, {
        href: "https://www.zdnet.com/article/infographic-80-of-robbers-check-twitter-facebook-google-street-view/",
        children: "rob it"
      }), " while they were gone. That exact crime may or may not live on, but the principle still does. One woman had a stalker ", createVNode(_components.a, {
        href: "https://www.bbc.com/news/world-asia-50000234",
        children: "find her"
      }), " because she took a selfie where the street sign was visible. I\u2019m not saying don\u2019t share anything online, simply to be mindful of what information is visible in the photo, such as a company logo on your shirt or financial information in your screenshot."]
    }), "\n", createVNode(_components.p, {
      children: ["Additionally, this extends into non-public internet spaces. For example, next time you sign up for a website or pay for something online, try submitting no information at all. It will likely relaod the page and mark the mandatory fields, but you might be surprised what information is optional. ", createVNode(_components.strong, {
        children: "You should view every website as a data breach waiting to happen,"
      }), " and anything that isn\u2019t a password or card number is probably not encrypted (and sometimes even those aren\u2019t), so the less personal information you hand over the better. If you are required to hand over information but the requesting site or service doesn\u2019t actually need it, consider using ", createVNode(_components.a, {
        href: "/guides/less-important/disinformation",
        children: "disinformation"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "social-media",
      children: "Social Media"
    }), "\n", createVNode(_components.p, {
      children: ["If you are simply a \u201Clurker,\u201D - someone who likes to view content but not comment - there are a lot of really great front-ends available that allow you to view content while reducing or eliminating the number of trackers on a website, almost like a proxy. For Twitter, there\u2019s numerous ", createVNode(_components.a, {
        href: "https://github.com/zedeus/nitter/wiki/Instances",
        children: "Nitter instances"
      }), ". For YouTube, there\u2019s a host of ", createVNode(_components.a, {
        href: "https://redirect.invidious.io/",
        children: "Invidious instances"
      }), " and the ", createVNode(_components.a, {
        href: "https://newpipe.net/",
        children: "NewPipe"
      }), " app for Android users. For Reddit, there\u2019s ", createVNode(_components.a, {
        href: "https://github.com/spikecodes/libreddit",
        children: "Libreddit"
      }), " and ", createVNode(_components.a, {
        href: "https://codeberg.org/teddit/teddit",
        children: "Teddit"
      }), ". For Instagram, there\u2019s ", createVNode(_components.a, {
        href: "https://git.sr.ht/~cadence/bibliogram-docs/tree/master/docs/Instances.md",
        children: "Bibliogram"
      }), ". For TikTok, ", createVNode(_components.a, {
        href: "https://proxitok.pabloferreiro.es/",
        children: "ProxiTalk"
      }), " has recently entered the scene. Sadly there are no web-based Facebook or Snapchat front-ends that I\u2019m aware of. If you\u2019d like, there\u2019s an extension called ", createVNode(_components.a, {
        href: "https://github.com/libredirect/LibRedirect",
        children: "LibRedirect"
      }), " that you can use to automatically redirect any links you click to the front-end of your choice. (Note that with the rise of services such as ChatGPT, many companies are now requiring a login or \u201Crate-limiting\u201D the number of posts you can see without an account. This may affect front-ends and make them difficult to use in some cases.)"]
    }), "\n", createVNode(_components.p, {
      children: ["If you feel the need to have social media, try checking out the decentralized and more privacy-respecting ", createVNode(_components.a, {
        href: "https://fediverse.party/",
        children: "Fediverse"
      }), ". This is a volunteer run, peer-to-peer social networking system, and one of the coolest things about it (in my opinion) is the \u201Cfederation\u201D for which it\u2019s named. Imagine if you had a Twitter account but wanted to follow someone on Instagram. In mainstream social media, you have to sign up for Instagram. On the Fediverse, you can follow them from your own platform even without creating a new account. For Twitter fans I recommend ", createVNode(_components.a, {
        href: "https://joinmastodon.org/",
        children: "Mastodon"
      }), ". For Instagram fans, ", createVNode(_components.a, {
        href: "https://pixelfed.org",
        children: "PixelFed"
      }), ". Facebook users might feel more comfortable on ", createVNode(_components.a, {
        href: "https://friendi.ca/",
        children: "Friendica"
      }), " and YouTube users might find new content on ", createVNode(_components.a, {
        href: "https://joinpeertube.org/",
        children: "PeerTube"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "While I discourage mainstream social media services for a number of reasons, I understand that sometimes you have no choice in using them. My recommendation would be to not use the apps, post as little as possible, and make your profile as private as possible."
    }), "\n", createVNode(_components.p, {
      children: ["Whether you stick with mainstream social media or use a privacy-focused alternative, ", createVNode(_components.strong, {
        children: "I discourage using the same username or handle across all your social media accounts"
      }), " unless you\u2019re building a professional brand. I suggest using your password manager to generate a two or three random word passphrase and then use that as your handle. Also be sure to use a unique ", createVNode(_components.a, {
        href: "/guides/moderately-important/email-aliasing",
        children: "alias email"
      }), " for each account. Repeat as needed for every site and account. If somebody decides to cyberstalk you, this can make it harder for them to find all of your accounts. This also protects against ", createVNode(_components.a, {
        href: "https://owasp.org/www-community/attacks/Credential_stuffing",
        children: "credential stuffing"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "search-engines",
      children: "Search Engines"
    }), "\n", createVNode(_components.p, {
      children: ["Change your default search engine. Google tracks all of your searches and records them, and these are all added to your profile to create a more complete picture of you as a person. There are no perfect solutions in this space, but there are many options. Most privacy respecting search engines are actually \u201Cmetasearch\u201D engines, meaning that they don\u2019t actually pull their own results but rather proxy the results of other search engines like Google, Bing, or Yandex. This can present problems if the engine these services pull from decide to ", createVNode(_components.a, {
        href: "https://www.theguardian.com/technology/2021/jun/04/microsoft-bing-tiananmen-tank-man-results",
        children: "censor"
      }), " content. Below I have listed some of the options out there along with what service they pull results from. Again, there are no perfect solutions here. Each service has drawbacks or controversies. Please do your research and select the one that best fits your ", createVNode(_components.a, {
        href: "/guides/prologue/threatmodel",
        children: "threat model"
      }), " and priorities."]
    }), "\n", createVNode(_components.p, {
      children: ["Veteran privacy enthusiasts may notice that two of the most popular metasearch enginges, DuckDuckGo and Startpage, are not listed on this site. Both of these search engines have lost my trust in spectacular fashion, and I cannot in good conscience recommend them to my audience. DuckDuckGo lost my trust when they were caught red-handed ", createVNode(_components.a, {
        href: "https://www.bleepingcomputer.com/news/security/duckduckgo-browser-allows-microsoft-trackers-due-to-search-agreement/",
        children: "allowlisting Microsoft trackers"
      }), " in their browser, with no disclosure to their users. They then tried to downplay the incident. This incident makes me very suspicious of what else they may be hiding that we simply haven\u2019t caught them doing yet and therefore they haven\u2019t owned up to."]
    }), "\n", createVNode(_components.p, {
      children: ["Startpage lost my trust after announcing they had entered into a partnership with ", createVNode(_components.a, {
        href: "https://restoreprivacy.com/startpage-system1-privacy-one-group/",
        children: "System1"
      }), ", an advertising company, and offering absolutely no further explanation around the nature of this relationship, how they promised to continue to ensure user privacy, or anything else. When the privacy community understandably asked for more information surrounding this partnership, Startpage was silent, ignoring all questions or delivering canned PR responses. The entire incident was handled poorly when it should\u2019ve been obvious that they would\u2019ve faced such questions. This mistrust was only exacerbated for me personally when they were interviewed on ", createVNode(_components.a, {
        href: "https://optoutpod.com/episodes/s2e08-startpage/",
        children: "OptOut Podcast"
      }), " where the representative referenced that their CEO had a \u201Cspecial agreement\u201D with Google which allowed them to operate, but failed to give any more insight into the nature of that agreement. Startpage is also notorious for blocking VPN and Tor IP addresses, despite billing themselves as a privacy-friendly company. All this to say, Startpage\u2019s extreme lack of transparency and contradictory policies has failed to inspire any modicum of trust in me and I do not recommend them."]
    }), "\n", createVNode(_components.p, {
      children: ["Before readers contact me about these last two paragraphs, I encourage you to reference our ", createVNode(_components.a, {
        href: "/about",
        children: "About"
      }), " page and remember that you are welcome to use whatever you like, I am merely offering my suggestions."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "Listed in alphabetical order, not order of recommendation"
      })
    }), "\n", createVNode($$Criterias, {
      data: data$6
    }), "\n", createVNode(_components.h2, {
      id: "account-hygiene",
      children: "Account Hygiene"
    }), "\n", createVNode(_components.p, {
      children: ["Delete any and all unused accounts. This includes old social media accounts, library accounts, work accounts, services you signed up for once and never used again, etc. If you can\u2019t delete them for whatever reason, change it to a ", createVNode(_components.a, {
        href: "/guides/most-important/passwords",
        children: "secure password"
      }), " and hold onto it somewhere safe. The exceptions to this is that I recommend holding onto old email accounts, and I recommend \u201D", createVNode(_components.a, {
        href: "https://krebsonsecurity.com/2020/08/why-where-you-should-you-plant-your-flag/",
        children: "planting your flag"
      }), "\u201D on important accounts that are prone to fraud, such as unemployment. For the email accounts, you never know what you once used them for and when you might need them again for that purpose."]
    })]
  });
}
function MDXContent$r(props = {}) {
  return createVNode(MDXLayout$r, {
    ...props,
    children: createVNode(_createMdxContent$r, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$r, "astro:jsx");
__astro_tag_component__(MDXContent$r, "astro:jsx");
const url$r = "/en/guides/less-important/habits";
const file$r = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/less-important/habits.mdx";
function rawContent$r() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$r() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$r = (props = {}) => MDXContent$r({
											...props,
											components: { Fragment, ...props.components },
										});
Content$r[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$r.layout);

const _page41 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$r,
  _internal: _internal$r,
  compiledContent: compiledContent$r,
  default: Content$r,
  file: file$r,
  frontmatter: frontmatter$r,
  getHeadings: getHeadings$r,
  rawContent: rawContent$r,
  url: url$r
}, Symbol.toStringTag, { value: 'Module' }));

const hushed = {
	name: "Hushed",
	logo: "/images/logos/hushed.png",
	logo_alt: "Hushed logo",
	link: "https://hushed.com/",
	pros: [
		"Unlimited numbers",
		"International calling",
		"Can work just with WiFi (doesn't need mobile data to operate)",
		"Does not require your SIM number"
	],
	cons: [
		"No free tier",
		"US and Canadian phone numbers only",
		"No desktop app"
	]
};
const mysudo = {
	name: "MySudo",
	logo: "/images/logos/mysudo.png",
	logo_alt: "MySudo logo",
	link: "https://mysudo.com/",
	pros: [
		"Up to 9 numbers available",
		"Does not require your SIM number",
		"Includes fully functional email, web browser, and [digital masked cards](/guides/most-important/payments) (iOS only)",
		"Zero-knowledge at rest",
		"End-to-end encrypted (only to other MySudo users)",
		"Group chats (only to other MySudo users)",
		"Video calls (only to other MySudo users)"
	],
	cons: [
		"US, Canadian, and UK phone numbers only",
		"Desktop client in beta, web-based only, can only sync with iOS"
	]
};
const skype = {
	name: "Skype",
	logo: "/images/logos/skype.png",
	logo_alt: "Skype logo",
	link: "https://www.skype.com/en/skype-number/",
	pros: [
		"Supports up to 10 phone numbers",
		"Available in 25+ countries",
		"Does not require your SIM number",
		"Desktop app available"
	],
	cons: [
		"No group chats (over normal protocols)",
		"No video calls (over normal protocols)",
		"Requires a Microsoft account",
		"Pay by the minute"
	]
};
const viber = {
	name: "Viber",
	logo: "/images/logos/viber.png",
	logo_alt: "Viber logo",
	link: "https://www.viber.com/",
	pros: [
		"Group chats (only to other Viber users)",
		"Video calls (only to other Viber users)",
		"Desktop client",
		"Zero-knowledge storage",
		"End-to-end encrypted (only to other Viber users)",
		"Worldwide numbers available",
		"Does not require your SIM number"
	],
	cons: [
		"External messaging and calling cost extra",
		"Only one number available"
	]
};
const data$5 = {
	hushed: hushed,
	"google voice": {
	name: "Google Voice",
	logo: "/images/logos/google_voice.png",
	logo_alt: "Google Voice logo",
	link: "https://voice.google.com/about",
	pros: [
		"One free number (unlimited numbers with Workspace subscription)",
		"Desktop client available",
		"No phone app required (forwards calls and texts to your SIM number)"
	],
	cons: [
		"US and Canada only",
		"No group chats",
		"No video calls",
		"Requires your SIM number",
		"Requires a Google account"
	]
},
	mysudo: mysudo,
	skype: skype,
	"tossable digits": {
	name: "Tossable Digits",
	logo: "/images/logos/tossable-digits.png",
	logo_alt: "Tossable Digits logo",
	link: "https://www.tossabledigits.com/",
	pros: [
		"Unlimited numbers",
		"International calling",
		"Available in 70 Countries",
		"No phone app required (forwards calls and texts to your SIM number)"
	],
	cons: [
		"No free tier",
		"No desktop app",
		"International Calls are billed per minute",
		"SMS only supported on US and Canada Numbers"
	]
},
	viber: viber
};

const MDXLayout$q = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$q;
  content.file = file$q;
  content.url = url$q;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$q,
    url: url$q,
    content,
    frontmatter: content,
    headings: getHeadings$q(),
    "server:root": true,
    children
  });
};
const frontmatter$q = {
  "layout": "@layouts/guides.astro",
  "title": "Protection: Voice-over-IP",
  "topic": "Voice-over-IP",
  "weight": 3,
  "draft": false
};
const _internal$q = {
  injectedFrontmatter: {}
};
function getHeadings$q() {
  return [{
    "depth": 1,
    "slug": "protection-voice-over-ip",
    "text": "Protection: Voice-over-IP"
  }, {
    "depth": 2,
    "slug": "what-is-voice-over-ip-voip",
    "text": "What is Voice-over-IP (VoIP)?"
  }, {
    "depth": 2,
    "slug": "why-do-i-need-voice-over-ip",
    "text": "Why do I Need Voice-over-IP?"
  }, {
    "depth": 2,
    "slug": "example-advantages-of-voip",
    "text": "Example Advantages of VoIP"
  }, {
    "depth": 2,
    "slug": "honorable-mention-jmpchat",
    "text": "Honorable Mention: JMP.Chat"
  }, {
    "depth": 2,
    "slug": "tips--tricks",
    "text": "Tips & Tricks"
  }];
}
function _createMdxContent$q(props) {
  const _components = Object.assign({
    h1: "h1",
    h2: "h2",
    p: "p",
    strong: "strong",
    em: "em",
    a: "a"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "protection-voice-over-ip",
      children: "Protection: Voice-over-IP"
    }), "\n", createVNode(_components.h2, {
      id: "what-is-voice-over-ip-voip",
      children: "What is Voice-over-IP (VoIP)?"
    }), "\n", createVNode(_components.p, {
      children: "Voice-over-IP is the technology allowing phone calls to be sent over the internet rather than regular phone protocols. The capability has been around for decades and has been extremely common in the commercial world as an efficient way to manage multiple phone numbers in office environments. The technology has recently started to become popular with cell phones as a way to circumvent needing to \u201Cuse minutes,\u201D especially with international calls, and even more recently has become popular for its privacy implications."
    }), "\n", createVNode(_components.h2, {
      id: "why-do-i-need-voice-over-ip",
      children: "Why do I Need Voice-over-IP?"
    }), "\n", createVNode(_components.p, {
      children: "If you are a freelancer, still dating around, work in a high-profile or sensitive position, job hunting, or **any other similar situation, this section is critical for you. I would define a \u201Csimilar situation\u201D as any situation where you hand your phone number out frequently to strangers or you have an increased need for privacy. If you don\u2019t feel you fall into this category, consider this section \u201Cnot mandatory but highly recommended.\u201D"
    }), "\n", createVNode(_components.p, {
      children: ["Regular SIM phone numbers are often tied to individuals. In some parts of the world, an identification is required, but in other places the most common way it gets tied to a person is by setting up a phone plan in a real name, often accompanied by a credit check to buy an expensive smartphone on a payment plan. Once that happens, ", createVNode(_components.strong, {
        children: "the phone number issued by the cell provider basically becomes a type of identification number."
      }), " There are numerous websites where one can type in a phone number and get varying degrees of information about the owner of that number. Usually at a bare minimum one can get the provider and general location of the the owner (often accurate to within the city). Sometimes one can get a full address, a full name, roommates, historical information, and more. Voice-over-IP numbers are significantly less regulated and therefore give away immensely less information. By using a VoIP number instead of your real number, you dramatically reduce risk to yourself."]
    }), "\n", createVNode(_components.h2, {
      id: "example-advantages-of-voip",
      children: "Example Advantages of VoIP"
    }), "\n", createVNode(_components.p, {
      children: ["Using VoIP is a great way to compartmentalize your life. For example, ", createVNode(_components.strong, {
        children: "using a VoIP number exclusively for dating is a great way to protect against potential stalkers."
      }), " The person won\u2019t be able to research your number and find any information about you, leaving you free to cut off the number and safely lose them before you put yourself in danger."]
    }), "\n", createVNode(_components.p, {
      children: ["Another handy feature of VoIP is professional protection. ", createVNode(_components.strong, {
        children: "As a freelancer, I can give out my work phone number to anyone they want and not have to worry about a client discovering any personal aspects of my life"
      }), " that I may not want them to know. Consider this: in some states, public records are so open that many people search websites are able to connect your phone number to your voter records and publish your registered party online. I would hate for a client to not hire me based on my registered political party without knowing me."]
    }), "\n", createVNode(_components.p, {
      children: ["On the topic of work, with many people now working from home, ", createVNode(_components.strong, {
        children: "a VoIP number allows you to create and enforce a healthy work/life balance."
      }), " If after-hours calls or texts ever become an issue, you can turn off your VoIP number after hours so that it doesn\u2019t even ring. Your coworkers would have no choice in this situation but to wait business hours."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Note: None of these services on this page are source available, and few of them claim to be privacy respecting."
      }), " As explained below the table, ", createVNode(_components.strong, {
        children: "VoIP is not meant to be a replacement for encrypted messaging."
      }), " As such, I\u2019m presenting a wide range of options for your consideration, but be aware that none of them are truly private or safe."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "Listed in alphabetical order, not order of recommendation"
      })
    }), "\n", createVNode($$ProsAndCons, {
      data: data$5,
      headingLevel: 4
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: createVNode(_components.a, {
          href: "https://gitlab.com/thenewoil/website/-/wikis/VOIP-Criteria",
          children: "Click here to see my criteria for selecting these services"
        })
      })
    }), "\n", createVNode(_components.h2, {
      id: "honorable-mention-jmpchat",
      children: "Honorable Mention: JMP.Chat"
    }), "\n", createVNode(_components.p, {
      children: ["Many of my readers often write me to suggest ", createVNode(_components.a, {
        href: "https://jmp.chat/",
        children: "JMP.Chat"
      }), ". JMP.Chat is an ", createVNode(_components.a, {
        href: "/guides/less-important/messaging",
        children: "XMPP"
      }), "-based Voice-over-IP solution that supports both voice calls and SMS/MMS texting. You may use any number of XMPP apps - like Conversations or Monal - and even self-host an XMPP server if you wish for maximum privacy and control. To put it another way: ", createVNode(_components.strong, {
        children: "JMP.Chat is a service that turns your XMPP account into a fully-functional phone number that can make/receive phone calls and text/picture messages to regular phone numbers"
      }), " just like a regular phone number or one of the VoIP providers listed above, but it gives you even more control. JMP.Chat is currently only available in the US and Canada and costs $2.99(USD)/$3.59(CAD). It is listed here as an honorable mention because unlike the services above, JMP.Chat requires some additional technical setup on the user\u2019s end. Even if you choose to use an existing server rather than self-hosting, it\u2019s not as clear-cut as downloading the app and signing up like the services above, you will have to use third party apps and servers to configure the service. For additional information or help getting set up with JMP.Chat, please see their FAQ ", createVNode(_components.a, {
        href: "https://jmp.chat/faq/",
        children: "here"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "tips--tricks",
      children: "Tips & Tricks"
    }), "\n", createVNode(_components.p, {
      children: ["Almost across the board, I recommend ", createVNode(_components.a, {
        href: "https://mysudo.com/",
        children: "MySudo"
      }), ". It is available for both iOS and Android, and they have plans that will give you the ability to communicate with non-MySudo users beginning at $1 USD per month, or $10 per year. I would recommend SudoPro or SudoMax ($5/$50 and $15/$150 respectively) for most people depending on your needs. If you\u2019re on a tight budget, I recommend ", createVNode(_components.a, {
        href: "https://www.google.com/voice",
        children: "Google Voice"
      }), ".This will allow you to create VoIP numbers that forward to your real number. If you live outside the US, UK, or Canada, then Viber is the clear choice."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: ["VoIP is not meant to replace ", createVNode(_components.a, {
          href: "/guides/less-important/messaging",
          children: "secure messaging"
        }), "."]
      }), " Just as with a regular SIM, you should assume that anything you submit - be it text, voice, or video - is recorded and plainly visible to any companies and or governments. VoIP solutions are recommended purely as a way to keep your data out of the hands of people search websites and protect you against relatively unsophisticated threats like stalkers and doxxers."]
    })]
  });
}
function MDXContent$q(props = {}) {
  return createVNode(MDXLayout$q, {
    ...props,
    children: createVNode(_createMdxContent$q, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$q, "astro:jsx");
__astro_tag_component__(MDXContent$q, "astro:jsx");
const url$q = "/en/guides/less-important/voip";
const file$q = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/less-important/voip.mdx";
function rawContent$q() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$q() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$q = (props = {}) => MDXContent$q({
											...props,
											components: { Fragment, ...props.components },
										});
Content$q[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$q.layout);

const _page42 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$q,
  _internal: _internal$q,
  compiledContent: compiledContent$q,
  default: Content$q,
  file: file$q,
  frontmatter: frontmatter$q,
  getHeadings: getHeadings$q,
  rawContent: rawContent$q,
  url: url$q
}, Symbol.toStringTag, { value: 'Module' }));

const ivpn = {
	name: "IVPN",
	logo: "/images/sponsors/ivpn.png",
	logo_alt: "IVPN logo",
	link: "https://www.ivpn.net",
	pros: [
		"[Audited](https://www.ivpn.net/blog/tags/audit/)",
		"Available on all operating systems",
		"Anonymous payments (cash and Monero) available",
		"Offers malware, tracker, and ad-blocking for [all plans](https://www.ivpn.net/antitracker/)",
		"[Hardcore Mode](https://www.ivpn.net/blog/block-ads-and-beat-data-surveillance-with-ivpns-antitracker/) blocks all Google and Facebook domains",
		"[Trusted/Untrusted networks](https://www.ivpn.net/blog/new-trusted-wi-fi-networks-feature-for-ivpn-apps/) feature allows the VPN to enable or disable automatically on certain networks",
		"Offers [TOTP multifactor authentication](/guides/most-important/mfa) for accounts"
	],
	cons: [
	]
};
const mullvad = {
	name: "Mullvad",
	logo: "/images/logos/mullvad.png",
	logo_alt: "Mullvad logo",
	link: "https://mullvad.net/",
	pros: [
		"[Audited](https://mullvad.net/en/blog/search/?q=audit)",
		"Available on all operating systems",
		"Flat rate of $5/month for all services and payment lengths",
		"Anonymous payments (cash and Monero) available",
		"Offers malware, tracker, and ad-blocking for [all plans](https://mullvad.net/en/why-mullvad-vpn/)",
		"Frequently engages in [early-adoption practices](https://mullvad.net/en/blog/2022/12/30/review-of-2022/) to improve user privacy and security, like post-quantum safe tunnels, diskless infrastructure, numerous audits, and more."
	],
	cons: [
		"Does not offer [multifactor authentication](/guides/most-important/mfa) for accounts"
	]
};
const protonvpn = {
	name: "Proton VPN",
	logo: "/images/logos/proton.png",
	logo_alt: "Proton VPN logo",
	referral_link: "https://go.getproton.me/aff_c?offer_id=26&aff_id=2187&url=https%3A%2F%2Fproton.me%2F%3FvisitorId%3Dho-{transaction_id}%26aid%3D{affiliate_id}%26offer_id%3D{offer_id}%26url_id%3D{offer_url_id}%26utm_campaign%3Dww-all-2c-vpn-gro_aff-g_acq-partners_program%26utm_source%3Daid-tune-{affiliate_id}%26utm_medium%3Dlink%26utm_term%3Dgeneric_vpn_landing%26utm_content%3D{offer_id}%26hfp%3Dfalse%26spl%3D{affiliate_id}%26aap%3D{affiliate_id}",
	link: "https://protonvpn.com/",
	pros: [
		"[Audited](https://protonvpn.com/blog/open-source/)",
		"Available on all operating systems",
		"Anonymous payments (cash) available",
		"Offers a limited number of free servers",
		"Offers malware, tracker, and ad-blocking ([paid plans only](https://protonvpn.com/support/netshield/))",
		"Advertises to work with streaming services such as Netflix and Disney+ (paid plans only)",
		"Offers TOTP and hardware token [multifactor authentication](/guides/most-important/mfa) for accounts"
	],
	cons: [
	]
};
const data$4 = {
	ivpn: ivpn,
	mullvad: mullvad,
	protonvpn: protonvpn
};

const MDXLayout$p = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$p;
  content.file = file$p;
  content.url = url$p;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$p,
    url: url$p,
    content,
    frontmatter: content,
    headings: getHeadings$p(),
    "server:root": true,
    children
  });
};
const frontmatter$p = {
  "layout": "@layouts/guides.astro",
  "title": "Privacy: VPNs",
  "topic": "VPNs",
  "weight": 8,
  "draft": false
};
const _internal$p = {
  injectedFrontmatter: {}
};
function getHeadings$p() {
  return [{
    "depth": 1,
    "slug": "privacy-vpns",
    "text": "Privacy: VPNs"
  }, {
    "depth": 2,
    "slug": "what-is-a-virtual-private-network-vpn",
    "text": "What is a Virtual Private Network (VPN)?"
  }, {
    "depth": 2,
    "slug": "why-do-i-need-a-vpn",
    "text": "Why do I Need a VPN?"
  }, {
    "depth": 2,
    "slug": "what-should-i-look-for-in-a-vpn-provider",
    "text": "What Should I Look For in a VPN Provider?"
  }, {
    "depth": 2,
    "slug": "honorable-mention-safing-private-network",
    "text": "Honorable Mention: Safing Private Network"
  }, {
    "depth": 2,
    "slug": "dns-leaks--custom-resolvers",
    "text": "DNS Leaks & Custom Resolvers"
  }, {
    "depth": 2,
    "slug": "tips--tricks",
    "text": "Tips & Tricks"
  }];
}
function _createMdxContent$p(props) {
  const _components = Object.assign({
    h1: "h1",
    h2: "h2",
    p: "p",
    strong: "strong",
    a: "a",
    em: "em",
    ul: "ul",
    li: "li"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "privacy-vpns",
      children: "Privacy: VPNs"
    }), "\n", createVNode(_components.h2, {
      id: "what-is-a-virtual-private-network-vpn",
      children: "What is a Virtual Private Network (VPN)?"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "A VPN is an encrypted connection from your device to the VPN provider\u2019s server."
      }), " All your internet traffic is routed through that server. Additionally, your traffic appears to be coming through that server, which can help to obscure your true IP address."]
    }), "\n", createVNode(_components.h2, {
      id: "why-do-i-need-a-vpn",
      children: "Why do I Need a VPN?"
    }), "\n", createVNode(_components.p, {
      children: "A VPN protects from local attackers. While most of the internet is encrypted, not all of it is, and unfortunately important websites like government websites are typically the worst offenders for this. While unlikely, public wifi is also susceptible to being spoofed or spied on, so a VPN can keep your traffic safe from a malicous or nosey admin. Even at home, your Internet Service Provider can see your traffic and legally can sell your browsing data to marketers or inject their own ads. A VPN also has the advantage of obscuring your IP address, which is an important piece of identifying information about you online, thus helping to protect your privacy. As a peripheral benefit, many VPN providers offer servers in multiple countries so you can bypass geographic content restrictions on sites like Netflix and YouTube."
    }), "\n", createVNode(_components.h2, {
      id: "what-should-i-look-for-in-a-vpn-provider",
      children: "What Should I Look For in a VPN Provider?"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "The most important thing is to look for a VPN provider who doesn\u2019t keep logs."
      }), " A provider who logs your activity is no better than your current internet provider in that your traffic can still be sold, censored, or spied on. Unfortunately, \u201Cno logs\u201D is a buzzword these days, and numerous providers have been caught lying about this. The best way I\u2019ve found to verify this claim is to search \u201C[VPN provider] logs\u201D on your privacy-respecting ", createVNode(_components.a, {
        href: "/guides/less-important/habits",
        children: "search engine"
      }), " of choice. If the provider has been around for any amount of time and has any positive reputation, you will likely find articles or posts confirming or denying their logging policy in some way. You\u2019ll also be alerted to any potential accusations of logging, discussions on that claim, and other information to help you decide if the company is serious or not."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Make sure to see how the provider makes money."
      }), " Running an VPN server is expensive and requires great technical knowledge. \u201CIf a product is free, you are the product.\u201D Make sure the company has a viable business plan or else assume they are likely logging and selling your data, ", createVNode(_components.a, {
        href: "https://www.makeuseof.com/tag/biggest-risks-using-free-vpns/",
        children: "or worse"
      }), ". Never trust a free VPN unless it\u2019s a trial (or in Proton\u2019s case, a limited freemium business model)."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "Listed in alphabetical order, not order of recommendation"
      })
    }), "\n", createVNode($$ProsAndCons, {
      data: data$4,
      headingLevel: 4
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: createVNode(_components.a, {
          href: "https://gitlab.com/thenewoil/website/-/wikis/VPN-Criteria",
          children: "Click here to see my criteria for selecting these services"
        })
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: createVNode(_components.a, {
          href: "https://techlore.tech/vpn",
          children: "For more information on providers not listed here, see Techlore\u2019s VPN Toolkit."
        })
      })
    }), "\n", createVNode(_components.h2, {
      id: "honorable-mention-safing-private-network",
      children: "Honorable Mention: Safing Private Network"
    }), "\n", createVNode("img", {
      src: "/images/logos/spn.png",
      alt: "spn logo",
      class: "float-right mx-6 w-24"
    }), "\n", createVNode(_components.p, {
      children: ["VPNs were never designed for privacy. They were designed to allow employees to securely\nconnect to the company network to access company resources and intellectual property\nwhile offsite. It\u2019s only in the last few decades that commercial VPNs became widely\navailable to private citizens and were co-opted for privacy uses. However, this has\nleft a significant number of inadequacies in their current protections (see ", createVNode(_components.a, {
        href: "/guides/less-important/vpns/#tips--tricks",
        children: "Tips\n& Tricks"
      }), " below). The ", createVNode(_components.a, {
        href: "https://safing.io/spn/",
        children: "Safing Private\nNetwork"
      }), " - from Safing, the company behind ", createVNode(_components.a, {
        href: "https://safing.io/",
        children: "Portmaster"
      })]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "aims to solve these problems. SPN takes a hybrid approach between a VPN and Tor\nto achieve to maximum user privacy while also retaining user-friendliness, speed,\nand stability. Some features include giving each connection a different IP address,\na multi-hop node architecture, and the ability to easily split-tunnel apps with the\nclick of a toggle. SPN is still very new technology and may contain some bugs as\nthe developers work to mature the product, however early adopters who desire a stronger\nsolution than traditional VPNs have to offer may wish to look into this option."
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "dns-leaks--custom-resolvers",
      children: "DNS Leaks & Custom Resolvers"
    }), "\n", createVNode(_components.p, {
      children: ["On the ", createVNode(_components.a, {
        href: "/guides/prologue/communication",
        children: "How Network Communication Works"
      }), " page, I suggested changing your DNS resolver on your device, but I also suggested (as well as on the ", createVNode(_components.a, {
        href: "/guides/most-important/mobile-apps",
        children: "Securing Mobile: Replacement Apps"
      }), " and ", createVNode(_components.a, {
        href: "/guides/most-important/browser",
        children: "Securing Your Browser"
      }), " pages) only doing so if you don\u2019t plan to use a VPN on your device. This is because ", createVNode(_components.strong, {
        children: "using a different DNS resolver can cause DNS leaks."
      }), " To put it simply, a DNS leak is when your DNS requests are ", createVNode(_components.a, {
        href: "https://en.wikipedia.org/wiki/DNS_leak",
        children: "exposed"
      }), ". Using the same DNS provided by your VPN provider dramatically reduces the likelihood of this happening, while in my experience using an alternate DNS with a VPN dramatically increases the likelihood. Depending your threat model, the consequences of a DNS leak could range from \u201Cvirtually meaningless\u201D to \u201Clife threatening.\u201D To avoid DNS leaks, I suggest you avoid manually changing your DNS resolver and instead use the DNS resolver provided by your VPN provider. You should only change your DNS resolver if you do not plan to use a VPN."]
    }), "\n", createVNode(_components.h2, {
      id: "tips--tricks",
      children: "Tips & Tricks"
    }), "\n", createVNode(_components.p, {
      children: ["I recommend using a VPN on all devices whenever possible. ", createVNode(_components.strong, {
        children: "For mobile devices, this will not hide your real location from your carrier."
      }), " It will, however, fool your browser and some apps, and it allows for a secure, encrypted connection - even from your carrier - at all times."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Please note that a VPN is not anonymous."
      }), " Many companies will advertise that using a VPN will make you invisible to various potential snoops, but VPN protections can be defeated in a variety of ways and do not protect against other advanced tracking features like cookies and browser fingerprinting. VPNs do exactly two things: they change your IP address and they create an encrypted tunnel. They will not block trackers or malware (though some providers employ DNS-based blocking to mitigate some - but not all - of these risks), they will not make you anonymous, and they will not speed up your connection. In some cases they can help with unblocking content that is restricted based on your location because of the changed IP address, but true anonymity is difficult and complicated to achieve online depending on your activites and goals. Please see my notes about the ", createVNode(_components.a, {
        href: "/guides/most-important/browser#tor-browser",
        children: "Tor Browser"
      }), " for more information on this."]
    })]
  });
}
function MDXContent$p(props = {}) {
  return createVNode(MDXLayout$p, {
    ...props,
    children: createVNode(_createMdxContent$p, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$p, "astro:jsx");
__astro_tag_component__(MDXContent$p, "astro:jsx");
const url$p = "/en/guides/less-important/vpns";
const file$p = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/less-important/vpns.mdx";
function rawContent$p() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$p() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$p = (props = {}) => MDXContent$p({
											...props,
											components: { Fragment, ...props.components },
										});
Content$p[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$p.layout);

const _page43 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$p,
  _internal: _internal$p,
  compiledContent: compiledContent$p,
  default: Content$p,
  file: file$p,
  frontmatter: frontmatter$p,
  getHeadings: getHeadings$p,
  rawContent: rawContent$p,
  url: url$p
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$o = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$o;
  content.file = file$o;
  content.url = url$o;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$o,
    url: url$o,
    content,
    frontmatter: content,
    headings: getHeadings$o(),
    "server:root": true,
    children
  });
};
const frontmatter$o = {
  "layout": "@layouts/guides.astro",
  "title": "Cybersecurity: The Internet of Things",
  "topic": "Internet of Things (aka Smart Devices) Privacy & Security",
  "weight": 7,
  "draft": false
};
const _internal$o = {
  injectedFrontmatter: {}
};
function getHeadings$o() {
  return [{
    "depth": 1,
    "slug": "cybersecurity-the-internet-of-things",
    "text": "Cybersecurity: The Internet of Things"
  }, {
    "depth": 2,
    "slug": "avoidance",
    "text": "Avoidance"
  }, {
    "depth": 2,
    "slug": "if-you-must",
    "text": "If You Must"
  }];
}
function _createMdxContent$o(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    h2: "h2",
    strong: "strong",
    a: "a",
    ul: "ul",
    li: "li"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "cybersecurity-the-internet-of-things",
      children: "Cybersecurity: The Internet of Things"
    }), "\n", createVNode(_components.p, {
      children: "If you\u2019re reading this, you may have some kind of smart device in your possession. Maybe it\u2019s a smart TV or an Alexa or a Nest Thermostat. Once upon a time, I would\u2019ve said that you should simply avoid these devices, however I think that we\u2019re moving into an age where that advice is antiquated. It\u2019s becoming harder and harder to escape the \u201CInternet of Things,\u201D so this section will provide some overall advice on basic privacy and security for IoT devices."
    }), "\n", createVNode(_components.h2, {
      id: "avoidance",
      children: "Avoidance"
    }), "\n", createVNode(_components.p, {
      children: ["Having said that, I still encourage everyone to pass on these devices if you can. None of us really ", createVNode(_components.strong, {
        children: "needs"
      }), " any of the modern \u201Ccreature comforts\u201D to survive, so I\u2019m not going to be the curmudgeonly old man decrying kids these days and their newfangled gadgets, but it is important that we realize that each one of these devices we bring into our lives puts us at risk in privacy and security. The smart TV you purchase not only reports invasive ", createVNode(_components.a, {
        href: "https://www.theverge.com/2019/10/11/20908128/smart-tv-surveillence-data-collection-home-roku-amazon-fire-princeton-study",
        children: "network information"
      }), ", but these devices also offer hackers a way into your home with things like lack of updates and default passwords. Believe it or not, you can use ", createVNode(_components.a, {
        href: "https://www.trendmicro.com/vinfo/in/security/news/cybercrime-and-digital-threats/researchers-use-smart-light-bulbs-to-infiltrate-networks",
        children: "a light bulb"
      }), " to access all the other devices on the network."]
    }), "\n", createVNode(_components.p, {
      children: ["Is it worth the risk? Do you really need to know the second a package arrives at your doorstep? (I argue that you should be using a ", createVNode(_components.a, {
        href: "/guides/less-important/disinformation",
        children: "PO Box"
      }), " anyways). Do you really need a fridge that tells you the milk has gone bad? These answers vary from person to person. I can live just fine without TV, so a smart TV is definitely something I don\u2019t need. Someone else may be a film buff and may find a lot of value in a high-quality TV that can stream from dozens of services easily. There are no wrong answers here, but I do encourage you to first ask yourself if the value a smart device brings you is worth the privacy invasion and security risk that comes with it."]
    }), "\n", createVNode(_components.h2, {
      id: "if-you-must",
      children: "If You Must"
    }), "\n", createVNode(_components.p, {
      children: "If you decide that a smart device is for you there\u2019s several key pieces of conventional wisdom that will help to dramatically increase your privacy and security while using said devices."
    }), "\n", createVNode($$Highlighting, {
      children: createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: "Make sure to change all default passwords and login information. Most devices come with a default username and password that can be discovered for free online by looking up the manual. Criminals can use this information to access the administrator privileges of those devices and abuse the device or access the rest of your network."
        }), "\n", createVNode(_components.li, {
          children: "Go through every setting on your device and make sure that you have disabled all settings that share data and analytics."
        }), "\n", createVNode(_components.li, {
          children: "Make sure to do your research and buy devices that get updated by the manufacturer regularly. Set your devices are to auto-update if the option exists. If there is no auto-update option, set a reminder to periodically check for updates and install them when they become available."
        }), "\n", createVNode(_components.li, {
          children: "Buy a router that supports \u201CVLANs,\u201D which are virtual segmented networks. Putting two devices on separate VLANs makes the devices act and think as if they are in completely separate networks. If one gets compromised the other is safe. Ideally you\u2019ll want to have all your IoT devices on one VLAN, then all your network devices (phones, laptops, etc) on another. IoT devices requiring network connectivity (such as smart TVs) can still be given network access."
        }), "\n", createVNode(_components.li, {
          children: "Make sure to couple all this advice with other advice on this site, such using a forwarding email to set up your accounts and using strong passwords."
        }), "\n"]
      })
    })]
  });
}
function MDXContent$o(props = {}) {
  return createVNode(MDXLayout$o, {
    ...props,
    children: createVNode(_createMdxContent$o, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$o, "astro:jsx");
__astro_tag_component__(MDXContent$o, "astro:jsx");
const url$o = "/en/guides/less-important/iot";
const file$o = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/less-important/iot.mdx";
function rawContent$o() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$o() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$o = (props = {}) => MDXContent$o({
											...props,
											components: { Fragment, ...props.components },
										});
Content$o[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$o.layout);

const _page44 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$o,
  _internal: _internal$o,
  compiledContent: compiledContent$o,
  default: Content$o,
  file: file$o,
  frontmatter: frontmatter$o,
  getHeadings: getHeadings$o,
  rawContent: rawContent$o,
  url: url$o
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$n = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$n;
  content.file = file$n;
  content.url = url$n;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$n,
    url: url$n,
    content,
    frontmatter: content,
    headings: getHeadings$n(),
    "server:root": true,
    children
  });
};
const frontmatter$n = {
  "layout": "@layouts/guides.astro",
  "title": "Introduction",
  "section_title": "Most Important",
  "section_weight": 75,
  "weight": 1,
  "draft": false
};
const _internal$n = {
  injectedFrontmatter: {}
};
function getHeadings$n() {
  return [{
    "depth": 1,
    "slug": "most-important-section-introduction",
    "text": "Most Important: Section Introduction"
  }];
}
function _createMdxContent$n(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "most-important-section-introduction",
      children: "Most Important: Section Introduction"
    }), "\n", createVNode(_components.p, {
      children: ["As the name implies, ", createVNode(_components.strong, {
        children: "this section is full of techniques and services that apply to everyone everywhere"
      }), " (generally speaking). This section is related to issues like cyber security, identity theft, and mobile devices. Doing these few techniques will dramatically improve your security in today\u2019s increasingly digital landscape. This section covers the following:"]
    }), "\n", createVNode($$GuidesList, {}), "\n", createVNode(_components.p, {
      children: ["While there is a lot to this section, it is critical information that will make you harder to hack than the average person, which will deter would-be criminals and likely make them give up in search of easier prey. ", createVNode(_components.strong, {
        children: "If you only read one section of this site, I recommend you make it this one."
      }), " All of these techniques are free and easy, and once you adjust to the new settings/apps/etc you will notice little or no change in your day-to-day life."]
    })]
  });
}
function MDXContent$n(props = {}) {
  return createVNode(MDXLayout$n, {
    ...props,
    children: createVNode(_createMdxContent$n, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$n, "astro:jsx");
__astro_tag_component__(MDXContent$n, "astro:jsx");
const url$n = "/en/guides/most-important";
const file$n = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/most-important/index.mdx";
function rawContent$n() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$n() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$n = (props = {}) => MDXContent$n({
											...props,
											components: { Fragment, ...props.components },
										});
Content$n[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$n.layout);

const _page45 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$n,
  _internal: _internal$n,
  compiledContent: compiledContent$n,
  default: Content$n,
  file: file$n,
  frontmatter: frontmatter$n,
  getHeadings: getHeadings$n,
  rawContent: rawContent$n,
  url: url$n
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$m = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$m;
  content.file = file$m;
  content.url = url$m;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$m,
    url: url$m,
    content,
    frontmatter: content,
    headings: getHeadings$m(),
    "server:root": true,
    children
  });
};
const frontmatter$m = {
  "layout": "@layouts/guides.astro",
  "title": "Securing Mobile: Settings",
  "topic": "Recommended Mobile Settings",
  "weight": 8,
  "draft": false
};
const _internal$m = {
  injectedFrontmatter: {}
};
function getHeadings$m() {
  return [{
    "depth": 1,
    "slug": "securing-mobile-settings",
    "text": "Securing Mobile: Settings"
  }, {
    "depth": 2,
    "slug": "ios-17",
    "text": "iOS 17"
  }, {
    "depth": 2,
    "slug": "android-14",
    "text": "Android 14"
  }];
}
function _createMdxContent$m(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    a: "a",
    h2: "h2",
    ul: "ul",
    li: "li",
    em: "em",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "securing-mobile-settings",
      children: "Securing Mobile: Settings"
    }), "\n", createVNode(_components.p, {
      children: ["See my criteria for this page ", createVNode(_components.a, {
        href: "https://gitlab.com/thenewoil/website/-/wikis/Mobile-&-Destkop-Settings-and-Apps-Criteria",
        children: "here"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "ios-17",
      children: "iOS 17"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Apple ID > Sign-In & Security > Two-Factor Authentication: On (Security Keys recommended if you plan to use iCloud or other Apple products tied to your Apple account)"
      }), "\n", createVNode(_components.li, {
        children: ["Apple ID > iCloud: Disable everything (", createVNode(_components.em, {
          children: "Note:"
        }), " Alternately, if you decide to use iCloud, be sure to enable Advanced Data Protection in this section. This will ", createVNode(_components.a, {
          href: "/guides/moderately-important/encryption",
          children: "end-to-end encrypt"
        }), " most of your data, but not all of it. See ", createVNode(_components.a, {
          href: "https://support.apple.com/en-us/HT202303",
          children: "here"
        }), " to see what\u2019s not protected.)"]
      }), "\n", createVNode(_components.li, {
        children: "Apple ID > Media & Purchases > View Account > Personalized Recommendations: Off"
      }), "\n", createVNode(_components.li, {
        children: ["Apple ID > Find My: Disable everything ", createVNode("sup", {
          children: "(1)"
        })]
      }), "\n", createVNode(_components.li, {
        children: "Wi-Fi > Edit (top right corner) > Remove networks you no longer regularly connect to"
      }), "\n", createVNode(_components.li, {
        children: "Wi-Fi > [Your network] > Ensure \u201CPrivate Wi-Fi Address\u201D is enabled"
      }), "\n", createVNode(_components.li, {
        children: "Wi-Fi > [Your network] > Ensure \u201CLimit IP Address Tracking\u201D is enabled"
      }), "\n", createVNode(_components.li, {
        children: "Wi-Fi > Wi-Fi should be disabled when you are not actively connected to a network."
      }), "\n", createVNode(_components.li, {
        children: "Wi-Fi > Auto-Join Hotspot: Never"
      }), "\n", createVNode(_components.li, {
        children: "Bluetooth: Off unless needed."
      }), "\n", createVNode(_components.li, {
        children: ["Cellular > SIM PIN > Create a custom ", createVNode(_components.a, {
          href: "https://support.apple.com/en-us/HT201529",
          children: "PIN"
        })]
      }), "\n", createVNode(_components.li, {
        children: "Cellular: Disable Cellular Data for any apps you don\u2019t need 24/7 access to."
      }), "\n", createVNode(_components.li, {
        children: "Cellular: Wi-Fi Assist: Off"
      }), "\n", createVNode(_components.li, {
        children: "Notifications > Show Previews: Never"
      }), "\n", createVNode(_components.li, {
        children: "Notifications > Screen Sharing: Notifications Off"
      }), "\n", createVNode(_components.li, {
        children: "Notifications > Siri Suggestions > Allow Notifications: Off"
      }), "\n", createVNode(_components.li, {
        children: "General > Software Update > Automatic Updates: All on"
      }), "\n", createVNode(_components.li, {
        children: "General > AirDrop > Receiving Off (Adjust only when using it, otherwise leave it off)"
      }), "\n", createVNode(_components.li, {
        children: "General > AirDrop > Bringing Devices Together: Off"
      }), "\n", createVNode(_components.li, {
        children: "General > AirPlay & Handoff > Automatically AirPlay to TVs: Never"
      }), "\n", createVNode(_components.li, {
        children: "General > iPhone Storage > \u201CRecently Delted\u201D Album: Enable"
      }), "\n", createVNode(_components.li, {
        children: "General > Keyboards > Enable Dictation: Off"
      }), "\n", createVNode(_components.li, {
        children: "Display & Brightness > Auto-Lock > the shortest option you can reasonably put up with. Do not set it to leave the screen turned on."
      }), "\n", createVNode(_components.li, {
        children: "Wallpaper: Set your lock screen to something generic and non-personal (no family photos, etc)"
      }), "\n", createVNode(_components.li, {
        children: "Siri & Search: Disable everything completely"
      }), "\n", createVNode(_components.li, {
        children: "Touch ID & Passcode > Turn Passcode On: Try to set a password if possible, otherwise use a six-digit PIN. A fingerprint is also acceptable if your device allows it (coupled with a strong password or PIN). Face ID should be avoided."
      }), "\n", createVNode(_components.li, {
        children: "Touch ID & Passcode > Require Passcode: Immediately"
      }), "\n", createVNode(_components.li, {
        children: "Touch ID & Passcode > Allow Access When Locked: the fewer the better"
      }), "\n", createVNode(_components.li, {
        children: "Touch ID & Passcode > Erase Data: Enabled (Beware of this setting, make sure you understand it)"
      }), "\n", createVNode(_components.li, {
        children: "Exposure Notifications: Using these is discouraged unless required by law, but it is ultimately up to you."
      }), "\n", createVNode(_components.li, {
        children: "Privacy & Security > Location Services: Disable for everything except navigation apps, and set those to \u201CWhile Using\u201D"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & Security > Location Services > System Services: Disable all (this will not cause any issues with Emergency Services being able to locate you)"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & Security > Tracking > Allow Apps to Request to Track: Off"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & Security: Review all the other app settings and make sure apps only have access to the settings they actually need. Otherwise, disable them. Disable as many as you can without breaking the app functionality."
      }), "\n", createVNode(_components.li, {
        children: "Privacy & Security > Safety Check: This is a good tool if you\u2019re not using a brand-new Apple ID. It will show you any files you are sharing, any other devices you are logged into, etc and allow you to remotely disable them."
      }), "\n", createVNode(_components.li, {
        children: "Privacy & Security > Analytics & Improvements: Disable everything"
      }), "\n", createVNode(_components.li, {
        children: "Privacy & Security > Apple Advertising > Personalized Ads: Off"
      }), "\n", createVNode(_components.li, {
        children: ["Privacy & Security > Lockdown Mode: On (This will ", createVNode(_components.a, {
          href: "https://support.apple.com/en-us/HT212650",
          children: "disable"
        }), " a significant number of features, however if you are able to live without them, it will help protect other users who need this feature from being ", createVNode(_components.a, {
          href: "https://www.techspot.com/news/95767-apple-upcoming-lockdown-mode-make-devices-easier-fingerprint.html",
          children: "easily identified"
        }), ".)"]
      }), "\n", createVNode(_components.li, {
        children: "App Store > App Updates: On"
      }), "\n", createVNode(_components.li, {
        children: "App Store > Personalized Recommendations: Clear App Usage Data"
      }), "\n", createVNode(_components.li, {
        children: ["Passwords: Clear this section out and turn everything off. Use a ", createVNode(_components.a, {
          href: "/guides/most-important/passwords",
          children: "password manager"
        }), " instead."]
      }), "\n", createVNode(_components.li, {
        children: ["Mail: Use an ", createVNode(_components.a, {
          href: "/guides/moderately-important/email",
          children: "encrypted email provider"
        }), " instead"]
      }), "\n", createVNode(_components.li, {
        children: ["Phone > Notifications: Off (if you plan to use ", createVNode(_components.a, {
          href: "/guides/less-important/voip",
          children: "Voice-over-IP"
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: "Phone > Silence unknown callers: On (This is, like everything, user discretion, but for most people this will dramatically reduce the number of spam calls. Be sure to enter any important phone numbers such as a child\u2019s school or coworkers so you still get their calls.)"
      }), "\n", createVNode(_components.li, {
        children: ["Messages > Notifications: Off (if you plan to use ", createVNode(_components.a, {
          href: "/guides/less-important/voip",
          children: "Voice-over-IP"
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: "Messages > Share Name and Photo: Off"
      }), "\n", createVNode(_components.li, {
        children: "Messages > Keep Messages: 30 Days"
      }), "\n", createVNode(_components.li, {
        children: "Messages > Filter Unknown Senders: Enabled"
      }), "\n", createVNode(_components.li, {
        children: ["Facetime: Off (if you plan to use ", createVNode(_components.a, {
          href: "/guides/less-important/voip",
          children: "Voice-over-IP"
        }), ")"]
      }), "\n", createVNode(_components.li, {
        children: ["Safari: I recommend disabling Safari and using a different ", createVNode(_components.a, {
          href: "/guides/most-important/mobile-apps",
          children: "browser"
        }), ". However, if you wish to use Safari, you can harden it using ", createVNode(_components.a, {
          href: "https://www.privacyguides.org/mobile-browsers/#safari",
          children: "this guide"
        }), " from Privacy Guides."]
      }), "\n", createVNode(_components.li, {
        children: "Translate: On-Device Mode: On"
      }), "\n", createVNode(_components.li, {
        children: "Health > Medical ID: I encourage you to set this up in case of emergency. Saving a life should always be prioritized over privacy."
      }), "\n", createVNode(_components.li, {
        children: "Photos > iCloud Photos: Off (unless you use iCloud)"
      }), "\n", createVNode(_components.li, {
        children: "Podcasts: Reset Identifier"
      }), "\n", createVNode(_components.li, {
        children: "Game Center: Disable"
      }), "\n", createVNode(_components.li, {
        children: "Now scroll back up to Screen Time > Content & Privacy Restrictions: Enable"
      }), "\n", createVNode(_components.li, {
        children: "Now scroll back up to Screen Time > Content & Privacy Restrictions > Allowed Apps: Disable everything you do not intend to use."
      }), "\n", createVNode(_components.li, {
        children: "Screen Time > Content & Privacy Restrictions > Privacy & Allowed Changes: Set all to \u201CDon\u2019t Allow.\u201D This will prevent changes from being made on your behalf next time you update."
      }), "\n", createVNode(_components.li, {
        children: "Any settings not covered are personal preference and are unlikely to cause any privacy or security issues no matter how you set them."
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("sup", {
        children: "1"
      }), ": Some people prefer to leave \u201CFind My iPhone\u201D enabled as it allows\nthem to remotely wipe the device if it gets lost. However, due to enabling the\n\u201CErase Data\u201D setting, I don\u2019t believe this is necessary. If it makes you feel\nbetter or if you have a specific use case for it, you can leave this feature on, but \u201CShare My Location\u201D should still be\ndisabled (unless you use need to use it often) as this feature will report your\nlocation back to Apple regularly.*"]
    }), "\n", createVNode(_components.h2, {
      id: "android-14",
      children: "Android 14"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: createVNode(_components.em, {
          children: "NOTE:"
        })
      }), " ", createVNode(_components.em, {
        children: "Due to the nature of Android devices, the exact layout of the menu may vary from device to device."
      })]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Network & Internet: Internet: Carrier settings: Allow 2G: Disabled"
      }), "\n", createVNode(_components.li, {
        children: "Network & Internet: Internet: Carrier settings: Require encryption: Enabled"
      }), "\n", createVNode(_components.li, {
        children: "Network & Internet: Internet: Saved Networks: Remove old networks you no longer use"
      }), "\n", createVNode(_components.li, {
        children: ["Network & internet: Private DNS: Private DNS provider hostname: Automatic ", createVNode(_components.strong, {
          children: "or"
        }), " Any provider from ", createVNode(_components.a, {
          href: "https://www.privacyguides.org/dns/",
          children: "this list"
        }), " (You can ignore this if you plan to use a ", createVNode(_components.a, {
          href: "/guides/less-important/vpns",
          children: "VPN"
        }), " on your device)"]
      }), "\n", createVNode(_components.li, {
        children: "Connected devices: Connection preferences: Bluetooth: Disabled when not in use"
      }), "\n", createVNode(_components.li, {
        children: "Connected devices: Connection preferences: Printing: Default Print Service: Use Print Service: Disabled when not in use"
      }), "\n", createVNode(_components.li, {
        children: "Connected devices: Connection preferences: Nearby Share: Off when not in use"
      }), "\n", createVNode(_components.li, {
        children: "Apps: All apps: Uninstall or disable any apps you don\u2019t use"
      }), "\n", createVNode(_components.li, {
        children: ["Apps: Default apps: See ", createVNode(_components.a, {
          href: "/guides/most-important/mobile-apps",
          children: "Securing Mobile: Replacement Apps"
        })]
      }), "\n", createVNode(_components.li, {
        children: "Notifications: Notification history: Disabled"
      }), "\n", createVNode(_components.li, {
        children: "Notifications: Device & app notifications: Review settings"
      }), "\n", createVNode(_components.li, {
        children: "Notifications: Notifications on lock screen: \u201CDon\u2019t show any notifications\u201D"
      }), "\n", createVNode(_components.li, {
        children: "Notifications: Enhanced notifications: Disabled"
      }), "\n", createVNode(_components.li, {
        children: "Display: Lock screen: Privacy: Don\u2019t show notifications at all"
      }), "\n", createVNode(_components.li, {
        children: "Display: Screen timeout: Shortest duration you are comfortable with"
      }), "\n", createVNode(_components.li, {
        children: "Wallpaper & style: Set your lock screen to something generic and non-personal (no family photos, etc)"
      }), "\n", createVNode(_components.li, {
        children: "Accessibility: Text-to-speech output: Preferred engine settings: Anonymous usage reports: Off"
      }), "\n", createVNode(_components.li, {
        children: ["Security & Privacy: Device Unlock: Screen lock: ", createVNode(_components.a, {
          href: "/guides/most-important/passwords",
          children: "Strong password"
        }), " preferred, followed by PIN, then Pattern."]
      }), "\n", createVNode(_components.li, {
        children: "Security & Privacy: Device Unlock: Screen lock settings: Enhanced PIN privacy: Enabled"
      }), "\n", createVNode(_components.li, {
        children: "Security & Privacy: Device Unlock: Screen lock settings: Lock after screen timeout: Shortest duration you are comfortable with"
      }), "\n", createVNode(_components.li, {
        children: "Security & Privacy: Device Unlock: Face & Fingerptint Unlock: Acceptable coupled with a strong password or PIN"
      }), "\n", createVNode(_components.li, {
        children: "Security & Privacy: Privacy: Permission manager: Check each app for any unncessary permissions and revoke them."
      }), "\n", createVNode(_components.li, {
        children: "Security: More security & privacy: Usage & diagnostics: Disabled"
      }), "\n", createVNode(_components.li, {
        children: "Security: More security & privacy: Extend Unlock: Disabled"
      }), "\n", createVNode(_components.li, {
        children: "Security: More security & privacy: Device admin apps: Find my device: Enabled (only if you enable \u201CFind My Device\u201D in the \u201CSecurty & Privacy\u201D settings)"
      }), "\n", createVNode(_components.li, {
        children: "Security: More security settings: SIM lock: Enable (contact your provider for the SIM PIN)"
      }), "\n", createVNode(_components.li, {
        children: "Security: More security settings: Encryption & credentials: Clear credentials (this may be a good idea if this is not a new phone)"
      }), "\n", createVNode(_components.li, {
        children: "Location: Disable if you don\u2019t use it, otherwise review apps and disable permissions accordingly"
      }), "\n", createVNode(_components.li, {
        children: "Location: Location services: Disable all (emergency services will still be able to pull the information regardless if you call them)"
      }), "\n", createVNode(_components.li, {
        children: ["Passwords & accounts: Empty all saved passwords, use a ", createVNode(_components.a, {
          href: "/guides/most-important/passwords",
          children: "password manager"
        }), " instead"]
      }), "\n", createVNode(_components.li, {
        children: "Google: Disable everything (exception: enable \u201COpt out of Ads Personalization\u201D)"
      }), "\n", createVNode(_components.li, {
        children: "Any settings not covered are personal preference and are unlikely to cause any privacy or security issues no matter how you set them."
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: createVNode(_components.em, {
            children: "Note:"
          })
        }), " ", createVNode(_components.em, {
          children: ["it is possible to use an Android device without ever signing into a Google account for added privacy. This must be done during device setup. You can use ", createVNode(_components.a, {
            href: "https://f-droid.org/",
            children: "F-Droid"
          }), " (or another client such as Neo Store or F-Droid Basic) to procure many ", createVNode(_components.a, {
            href: "/guides/prologue/open-source",
            children: "open source"
          }), " apps, and ", createVNode(_components.a, {
            href: "https://auroraoss.com",
            children: "Aurora Store"
          }), " as a proxy for the Play Store for anything else you can\u2019t get on Neo or F-Droid. Note that with Aurora you will not be able to use Google to process app-related payments such as subscriptions or one-time payments to download the app. In these cases, it should be possible to sign into the Play Store exclusively without signing into Google on the entire device."]
        })]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: createVNode(_components.em, {
            children: "Note:"
          })
        }), " ", createVNode(_components.em, {
          children: ["Android in particular is capable of a number of powerful, privacy- and security-enhancing strategies that iOS is not, such as the aforementioned \u201Cno account required,\u201D alternative app stores, sideloading, user profiles, and much more. Some of these are advanced techniques, but not all, though many of them fall outside the scope of this site. For those using or considering an Android device, I strongly encourage you to check out Privacy Guide\u2019s ", createVNode(_components.a, {
            href: "https://www.privacyguides.org/android/",
            children: "Android page"
          }), " to get an idea of some of the things your phone is capable of."]
        })]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "By enabling all of these settings, you are significantly reducing the amount of tracking and data collection these devices perform, but keep in mind that you are not completely eliminating it."
    })]
  });
}
function MDXContent$m(props = {}) {
  return createVNode(MDXLayout$m, {
    ...props,
    children: createVNode(_createMdxContent$m, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$m, "astro:jsx");
__astro_tag_component__(MDXContent$m, "astro:jsx");
const url$m = "/en/guides/most-important/mobile-settings";
const file$m = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/most-important/mobile-settings.mdx";
function rawContent$m() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$m() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$m = (props = {}) => MDXContent$m({
											...props,
											components: { Fragment, ...props.components },
										});
Content$m[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$m.layout);

const _page46 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$m,
  _internal: _internal$m,
  compiledContent: compiledContent$m,
  default: Content$m,
  file: file$m,
  frontmatter: frontmatter$m,
  getHeadings: getHeadings$m,
  rawContent: rawContent$m,
  url: url$m
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$l = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$l;
  content.file = file$l;
  content.url = url$l;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$l,
    url: url$l,
    content,
    frontmatter: content,
    headings: getHeadings$l(),
    "server:root": true,
    children
  });
};
const frontmatter$l = {
  "layout": "@layouts/guides.astro",
  "title": "Understanding Data Breaches",
  "topic": "How Data Breaches Really Work",
  "weight": 2,
  "draft": false
};
const _internal$l = {
  injectedFrontmatter: {}
};
function getHeadings$l() {
  return [{
    "depth": 1,
    "slug": "understanding-data-breaches",
    "text": "Understanding Data Breaches"
  }, {
    "depth": 2,
    "slug": "how-password-cracking-works",
    "text": "How Password Cracking Works"
  }];
}
function _createMdxContent$l(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    h2: "h2",
    a: "a"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "understanding-data-breaches",
      children: "Understanding Data Breaches"
    }), "\n", createVNode(_components.p, {
      children: ["One of the most common misconceptions about data breaches is how they work. Most people think \u201D", createVNode(_components.strong, {
        children: "nobody has any reason to hack me."
      }), "\u201D While this may be true, rarely is a cybercriminal going to target a total stranger who might not even have anything worthwhile. The \u201CI\u2019m not a valuable enough target\u201D mentality betrays a fundamental misunderstanding of how today\u2019s digital hacking landscape works. ", createVNode(_components.strong, {
        children: "Here\u2019s how data breaches and modern hacking really work most of the time:"
      })]
    }), "\n", createVNode(_components.p, {
      children: ["If you\u2019re reading this, you likely have an account with a major service that has millions of users like Gmail, Amazon, eBay, or Facebook. Smart cybercriminals target these major companies. ", createVNode(_components.strong, {
        children: "These companies endure anywhere millions of attacks every day."
      }), " The defender needs to succeed every single time, but the attacker only needs to be successful once. Once the attacker is in, they steal everything they can before they get noticed and kicked out of the system: usernames, passwords, card numbers, IP addresses, anything the service logs and they can access."]
    }), "\n", createVNode(_components.p, {
      children: ["Typically, responsible companies encrypt the most sensitive information like passwords and card numbers but not things like username and IP address (which can reveal your exact physical location). This matters because step two is to sort through and decrypt whatever information the hacker has stolen. ", createVNode(_components.strong, {
        children: "Various programs exist - totally legal and for free - to help crack your password."
      }), " A given password can be cracked in less than one second depending on the complexity of it and the criminal\u2019s computer. This doesn\u2019t require a government-grade supercomputer, either. A decently-powerful computer capable of cracking dozens or hundreds of passwords in an hour can cost somewhere around $1000 and can be purchased off the shelf at your local electronics store."]
    }), "\n", createVNode(_components.h2, {
      id: "how-password-cracking-works",
      children: "How Password Cracking Works"
    }), "\n", createVNode(_components.p, {
      children: ["There\u2019s two main methods of guessing a password. The first is called a \u201D", createVNode(_components.strong, {
        children: "dictionary attack."
      }), "\u201D This when ", createVNode(_components.strong, {
        children: "the criminal loads a dictionary into the software and it checks your password against the dictionary, including common variations."
      }), " For example, \u201CP4ssw0rd\u201D is a common variation of \u201Cpassword,\u201D so the program will check for that. Various dictionaries are available for free, including song lyrics, famous names, quotes, and more. A hacker can even easily make their own dictionary tailored to you with information like names of family members, important dates, pets, sports teams, and more."]
    }), "\n", createVNode(_components.p, {
      children: ["The second method is called a \u201D", createVNode(_components.strong, {
        children: "brute force attack."
      }), "\u201D This is where the hacker specifies parameters (such as \u201Cupper and lower case letters\u201D and length) and the software guesses every possibility, starting with \u201Caaaaaa,\u201Cthen moving on to \u201Caaaaab,\u201D and so on. Passwords less than six characters, regardless of complexity, can be ", createVNode(_components.a, {
        href: "https://proton.me/blog/how-long-should-my-password-be/",
        children: "brute forced"
      }), " in less than a second."]
    })]
  });
}
function MDXContent$l(props = {}) {
  return createVNode(MDXLayout$l, {
    ...props,
    children: createVNode(_createMdxContent$l, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$l, "astro:jsx");
__astro_tag_component__(MDXContent$l, "astro:jsx");
const url$l = "/en/guides/most-important/data-breaches";
const file$l = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/most-important/data-breaches.mdx";
function rawContent$l() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$l() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$l = (props = {}) => MDXContent$l({
											...props,
											components: { Fragment, ...props.components },
										});
Content$l[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$l.layout);

const _page47 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$l,
  _internal: _internal$l,
  compiledContent: compiledContent$l,
  default: Content$l,
  file: file$l,
  frontmatter: frontmatter$l,
  getHeadings: getHeadings$l,
  rawContent: rawContent$l,
  url: url$l
}, Symbol.toStringTag, { value: 'Module' }));

const criterias$1 = [
	"Alternatives",
	"Reason"
];
const tools$1 = {
	"web browser": {
		name: "Web Browser",
		values: {
			Alternatives: [
				"Android: [Brave](https://play.google.com/store/apps/details?id=com.brave.browser&hl=en&gl=US) or [Mull](https://f-droid.org/packages/us.spotco.fennec_dos/).",
				"iOS: [SnowHaze](https://snowhaze.com/download) or [Brave](https://apps.apple.com/us/app/brave-private-browser/id1052879175)."
			],
			Reason: "While apps have mostly replaced the browser on mobile, some things are still done through the browser. While less revealing compared to other phone apps, your browser usage still reveals a lot of data about you and should be minimized."
		}
	},
	navigation: {
		name: "Navigation",
		values: {
			Alternatives: [
				"[Organic Maps](https://organicmaps.app/)",
				"[OsmAnd Maps](https://osmand.net/)"
			],
			Reason: "Google Maps, Apple Maps, and others record everywhere you go and add that location history to your profile. Using an alternate navigator won't stop your carrier from tracking your location, but it can help reduce the specific location data that is stored on you and who can collect it."
		}
	},
	calendar: {
		name: "Calendar",
		values: {
			Alternatives: [
				"[Nextcloud](https://nextcloud.com/)",
				"[ProtonCalendar](https://proton.me/calendar)",
				"[Tuta](https://tuta.com/calendar/)"
			],
			Reason: "Your calendar contains all your plans and locations: upcoming dates, shifts at work, events you plan to attend, and more. Using an encrypted calendar can help protect that information from Google, Apple or other third parties."
		}
	},
	"e-mail": {
		name: "E-Mail",
		values: {
			Alternatives: [
				"[Encrypted email provider of your choice](/guides/moderately-important/email)"
			],
			Reason: "Please see the \"[Encrypted email](/guides/moderately-important/email)\" page for more information on this subject."
		}
	},
	"text messenger": {
		name: "Text Messenger",
		values: {
			Alternatives: [
				"[Encrypted messaging provider of your choice](/guides/less-important/messaging)"
			],
			Reason: "Please see the \"[Encrypted Messaging](/guides/less-important/messaging)\" page for more information on this subject."
		}
	},
	"firewall & content blocker(none included by default)": {
		name: "Firewall & Content Blocker (None Included by Default)",
		values: {
			Alternatives: [
				"Adguard DNS ([Android](https://adguard.com/en/adguard-android/overview.html), [iOS](https://apps.apple.com/app/apple-store/id1047223162))",
				"Blokada ([Android](https://blokada.org/#download), [iOS](https://apps.apple.com/us/app/blokada/id1508341781)) *(No free version for iOS)*",
				"Lockdown ([iOS](https://apps.apple.com/us/app/lockdown-apps/id1469783711))",
				"NextDNS ([Android](https://play.google.com/store/apps/details?id=io.nextdns.NextDNS), [iOS](https://apps.apple.com/app/nextdns/id1463342498))"
			],
			Reason: [
				"Phone firewalls stop apps from contacting unnecessary servers. For example, many apps contact Facebook or Google when you launch them, giving those companies information about your device and app usage. Some of these firewalls may require settings adjustments for optimal performance and effectiveness.",
				"**Note:** You cannot use a VPN and Firewall/Content Blocker at the same time*. I recommend using a reputable [VPN provider](/guides/less-important/vpns) who offers their own DNS resolver that blocks known trackers, ads, and malware. You may also use a custom DNS resolver that also blocks ads and/or trackers instead of a VPN, but your traffic will remain exposed to varying degrees so I don't recommend this. See [this article](https://www.androidpolice.com/2020/03/26/make-android-use-dns-server-choice/) for instructions on how to change the DNS on Android, and [this article](https://gadgets.ndtv.com/mobiles/features/how-to-change-dns-server-on-iphone-ipad-or-ipod-touch-1671813) for instructions on how to change the DNS on iOS. See [Privacy Guides](https://privacyguides.org/providers/dns/) for a list of recommended DNS resolvers if you are unsure which one to use.",
				"*ProtonVPN does allow the use of both a VPN (set to IKEv2) and a Firewall/Content Blocker simultaneously, however this is known to cause DNS leaks. The risks of DNS leakage vary based on your [threat model](/guides/prologue/threatmodel), but I recommend using a VPN without a Firewall/content Blocker just to err on the side of caution."
			]
		}
	}
};
const data$3 = {
	criterias: criterias$1,
	tools: tools$1
};

const MDXLayout$k = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$k;
  content.file = file$k;
  content.url = url$k;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$k,
    url: url$k,
    content,
    frontmatter: content,
    headings: getHeadings$k(),
    "server:root": true,
    children
  });
};
const frontmatter$k = {
  "layout": "@layouts/guides.astro",
  "title": "Securing Mobile: Replacement Apps",
  "topic": "Recommended Mobile Apps",
  "weight": 9,
  "draft": false
};
const _internal$k = {
  injectedFrontmatter: {}
};
function getHeadings$k() {
  return [{
    "depth": 1,
    "slug": "securing-mobile-replacement-apps",
    "text": "Securing Mobile: Replacement Apps"
  }];
}
function _createMdxContent$k(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    a: "a",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "securing-mobile-replacement-apps",
      children: "Securing Mobile: Replacement Apps"
    }), "\n", createVNode(_components.p, {
      children: ["See my criteria for this page ", createVNode(_components.a, {
        href: "https://gitlab.com/thenewoil/website/-/wikis/Mobile-&-Destkop-Settings-and-Apps-Criteria",
        children: "here"
      }), "."]
    }), "\n", createVNode($$Criterias, {
      data: data$3,
      direction: "col"
    }), "\n", createVNode(_components.p, {
      children: ["I encourage you to remove any unused or infrequenly-used apps from your phone. Mobile apps are both invasive for privacy and a potential way entry point for malware and attackers so the fewer you have, the better. Additionally, ", createVNode(_components.strong, {
        children: "if your phone is lost or stolen, having sensitive apps like work email and banking can allow further abuse."
      })]
    })]
  });
}
function MDXContent$k(props = {}) {
  return createVNode(MDXLayout$k, {
    ...props,
    children: createVNode(_createMdxContent$k, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$k, "astro:jsx");
__astro_tag_component__(MDXContent$k, "astro:jsx");
const url$k = "/en/guides/most-important/mobile-apps";
const file$k = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/most-important/mobile-apps.mdx";
function rawContent$k() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$k() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$k = (props = {}) => MDXContent$k({
											...props,
											components: { Fragment, ...props.components },
										});
Content$k[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$k.layout);

const _page48 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$k,
  _internal: _internal$k,
  compiledContent: compiledContent$k,
  default: Content$k,
  file: file$k,
  frontmatter: frontmatter$k,
  getHeadings: getHeadings$k,
  rawContent: rawContent$k,
  url: url$k
}, Symbol.toStringTag, { value: 'Module' }));

const bitwarden = {
	name: "Bitwarden",
	logo: "/images/logos/bitwarden.png",
	logo_alt: "Bitwarden Logo",
	link: "https://bitwarden.com/",
	pros: [
		"[Audited](https://bitwarden.com/blog/post/bitwarden-network-security-assessment-2020/)",
		"Available on all operating systems",
		"Passkey support (web extension only to add new passkeys)"
	],
	cons: [
		"Cloud based"
	]
};
const keepass = {
	name: "KeePass",
	logo: "/images/logos/keepassxc.png",
	logo_alt: "KeePass Logo",
	link: "https://keepass.info/",
	pros: [
		"Some clients are audited",
		"Available on all operating systems",
		"Popular clients include [KeePass XC](https://keepassxc.org/), [KeePassDX (Android)](https://www.keepassdx.com/), and [Strongbox (iOS)](https://strongboxsafe.com/)"
	],
	cons: [
		"Not all clients are audited",
		"Not cloud based",
		"Extremely limited passkey support (beta feature in KeePassXC only)"
	]
};
const protonpass = {
	name: "Proton Pass",
	logo: "/images/logos/protonpass.png",
	logo_alt: "Proton Pass Logo",
	link: "https://proton.me/pass",
	pros: [
		"[Audited](https://proton.me/blog/pass-open-source-security-audit)",
		"Available on all all operating systems (browser extension only for Linux, Mac, and Windows)",
		"Comes with free calendar, cloud storage, email, and VPN as part of a Proton account"
	],
	cons: [
		"Cloud based",
		"Browser extension required for desktop access, no desktop app or web vault available",
		"Early product, missing some features that other password managers may already have (such as credit cards)",
		"No passkey support"
	]
};
const data$2 = {
	bitwarden: bitwarden,
	keepass: keepass,
	protonpass: protonpass
};

const MDXLayout$j = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$j;
  content.file = file$j;
  content.url = url$j;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$j,
    url: url$j,
    content,
    frontmatter: content,
    headings: getHeadings$j(),
    "server:root": true,
    children
  });
};
const frontmatter$j = {
  "layout": "@layouts/guides.astro",
  "title": "Data Breach Defense: Password Managers",
  "topic": "How to Make (and Remember) Good Passwords",
  "weight": 3,
  "draft": false
};
const _internal$j = {
  injectedFrontmatter: {}
};
function getHeadings$j() {
  return [{
    "depth": 1,
    "slug": "data-breach-defense-password-managers",
    "text": "Data Breach Defense: Password Managers"
  }, {
    "depth": 2,
    "slug": "what-is-a-password-manager",
    "text": "What is a Password Manager?"
  }, {
    "depth": 2,
    "slug": "why-do-i-need-a-password-manager",
    "text": "Why do I Need a Password Manager?"
  }, {
    "depth": 2,
    "slug": "what-should-i-look-for-in-a-password-manager",
    "text": "What Should I Look For in a Password Manager?"
  }, {
    "depth": 2,
    "slug": "avoid-the-following",
    "text": "Avoid The Following"
  }, {
    "depth": 2,
    "slug": "honorable-mention-1password",
    "text": "Honorable Mention: 1Password"
  }, {
    "depth": 2,
    "slug": "passkeys",
    "text": "Passkeys"
  }, {
    "depth": 3,
    "slug": "when-to-use-passkeys",
    "text": "When to use passkeys"
  }, {
    "depth": 3,
    "slug": "when-not-to-use-passkeys",
    "text": "When not to use passkeys"
  }, {
    "depth": 2,
    "slug": "storing-passwords--passkeys-in-the-browser--apple-keychain",
    "text": "Storing Passwords & Passkeys in the Browser & Apple Keychain"
  }, {
    "depth": 2,
    "slug": "getting-started",
    "text": "Getting Started"
  }, {
    "depth": 2,
    "slug": "tips--tricks",
    "text": "Tips & Tricks"
  }];
}
function _createMdxContent$j(props) {
  const _components = Object.assign({
    h1: "h1",
    h2: "h2",
    p: "p",
    strong: "strong",
    a: "a",
    ul: "ul",
    li: "li",
    em: "em",
    h3: "h3"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "data-breach-defense-password-managers",
      children: "Data Breach Defense: Password Managers"
    }), "\n", createVNode(_components.h2, {
      id: "what-is-a-password-manager",
      children: "What is a Password Manager?"
    }), "\n", createVNode(_components.p, {
      children: "A password manager is a program or service that allows you to record login information such as username, password, login link, and other data. Your password database is stored in an encrypted format. Additional security measures vary from service to service."
    }), "\n", createVNode(_components.h2, {
      id: "why-do-i-need-a-password-manager",
      children: "Why do I Need a Password Manager?"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "The single most important thing you can do to protect your accounts is to use strong, unique passwords that are not reused anywhere."
      }), " I discussed in the ", createVNode(_components.a, {
        href: "/guides/most-important/data-breaches",
        children: "Understanding Data Breaches"
      }), " section how encrypted passwords can be stolen from a service\u2019s database and then decrypted later. Using a strong, unique password will make your password practically impossible to decrypt, thereby keeping your accounts safe even in that situation. ", createVNode(_components.strong, {
        children: ["A ", createVNode(_components.a, {
          href: "https://protonmail.com/blog/how-long-should-my-password-be/",
          children: "strong password"
        }), " should consist of sixteen or more characters consisting of upper and lower case letters, numbers, and special characters, and should not be reused on any other accounts."]
      }), " (This last bit of advice is insurance: if a service was not encrypting - or poorly encrypting - your password, not-reusing passwords (and usernames) will prevent an attacker from being able to easily access all your other accounts. This is called ", createVNode(_components.a, {
        href: "https://owasp.org/www-community/attacks/Credential_stuffing",
        children: "credential stuffing"
      }), ".) Of course, this means that a good password is impossible to remember, so the solution is to use a password manager. By using a password manager, you only ever have to remember a single password: the master password to login."]
    }), "\n", createVNode(_components.h2, {
      id: "what-should-i-look-for-in-a-password-manager",
      children: "What Should I Look For in a Password Manager?"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "The most important thing is to look for a service that is \u201Czero knowledge,\u201C."
      }), " They may also use terms like \u201Czero access\u201D or \u201Cend-to-end encrypted.\u201D (Note: this is different from regular ", createVNode(_components.a, {
        href: "/guides/moderately-important/encryption",
        children: "encryption"
      }), ".) This means that no employee of the company can see your passwords and information. Remember: if they can see it, so can a criminal who gains access. ", createVNode(_components.strong, {
        children: "You should also consider whether or not cloud-based services are right for you."
      }), " Cloud-based services offer conveniences like synchronization between devices, but you also run the risk that a successful criminal will download your database and then have all the time in the world to find weaknesses in the encryption. Conversely, locally-stored databases are safer from a data breach but run the risk of getting deleted, lost, or corrupted if you don\u2019t keep reliable backups."]
    }), "\n", createVNode(_components.h2, {
      id: "avoid-the-following",
      children: "Avoid The Following"
    }), "\n", createVNode($$Highlighting, {
      variant: "warning",
      children: createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: "LastPass"
          }), " is a popular password manager, but they\u2019ve been riddled with security issues and questionable business decisions for years. This includes things like ", createVNode(_components.a, {
            href: "https://www.theverge.com/2021/2/16/22285531/lastpass-free-tier-mobile-computer-device-premium-family",
            children: "limiting free users"
          }), " to choose between only using their account on either mobile or desktop devices (not both) or - most notably - a ", createVNode(_components.a, {
            href: "https://www.forbes.com/sites/daveywinder/2023/03/03/why-you-should-stop-using-lastpass-after-new-hack-method-update/?sh=a6ff8a828fc9",
            children: "massive 2022 data breach"
          }), ", which they announced on December 23 (the Friday before Christmas, knowing that most people would be busy for the next few days and unlikley to see the disclosure) where they attempted to downplay the issue as a minor incident. It would later come to light that large swaths of users\u2019 vaults were unencrypted (such as the sign-in link for the website, allowing attackers to craft more convincing phishing emails), vaults had been stolen from the databases (meaning attackers would have endless time to attempt to crack them), user passwords were poorly encrypted (making them easier to crack), and the breach had all been a result of poor internal security practices. This was merely the latest and largest in a series of blunders made by the company, who has proven themselves inept and unethical in their treatment of customers and their data. Even if you don\u2019t go with one of the password managers I recommend here, I ", createVNode(_components.em, {
            children: "strongly urge"
          }), " you to avoid LastPass."]
        }), "\n"]
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "Listed in alphabetical order, not order of recommendation"
      })
    }), "\n", createVNode($$ProsAndCons, {
      data: data$2,
      headingLevel: 4
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: createVNode(_components.a, {
          href: "https://gitlab.com/thenewoil/website/-/wikis/Password-Manager-Criteria",
          children: "Click here to see my criteria for selecting these services"
        })
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: createVNode(_components.a, {
          href: "/charts/passwords",
          children: "Click here for a visual version of this chart"
        })
      })
    }), "\n", createVNode(_components.h2, {
      id: "honorable-mention-1password",
      children: "Honorable Mention: 1Password"
    }), "\n", createVNode("img", {
      src: "/images/logos/1password.png",
      alt: "1password logo",
      class: "float-left mx-6 w-24"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.a, {
        href: "https://1password.com/",
        children: "1Password"
      }), " does not qualify for a full endorsement on this\nsite because they do not have source-available clients. However 1Password\u2019s security\nis praised by experts, they have been audited, they have a long and positive track\nrecord, and they even support a variety of open source initiatives. 1Password would\nnot be my first recommendation for most users because other equally good, open source\nalternatives exist (such as the ones listed above), but if none of the recommended\nofferings appeal to you for any reason, 1Password is also a highly reputable option. 1Password has passkey support.\n(Note that 1Password does not offer a free tier.)"]
    }), "\n", createVNode(_components.h2, {
      id: "passkeys",
      children: "Passkeys"
    }), "\n", createVNode(_components.p, {
      children: ["As of mid-2023, we have seen a rapid release and adoption of a new technology called \u201Cpasskeys.\u201D I won\u2019t waste time here explaining how they work, but if you\u2019re interested there\u2019s an excellent write-up ", createVNode(_components.a, {
        href: "https://arstechnica.com/information-technology/2023/05/passwordless-google-accounts-are-easier-and-more-secure-than-passwords-heres-why/",
        children: "here"
      }), ". Whether or not you should use passkeys depends on several factors. For a more comprehensive explanation, I suggest checking out EFF\u2019s ", createVNode(_components.a, {
        href: "https://www.eff.org/deeplinks/2023/10/passkeys-and-privacy",
        children: "deep dive"
      }), " into passkeys, but here\u2019s the basic summary:"]
    }), "\n", createVNode(_components.h3, {
      id: "when-to-use-passkeys",
      children: ["When ", createVNode(_components.em, {
        children: "to"
      }), " use passkeys"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["If you\u2019re not currently using a password manager", createVNode("sup", {
          children: "(1)"
        })]
      }), "\n", createVNode(_components.li, {
        children: "If you\u2019re currently re-using passwords (regardless if they\u2019re good or not)"
      }), "\n", createVNode(_components.li, {
        children: ["If you\u2019re not using a ", createVNode(_components.a, {
          href: "/guides/most-important/mfa#honorable-mention-security-tokens",
          children: "security token"
        }), " for multifactor authentication"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "when-not-to-use-passkeys",
      children: ["When ", createVNode(_components.em, {
        children: "not"
      }), " to use passkeys"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["If you\u2019re currently using a ", createVNode(_components.a, {
          href: "/guides/most-important/mfa#honorable-mention-security-tokens",
          children: "security token"
        }), " for multifactor authentication"]
      }), "\n", createVNode(_components.li, {
        children: ["If you have a high ", createVNode(_components.a, {
          href: "/guides/prologue/threat-model",
          children: "threat model"
        }), " where even a small mistake could be catastrophic"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "1: You will still need to pick and use a password manager to take advantage of passkeys (see the next section on why)"
      })
    }), "\n", createVNode(_components.p, {
      children: "Be aware that passkeys are still an early technology and it may be dangerous to rely on them entirely without a backup solution (in other words, at this time I don\u2019t recommend disabling your passwords entirely)."
    }), "\n", createVNode(_components.h2, {
      id: "storing-passwords--passkeys-in-the-browser--apple-keychain",
      children: "Storing Passwords & Passkeys in the Browser & Apple Keychain"
    }), "\n", createVNode(_components.p, {
      children: ["It\u2019s common for people to store passwords (and now passkeys) within the browser when prompted or to use Apple\u2019s built-in Keychain feature (or Android\u2019s built-in passkey support). ", createVNode(_components.strong, {
        children: "I generally don\u2019t recommend using the browser\u2019s built-in password manager."
      }), " For the browser specifically, malware exists that is capable of stealing browser data including history, passwords, credit cards, addresses, and authentication tokens (meaning the attacker simply reloads the page and is now already logged in as you). I also find using a third-party password manager to be a better overall experience, with better apps, easier use across devices, no penalty or difficulty should you decide to switch devices or browsers, and an easier time exporting and importing passwords. I also believe that companies who\u2019s sole or primary mission is to create a good password manager will probably do a better job in regards to security and usability compared to a company who\u2019s simply adding it on to their main product as an afterthought. However, if you still would prefer to use the built-in browser password manager,  recommend at least locking it with a secure passphrase when not in use. ", createVNode(_components.strong, {
        children: "Regarding Apple Keychain and Android passkeys, I feel the same way as I do about the browser password manager"
      }), ": while Apple Keychain and Google passkeys are - to my knowledge - secure, I prefer to use a third-party password manager who won\u2019t lock you into a single ecosystem or operating system. (Note: at this time, 1Password and Bitwarden cannot export passkeys but ", createVNode(_components.a, {
        href: "https://www.reddit.com/r/1Password/comments/16to6x7/comment/k3g7b1m/",
        children: "both"
      }), " ", createVNode(_components.a, {
        href: "https://community.bitwarden.com/t/passkey-portability/59177/8",
        children: "organizations"
      }), " have expressed an interest in adding this feature in the future.) I share the same concerns about focus on security, but to a lesser extent given Apple\u2019s and Google\u2019s excellent security track records."]
    }), "\n", createVNode(_components.h2, {
      id: "getting-started",
      children: "Getting Started"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "I suggest you stop what you\u2019re doing immediately and adopt secure passwords for your most critical accounts."
      }), " Bank, email, and other accounts you can\u2019t afford to live without. Do it right now before you do anything else."]
    }), "\n", createVNode(_components.p, {
      children: "For the rest of your accounts, I recommend updating your passwords to something secure \u201Cas you go.\u201D This means you change passwords as you use them. For example, next time you log into eBay, change your password. Then, next time you order pizza, change that password. In time every account will have a unique, strong password."
    }), "\n", createVNode(_components.h2, {
      id: "tips--tricks",
      children: "Tips & Tricks"
    }), "\n", createVNode(_components.p, {
      children: ["For your master login password, use a passphrase. A passphrase is a series of words rather than a single word. A good passphrase should be at least five random words, so try to avoid famous quotes or obvious words like a list of your children\u2019s names. A ", createVNode(_components.a, {
        href: "https://www.useapassphrase.com/",
        children: "good passphrase"
      }), " can take upwards of hundreds of years to brute force or guess."]
    }), "\n", createVNode(_components.p, {
      children: "Password managers typically include a note-taking section. This is a great spot to take notes like MFA backup codes, answers to security questions, or other account-specific details you want to remember. However, beware that this creates a single point of failure, so ensure that you\u2019re applying maximum protection to your password manager in this case."
    }), "\n", createVNode(_components.p, {
      children: "A common strategy for added account security is to give false answers to security questions. For example, a common security question is \u201Cwhat is your father\u2019s middle name?\u201D This kind of information is easy to find online for most people these days due to the increasingly digital nature of public records. A criminal could call the bank posing as you, answer the question, and transfer all your funds out of your account. Instead of the true answer, answer with a randomly generated word and record it in the notes section."
    }), "\n", createVNode(_components.p, {
      children: ["If you want to see which services currently support passkeys, check ", createVNode(_components.a, {
        href: "https://passkeys.directory/",
        children: "here"
      }), "."]
    })]
  });
}
function MDXContent$j(props = {}) {
  return createVNode(MDXLayout$j, {
    ...props,
    children: createVNode(_createMdxContent$j, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$j, "astro:jsx");
__astro_tag_component__(MDXContent$j, "astro:jsx");
const url$j = "/en/guides/most-important/passwords";
const file$j = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/most-important/passwords.mdx";
function rawContent$j() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$j() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$j = (props = {}) => MDXContent$j({
											...props,
											components: { Fragment, ...props.components },
										});
Content$j[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$j.layout);

const _page49 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$j,
  _internal: _internal$j,
  compiledContent: compiledContent$j,
  default: Content$j,
  file: file$j,
  frontmatter: frontmatter$j,
  getHeadings: getHeadings$j,
  rawContent: rawContent$j,
  url: url$j
}, Symbol.toStringTag, { value: 'Module' }));

const criterias = [
	"Virtual Cards",
	"Prepaid Cards",
	"Countries"
];
const tools = {
	ironvest: {
		name: "IronVest",
		logo: "/images/logos/ironvest.png",
		link: "https://dnt.abine.com/#feature/payments",
		values: {
			"Virtual Cards": "Yes, requires paid plan",
			"Prepaid Cards": "Yes",
			Countries: "United States"
		}
	},
	monzo: {
		name: "Monzo",
		logo: "/images/logos/monzo.png",
		link: "https://monzo.com/i/monzo-plus/",
		values: {
			"Virtual Cards": "Yes, requires paid plan",
			"Prepaid Cards": "No",
			Countries: "United Kingdom"
		}
	},
	mysudo: {
		name: "MySudo (iOS Only)",
		logo: "/images/logos/mysudo.png",
		link: "https://mysudo.com/features/",
		values: {
			"Virtual Cards": "Yes, requires paid plan",
			"Prepaid Cards": "No",
			Countries: "United States"
		}
	},
	privacy: {
		name: "Privacy",
		logo: "/images/logos/privacy.png",
		referral_link: "https://privacy.com/join/UZ9WY",
		link: "https://privacy.com/",
		values: {
			"Virtual Cards": "Yes",
			"Prepaid Cards": "No",
			Countries: "United States"
		}
	},
	revolut: {
		name: "Revolut",
		logo: "/images/logos/revolut.png",
		link: "https://www.revolut.com/",
		values: {
			"Virtual Cards": "Yes, may require paid plan depending on location",
			"Prepaid Cards": "No",
			Countries: "Australia, Austria, Belgium, Bulgaria, Croatia, Republic of Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Ireland, Italy, Japan, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Netherlands, Norway, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden, Switzerland, the United Kingdom, and the United States."
		}
	}
};
const data$1 = {
	criterias: criterias,
	tools: tools
};

const MDXLayout$i = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$i;
  content.file = file$i;
  content.url = url$i;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$i,
    url: url$i,
    content,
    frontmatter: content,
    headings: getHeadings$i(),
    "server:root": true,
    children
  });
};
const frontmatter$i = {
  "layout": "@layouts/guides.astro",
  "title": "Data Breach Defense: Payment Masking",
  "topic": "Private Payments (AKA Never Get Your Card Number Stolen Again)",
  "weight": 5,
  "draft": false
};
const _internal$i = {
  injectedFrontmatter: {}
};
function getHeadings$i() {
  return [{
    "depth": 1,
    "slug": "data-breach-defense-payment-masking",
    "text": "Data Breach Defense: Payment Masking"
  }, {
    "depth": 2,
    "slug": "what-is-payment-masking",
    "text": "What is Payment Masking?"
  }, {
    "depth": 2,
    "slug": "why-do-i-need-payment-masking",
    "text": "Why do I Need Payment Masking?"
  }, {
    "depth": 2,
    "slug": "cash",
    "text": "Cash"
  }, {
    "depth": 2,
    "slug": "online-payments",
    "text": "Online Payments"
  }, {
    "depth": 2,
    "slug": "bitcoin--cryptocurrencies",
    "text": "Bitcoin & Cryptocurrencies"
  }];
}
function _createMdxContent$i(props) {
  const _components = Object.assign({
    h1: "h1",
    h2: "h2",
    p: "p",
    strong: "strong",
    a: "a",
    em: "em"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "data-breach-defense-payment-masking",
      children: "Data Breach Defense: Payment Masking"
    }), "\n", createVNode(_components.h2, {
      id: "what-is-payment-masking",
      children: "What is Payment Masking?"
    }), "\n", createVNode(_components.p, {
      children: "Payment masking is simply a way to keep your financial information out of the hands of your bank, and in turn advertisers or would-be criminals. This can take the form of using cash or payment masking services, both of which will be discussed in this section."
    }), "\n", createVNode(_components.h2, {
      id: "why-do-i-need-payment-masking",
      children: "Why do I Need Payment Masking?"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: ["Your bank and card issuers are selling your ", createVNode(_components.a, {
          href: "https://www.forbes.com/sites/adamtanner/2013/10/17/what-chase-and-other-banks-wont-tell-you-about-selling-your-data/",
          children: "transaction data"
        }), " to data brokers,"]
      }), " who use this information to infer out things like your income, net worth, and what you\u2019re likely to buy. They can even determine things like where you live based on the geographic areas where you spend money. They then sell these inferences to marketing companies who use it to serve you targeted ads that are more likely to be relevant to you."]
    }), "\n", createVNode(_components.p, {
      children: ["Aside from being highly invasive, this kind of information also poses a risk. ", createVNode(_components.strong, {
        children: "Credit card information is highly vulnerable to being stolen"
      }), " in a data breach, and the economic information gathered about you (like income and net worth) frequently makes its way onto websites like ", createVNode(_components.a, {
        href: "https://www.spokeo.com/",
        children: "Spokeo"
      }), ". Furthermore, many insurance companies are pushing for a world where big data - including your purchases - can determine things like your health insurance rates and coverage (", createVNode(_components.a, {
        href: "https://www.wsj.com/articles/SB10001424127887323384604578326151014237898",
        children: "Source, paywalled"
      }), "). Protecting your financial information is a critical part of protecting both your privacy and security."]
    }), "\n", createVNode(_components.h2, {
      id: "cash",
      children: "Cash"
    }), "\n", createVNode(_components.p, {
      children: ["The easiest way to protect your financial privacy is to ", createVNode(_components.strong, {
        children: "use cash whenever possible."
      }), " The advantages go beyond privacy. For one, cash has been proven to help people ", createVNode(_components.a, {
        href: "https://money.com/pay-with-cash-value-of-money-study/",
        children: "spend less"
      }), ", so it\u2019ll save you money. Another is that it keeps you from overspending by removing the possibility. A common concern is that by carrying cash you make yourself a target for mugging, but remember that criminals don\u2019t have x-ray vision or psychic powers. They don\u2019t know if you\u2019re carrying cash instead of cards or how much. One strategy is to figure out how much cash you\u2019ll need during any given pay period - gas, groceries, entertainment, etc - and withdraw that amount at an ATM. Another strategy is to simply keep a set amount of cash on you - $100, for examlpe - and replenish whatever you spent each payday."]
    }), "\n", createVNode(_components.h2, {
      id: "online-payments",
      children: "Online Payments"
    }), "\n", createVNode(_components.p, {
      children: ["Unfortunately cash rarely works in the realm of online shopping, which is generally unavoidable to some extent these days. Fortunately, new services have popped up to meet his need. The following are a list of virtual debit card services that I have collected in the course of my research. Note that ", createVNode(_components.strong, {
        children: "none of these are anonymous"
      }), "; all of them are required to abide by various anti-fraud \u201CKnow Your Customer\u201D laws which will require them to verify your identity to deter fraud, laundering, and tax evasion. Remember that these strategies are to protect against general data breaches, online theft of card numbers, and less sophistocated stalkers or attackers."]
    }), "\n", createVNode(_components.p, {
      children: ["Some people may not be comfortable giving their bank information to a third party, or may live in a country where these services don\u2019t operate. In those situations, ", createVNode(_components.strong, {
        children: "I recommend using pre-paid gift cards or Visa vanilla cards paid for in cash."
      })]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "Listed in alphabetical order, not order of recommendation"
      })
    }), "\n", createVNode($$Criterias, {
      data: data$1
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: createVNode(_components.a, {
          href: "https://gitlab.com/thenewoil/website/-/wikis/Payment-Masking-Criteria",
          children: "Click here to see my criteria for selecting these services"
        })
      })
    }), "\n", createVNode(_components.h2, {
      id: "bitcoin--cryptocurrencies",
      children: "Bitcoin & Cryptocurrencies"
    }), "\n", createVNode(_components.p, {
      children: "Cryptocurrency has exploded into mainstream popularity. I do like cryptocurrency. I think the principles it is founded on - decentralization, security, financial freedom, and equal access - are all great ideals, and I hope to see cryptocurrencies, and blockchain technology in general, continue to see improvement and adoption where it belongs. However, I caution most of my readers not to get too deep into cryptocurrency for several reasons."
    }), "\n", createVNode(_components.p, {
      children: ["For one, ", createVNode(_components.strong, {
        children: "contrary to mainstream portrayals, most cryptocurrencies (including Bitcoin) are not anonymous or even private."
      }), " Many websites exist that allow you to type in any Bitcoin address and see the exact balance for free. Plus, a Bitcoin can easily be traced along the chain of custody. The blockchain Bitcoin uses was never designed to be private, it was designed to be an open, transparent ledger focusing on security and decentralization. This is just one example. The problem is compounded when you get your cryptocurrency from a \u201CKYC\u201D or \u201CKnow Your Customer\u201D exchange like Coinbase or Binance, which many people do."]
    }), "\n", createVNode(_components.p, {
      children: ["Second, the sudden growth combined with the general ignorance of how cryptocurrencies work has made the cryptocurrency space rife with fraud and \u201Cget rich quick\u201D scams. Coinbase alone ", createVNode(_components.a, {
        href: "https://www.coinbase.com/price",
        children: "lists"
      }), " nearly 3,000 cryptocurrencies available for purchase and trade on their site. I find it hard to believe that each one is designed to solve an actual problem or serve a specific purpose other than making someone money. Only a small few cryptocurrencies are genuine attempts to improve the space: faster transactions, cheaper transactions, privacy, anonymity, etc."]
    }), "\n", createVNode(_components.p, {
      children: "Finally, the volatility of cryptocurrency makes it dangerous and unfeasible to rely on heavily in spaces where a stable currency and easy access to banking exist. If you live in such a place, I only recommend small monetary investments in cryptocurrency as a hobby and just a little time spent keeping up-to-date on emerging trends. If you live in a part of the world where your currency is highly unstable and/or your banking system is not easily accessible, this advice changes dramatically and is beyond the scope of this site."
    }), "\n", createVNode(_components.p, {
      children: ["To fully dive into the complexities of cryptocurrency falls far outside the scope of this website. It would take an entire other website to explain how they work, how to use them correclty, which ones are worth your time, and more. If you would like to learn more about cryptocurrencies, I recommend ", createVNode(_components.a, {
        href: "https://bitcoiner.guide/",
        children: "Bitcoiner.guide"
      }), ", ", createVNode(_components.a, {
        href: "https://www.coinbureau.com/resource-hub/",
        children: "Coinbureau\u2019s Resource Hub"
      }), ", ", createVNode(_components.a, {
        href: "https://dt.gl/",
        children: "Decentralize.Today"
      }), ", and ", createVNode(_components.a, {
        href: "https://optoutpod.com/",
        children: "Opt Out Podcast"
      }), ". I trust these resources to be rational and truthful to the best of their ability in a space flooded with sensationalism and exaggeration."]
    })]
  });
}
function MDXContent$i(props = {}) {
  return createVNode(MDXLayout$i, {
    ...props,
    children: createVNode(_createMdxContent$i, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$i, "astro:jsx");
__astro_tag_component__(MDXContent$i, "astro:jsx");
const url$i = "/en/guides/most-important/payments";
const file$i = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/most-important/payments.mdx";
function rawContent$i() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$i() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$i = (props = {}) => MDXContent$i({
											...props,
											components: { Fragment, ...props.components },
										});
Content$i[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$i.layout);

const _page50 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$i,
  _internal: _internal$i,
  compiledContent: compiledContent$i,
  default: Content$i,
  file: file$i,
  frontmatter: frontmatter$i,
  getHeadings: getHeadings$i,
  rawContent: rawContent$i,
  url: url$i
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$h = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$h;
  content.file = file$h;
  content.url = url$h;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$h,
    url: url$h,
    content,
    frontmatter: content,
    headings: getHeadings$h(),
    "server:root": true,
    children
  });
};
const frontmatter$h = {
  "layout": "@layouts/guides.astro",
  "title": "Privacy: Securing Your Browser",
  "topic": "Private/Secure Internet Browsing",
  "weight": 10,
  "draft": false
};
const _internal$h = {
  injectedFrontmatter: {}
};
function getHeadings$h() {
  return [{
    "depth": 1,
    "slug": "securing-your-browser",
    "text": "Securing Your Browser"
  }, {
    "depth": 2,
    "slug": "why-should-i-change-my-browser",
    "text": "Why Should I Change my Browser?"
  }, {
    "depth": 2,
    "slug": "brave-vs-firefox",
    "text": "Brave vs Firefox"
  }, {
    "depth": 2,
    "slug": "extensions",
    "text": "Extensions"
  }, {
    "depth": 2,
    "slug": "settings",
    "text": "Settings"
  }, {
    "depth": 3,
    "slug": "brave",
    "text": "Brave"
  }, {
    "depth": 3,
    "slug": "firefox",
    "text": "Firefox"
  }, {
    "depth": 2,
    "slug": "honorable-mentions",
    "text": "Honorable Mentions"
  }, {
    "depth": 3,
    "slug": "mullvad-browser",
    "text": "Mullvad Browser"
  }, {
    "depth": 3,
    "slug": "librewolf",
    "text": "LibreWolf"
  }, {
    "depth": 3,
    "slug": "tor-browser",
    "text": "Tor Browser"
  }];
}
function _createMdxContent$h(props) {
  const _components = Object.assign({
    h1: "h1",
    h2: "h2",
    p: "p",
    strong: "strong",
    a: "a",
    h3: "h3",
    ul: "ul",
    li: "li",
    em: "em",
    br: "br"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "securing-your-browser",
      children: "Securing Your Browser"
    }), "\n", createVNode(_components.h2, {
      id: "why-should-i-change-my-browser",
      children: "Why Should I Change my Browser?"
    }), "\n", createVNode(_components.p, {
      children: ["Currently ", createVNode(_components.strong, {
        children: ["Google Chrome has the most users, but it\u2019s ", createVNode(_components.a, {
          href: "https://www.washingtonpost.com/technology/2019/06/21/google-chrome-has-become-surveillance-software-its-time-switch/",
          children: "basically spyware"
        })]
      }), ", even going so far as to ", createVNode(_components.a, {
        href: "https://www.hackread.com/google-chromium-browser-listens-conversations/",
        children: "turn on your microphone and eavesdrop on you while you browse"
      }), ". Instead, you can get almost identical performance and security with a massive improvement in privacy by switching to ", createVNode(_components.a, {
        href: "https://brave.com/",
        children: "Brave"
      }), " or ", createVNode(_components.a, {
        href: "https://www.mozilla.org/en-US/firefox/new/",
        children: "Firefox"
      }), ". Changing browsers may take some getting used to at first, but is critical for improving your privacy."]
    }), "\n", createVNode(_components.h2, {
      id: "brave-vs-firefox",
      children: "Brave vs Firefox"
    }), "\n", createVNode(_components.p, {
      children: ["Browsers are highly controversial. No matter what browsers I suggest, people will always say that I should\u2019ve considered a different one or shouldn\u2019t have listed one I did. To see my criteria for why I selected these browers to list, check ", createVNode(_components.a, {
        href: "https://gitlab.com/thenewoil/website/-/wikis/Browser-Criteria",
        children: "here"
      }), ". In the interest of transparency, I do want to acknowledge that ", createVNode(_components.strong, {
        children: "both Brave and Mozilla have made questionable decisions."
      }), " Brave\u2019s criticisms mostly revolve around their use of BAT, a cryptocurrency they developed to allow site owners and content creators to get paid based on visits and time spent on their site. You can read more about that ", createVNode(_components.a, {
        href: "https://brave.com/brave-rewards/",
        children: "here"
      }), ". Such decisions included ", createVNode(_components.a, {
        href: "https://www.altcoinbuzz.io/cryptocurrency-news/spotlight/famous-youtuber-tom-scott-frustrated-with-brave/",
        children: "collecting payments on behalf of a creator who claims he never got paid"
      }), " and ", createVNode(_components.a, {
        href: "https://www.cpomagazine.com/data-privacy/brave-privacy-browser-caught-automatically-adding-affiliate-links-to-cryptocurrency-urls/",
        children: "injecting affiliate links into browser traffic so Brave made more money"
      }), ". These situations have since been corrected. For Mozilla\u2019s shortcomings, they regularly draw criticism for making their analytics opt-out rather than opt-in, making Google the default search engine, and ", createVNode(_components.a, {
        href: "https://www.zdnet.com/article/endangered-firefox-the-state-of-mozilla/",
        children: "paying their CEO over $3 million USD per year while struggling to be financially solvent"
      }), ". I also want readers to be aware that Firefox has ", createVNode(_components.a, {
        href: "https://www.ghacks.net/2022/03/17/each-firefox-download-has-a-unique-identifier/",
        children: "been found"
      }), " to be issuing a temporary, one-time tracker that shares some data with Google when you download and install the program for the first time on Windows or Mac, so if you go this route I suggest you turn off your internet during the installation until you have a chance to disable analytics (discussed below)."]
    }), "\n", createVNode(_components.p, {
      children: ["While I don\u2019t think there is a perfect solution in this space, I personally recommend Brave for most people. It is the most Chrome-like so most users will find the transition easy, using the Chromium engine will make you \u201Cblend in\u201D more with other chrome users, and it is extremely privacy-friendly \u201Cout of the box\u201D without having to make a lot of advanced tweaks. Having said that, a lot of people feel very strongly about Brave as a company, the BAT token, and the idea of giving Google too much power by having too many users dependent on the Chromium engine. Therefore, I will leave it up to my readers to decide which company they consider to be more ethical and which browser is right for their needs. If you still find yourself on the fence, it\u2019s worth noting that Chromium-based browsers tend to have better security, however as long as you\u2019re using good ", createVNode(_components.a, {
        href: "/guides/less-important/habits",
        children: "online habits"
      }), " the difference should be minimal for most casual web users (", createVNode(_components.a, {
        href: "https://madaidans-insecurities.github.io/firefox-chromium",
        children: "Source"
      }), ")."]
    }), "\n", createVNode(_components.h2, {
      id: "extensions",
      children: "Extensions"
    }), "\n", createVNode("img", {
      src: "/images/logos/ublock.png",
      alt: "ublock logo alt",
      class: "float-left mx-6 w-24"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "If you decide to go with Brave, you don\u2019t need to add any additional extensions"
      }), "\n(except for the ones in the next paragraph if you decide). ", createVNode(_components.strong, {
        children: ["If you decide to go\nwith Firefox, you should install ", createVNode(_components.a, {
          href: "https://ublockorigin.com/",
          children: "uBlock Origin"
        })]
      }), ", a\npowerful, lightweight ad- and tracker-blocker. Malicious, fake ads designed to scam\nyou or trick you into downloading malware (called \u201Cmalvertising\u201D) has become such\na serious problem that even the FBI ", createVNode(_components.a, {
        href: "https://techcrunch.com/2022/12/22/fbi-ad-blocker/",
        children: "recommends"
      }), "\nthat you use an ad-blocker. Officially, uBlock Origin is ready for use \u201Cout of the\nbox.\u201D However, there are a couple of filters I recommend enabling in the \u201CFilter lists\u201D tab of the settings to improve the protections and convenience it has to offer. I recommend enabling every filter under the \u201CPrivacy\u201D section, and every filter except for \u201CEasyList - Notifications\u201D under the \u201CAnnoyances > EasyList - Annoyances\u201D section. Under the privacy section, these filters will block website\u2019s attempts to probe your local network and strip the tracking portion of links when you go to share them. The Annoyances filters will block various pop-ups that you may frequently encounter on various websites including newsletter join forms, cookie consent banners, chat bots, social media share suggestions, and more. You may feel tempted to add other filters. This is personal preference, but beware that adding additional filters may cause breakage on some websites. Furthermore, some people suggest that blocking additional content that other users are not blocking may make you easier to fingerprint."]
    }), "\n", createVNode("img", {
      src: "/images/logos/snowflake.png",
      alt: "snowflake logo",
      class: "float-left mx-6 w-24"
    }), "\n", createVNode(_components.p, {
      children: ["There are two additional extensions that I think are worth adding if you feel so\ninclined. The first is your ", createVNode(_components.a, {
        href: "/guides/most-important/passwords",
        children: "password manager\u2019s"
      }), "\nofficial extension. Many password managers offer browser extensions to help make\nlogging in easy and safe. There are numerous advantages to these, like protection\nagainst phishing and keyloggers, and as such I consider these okay to install if\nyou want to. The other is ", createVNode(_components.a, {
        href: "https://snowflake.torproject.org/",
        children: "Snowflake"
      }), " (this is\noptionally included in Brave, see the recommended settings below). This is a project\nto help certain internet users in foreign, repressive countries bypass censorship.\nThis should not cause any kind of legal risk to you. Both of these extensions are\noptional, but I believe they are safe to use."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "I strongly advise against installing any other extensions unless absolutely necessary."
      }), " The more extensions you install, the more easily your browser can be fingerprinted, making it easier to track you across the web despite any other privacy-enhancing changes you make to your browser or browsing habits. They also present a serious ", createVNode(_components.a, {
        href: "https://techxplore.com/news/2023-09-issue-chrome-extensions-access-private.html",
        children: "security risk"
      }), " as extensions typically have advanced privileges that allow them to modify the web page, read data, and other necessary functions that could be abused for malicious purposes."]
    }), "\n", createVNode(_components.h2, {
      id: "settings",
      children: "Settings"
    }), "\n", createVNode("div", {
      children: [createVNode(_components.h3, {
        id: "brave",
        children: "Brave"
      }), createVNode("img", {
        src: "/images/logos/brave.png",
        alt: "brave logo",
        class: "float-right mx-6 w-24"
      }), createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: ["Appearance:\n", createVNode(_components.ul, {
            children: ["\n", createVNode(_components.li, {
              children: "Show autocomplete in address bar: disabled"
            }), "\n", createVNode(_components.li, {
              children: ["Always show full URLs: enabled ", createVNode("sup", {
                children: "(1)"
              })]
            }), "\n"]
          }), "\n"]
        }), "\n", createVNode(_components.li, {
          children: "Social media blocking: disable all"
        }), "\n", createVNode(_components.li, {
          children: ["Privacy and security:\n", createVNode(_components.ul, {
            children: ["\n", createVNode(_components.li, {
              children: "Allow privacy-preserving product analytics (P3A): disabled"
            }), "\n", createVNode(_components.li, {
              children: "Automatically send daily usage ping to Brave: disabled"
            }), "\n", createVNode(_components.li, {
              children: ["Clear browsing data: On exit: check all ", createVNode("sup", {
                children: "(2)"
              })]
            }), "\n", createVNode(_components.li, {
              children: ["Cookies and other site data: Clear cookies and site data when you close all windows: enabled ", createVNode("sup", {
                children: "(3)"
              })]
            }), "\n", createVNode(_components.li, {
              children: "Security: Always use secure connections: enabled"
            }), "\n", createVNode(_components.li, {
              children: [createVNode(_components.strong, {
                children: ["(Skip this setting if using a ", createVNode(_components.a, {
                  href: "/guides/less-important/vpns",
                  children: "VPN"
                }), ")"]
              }), " Security: Use Secure DNS: With a DNS provider from ", createVNode(_components.a, {
                href: "https://www.privacyguides.org/dns/",
                children: "this list"
              }), "."]
            }), "\n", createVNode(_components.li, {
              children: "Private window with Tor: disabled"
            }), "\n", createVNode(_components.li, {
              children: ["Volunteer to help others connect to the Tor network: enabled (", createVNode(_components.em, {
                children: "this is a built-in integration of the Snowflake extension discussed above"
              }), ")"]
            }), "\n"]
          }), "\n"]
        }), "\n", createVNode(_components.li, {
          children: ["Shields:\n", createVNode(_components.ul, {
            children: ["\n", createVNode(_components.li, {
              children: "Content filtering: Easylist-Cookie List: Enabled"
            }), "\n"]
          }), "\n"]
        }), "\n", createVNode(_components.li, {
          children: ["Extensions:\n", createVNode(_components.ul, {
            children: ["\n", createVNode(_components.li, {
              children: "Hangouts: disabled"
            }), "\n"]
          }), "\n"]
        }), "\n", createVNode(_components.li, {
          children: ["Additional settings:\n", createVNode(_components.ul, {
            children: ["\n", createVNode(_components.li, {
              children: ["Autofill: disable all ", createVNode("sup", {
                children: "(2)"
              })]
            }), "\n"]
          }), "\n"]
        }), "\n"]
      }), createVNode(_components.p, {
        children: [createVNode(_components.em, {
          children: "1: This allows you to see the full URL and help defend against phishing attacks."
        }), "\n", createVNode(_components.br, {}), "\n", createVNode(_components.em, {
          children: "2: There is malware capable of swiping data stored in your browser, including history and saved passwords, credit cards, and even multi-factor authentication cookies. You can choose to leave cookies and other sign-in data and history if you want, but know that it is a security risk."
        }), "\n", createVNode(_components.br, {}), "\n", createVNode(_components.em, {
          children: "3: This will sign you out of everything and reset any settings. See Note 2 for more information."
        })]
      })]
    }), "\n", createVNode("div", {
      children: [createVNode(_components.h3, {
        id: "firefox",
        children: "Firefox"
      }), createVNode("img", {
        src: "/images/logos/firefox.png",
        alt: "firefox logo",
        class: "float-right mx-6 w-24"
      }), createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: ["After downloading but before installing, disconnect from the internet.", createVNode("sup", {
            children: "1"
          })]
        }), "\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: ["(Skip this setting if using a ", createVNode(_components.a, {
              href: "/guides/less-important/vpns",
              children: "VPN"
            }), ".)"]
          }), " General: Network Settings: Enable DNS over HTTPS: Custom: Select a DNS provider from ", createVNode(_components.a, {
            href: "https://www.privacyguides.org/dns/",
            children: "this list"
          }), "."]
        }), "\n", createVNode(_components.li, {
          children: "Home: Firefox Home Content: Shortcuts: Sponsored Shortcuts: uncheck"
        }), "\n", createVNode(_components.li, {
          children: "Home: Firefox Home Content: Recommended by Pocket: Sponsored Stories: uncheck"
        }), "\n", createVNode(_components.li, {
          children: ["Search: Default Search Engine: Pick a ", createVNode(_components.a, {
            href: "/guides/less-important/habits#search-engines",
            children: "privacy-respecting search engine"
          }), "."]
        }), "\n", createVNode(_components.li, {
          children: ["Privacy & Security: Enhanced Tracking Protection: Strict", createVNode("sup", {
            children: "2"
          })]
        }), "\n", createVNode(_components.li, {
          children: ["Privacy & Security: Cookies & Site Data: Delete cookies and site data when Firefox is closed: checked", createVNode("sup", {
            children: "3"
          })]
        }), "\n", createVNode(_components.li, {
          children: ["Privacy & Security: Logins and Passwords: uncheck all", createVNode("sup", {
            children: "3"
          })]
        }), "\n", createVNode(_components.li, {
          children: ["Privacy & Security: Forms and autofill: uncheck all", createVNode("sup", {
            children: "3"
          })]
        }), "\n", createVNode(_components.li, {
          children: "Privacy & Security: History: Never remember history"
        }), "\n", createVNode(_components.li, {
          children: "Privacy & Security: Address Bar - Firefox Suggest: Suggestions from the web: disabled"
        }), "\n", createVNode(_components.li, {
          children: "Privacy & Security: Address Bar - Firefox Suggest: Suggestions from sponsors: disabled"
        }), "\n", createVNode(_components.li, {
          children: "Privacy & Security: Firefox Data Collection and Use: uncheck all"
        }), "\n", createVNode(_components.li, {
          children: "Privacy & Security: HTTPS-Only Mode: Enable HTTPS-Only Mode in all windows"
        }), "\n"]
      }), createVNode(_components.p, {
        children: [createVNode(_components.em, {
          children: ["1: Mozilla ", createVNode(_components.a, {
            href: "https://www.ghacks.net/2022/03/17/each-firefox-download-has-a-unique-identifier/",
            children: "issues"
          }), " a temporary, one-time tracker that utilizes Google Analytics to understand the relationship between downloads and installations. This will be disabled in later settings."]
        }), "\n", createVNode(_components.br, {}), "\n", createVNode(_components.em, {
          children: "2: I have never known this setting to cause any website breakage, however you can always change it back to Standard or Custom if you do."
        }), "\n", createVNode(_components.br, {}), "\n", createVNode(_components.em, {
          children: "3: There is malware capable of swiping data stored in your browser, including history and saved passwords, credit cards, and even multi-factor authentication cookies. You can choose to leave cookies and other sign-in data and history if you want, but know that it is a security risk."
        })]
      })]
    }), "\n", createVNode(_components.h2, {
      id: "honorable-mentions",
      children: "Honorable Mentions"
    }), "\n", createVNode(_components.h3, {
      id: "mullvad-browser",
      children: "Mullvad Browser"
    }), "\n", createVNode("img", {
      src: "/images/logos/mullvad-browser.png",
      alt: "mullvad browser logo",
      class: "float-left mx-6 w-24"
    }), "\n", createVNode(_components.p, {
      children: ["While the ", createVNode(_components.a, {
        href: "https://mullvad.net/en/browser",
        children: "Mullvad Browser"
      }), " technically meets the\ncriteria to be listed as an official recommendation here, I\u2019m currently listing it\nas an \u201Chonorable mention\u201D for two reasons. The first is that it\u2019s new and untested,\nand the second is usability. The Mullvad Browser is the result of a collaboration\nbetween ", createVNode(_components.a, {
        href: "/guides/less-important/vpns",
        children: "Mullvad VPN"
      }), " and The Tor Project (see below)\nand is ultimately based on Firefox. The Mullvad Browser is basically \u201Cthe Tor Browser\nwithout Tor.\u201D It attempts to make all users look the same by applying the same settings\nto every user, thus defeating brower fingerprinting. Furthermore, the Mullvad Browser\noffers a number of \u201Chardening\u201D ", createVNode(_components.a, {
        href: "https://mullvad.net/en/browser/hard-facts",
        children: "features"
      }), "\nthat make it more private and secure than regular Firefox. However, these changes\nunfortunately come at the cost of guaranteed usability, so while the Mullvad Browser\nis a great and recommended browser, users should expect some degree of site breakage\nand be prepared to use a backup browser in those cases."]
    }), "\n", createVNode(_components.h3, {
      id: "librewolf",
      children: "LibreWolf"
    }), "\n", createVNode("img", {
      src: "/images/logos/librewolf.png",
      alt: "librewolf logo",
      class: "float-left mx-6 w-24"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.a, {
        href: "https://librewolf.net/",
        children: "LibreWolf"
      }), " does not technically qualify to be listed on\nthis site because it is not capable of auto-update on Mac and Windows. However, I\nbelieve LibreWolf is still worth a mention. LibreWolf is a pre-hardened fork of Firefox,\noffering pre-configured improvements like no telemetry, private default search options,\nand it comes with uBlock Origin already installed. Truthfully, LibreWolf is out-of-the-box\nready to use in terms of privacy and settings. However, there are two drawbacks."]
    }), "\n", createVNode(_components.p, {
      children: ["First, you should beware that LibreWolf\u2019s hardened settings may result in some website breakage. In my experience this hasn\u2019t been an issue, but I also don\u2019t use a lot of popular websites that many people do. Your results may vary. Second, as mentioned, LibreWolf does not auto-update except on Linux. You can get around this by installing the ", createVNode(_components.a, {
        href: "https://addons.mozilla.org/en-US/firefox/addon/librewolf-updater/",
        children: "LibreWolf Updater"
      }), " extension in the browser. This is an unofficial extension, but it is officially recommended in the documentation, and therefore is likely safe. It will not auto-update the browser, but it will alert you every time a new version is available and make it easy for you to download it. From there you have to run in the install as if it were the first time. If this is a convenience tradeoff you\u2019re willing to make, then consider LibreWolf."]
    }), "\n", createVNode(_components.h3, {
      id: "tor-browser",
      children: "Tor Browser"
    }), "\n", createVNode("img", {
      src: "/images/logos/tor.png",
      alt: "tor logo",
      class: "float-left mx-6 w-24"
    }), "\n", createVNode(_components.p, {
      children: ["Between the extensions and the settings changes suggested on this page, you will\ngreatly reduce the ability of websites to track you as you go from site to site.\nHowever, it should be noted that browser fingerprinting - one of the most common\nforms of online tracking - is incredibly complex and ever evolving. While these changes\nhave dramatically reduced your fingerprint, you should not assume - as with any of\nthe advice I give on this site - that you are totally invisible or untrackable. If\nyou want to achieve maximum privacy and/or anonymity, consider using the ", createVNode(_components.a, {
        href: "https://www.torproject.org/download",
        children: "Tor Browser"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["The Tor browser is a somewhat common daily browser among privacy enthusiasts for a few reasons. If you\u2019re unfamiliar with Tor, check out my ", createVNode(_components.a, {
        href: "https://odysee.com/@thenewoil:7/tor-crash-course:d",
        children: "Tor Crash Course"
      }), " video. The Tor browser routes only your browser traffic through the Tor network and not all device traffic. The Tor browser also comes pre-packaged with a more advanced content blocker called No-Script which can be used to block ads, as well as many other unseen, powerful tracker-blocking features. The Tor browser also isolates each tab and changes your relay path with every new website you visit to help further protect your anonymity. ", createVNode(_components.strong, {
        children: "Using the Tor Browser as your main browser is a great idea,"
      }), " but keep in mind that many legitimate websites such as banking and e-commerce sites block known Tor addresses to prevent abuse and fraud, so ", createVNode(_components.strong, {
        children: "you\u2019ll want to keep a copy of Brave/Firefox installed"
      }), " for when that happens. Additionally, using the Tor Browser in a truly, 100% anonymous way is incredibly difficult and requires very intentional browsing habits, so don\u2019t do anything illegal. Finally, because all nodes are volunteer-run and therefore work on an \u201Chonor system,\u201D be sure to check that any site you login or transfer personal data across is using HTTPS (the lock icon at the beginning of the address bar) and is the actual site and not a fake phishing site designed to look like the real thing."]
    }), "\n", createVNode(_components.p, {
      children: ["If you\u2019re still unsure what browser is right for you, ", createVNode(_components.a, {
        href: "https://privacytests.org/",
        children: "Privacy Tests"
      }), " and ", createVNode(_components.a, {
        href: "https://www.cookiestatus.com/",
        children: "Cookie Status"
      }), " compare a few of the more popular choices."]
    })]
  });
}
function MDXContent$h(props = {}) {
  return createVNode(MDXLayout$h, {
    ...props,
    children: createVNode(_createMdxContent$h, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$h, "astro:jsx");
__astro_tag_component__(MDXContent$h, "astro:jsx");
const url$h = "/en/guides/most-important/browser";
const file$h = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/most-important/browser.mdx";
function rawContent$h() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$h() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$h = (props = {}) => MDXContent$h({
											...props,
											components: { Fragment, ...props.components },
										});
Content$h[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$h.layout);

const _page51 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$h,
  _internal: _internal$h,
  compiledContent: compiledContent$h,
  default: Content$h,
  file: file$h,
  frontmatter: frontmatter$h,
  getHeadings: getHeadings$h,
  rawContent: rawContent$h,
  url: url$h
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$g = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$g;
  content.file = file$g;
  content.url = url$g;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$g,
    url: url$g,
    content,
    frontmatter: content,
    headings: getHeadings$g(),
    "server:root": true,
    children
  });
};
const frontmatter$g = {
  "layout": "@layouts/guides.astro",
  "title": "Identity Theft: Freezing Your Credit",
  "topic": "What a Credit Freeze is (and Why You Should Freeze Yours)",
  "weight": 6,
  "draft": false
};
const _internal$g = {
  injectedFrontmatter: {}
};
function getHeadings$g() {
  return [{
    "depth": 1,
    "slug": "identity-theft-freezing-your-credit",
    "text": "Identity Theft: Freezing Your Credit"
  }, {
    "depth": 2,
    "slug": "what-is-a-credit-freeze",
    "text": "What is a Credit Freeze?"
  }, {
    "depth": 2,
    "slug": "why-do-i-need-a-credit-freeze",
    "text": "Why do I Need a Credit Freeze?"
  }, {
    "depth": 2,
    "slug": "how-do-i-freeze-my-credit",
    "text": "How do I Freeze my Credit?"
  }];
}
function _createMdxContent$g(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    h2: "h2",
    a: "a",
    em: "em"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "identity-theft-freezing-your-credit",
      children: "Identity Theft: Freezing Your Credit"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Note:"
      }), " This page applies exclusively to United States residents. Some of these agencies - like Equifax - do operate globablly, therefore you may be able to freeze your credit even if you live outside the US. However, I cannot guarantee that it is possible or free. Please contact the consumer credit reporting agencies in your country for additional information."]
    }), "\n", createVNode(_components.h2, {
      id: "what-is-a-credit-freeze",
      children: "What is a Credit Freeze?"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "A credit freeze is a poorly-named security feature offered by consumer credit scoring agencies that prevents anyone except you from opening new accounts in your name."
      }), " Credit freezes are poorly named because ", createVNode(_components.strong, {
        children: "they do not stop your credit score from changing -"
      }), " it will still improve as you do positive things and fall as you do negative things - and because ", createVNode(_components.strong, {
        children: "you will still have the access required to unfreeze your credit and open new accounts."
      }), " Credit freezes will only stop unauthorized accounts from being opened without your knowledge or consent."]
    }), "\n", createVNode(_components.h2, {
      id: "why-do-i-need-a-credit-freeze",
      children: "Why do I Need a Credit Freeze?"
    }), "\n", createVNode(_components.p, {
      children: ["Credit freezes are free for all American citizens by ", createVNode(_components.a, {
        href: "https://www.consumer.ftc.gov/blog/2018/09/free-credit-freezes-are-here",
        children: "federal law."
      }), " ", createVNode(_components.strong, {
        children: "A credit freeze will stop a criminal who steals your identifying information from being able to open new accounts in your name"
      }), ", such as store credit cards and loans. According to the ", createVNode(_components.a, {
        href: "https://www.bjs.gov/index.cfm?ty=tp&tid=41",
        children: "Bureau of Justice"
      }), ", over 2/3 of identity theft victims lost more than $10,000 and had to spend hundreds of hours proving to the bank and police that the accounts were fraudulent. Identity theft isn\u2019t always about draining your existing bank account, it\u2019s often about opening new accounts to spend money that the criminal never intends to pay back but the bank expects you to be responsible for. Identity theft is an extremely long, complicated, frustrating, and exhausting experiences that can take months or even years to fix - if it ever gets fixed at all."]
    }), "\n", createVNode(_components.p, {
      children: ["In 2017, consumer credit scoring agency Equifax suffered a ", createVNode(_components.a, {
        href: "https://en.wikipedia.org/wiki/2017_Equifax_data_breach",
        children: "data breach"
      }), " that affected nearly half of all Americans. Additionally, many of us have shared personal information like birthdays and past addresses in ways that have ultimately found their way onto people search websites like Spokeo and Axciom. In other words: if you have an internet connection, it\u2019s highly likely that a criminal already has all the information about you they need to open a fraudulent account in your name. This is why every American reading this needs to freeze their credit."]
    }), "\n", createVNode(_components.h2, {
      id: "how-do-i-freeze-my-credit",
      children: "How do I Freeze my Credit?"
    }), "\n", createVNode(_components.p, {
      children: ["Freezing your credit must be done individually with each credit union: ", createVNode(_components.a, {
        href: "https://www.equifax.com/personal/credit-report-services/credit-freeze/",
        children: "Equifax"
      }), ", ", createVNode(_components.a, {
        href: "https://www.experian.com/freeze/center.html",
        children: "Experian"
      }), ", ", createVNode(_components.a, {
        href: "https://www.transunion.com/credit-freeze",
        children: "TransUnion"
      }), ". With Equifax and TransUnion, you will be required to create an account from which you will be able to unfreeze your credit as needed. Experian will send you a PIN in the mail that you must go online and provide in order to unfreeze your credit. Keep this PIN in a safe place. Credit can be unfrozen temporarily, and can be done at one or all agencies (but must be done individually with each agency). ", createVNode(_components.em, {
        children: "Note:"
      }), " There are other smaller credit and specialty agencies that accept account freezes. Unfortunately it would be nearly impossible for me to list them all here and keep up with new ones and how to apply freezes. I encourage you to do your own research and contact any company you think may have data about you to ask what their policies are regarding freezes."]
    }), "\n", createVNode(_components.p, {
      children: ["Unfortunately, some people have discovered that ", createVNode(_components.strong, {
        children: ["a freeze can be circumvented with enough cleverly-gathered information, so make sure to also place a ", createVNode(_components.a, {
          href: "https://consumer.ftc.gov/articles/what-know-about-credit-freezes-fraud-alerts",
          children: "fraud alert"
        }), "."]
      }), " A fraud alert is like ", createVNode(_components.a, {
        href: "/guides/most-important/mfa",
        children: "two-factor authentication"
      }), " for your credit; the agency being queried will call you and ask a few questions to verify that it is you authorizing the account (so be sure to provide a valid ", createVNode(_components.a, {
        href: "/guides/less-important/voip",
        children: "phone number"
      }), " during signup). While freezes last indefinitely, ", createVNode(_components.strong, {
        children: "fraud alerts need to be placed once every year."
      }), " I recommend setting a reminder so you don\u2019t forget to renew it each year. Fortunately they only need to be placed with one agency, and the alert will be passed around to the others."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "If you have children - even if they are minors - be sure to freeze their credit as well."
      }), " Identity theft of ", createVNode(_components.a, {
        href: "https://www.javelinstrategy.com/coverage-area/2018-child-identity-fraud-study",
        children: "minors"
      }), " is a lucrative and growing area of cybercrime because most children do not have any negative marks (except for not having any credit) and it can potentially take years for anyone to notice the crime has even occurred."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Once you have frozen your credit, be sure to request and examine a credit report from each agency regularly to check for any errors."
      }), " In the US you can do this for free once per week at ", createVNode(_components.a, {
        href: "https://www.annualcreditreport.com/index.action",
        children: "Annual Credit Report.com"
      }), " (this will give you the full report, but not the score, no account is required). I have found that due to my increased privacy lifestyle, I am sometimes forced to submit additional verification paperwork via \u201Csnail mail.\u201D Sometimes simply turning off my ", createVNode(_components.a, {
        href: "/guides/less-important/vpns",
        children: "VPN"
      }), " will be enough to let me do the entire process digitally. Regardless, in the past the conventional wisdom was to request each report once per year, staggering them every four months. This was because up until 2023, these reports were only available for free once per year. Since then, each credit agency has ", createVNode(_components.a, {
        href: "https://www.businessinsider.com/personal-finance/credit-bureaus-make-free-weekly-credit-reports-permanent-2023-9",
        children: "committed"
      }), " to providing them weekly. How often you should check them is up to you, though I would recommend at least once every four months as before."]
    })]
  });
}
function MDXContent$g(props = {}) {
  return createVNode(MDXLayout$g, {
    ...props,
    children: createVNode(_createMdxContent$g, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$g, "astro:jsx");
__astro_tag_component__(MDXContent$g, "astro:jsx");
const url$g = "/en/guides/most-important/credit";
const file$g = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/most-important/credit.mdx";
function rawContent$g() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$g() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$g = (props = {}) => MDXContent$g({
											...props,
											components: { Fragment, ...props.components },
										});
Content$g[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$g.layout);

const _page52 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$g,
  _internal: _internal$g,
  compiledContent: compiledContent$g,
  default: Content$g,
  file: file$g,
  frontmatter: frontmatter$g,
  getHeadings: getHeadings$g,
  rawContent: rawContent$g,
  url: url$g
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$f = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$f;
  content.file = file$f;
  content.url = url$f;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$f,
    url: url$f,
    content,
    frontmatter: content,
    headings: getHeadings$f(),
    "server:root": true,
    children
  });
};
const frontmatter$f = {
  "layout": "@layouts/guides.astro",
  "title": "Securing Mobile",
  "topic": "Securing Mobile Devices",
  "weight": 7,
  "draft": false
};
const _internal$f = {
  injectedFrontmatter: {}
};
function getHeadings$f() {
  return [{
    "depth": 1,
    "slug": "securing-mobile-introduction",
    "text": "Securing Mobile: Introduction"
  }, {
    "depth": 2,
    "slug": "android-or-ios",
    "text": "Android or iOS?"
  }];
}
function _createMdxContent$f(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    h2: "h2",
    a: "a"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "securing-mobile-introduction",
      children: "Securing Mobile: Introduction"
    }), "\n", createVNode(_components.p, {
      children: "Smartphones are the cutting edge of surveillance technology. For most people, their miniature super computers go with them everywhere, tracking your movements, communications, content intake, interests (via the apps downloaded and sites visited), and in many cases they even track health information like steps taken and sleep habits like morning alarms, even if you not specifically configured to do so."
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Imagine for a moment if your phone got lost."
      }), " Imagine a stranger picking up your phone and checking it. Maybe they\u2019re a good person trying to get it back its owner, but maybe they\u2019re not. They can see your banking app and maybe even access your account just by opening it. They can read all your texts and scroll through your images. They can even check your web history or map history. Losing your phone is more than an inconvenience or expense, it\u2019s a massive personal risk. ", createVNode(_components.strong, {
        children: "The biggest step you can take to minimize this surveillance and maximize your security is to become less dependent on your phone."
      }), " For example, if you\u2019re going to the grocery store like usual, you already know where it is. Leave the phone at home and taken a shopping list written manually on a slip of paper."]
    }), "\n", createVNode(_components.p, {
      children: ["Try as we might, sometimes we have no choice but to carry or use our phones. You may need it to navigate to a new place or be reachable while on the job. ", createVNode(_components.strong, {
        children: "The next best step is to minimize the data collected by your phone in the first place."
      }), " In this sub-chapter, I\u2019m going to share settings, apps, and general recommended behaviors for both iOS and Android that can be changed to maximize your privacy settings."]
    }), "\n", createVNode(_components.h2, {
      id: "android-or-ios",
      children: "Android or iOS?"
    }), "\n", createVNode(_components.p, {
      children: ["This debate raged since the beginning of smartphones. The truth is that these days, there is very little difference in the security of either device. (", createVNode(_components.a, {
        href: "https://www.wired.com/story/android-zero-day-more-than-ios-zerodium/",
        children: "Source"
      }), ") However, there are still a few differences between the devices worth considering."]
    }), "\n", createVNode(_components.p, {
      children: ["Androids are popular because they are inexpensive and offer much more customization than iOS. Androids allow for third-party app stores like F-Droid and \u201Csideloading\u201D apps directly without an app store, which can increase your privacy but also opens the possibility of installing a malicious app if you\u2019re not careful. Additionally, Google\u2019s process for vetting apps in the official Play Store is not very comprehensive compared to Apple\u2019s App Store, meaning that malicious apps in the official Play Store are relatively common. Androids do suffer from generally having a shorter support lifecycle - usually 2-3 years tops - and sometimes struggle with pushing out updates in a timely manner. This is due to the fact that Androids are made by a variety of manufacturers who must modify each new version to be compatible with their devices, thus extending the time between the upstream release and when it arrives in the hands of the end user. (", createVNode(_components.a, {
        href: "https://www.tomsguide.com/us/old-phones-unsafe,news-24846.html",
        children: "Source"
      }), ", ", createVNode(_components.a, {
        href: "https://9to5google.com/2023/01/18/android-13-device-distribution/",
        children: "source"
      }), ") If you choose to go the Android route, I strongly recommend the Google Pixel. They receive the longest support of any Android device (5 years for some models), have the best hardware security, get updates quicker than other manufacturers, and you won\u2019t get \u201Cbloatware\u201D apps installed or be submitting data to additional third parties like you would normally be involved if you got a device from a manufacturer like Samsung, Xiaomi, etc."]
    }), "\n", createVNode(_components.p, {
      children: ["iPhones are popular with the people who want a device that \u201Cjust works.\u201D Unlike Android, pushing out updates is incredibly fast because all devices are manufactured directly by Apple with very little variation between the hardware. Additionally, the Apple App store has a stricter approval system for apps than Google Play, meaning that it\u2019s harder to place malicious apps in the App Store than the Google Play Store. (", createVNode(_components.a, {
        href: "https://nordvpn.com/blog/ios-vs-android-security/",
        children: "Source"
      }), "). Malicious apps do sometimes still get through, but it\u2019s less common. Apple devices also tend to be supported for many years, sometimes 5 or 6 or more."]
    }), "\n", createVNode(_components.p, {
      children: ["Regarding data collection, I believe that Apple collects just as much information about you as Google does. The difference is that Apple does not rely on advertising as heavily as Google. While Apple does sell some ad space, the information primarily remains in-house for product improvement purposes. This is a very slight edge over Google, though with the changes recommended in the coming pages you can significantly reduce the data collected in both cases, making the choice largely personal preference in the end. Regardless of the device you choose, ", createVNode(_components.strong, {
        children: "I highly discourage you from ever jailbreaking or rooting your phone."
      }), " Compromising a phone like that disables many of the security features, prevents you from getting security updates, and generally makes you significantly more susceptible to malware."]
    })]
  });
}
function MDXContent$f(props = {}) {
  return createVNode(MDXLayout$f, {
    ...props,
    children: createVNode(_createMdxContent$f, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$f, "astro:jsx");
__astro_tag_component__(MDXContent$f, "astro:jsx");
const url$f = "/en/guides/most-important/mobile";
const file$f = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/most-important/mobile.mdx";
function rawContent$f() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$f() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$f = (props = {}) => MDXContent$f({
											...props,
											components: { Fragment, ...props.components },
										});
Content$f[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$f.layout);

const _page53 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$f,
  _internal: _internal$f,
  compiledContent: compiledContent$f,
  default: Content$f,
  file: file$f,
  frontmatter: frontmatter$f,
  getHeadings: getHeadings$f,
  rawContent: rawContent$f,
  url: url$f
}, Symbol.toStringTag, { value: 'Module' }));

const aegis = {
	name: "Aegis Authenticator",
	logo: "/images/logos/aegis.png",
	logo_alt: "Aegis Authenticator Logo",
	link: "https://getaegis.app/",
	pros: [
		"Available on [F-Droid](https://f-droid.org/en/packages/com.beemdevelopment.aegis/)",
		"Allows automatic backups (cloud only)"
	],
	cons: [
		"Android only"
	]
};
const ente = {
	name: "ente Authenticator",
	logo: "/images/logos/ente.png",
	logo_alt: "ente Authenticator logo",
	link: "https://github.com/ente-io/auth#readme",
	pros: [
		"Available on Android & iOS",
		"Available on F-Droid"
	],
	cons: [
		"ente account required (free for now but plans to charge in the future)"
	]
};
const data = {
	"2fas": {
	name: "2FAS",
	logo: "/images/logos/2fas.png",
	logo_alt: "2FAS logo",
	link: "https://2fas.com/",
	pros: [
		"Available on Android & iOS",
		"Can sync with Mac via browser extension and shared clipboard (see Cons)"
	],
	cons: [
		"Not available on F-Droid",
		"Device sync requires iCloud, data not encrypted even with [Advanced Data Protection](/guides/most-important/mobile-settings)"
	]
},
	aegis: aegis,
	ente: ente
};

const MDXLayout$e = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$e;
  content.file = file$e;
  content.url = url$e;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$e,
    url: url$e,
    content,
    frontmatter: content,
    headings: getHeadings$e(),
    "server:root": true,
    children
  });
};
const frontmatter$e = {
  "layout": "@layouts/guides.astro",
  "title": "Data Breach Defense: Multifactor Authentication",
  "topic": "Multifactor Authentication",
  "weight": 4,
  "draft": false
};
const _internal$e = {
  injectedFrontmatter: {}
};
function getHeadings$e() {
  return [{
    "depth": 1,
    "slug": "data-breach-defense-multifactor-authentication",
    "text": "Data Breach Defense: Multifactor Authentication"
  }, {
    "depth": 2,
    "slug": "what-is-multifactor-authentication",
    "text": "What is Multifactor Authentication?"
  }, {
    "depth": 2,
    "slug": "why-do-i-need-multifactor-authentication",
    "text": "Why do I Need Multifactor Authentication?"
  }, {
    "depth": 2,
    "slug": "what-should-i-look-for-in-a-multifactor-authentication-solution",
    "text": "What Should I Look For in a Multifactor Authentication Solution?"
  }, {
    "depth": 2,
    "slug": "honorable-mention-security-tokens",
    "text": "Honorable Mention: Security Tokens"
  }, {
    "depth": 2,
    "slug": "other-forms-of-authentication",
    "text": "Other Forms of Authentication"
  }, {
    "depth": 2,
    "slug": "getting-started",
    "text": "Getting Started"
  }, {
    "depth": 2,
    "slug": "tips--tricks",
    "text": "Tips & Tricks"
  }];
}
function _createMdxContent$e(props) {
  const _components = Object.assign({
    h1: "h1",
    h2: "h2",
    p: "p",
    strong: "strong",
    a: "a",
    em: "em"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "data-breach-defense-multifactor-authentication",
      children: "Data Breach Defense: Multifactor Authentication"
    }), "\n", createVNode(_components.h2, {
      id: "what-is-multifactor-authentication",
      children: "What is Multifactor Authentication?"
    }), "\n", createVNode(_components.p, {
      children: "Multifactor authentication is when a service requries an extra step to authenticate you during login aside from simply username and password. This could take the form of a text message, a code generated by an app (sometimes called by its technical name \u201CTOTP,\u201D or \u201CTimed One-Time Password\u201D), a push notification, a hardware device, or even biometric authentication."
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "There are multiple factors of authentication,"
      }), " but this site addresses the two most common: something you know and something you have. ", createVNode(_components.strong, {
        children: "Something you know"
      }), " is the username and password, while ", createVNode(_components.strong, {
        children: "something you have"
      }), " is typically the six-digit code you have on your device or a security token (discussed further down). When only two forms of authentication are required, it is considered \u201Ctwo-factor\u201D authentication (often abbreviated as 2FA). When more than two forms of authentication are required, it is \u201Cmulti-factor\u201D authentication, or MFA. Technically all 2FA is MFA, but not all MFA is 2FA."]
    }), "\n", createVNode(_components.h2, {
      id: "why-do-i-need-multifactor-authentication",
      children: "Why do I Need Multifactor Authentication?"
    }), "\n", createVNode(_components.p, {
      children: ["According to ", createVNode(_components.a, {
        href: "https://www.microsoft.com/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/",
        children: "Microsoft"
      }), ", this one technique can stop up to 99.9% of unauthorized account accesses. With MFA enabled, even if an attacker gets your username and password they would still be unable to login without the second factor."]
    }), "\n", createVNode(_components.h2, {
      id: "what-should-i-look-for-in-a-multifactor-authentication-solution",
      children: "What Should I Look For in a Multifactor Authentication Solution?"
    }), "\n", createVNode(_components.p, {
      children: ["When picking an MFA solution, ", createVNode(_components.strong, {
        children: "be sure to pick something you will use consistently."
      }), " For example, if you need the ability to log into your account from any computer at any given time, a hardware key may not be convenient for you. You should also avoid SMS 2FA whenever possible because it is relatively easy for an attacker to steal your phone number and recieve the incoming 2FA text. Use SMS if nothing else is available, but use something better if you have the option. Lately push notifications have also become a risk in attack known as \u201D", createVNode(_components.a, {
        href: "https://portswigger.net/daily-swig/mfa-fatigue-attacks-users-tricked-into-allowing-device-access-due-to-overload-of-push-notifications",
        children: "MFA fatigue"
      }), "\u201D in which the attacker will spam the user with requests until the user either accepts the login to make the requests stop, or accidentally accepts one. The order of recommended 2FA methods from strongest to weakest are hardware keys, TOTP, push notifications, email (especially if secured with TOTP or better), and finally SMS. TOTP will be the sweet spot for most people."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "Listed in alphabetical order, not order of recommendation"
      })
    }), "\n", createVNode($$ProsAndCons, {
      data: data,
      headingLevel: 4
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: createVNode(_components.a, {
          href: "https://gitlab.com/thenewoil/website/-/wikis/Multifactor-Authentication-Criteria",
          children: "Click here to see my criteria for selecting these services"
        })
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: createVNode(_components.a, {
          href: "/charts/mfa",
          children: "Click here for a visual version of this chart"
        })
      })
    }), "\n", createVNode(_components.h2, {
      id: "honorable-mention-security-tokens",
      children: "Honorable Mention: Security Tokens"
    }), "\n", createVNode(_components.p, {
      children: ["For most people TOTP will provide the best blend of security and convenience. However, for those who require additional protection many security tokens exist that provide maximum protection at very little additional cost and effort. Security tokens (sometimes called \u201Csecurity keys\u201D) are physical devices that plug into your computer via USB. If an account is configured to use a security token, the device must be plugged in rather than entering a code. They are nearly perfect additional security because they can\u2019t be remotely hijacked or phished the way that other keys can, but are susceptible to loss and damage in ways that other keys are not. Some of the more commonly recommended security tokens include ", createVNode(_components.a, {
        href: "https://onlykey.io/",
        children: "OnlyKey"
      }), " and ", createVNode(_components.a, {
        href: "https://www.yubico.com/",
        children: "Yubikey"
      }), ". Less common but source available options include the ", createVNode(_components.a, {
        href: "https://shop.nitrokey.com/shop?aff_ref=14",
        children: "Nitrokey"
      }), " (", createVNode(_components.a, {
        href: "https://www.nitrokey.com/",
        children: "non-affiliate link"
      }), ") and ", createVNode(_components.a, {
        href: "https://solokeys.com/",
        children: "SoloKey"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "other-forms-of-authentication",
      children: "Other Forms of Authentication"
    }), "\n", createVNode(_components.p, {
      children: ["As mentioned above, there are many additional forms of authentication, including ", createVNode(_components.strong, {
        children: createVNode(_components.em, {
          children: "something you are"
        })
      }), " (biometric identification like fingerprint or iris scans) and ", createVNode(_components.strong, {
        children: createVNode(_components.em, {
          children: "somewhere you are"
        })
      }), " (a website that requires your IP address to match your area of residence or work, for example). Personally, I don\u2019t recommend using these when the option exists for various reasons. Factors like ", createVNode(_components.strong, {
        children: createVNode(_components.em, {
          children: "somewhere you are"
        })
      }), " can be highly invasive and can thwart other privacy strategies I recommend, like the use of a ", createVNode(_components.a, {
        href: "/guides/less-important/vpns",
        children: "VPN"
      }), ". ", createVNode(_components.strong, {
        children: createVNode(_components.em, {
          children: "Something you are"
        })
      }), " is widely considered secure because the resources required to spoof a person\u2019s biometric identity are typically intense and reserved only for high-level threats. However it is worth noting that historically these kinds of things become less difficult over time and if your biometric information gets ", createVNode(_components.a, {
        href: "/guides/most-important/data-breaches",
        children: "leaked"
      }), " then you can\u2019t change them the same way you can change a password or OTP key (software/hardware token). As I\u2019ve said before, the most important thing is that you find a 2FA solution that you will use consistently, so if these are the only solutions that work for you then I would recommend them, however I would encourage you to stick to ", createVNode(_components.strong, {
        children: createVNode(_components.em, {
          children: "something you have"
        })
      }), " whenever possible. (It\u2019s the most widely supported anyways.)"]
    }), "\n", createVNode(_components.h2, {
      id: "getting-started",
      children: "Getting Started"
    }), "\n", createVNode(_components.p, {
      children: ["MFA can typically be enabled under the \u201CSecurity\u201D settings of your account, though it may sometimes be under a similar but different setting such as \u201CLogin\u201D or \u201CAccount.\u201D It also sometimes goes by other names such as \u201Ctwo-step login\u201D or \u201CAuthenticator App.\u201D Some websites will explicitly list Google Authenticator, but any two-factor app listed here will work. ", createVNode(_components.strong, {
        children: "I suggest you stop what you\u2019re doing immediately and enable MFA for your most critical accounts."
      }), " Bank, email, and other accounts you can\u2019t afford to live without. Do it right now before you do anything else."]
    }), "\n", createVNode(_components.p, {
      children: "For the rest of your accounts, I recommend enabling MFA \u201Cas you go.\u201D This means you enable on a per-account basis as you login or use it. For example, next time you log into eBay, enable MFA. Then, next time you log into Discord, enable MFA. In time every account will have a unique, strong password."
    }), "\n", createVNode(_components.h2, {
      id: "tips--tricks",
      children: "Tips & Tricks"
    }), "\n", createVNode(_components.p, {
      children: ["Most sites have an option during the second login screen to \u201Cremember this device for 30 days\u201D or something similar. This will keep you logged in without requiring your MFA code for the indicated amount of time. In the past I recommended this with some caveats, but I no longer recommend this due to a rise in malware that can steal your ", createVNode(_components.a, {
        href: "https://eclypses.com/news/cyber-criminals-defeating-2fa-security/",
        children: "authentication cookies"
      }), ", allowing an attacker to bypass the login process entirely."]
    }), "\n", createVNode(_components.p, {
      children: "Logging in every time will not protect you completely against this type of attack, but it can potentially prevent an attacker from stealing every single account cookie instead of just the ones that you logged into while your device was infected."
    }), "\n", createVNode(_components.p, {
      children: ["When you sign up for MFA, most sites will issue you backup codes. Be sure to write these down somewhere safe in case you lose your MFA device. I recommend saving them in the notes section of your ", createVNode(_components.a, {
        href: "/guides/most-important/passwords",
        children: "password manager"
      }), ", but beware that this does potentially create a single point of failure. Be sure to take extra precautions if you do this."]
    }), "\n", createVNode(_components.p, {
      children: "Some password managers offer the ability to store your MFA key to make your login process more convenient. This can be helpful, but just as with saving your backup codes, you\u2019re creating a single point of failure. Make sure you\u2019re taking extra precautions if this is the path you decide to take."
    }), "\n", createVNode(_components.p, {
      children: "If using a hardware token, I recommend buying two copies and keeping the second in a safe place as a backup in case the first one gets broken. Just as with other kinds of data backups, be sure to keep it regularly updated."
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.a, {
        href: "https://2fa.directory/",
        children: "2FA Directory"
      }), " is a useful website to see if services you use or are considering using allow two-factor authentication and which kind."]
    })]
  });
}
function MDXContent$e(props = {}) {
  return createVNode(MDXLayout$e, {
    ...props,
    children: createVNode(_createMdxContent$e, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$e, "astro:jsx");
__astro_tag_component__(MDXContent$e, "astro:jsx");
const url$e = "/en/guides/most-important/mfa";
const file$e = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/most-important/mfa.mdx";
function rawContent$e() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$e() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$e = (props = {}) => MDXContent$e({
											...props,
											components: { Fragment, ...props.components },
										});
Content$e[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$e.layout);

const _page54 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$e,
  _internal: _internal$e,
  compiledContent: compiledContent$e,
  default: Content$e,
  file: file$e,
  frontmatter: frontmatter$e,
  getHeadings: getHeadings$e,
  rawContent: rawContent$e,
  url: url$e
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$d = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$d;
  content.file = file$d;
  content.url = url$d;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$d,
    url: url$d,
    content,
    frontmatter: content,
    headings: getHeadings$d(),
    "server:root": true,
    children
  });
};
const frontmatter$d = {
  "layout": "@layouts/guides.astro",
  "title": "Streamer Guide",
  "draft": false
};
const _internal$d = {
  injectedFrontmatter: {}
};
function getHeadings$d() {
  return [{
    "depth": 1,
    "slug": "the-content-creators-quickstart-guide-to-cybersecurity-and-internet-safety",
    "text": "The Content Creator\u2019s Quickstart Guide to Cybersecurity and Internet Safety"
  }, {
    "depth": 2,
    "slug": "step-1-picking-an-identity",
    "text": "Step 1: Picking an Identity"
  }, {
    "depth": 2,
    "slug": "step-2-picking-your-platforms",
    "text": "Step 2: Picking Your Platforms"
  }, {
    "depth": 2,
    "slug": "step-3-secure-your-accounts",
    "text": "Step 3: Secure Your Accounts"
  }, {
    "depth": 2,
    "slug": "step-4-online-data",
    "text": "Step 4: Online Data"
  }, {
    "depth": 2,
    "slug": "have-fun",
    "text": "Have Fun"
  }];
}
function _createMdxContent$d(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    h2: "h2",
    a: "a"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "the-content-creators-quickstart-guide-to-cybersecurity-and-internet-safety",
      children: "The Content Creator\u2019s Quickstart Guide to Cybersecurity and Internet Safety"
    }), "\n", createVNode(_components.p, {
      children: "In recent years, there\u2019s been an explosion of people wanting to become content creators: streamers, TikTokers, influencers, etc. But you may be surprised to learn that even this seemingly-benign career choice can come with risks: stalkers, trolls, and haters abound. If you plan to pursue a career in the spotlight, you\u2019ll want to take some extra precautions to protect yourself."
    }), "\n", createVNode(_components.h2, {
      id: "step-1-picking-an-identity",
      children: "Step 1: Picking an Identity"
    }), "\n", createVNode(_components.p, {
      children: ["I strongly discourage any aspiring public figure from using their real names. This goes for any kind of public-facing persona. See, for example, Texas politician \u201CTed\u201D Cruz, whose real name is Rafael. This is especially important if you have a very unique name or a name with a unique spelling. Depending on the industry you wish to enter, the type of name you can pick varies wildly. If you\u2019re planning to be a streamer or online figure, you can easily get away with using a handle as your identifier. Other industries may require a more realistic sounding name. In these cases, I recommend either making one up wholesale (I recommend ", createVNode(_components.a, {
        href: "https://www.behindthename.com/random/",
        children: "Behind the Name\u2019s Random Name Generator"
      }), " because it provides a variety of names from multiple countries and ethnicities) or going by a nickname (ex, \u201CNick\u201D instead of \u201CNicholas\u201D) or middle name. A fully fake name is preferred, but all options have their advantages."]
    }), "\n", createVNode(_components.p, {
      children: "Going forward, this will become your new identity online. If you plan to need a mailing address for this identity - like to receive checks or gifts from fans - I recommend purchasing a PO Box. Depending on who you go with, they may require you to register a legal entity or provide additional paperwork to receive mail in another name. Be sure to ask about this. If you live in a small town and don\u2019t want your target audience to know this, be sure to get a PO Box in a nearby town, preferrably a major town with a large population if you\u2019re willing to make the trip regularly."
    }), "\n", createVNode(_components.p, {
      children: "You may also wish to change other details about yourself or fuzz them. For example, instead of saying you\u2019re from \u201COrlando, Florida\u201D say you\u2019re from Central Florida (this could include the Tampa area). This is particularly important if you\u2019re from a small town as menteioned before. Try avoid giving out your exact age or celebrating your real birthday. These may seem like small things, but a dedicated stalker could piece all of this information together to not only track you down, but confirm that they\u2019re on the right track. If you want, you can even lie and say you\u2019re from New York, but make sure to keep your story straight. This should also extend to include any visual information. For example, if you live in Orlando (as mentioned above), you may want to put a New York Yankees hat in the background to make people think you\u2019re from New York. Again, make sure to keep your story straight. Don\u2019t say it was hot out today if it was snowing in New York."
    }), "\n", createVNode(_components.h2, {
      id: "step-2-picking-your-platforms",
      children: "Step 2: Picking Your Platforms"
    }), "\n", createVNode("img", {
      src: "/images/graphics/influencer.jpg",
      alt: "Woman adjusting a camera and light",
      class: "float-right mx-6 w-80"
    }), "\n", createVNode(_components.p, {
      children: "When it comes to protecting yourself online, less is more. Fewer accounts not only means less work to keep them updated, but also less risk of data breach or accidentally sharing something you didn\u2019t want to. Before you start building your online presence, ask yourself what platforms or support methods you really need and stick to just those ones. This is also true for support methods like Patreon or Venmo. These services require your real name and information, and if they ever suffer a data breach it may be possible to correlate your real name with your persona. Also be mindful of how these platforms display your data. For example, until recently Venmo did not provide a way to hide your transactions or friends list at all. Even now, these are visible by default. We\u2019ll talk about changing the settings of your accounts in Step 3."
    }), "\n", createVNode(_components.p, {
      children: "As you pick your platforms and start to sign up for them, remember that you should have picked a name for your public persona that is different than your own real identity. This means you shouldn\u2019t simply reuse your existing personal accounts, you should sign up for all new ones using this new identity. With this mind, I have two suggestions to help keep your two identities separate in the event of a data breach or hack on the website\u2019s end."
    }), "\n", createVNode(_components.p, {
      children: ["First, I encourage you to switch to an ", createVNode(_components.a, {
        href: "/guides/moderately-important/email",
        children: "encrypted email provider"
      }), ". I\u2019ll talk about why in Step 3. Whether you do that or not, I also strongly recommend using a ", createVNode(_components.a, {
        href: "/guides/moderately-important/email-masking",
        children: "email forwarding service"
      }), ". If you use the same email address everywhere - including in your personal life - your persona can be tied to your real identity through the dozens of perfectly free and legal sites that exist where you can simply enter an email address and see where else a person has an account. (Note: if you\u2019ve been using the same email address for a long period of time, it\u2019s likely already been caught up in a data breach.) An email forwarding service will give you a near-infinite number of email addresses you can use to outsmart both data breaches and search sites, but they\u2019ll all forward straight to your regular inbox for easy management. (You can also use such a service to manage spam when you sign up for newsletters, order things online, etc.)"]
    }), "\n", createVNode(_components.p, {
      children: ["Next, I encourage you to use a ", createVNode(_components.a, {
        href: "/guides/less-important/voip",
        children: "Voice-over-IP"
      }), " phone number. You may already be familiar with these in the form of Google Voice. Google Voice is convenient because it simply can forward calls and messages to your existing number, but there are plenty of other options out there that offer better privacy and additional useful features. Unfortunately, many websites like Twitter will not accept a VoIP number for verification. There are ways around this if you\u2019re willing to put in the effort, but in most cases this is probably not a big deal as you can change the number after you\u2019ve been verified. Remember: the goal is to not get caught up in data breaches and to not put your real SIM phone number somewhere publicly visible. In addition to being a dead-simple way to track someone (one private citizen ", createVNode(_components.a, {
        href: "https://www.vice.com/en/article/nepxbz/i-gave-a-bounty-hunter-300-dollars-located-phone-microbilt-zumigo-tmobile",
        children: "reported"
      }), " being able to buy realtime phone location data for as little as $300), your SIM phone number can also be taken over in a SIM-swapping attack (a very easy, non-technical attack where the attacker simply convinces the phone company that they are you and ports the number to their device), thereby allowing them to get all your phone calls, text messages, etc."]
    }), "\n", createVNode(_components.h2, {
      id: "step-3-secure-your-accounts",
      children: "Step 3: Secure Your Accounts"
    }), "\n", createVNode(_components.p, {
      children: ["Next, you\u2019ll want to secure all of your accounts. It would be awful to build up a loving, dedicated audience and then lose access to your accounts where someone can take advantage of your fans - posting spam, scams, or simply just content you don\u2019t agree with. This could be devestating to your community. Start by learning the value of ", createVNode(_components.a, {
        href: "/guides/most-important/passwords",
        children: "strong passwords"
      }), ". Using a password manager, be sure that you\u2019ve got strong, unique passwords on every site (details about all of this are outlined on the page I linked). Once you\u2019ve done that, be sure to harden all your accounts and make them nearly unhackable by using ", createVNode(_components.a, {
        href: "/guides/most-important/mfa",
        children: "two-factor authentication"
      }), ", preferrably TOTP (app-based) or hardware token. Try to avoid SMS if possible. Again, all this is detailed on the page I linked. Doing these two things will make all your accounts virtually unhackable. You should also be sure to check the settings of your accounts: what profile information is shared publicly by default? What settings can you restrict or avoid filling out to further protect your privacy? Remember not to stop at your public-facing accounts - like Discord or Twitch - but also secure your behind-the-scenes accounts like your email, any sponsorship sites, anywhere it\u2019s offered. I strongly encourage you to practice this stuff in your personal life, too."]
    }), "\n", createVNode("img", {
      src: "/images/graphics/influencer2.jpg",
      alt: "Man sitting typing on a phone",
      class: "float-left mx-6 w-80"
    }), "\n", createVNode(_components.p, {
      children: ["This brings us back to email, so let me explain here why I encouraged the use of\nan encrypted email provider. With a traditional email provider - like Gmail - your\ninbox is not encrypted against the company. This means that if your email provider\never suffers a data breach - or gets compromised by a ", createVNode(_components.a, {
        href: "https://www.lawinsider.com/dictionary/rogue-employee",
        children: "rogue employee"
      }), ",\nwhich are unfortunately on the rise - your email contents can be exposed. That includes\nbank statements, event reminders, contracts, or even personal correspondence. This\nis not just a possibility, it\u2019s actually ", createVNode(_components.a, {
        href: "https://www.bitdefender.com/blog/hotforsecurity/former-yahoo-employee-admits-he-hacked-6000-users-accounts-stole-nude-photos-and-videos",
        children: "happened"
      }), "\nbefore and could again at any time. When you use one of the encrypted email providers\nI recommended in Step 2, this is no longer possible. These companies encrypt your\ninbox in such a way that nobody - not even the employees - can access your inbox.\nThis protects your content from both data breaches and rogue employees."]
    }), "\n", createVNode(_components.h2, {
      id: "step-4-online-data",
      children: "Step 4: Online Data"
    }), "\n", createVNode(_components.p, {
      children: "You\u2019re almost ready to start sharing yourself with the world, but you still have a few considerations to tackle. For starters, when you start your new venture you may be tempted to share with friends and family. This may be a good idea, but know that they are a weak spot. For example, your family may not remember to use your fake name when they talk about you. Or, as another example, they may share your content online and say \u201Cmy son/daughter/brother/sister/etc did this!\u201D Did you know that for most people, vast amounts of personal data are freely available online to anyone who uses the right search terms? A potential stalker who sees your parent\u2019s status and Googles them may find your name listed as their child."
    }), "\n", createVNode(_components.p, {
      children: "The best defense here is to stress how you want people to refer to you. Remind them that you\u2019re building a brand. It\u2019s not just about privacy, it\u2019s about making sure people know how to find you and follow your content. Using myself an example, I don\u2019t want people to follow Nate, I want them to follow The New Oil. That\u2019s where the real content is."
    }), "\n", createVNode(_components.p, {
      children: ["My last piece of advice here is to use online moderation tools to your advantage. Sites like Twich and YouTube allow you to block certain words. This is the perfect place to enter - among other things - your real name and address. Anyone attempting to ", createVNode(_components.a, {
        href: "https://www.avast.com/c-what-is-doxxing",
        children: "dox"
      }), " you will either not be able to send the message, or the message will be invisible to others. As you grow, let your community moderators and other staff members know how to respond to such attempts. Maybe they should spam the chat with messages until your data is offscreen. Or perhaps they should lie and say that they know your real name and that isn\u2019t it. There are many options."]
    }), "\n", createVNode(_components.p, {
      children: ["Finally, I would like to offer you two tools to help reduce your odds of being doxxed by removing your personal data from public searches. These tools are not bulletproof, and may require a lot of time and work, but if you have the resources to put into them, they will almost certainly reduce the odds of your data being found so easily. The first tool is data removal services like Abine\u2019s ", createVNode(_components.a, {
        href: "https://joindeleteme.com/",
        children: "DeleteMe"
      }), " or ", createVNode(_components.a, {
        href: "https://easyoptouts.com/",
        children: "EasyOptOuts"
      }), ". The other tool is the ability to do it yourself using ", createVNode(_components.a, {
        href: "https://joindeleteme.com/help/diy-free-opt-out-guide/",
        children: "their guide"
      }), " or Michael Bazzell\u2019s guide ", createVNode(_components.a, {
        href: "https://inteltechniques.com/workbook.html",
        children: "here"
      }), ". This can be a lot of work or money depending on your situation, but also depending on your situation it may be right for you."]
    }), "\n", createVNode(_components.h2, {
      id: "have-fun",
      children: "Have Fun"
    }), "\n", createVNode(_components.p, {
      children: ["This is the tip of the iceberg. There\u2019s a lot more you can do to protect yourself from all kinds of tracking - this website is full of fundamental, foundational advice to get you started if you want to learn more - but I think this information should get you off to a solid start. Using this information, you\u2019ll be able to defend against most attackers - the \u201D", createVNode(_components.a, {
        href: "https://www.techtarget.com/searchsecurity/definition/script-kiddy-or-script-kiddie",
        children: "script kiddies"
      }), "\u201D who are just bored or angry and looking to mess with someone, as well as the unsophisticated stalkers and doxxers who have very little in the way of time or resources to truly unmask your identity and harass you further. With this off your plate, you should be free to focus more time and attention on building your brand, your community, and enjoying your work.\nAnd by all means, if you have any questions or want to learn more, don\u2019t hesitate to ", createVNode(_components.a, {
        href: "/links",
        children: "contact me"
      }), "."]
    })]
  });
}
function MDXContent$d(props = {}) {
  return createVNode(MDXLayout$d, {
    ...props,
    children: createVNode(_createMdxContent$d, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$d, "astro:jsx");
__astro_tag_component__(MDXContent$d, "astro:jsx");
const url$d = "/en/guides/quick-start/streamer-guide";
const file$d = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/quick-start/streamer-guide.mdx";
function rawContent$d() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$d() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$d = (props = {}) => MDXContent$d({
											...props,
											components: { Fragment, ...props.components },
										});
Content$d[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$d.layout);

const _page55 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$d,
  _internal: _internal$d,
  compiledContent: compiledContent$d,
  default: Content$d,
  file: file$d,
  frontmatter: frontmatter$d,
  getHeadings: getHeadings$d,
  rawContent: rawContent$d,
  url: url$d
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$c = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$c;
  content.file = file$c;
  content.url = url$c;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$c,
    url: url$c,
    content,
    frontmatter: content,
    headings: getHeadings$c(),
    "server:root": true,
    children
  });
};
const frontmatter$c = {
  "layout": "@layouts/guides.astro",
  "title": "Wifi Guide",
  "draft": false
};
const _internal$c = {
  injectedFrontmatter: {}
};
function getHeadings$c() {
  return [{
    "depth": 1,
    "slug": "securing-your-home-network",
    "text": "Securing Your Home Network"
  }, {
    "depth": 2,
    "slug": "terminology",
    "text": "Terminology"
  }, {
    "depth": 2,
    "slug": "picking-a-router",
    "text": "Picking a Router"
  }, {
    "depth": 2,
    "slug": "network-best-practices",
    "text": "Network Best Practices"
  }, {
    "depth": 2,
    "slug": "behind-the-scenes-best-practices",
    "text": "Behind-the-Scenes Best Practices"
  }];
}
function _createMdxContent$c(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    h2: "h2",
    ul: "ul",
    li: "li",
    strong: "strong",
    em: "em",
    a: "a"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "securing-your-home-network",
      children: "Securing Your Home Network"
    }), "\n", createVNode(_components.p, {
      children: "For many of us, our home networks have become a vital part of our home. From relaxing and watching Netflix on a weekend evening to working from home, it\u2019s our gateway to the rest of the world. But it can also be our weakest link in keeping ourselves safe and private. The internet is a large, dangerous place, and our network configurations can either protect us from all that danger or invite it in. A compromised network can be abused to steal your sensitive information, plant malware, or turn your devices into cryptominers and bots, resulting in decreased performance and possibly even legal troubles. In this guide, I seek to share some easy practices to help secure your network against dangers and keep you safe regardless of whether you\u2019re gaming, streaming, or working."
    }), "\n", createVNode(_components.h2, {
      id: "terminology",
      children: "Terminology"
    }), "\n", createVNode(_components.p, {
      children: "You don\u2019t necessarily have to read every word of this section, especially if you already know this stuff, but if you find yourself confused by any of the words used in this article, feel free to check back here and reference them."
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Flashing:"
        }), " The process of installing a new firmware on a device, such as a custom ROM onto a phone or a new operating system onto a router."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Gateway:"
        }), " a dual router/modem. These days, most devices are gateways."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "ISP:"
        }), " Internet Service Provider. This could be Spectrum, AT&T, Google Fiber, or perhaps a local company. It\u2019s whoever you pay your bill to so that you have internet access."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "LAN:"
        }), " Local Area Network. This is everything inside your home, everything before you hit the WAN. If the internet suddenly went out (but the power stayed on), you would still be able to access everything inside the LAN with no issues. This could include things like wireless printing or controlling your Smart device from your phone."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Modem:"
        }), " the device that connects your LAN to the WAN."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Router:"
        }), " the device that organizes and directs traffic within your home. The router is what makes sure that the search engine you tried to access on your smartphone loads on your smartphone while the movie you just selected on your TV loads on your TV. These days most routers are actually dual router/modems called ", createVNode(_components.em, {
          children: "gateways"
        }), ". (Author\u2019s note: I will be using the term \u201Crouter\u201D in this article because it is the word most people are already familiar with, but unless otherwise specified I am referring to the gateway.)"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "SSID:"
        }), " Service Set Identifier. You likely know this better as your \u201CWiFi.\u201D It\u2019s the name you give to your network so people can select the right network, such as \u201CSmith", createVNode(_components.em, {
          children: "Household\u201D or \u201CFBI Surveillance Van.\u201D (Personal note from the author: _PLEASE"
        }), " stop using this one. It\u2019s not original or clever, I see at literally every apartment complex I go to.)"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "WAN:"
        }), " Wide Area Network. This is the internet, everything outside your home. This includes things like your email, streaming services, and more."]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "picking-a-router",
      children: "Picking a Router"
    }), "\n", createVNode(_components.p, {
      children: ["Most of the time, at least in the US, subscribing to internet service often means that your ISP will provide a router for you. I strongly advise against using this router alone. In many cases, it is heavily locked down and you cannot make any meaningful changes to the settings. Even if you can, the ISP can and likely is spying on your traffic. In some cases this is to ", createVNode(_components.a, {
        href: "https://www.ghacks.net/2008/04/17/is-your-isp-injecting-ads-on-websites-you-visit/",
        children: "serve you their own ads"
      }), ", in some cases it\u2019s to detect piracy and illegal downloads, and in many cases it may be to ", createVNode(_components.a, {
        href: "https://www.washingtonpost.com/news/the-switch/wp/2017/03/29/what-to-expect-now-that-internet-providers-can-collect-and-sell-your-web-browser-history/",
        children: "sell your browsing history"
      }), " to data brokers. Using your own router gives you signficantly more tools at your disposal to protect against these pivacy invasions."]
    }), "\n", createVNode(_components.p, {
      children: ["There are a number of open-source options for routers that will take even a small consumer router and turn it into a powerful device with enterprise-level capabilities. My personal favorite is ", createVNode(_components.a, {
        href: "https://dd-wrt.com/",
        children: "DD-WRT"
      }), ", but other popular options include ", createVNode(_components.a, {
        href: "https://www.pfsense.org/",
        children: "pfSense"
      }), ", ", createVNode(_components.a, {
        href: "https://openwrt.org/",
        children: "OpenWRT"
      }), ", and ", createVNode(_components.a, {
        href: "https://freshtomato.org/",
        children: "Tomato"
      }), ". While you can buy pre-flashed devices in some cases (", createVNode(_components.a, {
        href: "https://www.flashrouters.com/",
        children: "FlashRouters"
      }), " for DD-WRT and ", createVNode(_components.a, {
        href: "https://protectli.com/",
        children: "Protectli"
      }), " for pfSense), I always encourage you to do it yourself if you\u2019re comfortable to ensure maximum security (and also to be familiar with the update process). Having said all of this, if you are unsure if an open source router is right for you (the wealth of options can be overwhelming to some), I still encourage you to get a router that wasn\u2019t provided by your ISP. Make sure it offers VLANs and VPN capabilities, as we will be using these heavily to protect your home."]
    }), "\n", createVNode(_components.h2, {
      id: "network-best-practices",
      children: "Network Best Practices"
    }), "\n", createVNode(_components.p, {
      children: ["Be sure to change any default passwords, especially the default password to log in to the router and the default password of your SSID (especially if you choose not to change the SSID itself). See my page on ", createVNode(_components.a, {
        href: "/guides/most-important/passwords",
        children: "passwords"
      }), " for more information on what makes a good password and how to remember them."]
    }), "\n", createVNode(_components.p, {
      children: "If your router offers multiple encryption options for your WiFi, be sure to pick \u201CWPA3\u201D with \u201CAES\u201D and \u201CTKIP\u201D if available. WPA3 a relatively new protocol, so your router may not offer it. If not, \u201CWPA2\u201D should be available. Avoid WPA and WEP if offered."
    }), "\n", createVNode(_components.p, {
      children: ["Be sure to create separate VLANs (or subnets, if your router doesn\u2019t offer VLANs) for different purposes: one for ", createVNode(_components.a, {
        href: "/guides/less-important/iot",
        children: "IoT devices"
      }), ", one for gaming consoles, one for desktop devices, etc. This will ensure that if one device gets compromised, the impact will be contained. (", createVNode(_components.em, {
        children: "Tip"
      }), ": If your router does not offer VLANs/subnets, I recommend putting all your IoT devices on the guest network.)"]
    }), "\n", createVNode(_components.p, {
      children: "For your SSID, it makes no real difference if you choose to hide it or not. Even a relatively unskilled attacker can easily scan for and find hidden networks. I do, however, recommend that you avoid an SSID with any identifying information such as \u201CSmith House\u201D or \u201CApt23B.\u201D (For the record, this alone will not stop a dedicated stalker, but there\u2019s no need to just hand out that information to everyone unsolicited.)"
    }), "\n", createVNode(_components.p, {
      children: ["For your guest WiFi, I recommend using a passphrase (five or more randomly chosen words) insead of a password. It will be just as strong as a password, but significantly easier to share. (", createVNode(_components.em, {
        children: "Tip"
      }), ": use a QR-code generating website such as ", createVNode(_components.a, {
        href: "https://www.qr-code-generator.com/",
        children: "this one"
      }), " to generate a QR code that your guests can simply scan with their device\u2019s camera to instantly and easily connect to the guest network.)"]
    }), "\n", createVNode(_components.h2, {
      id: "behind-the-scenes-best-practices",
      children: "Behind-the-Scenes Best Practices"
    }), "\n", createVNode(_components.p, {
      children: "Be sure to always keep your device updated with the most recent updates to patch any security issues. If the device offers auto-updates, enable it. If it does not, set a reminder to check at least once a month."
    }), "\n", createVNode(_components.p, {
      children: ["I recommend putting a ", createVNode(_components.a, {
        href: "/guides/less-important/vpns",
        children: "VPN"
      }), " on your router. This will offer a small amount of protection to every device in your home, including those that can\u2019t natively load a VPN (such as IoT devices) and also serves a loophole to circumvent the \u201Cnumber of devices\u201D limitations imposed by your VPN provider as the router only counts as a single device (for example: a tablet, two phones, a desktop, a laptop, a TV, an Alexa, and a doorbell all going through the router\u2019s VPN still only counts as a single connection to the VPN provider)."]
    }), "\n", createVNode(_components.p, {
      children: ["If you are not using a VPN on your router - or if the VPN setup instructions did not specify a ", createVNode(_components.a, {
        href: "/guides/prologue/communication#dns",
        children: "DNS resolver"
      }), " to use - I suggest adding an encrypted resolver of your choice. ", createVNode(_components.a, {
        href: "https://www.privacyguides.org/dns/#recommended-providers",
        children: "Privacy Guides"
      }), " offers an excellent list of choices."]
    }), "\n", createVNode(_components.p, {
      children: "Be sure to enable any firewalls if they are not enabled and to disable Universal Plug-and-Play (sometimes abbreviated \u201CUPnP\u201D) as this setting is frequently abused by malicious actors to plant malware and compromise your network."
    }), "\n", createVNode(_components.p, {
      children: "Disable WPS (WiFi Protected Setup) if it\u2019s available. This is the feature where you push a button on the router and it adds new devices automatically. This feature may be tempting and easy to use, but it\u2019s also extremely easy to abuse. Disabling it will dramatically secure your network."
    }), "\n", createVNode(_components.p, {
      children: "Disable the option for remote access, if such an option exists and is enabled."
    })]
  });
}
function MDXContent$c(props = {}) {
  return createVNode(MDXLayout$c, {
    ...props,
    children: createVNode(_createMdxContent$c, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$c, "astro:jsx");
__astro_tag_component__(MDXContent$c, "astro:jsx");
const url$c = "/en/guides/quick-start/wifi-guide";
const file$c = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/quick-start/wifi-guide.mdx";
function rawContent$c() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$c() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$c = (props = {}) => MDXContent$c({
											...props,
											components: { Fragment, ...props.components },
										});
Content$c[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$c.layout);

const _page56 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$c,
  _internal: _internal$c,
  compiledContent: compiledContent$c,
  default: Content$c,
  file: file$c,
  frontmatter: frontmatter$c,
  getHeadings: getHeadings$c,
  rawContent: rawContent$c,
  url: url$c
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$b = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$b;
  content.file = file$b;
  content.url = url$b;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$b,
    url: url$b,
    content,
    frontmatter: content,
    headings: getHeadings$b(),
    "server:root": true,
    children
  });
};
const frontmatter$b = {
  "layout": "@layouts/guides.astro",
  "title": "Introduction",
  "section_title": "Prologue",
  "section_weight": 100,
  "weight": 1,
  "draft": false
};
const _internal$b = {
  injectedFrontmatter: {}
};
function getHeadings$b() {
  return [{
    "depth": 1,
    "slug": "introduction-section-introduction",
    "text": "Introduction: Section Introduction"
  }];
}
function _createMdxContent$b(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "introduction-section-introduction",
      children: "Introduction: Section Introduction"
    }), "\n", createVNode(_components.p, {
      children: "The first few pages of this site are dedicated to explaining basic concepts that will come up over and over again throughout this site. The topics are:"
    }), "\n", createVNode($$GuidesList, {}), "\n", createVNode(_components.p, {
      children: "If you feel like you sufficiently understand these topics, you can feel free to skip this section, or you can come back to the pages as you need."
    })]
  });
}
function MDXContent$b(props = {}) {
  return createVNode(MDXLayout$b, {
    ...props,
    children: createVNode(_createMdxContent$b, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$b, "astro:jsx");
__astro_tag_component__(MDXContent$b, "astro:jsx");
const url$b = "/en/guides/prologue";
const file$b = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/prologue/index.mdx";
function rawContent$b() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$b() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$b = (props = {}) => MDXContent$b({
											...props,
											components: { Fragment, ...props.components },
										});
Content$b[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$b.layout);

const _page57 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$b,
  _internal: _internal$b,
  compiledContent: compiledContent$b,
  default: Content$b,
  file: file$b,
  frontmatter: frontmatter$b,
  getHeadings: getHeadings$b,
  rawContent: rawContent$b,
  url: url$b
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$a = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$a;
  content.file = file$a;
  content.url = url$a;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$a,
    url: url$a,
    content,
    frontmatter: content,
    headings: getHeadings$a(),
    "server:root": true,
    children
  });
};
const frontmatter$a = {
  "layout": "@layouts/guides.astro",
  "title": "How Network Communication Works",
  "topic": "How Digital/Network Communications Work",
  "weight": 7,
  "draft": false
};
const _internal$a = {
  injectedFrontmatter: {}
};
function getHeadings$a() {
  return [{
    "depth": 1,
    "slug": "how-network-communication-works",
    "text": "How Network Communication Works"
  }, {
    "depth": 2,
    "slug": "your-phone-is-a-radio",
    "text": "Your Phone is a Radio"
  }, {
    "depth": 2,
    "slug": "the-internet-works-the-same-way",
    "text": "The Internet Works the Same Way"
  }, {
    "depth": 2,
    "slug": "what-is-dns",
    "text": "What is DNS?"
  }];
}
function _createMdxContent$a(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    h2: "h2",
    img: "img",
    a: "a"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "how-network-communication-works",
      children: "How Network Communication Works"
    }), "\n", createVNode(_components.p, {
      children: ["You\u2019re probably already aware that ", createVNode(_components.strong, {
        children: "cell phones don\u2019t communicate directly with other cell phones, they communicate with cell towers who mesh with other cell towers to relay your call, text, or other data from tower to tower until it reaches its destination."
      }), " But you may not know that the internet works in a similar fashion. In this section, I want to explain how modern digital communication works to help you understand how some of the tools and techniques in later sections protect your communications."]
    }), "\n", createVNode(_components.h2, {
      id: "your-phone-is-a-radio",
      children: "Your Phone is a Radio"
    }), "\n", createVNode(_components.p, {
      children: "Without getting too deep into the weeds, all wireless signals run on the electromagnetic spectrum. Remember ROYGBIV from school, aka the rainbow? This is electromagnetic radiation, the kind we know as \u201Cvisible light.\u201D Believe it or not, wireless signals also run on this same phenomenon, just in a different part of the spectrum. Radio, X-Ray, cell phones, wifi, they\u2019re all just light waves carrying information around. Wireless microphones, radios, cell phones, and even WiFi all falls under the \u201Cradio waves\u201D section."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "/images/graphics/em_spectrum.png",
        alt: "graph of the electro-magnetic spectrum"
      })
    }), "\n", createVNode(_components.h2, {
      id: "the-internet-works-the-same-way",
      children: "The Internet Works the Same Way"
    }), "\n", createVNode(_components.p, {
      children: ["Whether it\u2019s WiFi or a physical ethernet cable, ", createVNode(_components.strong, {
        children: "the internet communicates mostly the same way as cell phones in the sense that your data jumps around from location to location before reaching its final destination rather than going straight to the destination."
      }), " Once your data leaves your router, it basically jumps through a series of other routers to get to its destination. These routers are not owned by individuals, they\u2019re owned by corporations and internet service providers (ISPs), but the principle is the same."]
    }), "\n", createVNode(_components.h2, {
      id: "what-is-dns",
      children: "What is DNS?"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Domain Name System - or DNS - is often described as the address book of the internet,"
      }), " though a map may be a more accurate analogy. When you type \u201CProtonMail.com\u201D into your browser, your computer doesn\u2019t understand that address. It contacts a specified DNS, which looks up that address and tells your computer \u201Coh, that\u2019s 185.70.42.31,\u201D (which is what\u2019s known as an \u201CIP address\u201D), which your computer understands. Your computer then contacts that address, and ProtonMail\u2019s website is displayed in your browser. This same basic process happens with apps, streaming services, and pretty much anything requiring an internet connection. For a full explanation of why this matters and is worth protecting, check out Mullvad VPN\u2019s blog post \u201D", createVNode(_components.a, {
        href: "https://mullvad.net/en/help/all-about-dns-servers-and-privacy/",
        children: "All about DNS servers and privacy"
      }), ",\u201D but the short version is that ", createVNode(_components.strong, {
        children: "DNS resolvers control where you can and cannot go online, and could (and often do) log the sites you attempt to visit and sell that data"
      }), " to data brokers for advertising (or other purposes). Many Internet Service Providers and VPN providers operate their own DNS resolvers. If you plan to use a reputable ", createVNode(_components.a, {
        href: "/guides/less-important/vpns",
        children: "VPN"
      }), ", I highly encourage you to use their DNS resolver - which is frequently built into the app and applied automatically when connecting - to avoid leakage. If you choose not to use a VPN, ", createVNode(_components.strong, {
        children: "you can change most devices or browsers to use alternate, privacy-respecting DNS resolvers."
      }), " ", createVNode(_components.a, {
        href: "https://privacyguides.org/dns/",
        children: "Privacy Guides"
      }), " offers a great list of alternate DNS providers, and if you\u2019re unsure how to change your DNS, try doing a ", createVNode(_components.a, {
        href: "/guides/less-important/habits#search-engines",
        children: "web search"
      }), " for the device or browser you\u2019re using along with \u201Cchange DNS.\u201D"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "The basic principle to take away from this page is that no communication goes straight to its destination."
      }), " Whether it\u2019s text, phone call, email, streaming, searches, etc. ", createVNode(_components.strong, {
        children: "All communications bounce from place to place, sometimes trading hands of companies and jurisdictions multiple times along the way."
      }), " Your email to your friend across town might actually cross continents before arriving, and your text message to your friend in the store next door might bounce through several cell phone providers\u2019 networks before reaching them. This kind of relaying ability has made data access ubiquitous and fast in most areas of the developed world, but it also opens you up to incredible risk in terms of protecting your data in transit: you risk having your data unknowingly read or copied or even altered by any number of organizations, companies, criminals, or other people who have access to it along its path, whether legitimate or not."]
    })]
  });
}
function MDXContent$a(props = {}) {
  return createVNode(MDXLayout$a, {
    ...props,
    children: createVNode(_createMdxContent$a, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$a, "astro:jsx");
__astro_tag_component__(MDXContent$a, "astro:jsx");
const url$a = "/en/guides/prologue/communication";
const file$a = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/prologue/communication.mdx";
function rawContent$a() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$a() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$a = (props = {}) => MDXContent$a({
											...props,
											components: { Fragment, ...props.components },
										});
Content$a[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$a.layout);

const _page58 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$a,
  _internal: _internal$a,
  compiledContent: compiledContent$a,
  default: Content$a,
  file: file$a,
  frontmatter: frontmatter$a,
  getHeadings: getHeadings$a,
  rawContent: rawContent$a,
  url: url$a
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$9 = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$9;
  content.file = file$9;
  content.url = url$9;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$9,
    url: url$9,
    content,
    frontmatter: content,
    headings: getHeadings$9(),
    "server:root": true,
    children
  });
};
const frontmatter$9 = {
  "layout": "@layouts/guides.astro",
  "title": "Understanding Surveillance",
  "topic": "How Surveillance Works",
  "weight": 4,
  "draft": false
};
const _internal$9 = {
  injectedFrontmatter: {}
};
function getHeadings$9() {
  return [{
    "depth": 1,
    "slug": "understanding-surveillance",
    "text": "Understanding Surveillance"
  }, {
    "depth": 2,
    "slug": "the-three-types-of-surveillance-according-to-me",
    "text": "The Three Types of Surveillance (According to Me)"
  }];
}
function _createMdxContent$9(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    a: "a",
    h2: "h2"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "understanding-surveillance",
      children: "Understanding Surveillance"
    }), "\n", createVNode(_components.p, {
      children: ["In this section, I want to give a brief overview of some of the most common ways surveillance works. This is not an exhaustive list, but it should give you a general idea to recognize potential surveillance mechanisms. The most common form of surveillance is ", createVNode(_components.strong, {
        children: createVNode(_components.a, {
          href: "https://en.wikipedia.org/wiki/Surveillance_capitalism",
          children: "Surveillance Capitalism"
        })
      }), ", meaning companies like Amazon or Google who collect information about you in order to serve more relevant ads or products."]
    }), "\n", createVNode(_components.p, {
      children: ["Governments also perform mass surveillance on nearly (if not) everyone, but typically mass surveillance piggybacks off existing surveillance capitalism infrastructures (see ", createVNode(_components.a, {
        href: "https://en.wikipedia.org/wiki/PRISM_(surveillance_program)",
        children: "PRISM"
      }), " for an example of how this works). This means that while ending up on \u201Ca list\u201D is likely a very easy, common, and automated thing, getting an actual person to watch you individually is less likely than you\u2019d think. Most surveillance is performed automatically by algorithms and automated systems. The bad news is, this means surveillance is everywhere. The good news is, that means it\u2019s designed to work on the \u201Cmost common denominator\u201D and therefore relatively easy to get out of to an extent."]
    }), "\n", createVNode(_components.p, {
      children: ["It\u2019s also worth knowing that there are organizations known as ", createVNode(_components.strong, {
        children: createVNode(_components.a, {
          href: "https://en.wikipedia.org/wiki/Information_broker",
          children: "data brokers"
        })
      }), " who collect your information strictly for profiling purposes. Amazon and Apple may not be sharing data with each other, but they are likely sharing it with companies like ", createVNode(_components.a, {
        href: "https://en.wikipedia.org/wiki/Acxiom",
        children: "Acxiom"
      }), " and ", createVNode(_components.a, {
        href: "https://en.wikipedia.org/wiki/LexisNexis",
        children: "LexisNexis"
      }), " who in turn sell your profile back to other companies who use it mainly for advertising."]
    }), "\n", createVNode(_components.h2, {
      id: "the-three-types-of-surveillance-according-to-me",
      children: "The Three Types of Surveillance (According to Me)"
    }), "\n", createVNode(_components.p, {
      children: ["The most visible form of surveillance is what I call \u201D", createVNode(_components.strong, {
        children: "consented surveillance."
      }), "\u201D This is when you knowingly and intentionally give up information. For example, if you sign up to both Amazon and eBay using the same email address, then you probably expect that any purchases made on either platform are automatically and easily tied back to you. As I said in the previous paragraph, Amazon and eBay may not be sharing your purchase history with each other, but they definitely share it with data brokers. Their automated systems easily correlate the two accounts and combine them."]
    }), "\n", createVNode(_components.p, {
      children: ["I call the next form of surveillance \u201D", createVNode(_components.strong, {
        children: "unconscious surveillance."
      }), "\u201D Technically you consent to this when you do things like, for example, click \u201CI agree to the terms of service.\u201D But do you know what the terms actually say? Often the company does things you\u2019ll never even see: reading a \u201Ccookie\u201D on your computer that tells them every site you visit, reading your contacts list, seeing what other apps are on your device, or scanning for other devices on your network and what they are. It could also include things like automatically scanning your emails or messages for keywords or recording your usage habits."]
    }), "\n", createVNode(_components.p, {
      children: ["I call the final form of surveillance \u201D", createVNode(_components.strong, {
        children: "targeted surveillance."
      }), "\u201D This is the kind that is typically only an issue if you\u2019re already getting the attention of a highly-resourced threat actor. This is the kind where they plant a fake version of an app on your phone or computer to get extra, hidden access to the information on the device, or where they actively capture and read your communications by a person and not just a machine. Think of it like the proverbial \u201CFBI surveillance van.\u201D As I said on the ", createVNode(_components.a, {
        href: "/guides/prologue/threat-model",
        children: "last page"
      }), ", I don\u2019t deal with this type of surveillance on this site because each situation is unique."]
    })]
  });
}
function MDXContent$9(props = {}) {
  return createVNode(MDXLayout$9, {
    ...props,
    children: createVNode(_createMdxContent$9, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$9, "astro:jsx");
__astro_tag_component__(MDXContent$9, "astro:jsx");
const url$9 = "/en/guides/prologue/surveillance";
const file$9 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/prologue/surveillance.mdx";
function rawContent$9() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$9() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$9 = (props = {}) => MDXContent$9({
											...props,
											components: { Fragment, ...props.components },
										});
Content$9[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$9.layout);

const _page59 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$9,
  _internal: _internal$9,
  compiledContent: compiledContent$9,
  default: Content$9,
  file: file$9,
  frontmatter: frontmatter$9,
  getHeadings: getHeadings$9,
  rawContent: rawContent$9,
  url: url$9
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$8 = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$8;
  content.file = file$8;
  content.url = url$8;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$8,
    url: url$8,
    content,
    frontmatter: content,
    headings: getHeadings$8(),
    "server:root": true,
    children
  });
};
const frontmatter$8 = {
  "layout": "@layouts/guides.astro",
  "title": "Threat Modeling",
  "topic": "What is Threat Modeling?",
  "weight": 3,
  "draft": false
};
const _internal$8 = {
  injectedFrontmatter: {}
};
function getHeadings$8() {
  return [{
    "depth": 1,
    "slug": "threat-modeling",
    "text": "Threat Modeling"
  }];
}
function _createMdxContent$8(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    ul: "ul",
    li: "li",
    a: "a",
    ol: "ol",
    em: "em"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "threat-modeling",
      children: "Threat Modeling"
    }), "\n", createVNode(_components.p, {
      children: ["In order to know what tools on this site are right for you, you should understand \u201C", createVNode(_components.strong, {
        children: "threat modeling."
      }), "\u201D The term \u201Cthreat model\u201D is just a fancy way to say \u201C", createVNode(_components.strong, {
        children: "what are you hiding and who are you hiding it from?"
      }), "\u201D For example:"]
    }), "\n", createVNode($$Highlighting, {
      children: createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: "A journalist may want to protect their sources from harm or retaliation, therefore their threat model will include ways to avoid location tracking, encrypt or otherwise protect the uncensored information they receive from their source, and other similar information that might reveal who their source is or allow others to track them to their source."
        }), "\n", createVNode(_components.li, {
          children: "A member of law enforcement may protect their home location in a variety of ways to avoid putting their families in danger from vengeful criminals."
        }), "\n", createVNode(_components.li, {
          children: "An activist in a repressive country make take steps to hide their research, gatherings, or other activities so the government can\u2019t track their real identity so easily and use it against them."
        }), "\n", createVNode(_components.li, {
          children: ["Many people are worried about identity theft and loss of financial resources through their bank account. Some of their defense strategies could include using a ", createVNode(_components.a, {
            href: "/guides/most-important/passwords",
            children: "password manager"
          }), ", ", createVNode(_components.a, {
            href: "/guides/most-important/mfa",
            children: "two-factor authentication"
          }), ", and ", createVNode(_components.a, {
            href: "/guides/most-important/credit",
            children: "freezing their credit"
          }), "."]
        }), "\n"]
      })
    }), "\n", createVNode(_components.p, {
      children: ["While threat modeling can be applied to a wide variety of situations (as shown above), on this site I focus specifically on ", createVNode(_components.strong, {
        children: "threat modeling for your personal data."
      }), " The Electronic Frontier Foundation defines data as \u201C", createVNode(_components.a, {
        href: "https://ssd.eff.org/en/glossary/data",
        children: "any kind of information, typically stored in a digital form. Data can include documents, images, keys, programs, messages, and other digital information or files."
      }), "\u201D While there are \u201Cbest practices\u201D that apply to almost (if not) everyone, there\u2019s really no one-size-fits-all threat model for everyone. Some people need more security or privacy, and some need less. Most people want to find a healthy balance between protection and convenience."]
    }), "\n", createVNode(_components.p, {
      children: ["The threat model that I focus on in this site is ", createVNode(_components.strong, {
        children: "defense against common, non-targeted attacks."
      }), " For a real world example, I cite infamous serial killer Richard Chase, who stalked the Los Angeles area between 1977 and 1978. One of the reasons he was so difficult to catch was because he didn\u2019t have a pattern. After he was caught he stated that he would just cruise around neighborhoods until he spotted a house he felt compelled to try. If the doors and windows were locked, he would go on his way and try a different house rather than force his way in. ", createVNode(_components.strong, {
        children: "My goal with this site is to teach you how to \u201Cdigitally lock your doors and windows\u201D"
      }), " to protect against yourself against the Richard Chase\u2019s of the digital world. In other words, make yourself harder to hack than the other guy so that hackers looking for an easy payday give up and move on to someone else."]
    }), "\n", createVNode(_components.p, {
      children: ["What\u2019s ", createVNode(_components.strong, {
        children: "your"
      }), " threat model? You can\u2019t know how to properly defend yourself against attacks if you don\u2019t know what attacks you are likely to face. While I teach the basics here, some readers may need to continue their education after my site, and all readers will have to examine the numerous tools and techniques I share here to figure out which is best for them. You can\u2019t know any of that without defining your threat model. So how do you determine your threat model?"]
    }), "\n", createVNode($$Highlighting, {
      children: createVNode(_components.ol, {
        children: ["\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: "What do I want to protect?"
          }), "\nThis is typically known as ", createVNode(_components.strong, {
            children: "assets"
          }), ", and they come in both physical and non-physical forms. A physical asset would be something like a laptop, phone, or file cabinet - a place that holds the data you wish you to protect. A non-physical asset would be something like a bank account, email account, or cloud storage backup account. You need to identify all your assets. Another term worth introducing at this stage is \u201D", createVNode(_components.strong, {
            children: "attack surface"
          }), ".\u201D This is a fancy term for all the possible points of failure where you might be compromised. Every app you download, every account you create, every file you store expands your attack surface and presents another chance for compromise to occur. Minimalism is your best friend when it comes to privacy and security, particularly with your assets. The less assets you have, the smaller your attack surface. Just something to keep in mind. (", createVNode(_components.em, {
            children: "Note: an individual piece of your attack surface is known as an \u201Cattack vetor.\u201D Attack vectors combine to create an attack surface, like drops of water combine to create a puddle, lake, or ocean."
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: "Who do I want to protect it from?"
          }), "\n\u201CBad guys\u201D is not a good answer to this question because it is too vague. Different types of bad guys have different resources and motivations. For example, a typical cybercriminal wouldn\u2019t likely target you specifically (see ", createVNode(_components.a, {
            href: "/guides/most-important/data-breaches",
            children: "Understanding Data Breaches"
          }), "). A potential employer or doxxer, on the other hand, is targeting you specifically and one may have different resources to work with. Try to be specific when identifying the \u201Cwho\u201D of your threat model, and know that it can vary from asset to asset."]
        }), "\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: "How bad are the consequences if I fail?"
          }), "\nTo use the examples from #2: the cybercriminal is trying to steal all your money and maybe even open fake accounts in your name that you will then be responsible for. Your prospective employer is simply trying to decide if they want to hire you. Both are consequences, and both are serious, but they require different levels and methods of defense. There\u2019s nothing wrong with going above and beyond the bare minimum of defense, but make sure that you know what\u2019s actually necessary and don\u2019t ruin your relationships or mental health because you went too far. It\u2019s all about balance."]
        }), "\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: "How likely is it that I will need to protect it?"
          }), "\nThis ties into both #2 and #3. For example: a person who shops online frequently and with many different retailers will almost certainly have their card details stolen at some point. The need to protect their card details, funds, and financial rating are extremely high as chances for something to go wrong - your attack surface - is extremely high."]
        }), "\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: "How much trouble am I willing to go through to try to prevent potential consequences?"
          }), "\nThis is the \u201Ccost/benefit analysis.\u201D Some security and privacy strategies involve much more work and may not be right for you if you don\u2019t enjoy the challenge, lack the technical skill to do it right, or the information isn\u2019t sensitive. Always remember: nothing is unhackable. Trying to protect all your data against everything all the time is impossible and exhausting. Instead, the goal should be to find a balance where you protect against or mitigate the most likely and most harmful threats as much as possible without negatively impacting yourself or those around you."]
        }), "\n"]
      })
    }), "\n", createVNode(_components.p, {
      children: "If you\u2019re still having trouble defining your threat model, a great post from a now-defunct site suggested a four-level template for determining your threat model. Note that this post is not a hard-and-fast rule, there is a lot of nuance and gray area, and you can feel free to drift in between levels depending on the situation, but it can be extremely helpful in getting started and visualizing where you land."
    }), "\n", createVNode($$Highlighting, {
      children: createVNode(_components.ol, {
        children: ["\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: "Protection from family & friends."
          }), " This includes things like putting a password on your phone or not loaning out your debit card for use."]
        }), "\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: "Protection from corporations."
          }), " This includes things like using fake information when signing up for rewards cards and using tracker blockers online. ", createVNode(_components.em, {
            children: "This site covers Levels 1 and 2."
          })]
        }), "\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: "Protection against targeted, non-government attacks."
          }), " This includes things like hardening your operating system and keeping your address off public records. ", createVNode(_components.em, {
            children: "This site briefly mentions some of these strategies, but does not go into detail."
          })]
        }), "\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: "Protection from federal governments and intelligence agencies."
          }), " This includes things like complex disinformation campaigns and heavily hardened electronics. ", createVNode(_components.em, {
            children: "This site does not cover this threat model at all."
          })]
        }), "\n"]
      })
    }), "\n", createVNode(_components.p, {
      children: ["The final concept I want to introduce is ", createVNode(_components.strong, {
        children: "defense in depth"
      }), ". You may know this as \u201Credundancy.\u201D Some real world examples of this could include things like crossing at the crosswalk ", createVNode(_components.em, {
        children: "and"
      }), " looking both ways first, using both your seatbelt and an airbag, or locking both the door lock and the deadbolt. Defense in depth is about acknowledging that sometimes defenses fail and having multiple lines of defense in place to compensate for that. However, this concept is still closely tied to your threat model: not all assets warrant the same level of protection, and it\u2019s very easy to quickly add too many layers of defense to the point of diminishing returns that cost you time, mental energy, and possibly money while delivering very little or no additional security in return. I strongly recommend you always practice defense in depth where possible, but remember to keep it reasonable and tailor the level of depth to your threat model."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: ["Large parts of this page were borrowed from or inspired by EFF\u2019S ", createVNode(_components.a, {
          href: "https://ssd.eff.org/en/module/your-security-plan",
          children: "Surveillance Self Defense Guide"
        }), "."]
      })
    })]
  });
}
function MDXContent$8(props = {}) {
  return createVNode(MDXLayout$8, {
    ...props,
    children: createVNode(_createMdxContent$8, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$8, "astro:jsx");
__astro_tag_component__(MDXContent$8, "astro:jsx");
const url$8 = "/en/guides/prologue/threat-model";
const file$8 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/prologue/threat-model.mdx";
function rawContent$8() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$8() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$8 = (props = {}) => MDXContent$8({
											...props,
											components: { Fragment, ...props.components },
										});
Content$8[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$8.layout);

const _page60 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$8,
  _internal: _internal$8,
  compiledContent: compiledContent$8,
  default: Content$8,
  file: file$8,
  frontmatter: frontmatter$8,
  getHeadings: getHeadings$8,
  rawContent: rawContent$8,
  url: url$8
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$7 = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$7;
  content.file = file$7;
  content.url = url$7;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$7,
    url: url$7,
    content,
    frontmatter: content,
    headings: getHeadings$7(),
    "server:root": true,
    children
  });
};
const frontmatter$7 = {
  "layout": "@layouts/guides.astro",
  "title": "Open Source vs Proprietary",
  "topic": "What is Open Source and Why Does it Matter?",
  "weight": 6,
  "draft": false
};
const _internal$7 = {
  injectedFrontmatter: {}
};
function getHeadings$7() {
  return [{
    "depth": 1,
    "slug": "open-source-and-source-avaliable-vs-proprietary",
    "text": "Open Source (and Source Avaliable) vs Proprietary"
  }, {
    "depth": 2,
    "slug": "what-is-open-source-software",
    "text": "What is Open Source Software?"
  }, {
    "depth": 2,
    "slug": "why-does-open-source-matter",
    "text": "Why Does Open Source Matter?"
  }];
}
function _createMdxContent$7(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    h2: "h2",
    a: "a",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "open-source-and-source-avaliable-vs-proprietary",
      children: "Open Source (and Source Avaliable) vs Proprietary"
    }), "\n", createVNode(_components.p, {
      children: "On this site I preach source available software whenever possible. This is a highly important subject worth explaining: what is source availability, why do I push it so heavily, and what are the advantages and disadvantages of it?"
    }), "\n", createVNode(_components.h2, {
      id: "what-is-open-source-software",
      children: "What is Open Source Software?"
    }), "\n", createVNode(_components.p, {
      children: ["The exact definition of open source varies depending on who\u2019s guidelines you\u2019re following. This is an important subject I want to familiarize my readers with, but overall one that falls far outside the scope of this website. If you wish to learn more about this subject, I recommend starting with the ", createVNode(_components.a, {
        href: "https://opensource.org/osd/",
        children: "Open Source Initiative"
      }), " and ", createVNode(_components.a, {
        href: "https://www.gnu.org/philosophy/free-sw.html#four-freedoms",
        children: "Free Software Foundation"
      }), ". For the purposes of this site, just know that in general open source software is software that respects transparency, user freedom, and meets a few other technical criteria."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "This website places a special emphasis on the \u201Ctransparency\u201D part of open source, specifically \u201Csource availibility.\u201D"
      }), " Source available software is software who\u2019s source code has been publicly published for anyone to view. This may include open source software, but sometimes software that is not \u201Copen source\u201D by definition will still publish their source code publicly. In other words: all open source software is source available, but not all source available software is open source."]
    }), "\n", createVNode(_components.p, {
      children: ["There are several reasons an organization or developer may publish their source code, and of those reasons there are two that cause me to place a heavy emphasis on source available software. The primary reason is for trust and transparency. With source available software, experts who know how to read and interpret the code can confirm that there\u2019s nothing unethical going on in the background such as unnecessary data collection, or search for potential bugs or vulnerabilities such as poor ", createVNode(_components.a, {
        href: "/guides/moderately-important/encryption",
        children: "encryption"
      }), " implementation. A second closely-related reason is because those same people can submit suggestions for improvement when they find those issues. While far from being a guarantee of either of these, source availability is one of many tools that can help us ensure that an app or service is indeed doing what it promises to do and does not have any glaring weaknesses. Consider the story of ", createVNode(_components.a, {
        href: "https://www.wired.com/story/lastpass-breach-vaults-password-managers/",
        children: "LastPass"
      }), ", a password manager who did not publicly publish their source code. After suffering a data breach in which user vaults (encrypted password databases) were compromised, it then came to light that LastPass was using poor hashing implementation for user master passwords and was not encrypting the URLs of sites stored in the vault, making vaults potentially easy to crack or helping cybercriminals know what sites you had accounts with and effortlessly craft convincing phishing emails to steal your logins for those sites. (I talk more about password security on the ", createVNode(_components.a, {
        href: "/guides/most-important/passwords",
        children: "Password Managers"
      }), " page.) Again, while source availability alone cannot guarantee that these sorts of issues don\u2019t exist, it very likely could\u2019ve helped LastPass avoid this embarassing and damaging (to both them and their customers) revelation."]
    }), "\n", createVNode(_components.p, {
      children: ["With open source software specifically, a primary reason for making the code available is so that people can modify it as they wish and/or self-host it independently to ensure the safety of their data. I will not be focusing on this particular subject on this site. While the exact level of skill required varies, in general self-hosting or modifying software requires a relatively high standard of technical knowledge regarding networking, programming, and other subjects. I promised at the start of this site that I did not expect you to possess such technical knowledge and I meant it. If you are interested in advancing onto these subjects, there are a plethora of resources available online to assist you. For now, just know that truly open source software - and not simply source available software - allows for this type of granular control by anyone. Even if you don\u2019t possess these skills yourself, you will benefit from this type of freedom if you follow some of the recommendations I list later on this site (particularly my recommendations for a ", createVNode(_components.a, {
        href: "/guides/most-important/browser",
        children: "web browser"
      }), "). A great example I read once said to ", createVNode(_components.strong, {
        children: "think of open source as cooking at home and proprietary/closed-source as eating at a restaurant: at home you can see each ingredient and have total control over which ones to add, exclude, substitute, or modify. In the restaurant,"
      }), " your knowledge of the ingredients and control over them is limited to varying degrees, like substituting an ingredient or knowing what\u2019s in the secret recipe."]
    }), "\n", createVNode(_components.h2, {
      id: "why-does-open-source-matter",
      children: "Why Does Open Source Matter?"
    }), "\n", createVNode(_components.p, {
      children: ["If my emphasis is specifically on source-available code, then why am I taking the time to explain open source as a whole? To start, I should explain ", createVNode(_components.strong, {
        children: "DRM"
      }), ". DRM stands for ", createVNode(_components.strong, {
        children: "Digital Rights Management,"
      }), " which is the technical term for anti-piracy or anti-copyright abuse technology. It allows companies to ensure that you\u2019re using a legitimate copy of their software, game, or ebook (or other digital files) rather than a pirated version, and also that you\u2019re using it in accordance with the terms of service (ex: not hosting a movie theater in your home). In some ways, there is a good reason for this technology to exist. This can ensure that musicians get paid for their work and that that popular products have a chance to continue their success. However, DRM is prone to abuse. Let\u2019s examine two real-life cases of DRM gone wrong and how open source can benefit everyone."]
    }), "\n", createVNode(_components.p, {
      children: ["Two separate people purchased different proprietary products: a ", createVNode(_components.a, {
        href: "https://boingboing.net/2020/01/23/proprietary-carbon",
        children: "refrigerator"
      }), " and a ", createVNode(_components.a, {
        href: "https://web.archive.org/web/20200117172133/https://twitter.com/ryandonsullivan/status/1218149470220632064",
        children: "printer"
      }), ". Those products come with additional accessories that provide additional revenue streams: water filters and printer ink respectively. In today\u2019s competitive market, it\u2019s often more frugal (and legal) to find a third-party off-brand who offers a compatible part for less than the manufacturer\u2019s product that works just as well. Manufacturers are beginning to respond by making their products digitally refuse to use third-party accessories. In the case of the fridge, the owner learned this when they installed a $19 generic water filter. The fridge used DRM to confirm that installed filter was not an official GE filter and therefore refused to dispence ice or water like it had before. The official filter costs $55. The printer story was even worse: the customer noticed that they had a recurring $5/month subscription to \u201CHP InstaInk.\u201D The customer cancelled this subscription, unsure what it was for. After cancelling, the printer refused to print anything, even with official HP ink installed."]
    }), "\n", createVNode(_components.p, {
      children: ["On the one hand, one could argue that this is a company protecting its investment or intellectual property, especially since many manufacturers sell the initial product at a loss or reduced profit expecting to make the money back in recurring purchases. However ", createVNode(_components.strong, {
        children: "this also sets a dark trend where corporations control all the products in our lives,"
      }), " crushing out competition. In the case of the refrigerator, if I wanted to start a company that sells a filter that provides cleaner water, I would need to convince GE to contract with me. Without this heavy-handed DRM, I can simply enter my product into the free market and let the consumer decide which filter they feel is better. But this kind of anti-competitive behavior holds the products hostage, putting unreasonable limits on what consumers are allowed to do with them and forcing them to pay exorbitant prices just to get basic functionality out of items they already paid for."]
    }), "\n", createVNode(_components.p, {
      children: ["The modern era is flooded with examples of DRM overreach. In 2022, ", createVNode(_components.a, {
        href: "https://www.theverge.com/2022/7/12/23204950/bmw-subscriptions-microtransactions-heated-seats-feature",
        children: "BMW"
      }), " started requiring a subscription to make use of the heated seating feature installed in their cars Pearson, the publishing company who essentially monopolizes the academic textbook space, abused their monopolistic power to ", createVNode(_components.a, {
        href: "https://academicebookinvestigation.org/2021/11/25/outrage-as-pearson-increase-ebook-prices-by-500-in-one-week/",
        children: "raise texbook prices"
      }), " by $500 in a single week. In 2009, Amazon entirely removed digital copies of ", createVNode(_components.a, {
        href: "https://www.pcworld.com/article/519855/amazon_kindle_1984_lawsuit.html",
        children: "1984"
      }), " from paying customer\u2019s libraries after a copyright dispute. Apple users were outraged in 2014 to wake up one morning and find that copies of U2\u2019s latest album had been placed into their ", createVNode(_components.a, {
        href: "https://en.wikipedia.org/wiki/Songs_of_Innocence_(U2_album)#Effectiveness_and_reaction",
        children: "iTunes libraries"
      }), " without their consent. There are certainly defenses to be made to fight piracy and ensure products aren\u2019t being used for illegal means, but I\u2019ve yet to meet anyone who thinks that these stories aren\u2019t even a little excessive."]
    }), "\n", createVNode(_components.p, {
      children: ["We have entered a new world of truly 24/7 online connectivity. Many cars now have their own modems built in to connect to the internet from anywhere; our appliances like thermostats, lightbulbs, washing machines, and coffee makers are constantly connected for remote control or convenience. As connectivity begins to permeate every item in our lives, it\u2019s important to not only be aware of what ", createVNode(_components.a, {
        href: "https://www.forbes.com/sites/robertvamosi/2015/01/22/collecting-big-data-from-iot/",
        children: "data"
      }), " those devices are sending and the ", createVNode(_components.a, {
        href: "https://www.zdnet.com/article/iot-security-is-bad-its-time-to-take-a-different-approach/",
        children: "security risks"
      }), " of such a device, but also to know that they now have the ability to enforce the terms of service - which are often subject to change at any time without warning - at any time for any reason, like when the power companies remotely adjusted ", createVNode(_components.a, {
        href: "https://www.usatoday.com/story/tech/2021/06/19/texas-power-companies-raising-smart-thermostat-temps-why/7754658002/",
        children: "smart themostats"
      }), " during a heatwave without warning to conserve power and reduce strain on the grid. Your car might not report you for speeding right now, but it has the ability to and at any time the service provider may change the rules and start reporting your speeding habits to insurance and ", createVNode(_components.a, {
        href: "https://www.npr.org/sections/thetwo-way/2011/04/28/135809709/dutch-police-used-tomtoms-gps-data-to-target-speeders",
        children: "law enforcement"
      }), ". ", createVNode(_components.strong, {
        children: "In the future your car may only allow you to repair it with manufacturer parts, or may decide that attempting repairs at home voids your warranty."
      }), " Take for example the driver who got ", createVNode(_components.a, {
        href: "https://arstechnica.com/cars/2020/02/driver-stranded-after-connected-rental-car-cant-call-home/",
        children: "stranded"
      }), " when his rental car couldn\u2019t connect to a network."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Open source products protect against situations like these"
      }), " because they are designed to be proliferated. You can\u2019t control the competition if you make the product freely available without restriction. You can\u2019t stop anonymous users from sharing and modifying it. Even if you tried to enforce DRM, the source code can be modified to remove that enforcement. An open source fridge, for example, could easily be modified to remove the digital locks requiring the manufacturer\u2019s filters. It protects consumers from anti-competitive monopolies who price gouge, collect too much data, fail to implement proper security, and put unreasonable restrictions on users for the products they already paid for."]
    }), "\n", createVNode(_components.p, {
      children: ["Despite all my praise on this page, it\u2019s important to note that open source products are not automatically ", createVNode(_components.a, {
        href: "https://blog.thenewoil.org/open-source-does-not-always-equal-safe",
        children: "guaranteed"
      }), " to be safer or more private. However, with the code freely available there\u2019s less room for abuse and more opportunity for an active, involved community to help improve the product."]
    })]
  });
}
function MDXContent$7(props = {}) {
  return createVNode(MDXLayout$7, {
    ...props,
    children: createVNode(_createMdxContent$7, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$7, "astro:jsx");
__astro_tag_component__(MDXContent$7, "astro:jsx");
const url$7 = "/en/guides/prologue/open-source";
const file$7 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/prologue/open-source.mdx";
function rawContent$7() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$7() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$7 = (props = {}) => MDXContent$7({
											...props,
											components: { Fragment, ...props.components },
										});
Content$7[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$7.layout);

const _page61 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$7,
  _internal: _internal$7,
  compiledContent: compiledContent$7,
  default: Content$7,
  file: file$7,
  frontmatter: frontmatter$7,
  getHeadings: getHeadings$7,
  rawContent: rawContent$7,
  url: url$7
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$6 = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$6;
  content.file = file$6;
  content.url = url$6;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$6,
    url: url$6,
    content,
    frontmatter: content,
    headings: getHeadings$6(),
    "server:root": true,
    children
  });
};
const frontmatter$6 = {
  "layout": "@layouts/guides.astro",
  "title": "Security vs Privacy vs Anonymity",
  "topic": "Security, Privacy, & Anonymity",
  "weight": 5,
  "draft": false
};
const _internal$6 = {
  injectedFrontmatter: {}
};
function getHeadings$6() {
  return [{
    "depth": 1,
    "slug": "security-vs-privacy-vs-anonymity",
    "text": "Security vs Privacy vs Anonymity"
  }, {
    "depth": 2,
    "slug": "examples",
    "text": "Examples"
  }, {
    "depth": 3,
    "slug": "security-without-privacy-or-anonymity",
    "text": "Security without Privacy or Anonymity"
  }, {
    "depth": 3,
    "slug": "privacy-without-anonymity",
    "text": "Privacy without Anonymity"
  }, {
    "depth": 3,
    "slug": "anonymity-without-security",
    "text": "Anonymity without Security"
  }, {
    "depth": 3,
    "slug": "security--privacy-without-anonymity",
    "text": "Security & Privacy without Anonymity"
  }, {
    "depth": 3,
    "slug": "privacy-without-security-or-anonymity",
    "text": "Privacy without Security or Anonymity"
  }, {
    "depth": 3,
    "slug": "security-with-privacy--anonymity",
    "text": "Security with Privacy & Anonymity"
  }, {
    "depth": 2,
    "slug": "closing-thoughts",
    "text": "Closing Thoughts"
  }];
}
function _createMdxContent$6(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    ul: "ul",
    li: "li",
    a: "a",
    em: "em",
    h2: "h2",
    h3: "h3"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "security-vs-privacy-vs-anonymity",
      children: "Security vs Privacy vs Anonymity"
    }), "\n", createVNode(_components.p, {
      children: ["On this page, I want to explain security, privacy, and anonymity. These subjects often compliment each other, but they are not always dependent on each other. It is important to remember that to some extent, there are no wrong answers here. For example, it\u2019s okay to pick a product because it has better security even though that product may offer little in the way of privacy. The important thing is that ", createVNode(_components.strong, {
        children: "you need to be aware what these products and services are offering you so that you can use them correctly."
      })]
    }), "\n", createVNode($$Highlighting, {
      children: createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: "Security"
          }), " is defined as \u201Cfreedom from danger,\u201D or \u201Cprotection; measures taken to guard against espionage or sabotage, crime, attack, or escape.\u201D Think of it the ability to keep unauthorized people from accessing information, accounts, or other similar things. A real world example could be the way a lock is designed to keep unauthorized people outside of your home."]
        }), "\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: "Privacy"
          }), " is \u201Cthe quality or state of being apart from observation; secrecy.\u201D I think of it as the ability to control information. This typically refers to information about your identity, like your ", createVNode(_components.a, {
            href: "/guides/moderately-important/metadata",
            children: "metadata"
          }), ". Using the above house again, privacy can be thought of as your ability to control who has the key or the address."]
        }), "\n", createVNode(_components.li, {
          children: [createVNode(_components.strong, {
            children: "Anonymity"
          }), " is the state of being anonymous, or \u201Cof unknown authorship or origin, not named or identified.\u201D It is the ability to be completely unknown by anyone. Anonymity can be thought of as privacy on steroids. While parivacy refers more to information ", createVNode(_components.strong, {
            children: createVNode(_components.em, {
              children: "about"
            })
          }), " you, anonymity refers your actual identity. A good example is ", createVNode(_components.a, {
            href: "https://en.wikipedia.org/wiki/Satoshi_Nakamoto",
            children: "Satoshi Nakamoto"
          }), ", the famous and unknown creator of Bitcoin."]
        }), "\n"]
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: ["All definitions courtesy of ", createVNode(_components.a, {
          href: "https://www.merriam-webster.com/",
          children: "Merriam-Webster Dictionary"
        }), "."]
      })
    }), "\n", createVNode(_components.p, {
      children: "As I said, these topics often - but don\u2019t always - overlap. Privacy can help your security, for example, because if people don\u2019t know information about you they can\u2019t answer your security questions. Security can protect your privacy by ensuring that nobody has access to that information about you except who you want."
    }), "\n", createVNode(_components.h2, {
      id: "examples",
      children: "Examples"
    }), "\n", createVNode(_components.h3, {
      id: "security-without-privacy-or-anonymity",
      children: "Security without Privacy or Anonymity"
    }), "\n", createVNode(_components.p, {
      children: ["Google has had almost no major data breaches in all their years of existence, yet they know almost everything about everyone to the point that the former CEO Eric Schmidt remarked \u201D", createVNode(_components.a, {
        href: "https://www.zdnet.com/article/google-even-knows-what-youre-thinking/",
        children: "We can more or less know what you\u2019re thinking about."
      }), "\u201D Google offers world-class security with zero privacy or anonymity."]
    }), "\n", createVNode(_components.h3, {
      id: "privacy-without-anonymity",
      children: "Privacy without Anonymity"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.a, {
        href: "/guides/less-important/voip",
        children: "MySudo"
      }), " is a great example of this. MySudo is not anonymous. They can see your ", createVNode(_components.a, {
        href: "/guides/moderately-important/metadata",
        children: "metadata"
      }), ", and if you sign up for their masked-card service, they know exactly who you are. However, they help you protect your privacy by giving you phone numbers, email addresses, and cards to give to other companies and individuals so that you can compartmentalize your life and choose who knows what about you. Another example is ", createVNode(_components.a, {
        href: "/guides/most-important/payments",
        children: "privacy.com"
      }), ", who allows you to use masked debit cards with literally any information attached to them. Privacy has to know who you are by law to prevent fraud, so they\u2019re not anonymous, but they can help you control who else has access to your real identity and information."]
    }), "\n", createVNode(_components.h3, {
      id: "anonymity-without-security",
      children: "Anonymity without Security"
    }), "\n", createVNode(_components.p, {
      children: "Paying for a product in cash preserves your anonymity - unless the business requires it, you don\u2019t have to give any kind of information at all. Yet, you have no security if the seller doesn\u2019t deliver the item, and you have no protection from fraud or anything like that."
    }), "\n", createVNode(_components.h3, {
      id: "security--privacy-without-anonymity",
      children: "Security & Privacy without Anonymity"
    }), "\n", createVNode(_components.p, {
      children: "With Signal, because your phone number is required, you can be unmasked by a court order or even a web search depending on the phone number you use. However, Signal is renowned for having some of the best security in the world, and the content of your messages and the information you transfer will be protected and controlled even if your identity is not."
    }), "\n", createVNode(_components.h3, {
      id: "privacy-without-security-or-anonymity",
      children: "Privacy without Security or Anonymity"
    }), "\n", createVNode(_components.p, {
      children: "Forgive the crass example, but think of using the restroom when you go camping. You can find some bushes to hide behind and that will give you privacy, but have no security or anonymity. There is nothing to stop anyone from finding you, and if the police decide to ask for ID you have no protection from that request."
    }), "\n", createVNode(_components.h3, {
      id: "security-with-privacy--anonymity",
      children: "Security with Privacy & Anonymity"
    }), "\n", createVNode(_components.p, {
      children: "XMPP is a perfect example of this. XMPP allows you to sign up without any real information, over a VPN or Tor connection for total anonymity. Additionally, the conversations can be protected by OMEMO encryption, meaning the data itself is also secure and private. When used properly, this is as closed to perfect as you can get."
    }), "\n", createVNode(_components.h2, {
      id: "closing-thoughts",
      children: "Closing Thoughts"
    }), "\n", createVNode(_components.p, {
      children: ["As I said before, these three concepts are not necessarily dependent on each other. A secure product does not guarantee privacy, a private product does not guarantee security, and anonymity does not guarantee either. Also as I said before, there is nothing wrong with valuing one facet over another. Just be sure you understand how a product is meant to be used and what the risks are. It would be awful to use Google thinking that it will give your communications privacy and then your financial details get stolen by a ", createVNode(_components.a, {
        href: "https://nypost.com/2020/09/23/shopify-says-rogue-employees-may-have-stolen-customer-data/",
        children: "rogue employee"
      }), ". Or if you used a service like Signal to organize protests in a hostile country only to be arrested once your phone number is unmasked with a warrant. Know the limitations of the services you choose and decide what features are important to you. This website largely focuses on basic security and privacy, and attempts to find the best blend between the two, in addition to keeping user-friendliness in mind."]
    })]
  });
}
function MDXContent$6(props = {}) {
  return createVNode(MDXLayout$6, {
    ...props,
    children: createVNode(_createMdxContent$6, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$6, "astro:jsx");
__astro_tag_component__(MDXContent$6, "astro:jsx");
const url$6 = "/en/guides/prologue/secprivanon";
const file$6 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/prologue/secprivanon.mdx";
function rawContent$6() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$6() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$6 = (props = {}) => MDXContent$6({
											...props,
											components: { Fragment, ...props.components },
										});
Content$6[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$6.layout);

const _page62 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$6,
  _internal: _internal$6,
  compiledContent: compiledContent$6,
  default: Content$6,
  file: file$6,
  frontmatter: frontmatter$6,
  getHeadings: getHeadings$6,
  rawContent: rawContent$6,
  url: url$6
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$5 = async function ({
  children
}) {
  const Layout = (await import('../guides.09f398da.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$5;
  content.file = file$5;
  content.url = url$5;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$5,
    url: url$5,
    content,
    frontmatter: content,
    headings: getHeadings$5(),
    "server:root": true,
    children
  });
};
const frontmatter$5 = {
  "layout": "@layouts/guides.astro",
  "title": "Why Privacy & Security Matter",
  "topic": "Why Do Privacy & Security Matter?",
  "weight": 2,
  "draft": false
};
const _internal$5 = {
  injectedFrontmatter: {}
};
function getHeadings$5() {
  return [{
    "depth": 1,
    "slug": "why-privacy--security-matter",
    "text": "Why Privacy & Security Matter"
  }];
}
function _createMdxContent$5(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    a: "a",
    strong: "strong",
    ul: "ul",
    li: "li"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "why-privacy--security-matter",
      children: "Why Privacy & Security Matter"
    }), "\n", createVNode(_components.p, {
      children: ["The phrase \u201Cdata is the new oil\u201D is a bit controversial in tech circles, mostly for nit-picking reasons. However, according to ", createVNode(_components.a, {
        href: "https://www.forbes.com/powerful-brands/list/",
        children: "Forbes"
      }), ", the top most valuable brands in the world in 2020 were Apple, Google, Microsoft, Amazon, and Facebook, all companies notorious for their data collection and targeted-advertising (Note: Apple allegedly does not participate in targeted advertising but does collect data). No matter how you interpret it, ", createVNode(_components.strong, {
        children: "data is a moneymaker."
      })]
    }), "\n", createVNode(_components.p, {
      children: "Most of us are not strangers to the concept of targeted advertising. Most of us don\u2019t particularly care, either. After all, who wouldn\u2019t want relevant ads for movies or products that might actually appeal to you or improve your life? However, most of us don\u2019t understand the invasive measures these companies go to to collect this data, or the devastating effects it can have on people."
    }), "\n", createVNode(_components.p, {
      children: ["It may sound paranoid, but it\u2019s actually proven that ", createVNode(_components.a, {
        href: "https://www.forbes.com/sites/bernardmarr/2017/09/07/where-can-you-buy-big-data-here-are-the-biggest-consumer-data-brokers/#394bdc846c27",
        children: "entire companies"
      }), " exist simply to collect your data and build profiles on you, and in their minds the ends will always justify ", createVNode(_components.a, {
        href: "https://mashable.com/article/facebook-employees-react-teen-spying-app-blind/",
        children: "the means"
      }), ". Often they collect data in ways that range from questionable to ", createVNode(_components.a, {
        href: "https://arstechnica.com/tech-policy/2019/10/35-billion-facial-recognition-lawsuit-against-facebook-moving-forward/",
        children: "blatantly illegal"
      }), ", collecting information that no one would knowingly ", createVNode(_components.a, {
        href: "https://www.forbes.com/sites/kashmirhill/2012/02/16/how-target-figured-out-a-teen-girl-was-pregnant-before-her-father-did/#27e187b06668",
        children: "consent to"
      }), ". This massive trove of data is regularly abused. For example, in 2019 the ", createVNode(_components.a, {
        href: "https://www.theregister.co.uk/2019/10/04/egypt_smartphone_spying/",
        children: "Egyptian government"
      }), " tracked opponents and activists through phone apps, the ", createVNode(_components.a, {
        href: "https://www.amnesty.org/en/latest/research/2019/10/Morocco-Human-Rights-Defenders-Targeted-with-NSO-Groups-Spyware/",
        children: "Moroccan government"
      }), " spied on the phones of human rights defenders, and the ", createVNode(_components.a, {
        href: "https://www.reuters.com/article/us-china-cyber-uighurs/china-hacked-asian-telcos-to-spy-on-uighur-travelers-sources-idUSKCN1VQ1A5",
        children: "Chinese government"
      }), " hacked Asian telecommunications companies to spy on the Uighur, a minority Muslim ethnic group living in China."]
    }), "\n", createVNode(_components.p, {
      children: ["It sounds like something from a dystopian sci-fi movie, but just a few of the known methods of data collection include using ", createVNode(_components.a, {
        href: "https://arstechnica.com/tech-policy/2015/11/beware-of-ads-that-use-inaudible-sound-to-link-your-phone-tv-tablet-and-pc/",
        children: "high-pitched tones"
      }), " that only electronic devices can hear to report how many people are watching a TV show, collecting ", createVNode(_components.a, {
        href: "https://www.newsweek.com/secretive-world-selling-data-about-you-464789",
        children: "banking and shopping"
      }), " information, tracking ", createVNode(_components.a, {
        href: "https://www.eff.org/pages/automated-license-plate-readers-alpr",
        children: "your car"
      }), " as you drive through the real world, tracking ", createVNode(_components.a, {
        href: "https://www.washingtonpost.com/news/the-switch/wp/2013/10/19/how-stores-use-your-phones-wifi-to-track-your-shopping-habits/",
        children: "your phone"
      }), " as you browse the store to see where you spend the most time, collecting ", createVNode(_components.a, {
        href: "https://www.businessinsider.com/dna-testing-delete-your-data-23andme-ancestry-2018-7",
        children: "your DNA"
      }), " from family heritage testing services, selling your information to ", createVNode(_components.a, {
        href: "https://www.lifewire.com/remove-personal-information-from-internet-3482691",
        children: "public data websites"
      }), ", the ", createVNode(_components.a, {
        href: "https://www.vice.com/en_us/article/43kxzq/dmvs-selling-data-private-investigators-making-millions-of-dollars",
        children: "Department of Motor Vehicles"
      }), " selling your driver\u2019s license information, and more."]
    }), "\n", createVNode(_components.p, {
      children: ["\u201CWow,\u201D you may say, \u201Cthat\u2019s intense. But I\u2019m not an activist or famous. ", createVNode(_components.strong, {
        children: "Why should I care? I have nothing to hide.\u201D"
      })]
    }), "\n", createVNode("div", {
      class: "grid grid-cols-1 xl:grid-cols-2 grid-rows-[1fr_auto] xl:grid-flow-col p-4 gap-6",
      children: [createVNode("h2", {
        id: "why-care-about-privacy",
        class: "text-center",
        children: createVNode(_components.p, {
          children: "Why Care About Privacy"
        })
      }), createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: ["Western governments have been proven to spy on their own citizens, even peaceful, positive movements. (", createVNode(_components.a, {
            href: "https://en.wikipedia.org/wiki/COINTELPRO",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["Western government officials have attempted to use the law to silence critics. (", createVNode(_components.a, {
            href: "https://www.washingtonpost.com/nation/2021/05/18/devin-nunes-twitter-doj/",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["According to the US Bureau of Justice, \u201CDuring a 12-month period an estimated 14 in every 1,000 persons age 18 or older were victims of stalking\u201D and \u201CApproximately 1 in 4 stalking victims reported some form of cyberstalking such as e-mail (83%) or instant messaging (35%).\u201D One woman in 1989 was even murdered by her stalker who found her address from DMV public records. Separately, a Los Angeles man was killed in a robbery gone wrong after posting his address to Instagram. (", createVNode(_components.a, {
            href: "https://www.bjs.gov/index.cfm?ty=tp&tid=973",
            children: "Source"
          }), ", ", createVNode(_components.a, {
            href: "https://en.wikipedia.org/wiki/Rebecca_Schaeffer#Death",
            children: "Source"
          }), ", ", createVNode(_components.a, {
            href: "https://en.wikipedia.org/wiki/Pop_Smoke#Death",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["Statistics show that lack of privacy leads to a population who is afraid to educate themselves on important issues lest they be mistaken for troublemakers. (", createVNode(_components.a, {
            href: "https://theintercept.com/2016/04/28/new-study-shows-mass-surveillance-breeds-meekness-fear-and-self-censorship/",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["In 2017, the FBI chose to drop charges against a pedophile rather than reveal how they caught him; most likely to avoid having their backdoor fixed, to avoid having other countries use it against us, or identify that we used it against them. This demonstrates that despite their constant calls to ban encryption in the name of \u201Cstopping child sexual abuse,\u201D this not always their true motive. (", createVNode(_components.a, {
            href: "https://gizmodo.com/fbi-drops-all-charges-in-child-porn-case-to-keep-sketch-1793009653",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["Multiple industries are now keeping \u201Csurveillance scores\u201D on people, which can be used to determine employability, overall consumer trustworthiness, insurance rates, and even whether you\u2019re a good person to rent to. Some western countries are even working on implementing a China-style social credit system fed by your online and collected data. (", createVNode(_components.a, {
            href: "https://www.chron.com/opinion/article/Data-isn-t-just-being-collected-from-your-phone-15449776.php.html",
            children: "Source"
          }), ", ", createVNode(_components.a, {
            href: "https://www.digitaltrends.com/cool-tech/social-credit-system/",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["Many companies have been known to sell your data to or work exclusively with law enforcement agencies without your consent. In 2011, GPS data was sold to local police in the Netherlands so they could issue traffic tickets. In the US, Ring Doorbells are a common surveillance tool for police around the country. In another case, the US military purchased location data from popular apps that track weather, exercise, and even Muslim prayer to help targeted drone strikes. (", createVNode(_components.a, {
            href: "https://www.wbur.org/npr/135809709/dutch-police-used-tomtoms-gps-data-to-target-speeders",
            children: "Source"
          }), ", ", createVNode(_components.a, {
            href: "https://www.washingtonpost.com/technology/2019/08/28/doorbell-camera-firm-ring-has-partnered-with-police-forces-extending-surveillance-reach/",
            children: "Source"
          }), ", ", createVNode(_components.a, {
            href: "https://www.businessinsider.com/us-military-location-data-muslim-prayer-app-xmode-babel-street-2020-11",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["Financial institutions have been known to penalize you financially because they don\u2019t like your shopping habits. In one case, American Express lowered a person\u2019s credit limit because they shopped at \u201Cdeadbeat\u201D establishments like Walmart. (", createVNode(_components.a, {
            href: "https://consumerist.com/2008/12/22/amex-lowers-your-credit-limit-if-you-shop-where-deadbeats-shop/",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["In Australia, data breaches from rogue employees were up 52% between 2019 and 2020. These data breaches have been used in everything from general identity theft to harassing people who left negative reviews. (", createVNode(_components.a, {
            href: "https://www.zdnet.com/article/519-data-breach-notifications-include-33-from-australian-government-entities/",
            children: "Source"
          }), ", ", createVNode(_components.a, {
            href: "https://abcnews.go.com/US/ebay-employees-hit-cyberstalking-charges-bizarre-harassment-mass/story?id=71260042",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["Sextortion scams cost $8 million USD in the first half of 2021. (", createVNode(_components.a, {
            href: "https://www.bleepingcomputer.com/news/security/fbi-spike-in-sextortion-attacks-cost-victims-8-million-this-year/",
            children: "Source"
          }), ")"]
        }), "\n"]
      }), createVNode("h2", {
        id: "why-care-about-security",
        class: "text-center",
        children: createVNode(_components.p, {
          children: "Why Care About Security"
        })
      }), createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: ["Weak passwords can be hacked within seconds. Softwares to perform this are legally available for free all over the internet. (", createVNode(_components.a, {
            href: "https://www.security.org/how-secure-is-my-password/",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["Companies all over the world - big and small alike - are constantly suffering from data breaches that can reveal anything from username and password to account numbers, government identifications, and more. (", createVNode(_components.a, {
            href: "https://en.wikipedia.org/wiki/List_of_data_breaches",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["According to the Bureau of Justice statistics, \u201CApproximately 68% of the victims of cyber theft sustained monetary loss of $10,000 or more.\u201D Often cyber crime isn\u2019t just about draining a person\u2019s bank account, but also opening new accounts in that person\u2019s name, which that person is then liable to prove is illegitimate. (", createVNode(_components.a, {
            href: "https://bjs.ojp.gov/press-release/cybercrime-against-businesses-2005",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["Internet of Things (aka smart devices) attacks were up 600% in 2017. It grew again in 2021, doubling in six months to reach a total 1.5 billion attacks. (", createVNode(_components.a, {
            href: "https://www.cyberdefensemagazine.com/cyber-security-statistics-for-2019/",
            children: "Source"
          }), ", ", createVNode(_components.a, {
            href: "https://threatpost.com/iot-attacks-doubling/169224/",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["The number of new mobile malware targeting mobile devices increased by 54% in 2017. (", createVNode(_components.a, {
            href: "https://learn.g2.com/cybercrime-statistics",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["Failure to properly control access to your devices or accounts can result in information being uncovered by unwanted parties even if they have little or no technical ability. Consider the story of the woman who used her sleeping husband\u2019s fingerprint to unlock his phone and discovered he was cheating on her, causing such a scene that the plane had to make an emergency landing. (", createVNode(_components.a, {
            href: "https://www.foxnews.com/travel/flight-reportedly-diverted-after-woman-unlocks-husbands-phone-and-uncovers-affair",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["Researchers in 2015 were able to successfully hijack a Jeep while it was in use on the freeway, controlling the HVAC, radio, windshield wipers and fluid, the digital display, the brakes, the steering, and the transmission. The hackers were ten miles away. (", createVNode(_components.a, {
            href: "https://www.wired.com/2015/07/hackers-remotely-kill-jeep-highway/",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["2020 saw an average of 7 million records per day being exposed in data breaches. (", createVNode(_components.a, {
            href: "https://cybernews.com/security/350-million-email-addresses-left-exposed-on-an-unsecured-server/",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["Australia alone suffered 1,050 data breaches in the 2019-2020 financial year, a 12-month period. That\u2019s almost 3 data breaches per day in a single country with a population of only 25 million. (", createVNode(_components.a, {
            href: "https://www.zdnet.com/article/1050-data-breaches-reported-to-australian-commissioner-in-12-months/",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["For parents, child identity theft is on the rise, affecting over 1 million children in 2017 alone. (", createVNode(_components.a, {
            href: "https://www.javelinstrategy.com/coverage-area/2018-child-identity-fraud-study",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["In Australia, 91% of reported data breaches leaked sensitive information to criminals such as home address, phone number, and email address. (", createVNode(_components.a, {
            href: "https://www.zdnet.com/article/519-data-breach-notifications-include-33-from-australian-government-entities",
            children: "Source"
          }), "))"]
        }), "\n", createVNode(_components.li, {
          children: ["Rogue employees are on the rise, meaning that those people now have your information to stalk, harass, or otherwise disrupt your life. (", createVNode(_components.a, {
            href: "https://www.bloomberg.com/news/articles/2020-09-22/shopify-says-rogue-employees-stole-data-from-merchants",
            children: "Source"
          }), ", ", createVNode(_components.a, {
            href: "https://www.justice.gov/usao-ma/pr/six-former-ebay-employees-charged-aggressive-cyberstalking-campaign-targeting-natick",
            children: "Source"
          }), ")"]
        }), "\n", createVNode(_components.li, {
          children: ["2020 was a \u201Crecord-breaking\u201D year in US school hacks. (", createVNode(_components.a, {
            href: "https://www.zdnet.com/article/2020-was-a-record-breaking-year-in-us-school-hacks-security-failures/",
            children: "Source"
          }), ")"]
        }), "\n"]
      })]
    })]
  });
}
function MDXContent$5(props = {}) {
  return createVNode(MDXLayout$5, {
    ...props,
    children: createVNode(_createMdxContent$5, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$5, "astro:jsx");
__astro_tag_component__(MDXContent$5, "astro:jsx");
const url$5 = "/en/guides/prologue/why";
const file$5 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/guides/prologue/why.mdx";
function rawContent$5() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$5() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$5 = (props = {}) => MDXContent$5({
											...props,
											components: { Fragment, ...props.components },
										});
Content$5[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$5.layout);

const _page63 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$5,
  _internal: _internal$5,
  compiledContent: compiledContent$5,
  default: Content$5,
  file: file$5,
  frontmatter: frontmatter$5,
  getHeadings: getHeadings$5,
  rawContent: rawContent$5,
  url: url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("https://thenewoil.org");
const $$TeamList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TeamList;
  const { members } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<ul class="grid grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Team">
  ${members.map((member) => {
    return renderTemplate`<li class="flex flex-1 list-none flex-col items-center rounded-lg border-4 p-4 border-gradient-secondary border-bg-primary dark:border-bg-primary-dark sm:items-start" aria-label="Member">
          <div class="flex flex-col items-center justify-center sm:items-start">
            <p class="w-fit text-2xl font-semibold" aria-label="Name">
              ${member.name}
            </p>
            <p class="w-fit text-gradient-secondary" aria-label="Function">
              ${member.title}
            </p>
          </div>
          ${member.links && renderTemplate`<ul class="flex items-center gap-4 p-0" aria-label="Links">
              ${member.links.map((link) => {
      return renderTemplate`<li class="list-none">
                    <a${addAttribute(link.link, "href")}${addAttribute(link.name, "title")}>
                      <img class="block h-12 w-12 rounded-sm dark:hidden" loading="lazy"${addAttribute(link.name, "alt")}${addAttribute(link.icon, "src")}>
                      <img loading="lazy" class="hidden h-12 w-12 rounded-sm dark:block"${addAttribute(link.name, "alt")}${addAttribute(link.icon_dark || link.icon, "src")}>
                    </a>
                  </li>`;
    })}
            </ul>`}
        </li>`;
  })}
</ul>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/pages/about/TeamList.astro");

const teamMembersList = [
	{
		name: "Nathan Bartram",
		title: "Founder/Editor"
	},
	{
		name: "Anonymous Moderator",
		title: "Moderator",
		links: [
			{
				name: "Discord",
				link: "#",
				icon: "/images/logos/discord.png"
			}
		]
	},
	{
		name: "Darth Badgie",
		title: "Moderator",
		links: [
			{
				name: "Matrix",
				link: "https://matrix.to/#/@darthbadgie:matrix.org",
				icon: "/images/logos/matrix-light.svg",
				icon_dark: "/images/logos/matrix-dark.svg"
			}
		]
	},
	{
		name: "daryl76679",
		title: "Moderator",
		links: [
			{
				name: "PeerTube",
				link: "https://apertatube.net/a/daryl76679/video-channels",
				icon: "/images/logos/peertube.png",
				icon_dark: "/images/logos/peertube.png"
			}
		]
	},
	{
		name: "Hestia Hacker",
		title: "Video Editor (TikTok)",
		links: [
			{
				name: "Website",
				link: "https://www.tindie.com/stores/eternalsunshine/",
				icon: "/images/logos/website.png"
			}
		]
	},
	{
		name: "Jun",
		title: "Moderator",
		links: [
			{
				name: "Matrix",
				link: "https://matrix.to/#/@noobmaster69:secretsquirrel.ems.host",
				icon: "/images/logos/matrix-light.svg",
				icon_dark: "/images/logos/matrix-dark.svg"
			}
		]
	},
	{
		name: "Uncover",
		title: "Moderator",
		links: [
			{
				name: "Discord",
				link: "#",
				icon: "/images/logos/discord.png"
			},
			{
				name: "Matrix",
				link: "https://matrix.to/#/@uncover:matrix.org",
				icon: "/images/logos/matrix-light.svg",
				icon_dark: "/images/logos/matrix-dark.svg"
			}
		]
	}
];

const MDXLayout$4 = async function ({
  children
}) {
  const Layout = (await import('../default.e3133db4.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$4;
  content.file = file$4;
  content.url = url$4;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$4,
    url: url$4,
    content,
    frontmatter: content,
    headings: getHeadings$4(),
    "server:root": true,
    children
  });
};
const frontmatter$4 = {
  "layout": "@layouts/default.astro",
  "title": "About",
  "draft": false
};
const _internal$4 = {
  injectedFrontmatter: {}
};
function getHeadings$4() {
  return [{
    "depth": 1,
    "slug": "about-this-site",
    "text": "About This Site"
  }, {
    "depth": 2,
    "slug": "format",
    "text": "Format"
  }, {
    "depth": 2,
    "slug": "disclaimers",
    "text": "Disclaimers"
  }, {
    "depth": 2,
    "slug": "the-team",
    "text": "The Team"
  }];
}
function _createMdxContent$4(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    h2: "h2",
    a: "a"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "about-this-site",
      children: "About This Site"
    }), "\n", createVNode(_components.p, {
      children: "While there are a lot of amazing resources for privacy and security out there, many of them are geared towards people who are moderately \u201Ctech savvy\u201D and already understand why privacy matters and/or how this stuff works. This site is aimed at people who are new to privacy and/or do not consider themselves \u201Ctech savvy\u201D. This site is designed to go over the basics of various ideas, subjects, and concepts to help you feel educated and capable of making decisions that are right for you without going too in depth to the point that you feel overwhelmed. It also aims to make a few recommendations to get the reader started in each area."
    }), "\n", createVNode(_components.h2, {
      id: "format",
      children: "Format"
    }), "\n", createVNode(_components.p, {
      children: "The site is rather wordy. This is intentional. Readers should consider the site more of a constantly-updated ebook than a typical website. The goal is not to be flashy and attention-grabbing (though obviously I do hope to make it visually appealing and not painful to read), but rather to give readers a strong understanding of the foundations of data privacy and cybersecurity. Hence, while I have tried to be succinct, there\u2019s only so much trimming I can do without losing critical information."
    }), "\n", createVNode(_components.p, {
      children: ["While the site is more of an ebook in spirit, each page is designed to be standalone. Feel free to skip any pages if you feel like you have already read or know about a particular subject or if you just want to learn about a specific topic. I have also tried to be thorough in making potentially unfamiliar terms or words linkable back to other pages - for example, if I talk about ", createVNode(_components.a, {
        href: "/guides/most-important/passwords",
        children: "password managers"
      }), " on any other page, I try to link back to that page so readers can easily get more information if they want and aren\u2019t missing any critical context."]
    }), "\n", createVNode(_components.p, {
      children: ["Some people argue that ranking certain concepts is wrong. Indeed, everything on this site is important and every step you take to improve your privacy or security is a step in the right direction. That\u2019s why the last category is called \u201Cless important\u201D and not \u201Cunimportant\u201D or even \u201Cleast important.\u201D The reason for the structure is thanks to my mother - who was the textbook kind of person this site is aimed at. When talking about privacy and this very site once, she told me that she found it all overwhelming and didn\u2019t know where to start. So I began to order the site for the sake of people like her: \u201Cstart here,\u201D it says, with things that will give you the most security and privacy right off the bat, usually with the least amount of effort. Then continue on to the other things. That said, the order of the site is merely a suggested order of operations to help readers get off to a great start and know where to begin so they don\u2019t get overwhelmed. If you are here to learn about a specific topic, you already know about some of the topics, or you don\u2019t feel that certain topics apply to you (such as ", createVNode(_components.a, {
        href: "/guides/most-important/credit",
        children: "credit freeze"
      }), "), you can feel free to skip them. You can always circle back later if your situation or mind changes or you decide you want to learn more for any reason."]
    }), "\n", createVNode(_components.h2, {
      id: "disclaimers",
      children: "Disclaimers"
    }), "\n", createVNode(_components.p, {
      children: ["Privacy and security are not binary concepts, but rather a spectrum. For example, you can have some privacy while keeping a Facebook account if you remove the app from your phone and only lurk without ever liking or posting content, but not as much as if you deleted your account altogether and took steps to block Meta\u2019s trackers around the web. The goal of this site is not to teach you to drop off the grid and live in a cabin in the woods with no risks whatsoever. But rather, this site aims at helping you learn about ", createVNode(_components.a, {
        href: "/guides/prologue/surveillance",
        children: "surveillance"
      }), " and tracking, how it works, how to opt out of it, and determine what the right level of privacy and security is for you. Not everything here will apply to everyone. Even taking some of the steps that move you further along the scale is better then nothing. No single tool is right for everyone\u2019s situation, that\u2019s why we offer several recommendations and let you decide what\u2019s best for you."]
    }), "\n", createVNode(_components.p, {
      children: "This site is not designed to be a comprehensive (aka \u201Ceverything you\u2019ll ever need to know about privacy/security\u201D) resource. This site is designed to be a beginner\u2019s guide. It is our hope that people will use this site to get up to speed and move onto to more advanced topics as they continue to grow."
    }), "\n", createVNode(_components.p, {
      children: ["On the ", createVNode(_components.a, {
        href: "/links",
        children: "final page"
      }), " you will find a number of resources we recommend to help you continue learning more, as well as ways to contact the founder/maintainer of this site/project and find other work from The New Oil like blogs, news feeds, and videos that we are working on. We are not claiming to be cybersecurity experts of any kind, but we have invested thousands of hours into these topics on this site. We spend much of our time reading books, articles, blog posts, and more from credible sources and experts. We spend a lot of time listening to interviews and podcasts, and reading the ongoing discussions in the communities we are a part of and trust to stay on top of everything, and we deeply investigate each claim before suggesting it to our audience. We are always willing to openly own up to our mistakes and correct information when we are informed of it, so if you are an expert and see any mistakes, please ", createVNode(_components.a, {
        href: "https://gitlab.com/thenewoil/website/-/issues",
        children: "submit a correction"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["Finally, we have made this site in good faith. We will never recommend a product or service on this site that we do not have confidence in. We may not use each and every product or service ourselves, but everything listed here is something that, if a loved one told us they were using it, we would respond with \u201Ccool, that works.\u201D If our response would be a hesistant groan suggesting the services is problematic, we don\u2019t list it here. We do not have any vested financial interests in any of of the services, products, or companies we have listed, nor do we receive any sort of financial compensation for our reviews, listings, etc (except where clearly disclosed as explained next). We do use affiliate/referral links for some services which will offer us a small sum of financial compensation or other benefits (ex, increased storage on our own accounts) if you sign up using the links provided. You can view them all ", createVNode(_components.a, {
        href: "/support#affiliate-links",
        children: "here"
      }), ". You are always welcome to use the non-affiliate links which are provided and clearly marked next to the affiliate links if you are uncomfortable with affiliate links. We do not list products or services simply because they offer affiliate links, rather we sign up for affiliate links if they are offered on products or services that we believe in and have decided to list regardless. We also accept sponsors for certain content sometimes, and all such potential conflicts of interest are clearly disclosed. You can view our sponsorship guidelines ", createVNode(_components.a, {
        href: "https://gitlab.com/thenewoil/website/-/wikis/Sponsorship-Criteria",
        children: "here"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "the-team",
      children: "The Team"
    }), "\n", createVNode($$TeamList, {
      members: teamMembersList
    })]
  });
}
function MDXContent$4(props = {}) {
  return createVNode(MDXLayout$4, {
    ...props,
    children: createVNode(_createMdxContent$4, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$4, "astro:jsx");
__astro_tag_component__(MDXContent$4, "astro:jsx");
const url$4 = "/en/about";
const file$4 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/about.mdx";
function rawContent$4() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$4() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$4 = (props = {}) => MDXContent$4({
											...props,
											components: { Fragment, ...props.components },
										});
Content$4[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$4.layout);

const _page64 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$4,
  _internal: _internal$4,
  compiledContent: compiledContent$4,
  default: Content$4,
  file: file$4,
  frontmatter: frontmatter$4,
  getHeadings: getHeadings$4,
  rawContent: rawContent$4,
  url: url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://thenewoil.org");
const $$Resources = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Resources;
  const { title, items } = Astro2.props;
  const headingId = await textToHeadingId({
    text: title,
    prefix: "resource-"
  });
  return renderTemplate`${maybeRenderHead($$result)}<section class="w-full">
  <details class="group">
    <summary class="flex justify-between rounded-lg border-2 border-black border-opacity-10 bg-black bg-opacity-0 p-4 hover:border-opacity-0 hover:bg-opacity-5 group-open:mb-3 group-open:border-opacity-0 group-open:bg-opacity-[.15] motion-safe:transition-all dark:border-white dark:border-opacity-10 dark:bg-white dark:bg-opacity-0">
      <header>
        <h3${addAttribute(headingId, "id")}>${title}</h3>
      </header>

      <span>
        ${renderComponent($$result, "Icon", $$Icon, { "pack": "mdi", "name": "chevron-up", "class": "w-7 h-7 group-open:rotate-180 motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out", "role": "img", "aria-label": "Dropbown button icon" })}
      </span>
    </summary>
    <ul class="-mt-3 p-4">
      ${items.map((item) => {
    return renderTemplate`<li class="list-none">
              <a${addAttribute(item.link, "href")} class="text-lg font-medium">
                ${item.name}
              </a>
              ${item.author && renderTemplate`<p aria-label="Author" class="opacity-70">
                  ${item.author}
                </p>`}
            </li>`;
  })}
    </ul>
  </details>
</section>`;
}, "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/components/pages/links/Resources.astro");

const books = [
	{
		name: "Extreme Privacy",
		author: "Michael Bazzell",
		link: "https://inteltechniques.com/book7.html"
	},
	{
		name: "Click Here to Kill Everybody",
		author: "Bruce Shneier",
		link: "https://www.schneier.com/books/click_here/"
	},
	{
		name: "Firewalls Don't Stop Dragons",
		author: "Carey Parker",
		link: "https://firewallsdontstopdragons.com/buy-the-book/"
	},
	{
		name: "Privacy is Power",
		author: "Carissa Veliz",
		link: "https://www.carissaveliz.com/books"
	},
	{
		name: "The Age of Surveillance Capitalism",
		author: "Shoshana Zuboff",
		link: "https://shoshanazuboff.com/book/about/"
	}
];

const documentaries = [
	{
		name: "Coded Bias",
		link: "https://www.codedbias.com/"
	},
	{
		name: "The Great Hack",
		link: "https://www.thegreathack.com/"
	},
	{
		name: "Nothing to Hide",
		link: "https://www.imdb.com/title/tt7330532/"
	},
	{
		name: "The Perfect Weapon",
		link: "https://www.hbo.com/movies/the-perfect-weapon"
	},
	{
		name: "The Social Dilemma",
		link: "https://www.thesocialdilemma.com/"
	},
	{
		name: "Terms and Conditions May Apply",
		link: "https://tacma.net/"
	}
];

const websites = [
	{
		name: "Privacy Guides",
		link: "https://privacyguides.org/"
	},
	{
		name: "Privacy Please by Startpage",
		link: "https://www.startpage.com/privacy-please/"
	},
	{
		name: "PrivacySpy",
		link: "https://privacyspy.org/"
	},
	{
		name: "Surveillance Self Defense by EFF",
		link: "https://ssd.eff.org"
	},
	{
		name: "US State Privacy Legislation Tracker",
		link: "https://iapp.org/resources/article/us-state-privacy-legislation-tracker/"
	}
];

const podcastsAndVideo = [
	{
		name: "All Things Secured",
		link: "https://www.youtube.com/c/AllThingsSecured"
	},
	{
		name: "The Linux Experiment",
		link: "https://www.youtube.com/c/TheLinuxExperiment"
	},
	{
		name: "Naomi Brockwell",
		link: "https://www.youtube.com/c/NaomiBrockwellTV"
	},
	{
		name: "Techlore",
		link: "https://techlore.tech/videos"
	}
];

const contact = [
	{
		name: "thenewoil@proton.me",
		link: "mailto:thenewoil@proton.me",
		img: "/images/logos/protonmail2.png",
		subtext: "PGP Key",
		sublink: "/en/pgp"
	},
	{
		name: "thenewoil@skiff.com",
		link: "mailto:thenewoil@skiff.com",
		img: "/images/logos/skiff.png"
	},
	{
		name: "thenewoil@tutanota.com",
		link: "mailto:thenewoil@tutanota.com",
		img: "/images/logos/tuta2.png"
	}
];

const videos = [
	{
		name: "PeerTube",
		link: "https://apertatube.net/c/thenewoil/videos",
		img: "/images/logos/peertube.png"
	},
	{
		name: "YouTube",
		link: "https://youtube.com/thenewoil",
		img: "/images/logos/youtube.png",
		not_encouraged: true
	},
	{
		name: "Odysee",
		link: "https://odysee.com/@thenewoil:7",
		img: "/images/logos/odysee.png",
		not_encouraged: true
	},
	{
		name: "TikTok",
		link: "https://www.tiktok.com/@thenewoil1",
		img: "/images/logos/tiktok.png",
		not_encouraged: true
	}
];

const getInvolved = [
	{
		name: "Big Brother Watch",
		link: "https://bigbrotherwatch.org.uk/",
		img: "/images/logos/bigbrotherwatch.png"
	},
	{
		name: "The Electronic Frontier Foundation (EFF)",
		link: "https://www.eff.org/",
		img: "/images/logos/eff.png"
	},
	{
		name: "Fight For The Future",
		link: "https://www.fightforthefuture.org/",
		img: "/images/logos/fftf.png"
	},
	{
		name: "Privacy International",
		link: "https://privacyinternational.org/",
		img: "/images/logos/privacy-international.png"
	},
	{
		name: "The Electronic Privacy Information Center (EPIC)",
		link: "https://epic.org/",
		img: "/images/logos/epic.png"
	},
	{
		name: "The Surveillance Technology Oversight Project (STOP)",
		link: "https://www.stopspying.org/",
		img: "/images/logos/stop.png"
	}
];

const translate = [
	{
		name: "Crowdin",
		link: "https://crowdin.com/project/the-new-oil",
		img: "/images/logos/crowdin.png"
	}
];

const source = [
	{
		name: "GitLab",
		link: "https://gitlab.com/thenewoil/website/",
		img: "/images/logos/gitlab2.png"
	},
	{
		name: "GitHub",
		link: "https://github.com/tnonate/thenewoil",
		img: "/images/logos/github.png",
		not_encouraged: true
	}
];

const podcastsNewsAndBlog = [
	{
		name: "Podcast",
		link: "https://surveillancereport.tech/",
		img: "/images/logos/surveillance-report.png"
	},
	{
		name: "Blog",
		link: "https://blog.thenewoil.org/",
		img: "/images/logos/writeas.png",
		subtext: "Table of Contents",
		sublink: "/en/blog-index"
	},
	{
		name: "Mastodon",
		link: "https://mastodon.thenewoil.org/@thenewoil",
		img: "/images/logos/mastodon.png"
	}
];

const services = [
	{
		name: "Mastodon",
		link: "https://mastodon.thenewoil.org",
		img: "/images/logos/mastodon.png",
		subtext: "Microblogging: for fans of X/Twitter/etc"
	},
	{
		name: "PeerTube",
		link: "https://apertatube.net/",
		img: "/images/logos/peertube.png",
		subtext: "Video hosting: for fans of YouTube/Vimeo/etc"
	}
];

const MDXLayout$3 = async function ({
  children
}) {
  const Layout = (await import('../default.e3133db4.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$3;
  content.file = file$3;
  content.url = url$3;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$3,
    url: url$3,
    content,
    frontmatter: content,
    headings: getHeadings$3(),
    "server:root": true,
    children
  });
};
const frontmatter$3 = {
  "layout": "@layouts/default.astro",
  "title": "Links",
  "draft": false,
  "center_content": true
};
const _internal$3 = {
  injectedFrontmatter: {}
};
function getHeadings$3() {
  return [{
    "depth": 1,
    "slug": "contact-information--helpful-links",
    "text": "Contact Information & Helpful Links"
  }, {
    "depth": 2,
    "slug": "resources",
    "text": "Resources"
  }, {
    "depth": 2,
    "slug": "contact",
    "text": "Contact"
  }, {
    "depth": 2,
    "slug": "videos",
    "text": "Videos"
  }, {
    "depth": 2,
    "slug": "podcast-news-feeds-blogs",
    "text": "Podcast, News Feeds, Blogs"
  }, {
    "depth": 2,
    "slug": "services",
    "text": "Services"
  }, {
    "depth": 2,
    "slug": "translations",
    "text": "Translations"
  }, {
    "depth": 2,
    "slug": "source-code-suggestions-and-issues",
    "text": "Source Code, Suggestions, and Issues"
  }, {
    "depth": 2,
    "slug": "get-involved",
    "text": "Get Involved"
  }];
}
function _createMdxContent$3(props) {
  const _components = Object.assign({
    h1: "h1",
    h2: "h2",
    p: "p",
    a: "a"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "contact-information--helpful-links",
      children: "Contact Information & Helpful Links"
    }), "\n", createVNode(_components.h2, {
      id: "resources",
      children: "Resources"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "https://gitlab.com/nbartram/the-new-oil/-/wikis/Links-&-Other-Resources-Criteria",
        children: "Click here to see my criteria for selecting these resources"
      })
    }), "\n", createVNode($$Resources, {
      title: "Books",
      items: books
    }), "\n", createVNode($$Resources, {
      title: "Documentaries",
      items: documentaries
    }), "\n", createVNode($$Resources, {
      title: "Websites",
      items: websites
    }), "\n", createVNode($$Resources, {
      title: "Podcasts & Videos",
      items: podcastsAndVideo
    }), "\n", createVNode(_components.h2, {
      id: "contact",
      children: "Contact"
    }), "\n", createVNode(_components.p, {
      children: ["Individual consulting/coaching is available. ", createVNode(_components.a, {
        href: "https://nextcloud.thenewoil.org/apps/forms/s/REP8Andd7eYfRd4ZqjZJcpSK",
        children: "Click here to apply."
      })]
    }), "\n", createVNode($$LinkGrid, {
      items: contact
    }), "\n", createVNode(_components.h2, {
      id: "videos",
      children: "Videos"
    }), "\n", createVNode($$LinkGrid, {
      items: videos
    }), "\n", createVNode(_components.h2, {
      id: "podcast-news-feeds-blogs",
      children: "Podcast, News Feeds, Blogs"
    }), "\n", createVNode($$LinkGrid, {
      items: podcastsNewsAndBlog
    }), "\n", createVNode(_components.h2, {
      id: "services",
      children: "Services"
    }), "\n", createVNode(_components.p, {
      children: "The following are publicly available services hosted by The New Oil."
    }), "\n", createVNode($$LinkGrid, {
      items: services
    }), "\n", createVNode(_components.h2, {
      id: "translations",
      children: "Translations"
    }), "\n", createVNode(_components.p, {
      children: "If you would like to see The New Oil translated to your language, please help us translate it."
    }), "\n", createVNode($$LinkGrid, {
      items: translate
    }), "\n", createVNode(_components.h2, {
      id: "source-code-suggestions-and-issues",
      children: "Source Code, Suggestions, and Issues"
    }), "\n", createVNode($$LinkGrid, {
      items: source
    }), "\n", createVNode(_components.h2, {
      id: "get-involved",
      children: "Get Involved"
    }), "\n", createVNode(_components.p, {
      children: "The following are some non-profits we recommend who fight for privacy legislation and policies at a collective level."
    }), "\n", createVNode($$LinkGrid, {
      items: getInvolved
    })]
  });
}
function MDXContent$3(props = {}) {
  return createVNode(MDXLayout$3, {
    ...props,
    children: createVNode(_createMdxContent$3, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$3, "astro:jsx");
__astro_tag_component__(MDXContent$3, "astro:jsx");
const url$3 = "/en/links";
const file$3 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/links.mdx";
function rawContent$3() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$3() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$3 = (props = {}) => MDXContent$3({
											...props,
											components: { Fragment, ...props.components },
										});
Content$3[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$3.layout);

const _page65 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$3,
  _internal: _internal$3,
  compiledContent: compiledContent$3,
  default: Content$3,
  file: file$3,
  frontmatter: frontmatter$3,
  getHeadings: getHeadings$3,
  rawContent: rawContent$3,
  url: url$3
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$2 = async function ({
  children
}) {
  const Layout = (await import('../default.e3133db4.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$2;
  content.file = file$2;
  content.url = url$2;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$2,
    url: url$2,
    content,
    frontmatter: content,
    headings: getHeadings$2(),
    "server:root": true,
    children
  });
};
const frontmatter$2 = {
  "layout": "@layouts/default.astro",
  "title": "Community Guidelines",
  "draft": false
};
const _internal$2 = {
  injectedFrontmatter: {}
};
function getHeadings$2() {
  return [{
    "depth": 1,
    "slug": "mission-statement",
    "text": "Mission Statement"
  }, {
    "depth": 1,
    "slug": "community-guidelines",
    "text": "Community Guidelines"
  }];
}
function _createMdxContent$2(props) {
  const _components = Object.assign({
    h1: "h1",
    ul: "ul",
    li: "li",
    p: "p",
    strong: "strong",
    ol: "ol",
    em: "em"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "mission-statement",
      children: "Mission Statement"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["To ", createVNode(_components.strong, {
            children: "educate"
          }), " readers on why privacy and security matter, and the various tools and techniques available to help them reclaim and protect their own privacy & security"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["To ", createVNode(_components.strong, {
            children: "empower"
          }), " readers to believe that privacy and security are attainable for everyone and to do their best to reclaim & protect their own privacy and security as much as possible"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["To ", createVNode(_components.strong, {
            children: "enhance"
          }), " the lives of readers with tools that will improve their privacy and security without negatively impacting their mental or emotional health or professional or social lives"]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.h1, {
      id: "community-guidelines",
      children: "Community Guidelines"
    }), "\n", createVNode(_components.p, {
      children: "The New Oil strives to create, host, and maintain a community where anyone from any background and experience level is welcome. To that end, we enforce the following rules:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "Treat everyone equally and with respect."
          }), " Remember there\u2019s a human on the other end of the screen."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "No form of hate speech or discrimination is allowed."
          }), " This includes but is not limited to sexism, racism, homophobia, and transphobia. This also includes usernames and profile pictures, as well as expressing support for hate groups."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "No \u201Cone-size-fits-all\u201D or \u201Cgatekeeping\u201D acting/thinking."
          }), " Remember that everyone has a different threat model, skill level, and priorities. Remember The New Oil\u2019s target audience."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "No \u201CFUD\u201D (Fear, Uncertainty, Doubt), aka \u201Cconspiracy theories.\u201D"
          }), " This includes making claims that are provably false or speculative. You are welcome to share speculative claims as clearly-marked personal opinions, but do not present them as proven facts."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "No \u201Cad hominem\u201D attacks."
          }), " For example, you are allowed to dislike another figure in the privacy/security community, but please explain why you take issue with their stances. This is to ensure that such discussions remain productive and that the community does not devolve into a toxic pool of slander and \u201Ctalking behind someone\u2019s back.\u201D"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "No discussions about religion, political belief, sexual orientations, or any other \u201Chot button\u201D issues."
          }), " These are important discussions, but this is not the place for them."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "No \u201Cdrama.\u201D"
          }), " This is loosely defined as talking poorly about another community or figure in the privacy/security community without a productive goal in mind. We acknowledge that this rule will be very context-sensitive, and we do not wish to censor anyone\u2019s freedom of speech, however we do not want our community to become a cesspit of slander and \u201Ctalking behind someone\u2019s back,\u201D nor a home for FUD about other figures/communities, therefore this rule will be identified and dealt with on a case-by-case basis. This includes but is not limited to things such as criticizing another community because you were banned there or intentionally bringing up existing feuds with the sole purpose to stir up \u201Cdrama.\u201D (This explicitly and specifically includes the dispute between Graphene OS and Techlore regardless of context or intention.)"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "No NSFW (\u201CNo Safe For Work\u201D) material"
          }), ", including but not limited to videos, images, or text depicting sexual actions, gore, or violence whether real or fictional."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "No illegal discussions or recommendations."
          }), " \u201CIllegal\u201D in this context is defined by American and UK laws (as The New Oil is an American entity, and the matrix.org homeserver we use is hosted in the UK)."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "No doxing."
          }), " This is defined as posting any information about a person that they have not shared themselves, including but not limited to names, locations, IP addresses, photos, etc."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "No repeated advertising."
          }), " Sharing or promoting your project or product - if it\u2019s related - is okay once in a while, but we are not your advertising platform so don\u2019t overdo it."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: createVNode(_components.strong, {
            children: "It is considered good etiquette to describe any links you share, no matter how obvious the link may seem."
          })
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "The \u201CMain\u201D room is for discussions including (but not limited to) talk about digital privacy and cybersecurity, sharing relevant news articles, and discussing different strategies or light tech support."
          }), " Jokes, tangents, and casual discussions should be moved to the \u201COff Topic\u201D room."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "We are not a tech support community."
          }), " While we do welcome some discussion about configurations, settings, or troubleshooting, your advanced, specific, or difficult problems should be directed to the companies, communities, or people who support the service you\u2019re having issues with."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "Do not feed the trolls."
          }), " This means no engaging, no taunting, no insulting, no commenting about spam attacks, etc. Carry on as normal, the mods will work as quickly as we can to handle the situation. The only deviation from your normal routine should be to tag a mod."]
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "For the NSFW room only"
      })
    }), "\n", createVNode(_components.ol, {
      start: "16",
      children: ["\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: [createVNode(_components.strong, {
            children: "The \u201CNo NSFW\u201D rule is suspended. However, please note that this room is NOT a porn room."
          }), " It is not here to post porn, trade material, get recommendations, or meet people. This room is purely for discussions that happen to be about both data privacy/cybersecurity and adult topics. These topics could include adult modeling, safely accessing adult material, or even \u201Cuncomfortable\u201D topics like death planning or escaping domestic violence situations."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: createVNode(_components.strong, {
            children: "Be 18+ (or whatever the legal age of adulthood is in your jurisdiction)."
          })
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: createVNode(_components.strong, {
            children: "The NSFW room is a judgement free zone, within reason."
          })
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "These community guidelines may change without warning. We will do our best to announce noteworthy changes, but we are not responsible for members missing said updates."
      })
    })]
  });
}
function MDXContent$2(props = {}) {
  return createVNode(MDXLayout$2, {
    ...props,
    children: createVNode(_createMdxContent$2, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$2, "astro:jsx");
__astro_tag_component__(MDXContent$2, "astro:jsx");
const url$2 = "/en/rules";
const file$2 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/rules.mdx";
function rawContent$2() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$2() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$2 = (props = {}) => MDXContent$2({
											...props,
											components: { Fragment, ...props.components },
										});
Content$2[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$2.layout);

const _page66 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$2,
  _internal: _internal$2,
  compiledContent: compiledContent$2,
  default: Content$2,
  file: file$2,
  frontmatter: frontmatter$2,
  getHeadings: getHeadings$2,
  rawContent: rawContent$2,
  url: url$2
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout$1 = async function ({
  children
}) {
  const Layout = (await import('../default.e3133db4.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter$1;
  content.file = file$1;
  content.url = url$1;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$1,
    url: url$1,
    content,
    frontmatter: content,
    headings: getHeadings$1(),
    "server:root": true,
    children
  });
};
const frontmatter$1 = {
  "layout": "@layouts/default.astro",
  "draft": false,
  "center_content": true
};
const _internal$1 = {
  injectedFrontmatter: {}
};
function getHeadings$1() {
  return [{
    "depth": 1,
    "slug": "contribute-to-spanish-blog-translator",
    "text": "Contribute to Spanish Blog Translator"
  }];
}
function _createMdxContent$1(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    img: "img"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "contribute-to-spanish-blog-translator",
      children: "Contribute to Spanish Blog Translator"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "/images/qr-codes/xmr2.png",
        alt: "Monero qr code"
      })
    }), "\n", createVNode(_components.p, {
      children: "8358xvd7SRACsZNf5wtX7iWhqF7DNo2vhUheKc6raM4zDsgkvPYXZtU5xzpbBbXE2Sjan2d1Nsx1i4mogeraXJBrDCR8p6C"
    })]
  });
}
function MDXContent$1(props = {}) {
  return createVNode(MDXLayout$1, {
    ...props,
    children: createVNode(_createMdxContent$1, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings$1, "astro:jsx");
__astro_tag_component__(MDXContent$1, "astro:jsx");
const url$1 = "/en/xmr2";
const file$1 = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/xmr2.mdx";
function rawContent$1() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$1() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$1 = (props = {}) => MDXContent$1({
											...props,
											components: { Fragment, ...props.components },
										});
Content$1[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$1.layout);

const _page67 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$1,
  _internal: _internal$1,
  compiledContent: compiledContent$1,
  default: Content$1,
  file: file$1,
  frontmatter: frontmatter$1,
  getHeadings: getHeadings$1,
  rawContent: rawContent$1,
  url: url$1
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout = async function ({
  children
}) {
  const Layout = (await import('../default.e3133db4.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter;
  content.file = file;
  content.url = url;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file,
    url,
    content,
    frontmatter: content,
    headings: getHeadings(),
    "server:root": true,
    children
  });
};
const frontmatter = {
  "layout": "@layouts/default.astro",
  "title": "PGP",
  "draft": false
};
const _internal = {
  injectedFrontmatter: {}
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "pgp",
    "text": "PGP"
  }];
}
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    a: "a",
    strong: "strong",
    br: "br"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "pgp",
      children: "PGP"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "mailto:thenewoil@proton.me",
        children: "thenewoil@proton.me"
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Fingerprint: b3cf55088f3b995ba4bf9fab9965aa6b288edb7a"
      })
    }), "\n", createVNode(_components.p, {
      children: "-----BEGIN PGP PUBLIC KEY BLOCK-----"
    }), "\n", createVNode(_components.p, {
      children: "Version: OpenPGP.js v4.10.10"
    }), "\n", createVNode(_components.p, {
      children: ["Comment: ", createVNode(_components.a, {
        href: "https://openpgpjs.org",
        children: "https://openpgpjs.org"
      })]
    }), "\n", createVNode(_components.p, {
      children: ["xjMEYoQToBYJKwYBBAHaRw8BAQdAZ3xKN3AV8OmuhC/rXZN/5vQkW1NlQvNJ\ns+pG20nrkPPNKXRoZW5ld29pbEBwcm90b24ubWUgPHRoZW5ld29pbEBwcm90\nb24ubWU+wo8EEBYKACAFAmKEE6AGCwkHCAMCBBUICgIEFgIBAAIZAQIbAwIe\nAQAhCRCZZaprKI7behYhBLPPVQiPO5lbpL+fq5llqmsojtt64AoA/1YvHEqN\nQnBncgfvYnz+6FhsQXoQ8NNCJ97iJnOxjYtkAP4qqCl+8ttmnDVT41d6y/ET\nYs8+mmalXvGVy/ndH6tcB844BGKEE6ASCisGAQQBl1UBBQEBB0DiruhnPUKj\nhxfMFtPxru1PhNryCDbVxCdLNQ+SaJYRCQMBCAfCeAQYFggACQUCYoQToAIb\nDAAhCRCZZaprKI7behYhBLPPVQiPO5lbpL+fq5llqmsojtt6zBkBAMUTjMx/\nfY29K/pkOOM3KEe/ysKATF/I2pyYKftEGDiiAP9RCUw77xvFRRM0AaWLJC+M\ntJHMB35gQtn5RBQN84jfAw==\n", createVNode(_components.br, {}), "\n=f1Uc"]
    }), "\n", createVNode(_components.p, {
      children: "-----END PGP PUBLIC KEY BLOCK-----"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "*PUBLIC*/publickey.thenewoil_at_proton.me.asc",
        children: "Download Key"
      })
    })]
  });
}
function MDXContent(props = {}) {
  return createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
const url = "/en/pgp";
const file = "/home/user/Nextcloud/Documents/TheNewOil/the-new-oil-redesign-main/src/pages/en/pgp.mdx";
function rawContent() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components },
										});
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);

const _page68 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content,
  _internal,
  compiledContent,
  default: Content,
  file,
  frontmatter,
  getHeadings,
  rawContent,
  url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page53 as $, _page27 as A, _page28 as B, _page29 as C, _page30 as D, _page31 as E, _page32 as F, _page33 as G, _page34 as H, _page35 as I, _page36 as J, _page37 as K, _page38 as L, _page39 as M, _page40 as N, _page41 as O, _page42 as P, _page43 as Q, _page44 as R, _page45 as S, _page46 as T, _page47 as U, _page48 as V, _page49 as W, _page50 as X, _page51 as Y, _page52 as Z, _page0 as _, _page1 as a, _page54 as a0, _page55 as a1, _page56 as a2, _page57 as a3, _page58 as a4, _page59 as a5, _page60 as a6, _page61 as a7, _page62 as a8, _page63 as a9, _page64 as aa, _page65 as ab, _page66 as ac, _page67 as ad, _page68 as ae, $$Icon as af, $$Button as ag, _page2 as b, _page3 as c, _page4 as d, _page5 as e, _page6 as f, _page7 as g, _page8 as h, _page9 as i, _page10 as j, _page11 as k, _page12 as l, _page13 as m, _page14 as n, _page15 as o, _page16 as p, _page17 as q, _page18 as r, _page19 as s, _page20 as t, _page21 as u, _page22 as v, _page23 as w, _page24 as x, _page25 as y, _page26 as z };
