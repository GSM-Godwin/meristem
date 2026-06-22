"use client";

import type { ReactNode } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { toPlainRichText } from "@/lib/rich-text";
import type { RichTextNode } from "@/lib/rich-text-types";
import { EMPTY_DOC } from "@/lib/rich-text";
import { HardBreakWithoutKeys, ParagraphAndLineBreakKeys } from "@/lib/editor-line-breaks";

interface RichTextEditorProps {
  value: RichTextNode;
  onChange: (json: RichTextNode) => void;
}

function ToolbarButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition ${
        active
          ? "border-primary bg-primary/10 text-dark1"
          : "border-light2 bg-white text-neutral hover:border-primary/40"
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: false,
      }),
      HardBreakWithoutKeys.configure({ keepMarks: true }),
      ParagraphAndLineBreakKeys,
    ],
    content: value ?? EMPTY_DOC,
    immediatelyRender: false,
    onUpdate: ({ editor: ed }) => {
      onChange(toPlainRichText(ed.getJSON() as RichTextNode));
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] px-4 py-3 text-sm text-dark1 outline-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:m-0 [&_p+p]:mt-0",
      },
    },
  });

  if (!editor) {
    return (
      <div className="rounded-lg border border-light2 bg-white min-h-[120px] px-4 py-3 text-sm text-light3">
        Loading editor…
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-light2 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition">
      <div className="flex flex-wrap items-center gap-1.5 border-b border-light2 bg-light1 px-2 py-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          Bold
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          Italic
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          Bullet List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          Numbered List
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHardBreak().run()}>
          Line break
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </ToolbarButton>
        <span className="w-full text-[11px] text-light3 px-1 pt-0.5 sm:w-auto sm:ml-auto sm:pt-0">
          Enter: new line · Shift+Enter: new paragraph
        </span>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
