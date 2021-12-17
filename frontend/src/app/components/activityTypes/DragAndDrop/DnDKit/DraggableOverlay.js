import {DragOverlay} from '@dnd-kit/core';
import { forwardRef } from 'react';
const Item = forwardRef(({children, ...props}, ref) =>{
    return(
        <div
            className = {`draggable-overlay ${props.draggableClassName}`}
            style={{cursor:"grabbing"}} 
            ref={ref}
        >   
            <div>{props.data.answerChoices[props.activeId].content}</div>
        </div>
    )
})
const DraggableOverlay = ({activeId, data, draggableClassName}) =>{
    return(
        <DragOverlay >
            {activeId ? (
                // <Item
                //     activeId={activeId}
                //     data={data}
                //     draggableClassName={draggableClassName}
                // />
                <div
                    className = {`draggable-overlay ${draggableClassName}`}
                    style={{cursor:"grabbing"}} 
                >   
                    <div>{data.answerChoices[activeId].content}</div>
                </div>
            ): null}
        </DragOverlay>    
    )
}
export default DraggableOverlay

