
import {getEdgeOffset} from "./index"
//store all position values for function droppables
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

/*  
    *   This function handles storing the boundingClientRect 
    *   of all nodes that are passed into it
    *   It then returns the object containing all nodes passed in, as keys,
    *   and the boundingClientRect as the key-value.
    *   This position are lazy-loaded because the returned value 
    *   will be 1 call behind as this updating is happening asynchronously.  
*/
export default function updateDroppableRect (node, clearPosData = false) {
    if(clearPosData) {
      currentDroppablePostion = {}
      return currentDroppablePostion
    }
    observer.observe(node)

    return currentDroppablePostion
}