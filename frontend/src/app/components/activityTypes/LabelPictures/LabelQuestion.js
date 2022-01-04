import DroppableArea from "../../utilities/dragAndDrop/ReactBeautifulDnD/DroppableArea"

const LabelQuestion = ({
    data,
    onTap, 
    firstElTap,
    placeholderClass,
    columnContainerClass,
    droppableClassName,
    innerDroppableClassName,
    draggableClassName,
    isDraggingClass,
    draggingOverClass,
    questionID,
    questionContent,
}) =>{
    return(
        <>
        <div 
            className="label-pic-activity-question d-flex align-items-center w-100"
        >
            <h2 className="w-100">{questionContent}</h2>
            {/* <h2>Overflowing text is important to test so this question is to see how text overflows here and how the container adapts to it. The average question is around this big</h2> */}
        </div>
        <div className={columnContainerClass}>
            <DroppableArea 
                id = {questionID}
                content={data.categories[questionID]}
                firstElTap = {firstElTap}
                onTap = {onTap}
                //classes
                placeholderClass={placeholderClass}
                droppableClassName = {droppableClassName}
                innerDroppableClassName = {innerDroppableClassName}
                draggableClassName= {draggableClassName}
                draggingOverClass =  {draggingOverClass}
                isDraggingClass = {isDraggingClass}
          
                
            />
        </div>
        
        </>
    )
}
export default LabelQuestion