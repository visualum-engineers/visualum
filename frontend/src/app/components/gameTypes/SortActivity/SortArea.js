import React, {useState, useRef} from 'react'
import { Droppable} from 'react-beautiful-dnd';
import SortItems from './SortItems';
const SortArea = ({columnTitle, currAnswers, answerData}) =>{
    return (
        <div className ="sortArea flex-column d-flex justify-content-start align-items-center ">
            <p>{columnTitle}</p>
            
            <Droppable droppableId={columnTitle} direction ="vertical">
                {(provided) => (
                    <div className="sortDropContainer d-flex flex-column align-items-center" {...provided.droppableProps} ref={provided.innerRef}>
                        {currAnswers.map((id, index) => {
                            return <SortItems key={id} id={id} content={answerData[id].choice} index={index}/>
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
} 

export default SortArea