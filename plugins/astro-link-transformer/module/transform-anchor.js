/** @param {string} text */
function htmlEntities(text) {
  return text
    .split("")
    .map((char) => `&#${char.charCodeAt(0)};`)
    .join("");
}

/** Source: https://www.slingacademy.com/article/ways-to-generate-random-strings-in-javascript/ */
function generateRandomString() {
  return Math.floor(Math.random() * Date.now()).toString(36);
}

/** @param {Document} document */
function createObfuscatorElement(document) {
  const element = document.createElement("span");
  element.classList.add("hidden");
  element.textContent = generateRandomString();
  return element;
}

/** Source: https://regex101.com/r/lHs2R3/1 */
const EMAIL_PATTERN = /([\w\-\.]+@(?:[\w-]+\.)+[\w-]{2,})/gm;

/**
 * @param {ChildNode} node
 * @param {Document} document
 */
function obfuscateEmailInNode(node, document) {
  if (
    node.nodeType === node.TEXT_NODE &&
    node.textContent.match(EMAIL_PATTERN)
  ) {
    node.textContent.split(EMAIL_PATTERN).forEach((part, idx) => {
      const isEmail = idx % 2;
      if (!isEmail) {
        node.before(part);
        return;
      }

      const minIndex = 1;
      const maxIndex = part.length - 2;
      const obfuscationIndex = Math.floor(Math.random() * maxIndex) * minIndex;
      const start = part.substring(0, obfuscationIndex);
      const end = part.substring(obfuscationIndex);

      const surroundingObfuscators = Math.floor(Math.random() * 3);

      const hasBefore =
        surroundingObfuscators === 0 || surroundingObfuscators === 1;
      if (hasBefore) {
        node.before(createObfuscatorElement(document));
      }
      node.before(start);
      node.before(createObfuscatorElement(document));
      node.before(end);

      const hasAfter =
        surroundingObfuscators === 0 || surroundingObfuscators === 2;
      if (hasAfter) {
        node.before(createObfuscatorElement(document));
      }
    });
    node.remove();
    return;
  } else if (
    node.href &&
    node.href.startsWith("mailto:") &&
    node.nodeName === "A"
  ) {
    node.setAttribute("href", htmlEntities(node.href));
  } else if (node.alt && node.nodeName === "IMG") {
    node.setAttribute(
      "alt",
      node.alt.replace(EMAIL_PATTERN, (substr) => htmlEntities(substr)),
    );
    return;
  }

  for (const child of node.childNodes) {
    obfuscateEmailInNode(child, document);
  }
}

/** @type {import("./transform-anchor").CreateAnchorTransformer} */
export const createAnchorTransformer = (config) => {
  const excludeStartWithPatterns = [...config.excludeStartWithPatterns];
  if (!config.obfuscateEmail) {
    excludeStartWithPatterns.push("mailto:");
  }

  /** @type {import("./transform-anchor").AnchorTransformer} */
  return async (anchor) => {
    const originalHref = (anchor.getAttribute("href") || anchor.href)?.trim();
    if (!originalHref) return;

    const shoudNotChangeHref =
      originalHref.includes(config.protocolIdentifier) || // Link contains a protocol, only local links should be changed
      excludeStartWithPatterns.some((pattern) =>
        originalHref.startsWith(pattern),
      ); // If link starts with something like `mailto:`

    if (shoudNotChangeHref) {
      return;
    }

    if (config.obfuscateEmail && originalHref.startsWith("mailto:")) {
      obfuscateEmailInNode(anchor, config.document);

      return originalHref;
    }

    // Contains the public prefix, links with this prefix will not be changed
    if (originalHref.startsWith(config.publicPrefix)) {
      anchor.setAttribute(
        "href",
        `${originalHref.substring(config.publicPrefix.length)}`,
      );
      return originalHref;
    }

    const pathPrefix =
      config.localPathPrefixes.find((prefix) =>
        originalHref.startsWith(prefix),
      ) ?? "";
    if (pathPrefix === "") {
      return;
    }

    const hrefWithoutPrefix = originalHref.substring(pathPrefix.length);

    // Link had a hreflang, it will not be changed because it already know which language it is redirecting to
    if (anchor.getAttribute("hreflang")) return;

    // Link already contains the current language code
    if (hrefWithoutPrefix.startsWith(config.language)) {
      anchor.setAttribute("hreflang", config.language);
      return;
    }

    anchor.setAttribute(
      "href",
      `${pathPrefix}${config.language}/${hrefWithoutPrefix}`,
    );
    anchor.setAttribute("hreflang", config.language);
    return originalHref;
  };
};
