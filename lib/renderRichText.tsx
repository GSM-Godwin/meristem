import type { RichTextNode } from "@/lib/rich-text-types";
import type { ReactNode } from "react";

const paragraphClass = "text-[16px] text-neutral leading-6 m-0";
const richTextFlowClass = "[&_p+p]:mt-0 [&_ul+p]:mt-2 [&_ol+p]:mt-2 [&_p+ul]:mt-2 [&_p+ol]:mt-2";

function renderTextNode(node: RichTextNode): ReactNode {
  let content: ReactNode = node.text ?? "";
  if (node.marks) {
    for (const mark of node.marks) {
      if (mark.type === "bold") content = <strong>{content}</strong>;
      if (mark.type === "italic") content = <em>{content}</em>;
    }
  }
  return content;
}

function renderNode(node: RichTextNode, key: string | number): ReactNode {
  switch (node.type) {
    case "paragraph":
      return (
        <p key={key} className={paragraphClass}>
          {node.content?.map((child, index) => renderNode(child, index))}
        </p>
      );
    case "text":
      return <span key={key}>{renderTextNode(node)}</span>;
    case "hardBreak":
      return <br key={key} />;
    case "bulletList":
      return (
        <ul key={key} className="list-disc pl-5 my-2 space-y-1">
          {node.content?.map((item, index) => renderNode(item, index))}
        </ul>
      );
    case "orderedList":
      return (
        <ol key={key} className="list-decimal pl-5 my-2 space-y-1">
          {node.content?.map((item, index) => renderNode(item, index))}
        </ol>
      );
    case "listItem":
      return (
        <li key={key} className={paragraphClass}>
          {node.content?.map((child, index) => renderNode(child, index))}
        </li>
      );
    default:
      return null;
  }
}

export function renderRichText(
  input: RichTextNode | string | null | undefined
): ReactNode {
  if (input == null || input === "") {
    return null;
  }

  if (typeof input === "string") {
    if (!input.trim()) return null;
    return <p className={paragraphClass}>{input}</p>;
  }

  if (input.type === "doc") {
    return (
      <div className={richTextFlowClass}>
        {input.content?.map((node, index) => renderNode(node, index))}
      </div>
    );
  }

  return renderNode(input, 0);
}
