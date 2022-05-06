import {isIntersecting, updateDroppableRect} from "../../positionFunctions/index"
import getIntersectionRatio from "./getIntersectionRatio"; 
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
    cleanup = false,
  }) => {
    if(cleanup) return updateDroppableRect(null, cleanup)   
    
    let maxIntersectionRatio = 0;
    let maxIntersectingDroppableContainer = null;
    const dragOverlayContainer = isOver
    for(let droppableContainer of droppableContainers) {
      const id = droppableContainer.id;
      
      //grab origin container
      const droppableColumnId = id in containers ? id 
                                : droppableContainer.data.current.sortable.containerId

      const droppableNode = droppableContainer.node.current
      if(!droppableNode) continue

      //grab all droppables bounding rects
      let currentDroppablePostion
      if(id in containers) {
          const exposedNodes = droppableContainer.data.current
          if(exposedNodes.customParentNode) currentDroppablePostion = updateDroppableRect(exposedNodes.customParentNode)
          if(exposedNodes.parentNode) currentDroppablePostion = updateDroppableRect(exposedNodes.parentNode)
          else continue
      }
      else currentDroppablePostion = updateDroppableRect(droppableNode);

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