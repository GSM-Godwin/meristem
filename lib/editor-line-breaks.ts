import { Extension } from "@tiptap/core";
import HardBreak from "@tiptap/extension-hard-break";

export const HardBreakWithoutKeys = HardBreak.extend({
  addKeyboardShortcuts() {
    return {};
  },
});

export const ParagraphAndLineBreakKeys = Extension.create({
  name: "paragraphAndLineBreakKeys",
  priority: 1001,
  addKeyboardShortcuts() {
    return {
      Enter: () => {
        if (this.editor.isActive("bulletList") || this.editor.isActive("orderedList")) {
          return this.editor.commands.splitListItem("listItem");
        }
        return this.editor.commands.setHardBreak();
      },
      "Shift-Enter": () => {
        if (this.editor.isActive("bulletList") || this.editor.isActive("orderedList")) {
          return this.editor.commands.liftListItem("listItem");
        }
        return this.editor.commands.splitBlock();
      },
    };
  },
});
