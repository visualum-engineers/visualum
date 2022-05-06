import { cornersOfRectangle, calculateDistances } from "./index"
/**
   * Returns the distance between two rectangles
   * takes into account viewport or document offset depending 
   * on sorting items, or changing containers
   */
 export default function getEffectiveDistance({
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
  