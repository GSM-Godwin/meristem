import type { PostCategory, PostStatus } from "@prisma/client";

export type BlockDraft =
  | { key: string; type: "PARAGRAPH"; text: string; imageUrl: "" }
  | { key: string; type: "IMAGE"; text: ""; imageUrl: string };

export type SectionDraft =
  | {
      key: string;
      type: "CONTENT";
      heading: string;
      quoteText: "";
      attribution: "";
      blocks: BlockDraft[];
    }
  | {
      key: string;
      type: "QUOTE";
      heading: "";
      quoteText: string;
      attribution: string;
      blocks: [];
    };

export interface PostFormValues {
  id?: string;
  title: string;
  shortDescription: string;
  featuredImage: string;
  writtenBy: string;
  category: PostCategory;
  status: PostStatus;
  publishDate: string; // yyyy-mm-dd for the date input
  featured: boolean;
  longDescription: string;
  sections: SectionDraft[];
}
