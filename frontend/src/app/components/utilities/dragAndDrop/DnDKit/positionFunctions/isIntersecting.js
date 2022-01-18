/**
 * Returns the closest rectangle from an array of rectangles to the corners of
 * another rectangle.
 */
 export default function isIntersecting({
    entryRect, 
    containerRect,
  }){
      if(!containerRect) return false
      const top = Math.max(containerRect.top, entryRect.top);
      const bottom = Math.min(containerRect.bottom, entryRect.bottom);
      return top < bottom
  }