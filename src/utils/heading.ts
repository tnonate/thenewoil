import { markdown } from "@astropub/md";
import { parseHTML } from "linkedom";

const idFromText = async (text: string) => {
  const html = await markdown(`# ${text}`);
  const { document } = parseHTML(html);
  const nsHeading = document.querySelector("h1");
  return nsHeading!.id;
};

export interface TextToHeadingIdOptions {
  text: string;
  namespace?: string;
  prefix?: string;
}

export const textToHeadingId = async ({
  text,
  namespace,
  prefix,
}: TextToHeadingIdOptions) => {
  let headingId = "";

  if (namespace) headingId += await idFromText(namespace);
  const textId = await idFromText(text);

  if (headingId) headingId += "-";
  headingId += textId;

  if (prefix) headingId = prefix + headingId;

  return headingId;
};
