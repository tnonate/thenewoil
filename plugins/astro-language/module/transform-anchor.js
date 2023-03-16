/** @type {import("./transform-anchor").CreateAnchorTransformer} */
export const createAnchorTransformer = (config) => {

    /** @type {import("./transform-anchor").AnchorTransformer} */
    return async (anchor) => {
        const originalHref = (anchor.getAttribute("href") || anchor.href)?.trim();
        if (!originalHref) return;
        
        const shoudNotChangeHref = (
            originalHref.includes(config.protocolIdentifier) || // Link contains a protocol, only local links should be changed
            config.excludeStartWithPatterns.some((pattern) => originalHref.startsWith(pattern)) // If link starts with something like `mailto:`
        );
        if (shoudNotChangeHref) return;

        // Contains the public prefix, links with this prefix will not be changed
        if (originalHref.startsWith(config.publicPrefix)) {
            anchor.setAttribute("href", `${originalHref.substring(config.publicPrefix.length)}`);
            return originalHref;
        }

        const pathPrefix = config.localPathPrefixes.find((prefix) => originalHref.startsWith(prefix)) ?? "";
        if (pathPrefix === "") return;

        const hrefWithoutPrefix = originalHref.substring(pathPrefix.length);

        // Link had a hreflang, it will not be changed because it already know which language it is redirecting to
        if (anchor.getAttribute("hreflang")) return;

        // Link already contains the current language code
        if (hrefWithoutPrefix.startsWith(config.language)) {
            anchor.setAttribute("hreflang", config.language);
            return;
        }

        anchor.setAttribute("href", `${pathPrefix}${config.language}/${hrefWithoutPrefix}`);
        anchor.setAttribute("hreflang", config.language);
        return originalHref;
    };

};