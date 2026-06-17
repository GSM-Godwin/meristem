export type PublicationCategory =
  | "design"
  | "product"
  | "software-development"
  | "customer-success";

export interface Publication {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: PublicationCategory;
  coverColor: string;
}

export interface PublicationCategoryFilter {
  id: PublicationCategory | "all";
  label: string;
}
