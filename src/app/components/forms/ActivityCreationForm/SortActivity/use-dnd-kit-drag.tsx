import { useState, useRef, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import {
  getBoundingClientRect,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
//pos and collision func
import {
  closestCorners,
  rectIntersection,
  cleanUpCollisionData,
} from "../../../utilities/dragAndDrop/DnDKit/customCollisionAlgo/algoIndex";
import { addToTop } from "../../../utilities/dragAndDrop/DnDKit/positionFunctions/index";
import _ from "lodash";
import { useWindowWidth } from "../../../../hooks";
import { useSelector } from "react-redux";
const useDnDKitDrag = ({
  reduxSelector,
  onOverStateUpdate,
  onDragEndStateUpdate,
}: any) => {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor, {
    keyboardCodes: {
      start: ["Space"],
      cancel: ["Escape"],
      end: ["Space", "Enter"],
    },
  });
  const sensors = useSensors(pointerSensor, keyboardSensor);
  const mediumWindowWidth = useWindowWidth(992);
  const data: any = useSelector(reduxSelector);
  //manage drag and drop of items
  const [activeId, setActiveId] = useState<any>(undefined);
  const [isOver, setIsOver] = useState<any>(undefined);
  const dragOverlayItem: any = useRef();
  //cleanup collision data when component unmounts
  useEffect(() => {
    return () => cleanUpCollisionData();
  }, []);
  /* When a draggable item moves to a new container, the layout may shift
   *and can cause items to incorrectly shift positions
   * if the next animation frame isn't ready.
   * this can lead to duplicated elements. */
  const recentlyMovedToNewContainer = useRef(false);
  useEffect(() => {
    requestAnimationFrame(() => {
      if (recentlyMovedToNewContainer.current)
        recentlyMovedToNewContainer.current = false;
    });
  }, [isOver]);
  //overall wrapper function
  const customCollisionAlgo = ({
    e,
    isOver,
    categories,
    mediumWindowWidth,
    dragOverlayItem,
    recentlyMovedToNewContainer,
  }: any) => {
    if (recentlyMovedToNewContainer.current) return;
    if (!dragOverlayItem.current) return;
    const overlayRect = getBoundingClientRect(dragOverlayItem.current);
    switch (true) {
      case mediumWindowWidth:
        return closestCorners(e, {
          overlayRect: overlayRect,
          containers: categories,
          isOver: isOver,
        });
      default:
        return rectIntersection(e, {
          overlayRect: overlayRect,
          containers: categories,
          isOver: isOver,
        });
    }
  };

  const collisionAlgoWrapper = (e: any) => {
    const categoriesMap: any = {};
    //convert categories to object look up table for collision algo
    for (let category of data.categories) {
      categoriesMap[category.id] = category.answers;
    }
    const intersectingContainer = customCollisionAlgo({
      e: e,
      isOver: isOver,
      categories: categoriesMap,
      dragOverlayItem: dragOverlayItem,
      mediumWindowWidth: mediumWindowWidth,
      recentlyMovedToNewContainer: recentlyMovedToNewContainer,
    });
    return intersectingContainer;
  };
  const resultValues = (e: any, finishContainer: any) => {
    if (!e) return;
    const finish = finishContainer;
    const start = e.active.data.current.tapDroppableId;
    const startIndex = e.active.data.current.index;
    //use when we have a array data structure to render element
    const startCategoryIndex = parseInt(e.active.data.current.categoryIndex);
    const endCategoryIndex = parseInt(e.over.data.current.categoryIndex);
    const isObj = _.isObject(data.categories);
    const isArray = Array.isArray(data.categories);

    const finishAnswersList =
      isArray && !endCategoryIndex
        ? []
        : isArray
        ? data.categories[endCategoryIndex].answers
        : isObj
        ? data.categories[finish]
        : [];

    //determine if position is at start or end. if not, we use the index provided in data
    const endIndex =
      !e.over.data.current.sortable && dragOverlayItem.current
        ? addToTop(
            getBoundingClientRect(e.over.data.current.node),
            getBoundingClientRect(dragOverlayItem.current),
            finishAnswersList.length
          )
        : e.over.data.current.index;

    const source = {
      droppableId: start,
      index: startIndex,
      startCategoryIndex: startCategoryIndex,
    };
    const destination = {
      droppableId: finish,
      index: endIndex,
      endCategoryIndex: endCategoryIndex,
    };
    const result = {
      source: source,
      destination: destination,
      draggableId: e.active.id,
    };
    return result;
  };
  //this is used to check if in this drag cycle,
  //the original position on drag start, changed on drag end
  //this is more accurate calling of redux store ONLY
  //since logic for drag and drop here is different
  const onDragStartOver = useRef({ start: null, newData: null, end: null });
  const onDragStart = (e: any) => {
    //to prevent smooth scroll behavior from interfering with react-beautiful auto scroll
    document.querySelector("html")?.classList.add("sortActivityActive");
    onDragStartOver.current.start = e.active.data.current.sortable.containerId;
    unstable_batchedUpdates(() => {
      setActiveId({
        draggable: e.active.id,
        container: e.active.data.current.sortable.containerId,
      });
      setIsOver(e.active.data.current.sortable.containerId);
    });
  };
  //pass all necessary values and re-rendered functions here
  const onDragOver = (e: any) => {
    //if recently moved do not update
    if (recentlyMovedToNewContainer.current) return;
    //prevent updating if already null, and set to null if not being sorted
    if (!e.over && !isOver) return;
    if (!e.over) return;
    const currElOver = e.over.data.current.sortable;
    const activeElOver = e.active.data.current.sortable;
    //when over an empty sortable container (not a draggable item)
    if (!currElOver && isOver === e.over.id) return;
    if (!currElOver) {
      const newState = onOverStateUpdate(resultValues(e, e.over.id));
      recentlyMovedToNewContainer.current = true;
      onDragStartOver.current.end = e.over.id;
      onDragStartOver.current.newData = newState;
      setIsOver(e.over.id);
      return;
    }

    //still over same draggable
    if (currElOver && isOver === e.over.id) return;

    //still in same container
    if (isOver === currElOver.containerId) return;

    //different starting and ending containers
    if (currElOver.containerId !== activeElOver.containerId) {
      const newState = onOverStateUpdate(
        resultValues(e, currElOver.containerId)
      );
      recentlyMovedToNewContainer.current = true;
      onDragStartOver.current.end = currElOver.containerId;
      onDragStartOver.current.newData = newState;
      setIsOver(currElOver.containerId);
      return newState;
    }
  };
  //handle state update when object stops
  const onDragEnd = (e: any) => {
    //to re-enable smooth scrolling for the remainder of the pages
    document.querySelector("html")?.classList.remove("sortActivityActive");
    unstable_batchedUpdates(() => {
      setActiveId(undefined);
      setIsOver(undefined);
    });
    //check if container from drag start changed by drag end
    if (onDragStartOver.current.start !== onDragStartOver.current.end) {
      onDragEndStateUpdate(onDragStartOver.current.newData);
    }
    onDragStartOver.current = { start: null, newData: null, end: null };
    if (!e.over) return;
    //reset overlay and over styles
    const endElOver = e.over.data.current.sortable;
    if (!endElOver || isOver !== endElOver.containerId) return;

    //nothing changed
    const startElIndex = e.active.data.current.index;
    const endElIndex = e.over.data.current.index;

    if (isOver === endElOver.containerId && endElIndex === startElIndex) return;

    onDragEndStateUpdate(resultValues(e, endElOver.containerId));
  };
  const onDragCancel = (e: any) => {
    unstable_batchedUpdates(() => {
      setActiveId(undefined);
      setIsOver(undefined);
    });
  };
  return {
    data: data,
    activeId: activeId,
    isOver: isOver,
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
    onDragOver: onDragOver,
    onDragCancel: onDragCancel,
    collisionAlgoWrapper: collisionAlgoWrapper,
    sensors: sensors,
    dragOverlayItem: dragOverlayItem,
  };
};
export default useDnDKitDrag;
