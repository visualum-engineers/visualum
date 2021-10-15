import { Droppable} from 'react-beautiful-dnd';
import DroppableItems from './DroppableItems';
const SortArea = ({id, currAnswers, answerData, wordBank=false}) =>{
    return (
        <div className = {wordBank ? "answerArea":"sortArea"}>
            {wordBank ? null : <p>{id}</p>}
            <Droppable droppableId={id} direction ="vertical">
                {(provided) => (
                    <ul className="dropContainer d-flex flex-column align-items-center"
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                    >
                        {currAnswers.map((key, index) => {
                            if (/empty.*/.test(key)) return <div key={key} className="empty"></div>
                            return <DroppableItems
                                key={key} 
                                id={key} 
                                content={answerData[key].choice} 
                                index={index}
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
