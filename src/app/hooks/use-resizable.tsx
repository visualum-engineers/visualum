import { number } from "prop-types";
import { useState, useRef } from "react";
export function applyOnResizeStartStyles(width = true) {
  //declartive styles so
  //touch inputs do not trigger scroll on mobile
  const body = document.querySelector("body");
  const html = document.querySelector("html");
  if (html) html.style.touchAction = "none";
  //body.style.touchAction = "none"
  if (body) body.style.cursor = "ns-resize";
  if (!width && body) body.style.overflow = "hidden";
}
export function applyOnResizeEndStyles(width = true) {
  //declartive styles so
  //touch inputs do not trigger scroll on mobile
  const body = document.querySelector("body");
  const html = document.querySelector("html");
  if (html) html.style.touchAction = "auto";
  //body.style.touchAction = "auto"
  if (body) body.style.cursor = "";
  if (!width && body) body.style.overflow = "";
}
export function horizontalMove({
  left,
  right,
  east,
  west,
  currPointerX,
  prevPointerX,
}: any) {
  //return default values
  if (!left && !east) return { left: left, east: east, width: east - left };

  let newLeft, newRight, pointerDiff, newWidth;
  if (east) {
    pointerDiff = currPointerX - prevPointerX;
    newRight = right + pointerDiff;
    newLeft = left;
  }
  if (west) {
    pointerDiff = prevPointerX - currPointerX;
    newLeft = left + pointerDiff;
    newRight = right;
  }
  if (pointerDiff) newWidth = right - left + pointerDiff;
  return { width: newWidth, left: newLeft, right: newRight };
}

export function verticalMove({
  top,
  bottom,
  south,
  north,
  currPointerY,
  prevPointerY,
}: any) {
  //return default values
  if (!south && !north)
    return { top: top, bottom: bottom, height: bottom - top };
  let newTop, newBottom, pointerDiff, newHeight;

  if (south) {
    pointerDiff = currPointerY - prevPointerY;
    newBottom = bottom + pointerDiff;
    newTop = top;
  }
  if (north) {
    pointerDiff = prevPointerY - currPointerY;
    newTop = top + pointerDiff;
    newBottom = bottom;
  }
  if (pointerDiff) newHeight = bottom - top + pointerDiff;
  return { height: newHeight, top: newTop, bottom: newBottom };
}

export const useResizable = ({ initialPos = null }) => {
  const [currPos, setPos] = useState<any>(initialPos);
  const initialNodePos = useRef<DOMRect & {pointerX: number, pointerY: number} | null>(null);

  const onResizeStart = ({ e, node }: any) => {
    const pointerX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    const pointerY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
    const rect = node.getBoundingClientRect();
    rect["pointerX"] = pointerX;
    rect["pointerY"] = pointerY;
    initialNodePos.current = rect;
  };

  const onResizeEnd = (e: any) => {
    initialNodePos.current = null;
  };

  const onResizeMove = ({ e, handlePos }: any) => {
    if (!handlePos || !e || !initialNodePos.current) return;
    const { north, east, west, south } = handlePos;
    const rect = initialNodePos.current;
    const pointerX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const pointerY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

    const horizontalPos = horizontalMove({
      currPointerX: pointerX,
      prevPointerX: rect.pointerX,
      east: east,
      west: west,
      left: rect.left,
      right: rect.right,
    });

    const verticalPos = verticalMove({
      currPointerY: pointerY,
      prevPointerY: rect.pointerY,
      north: north,
      south: south,
      top: rect.top,
      bottom: rect.bottom,
    });
    const newPos = {
      ...horizontalPos,
      ...verticalPos,
    };
    setPos(newPos);
    return newPos;
  };
  return [currPos, onResizeStart, onResizeMove, onResizeEnd];
};

export default useResizable;
