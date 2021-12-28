
import Draggable from "./Draggable"
const DraggableItems = ({
    id, 
    index, 
    content, 
    draggableClassName, 
    isDraggingClass, 
    onTap=null, 
    droppableId
}) =>{
    return(
        <Draggable
            droppableId = {droppableId}
            index = {index}
            id = {id}
            draggableClassName = {draggableClassName}
            isDraggingClass={isDraggingClass}
            onTap={onTap ? onTap: null}
            disabled={onTap}
        >
            <div>{content}</div>
        </Draggable>
    )
}
export default DraggableItems