import Droppable from "./Droppable";
import DraggableItems from "./DraggableItems";

const DroppableArea = ({id, content, droppableHeader=null, droppableClassName="", innerDroppableClassName ="", draggableClassName="", draggingOverClass="", isDraggingClass= "", onTap=null, firstElTap=null}) =>{
    return(
        <div className = {droppableClassName}>
            {droppableHeader ? droppableHeader : null}
            <Droppable 
                id={id.toString()}
                firstElTap = {firstElTap}
                innerDroppableClassName = {innerDroppableClassName}
                draggingOverClass = {draggingOverClass}
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
                            draggableClassName = {`${draggableClassName}${last?" last-item":""}`}
                            isDraggingClass={isDraggingClass}
                            onTap={onTap ? onTap: null}
                        />
                    )
                })}
            </Droppable> 
        </div>
    )
}

export default DroppableArea