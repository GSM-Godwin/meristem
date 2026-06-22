import type { RichTextNode } from "@/lib/rich-text-types";

export type { RichTextMark, RichTextNode } from "@/lib/rich-text-types";

export const EMPTY_DOC: RichTextNode = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export function isRichTextEmpty(doc: RichTextNode | null | undefined): boolean {
  if (!doc?.content?.length) return true;
  const parts: string[] = [];
  function walk(node: RichTextNode) {
    if (node.type === "text" && node.text) parts.push(node.text);
    node.content?.forEach(walk);
  }
  doc.content.forEach(walk);
  return parts.join("").trim() === "";
}

export function toPlainRichText(doc: RichTextNode): RichTextNode {
  return JSON.parse(JSON.stringify(doc)) as RichTextNode;
}
