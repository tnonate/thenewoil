import { markdown } from "@astropub/md";
import { parseHTML } from "linkedom";

const idFromText = async (text: string) => {
  const htmlString = await markdown(`# ${text}`);
  const { document } = parseHTML(htmlString);
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
  let outputId = "";

  if (namespace) outputId += await idFromText(namespace);
  const textId = await idFromText(text);

  if (outputId) outputId += "-";
  outputId += textId;

  if (prefix) outputId = prefix + outputId;

  return outputId;
};
