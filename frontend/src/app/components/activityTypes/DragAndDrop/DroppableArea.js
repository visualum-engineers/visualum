import { Droppable } from "react-beautiful-dnd";
import DraggableItems from "./DraggableItems";
//Droppable container styling

const DroppableArea = ({id, content, droppableHeader=null, droppableClassName="", innerDroppableClassName ="", draggableClassName="", draggingOverClass="", isDraggingClass= ""}) =>{
   
    return(
        <div className = {droppableClassName}>
            {droppableHeader ? droppableHeader : null}
            <Droppable droppableId={id.toString()} direction="vertical">
                {(provided, snapshot) =>(
                    <ul 
                        ref={provided.innerRef}
                        className={`${innerDroppableClassName} ${snapshot.isDraggingOver ? draggingOverClass: ""}`}
                    >
                        {content.map((draggableContent, index)=>{
                            let last = index === content.length-1
                            return (
                                <DraggableItems 
                                    key = {draggableContent.id}
                                    index = {index}
                                    id = {draggableContent.id}
                                    content = {draggableContent.content}
                                    draggableClassName = {`${draggableClassName} ${last?"last-item":""}`}
                                    isDraggingClass={isDraggingClass}
                                />
                            )
                        })}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>

        </div>
    )
}


export default DroppableArea