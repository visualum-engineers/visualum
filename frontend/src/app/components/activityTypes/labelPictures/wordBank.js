import {Droppable} from "react-beautiful-dnd"
import Choices from "./LabelChoices"

const WordBank = ({state}) =>{
    return(
        <div className="labelPicWordBank d-flex w-100">
            {state.wordBankLabels.map((content,column)=>{ return ( 
                //generates columns in word bank
                <Droppable 
                    key={column.toString()} 
                    droppableId={column +"wordBankColumn"} 
                    direction="vertical">
                    {(provided) => (
                        <div 
                            className="labelWordBankColumn d-flex flex-column w-100"
                            {...provided.droppableProps} 
                            ref={provided.innerRef}>
                            {/* generates draggable items to corresponding columns */}
                            {content.map((label, index)=>{
                                return <Choices 
                                            key={label.key}
                                            id = {label.key}
                                            index={index} 
                                            label ={label}/>
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