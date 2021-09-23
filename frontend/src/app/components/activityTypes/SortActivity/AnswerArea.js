import {Droppable} from 'react-beautiful-dnd';
import SortItems from './SortItems';
const AnswerArea = ({currAnswers, answerData}) => {
    //places answer choices in the answer box/area
    return(
        <div className ="answerArea flex-column d-flex justify-content-start align-items-center">
            <p>Word Bank</p>
            <Droppable droppableId = "answerChoices" direction ="vertical">
                {(provided) => (
                    <ul className = "answerDropContainer d-flex flex-column align-items-center" {...provided.droppableProps} ref={provided.innerRef}>
                        {currAnswers.map((id, index) => {
                            return <SortItems key={id} id={id} content={answerData[id].choice} index={index}/>
                        })}
                        {provided.placeholder}
                    </ul>
                 )} 
             </Droppable>
        </div>
    )
}
export default AnswerArea;
