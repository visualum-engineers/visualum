//use to get x and y offset of elements. taken from dnd-kit's own implementation
export default function getEdgeOffset(
  node: any,
  parent: any,
  offset = { x: 0, y: 0 }
):any {
  if (!node || !(node instanceof HTMLElement)) {
    return offset;
  }
  const nodeOffset = {
    x: offset.x + node.offsetLeft,
    y: offset.y + node.offsetTop,
  };
  if (node.offsetParent === parent) {
    return nodeOffset;
  }
  return getEdgeOffset(node.offsetParent, parent, nodeOffset);
}
