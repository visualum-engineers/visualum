  import getEdgeOffset from "../positionFunctions/getEdgeOffset";
  //store all position values for each droppable
  let currentDroppablePostion = {}
  
  //set up intersectionObserver
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      //similar to getBoundingClientRect but without reflow drawback
      const bounds = entry.boundingClientRect;
      const target = entry.target
      const entryId = target.dataset.tapDraggableId ? target.dataset.tapDraggableId : target.dataset.tapDroppableId
      //grab offest position values
      const {x: offsetLeft, y: offsetTop} = getEdgeOffset(target, null);
      [bounds["offsetLeft"], bounds["offsetTop"]] = [offsetLeft, offsetTop]

      //update our map with the position 
      currentDroppablePostion[entryId] = bounds
    }
    // Disconnect the observer to stop from running in the background
    observer.disconnect();
  });
  
  /**
   * Returns the intersecting rectangle area between two rectangles
   * takes into account viewport or document offset depending 
   * on sorting items, or changing containers
   */
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
      //use viewport distance when changing containers (this is what the user will see)
      if(!sameContainer){
          const newIntersectionArea = width * viewPortHeight;
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
      //using intersection observer for rect values since it wont 
      //force a reflow, while getBoundingClientRect does
      observer.observe(droppableContainer.node.current);
      const rect = currentDroppablePostion[id]
      //grab origin container
      let droppableColumnId 
      if(droppableContainer.data.current.sortable) droppableColumnId = droppableContainer.data.current.sortable.containerId
      else droppableColumnId = id 
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