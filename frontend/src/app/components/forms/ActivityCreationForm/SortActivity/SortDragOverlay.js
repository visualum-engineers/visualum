import { forwardRef } from 'react';
import { SortableItemBody } from './SortActivityCategoryItem';
import { useState } from 'react';
const Item = forwardRef(({...props}, ref) => {
    //find proper draggable
    //this is O(n). To make look up O(1)
    //we would have to generate a hashmap/object
    //and store all answer choices as keys
    //this would add complexity managing data, 
    // and use more memory but if needed,
    // it can be a future performance improvement
    const getDraggableContent = () =>{
        const activeId = props.activeId.draggable
        const containerId = props.activeId.container
        const data = props.data
        for(let category of data.categories){
            if(category.id === containerId){
                for(let item of category.answers){
                    if(item.id === activeId) {
                        return item
                    } 
                } 
            }
        }

    }
    //we store it in state so it value doesnt change
    //after we start drag
    const draggableContent = useState(getDraggableContent())[0]
    
    return(
        <div
            className = {`draggable-overlay${" "+props.draggableClassName}`}
            style={{cursor:"grabbing"}} 
            ref={ref}
        >   
            <SortableItemBody 
                data={draggableContent}
            />
        </div>
    )
})
export default Item