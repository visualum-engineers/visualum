import { Draggable } from "react-beautiful-dnd";
const DraggableItems = ({id, index, content, draggableClassName, isDraggingClass}) =>{
    return (
        <Draggable
            draggableId={id} 
            index={index}>
            {(provided, snapshot) => (
                <li 
                    id={"dragItem"+id}
                    className={`${draggableClassName} ${snapshot.isDragging ? isDraggingClass: ""}`} 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    style ={provided.draggableProps.style}
                >
                    {content}
                </li>
            )}
        </Draggable>
    )
}
export default DraggableItems