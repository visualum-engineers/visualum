const getResultOnTap = ({
    e,
    firstElTap,
    setFirstElTap, 
    listItemDraggableClass,
    listItemInnerDroppableClass,
}) =>{
    //means a selection hasnt happened so skip for keyboard
    if(e.type === "keydown" && e.key !=="Enter") return
    //update the first element
    let droppableSelected = null
    let currListItem = e.target.closest("." + listItemDraggableClass)
    if(!currListItem) {
        droppableSelected = true
        currListItem = e.target.closest("." + listItemInnerDroppableClass)
    }
    //used when two list items are clicked, and not an empty droppable
    const droppableId = currListItem.dataset.tapDroppableId
    const draggableIndex = currListItem.dataset.tapIndex
    const firstDraggableId = currListItem.dataset.tapDraggableId
    
    if(!firstElTap) {
        setFirstElTap({
            droppableId: droppableId,
            draggableId: firstDraggableId,
            draggableIndex: draggableIndex,
            node: e.target
        })
        return
    }
    //update the second element, and perform tap logic
    const draggableId = firstElTap.draggableId
    const source = {
        droppableId: firstElTap.droppableId,
        index: firstElTap.draggableIndex
    }
    const destination = {
        droppableId: droppableId,
        index: droppableSelected ? 0 : draggableIndex,
    }
    const result={
        source: source,
        destination: destination,
        draggableId: draggableId
    }
    return result
}
export default getResultOnTap