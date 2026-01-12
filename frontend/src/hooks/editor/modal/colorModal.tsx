import { BACKGROUNDCOLORS, COLORS, RecentlyUsedProps } from "../font";

const ColorModal = ({
  editor,
  fontColor,
  setFontColor,
  backgroundColor,
  setBackgroundColor,
  recentlyUsed,
  setRecentlyUsed,
  setIsColorModal,
}) => {
  return (
    <>
      <div className="flex flex-col gap-3 absolute top-full w-[180px] right-0 bg-white rounded-md border border-gray-400/30 mt-[6px] z-10 p-3">
        {/* RECENTLY USED */}
        {recentlyUsed.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-500">최근 사용</span>
            <div className="grid grid-cols-5 gap-2">
              {recentlyUsed.map((recent) => (
                <>
                  {recent.type == "color" ? (
                    <button
                      key={recent.color}
                      className="flex items-center justify-center w-6 h-6 outline outline-[1px] border rounded-md shrink-0 text-sm"
                      onClick={() => {
                        setFontColor(recent.color);
                        setRecentlyUsed((prev) => {
                          const newItem: RecentlyUsedProps = {
                            type: "color",
                            color: recent.color,
                            outline: recent.outline,
                          };
                          const filtered = prev.filter(
                            (item) =>
                              !(
                                item.type === newItem.type &&
                                item.color === newItem.color &&
                                item.outline === newItem.outline
                              ),
                          );
                          return [newItem, ...filtered].slice(0, 5);
                        });
                        editor.chain().focus().setColor(recent.color).run();
                      }}
                      style={{
                        color: recent.color,
                        outlineColor: recent.outline,
                      }}
                    >
                      <span>A</span>
                    </button>
                  ) : (
                    <button
                      key={recent.color}
                      className="flex items-center justify-center w-6 h-6 outline outline-[1px] border rounded-md shrink-0 text-sm"
                      onClick={() => {
                        setBackgroundColor(recent.color);
                        setRecentlyUsed((prev) => {
                          const newItem: RecentlyUsedProps = {
                            type: "background",
                            color: recent.color,
                            outline: recent.outline,
                          };
                          const filtered = prev.filter(
                            (item) =>
                              !(
                                item.type === newItem.type &&
                                item.color === newItem.color &&
                                item.outline === newItem.outline
                              ),
                          );
                          return [newItem, ...filtered].slice(0, 5);
                        });
                        editor
                          .chain()
                          .focus()
                          .setBackgroundColor(recent.color)
                          .run();
                        setIsColorModal(false);
                      }}
                      style={{
                        backgroundColor: recent.color,
                        outlineColor: recent.outline,
                      }}
                    ></button>
                  )}
                </>
              ))}
            </div>
          </div>
        )}
        {/* FONT COLOR */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">텍스트 색상</span>
          <div className="grid grid-cols-5 gap-2">
            {COLORS.map((color) => (
              <button
                key={color.value}
                className={`flex items-center justify-center w-6 h-6 outline border rounded-md shrink-0 text-sm
                            ${
                              color.value == fontColor
                                ? "outline-[2px]"
                                : "outline-[1px]"
                            }
                            `}
                onClick={() => {
                  setFontColor(color.value);
                  setRecentlyUsed((prev) => {
                    const newItem: RecentlyUsedProps = {
                      type: "color",
                      color: color.value,
                      outline: color.outline,
                    };
                    const filtered = prev.filter(
                      (item) =>
                        !(
                          item.type === newItem.type &&
                          item.color === newItem.color &&
                          item.outline === newItem.outline
                        ),
                    );
                    return [newItem, ...filtered].slice(0, 5);
                  });
                  editor.chain().focus().setColor(color.value).run();
                  setIsColorModal(false);
                }}
                style={{
                  color: color.value,
                  outlineColor: color.outline,
                }}
              >
                <span>A</span>
              </button>
            ))}
          </div>
        </div>
        {/* BACKGROUND COLOR */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">배경 색상</span>
          <div className="grid grid-cols-5 gap-2">
            {BACKGROUNDCOLORS.map((color) => (
              <button
                key={color.value}
                className={`flex items-center justify-center w-6 h-6 outline border rounded-md shrink-0 text-sm
                            ${
                              color.value == backgroundColor
                                ? "outline-[2px]"
                                : "outline-[1px]"
                            }
                            `}
                onClick={() => {
                  setBackgroundColor(color.value);
                  setRecentlyUsed((prev) => {
                    const newItem: RecentlyUsedProps = {
                      type: "background",
                      color: color.value,
                      outline: color.outline,
                    };
                    const filtered = prev.filter(
                      (item) =>
                        !(
                          item.type === newItem.type &&
                          item.color === newItem.color &&
                          item.outline === newItem.outline
                        ),
                    );
                    return [newItem, ...filtered].slice(0, 5);
                  });
                  editor.chain().focus().setBackgroundColor(color.value).run();
                  setIsColorModal(false);
                }}
                style={{
                  color: color.value,
                  outlineColor: color.outline,
                  backgroundColor: color.value,
                }}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorModal;
