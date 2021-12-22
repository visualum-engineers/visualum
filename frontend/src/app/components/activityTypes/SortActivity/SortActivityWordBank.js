import SortableArea from "../DragAndDrop/DnDKit/SortableDnD/SortableArea"
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
    draggableClassName,
    isOver=null,
}) => {
    return(
        <div className={overallContainerClass}>
            <div className = {columnContainerClass}>
                <h2 className={columnTitleClass}><span>Choices</span></h2>
                <div className="w-100 d-flex justify-content-center">
                    {Object.keys(data.itemBank).map((key, index)=>{
                        return (
                            <div 
                                id={key}
                                key={key} 
                                className={`${columnClass}-${index+1} w-100 d-flex flex-column align-items-center`}>
                                <SortableArea 
                                    firstElTap = {firstTapEl} 
                                    id={key}
                                    content = {data.itemBank[key]}
                                    droppableClassName = {droppableClassName}
                                    draggableClassName = {draggableClassName}
                                    innerDroppableClassName = {innerDroppableClassName}
                                    draggingOverClass={draggingOverClass}
                                    isDraggingClass = {isDraggingClass}
                                    onTap={onTap}
                                    isOver={isOver}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )}
export default WordBank
