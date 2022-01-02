import DroppableArea from "../../utilities/dragAndDrop/ReactBeautifulDnD/DroppableArea"

const LabelQuestion = ({
    data,
    onTap, 
    firstElTap,
    droppableHeader, 
    droppableClassName,
    innerDroppableClassName,
    draggableClassName,
    isDraggingClass,
    draggingOverClass,
    questionID,
    questionContent,
}) =>{
    return(
        <div className="label-pic-question-transition-container d-flex flex-column align-items-center flex-grow-1">
            <div 
                className="label-pic-activity-question d-flex align-items-center col-11 col-md-9 col-xl-8"
            >
                <h2 className="w-100">{questionContent}</h2>
                {/* <h2>Overflowing text is important to test so this question is to see how text overflows here and how the container adapts to it. The average question is around this big</h2> */}
            </div>
            <div className="d-flex justify-content-center align-items-center flex-grow-1 w-100">
                <DroppableArea 
                    id = {questionID}
                    content={data.categories[questionID]}
                    droppableHeader = {droppableHeader}
                    droppableClassName = {droppableClassName}
                    innerDroppableClassName = {innerDroppableClassName}
                    draggableClassName= {draggableClassName}
                    draggingOverClass =  {draggingOverClass}
                    isDraggingClass = {isDraggingClass}
                    onTap = {onTap}
                    firstElTap = {firstElTap}
                />
            </div>
        </div>
    )
}
export default LabelQuestion