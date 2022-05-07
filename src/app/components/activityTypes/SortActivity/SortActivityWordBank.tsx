import { useRef } from "react"
import SortableArea from "../../utilities/dragAndDrop/DnDKit/SortableDnD/SortableArea"
import useBodyAreaResizable from "../../../hooks/use-body-area-resizable"
import mergeRefs from "../../../helpers/mergeRefs"
const WordBank = ({
    data, 
    firstElTap,
    onTap, 
    isOver=null,
    disableDnD = null,
    
    //classes
    resizeContainerClass,
    isDraggingClass,
    overallContainerClass, 
    columnContainerClass, 
    columnTitleClass,
    columnClass,
    droppableClassName,
    innerDroppableClassName,
    draggingOverClass,
    draggableClassName,

}: any) => {
    const parentNode= useRef()
    const wordBankResizableRef = useRef()
    const {
        posData: wordBankContainerPos, 
        handle: wordBankResizeHandle
    } = useBodyAreaResizable({
            nodeRef: wordBankResizableRef,
            handleType: "S",
            handlePos : {
                south: true, 
                north: false, 
                east: false, 
                west: false
            }
    })
    const wordBankHeight = {
        height: wordBankContainerPos ? wordBankContainerPos.height : null,
    }

    return(
        <div className={resizeContainerClass}>
            <div 
                ref={mergeRefs([parentNode, wordBankResizableRef])} 
                data-tap-droppable-id={"answerChoices"}
                className={overallContainerClass}
                style={wordBankHeight}
            >
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
                                    parentNode={{node: parentNode.current, id:"answerChoices"}}

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
            {wordBankResizeHandle}
        </div>
    )}
export default WordBank
