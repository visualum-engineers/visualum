import { Draggable } from "react-beautiful-dnd";
const DraggableItems = ({id, index, content, draggableClassName, isDraggingClass, onTap=null, droppableId}) =>{
    return (
        <Draggable
            draggableId={id} 
            index={index}
            isDragDisabled = {onTap ? true: false}
        >
            {(provided, snapshot) => (
                <li 
                    id={"dragItem"+id}
                    data-tap-draggable-id={id}
                    data-tap-droppable-id={droppableId}
                    data-index={index}
                    className={`${draggableClassName} ${snapshot.isDragging ? isDraggingClass: ""}`} 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    style ={provided.draggableProps.style}
                    onClick={onTap ? onTap:null}
                    onTouchStart = {onTap ? onTap:null}
                >
                    {content}
                </li>
            )}
        </Draggable>
    )
}
export default DraggableItems