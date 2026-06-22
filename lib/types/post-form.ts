import type { PostCategory, PostStatus } from "@prisma/client";
import type { RichTextNode } from "@/lib/rich-text-types";

export type BlockDraft =
  | { key: string; type: "PARAGRAPH"; contentJson: RichTextNode; imageUrl: ""; videoUrl: "" }
  | { key: string; type: "IMAGE"; text: ""; imageUrl: string; videoUrl: "" }
  | { key: string; type: "VIDEO"; text: ""; imageUrl: ""; videoUrl: string };

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
  publishDate: string;
  featured: boolean;
  longDescription: string;
  fileUrl: string;
  comingSoon: boolean;
  sections: SectionDraft[];
}
