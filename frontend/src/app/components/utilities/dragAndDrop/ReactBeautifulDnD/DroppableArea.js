import React from "react";
import { Droppable} from "react-beautiful-dnd";
import DraggableItems from "./DraggableItems";
const getRenderItem = (content, draggableClassName, isDraggingClass) => (provided, snapshot, rubric) =>(
    <li 
        {...provided.draggableProps} 
        {...provided.dragHandleProps}
        ref={provided.innerRef} 
        tabIndex={0}
        className={`${draggableClassName}${snapshot.isDragging ? " "+isDraggingClass: ""}`} 
    >
        <div style={{textAlign: "center"}}>{content[rubric.source.index].content}</div>
    </li>
)
//Droppable container styling
const DroppableArea = ({
    id, 
    content, 
    droppableHeader=null,
    placeholderClass = "",  
    droppableClassName="", 
    innerDroppableClassName ="", 
    draggableClassName="", 
    draggingOverClass="", 
    isDraggingClass= "", 
    onTap=null, 
    firstElTap=null,
    removedEl = null,
    onAreaTouchStart = null,
    onAreaTouchEnd = null,
}) =>{
    const renderItems = getRenderItem(content, draggableClassName, isDraggingClass)
    const InnerList = React.memo(({
        content, 
        onTap,
        removedEl,
        firstElTap = null,
    }) =>
        content.map((draggableContent, index)=>{
            let last = index === content.length-1
            return (
                <DraggableItems
                    id = {draggableContent.id}
                    key = {draggableContent.id}
                    content = {draggableContent.content}
                    index = {index}
                    droppableId = {id.toString()}
                    isDraggingClass={isDraggingClass}
                    onTap={onTap ? onTap: null}
                    draggableClassName = {
                        `${draggableClassName}`
                        + `${last?" last-item":""}`
                        +`${removedEl && removedEl.id === draggableContent.id?" hide-draggable":""}`
                        +`${firstElTap && firstElTap.draggableId === draggableContent.id ?` ${isDraggingClass}`:""}`
                    }
                />
            )
        })
    )

    return(
        <div 
            className = {droppableClassName}
            onTouchStart={onAreaTouchStart}
            onTouchEnd={onAreaTouchEnd}
        >
            {droppableHeader ? droppableHeader : null}
            <Droppable 
                droppableId={id.toString()} 
                direction="vertical"
                renderClone={renderItems}
                isDropDisabled = {onTap ? true : false}
            >
                {(provided, snapshot) =>{
                    return (
                    <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef} 
                        onClick = {firstElTap ?  onTap: null}
                        onKeyDown = {firstElTap? onTap: null}
                        tabIndex = {firstElTap ? 0: -1}
                        data-tap-droppable-id = {id.toString()}
                        className={
                            `${innerDroppableClassName}`
                            + `${snapshot.isDraggingOver ? " "+draggingOverClass: ""}`
                            + `${content.length <= 0 ? " " + placeholderClass : ""}`
                        }
                    >
                        <InnerList 
                            content={content} 
                            removedEl={removedEl}
                            onTap={onTap}
                            firstElTap = {firstElTap}
                        />
                        
                        {provided.placeholder}
                    </ul>)
                }}
            </Droppable>
        </div>
    )
}


export default DroppableArea