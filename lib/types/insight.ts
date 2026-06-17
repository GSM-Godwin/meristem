export type InsightCategory =
  | "founder-psychology"
  | "family-continuity"
  | "next-generation-leadership"
  | "women-and-wealth"
  | "the-future-of-family-wealth";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; caption?: string }
  | { type: "image-row"; captions?: [string, string] }
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
  content: ContentBlock[];
}

export interface InsightCategoryFilter {
  id: InsightCategory | "all" | "see-all";
  label: string;
}
