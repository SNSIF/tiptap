import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  BackgroundColor,
} from "@tiptap/extension-text-style";
import {
  ListItem,
  OrderedList,
  BulletList,
  TaskList,
} from "@tiptap/extension-list";
import TaskItem from "@tiptap/extension-task-item";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Dropcursor } from "@tiptap/extensions";
import TextAlign from "@tiptap/extension-text-align";

import { EditorToolBar } from "../../hooks/editor/toolbar";
import { RecentlyUsedProps } from "../../hooks/editor/font";
import { useEvent } from "../../hooks/editor/useEvent";
import { CustomCodeBlock, CustomImage } from "../../hooks/editor/extension";
import Link from "@tiptap/extension-link";

export const EditorArea = () => {
  const [updateTrigger, setUpdateTrigger] = useState<number>(0);

  // FONT RELATED
  const [fontFamily, setFontFamily] = useState<string>("Inter");
  const [fontSize, setFontSize] = useState<string>("16px");
  const [fontColor, setFontColor] = useState<string>("#000000");
  const [backgroundColor, setBackgroundColor] = useState<string>("#FFFFFF");

  const [recentlyUsed, setRecentlyUsed] = useState<RecentlyUsedProps[]>([]);

  const [isLinkModal, setIsLinkModal] = useState<boolean>(false);
  const [savedRange, setSavedRange] = useState<{
    from: number;
    to: number;
  } | null>(null);

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      StarterKit.configure({
        heading: false,
        orderedList: false,
        bulletList: false,
        listItem: false,
        dropcursor: false,
        codeBlock: false,
      }),

      // FONT RELATED
      TextStyle, // 폰트 관련 공통 extension
      FontFamily, // 폰트 변경을 위한 extension
      FontSize, // 폰트 사이즈 변경을 위한 extension
      Color, // 폰트 색상 변경을 위한 extension
      BackgroundColor, // 배경 색상 변경을 위한 extension

      // LIST RELATED
      OrderedList,
      BulletList,
      ListItem,
      TaskList,
      TaskItem,
      Dropcursor.configure({
        color: "#cce4ff",
        width: 5,
      }),
      CustomImage,

      // TEXT ALIGNMENT
      TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "left",
      }),
      CustomCodeBlock,

      Link.configure({
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
      }),
    ],
    content: ``,
    editorProps: {
      attributes: {
        class:
          "w-full h-[calc(100dvh-60px)] focus:outline-none p-5 overflow-y-auto",
        style: "font-size: 16px;",
      },
    },

    onTransaction: ({ editor, transaction }) => {
      // 의미 있는 변경이 있을 때만 상태 업데이트
      if (
        !isLinkModal &&
        !savedRange &&
        (transaction.docChanged || // 내용 변경
          transaction.selectionSet || // 선택 영역 변경
          transaction.storedMarksSet) // 마크(스타일) 변경 ← Ctrl+B 여기 해당
      ) {
        updateToolBar(editor);
      }
    },

    onFocus: ({ editor }) => {
      updateToolBar(editor);
    },

    onCreate: ({ editor }) => {
      updateToolBar(editor);
      setUpdateTrigger(1);
    },
  });
  const handleHightLight = () => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    if (to - from == 0) return;
    editor
      .chain()
      .focus()
      .setTextSelection({ from, to })
      .setColor("#ffffff")
      .setBackgroundColor("#000000")
      .run();

    setIsLinkModal(true);
    setSavedRange({ from, to });
  };

  const eventHandlers = useEvent({
    editor,
    recentlyUsed,
    fontColor,
    backgroundColor,
    handleHightLight,
  });

  editor.setOptions({
    editorProps: {
      ...eventHandlers,
    },
  });

  if (!editor) return null;

  const updateToolBar = (editor) => {
    const attrs = editor.getAttributes("textStyle");
    setFontFamily(attrs.fontFamily || "Inter");
    setFontSize(attrs.fontSize ? attrs.fontSize : "16px");
    setUpdateTrigger((prev) => prev + 1);
    if (attrs.color == "#ffffff") {
      return;
    }
    setFontColor(attrs.color || "#000000");
    setBackgroundColor(attrs.backgroundColor || "#FFFFFF");
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <EditorToolBar
        editor={editor}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontColor={fontColor}
        setFontColor={setFontColor}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        isLinkModal={isLinkModal}
        setIsLinkModal={setIsLinkModal}
        savedRange={savedRange}
        setSavedRange={setSavedRange}
        handleHightLight={handleHightLight}
        recentlyUsed={recentlyUsed}
        setRecentlyUsed={setRecentlyUsed}
        key={updateTrigger}
      />

      <EditorContent editor={editor} />
    </div>
  );
};
