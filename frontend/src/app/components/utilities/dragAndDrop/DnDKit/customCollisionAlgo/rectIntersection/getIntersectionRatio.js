/**
   * Returns the intersecting rectangle area between two rectangles
   * takes into account viewport or document offset depending 
   * on sorting items, or changing containers
   */
 export default function getIntersectionRatio({
    entry, 
    targetOffset, 
    targetViewPort, 
    sameContainer
  }){
    const top = Math.max(
                  targetOffset.top, 
                  entry.offsetTop
                );
    const bottom = Math.min(
                      targetOffset.top + targetOffset.height, 
                      entry.offsetTop + entry.height
                  );
    const viewPortTop = Math.max(
                          targetViewPort.top, 
                          entry.top
                        )
    const viewPortBottom = Math.min(
                              targetViewPort.top + targetViewPort.height, 
                              entry.top + entry.height
                          )

    const left = Math.max(
                    targetOffset.left, 
                    entry.offsetLeft
                );
    const right = Math.min(
                    targetOffset.left + targetOffset.width, 
                    entry.offsetLeft + entry.width
                  );
  
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