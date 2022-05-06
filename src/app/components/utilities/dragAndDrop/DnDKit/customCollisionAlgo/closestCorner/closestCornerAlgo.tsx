
import {
  updateDroppableRect,
  isIntersecting
} from "../../positionFunctions/index";
import {
  getEffectiveDistance,
  cornersOfRectangle
} from "./utilities/index"
 
export const closestCorners = ({
  collisionRect,
  droppableContainers,
}
, {
  containers,
  overlayRect,
  isOver,
  cleanup = false,
}) => {
  if(cleanup) return updateDroppableRect(null, cleanup) 
  let minDistanceToCorners = Infinity;
  let minDistanceContainer = null;
  const dragOverlayContainer = isOver
  const collisionCorners = cornersOfRectangle(
    collisionRect,
    collisionRect.left,
    collisionRect.top
  );
  const overlayRectCorners = cornersOfRectangle(
    overlayRect,
    overlayRect.left,
    overlayRect.top
  );
  
  for (let droppableContainer of droppableContainers) {
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
    else {
      currentDroppablePostion = updateDroppableRect(droppableNode);
    }
    const rect = currentDroppablePostion[id]
    if(rect) { 
      //skip if container is a draggable, 
      //and the draggable is not in view of user 
      //(hidden by scroll)
      if(!(id in containers) && !isIntersecting({
                                    entryRect: rect, 
                                    containerRect: currentDroppablePostion[droppableColumnId]
                                })) continue

      const effectiveDistance = getEffectiveDistance({
                                  entry: rect,
                                  targetOffset: collisionCorners,
                                  targetViewPort: overlayRectCorners, 
                                  sameContainer: dragOverlayContainer === droppableColumnId,
                                });
      
      if (effectiveDistance < minDistanceToCorners) {
        minDistanceToCorners = effectiveDistance;
        minDistanceContainer = droppableContainer.id;
        //console.log(minDistanceContainer, effectiveDistance)
      }
    }
  }

  return minDistanceContainer;
};