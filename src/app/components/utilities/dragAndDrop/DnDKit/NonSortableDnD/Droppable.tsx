//id must be unique to keep track
import { useDroppable } from "@dnd-kit/core";
import { useRef } from "react";
import mergeRefs from "../../../../../helpers/mergeRefs";
function Droppable(props: any) {
  const droppableRef = useRef();
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    disabled: props.disabled,
    data: {
      node: droppableRef.current,
      parentNode: props.parentNode,
      customParentNode: props.customParentNode
        ? props.customParentNode.node
        : null,
      categoryIndex: props.categoryIndex,
    },
  });
  let previewProps = {};
  if (props.preview) {
    previewProps = {
      onClick: null,
      onKeyDown: null,
      tabIndex: -1,
    };
  }
  return (
    <div
      ref={mergeRefs([setNodeRef, droppableRef])}
      className={`${props.innerDroppableClassName}${
        isOver || props.isOver === props.id ? " " + props.draggingOverClass : ""
      }${props.placeHolderClass ? " " + props.placeHolderClass : ""}`}
      onClick={props.firstElTap ? props.onTap : null}
      onKeyDown={props.firstElTap ? props.onTap : null}
      tabIndex={props.firstElTap ? 0 : -1}
      data-tap-droppable-id={props.id.toString()}
      data-tap-category-index={props.categoryIndex}
      {...previewProps}
    >
      {props.children}
    </div>
  );
}

export default Droppable;
