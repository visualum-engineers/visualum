import React, { useState} from 'react'
import AnswerArea from './AnswerArea'
import SortArea from './SortArea'
import { DragDropContext} from 'react-beautiful-dnd';

//mock data of activity
const activityData = [
    {
        id: "q1",
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
            "answerChoices": ["1","2","3", "4", "5", "6", "7"],
        },
    },
]

const DragDropApp = () => {
    //render data on a per question basis
    let currQuestion = 0;
    let groups = activityData[currQuestion]
    //state
    const [states, setStates] = useState(groups)

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
            const newAnswerChoices = Array.from(states.columns[start])
            newAnswerChoices.splice(source.index, 1);
            newAnswerChoices.splice(destination.index, 0, draggableId);
            const newState = {
                ...states,
                columns: {
                    ...states.columns,
                    [start]: newAnswerChoices
                }
            }
            setStates(newState)
            return
        } 
        //when list containers are different, we should 
        //be able to move elements into the new container, and remove them from old one
        const startAnswersList = Array.from(states.columns[start])
        const finishAnswersList = Array.from(states.columns[finish])
        startAnswersList.splice(source.index, 1)
        finishAnswersList.splice(destination.index, 0, draggableId);
        const newState = {
            ...states,
            columns: {
                ...states.columns,
                [start] : startAnswersList,
                [finish] : finishAnswersList,
            }
        }
        setStates(newState)
    };
   
    return (
        <div className = "dragDropApp d-flex align-items-center justify-content-center flex-column">
            <p className="instructions">Sort the following:</p>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className ="draggableAreaContainer d-flex justify-content-center align-items-center">
                    <div className="sortAreaGroups">
                        {Object.keys(groups.columns).map((columnTitle, index)=> {
                            if(index === Object.keys(groups.columns).length-1) return
                            return <SortArea key={columnTitle} 
                                        id={columnTitle} 
                                        columnTitle={columnTitle} 
                                        answerData= {states.answerChoices} 
                                        currAnswers={states.columns[columnTitle]}/>
                        })}
                    </div>
                    <AnswerArea key={"answerChoices"} currAnswers={states.columns["answerChoices"]} answerData= {states.answerChoices}/>
                </div>  
            </DragDropContext>
        </div>
    )
}
export default DragDropApp

 //breaks out of function if draggable destintation 
        //does not exist, and item will snap back
        // if (!result.destination) return;
        // const items = Array.from(answerArea);
        // const [reorderedItem] = items.splice(result.source.index, 1);
        // items.splice(result.destination.index, 0, reorderedItem);
        // setAnswerArea(items);

    // const answerAreaGroup =  <div key ={sortingGroups.length} className = "d-flex justify-content-center flex-column">
    //          {answerAreaRows}
    //     </div>

    // sortingGroups.push(answerAreaGroup)

        // let sortingGroups = []