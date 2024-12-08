import type { MDXInstance } from "astro";
import type { RequiredKey } from "./types/key-utils";

type MDXFile<T extends Record<string, any>> = Pick<
  MDXInstance<T>,
  | "frontmatter"
  | "file"
  | "url"
  | "getHeadings"
  | "Content"
  | "components"
  | "default"
>;

export type GuidePageFrontMatter = {
  title: string;
  weight: number;
  topic: string;

  section_title?: string;
  section_weight?: number;
};

export type GuideSectionPageFrontMatter = RequiredKey<
  GuidePageFrontMatter,
  "section_weight" | "section_title"
>;

export type GuidePageFile = MDXFile<GuidePageFrontMatter>;
export type GuideSectionPageFile = MDXFile<GuideSectionPageFrontMatter>;

export function getGuidePages(): MDXFile<GuidePageFrontMatter>[] {
  return Object.values<MDXFile<GuidePageFrontMatter>>(
    import.meta.glob("./pages/*/guides/*/*.mdx", { eager: true }),
  ).filter((file) => file.url);
}
