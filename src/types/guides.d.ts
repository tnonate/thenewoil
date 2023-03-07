import type { MDXInstance } from "astro";

import type { RequiredKey } from "./key-utils";

interface GuidePageFrontMatter {
    section_title?: string;
    section_weight?: number;
    weight: number;
    title: string;
}

type GuidePage = MDXInstance<GuidePageFrontMatter>;
type GuideSectionPage = MDXInstance<RequiredKey<GuidePageFrontMatter, "section_weight" | "section_title">>;