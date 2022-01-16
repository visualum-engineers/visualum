
import getEdgeOffset from "../../positionFunctions/getEdgeOffset";
import {
  getEffectiveDistance,
  cornersOfRectangle,
  isIntersecting,
} from "./utilities/index"
 //store all position values for each droppable
 let currentDroppablePostion = {}
 
 //set up intersectionObserver
 const observer = new IntersectionObserver((entries) => {
   for (const entry of entries) {
     //similar to getBoundingClientRect but without reflow drawback
     const bounds = entry.boundingClientRect;
     //could use spread since this a readonly object
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

export const closestCorners = ({
  collisionRect,
  droppableContainers,
}
, {
  containers,
  overlayRect,
  isOver,
}) => {
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

    //using intersection observer for rect values since it wont 
    //force a reflow, while getBoundingClientRect does
    if(id in containers) {
        const exposedNodes = droppableContainer.data.current
        if(exposedNodes.customParentNode) observer.observe(exposedNodes.customParentNode)
        observer.observe(exposedNodes.parentNode)
    }
    else observer.observe(droppableNode);

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
      }
    }
  }

  return minDistanceContainer;
};