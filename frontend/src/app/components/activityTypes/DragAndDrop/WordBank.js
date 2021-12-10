import DroppableArea from "./DroppableArea"

const WordBank = ({
        data, 
        firstTapEl, 
        isDraggingClass,
        onTap, 
        overallContainerClass, 
        columnContainerClass, 
        columnTitleClass,
        columnClass,
        droppableClassName,
        innerDroppableClassName,
        draggingOverClass,
        draggableClassName
    }) => {
    return(
        <div className={overallContainerClass}>
            <div className = {columnContainerClass}>
                <h2 className={columnTitleClass}>Choices</h2>
                <div className="w-100 d-flex justify-content-center">
                    {Object.keys(data.itemBank).map((key, index)=>{
                        return (
                            <div key={key} className={`${columnClass}-${index+1} w-100 d-flex flex-column align-items-center`}>
                                <DroppableArea 
                                    firstElTap = {firstTapEl} 
                                    id={key}
                                    content = {data.itemBank[key]}
                                    droppableClassName = {droppableClassName}
                                    draggableClassName = {draggableClassName}
                                    innerDroppableClassName = {innerDroppableClassName}
                                    draggingOverClass={draggingOverClass}
                                    isDraggingClass = {isDraggingClass}
                                    onTap={onTap}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default WordBank