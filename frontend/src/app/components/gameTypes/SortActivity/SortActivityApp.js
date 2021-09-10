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

//mock data of activity
const activityData = {
    1: {
        answerChoices: {
            "1": {id: "1", choice:"Okay"}, 
            "2": {id: "2", choice:"Good"},
            "3": {id: "3", choice:"Nice" },
            "4": {id: "4", choice:"Duh" },
            "5": {id: "5", choice:"Bruh"},
            "6": {id: "6", choice:"Yuh" },
            "7": {id: "7", choice:"Fuh" },
        },
        columns: {
            "Good": [],
            "Medium":[],
            "Bad":[],
            "answerChoices": ["1","2","3","4", "5", "6", "7"],
        },
    },
}

const SortActivityApp = ({last=false, onClick}) => {
    
    //render data on a per question basis
   
    // let groups = activityData[currQuestion]
    //state
    const [state, setState] = useState(activityData)
    const prevQuestion = Object.keys(activityData)[0] === "1" ? false : true
    const lastQuestion = last
    const currQuestion = Object.keys(state)[0];
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
            const newAnswerChoices = Array.from(state[currQuestion].columns[start])
            newAnswerChoices.splice(source.index, 1);
            newAnswerChoices.splice(destination.index, 0, draggableId);
            const newState = {
                [currQuestion]: {
                    ...state[currQuestion],
                    columns: {
                        ...state[currQuestion].columns,
                        [start]:newAnswerChoices
                    }
                }
            }
            setState(newState)
            return
        } 

        //when list containers are different, we should 
        //be able to move elements into the new container, and remove them from old one
        const startAnswersList = Array.from(state[currQuestion].columns[start])
        const finishAnswersList = Array.from(state[currQuestion].columns[finish])
        startAnswersList.splice(source.index, 1)
        finishAnswersList.splice(destination.index, 0, draggableId);
        const newState = {
            [currQuestion]:{
                ...state[currQuestion],
                columns:{
                    ...state[currQuestion].columns,
                    [start] : startAnswersList,
                    [finish] : finishAnswersList,
                }
            }
        }
        setState(newState)
    };
   
    return (
        <div className = "sortActivityApp d-flex align-items-center flex-column">
            <p className="instructions">Sort the following:</p>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className ="draggableAreaContainer d-flex justify-content-center align-items-start">

                    {/* Renders sort categories */}
                    <div className="sortAreaGroups d-flex flex-wrap">
                        {Object.keys(state[currQuestion].columns).map((columnTitle, index)=> {
                            if(index === Object.keys(state[currQuestion].columns).length-1) return null
                            return <SortArea key={columnTitle} 
                                        id={columnTitle} 
                                        columnTitle={columnTitle} 
                                        answerData= {state[currQuestion].answerChoices} 
                                        currAnswers={state[currQuestion].columns[columnTitle]}/>
                        })}
                    </div>
                    
                    {/* Renders word/response bank */}
                    <AnswerArea key={"answerChoices"} 
                        currAnswers={state[currQuestion].columns["answerChoices"]} 
                        answerData= {state[currQuestion].answerChoices}/>
                </div>  
            </DragDropContext>
            <div className="sortNavBtns">
                <ActivityBtns 
                    prevQuestion = {prevQuestion} 
                    lastQuestion = {lastQuestion}
                    onClick = {onClick}
                    />
            </div>
        </div>
    )
}
export default SortActivityApp