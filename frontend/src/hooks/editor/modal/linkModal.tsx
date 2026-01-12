import { useState } from "react";

const LinkModal = ({ editor, savedRange, setIsLinkModal }) => {
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const handleLink = () => {
    if (!url.trim()) {
      return;
    }

    let finalUrl = url.trim();

    // http/https로 시작하지 않으면 https:// 붙여주기 (가장 사용자 친화적)
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }

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
      .setLink({ href: finalUrl })
      .setColor(color)
      .setBackgroundColor(backgroundColor)
      .run();

    setIsLinkModal(false);
  };

  const unsetLink = () => {
    const { from, to } = editor.state.selection;
    if (to - from == 0) return;
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
      .unsetLink()
      .setColor(color)
      .setBackgroundColor(backgroundColor)
      .run();

    setIsLinkModal(false);
  };
  return (
    <>
      <div className="flex flex-col gap-3 absolute top-full w-[280px] right-0 bg-white rounded-md border border-gray-400/30 mt-[6px] z-10 p-3 font-medium">
        <div className="flex w-full border-b border-b-gray-300">
          <input
            type="text"
            className="w-full text-sm focus:outline-none placeholder:text-gray-300 placeholder:font-light"
            placeholder="URL"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="flex w-full border-b border-b-gray-300">
          <input
            type="text"
            className="w-full text-sm focus:outline-none placeholder:text-gray-300 placeholder:font-light"
            placeholder="링크 제목"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-row justify-end items-center gap-3">
          {editor.isActive("link") && (
            <button
              className="text-sm bg-gray-300 px-3 py-1 rounded-md text-gray-700"
              onClick={() => {
                unsetLink();
              }}
            >
              링크 제거
            </button>
          )}
          <button
            className="text-sm bg-main px-3 py-1 rounded-md text-white"
            onClick={() => {
              handleLink();
            }}
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
};

export default LinkModal;
