import { forwardRef } from 'react';

const Item = forwardRef(({...props}: any, ref: any) => {
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

