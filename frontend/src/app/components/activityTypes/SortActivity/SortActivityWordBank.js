//import { useRef } from "react"
import SortableArea from "../../utilities/dragAndDrop/DnDKit/SortableDnD/SortableArea"

const WordBank = ({
    data, 
    firstElTap,
    onTap, 
    isOver=null,
    disableDnD = null,
    //classes
    isDraggingClass,
    overallContainerClass, 
    columnContainerClass, 
    columnTitleClass,
    columnClass,
    droppableClassName,
    innerDroppableClassName,
    draggingOverClass,
    draggableClassName,

}) => {
    //const parentNode = useRef()
    return(
        <div 
            // data-container-id={id}
            // data-tap-droppable-id = {id}
            // ref={parentNode} 
            className={overallContainerClass}>
            <div className = {columnContainerClass}>
                <h2 className={columnTitleClass}><span>Choices</span></h2>
                <div className="w-100 d-flex justify-content-center">
                    {Object.keys(data.itemBank).map((key, index)=>{
                        return (
                            <SortableArea 
                                key={key} 
                                firstElTap = {firstElTap} 
                                id={key}
                                content = {data.itemBank[key]}
                                onTap={onTap}
                                isOver={isOver}
                                disableDnD = {disableDnD}
                                
                                //classes
                                droppableContainerClassName={`${columnClass}-${index+1} w-100 d-flex flex-column align-items-center`}
                                droppableClassName = {droppableClassName}
                                draggableClassName = {draggableClassName}
                                innerDroppableClassName = {innerDroppableClassName}
                                draggingOverClass={draggingOverClass}
                                isDraggingClass = {isDraggingClass}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )}
export default WordBank
