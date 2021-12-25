const addToTop = (droppableRect, overlayRect, finalListLength) =>{
    const topDiff = overlayRect.top - droppableRect.top
    return topDiff < 0 ? 0 : finalListLength  
}
export default addToTop