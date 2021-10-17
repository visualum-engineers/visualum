import { Droppable} from 'react-beautiful-dnd';
import DroppableItems from './DroppableItems';
const SortArea = ({id, currAnswers, windowWidth, wordBank=false}) =>{
    return (
        <div 
            className = {wordBank ? "answerArea":"sortArea"}
            style = {windowWidth ? {"width": "30%"}: {"width": "90%"}}
        >
            {wordBank ? null : <p>{id}</p>}
            <Droppable droppableId={id} direction ="vertical">
                {(provided) => (
                    <ul className="dropContainer d-flex flex-column align-items-center"
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                    >
                        {currAnswers.map((answer, index) => {
                            return <DroppableItems
                                key={answer.id}
                                id={answer.id} 
                                content={answer.content} 
                                index = {index}
                            />
                        })}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </div>
    )
} 

export default SortArea
