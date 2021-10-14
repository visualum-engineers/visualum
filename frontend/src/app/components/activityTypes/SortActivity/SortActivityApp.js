import React, { useState} from 'react'
import DroppableArea from './DroppableArea'
import { DragDropContext} from 'react-beautiful-dnd';
import useWindowWidth from '../../../hooks/use-window-width';

/*Note Missing To-do
Backend: 
    1. Missing updating the backend with partial completion of assignment
    2. Missing updating the backend with grade after completion

Frontend: 
    1. Fixing styling bugs that occurs during sorting
        - add conditionals to change orientation of boxes depending on screen size
        - breakpoint styling to make it work on phones and computers
    2. Missing answer validation (check if their sorting is correct)
    3. Missing re-rendering logic, when user answers question and moves on to the next one.
    4. Missing progress saved on local storage/memory (if user exits out of page)
*/
const SortActivityApp = ({activityData}) => {
    //for updating redux store(data to be sent to backend)
    const [state, setState] = useState(activityData)
    const windowWidth = useWindowWidth()
    const columns = windowWidth? Array(3).fill(0) : Array(2).fill(0)

    //handle state update when object stops
    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index) return
        //start and end containers
        const start = source.droppableId;
        const finish = destination.droppableId;

        //setup for index calculations to add and remove dropped items
        const answerChoiceTestEl = (el) => /answerChoices.*/.test(el)
        const startAnswersList = Array.from( answerChoiceTestEl(start) ? state.columns["answerChoices"] :state.columns[start])
        const finishAnswersList = Array.from( answerChoiceTestEl(finish) ? state.columns["answerChoices"] : state.columns[finish])
        const startElCounted = startAnswersList.length%columns.length ===0 ? startAnswersList.length/columns.length : Math.floor(startAnswersList.length/columns.length + 1)
        const finishElCounted = finishAnswersList.length%columns.length === 0 ? finishAnswersList.length/columns.length : Math.floor(finishAnswersList.length/columns.length + 1)
        const startElIdx =  answerChoiceTestEl(start) ? parseInt(start.match(/[0-9]+/)) * startElCounted +  source.index : null
        const endElIdx = answerChoiceTestEl(finish) ? parseInt(finish.match(/[0-9]+/)) * finishElCounted + destination.index : null
        const sameContainer = start===finish || (answerChoiceTestEl(start) && answerChoiceTestEl(finish))
        let newState

        //list container are same - remove el from old idx, add to new idx
        startAnswersList.splice(answerChoiceTestEl(start) ? startElIdx : source.index, 1)
        if(sameContainer){
            startAnswersList.splice(answerChoiceTestEl(finish) ? endElIdx : destination.index, 0, draggableId);
            newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [answerChoiceTestEl(start)?"answerChoices": start]: startAnswersList,
                }
            }
        } 
        //list containers are different - move elements into the new container, and remove them from old one
        else {
            finishAnswersList.splice(answerChoiceTestEl(finish) ? endElIdx : destination.index, 0, draggableId);
            newState = {
                ...state,
                columns:{
                    ...state.columns,
                    [answerChoiceTestEl(start) ?"answerChoices":start] : startAnswersList,
                    [answerChoiceTestEl(finish) ?"answerChoices":finish] : finishAnswersList,
                }
            }
        } 
        //update state
        setState(newState)
    };
    return (
       <>
        <p className="instructions">Sort the following:</p>
        <DragDropContext onDragEnd={onDragEnd}>
            <div className ="draggableAreaContainer d-flex flex-column align-items-center">
                {/* Renders sort categories */}
                <div className={`d-flex ${!windowWidth ? "flex-column":""}`}>
                    {columns.map((content, index) =>{
                        //roundup number of elements counted
                        const elementsPresent = (Object.keys(state.columns).length-1)%columns.length === 0 ? (Object.keys(state.columns).length-1)/columns.length : Math.floor((Object.keys(state.columns).length-1)/columns.length+1)
                        const startSlice = index * elementsPresent 
                        const endSlice = (index+1) * elementsPresent
                        return (
                            <div className="d-flex" key={index}>
                                {Object.keys(state.columns).slice(startSlice, endSlice).map((columnTitle)=> {
                                        if(columnTitle === "answerChoices") return null
                                        return <DroppableArea 
                                                    key={columnTitle} 
                                                    id={columnTitle}
                                                    answerData= {state.answerChoices} 
                                                    currAnswers={state.columns[columnTitle]}
                                                />
                                    })}
                            </div>
                    )})}
                </div>
                 {/* Renders word/response bank */}
                <div className="d-flex w-100 justify-content-center">
                    {columns.map((content, index) =>{
                        const elementsPresent = state.columns["answerChoices"].length%columns.length === 0? state.columns["answerChoices"].length/columns.length : Math.floor(state.columns["answerChoices"].length/columns.length + 1)
                        const startSlice = index*elementsPresent
                        const endSlice = (index+1)*elementsPresent
                        return (
                            <DroppableArea 
                                key={"answerChoices-"+index}
                                id={"answerChoices-"+index} 
                                wordBank = {true}
                                currAnswers={state.columns["answerChoices"].slice(startSlice, endSlice)} 
                                answerData= {state.answerChoices}
                            />
                        )
                    })}
                </div>
            </div>  
        </DragDropContext>
        </>
    )
}
export default SortActivityApp