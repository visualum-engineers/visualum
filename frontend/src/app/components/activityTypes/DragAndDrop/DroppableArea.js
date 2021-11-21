import { Droppable } from "react-beautiful-dnd";
import DraggableItems from "./DraggableItems";
//Droppable container styling

const DroppableArea = ({id, content, droppableHeader=null, droppableClassName="", innerDroppableClassName ="", draggableClassName="", draggingOverClass="", isDraggingClass= "", onTap=null, firstElTap=null}) =>{
   
    return(
        <div className = {droppableClassName}>
            {droppableHeader ? droppableHeader : null}
            <Droppable droppableId={id.toString()} direction="vertical">
                {(provided, snapshot) =>(
                    <ul 
                        onClick = {firstElTap ?  onTap: null}
                        onTouchEnd = {firstElTap ?  onTap: null}
                        ref={provided.innerRef}
                        data-tap-droppable-id = {id.toString()}
                        className={`${innerDroppableClassName} ${snapshot.isDraggingOver ? draggingOverClass: ""}`}
                    >
                        {content.map((draggableContent, index)=>{
                            let last = index === content.length-1
                            return (
                                <DraggableItems 
                                    droppableId = {id.toString()}
                                    key = {draggableContent.id}
                                    index = {index}
                                    id = {draggableContent.id}
                                    content = {draggableContent.content}
                                    draggableClassName = {`${draggableClassName} ${last?"last-item":""}`}
                                    isDraggingClass={isDraggingClass}
                                    onTap={onTap ? onTap: null}
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