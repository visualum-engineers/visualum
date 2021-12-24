import { forwardRef } from 'react';

const Item = forwardRef(({...props}, ref) => {
    return(
        <div
            className = {`draggable-overlay${" "+props.draggableClassName}`}
            style={{cursor:"grabbing"}} 
            ref={ref}
        >   
            <div>{props.data.answerChoices[props.activeId].content}</div>
        </div>
    )
})
export default Item

