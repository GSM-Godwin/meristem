export type PublicationCategory =
  | "design"
  | "product"
  | "software-development"
  | "customer-success";

import type { ContentBlock } from "@/lib/types/insight";

export interface Publication {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Intro paragraph shown at the top of the detail page. */
  intro: string;
  author: string;
  date: string;
  category: PublicationCategory;
  coverColor: string;
  /** Article body — swappable for real CMS content when backend resumes. */
  content: ContentBlock[];
}

export interface PublicationCategoryFilter {
  id: PublicationCategory | "all";
  label: string;
}
