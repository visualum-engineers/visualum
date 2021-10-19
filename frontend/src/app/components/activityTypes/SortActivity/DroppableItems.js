import {Draggable} from 'react-beautiful-dnd';
// import useWindowWidth from '../../../hooks/use-window-width';
//generates draggable list items
const DragItems = ({id, index, content}) => {
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
