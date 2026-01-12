import { Editor } from "@tiptap/react";
import { RecentlyUsedProps } from "./font";

import { NodeSelection, TextSelection } from "prosemirror-state";

export const moveBlock = (editor: Editor, direction: -1 | 1): boolean => {
  const view = editor.view;
  const state = view.state;
  const { doc, selection } = state;

  let $from;
  if (selection instanceof TextSelection) {
    $from = selection.$from;
  } else if (selection instanceof NodeSelection) {
    $from = doc.resolve(selection.from);
  } else {
    return false;
  }

  let depth = $from.depth;
  while (depth > 0 && !$from.node(depth).isBlock) depth--;
  if (depth === 0) return false;

  const parent = $from.node(depth - 1);
  const index = $from.index(depth - 1);

  const curFrom = $from.before(depth);
  const curNode = $from.node(depth);
  const curTo = curFrom + curNode.nodeSize;

  const cursorOffset = Math.max(1, selection.from - curFrom);

  let newBlockFrom: number;

  // ⬆️ 위로 이동
  if (direction === -1) {
    if (index === 0) return false;

    const prevNode = parent.child(index - 1);
    const prevFrom = curFrom - prevNode.nodeSize;
    const prevTo = curFrom;

    const curSlice = doc.slice(curFrom, curTo);
    const prevSlice = doc.slice(prevFrom, prevTo);

    let tr = state.tr;
    tr = tr.delete(curFrom, curTo);
    tr = tr.delete(prevFrom, prevTo);
    tr = tr.insert(prevFrom, curSlice.content);
    tr = tr.insert(prevFrom + curSlice.size, prevSlice.content);

    newBlockFrom = prevFrom;

    const maxOffset = tr.doc.nodeAt(newBlockFrom)!.nodeSize - 2;
    const safeOffset = Math.min(cursorOffset, maxOffset);

    tr = tr.setSelection(
      TextSelection.create(tr.doc, newBlockFrom + safeOffset),
    );

    view.dispatch(tr);
    return true;
  }

  // ⬇️ 아래로 이동
  if (direction === 1) {
    if (index >= parent.childCount - 1) return false;

    const nextNode = parent.child(index + 1);
    const nextFrom = curTo;
    const nextTo = nextFrom + nextNode.nodeSize;

    const curSlice = doc.slice(curFrom, curTo);
    const nextSlice = doc.slice(nextFrom, nextTo);

    let tr = state.tr;
    tr = tr.delete(nextFrom, nextTo);
    tr = tr.delete(curFrom, curTo);
    tr = tr.insert(curFrom, nextSlice.content);
    tr = tr.insert(curFrom + nextSlice.size, curSlice.content);

    newBlockFrom = curFrom + nextSlice.size;

    const maxOffset = tr.doc.nodeAt(newBlockFrom)!.nodeSize - 2;
    const safeOffset = Math.min(cursorOffset, maxOffset);

    tr = tr.setSelection(
      TextSelection.create(tr.doc, newBlockFrom + safeOffset),
    );

    view.dispatch(tr);
    return true;
  }

  return false;
};

interface editorEventProps {
  editor: Editor | null;
  recentlyUsed: RecentlyUsedProps[];
  fontColor: string;
  backgroundColor: string;
  handleHightLight: () => void;
}

export function useEvent({
  editor,
  recentlyUsed,
  fontColor,
  backgroundColor,
  handleHightLight,
}: editorEventProps) {
  return {
    handleKeyDown: (view, event: KeyboardEvent) => {
      if (event.key === "Tab" && event.shiftKey) {
        event.preventDefault();

        const { state } = editor;
        const { $from } = state.selection;

        const lineStart = $from.start();
        const lineEnd = $from.end();

        // 현재 줄 텍스트
        const lineText = state.doc.textBetween(lineStart, lineEnd, "\n", "\n");

        // 줄 앞 공백/탭을 최대 4칸까지만
        const match = lineText.match(/^[ \t]{1,4}/);

        if (match) {
          editor.commands.deleteRange({
            from: lineStart,
            to: lineStart + match[0].length,
          });
        }

        return true;
      }

      // TAB → 공백 4칸
      if (event.key === "Tab") {
        event.preventDefault();

        editor
          .chain()
          .focus()
          .insertContent("    ") // 공백 4칸
          .run();

        return true;
      }

      // 기존 단축키 로직
      if (event.ctrlKey || event.metaKey) {
        if (event.shiftKey) {
          if (
            event.key == "x" ||
            event.key == "X" ||
            event.key == "s" ||
            event.key == "S"
          ) {
            editor.chain().focus().toggleStrike().run();
            event.preventDefault();
            return true;
          }
          if (event.key == "h" || event.key == "H") {
            if (recentlyUsed) {
              const lastUsed = recentlyUsed[0];
              if (lastUsed.type == "color") {
                if (fontColor != lastUsed.color) {
                  editor.chain().focus().setColor(lastUsed.color).run();
                } else {
                  editor.chain().focus().unsetColor().run();
                }
              } else {
                if (backgroundColor != lastUsed.color) {
                  editor
                    .chain()
                    .focus()
                    .setBackgroundColor(lastUsed.color)
                    .run();
                } else {
                  editor.chain().focus().unsetBackgroundColor().run();
                }
              }
            }
          }
        }
        if (event.key == "k" || event.key == "K") {
          event.preventDefault();
          handleHightLight();
        }
      }

      if (event.altKey && !event.ctrlKey && !event.metaKey) {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          return moveBlock(editor, -1);
        }

        if (event.key === "ArrowDown") {
          event.preventDefault();
          return moveBlock(editor, 1);
        }
      }

      return false;
    },
    handlePaste(view, event: ClipboardEvent) {
      const items = event.clipboardData?.items;
      if (!items) return false;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (!file) continue;

          const url = URL.createObjectURL(file);

          view.dispatch(
            view.state.tr.replaceSelectionWith(
              view.state.schema.nodes.image.create({
                src: url,
              }),
            ),
          );

          return true;
        }
      }

      return false;
    },
    handleDrop(view, event: DragEvent) {
      const dt = event.dataTransfer.effectAllowed;
      if (!dt) return false;
      if (dt == "copyMove") return;

      event.preventDefault();

      const files = event.dataTransfer?.files;
      if (!files || files.length === 0) return false;

      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/"),
      );

      if (imageFiles.length === 0) return false;

      event.preventDefault();

      const { schema } = view.state;
      const coordinates = view.posAtCoords({
        left: event.clientX,
        top: event.clientY,
      });

      if (!coordinates) return false;

      const tr = view.state.tr;

      imageFiles.forEach((file) => {
        const url = URL.createObjectURL(file);
        const node = schema.nodes.image.create({ src: url });
        tr.insert(coordinates.pos, node);
      });

      view.dispatch(tr);
      return true;
    },
  };
}
