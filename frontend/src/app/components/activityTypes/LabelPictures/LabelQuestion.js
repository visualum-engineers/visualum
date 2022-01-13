import DroppableArea from "../../utilities/dragAndDrop/ReactBeautifulDnD/DroppableArea"

const LabelQuestion = ({
    data,
    onTap, 
    firstElTap,
    onQuestionNavSwipe,
    questionID,
    questionContent,
    questionIndex,
    placeholderClass,
    columnContainerClass,
    droppableClassName,
    innerDroppableClassName,
    draggableClassName,
    isDraggingClass,
    draggingOverClass,
}) =>{
    return(
        <>
        <div 
            className="label-pic-activity-question d-flex align-items-center w-100"
            onTouchStart={onQuestionNavSwipe}
            onTouchEnd={onQuestionNavSwipe}
        >
            <h2 className="w-100 unselectable">{questionIndex+1 + ". " + questionContent}</h2>
        </div>
        <div 
            className={columnContainerClass}
            onTouchStart={onQuestionNavSwipe}
            onTouchEnd={onQuestionNavSwipe}
        >
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