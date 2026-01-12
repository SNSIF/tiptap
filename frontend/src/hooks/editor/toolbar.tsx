import { Editor } from "@tiptap/core";
import { FONTS, FONTSIZES, RecentlyUsedProps } from "./font";
import { useEffect, useRef, useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ChevronDown,
  ImagePlus,
  LinkIcon,
} from "lucide-react";
import ColorModal from "./modal/colorModal";
import SelectBox from "./selectBox";
import LinkModal from "./modal/linkModal";

interface RangeProps {
  from: number;
  to: number;
}

interface EditorToolBarProps {
  editor: Editor | null;
  fontFamily: string;
  setFontFamily: (fontSize: string) => void;
  fontSize: string;
  setFontSize: (fontSize: string) => void;
  fontColor: string;
  setFontColor: (fontColor: string) => void;
  backgroundColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
  isLinkModal: boolean;
  setIsLinkModal: (isLinkModal: boolean) => void;
  savedRange: RangeProps;
  setSavedRange: (savedRange: RangeProps) => void;
  handleHightLight: () => void;
  recentlyUsed: RecentlyUsedProps[];
  setRecentlyUsed: React.Dispatch<React.SetStateAction<RecentlyUsedProps[]>>; // ← 이거!
}

export const EditorToolBar = ({
  editor,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  fontColor,
  setFontColor,
  backgroundColor,
  setBackgroundColor,
  isLinkModal,
  setIsLinkModal,
  savedRange,
  handleHightLight,
  recentlyUsed,
  setRecentlyUsed,
}: EditorToolBarProps) => {
  const [isColorModal, setIsColorModal] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // 버튼 전체를 참조할 ref 생성
  const colorButtonRef = useRef<HTMLDivElement>(null);
  const linkButtonRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    if (!isColorModal && !isLinkModal) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorButtonRef.current &&
        !colorButtonRef.current.contains(event.target as Node)
      ) {
        setIsColorModal(false);
      }
      if (
        linkButtonRef.current &&
        !linkButtonRef.current.contains(event.target as Node)
      ) {
        if (savedRange) {
          const from = savedRange.from;
          const to = savedRange.to;
          const attrs = editor.getAttributes("textStyle");
          let color: string;
          let backgroundColor: string;

          if (!attrs.color) {
            color = "#000000";
          }
          if (!attrs.backgroundColor) {
            backgroundColor = "#FFFFFF";
          }
          editor
            .chain()
            .focus()
            .setTextSelection({ from, to })
            .setColor(color)
            .setBackgroundColor(backgroundColor)
            .run();
        }
        setIsLinkModal(false);
      }
    };

    // document 전체에 클릭 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);

    // cleanup: 컴포넌트 언마운트 시나 모달 닫힐 때 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isColorModal, isLinkModal]);

  return (
    <div className="border border-b bg-gray-300/30 p-2 text-gray-700 font-semibold h-[60px]">
      <div className="flex flex-row gap-3 h-full">
        <SelectBox
          className="w-[150px]"
          value={fontFamily}
          onChange={(fontFamily: string) => {
            setFontFamily(fontFamily);
            editor.chain().focus().setFontFamily(fontFamily).run();
          }}
          options={FONTS}
          isFont={true}
        />
        <SelectBox
          className="w-[150px]"
          value={fontSize}
          onChange={(fontSize: string) => {
            setFontSize(fontSize);
            editor.chain().focus().setFontSize(`${fontSize}`).run();
          }}
          options={FONTSIZES}
        />
        <button
          onClick={() => {
            editor.chain().focus().toggleBold().run();
          }}
          className={`hover:text-blue-500 font bold shrink-0 flex flex-row items-center justify-center h-10 w-10 bg-white rounded-md border border-gray-400/30
            ${editor?.isActive("bold") ? "text-blue-600" : ""}
            `}
        >
          <span className="font-bold">B</span>
        </button>
        <button
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
          }}
          className={`hover:text-blue-500 font bold shrink-0 flex flex-row items-center justify-center h-10 w-10 bg-white rounded-md border border-gray-400/30
            ${editor?.isActive("italic") ? "text-blue-600 font-bold" : ""}
            `}
        >
          <span className="italic">I</span>
        </button>
        <button
          onClick={() => {
            editor.chain().focus().toggleUnderline().run();
          }}
          className={`hover:text-blue-500 font bold shrink-0 flex flex-row items-center justify-center h-10 w-10 bg-white rounded-md border border-gray-400/30
            ${editor?.isActive("underline") ? "text-blue-600 font-bold" : ""}
            `}
        >
          <span className="underline">U</span>
        </button>
        <button
          onClick={() => {
            editor.chain().focus().toggleStrike().run();
          }}
          className={`hover:text-blue-500 font bold shrink-0 flex flex-row items-center justify-center h-10 w-10 bg-white rounded-md border border-gray-400/30
            ${editor?.isActive("strike") ? "text-blue-600 font-bold" : ""}
            `}
        >
          <span className="line-through">S</span>
        </button>
        <button
          onClick={() => {
            editor.chain().focus().setTextAlign("left").run();
          }}
          className={`hover:text-blue-500 font bold shrink-0 flex flex-row items-center justify-center h-10 w-10 bg-white rounded-md border border-gray-400/30
            ${
              editor?.isActive({ textAlign: "left" })
                ? "text-blue-600 font-bold"
                : ""
            }
            `}
        >
          <AlignLeft />
        </button>
        <button
          onClick={() => {
            editor.chain().focus().setTextAlign("center").run();
          }}
          className={`hover:text-blue-500 font bold shrink-0 flex flex-row items-center justify-center h-10 w-10 bg-white rounded-md border border-gray-400/30
            ${
              editor?.isActive({ textAlign: "center" })
                ? "text-blue-600 font-bold"
                : ""
            }
            `}
        >
          <AlignCenter />
        </button>
        <button
          onClick={() => {
            editor.chain().focus().setTextAlign("right").run();
          }}
          className={`hover:text-blue-500 font bold shrink-0 flex flex-row items-center justify-center h-10 w-10 bg-white rounded-md border border-gray-400/30
            ${
              editor?.isActive({ textAlign: "right" })
                ? "text-blue-600 font-bold"
                : ""
            }
            `}
        >
          <AlignRight />
        </button>
        <div ref={colorButtonRef} className="relative">
          <button
            onClick={() => {
              setIsColorModal((prev) => !prev);
            }}
            className="flex flex-row items-center justify-center gap-2 relative"
          >
            <div
              className="hover:text-blue-500 font bold flex items-center justify-center h-10 w-10 bg-white rounded-md border border-gray-400/30"
              style={{ color: fontColor, backgroundColor: backgroundColor }}
            >
              <span>A</span>
            </div>
            <ChevronDown className="text-gray-400/80 w-5 h-5" />
          </button>
          {isColorModal && (
            <ColorModal
              editor={editor}
              fontColor={fontColor}
              setFontColor={setFontColor}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              recentlyUsed={recentlyUsed}
              setRecentlyUsed={setRecentlyUsed}
              setIsColorModal={setIsColorModal}
            />
          )}
        </div>
        <button
          onClick={() => {
            imageInputRef.current?.click();
          }}
          className="hover:text-blue-500 font bold shrink-0 flex flex-row items-center justify-center h-10 w-10 bg-white rounded-md border border-gray-400/30"
        >
          <ImagePlus />
        </button>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file || !editor) return;

            const reader = new FileReader();
            reader.onload = () => {
              editor
                .chain()
                .focus()
                .setImage({ src: reader.result as string })
                .run();
            };

            reader.readAsDataURL(file);

            // 같은 파일 다시 선택 가능하게 초기화
            e.target.value = "";
          }}
        />
        <div ref={linkButtonRef} className="relative">
          <button
            onClick={() => {
              handleHightLight();
            }}
            className="relative hover:text-blue-500 font bold shrink-0 flex flex-row items-center justify-center h-10 w-10 bg-white rounded-md border border-gray-400/30"
          >
            <LinkIcon />
          </button>

          {isLinkModal && (
            <LinkModal
              editor={editor}
              savedRange={savedRange}
              setIsLinkModal={setIsLinkModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};
