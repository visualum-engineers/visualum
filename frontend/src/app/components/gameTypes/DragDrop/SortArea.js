import React, {useState, useRef} from 'react'
import { Droppable} from 'react-beautiful-dnd';
import DragItems from './DragDropItems';
const SortArea = ({columnTitle, currAnswers, answerData}) =>{
    return (
        <div className ="sortArea flex-column d-flex justify-content-center align-items-center ">
            <p>{columnTitle}</p>
            
            <Droppable droppableId={columnTitle} direction ="vertical">
                {(provided) => (
                    <div className="sortDropContainer d-flex flex-column align-items-center" {...provided.droppableProps} ref={provided.innerRef}>
                        {currAnswers.map((id, index) => {
                            return <DragItems key={id} id={id} content={answerData[id].choice} index={index}/>
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
} 

export default SortArea