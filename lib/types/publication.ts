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
  intro: string;
  author: string;
  date: string;
  category: PublicationCategory;
  coverColor: string;
  coverSrc?: string;
  fileUrl?: string;
  comingSoon?: boolean;
  content: ContentBlock[];
}

export interface PublicationCategoryFilter {
  id: PublicationCategory | "all";
  label: string;
}
