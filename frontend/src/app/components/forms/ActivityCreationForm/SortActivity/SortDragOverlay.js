import { forwardRef } from 'react';

const Item = forwardRef(({...props}, ref) => {
    //console.log(props)
    return(
        <div
            className = {`draggable-overlay${" "+props.draggableClassName}`}
            style={{cursor:"grabbing"}} 
            ref={ref}
        >   
            
        </div>
    )
})
export default Item