import SortableArea from "../DragAndDrop/DnDKit/SortableDnD/SortableArea"
const SortActivityCategories = ({
        numCategories,
        data, 
        mediumWindowWidth, 
        onTap=null, 
        firstElTap = null, 
        isOver=null}
    ) =>{
    return (
        <div className={`sort-activity-categories ${mediumWindowWidth ? "full-size": "w-100"}`}>
            <div className={`sort-activity-category-container`}>
                <h2 className="sort-activity-column-titles"><span>Question</span></h2>
                <div className="d-flex justify-content-center flex-wrap h-100 sort-activity-category-droppables">
                    {numCategories.map((columnTitle, columnIndex)=> {
                            const header = <p className="sort-activity-droppable-header">{columnTitle}</p>
                            const first = ((columnIndex) % 2) === 0 
                            return (
                            <SortableArea
                                key={columnTitle} 
                                id={columnTitle}
                                droppableHeader = {header}
                                content = {data.categories[columnTitle]}
                                droppableClassName = {`sort-activity-sort-droppables d-flex flex-column ${mediumWindowWidth ?"small-screen": ""} ${first? "first-item" : ""}`}
                                draggableClassName = {"sort-activity-draggables d-flex align-items-center justify-content-center"}
                                innerDroppableClassName ={"sort-activity-inner-droppable d-flex flex-column align-items-center"}
                                draggingOverClass = {"sort-activity-dragging-over"}
                                isDraggingClass = {"sort-activity-is-dragging"}
                                placeHolderClass={"sort-activity-droppable-placeholder"}
                                firstElTap ={firstElTap} 
                                onTap={onTap}
                                isOver={isOver}
                                
                            />
                        )}
                    )}
                </div>
            </div>
        </div>
    )
}
export default SortActivityCategories
