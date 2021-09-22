import { Draggable } from "react-beautiful-dnd"
const Choices = ({id, index, label}) =>{
    return (
        <Draggable 
            draggableId={id.toString()} 
            index={index}>
            {(provided) => (
                <div 
                    className="labelChoices d-flex align-items-center justify-content-center"
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    <p>{label.content}</p>
                </div>
            )}
        </Draggable>
    )
}
export default Choices
