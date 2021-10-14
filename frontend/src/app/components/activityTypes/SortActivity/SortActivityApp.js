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
        const start = source.droppableId;
        const finish = destination.droppableId;
        const answerChoiceTestEl = (el) => /answerChoices.*/.test(el)
        let newState
        let startAnswersList
        let finishAnswersList
        let newAnswerChoices
        let startElIdx
        let endElIdx
        let startElCounted
        let finishElCounted
        //dictates behavior when droppable container is the same from end to start
        //therefore, will handle reording of elements on list
        if (start===finish || (answerChoiceTestEl(start) && answerChoiceTestEl(finish))){
            newAnswerChoices = Array.from( answerChoiceTestEl(start) ? state.columns["answerChoices"] : state.columns[start])
            //roundup number of elements counted
            startElCounted = newAnswerChoices.length%columns.length ===0 ? newAnswerChoices.length/columns.length : Math.floor(newAnswerChoices.length/columns.length + 1)
            startElIdx = answerChoiceTestEl(start) ? parseInt(start.match(/[0-9]+/))*startElCounted + source.index : null
            endElIdx = answerChoiceTestEl(finish) ? parseInt(finish.match(/[0-9]+/))*startElCounted + destination.index : null
            newAnswerChoices.splice(answerChoiceTestEl(start) ? startElIdx : source.index, 1);
            newAnswerChoices.splice(answerChoiceTestEl(finish) ? endElIdx : destination.index, 0, draggableId);
            newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [answerChoiceTestEl(start)?"answerChoices": start]: newAnswerChoices
                }
            }
            setState(newState)
            return
        }
        //when list containers are different, we should 
        //be able to move elements into the new container, and remove them from old one
        startAnswersList = Array.from( answerChoiceTestEl(start) ? state.columns["answerChoices"] :state.columns[start])
        finishAnswersList = Array.from( answerChoiceTestEl(finish) ? state.columns["answerChoices"] : state.columns[finish])
        //roundup number of elements counted
        startElCounted = startAnswersList.length%columns.length ===0 ? startAnswersList.length/columns.length : Math.floor(startAnswersList.length/columns.length + 1)
        finishElCounted = finishAnswersList.length%columns.length ? finishAnswersList.length/columns.length : Math.floor(finishAnswersList.length/columns.length + 1)
        startElIdx = answerChoiceTestEl(start) ? parseInt(start.match(/[0-9]+/)) * startElCounted +  source.index : null
        endElIdx = answerChoiceTestEl(finish) ? parseInt(finish.match(/[0-9]+/)) * finishElCounted + destination.index : null
        startAnswersList.splice(answerChoiceTestEl(start) ? startElIdx : source.index, 1)
        finishAnswersList.splice(answerChoiceTestEl(finish) ? endElIdx : destination.index, 0, draggableId);
        newState = {
            ...state,
            columns:{
                ...state.columns,
                [answerChoiceTestEl(start) ?"answerChoices":start] : startAnswersList,
                [answerChoiceTestEl(finish) ?"answerChoices":finish] : finishAnswersList,
            }
        }
        setState(newState)
        return
    };
   
    return (
       <>
        <p className="instructions">Sort the following:</p>
        <DragDropContext onDragEnd={onDragEnd}>
            <div className ="draggableAreaContainer d-flex flex-column align-items-center">
                {/* Renders sort categories */}
                <div className={`d-flex ${!windowWidth ? "flex-column":""}`}>
                    {columns.map((content, index) =>{
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