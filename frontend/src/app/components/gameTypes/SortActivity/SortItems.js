import {Draggable} from 'react-beautiful-dnd';

//generates draggable list items
const DragItems = ({id, content, index}) => {
    return (
        <Draggable key={id} draggableId={id} index={index}>
            {(provided) => (
                <li className="dragItem" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{content}</li>
            )}
        </Draggable>
    )
}

export default DragItems