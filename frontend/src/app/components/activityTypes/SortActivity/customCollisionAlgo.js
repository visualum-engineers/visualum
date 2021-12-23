
  /**
   * Returns the intersecting rectangle area between two rectangles
   */
  //function getIntersectionRatio(entry: LayoutRect, active: Active): number {
  import { getBoundingClientRect } from "@dnd-kit/core";
  //prevent getboundingClient from being called everytime (only call when a scroll is detected)
  let positionCache = {}
  //import {closestCorners} from '@dnd-kit/core';
  function getIntersectionRatio(entry, targetOffset, targetViewport, sameContainer){
    const top = Math.max(targetOffset.top, entry.offsetTop);
    const bottom = Math.min(targetOffset.top + targetOffset.height, entry.offsetTop + entry.height);
    const viewPortTop = Math.max(targetViewport.top, entry.top)
    const viewPortBottom = Math.min(targetViewport.top + targetViewport.height, entry.top + entry.height)

    const left = Math.max(targetOffset.left, entry.offsetLeft);
    const right = Math.min(targetOffset.left + targetOffset.width, entry.offsetLeft + entry.width);
  
    const width = right - left;
    const height = bottom - top;

    const viewPortHeight = viewPortBottom - viewPortTop
    if (left < right && (top < bottom || viewPortTop < viewPortBottom)) {
      const targetOffsetArea = targetOffset.width * targetOffset.height;
      const entryArea = entry.width * entry.height;
      const intersectionArea = width * height;
      const intersectionRatio = intersectionArea / (targetOffsetArea + entryArea - intersectionArea);

      if(!sameContainer){
          const newIntersectionArea = width * viewPortHeight;
          //console.log(newIntersectionArea, intersectionArea)
          const newIntersectionRatio = newIntersectionArea / (targetOffsetArea + entryArea - newIntersectionArea);
          
          return Number(newIntersectionRatio.toFixed(4))
      }
      return Number(intersectionRatio.toFixed(4));
    }
    // Rectangles do not overlap, or overlap has an area of zero (edge/corner overlap)
    return 0;
  }
  
  /**
   * Returns the rectangle that has the greatest intersection area with a given
   * rectangle in an array of rectangles.
   */
  export const rectIntersection = ({active, droppableContainers, collisionRect}, overlayRect) => {
    let maxIntersectionRatio = 0;
    let maxIntersectingDroppableContainer = null;
    const dragOverlayContainer = active.data.current.sortable.containerId
    for(let droppableContainer of droppableContainers) {
      const id = droppableContainer.id;
      const rect = getBoundingClientRect(droppableContainer.node.current)
      //grab origin container
      let droppableColumnId 
      if(droppableContainer.data.current) droppableColumnId = droppableContainer.data.current.sortable.containerId
      else droppableColumnId = id 
      //console.log(droppableColumnId)
      //get most updated rect positions and cache positions
      // if(!(id in positionCache)) positionCache[id] = getBoundingClientRect(droppableContainer.node.current)
      // const rect = positionCache[id]
      
      if (rect) {
        const intersectionRatio = getIntersectionRatio(rect, collisionRect, overlayRect, dragOverlayContainer === droppableColumnId);
        if (intersectionRatio > maxIntersectionRatio) {
          maxIntersectionRatio = intersectionRatio;
          maxIntersectingDroppableContainer = id;
        }
      }
    }
    return maxIntersectingDroppableContainer;
};
  
export default rectIntersection