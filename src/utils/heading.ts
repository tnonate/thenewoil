import { createMarkdownProcessor } from "@astrojs/markdown-remark";
const processor = await createMarkdownProcessor();

const idFromText = async (text: string) => {
  const html = await processor.render(`# ${text}`);
  return html.metadata.headings.at(0)!.slug;
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
