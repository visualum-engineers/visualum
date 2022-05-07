import React, { RefObject } from "react";
import { useRef } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItems from "./SortableItems";
import Droppable from "../NonSortableDnD/Droppable";
import useBodyAreaResizable from "../../../../../hooks/use-body-area-resizable";

const innerListPropsEqual = (prev: any, next: any) => {
  const prevContent = prev.content;
  //determine if content arrays are equal
  const isContentItemsEqual = next.content.every(
    (item: any, index: number) =>
      item && prevContent[index] && item.id === prevContent[index].id
  );
  const isContentLengthEqual = next.content.length === prev.content.length;
  const isContentEqual = isContentItemsEqual && isContentLengthEqual;
  //check all other props
  const isDisabledEqual = prev.disableDnD === next.disableDnD;
  const isOnTapEqual = prev.onTap === next.onTap;
  const isFirstElTap = prev.firstElTap === next.firstElTap;
  const isDraggingClassName =
    prev.draggableClassName === next.draggableClassName;
  const propsEqual =
    isContentEqual &&
    isDisabledEqual &&
    isOnTapEqual &&
    isFirstElTap &&
    isDraggingClassName;
  return propsEqual;
};

const InnerList = React.memo(
  ({
    id,
    content,
    onTap,
    firstElTap,
    disableDnD,
    isDraggingClass,
    draggableClassName,
  }: any) =>
    content.map((draggableContent: any, index: number) => {
      let last = index === content.length - 1;
      return (
        <SortableItems
          key={draggableContent.id}
          id={draggableContent.id}
          content={draggableContent.content}
          isDraggingClass={isDraggingClass}
          index={index}
          droppableId={id.toString()}
          onTap={disableDnD ? onTap : null}
          disabled={disableDnD}
          draggableClassName={
            `${draggableClassName}${last ? " last-item" : ""}` +
            `${
              firstElTap &&
              firstElTap.draggableId.toString() ===
                draggableContent.id.toString()
                ? ` ${isDraggingClass}`
                : " "
            }`
          }
        />
      );
    }),
  innerListPropsEqual
);

const SortableArea = ({
  id,
  content,
  droppableHeader = null,
  onTap = null,
  firstElTap = null,
  isOver = null,
  disableDnD = null,
  parentNode = null,
  resizable = null,
  //classes
  droppableClassName = "",
  innerDroppableClassName = "",
  draggableClassName = "",
  draggingOverClass = "",
  isDraggingClass = "",
  placeHolderClass = "",
  droppableContainerClassName = "",
}: any) => {
  const defaultParentNode = useRef() as RefObject<HTMLDivElement>;
  const droppableResizeRef = useRef() as RefObject<HTMLDivElement>;
  const { posData: droppableAreaPos, handle: droppableResizeHandle } =
    useBodyAreaResizable({
      nodeRef: droppableResizeRef,
      handleType: "S",
      handlePos: {
        south: true,
        north: false,
        east: false,
        west: false,
      },
    });
  const droppableHeight = {
    height: droppableAreaPos ? droppableAreaPos.height : null,
  };
  return (
    <SortableContext
      items={content}
      strategy={verticalListSortingStrategy}
      id={id}
    >
      <div
        id={id}
        data-container-id={id}
        data-tap-droppable-id={id}
        data-custom-parent-node-id={parentNode ? parentNode.id : null}
        className={droppableContainerClassName}
        ref={defaultParentNode}
      >
        <div
          ref={droppableResizeRef}
          className={droppableClassName}
          style={droppableHeight}
        >
          {droppableHeader ? droppableHeader : null}
          <Droppable
            id={id.toString()}
            firstElTap={firstElTap}
            innerDroppableClassName={innerDroppableClassName}
            draggingOverClass={draggingOverClass}
            isOver={isOver}
            placeHolderClass={content.length > 0 ? null : placeHolderClass}
            onTap={disableDnD ? onTap : null}
            disabled={disableDnD}
            parentNode={defaultParentNode.current}
            customParentNode={parentNode}
          >
            <InnerList
              id={id.toString()}
              disableDnD={disableDnD}
              content={content}
              onTap={onTap}
              firstElTap={firstElTap}
              isDraggingClass={isDraggingClass}
              draggableClassName={draggableClassName}
            />
          </Droppable>
        </div>
        {resizable && droppableResizeHandle}
      </div>
    </SortableContext>
  );
};

export default SortableArea;
