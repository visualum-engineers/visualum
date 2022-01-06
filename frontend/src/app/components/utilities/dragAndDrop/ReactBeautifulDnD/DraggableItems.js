import { Draggable } from "react-beautiful-dnd";
const DraggableItems = ({
    id, 
    index, 
    content, 
    draggableClassName, 
    isDraggingClass, 
    onTap=null, 
    droppableId,

}) =>{
    return (
        <Draggable
            draggableId={id} 
            index={index}
            isDragDisabled = {onTap ? true: false}
        >
            {(provided, snapshot) => (
                <li 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    id={"dragItem"+id}
                    data-tap-draggable-id={id}
                    data-tap-droppable-id={droppableId}
                    data-tap-index={index}
                    className={`${draggableClassName}${snapshot.isDragging ? " "+isDraggingClass: ""}`} 
                    style ={provided.draggableProps.style}
                    onClick={onTap ? onTap:null}
                    onKeyDown={onTap ? onTap:null}
                    tabIndex={0}

                >
                    <div>{content}</div>
                </li>
            )}
        </Draggable>
    )
}
export default DraggableItems