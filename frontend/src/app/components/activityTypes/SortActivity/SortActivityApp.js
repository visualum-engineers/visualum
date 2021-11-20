import React, { useState, useEffect} from 'react'
//import DroppableArea from './DroppableArea'
import DroppableArea from '../DragAndDrop/DroppableArea';
import {DragDropContext} from 'react-beautiful-dnd';
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
//transform data to workable model
const transformData = (data, wordBankColumns) =>{
    let newData = {}
    //on mount (initial data loaded)
    newData["categories"] = {}
    newData["wordBank"] = {}
    newData["answerChoices"] = {}
    newData["allWordBankItems"] ={}
    if(!data.wordBank){
        for(let i of data.categories) newData["categories"][i.name] = []
        
        for(let i=0; i<wordBankColumns; i++){
            const elementsPresent = (data.answerChoices.length)%wordBankColumns === 0 ? (data.answerChoices.length)/wordBankColumns : Math.floor((data.answerChoices.length)/wordBankColumns+1)
            const startSlice = i * elementsPresent 
            const endSlice = (i+1) * elementsPresent
            newData.wordBank["answerChoices-" + i] = data.answerChoices.slice(startSlice, endSlice).map((answer) =>{
                return {id: answer.id, content: answer.content}
            })
        }
        //keep a record of all items in word bank. 
        // Needed to create 2 or 3 columns based on screen size
        for(let i of data.answerChoices){
            newData.allWordBankItems[i.id] = {id: i.id, content: i.content}
            newData.answerChoices[i.id] = {id: i.id, content: i.content}
        }
       
    }
    //when data was already transformed on mount 
    else {
        for(let i of Object.keys(data.categories)) newData["categories"][i] = [...data.categories[i]]
        
        for(let i=0; i<wordBankColumns; i++){
            const keys = Object.keys(data.allWordBankItems)
            const elementsPresent = (keys.length)%wordBankColumns === 0 ? (keys.length)/wordBankColumns : Math.floor((keys.length)/wordBankColumns+1)
            const startSlice = i * elementsPresent 
            const endSlice = (i+1) * elementsPresent
            newData["wordBank"]["answerChoices-" + i] = keys.slice(startSlice, endSlice).map((answer) =>{
                return data.answerChoices[answer]
            })
        }
        newData["allWordBankItems"] = {...data.allWordBankItems}
        newData["answerChoices"] = {...data.answerChoices}
    }
    return newData
}
const SortActivityApp = ({activityData, questionNum, activityID}) => {
    //for updating redux store(data to be sent to backend)
    const windowWidth = useWindowWidth()
    const columns = windowWidth ? Array(3).fill(0) : Array(1).fill(0)
    const [data, setData] = useState(transformData(activityData, columns.length))

    //grab data from local storage
    useEffect(() =>{
        const stored_response = localStorage.getItem(`${activityID}-sort_activity_client_answer-${questionNum}`)
        if(stored_response) setData(JSON.parse(stored_response))
    }, [questionNum, activityID])

    //handle width resizing
    useEffect(() => {
        setData((data) => transformData(data, columns.length))
    }, [windowWidth, columns.length])

    //roundup number of elements counted
    const numCategories = Object.keys(data.categories)
    const rows = Array(numCategories.length%columns.length === 0 ? numCategories.length/columns.length : Math.floor(numCategories.length/columns.length+1)).fill(0)
    const onDragStart = () =>{
        //to prevent smooth scroll behavior from interfering with react-beautiful auto scroll
        document.querySelector("html").classList.add("sortActivityActive")
    }
    //handle state update when object stops
    const onDragEnd = (result) => {
        //to re-enable smooth scrolling for the remainder of the pages
        document.querySelector("html").classList.remove("sortActivityActive")
        //setup
        const {destination, source, draggableId} = result
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index) return
        //start and end containers
        const answerChoiceTestEl = (el) => /answerChoices.*/.test(el)
        const start = source.droppableId;
        const startContainerType = answerChoiceTestEl(start) ? "wordBank" : "categories"
        const finish = destination.droppableId;
        const finishContainerType = answerChoiceTestEl(finish) ? "wordBank" : "categories"

        //setup
        const startAnswersList = Array.from(answerChoiceTestEl(start) ? data.wordBank[start] : data.categories[start])
        const finishAnswersList = Array.from(answerChoiceTestEl(finish) ? data.wordBank[finish] : data.categories[finish])
        const sameContainer = start===finish
        let newState
    
        startAnswersList.splice(source.index, 1)
        //list container are same - remove el from old idx, add to new idx
        if(sameContainer){
            startAnswersList.splice(destination.index, 0, data.answerChoices[draggableId]);
            newState = {
                ...data,
                [startContainerType]: {
                    ...data[startContainerType],
                    [start]: startAnswersList,
                }
            }
        } 
        //list containers are different - move elements into the new container, and remove them from old one
        else {
            finishAnswersList.splice(destination.index, 0, data.answerChoices[draggableId]);
            newState = startContainerType===finishContainerType ? {
                ...data,
                [startContainerType]:{
                    ...data[startContainerType],
                    [start] : startAnswersList,
                    [finish] : finishAnswersList,
                },
            }
            : {
                ...data,
                [startContainerType]:{
                    ...data[startContainerType],
                    [start] : startAnswersList,
                },
                [finishContainerType] : {
                    ...data[finishContainerType],
                    [finish] : finishAnswersList,
                }
            }
        } 
        //maintain wordbank across resize, so we update allWordBankItems
        if(startContainerType==="wordBank") delete newState.allWordBankItems[draggableId]
        if(finishContainerType==="wordBank") newState.allWordBankItems[draggableId] = data.answerChoices[draggableId]
        
        //update state
        setData(newState)
        localStorage.setItem(`${activityID}-sort_activity_client_answer-${questionNum}`, JSON.stringify(newState))
    };
    
    return (
    <>
        <p className="sort-activity-instructions">Sort the following:</p>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                {/* Renders sort categories */}
                {rows.map((content, index) =>{
                    const startSlice = index * columns.length
                    const endSlice = (index+1) * columns.length
                    return (
                        <div className="d-flex w-100 justify-content-center" key={index}> 
                            {numCategories.slice(startSlice, endSlice).map((columnTitle)=> {
                                let header = <p>{columnTitle}</p>
                                return (
                                    <DroppableArea
                                        key={columnTitle} 
                                        id={columnTitle}
                                        content = {data.categories[columnTitle]}
                                        droppableClassName = {`sort-activity-sort-droppables ${windowWidth ? "":"small-screen"}`}
                                        draggableClassName = {"sort-activity-answers-draggables"}
                                        innerDroppableClassName ={"sort-activity-inner-droppable d-flex flex-column align-items-center"}
                                        droppableHeader = {header}
                                        draggingOverClass = {"sort-activity-dragging-over"}
                                    />
                                )
                            })} 
                        </div>
                )})}
                {/* Renders word/response bank */}
                <div className="d-flex w-100 justify-content-center">
                    {Object.keys(data.wordBank).map((key) =>{
                        return (
                            <DroppableArea
                                key={key}
                                id = {key}
                                content = {data.wordBank[key]}
                                droppableClassName = {`sort-activity-itemBank-droppables ${windowWidth ? "":"small-screen"}`}
                                draggableClassName = {"sort-activity-answers-draggables"}
                                innerDroppableClassName ={"sort-activity-inner-droppable d-flex flex-column align-items-center"}
                                draggingOverClass = {"sort-activity-dragging-over"}
                                isDraggingClass = {"sort-activity-is-dragging"}
                            />
                        )
                    })}
                </div>
        </DragDropContext>
    </>
    )
}
export default SortActivityApp