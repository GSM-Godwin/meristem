import type { ContentBlock } from "@/lib/types/insight";

export interface Perspective {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  duration: string;
  coverSrc?: string;
  intro: string;
  content: ContentBlock[];
}
