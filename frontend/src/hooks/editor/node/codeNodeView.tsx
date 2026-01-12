import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

const CodeNodeView = () => {
  return (
    <NodeViewWrapper
      contentEditable={true}
      suppressContentEditableWarning
      data-drag-handle
      draggable
    >
      <div className="inline-block relative w-full">
        <pre
          className="bg-[#f9f8f7] p-3 my-3 rounded-md w-full"
          onDragStart={(e) => {
            e.preventDefault();
          }}
        >
          <NodeViewContent />
        </pre>
      </div>
    </NodeViewWrapper>
  );
};

export default CodeNodeView;
