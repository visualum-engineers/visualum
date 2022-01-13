import React from 'react';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import SortableItems from "./SortableItems"
import Droppable from '../NonSortableDnD/Droppable';
const innerListPropsEqual=(prev, next) =>{
    const prevContent = prev.content
    //determine if content arrays are equal
    const isContentItemsEqual = next.content.every((item, index) => (item && prevContent[index]) && (item.id === prevContent[index].id))
    const isContentLengthEqual = next.content.length === prev.content.length
    const isContentEqual = isContentItemsEqual && isContentLengthEqual
    //check all other props
    const isDisabledEqual = prev.disableDnD === next.disableDnD 
    const isOnTapEqual = prev.onTap === next.onTap
    const isFirstElTap = prev.firstElTap === next.firstElTap
    const isDraggingClassName = prev.draggableClassName === next.draggableClassName
    const propsEqual = isContentEqual && isDisabledEqual && isOnTapEqual && isFirstElTap && isDraggingClassName
    return propsEqual
}

const InnerList = React.memo(({
    id,
    content, 
    onTap,
    firstElTap,
    disableDnD,
    isDraggingClass,
    draggableClassName
}) => content.map((draggableContent, index)=>{
        let last = index === content.length-1
        return (
            <SortableItems 
                key = {draggableContent.id}
                id = {draggableContent.id}
                content = {draggableContent.content}
                isDraggingClass={isDraggingClass}
                index = {index}
                droppableId = {id.toString()}
                onTap={disableDnD ? onTap: null}
                disabled = {disableDnD}
                draggableClassName = {
                    `${draggableClassName}${last?" last-item":""}`
                    +`${firstElTap && firstElTap.draggableId === draggableContent.id ?` ${isDraggingClass}`: " "}`
                }
            />
        )
    })
, innerListPropsEqual) 

const SortableArea = ({
    id, 
    content, 
    droppableHeader=null,
    onTap=null, 
    firstElTap=null, 
    isOver=null,
    disableDnD = null, 
    droppableClassName="", 
    innerDroppableClassName ="", 
    draggableClassName="", 
    draggingOverClass="", 
    isDraggingClass= "", 
    placeHolderClass = "",

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
                    firstElTap = {firstElTap}
                    innerDroppableClassName = {innerDroppableClassName}
                    draggingOverClass = {draggingOverClass}
                    isOver={isOver}
                    placeHolderClass = {content.length > 0?  null : placeHolderClass}
                    onTap={disableDnD? onTap: null}
                    disabled = {disableDnD}
                >
                    <InnerList
                        id={id.toString()}
                        disableDnD ={disableDnD}
                        content = {content}
                        onTap ={onTap}
                        firstElTap={firstElTap}
                        isDraggingClass={isDraggingClass}
                        draggableClassName ={draggableClassName}
                    />
                </Droppable>
            </div>
        </SortableContext>
    )
}

export default SortableArea