import React, { useState, useEffect, useRef} from 'react'
import {DragDropContext} from 'react-beautiful-dnd';
import {useDispatch, useSelector} from 'react-redux';
import {enableTap, enableDnD} from '../../../../redux/features/activityTypes/activitiesSlice'
import useWindowWidth from '../../../hooks/use-window-width';
import WordBank from '../DragAndDrop/WordBank';
import DrapAndDropToggler from '../DragAndDrop/DrapAndDropToggler'
import Timer from '../../timer/Timer';
import SortActivityCategories from './SortActivityCategories';

/*Note Missing To-do
Backend: 
    1. Missing updating the backend with partial completion of assignment
    2. Missing updating the backend with grade after completion

Frontend: 
    2. Missing answer validation (check if their sorting is correct)
    3. Missing re-rendering logic, when user answers question and moves on to the next one.
    4. Missing progress saved on local storage/memory (if user exits out of page)
*/

//transform data to workable model
const transformData = (data, itemBankColumns) =>{
    let newData = {}
    //on mount (initial data loaded)
    newData["categories"] = {}
    newData["itemBank"] = {}
    newData["answerChoices"] = {}
    newData["allItems"] ={}
    if(!data.itemBank){
        for(let i of data.categories) newData["categories"][i.name] = []
        
        for(let i=0; i<itemBankColumns; i++){
            const elementsPresent = (data.answerChoices.length)%itemBankColumns === 0 ? (data.answerChoices.length)/itemBankColumns : Math.floor((data.answerChoices.length)/itemBankColumns+1)
            const startSlice = i * elementsPresent 
            const endSlice = (i+1) * elementsPresent
            newData.itemBank["answerChoices-" + i] = data.answerChoices.slice(startSlice, endSlice).map((answer) =>{
                return {id: answer.id, content: answer.content}
            })
        }
        //keep a record of all items in word bank. 
        // Needed to create 2 or 3 columns based on screen size
        for(let i of data.answerChoices){
            newData.allItems[i.id] = {id: i.id, content: i.content}
            newData.answerChoices[i.id] = {id: i.id, content: i.content}
        }
       
    }
    //when data was already transformed on mount 
    else {
        for(let i of Object.keys(data.categories)) newData["categories"][i] = [...data.categories[i]]
        
        for(let i=0; i<itemBankColumns; i++){
            const keys = Object.keys(data.allItems)
            const elementsPresent = (keys.length)%itemBankColumns === 0 ? (keys.length)/itemBankColumns : Math.floor((keys.length)/itemBankColumns+1)
            const startSlice = i * elementsPresent 
            const endSlice = (i+1) * elementsPresent
            newData["itemBank"]["answerChoices-" + i] = keys.slice(startSlice, endSlice).map((answer) =>{
                return data.answerChoices[answer]
            })
        }
        newData["allItems"] = {...data.allItems}
        newData["answerChoices"] = {...data.answerChoices}
    }
    return newData
}
const SortActivityApp = ({activityData, questionNum, activityID, moreInfoOnClick=null, moreInfoBtn, mediumWindowWidth}) => {
    //for updating redux store(data to be sent to backend)
    const smallWindowWidth = useWindowWidth(576)
    const wordBankColumns = mediumWindowWidth ? Array(1).fill(0) : Array(2).fill(0) 
    //const questionColumns = mediumWindowWidth ? Array(2).fill(0) : Array(1).fill(0) 
    // const [prevSlideNum, setPrevSlideNum] = useState(0)
    // const [slideNum, setSlideNum] = useState(1)
    const [data, setData] = useState(transformData(activityData, wordBankColumns.length))
    const disableDnD = useSelector((state) => !state.activities.dndEnabled) 
    const dispatch = useDispatch()

    //used for tap and drop
    const [firstTapEl, setFirstTapEl] = useState(null)
    const removedEl = useRef(null)
    //grab data from local storage
    useEffect(() =>{
        const stored_response = localStorage.getItem(`${activityID}-sort_activity_client_answer-${questionNum}`)
        if(stored_response) setData(JSON.parse(stored_response))
    }, [questionNum, activityID])

    //handle width resizing
    useEffect(() => {
        setData((data) => transformData(data, wordBankColumns.length))
    }, [mediumWindowWidth, wordBankColumns.length])

    //roundup number of elements counted
    const numCategories = Object.keys(data.categories)
    //const categorySlides = Array(Math.ceil(numCategories.length/3)).fill(0)
    
    const onDragStart = () =>{
        //to prevent smooth scroll behavior from interfering with react-beautiful auto scroll
        document.querySelector("html").classList.add("sortActivityActive")
    }
    const onTap = (e) =>{
        // //means a selection hasnt happened so skip for keyboard
        // if(e.type === "keydown" && e.key !=="Enter") return
        // //update the first element
        // let droppableSelected = null
        // let currListItem = e.target.closest(".match-activity-draggables")
        // if(!currListItem) {
        //     droppableSelected = true
        //     currListItem = e.target.closest(".match-activity-inner-droppable")
        // }
        // //used when two list items are clicked, and not an empty droppable
        // const droppableId = currListItem.dataset.tapDroppableId
        // const draggableIndex = currListItem.dataset.index
        // const firstDraggableId = currListItem.dataset.tapDraggableId
        
        // if(!firstTapEl) {
        //     setFirstTapEl({
        //         droppableId: droppableId,
        //         draggableId: firstDraggableId,
        //         draggableIndex: draggableIndex
        //     })
        //     currListItem.classList.add("match-activity-dragging")
        //     return
        // }
        // //update the second element, and perform tap logic
        // document.getElementById("dragItem"+firstTapEl.draggableId).classList.remove("match-activity-dragging")
        // const draggableId = firstTapEl.draggableId
        // const source = {
        //     droppableId: firstTapEl.droppableId,
        //     index: firstTapEl.draggableIndex
        // }
        // const destination = {
        //     droppableId: droppableId,
        //     index: droppableSelected ? 0 : draggableIndex,
        // }
        // const result={
        //     source: source,
        //     destination: destination,
        //     draggableId: draggableId
        // }
        
        // onDragEnd(result)
        // setFirstTapEl(null)
    }
      //toggle dnd and tap mode based on btn
      const toggleTap = (e) => {
        if (e.type ==="click" || (e.type ==="keydown" && e.key === "Enter")) {
            //setDisableDnD(state => !state)
            //update redux store so instructions can dynamically change
            if (disableDnD) {
                dispatch(enableDnD())
            }
            else dispatch(enableTap())
            moreInfoOnClick()
            //if we're changing the mode, we need to reset this
            // as its only viable for tap mode
            if(firstTapEl) document.getElementById("dragItem"+firstTapEl.draggableId).classList.remove("match-activity-dragging")
            removedEl.current = null
            setFirstTapEl(null)
        }
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
        const startContainerType = answerChoiceTestEl(start) ? "itemBank" : "categories"
        const finish = destination.droppableId;
        const finishContainerType = answerChoiceTestEl(finish) ? "itemBank" : "categories"

        //setup
        const startAnswersList = Array.from(answerChoiceTestEl(start) ? data.itemBank[start] : data.categories[start])
        const finishAnswersList = Array.from(answerChoiceTestEl(finish) ? data.itemBank[finish] : data.categories[finish])
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
        //maintain itemBank across resize, so we update allItems
        if(startContainerType==="itemBank") delete newState.allItems[draggableId]
        if(finishContainerType==="itemBank") newState.allItems[draggableId] = data.answerChoices[draggableId]
        
        //update state
        setData(newState)
        localStorage.setItem(`${activityID}-sort_activity_client_answer-${questionNum}`, JSON.stringify(newState))
    };
    // const slideNavOnClick = (e) =>{
    //     setPrevSlideNum(slideNum)
    //     if(e.target.closest("button").dataset.actionType === "move-left") setSlideNum((state) => state - 1)
    //     if(e.target.closest("button").dataset.actionType === "move-right") setSlideNum((state) => state + 1)
    
    // }

    return (
    <>  
        <div className={`sort-activity-header d-flex justify-content-${smallWindowWidth?"center": "start"}`}>
            {data.timer &&
                <div className={`activity-timer d-flex justify-content-center align-items-center`}>
                    <span>TIME:</span>
                    <Timer
                        timer={data.timer}
                        autoStart={false}
                    />
                </div>
            }
            <DrapAndDropToggler
                disableDnD = {disableDnD}
                toggleTap = {toggleTap} 
            />
        </div>
        <div className={`sort-activity-container d-flex ${mediumWindowWidth ? "full-size":"flex-column align-items-center"}`}>
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                {mediumWindowWidth && <WordBank 
                    data ={data}
                    firstTapEl = {firstTapEl}
                    isDraggingClass = {"sort-activity-is-dragging"}
                    onTap = {disableDnD ? onTap : null}
                    overallContainerClass = {`sort-activity-itemBank ${mediumWindowWidth ? "full-size":"w-100"}`} 
                    columnContainerClass = "sort-activity-column-container w-100"
                    columnTitleClass = "sort-activity-column-titles"
                    columnClass = "sort-activity-itemBank-column"
                    droppableClassName ={`sort-activity-itemBank-droppables w-100 ${!mediumWindowWidth?"small-screen": ""}`}
                    innerDroppableClassName = {"sort-activity-inner-droppable d-flex flex-column align-items-center w-100"}
                    draggingOverClass = {"sort-activity-dragging-over"}
                    draggableClassName = {"sort-activity-draggables d-flex align-items-center justify-content-center "}
                />}
                    {/* Renders sort categories */}
                    
                    <SortActivityCategories 
                        numCategories = {numCategories}
                        data={data}
                        mediumWindowWidth = {mediumWindowWidth}
                    />
                    
                    {/* Renders word/response bank */}
                {!mediumWindowWidth && <WordBank 
                    data ={data}
                    firstTapEl = {firstTapEl}
                    isDraggingClass = {"sort-activity-is-dragging"}
                    onTap = {disableDnD ? onTap : null}
                    overallContainerClass = {`sort-activity-itemBank ${mediumWindowWidth ? "full-size":"w-100"}`} 
                    columnContainerClass = "sort-activity-column-container w-100"
                    columnTitleClass = "sort-activity-column-titles"
                    columnClass = "sort-activity-itemBank-column"
                    droppableClassName ={`sort-activity-itemBank-droppables ${!mediumWindowWidth?"small-screen w-100": ""}`}
                    innerDroppableClassName = {"sort-activity-inner-droppable d-flex flex-column align-items-center w-100"}
                    draggingOverClass = {"sort-activity-dragging-over"}
                    draggableClassName = {"sort-activity-draggables d-flex align-items-center justify-content-center"}
                />}
            </DragDropContext>
        </div>
    </>
    )
}
export default SortActivityApp