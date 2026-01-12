import { NodeViewWrapper } from "@tiptap/react";

import { useRef } from "react";

const ImageNodeView = ({ node, updateAttributes }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const alignClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }[node.attrs.align || "left"];

  const onResizeMouseDown = (
    e: React.MouseEvent,
    direction: "left" | "right"
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const img = imgRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const startX = e.clientX;
    const startWidth = rect.width;

    const onMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - startX;

      const newWidth =
        direction === "right" ? startWidth + diff : startWidth - diff;

      updateAttributes({
        width: `${Math.max(120, newWidth)}px`,
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <NodeViewWrapper
      className={`relative flex ${alignClass} group`}
      contentEditable={false}
      data-drag-handle
      draggable
    >
      <div className="inline-block relative">
        <img
          ref={imgRef}
          src={node.attrs.src}
          draggable={false}
          style={{
            width: node.attrs.width ?? "auto",
            maxWidth: "100%",
          }}
        />

        <div className="absolute w-full h-1/2 top-1/2 -translate-y-1/2 flex justify-between items-center p-3 opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none">
          {/* 왼쪽 핸들 */}
          <div
            onMouseDown={(e) => onResizeMouseDown(e, "left")}
            className="pointer-events-auto absolute left-0 top-1/2 -translate-y-1/2
               w-[6px] h-12 cursor-ew-resize bg-gray-700 rounded-full"
          />

          {/* 오른쪽 핸들 */}
          <div
            onMouseDown={(e) => onResizeMouseDown(e, "right")}
            className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2
               w-[6px] h-12 cursor-ew-resize bg-gray-700 rounded-full"
          />
        </div>
        <div className="absolute w-full h-1/3 top-0 right-0 flex justify-end p-1 opacity-0 group-hover:opacity-100 transition-opacity ">
          <div className="flex flex-row gap-1">
            <button
              className="hover:bg-gray-300 border bg-gray-100 border-gray-300 h-6 w-6 flex items-center justify-center rounded-md"
              onClick={() => updateAttributes({ align: "left" })}
            >
              <svg
                aria-hidden="true"
                role="graphics-symbol"
                viewBox="0 0 16 16"
                className="w-4 h-4 fill-current flex-shrink-0"
              >
                <path d="M2.4 2.175a.625.625 0 1 0 0 1.25h11.2a.625.625 0 1 0 0-1.25zm1.2 2A1.825 1.825 0 0 0 1.775 6v4c0 1.008.817 1.825 1.825 1.825H8A1.825 1.825 0 0 0 9.825 10V6A1.825 1.825 0 0 0 8 4.175zM3.025 6c0-.318.258-.575.575-.575H8c.318 0 .575.257.575.575v4a.575.575 0 0 1-.575.575H3.6A.575.575 0 0 1 3.025 10zM2.4 12.575a.625.625 0 1 0 0 1.25h11.2a.625.625 0 1 0 0-1.25z"></path>
              </svg>
            </button>
            <button
              className="hover:bg-gray-300 border bg-gray-100 border-gray-300 h-6 w-6 flex items-center justify-center rounded-md"
              onClick={() => updateAttributes({ align: "center" })}
            >
              <svg
                aria-hidden="true"
                role="graphics-symbol"
                viewBox="0 0 16 16"
                className="w-4 h-4 fill-current flex-shrink-0"
              >
                <path d="M2.4 2.175a.625.625 0 1 0 0 1.25h11.2a.625.625 0 1 0 0-1.25zm3.4 2h4.4c1.008 0 1.825.817 1.825 1.825v4a1.825 1.825 0 0 1-1.825 1.825H5.8A1.825 1.825 0 0 1 3.975 10V6c0-1.008.817-1.825 1.825-1.825M5.225 6v4c0 .318.258.575.575.575h4.4a.575.575 0 0 0 .575-.575V6a.575.575 0 0 0-.575-.575H5.8A.575.575 0 0 0 5.225 6M2.4 12.575a.625.625 0 1 0 0 1.25h11.2a.625.625 0 1 0 0-1.25z"></path>
              </svg>{" "}
            </button>{" "}
            <button
              className="hover:bg-gray-300 border bg-gray-100 border-gray-300 h-6 w-6 flex items-center justify-center rounded-md"
              onClick={() => updateAttributes({ align: "right" })}
            >
              <svg
                aria-hidden="true"
                role="graphics-symbol"
                viewBox="0 0 16 16"
                className="w-4 h-4 fill-current flex-shrink-0"
              >
                <path d="M2.4 2.175a.625.625 0 1 0 0 1.25h11.2a.625.625 0 1 0 0-1.25zm5.6 2A1.825 1.825 0 0 0 6.175 6v4c0 1.008.817 1.825 1.825 1.825h4.4A1.825 1.825 0 0 0 14.225 10V6A1.825 1.825 0 0 0 12.4 4.175zM7.425 6c0-.318.257-.575.575-.575h4.4c.318 0 .575.257.575.575v4a.575.575 0 0 1-.575.575H8A.575.575 0 0 1 7.425 10zM2.4 12.575a.625.625 0 1 0 0 1.25h11.2a.625.625 0 1 0 0-1.25z" />
              </svg>{" "}
            </button>
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default ImageNodeView;
