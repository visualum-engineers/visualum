import {Droppable} from "react-beautiful-dnd"
import Choices from "./wordBankChoices"

const WordBank = ({wordBankColumns, state}) =>{
    return(
        <div className="labelPicWordBank d-flex w-100">
            {wordBankColumns.map((content,column)=>{ return (
                //generates columns in word bank
                <Droppable 
                    key={column.toString()} 
                    droppableId={column.toString()} 
                    direction="vertical">
                    {(provided) => (
                        <div 
                            className="labelWordColumn d-flex flex-column w-100"
                            {...provided.droppableProps} 
                            ref={provided.innerRef}>
                            {/* generates draggable items to corresponding columns */}
                            {state.teacherLabels.map((label, index)=>{
                                if((index+column)%wordBankColumns.length ===0) return (
                                    <Choices key={index} index={index} label ={label}/>
                                )
                                return null
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            )})}
        </div>
    )
}
export default WordBank