import React from 'react';
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
    firstElTap=null, 
    isOver=null,
    disableDnD = null,
}) =>{

    const InnerList = React.memo(({
        content, 
        onTap,
        firstElTap    
    }) =>
        content.map((draggableContent, index)=>{
            let last = index === content.length-1
            const InnerItem = React.memo(({
                index,
                droppableId,
                onTap,
                draggableClassName,
            }) => <SortableItems 
                    id = {draggableContent.id}
                    content = {draggableContent.content}
                    isDraggingClass={isDraggingClass}
        
                    index = {index}
                    droppableId = {droppableId}
                    onTap={onTap}
                    disabled = {disableDnD}
        
                    draggableClassName = {draggableClassName}
                />
            )
            return (
                <InnerItem
                    key = {draggableContent.id}
                    index = {index}
                    droppableId = {id.toString()}
                    onTap={disableDnD ? onTap: null}
                    draggableClassName = {
                        `${draggableClassName}${last?" last-item":""}`
                        +`${firstElTap && firstElTap.draggableId === draggableContent.id ?` ${isDraggingClass}`: " "}`
                    }
                />
            )
        }) 
    )
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
                    firstElTap = {firstElTap}
                    innerDroppableClassName = {innerDroppableClassName}
                    draggingOverClass = {draggingOverClass}
                    isOver={isOver}
                    placeHolderClass = {content.length > 0?  null : placeHolderClass}
                    onTap={disableDnD? onTap: null}
                    disabled = {disableDnD}
                >
                    <InnerList
                        content = {content}
                        onTap ={onTap}
                        firstElTap={firstElTap}
                    />
                </Droppable>
            </div>
        </SortableContext>
    )
}

export default SortableArea