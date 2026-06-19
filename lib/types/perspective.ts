import type { ContentBlock } from "@/lib/types/insight";

export interface Perspective {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  duration: string;
  /** Intro paragraph shown at the top of the detail page. */
  intro: string;
  /** Article body — swappable for real CMS content when backend resumes. */
  content: ContentBlock[];
}
