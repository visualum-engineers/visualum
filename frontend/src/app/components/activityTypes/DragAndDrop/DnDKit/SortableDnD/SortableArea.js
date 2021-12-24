import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import SortableItems from "./SortableItems"
import Droppable from '../NonSortableDnD/Droppable';
const SortableArea = ({
    id, 
    content, 
    droppableHeader=null, 
    droppableClassName="", 
    innerDroppableClassName ="", 
    draggableClassName="", 
    draggingOverClass="", 
    isDraggingClass= "", 
    placeHolderClass = "",
    onTap=null, 
    firstTapEl=null, 
    isOver=null,
    disableDnD = null,
}) =>{
    return (
        <SortableContext 
            items={content}
            strategy = {verticalListSortingStrategy}
            id={id}
        >
            <div className = {droppableClassName} id={id}>
                {droppableHeader ? droppableHeader : null}
                <Droppable 
                    id={id.toString()}
                    firstTapEl = {firstTapEl}
                    innerDroppableClassName = {innerDroppableClassName}
                    draggingOverClass = {draggingOverClass}
                    isOver={isOver}
                    placeHolderClass = {content.length > 0?  null : placeHolderClass}
                    onTap={disableDnD? onTap: null}
                >
                    {content.map((draggableContent, index)=>{
                        let last = index === content.length-1
                        return (
                            <SortableItems 
                                droppableId = {id.toString()}
                                key = {draggableContent.id}
                                index = {index}
                                id = {draggableContent.id}
                                content = {draggableContent.content}
                                draggableClassName = {`${draggableClassName}${last?" last-item":""}`}
                                isDraggingClass={isDraggingClass}
                                onTap={disableDnD ? onTap: null}
                                disabled = {disableDnD}
                            />
                        )
                    })}
                </Droppable>
            </div>
        </SortableContext>
    )
}

export default SortableArea