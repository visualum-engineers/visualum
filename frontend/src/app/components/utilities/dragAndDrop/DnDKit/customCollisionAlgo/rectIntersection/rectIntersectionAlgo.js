import getEdgeOffset from "../../positionFunctions/getEdgeOffset"; 
import {isIntersecting} from "../closestCorner/utilities/index" 
//store all position values for each droppable
  let currentDroppablePostion = {}
  
  //set up intersectionObserver
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      //similar to getBoundingClientRect but without reflow drawback
      const bounds = entry.boundingClientRect;
      //couldnt use spread since bounds is a readonly object
      const newBounds = {
         bottom: bounds.bottom,
         height: bounds.height,
         left: bounds.left,
         right: bounds.right,
         top: bounds.top,
         width: bounds.width,
         x: bounds.x,
         y: bounds.y
      }
      const target = entry.target
      const entryId = target.dataset.tapDraggableId ? target.dataset.tapDraggableId : target.dataset.tapDroppableId
      const entryCustomNodeId = target.dataset.customParentNodeId
      //grab offest position values
      const {x: offsetLeft, y: offsetTop} = getEdgeOffset(target, null);
      [newBounds["offsetLeft"], newBounds["offsetTop"]] = [offsetLeft, offsetTop]
     /*grab custom parent node pos, and correct bottom and height props
      * of entry node with it. This correction is made because if a 
      * custom node is supplied, we are potentially dealing 
      * with an overflowing container, and we must correct its height and 
      * bottom, to match what the user sees/(is visible to them) 
     */
     if(entryCustomNodeId && currentDroppablePostion[entryCustomNodeId]){
         const customNodePos = currentDroppablePostion[entryCustomNodeId]
         newBounds["bottom"] = customNodePos.bottom
         newBounds["height"] = customNodePos.height
     }
      //update our map with the position 
      currentDroppablePostion[entryId] = newBounds
    }
    // Disconnect the observer to stop from running in the background
    observer.disconnect();
  });
  
  /**
   * Returns the intersecting rectangle area between two rectangles
   * takes into account viewport or document offset depending 
   * on sorting items, or changing containers
   */
  function getIntersectionRatio({
    entry, 
    targetOffset, 
    targetViewPort, 
    sameContainer
  }){
    const top = Math.max(targetOffset.top, entry.offsetTop);
    const bottom = Math.min(targetOffset.top + targetOffset.height, entry.offsetTop + entry.height);
    const viewPortTop = Math.max(targetViewPort.top, entry.top)
    const viewPortBottom = Math.min(targetViewPort.top + targetViewPort.height, entry.top + entry.height)

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
  export const rectIntersection = ({
    droppableContainers, 
    collisionRect
  },
  { 
    containers,
    overlayRect,
    isOver,
  }) => {   
    let maxIntersectionRatio = 0;
    let maxIntersectingDroppableContainer = null;
    const dragOverlayContainer = isOver
    for(let droppableContainer of droppableContainers) {
      const id = droppableContainer.id;
      
      //grab origin container
      const droppableColumnId = id in containers ? id 
                                : droppableContainer.data.current.sortable.containerId

      //using intersection observer for rect values since it wont 
      //force a reflow, while getBoundingClientRect does
      const droppableNode = droppableContainer.node.current
      if(!droppableNode) continue
      //using intersection observer for rect values since it wont 
      //force a reflow, while getBoundingClientRect does

      if(id in containers) {
        const exposedNodes = droppableContainer.data.current
        if(exposedNodes.customParentNode) observer.observe(exposedNodes.customParentNode)
        observer.observe(exposedNodes.parentNode)
      }
      else observer.observe(droppableNode);

      const rect = currentDroppablePostion[id]

      if (rect) {
        //skip if container is a draggable, 
        //and the draggable is not in view of user 
        //(hidden by scroll)
        if(!(id in containers) && !isIntersecting({
                                      entryRect: rect, 
                                      containerRect: currentDroppablePostion[droppableColumnId]
                                    })) continue

        const intersectionRatio = getIntersectionRatio({
                                    entry: rect,
                                    targetOffset: collisionRect,
                                    targetViewPort: overlayRect,
                                    sameContainer: dragOverlayContainer === droppableColumnId
                                  });

        if (intersectionRatio > maxIntersectionRatio) {
          maxIntersectionRatio = intersectionRatio;
          maxIntersectingDroppableContainer = id;
        }
      }
    }
    return maxIntersectingDroppableContainer;
};
  
export default rectIntersection