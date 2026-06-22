import type { RichTextNode } from "@/lib/rich-text-types";

export type InsightCategory =
  | "founder-psychology"
  | "family-continuity"
  | "next-generation-leadership"
  | "women-and-wealth"
  | "the-future-of-family-wealth";

export type ContentBlock =
  | { type: "long-description"; text: string }
  | { type: "paragraph"; contentJson?: RichTextNode | null; text?: string }
  | { type: "heading"; text: string }
  | { type: "image"; src?: string; alt?: string; caption?: string }
  | {
      type: "image-row";
      images?: [
        { src?: string; alt?: string; caption?: string },
        { src?: string; alt?: string; caption?: string },
      ];
      captions?: [string, string];
    }
  | { type: "video"; src?: string; caption?: string }
  | { type: "blockquote"; quote: string; attribution: string };

export interface Insight {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  intro: string;
  author: string;
  date: string;
  category: InsightCategory;
  featured?: boolean;
  coverSrc?: string;
  content: ContentBlock[];
}

export interface InsightCategoryFilter {
  id: InsightCategory | "all" | "see-all";
  label: string;
}
