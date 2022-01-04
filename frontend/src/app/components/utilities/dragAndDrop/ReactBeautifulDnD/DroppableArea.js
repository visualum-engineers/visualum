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
}) =>{
    const renderItems = getRenderItem(content, id, draggableClassName, isDraggingClass)
    const InnerList = React.memo(({content, onTap}) =>
        content.map((draggableContent, index)=>{
            let last = index === content.length-1
            return (
                <DraggableItems
                    id = {draggableContent.id}
                    key = {draggableContent.id}
                    index = {index}
                    droppableId = {id.toString()}
                    content = {draggableContent.content}
                    isDraggingClass={isDraggingClass}
                    onTap={onTap ? onTap: null}
                    draggableClassName = {
                        `${draggableClassName}${last?" last-item":""}` +
                        +`${removedEl && removedEl.id === draggableContent.id?" hide-draggable":""}`
                    }
                />
            )
        })
    )
    //console.log(firstElTap)
    return(
        <div 
            className = {droppableClassName}
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
                            onTap={onTap}
                        />
                        {provided.placeholder}
                    </ul>)
                }}
            </Droppable>
        </div>
    )
}


export default DroppableArea