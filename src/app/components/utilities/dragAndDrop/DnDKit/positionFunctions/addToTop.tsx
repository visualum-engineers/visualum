const addToTop = (
  droppableRect: any,
  overlayRect: any,
  finalListLength: any
) => {
  const topDiff = overlayRect.top - droppableRect.top;
  return topDiff < 0 ? 0 : finalListLength;
};
export default addToTop;
