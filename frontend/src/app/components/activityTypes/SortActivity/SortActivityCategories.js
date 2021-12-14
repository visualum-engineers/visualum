import DroppableArea from "../DragAndDrop/DroppableArea"
const SortActivityCategories = ({numCategories,data, mediumWindowWidth}) =>{
    return (
        <div className={`sort-activity-categories ${mediumWindowWidth ? "full-size": "w-100"}`}>
            <div className={`sort-activity-category-container`}>
                <h2 className="sort-activity-column-titles"><span>Question</span></h2>
                <div className="d-flex justify-content-center flex-wrap h-100 sort-activity-category-droppables">
                    {numCategories.map((columnTitle, columnIndex)=> {
                            const header = <p className="sort-activity-droppable-header">{columnTitle}</p>
                            const first = ((columnIndex) % 2) === 0 
                            return (
                            <DroppableArea
                                key={columnTitle} 
                                id={columnTitle}
                                droppableHeader = {header}
                                content = {data.categories[columnTitle]}
                                droppableClassName = {`sort-activity-sort-droppables ${mediumWindowWidth ?"small-screen": ""} ${first? "first-item" : ""}`}
                                draggableClassName = {"sort-activity-draggables d-flex align-items-center justify-content-center"}
                                innerDroppableClassName ={"sort-activity-inner-droppable d-flex flex-column align-items-center"}
                                draggingOverClass = {"sort-activity-dragging-over"}
                            />
                        )}
                    )}
                </div>
            </div>
        </div>
    )
}
export default SortActivityCategories
/*
const notVisibile = {visibility: "hidden"}
    const visible = {visibility: "visible"}
    return slides.map((content, index) =>{
        const startSlice = index * 3
        const endSlice = (index+1) * 3
        return (
            <div 
                key={index}
                className={`d-flex justify-content-center flex-wrap ${slideClassName}`}
                //style = {slideNum !== index +1 ? notVisibile : visible}
            >
                {numCategories.slice(startSlice, endSlice).map((columnTitle, columnIndex)=> {
                    const header = <p className="sort-activity-droppable-header">{columnTitle}</p>
                    const third = ((columnIndex + 1) % 3) === 0 
                    return (
                        <DroppableArea
                            key={columnTitle} 
                            id={columnTitle}
                            droppableHeader = {header}
                            content = {data.categories[columnTitle]}
                            droppableClassName = {`sort-activity-sort-droppables ${mediumWindowWidth ?"small-screen": ""} ${third ? "third-category":""}`}
                            draggableClassName = {"sort-activity-answers-draggables"}
                            innerDroppableClassName ={"sort-activity-inner-droppable d-flex flex-column align-items-center"}
                            draggingOverClass = {"sort-activity-dragging-over"}
                        />
                    )
                })}
            </div>
    )})
*/