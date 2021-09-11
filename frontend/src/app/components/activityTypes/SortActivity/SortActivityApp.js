import React, { useState} from 'react'
import AnswerArea from './AnswerArea'
import SortArea from './SortArea'
import ActivityBtns from '../NavActivityBtn/ActivityBtns';
import { DragDropContext} from 'react-beautiful-dnd';
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

const SortActivityApp = ({last, prev, onNavBtnClick,activityData}) => {
    
    //render data on a per question basis
   
    // let groups = activityData
    //state
    const [state, setState] = useState(activityData)
    const prevQuestion = prev
    const lastQuestion = last
    //handle state update when object is moved
    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index) return
        const start = source.droppableId;
        const finish = destination.droppableId;

        //dictates behavior when droppable container is the same from end to start
        //therefore, will handle reording of elements on list
        if(start===finish){
            const newAnswerChoices = Array.from(state.columns[start])
            newAnswerChoices.splice(source.index, 1);
            newAnswerChoices.splice(destination.index, 0, draggableId);
            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [start]:newAnswerChoices
                }
            }
            setState(newState)
            return
        } 

        //when list containers are different, we should 
        //be able to move elements into the new container, and remove them from old one
        const startAnswersList = Array.from(state.columns[start])
        const finishAnswersList = Array.from(state.columns[finish])
        startAnswersList.splice(source.index, 1)
        finishAnswersList.splice(destination.index, 0, draggableId);
        const newState = {
            ...state,
            columns:{
                ...state.columns,
                [start] : startAnswersList,
                [finish] : finishAnswersList,
            }
        }
        setState(newState)
    };
   
    return (
        <div className="d-flex justify-content-center">
            <div className = "sortActivityApp d-flex flex-column align-items-center col-9 col-md-7 col-xl-6">
                <p className="instructions">Sort the following:</p>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className ="draggableAreaContainer d-flex justify-content-center align-items-start">
                        {/* Renders sort categories */}
                        <div className="sortAreaGroups d-flex flex-wrap">
                            {Object.keys(state.columns).map((columnTitle, index)=> {
                                if(index === Object.keys(state.columns).length-1) return null
                                return <SortArea key={columnTitle} 
                                            id={columnTitle} 
                                            columnTitle={columnTitle} 
                                            answerData= {state.answerChoices} 
                                            currAnswers={state.columns[columnTitle]}/>
                            })}
                        </div>
                        
                        {/* Renders word/response bank */}
                        <AnswerArea key={"answerChoices"} 
                            currAnswers={state.columns["answerChoices"]} 
                            answerData= {state.answerChoices}/>
                    </div>  
                </DragDropContext>
                <div className="sortNavBtns w-100">
                    <ActivityBtns 
                        prevQuestion = {prevQuestion} 
                        lastQuestion = {lastQuestion}
                        onNavBtnClick = {onNavBtnClick}
                        />
                </div>
            </div>
        </div>
    )
}
export default SortActivityApp