import {Draggable} from 'react-beautiful-dnd';
// import useWindowWidth from '../../../hooks/use-window-width';
//generates draggable list items
const DragItems = ({id, index, content}) => {

        // const windowWidth = useWindowWidth()
    // let disableDrag = false
    // //only used for mobile since only here, is scrolling too slow
    // const autoScoll = (e) =>{
    //     if(!disableDrag){
    //         disableDrag = true
    //         const draggedEl = e.target.getBoundingClientRect()
    //         //check top pos
    //         if(draggedEl.top < 40) {
    //             window.scrollBy({top: -1000, behavior: 'smooth'})
    //             console.log(draggedEl.height)
    //         }
    //         //check bottom pos
    //         if(draggedEl.bottom>= window.innerHeight-35) {
    //             window.scrollBy({top: draggedEl.height, behavior:"smooth"})
    //             console.log(draggedEl.height)
    //         }
    //         //restore function
    //         setTimeout(()=>{
    //             disableDrag = false
    //         }, 150)
    //     }
    // }
    const getItemStyle = (isDragging, draggableStyle) => ({
        // styles we need to apply on draggables
        background: isDragging ? 'white' : "none",
        color: isDragging ? 'black' : "white",
        ...draggableStyle,
    });
    return (
        <Draggable
            draggableId={id} 
            index={index}>
            {(provided, snapshot) => (
                <li 
                    id={"dragItem"+id}
                    className="dragItem" 
                    //onTouchMove = {!windowWidth ? autoScoll : null}
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >{content}</li>
            )}
        </Draggable>
    )
}

export default DragItems
