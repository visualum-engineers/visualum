import DroppableArea from "./DroppableArea"

const WordBank = ({
        data, 
        firstElTap, 
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
                <h2 className={columnTitleClass}><span>Choices</span></h2>
                <div className="w-100 d-flex justify-content-center flex-grow-1">
                    {Object.keys(data.itemBank).map((key, index)=>{
                        return (
                            <div 
                                key={key} 
                                className={`${columnClass}-${index+1} w-100 d-flex flex-column align-items-center`
                            }>
                                <DroppableArea 
                                    id={key}
                                    content = {data.itemBank[key]}
                                    firstElTap = {firstElTap} 
                                    onTap={onTap}
                                    //classes
                                    droppableClassName = {droppableClassName}
                                    draggableClassName = {draggableClassName}
                                    innerDroppableClassName = {innerDroppableClassName}
                                    draggingOverClass={draggingOverClass}
                                    isDraggingClass = {isDraggingClass}

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