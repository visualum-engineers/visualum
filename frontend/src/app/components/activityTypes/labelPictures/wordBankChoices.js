import { Draggable } from "react-beautiful-dnd"

const Choices = ({index, label}) =>{
    return (
        <Draggable key={index} draggableId={index.toString()} index={index}>
            {(provided) => (
                <div 
                    className="labelPicAns d-flex align-items-center justify-content-center"
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