import { createAnchorTransformer } from "./transform-anchor";

/** @type {import("./client").transformAllAnchors} */
export const transformAllAnchors = async (config) => {
  const htmlElement = document.querySelector("html");

  const anchorTransformer = createAnchorTransformer({
    language: htmlElement.lang,
    excludeStartWithPatterns: config.excludeStartWithPatterns,
    localPathPrefixes: config.localPathPrefixes,
    protocolIdentifier: config.protocolIdentifier,
    publicPrefix: config.publicPrefix,
  });

  const anchorElements = Array.from(document.querySelectorAll("a"));

  const transformAnchorTasks = anchorElements.map(anchorTransformer);
  const changedAnchorsHrefs = (await Promise.all(transformAnchorTasks)).filter(
    (href) => Boolean(href)
  );

  if (config.logChanges)
    console.log(config.consoleTag, "\n Changed tags", changedAnchorsHrefs);
};
