
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

function distanceBetween(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function cornersOfRectangle(
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
function getEffectiveDistance(entry, targetOffset, targetViewPort, sameContainer){
    let entryCorners = cornersOfRectangle(entry);
    const targetOffsetDistances = targetOffset.reduce((accumulator, corner, index) => {
        return accumulator + distanceBetween(entryCorners[index], corner);
    }, 0);
    let targetViewPortDistances
    if(!sameContainer){
        //re-assign entry corners to viewport distance
        entryCorners = cornersOfRectangle(
            entry,
            entry.left ? entry.left : undefined,
            entry.top ? entry.top : undefined
        );
        targetViewPortDistances = targetViewPort.reduce((accumulator, corner, index) => {
            return accumulator + distanceBetween(entryCorners[index], corner);
        }, 0)
        return Number((targetViewPortDistances / 4).toFixed(4))
    }
    return Number((targetOffsetDistances / 4).toFixed(4))
}
/**
 * Returns the closest rectangle from an array of rectangles to the corners of
 * another rectangle.
 */
export const closestCorners = ({
  active,
  collisionRect,
  droppableContainers,
}, overlayRect) => {

  let minDistanceToCorners = Infinity;
  let minDistanceContainer = null;
  const dragOverlayContainer = active.data.current.sortable.containerId

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

  for (const droppableContainer of droppableContainers) {
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
      const effectiveDistance = getEffectiveDistance(rect, collisionCorners, overlayRectCorners, dragOverlayContainer === droppableColumnId);

      if (effectiveDistance < minDistanceToCorners) {
        minDistanceToCorners = effectiveDistance;
        minDistanceContainer = droppableContainer.id;
      }
    }
  }

  return minDistanceContainer;
};