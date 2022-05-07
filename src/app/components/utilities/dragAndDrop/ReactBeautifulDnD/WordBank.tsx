import DroppableArea from "./DroppableArea"
import useBodyAreaResizable from "../../../../hooks/use-body-area-resizable"
import { RefObject, useRef } from "react"
const WordBank = ({
        data, 
        firstElTap, 
        isDraggingClass,
        onTap, 
        //classes
        resizeContainerClass,
        overallContainerClass, 
        columnContainerClass, 
        columnTitleClass,
        columnClass,
        droppableClassName,
        innerDroppableClassName,
        draggingOverClass,
        draggableClassName
    }: any) => {
        
    //word bank resizing
    const wordBankRef = useRef() as RefObject<HTMLDivElement>
    const {
        posData: wordBankPos, 
        handle: wordBankHandle
    } = useBodyAreaResizable({
            nodeRef: wordBankRef,
            handleType: "S",
            handlePos : {
                south: true, 
                north: false, 
                east: false, 
                west: false
            }
    })
    const wordBankHeight = {height: wordBankPos ? wordBankPos.height: null}
    return(
        <div 
            style={{position:"relative"}}
            className={resizeContainerClass}
        >
            <div 
                ref={wordBankRef}
                style={wordBankHeight}
                className={overallContainerClass}
            >
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
            {wordBankHandle}
        </div>
    )
}
export default WordBank