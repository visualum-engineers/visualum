import { RefObject, useRef } from "react"
import DroppableArea from "../../utilities/dragAndDrop/ReactBeautifulDnD/DroppableArea"
import useBodyAreaResizable from "../../../hooks/use-body-area-resizable"
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
}: any) =>{
    //nodes for resizable container
    const questionRef = useRef() as RefObject<HTMLDivElement>
    const droppableAreaRef = useRef() as RefObject<HTMLDivElement>
    //resizable hooks that make the body element the entire resizable area
    const {
        posData: questionAreaPos, 
        handle: questionHandle
    } = useBodyAreaResizable({
            nodeRef: questionRef,
            handleType: "S",
            handlePos : {
                south: true, 
                north: false, 
                east: false, 
                west: false
            }
    })
    const {
        posData: droppableAreaPos, 
        handle: droppableHandle
    } = useBodyAreaResizable({
            nodeRef: droppableAreaRef,
            handleType: "S",
            handlePos : {
                south: true, 
                north: false, 
                east: false, 
                west: false
            }
    })
    //new heights
    const questionHeight = {height: questionAreaPos ? questionAreaPos.height : null}
    const droppableHeight = {height: droppableAreaPos ? droppableAreaPos.height : null}
    return(
        <>
        <div 
            className ="w-100" 
            style={{position: "relative", zIndex: "1"}}
        >
            <div 
                ref = {questionRef}
                className="label-pic-activity-question d-flex align-items-center w-100"
                onTouchStart={onQuestionNavSwipe}
                onTouchEnd={onQuestionNavSwipe}
                style={questionHeight}
            >
                <h2 className="w-100 unselectable">{questionIndex+1 + ". " + questionContent}</h2>
            </div>
            {questionHandle}
        </div>
        <div 
            className ="d-flex flex-column w-100 flex-grow-1" 
            style={{position: "relative", zIndex: "1"}}
        >
            <div 
                ref={droppableAreaRef}
                className={columnContainerClass}
                style={droppableHeight}
            >
                <DroppableArea 
                    id = {questionID}
                    content={data.categories[questionID]}
                    firstElTap = {firstElTap}
                    onTap = {onTap}
                    onAreaTouchStart={onQuestionNavSwipe}
                    onAreaTouchEnd={onQuestionNavSwipe}
                    //classes
                    placeholderClass={placeholderClass}
                    droppableClassName = {droppableClassName}
                    innerDroppableClassName = {innerDroppableClassName}
                    draggableClassName= {draggableClassName}
                    draggingOverClass =  {draggingOverClass}
                    isDraggingClass = {isDraggingClass}      
                />
            </div>
            {droppableHandle}
        </div>
        </>
    )
}
export default LabelQuestion