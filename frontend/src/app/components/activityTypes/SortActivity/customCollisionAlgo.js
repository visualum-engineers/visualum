
  /**
   * Returns the intersecting rectangle area between two rectangles
   */
  //function getIntersectionRatio(entry: LayoutRect, active: Active): number {
  import { getBoundingClientRect } from "@dnd-kit/core";
  //prevent getboundingClient from being called everytime (only call when a scroll is detected)
  let positionCache = {}
  //import {closestCorners} from '@dnd-kit/core';
  function getIntersectionRatio(entry, targetOffset, targetViewport){
    //console.log(entry, targetOffset, targetViewport)
    const top = Math.max(targetOffset.top, entry.offsetTop);
    const left = Math.max(targetOffset.left, entry.offsetLeft);
    const right = Math.min(targetOffset.left + targetOffset.width, entry.offsetLeft + entry.width);
    const bottom = Math.min(targetOffset.top + targetOffset.height, entry.offsetTop + entry.height);
    const width = right - left;
    const height = bottom - top;
    const viewPortTop = Math.max(targetViewport.top, entry.top)
    const viewPortBottom = Math.min(targetViewport.top + targetViewport.height, entry.top + entry.height)
    console.log(viewPortTop, viewPortBottom)
    if (left < right && (top < bottom || viewPortTop < viewPortBottom) ) {
      const targetOffsetArea = targetOffset.width * targetOffset.height;
      const entryArea = entry.width * entry.height;
      const intersectionArea = width * height;
      const intersectionRatio = intersectionArea / (targetOffsetArea + entryArea - intersectionArea);

      return Math.abs(Number(intersectionRatio.toFixed(4)));
    }
    // Rectangles do not overlap, or overlap has an area of zero (edge/corner overlap)
    return 0;
  }
  
  /**
   * Returns the rectangle that has the greatest intersection area with a given
   * rectangle in an array of rectangles.
   */
   export const rectIntersection = ({droppableContainers, collisionRect}, overlayRect) => {
    let maxIntersectionRatio = 0;
    let maxIntersectingDroppableContainer = null;
    for(let droppableContainer of droppableContainers) {
      const id = droppableContainer.id;
      //get most updated rect positions and cache positions
      // if(!(id in positionCache)) positionCache[id] = getBoundingClientRect(droppableContainer.node.current)
      // const rect = positionCache[id]
      const rect = getBoundingClientRect(droppableContainer.node.current)
      if (rect) {
        const intersectionRatio = getIntersectionRatio(rect, collisionRect, overlayRect);
        console.log(id, intersectionRatio)
        if (intersectionRatio > maxIntersectionRatio) {
          maxIntersectionRatio = intersectionRatio;
          maxIntersectingDroppableContainer = id;
        }
      }
    }
  
    return maxIntersectingDroppableContainer;
  };
  
export default rectIntersection