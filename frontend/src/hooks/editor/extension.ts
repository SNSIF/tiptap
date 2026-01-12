import Image from "@tiptap/extension-image";
import ImageNodeView from "./node/imageNodeView";
import { ReactNodeViewRenderer } from "@tiptap/react";

import "highlight.js/styles/github.css";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import CodeNodeView from "./node/codeNodeView";

const lowlight = createLowlight(all);

export const CustomImage = Image.extend({
  inline: false,
  group: "block",
  draggable: true,
  selectable: true,
  addAttributes() {
    return {
      ...this.parent?.(),

      width: {
        default: null,
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return {
            style: `width: ${attributes.width};`,
          };
        },
      },
      align: {
        default: "left",
        renderHTML: (attrs) => ({
          "data-align": attrs.align,
        }),
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});

export const CustomCodeBlock = CodeBlockLowlight.extend({
  inline: false,
  group: "block",
  draggable: true,
  selectable: true,

  addNodeView() {
    return ReactNodeViewRenderer(CodeNodeView);
  },
}).configure({ lowlight });
