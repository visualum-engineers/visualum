
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
 * Returns the coordinates of the corners of a given rectangle:
 * [TopLeft {x, y}, TopRight {x, y}, BottomLeft {x, y}, BottomRight {x, y}]
 */

export function distanceBetween(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
export function calculateDistances(positionArr, entryCorners) { 
  return positionArr.reduce((accumulator, corner, index) => {
            return accumulator + distanceBetween(entryCorners[index], corner);
          }, 0)
}

export function cornersOfRectangle(
  rect,
  left = rect.offsetLeft,
  top = rect.offsetTop
) {
  return [
    {
      x: left,
      y: top,
    },
    {
      x: left + rect.width,
      y: top,
    },
    {
      x: left,
      y: top + rect.height,
    },
    {
      x: left + rect.width,
      y: top + rect.height,
    },
  ];
}
/**
   * Returns the distance between two rectangles
   * takes into account viewport or document offset depending 
   * on sorting items, or changing containers
   */
export function getEffectiveDistance({
  entry, 
  targetOffset, 
  targetViewPort, 
  sameContainer
}){
    const entryCorners = !sameContainer ? cornersOfRectangle(
                                            entry,
                                            entry.left ? entry.left : undefined,
                                            entry.top ? entry.top : undefined
                                        ) 
                          : cornersOfRectangle(entry)

    const targetDistances = calculateDistances(!sameContainer ? targetViewPort: targetOffset, entryCorners)
    return Number((targetDistances / 4).toFixed(4))
}
/**
 * Returns the closest rectangle from an array of rectangles to the corners of
 * another rectangle.
 */
export function isIntersecting({
  entryRect, 
  containerRect,
}){
    const top = Math.max(containerRect.top, entryRect.top);
    const bottom = Math.min(containerRect.bottom, entryRect.bottom);
    return top < bottom
}
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
    //using intersection observer for rect values since it wont 
    //force a reflow, while getBoundingClientRect does
    if(!droppableContainer.node.current) continue
    if(id in containers) observer.observe(droppableContainer.data.current.parentNode)
    else observer.observe(droppableContainer.node.current);
    const rect = currentDroppablePostion[id]
    if(rect) { 
      //skip if container is a draggable, 
      //and the draggable is not in view of user 
      //(hidden by scroll)
      if(!(id in containers) && !isIntersecting({entryRect: rect, containerRect: currentDroppablePostion[droppableColumnId]})) continue
      
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