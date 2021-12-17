import React, {useState, useEffect, useRef} from 'react'
import Timer from '../../timer/Timer';
import {DragDropContext} from 'react-beautiful-dnd';
import useWindowWidth from '../../../hooks/use-window-width'
import {useDispatch, useSelector} from 'react-redux';
import {enableTap, enableDnD} from '../../../../redux/features/activityTypes/activitiesSlice'
import WordBank from '../DragAndDrop/ReactBeautifulDnD/WordBank';
import AnswerBank from './MatchActivityAnswerBank';
import DrapAndDropToggler from '../DragAndDrop/DrapAndDropToggler'
/*
To-dos
Backend: 
    1. Missing updating the backend with partial completion of assignment
    2. Missing updating the backend with grade after completion
*/
const transformData = (data, itemBankColumns) =>{
        let newData = {}
        //on mount (initial data loaded)
        newData["keyPairs"] = {}
        newData["itemBank"] = {}
        newData["answerChoices"] = {}
        newData["allItems"] = {}
        newData["categoryIDs"]= {}
        newData.timer = data.timer
        if(!data.itemBank){
            for(let i of data.keyPairs) {
                newData["keyPairs"][i.name] = []
                //generate key-pars sorting both category id, and i name.
                //This assumes both are unique! (which it should be)
                newData.categoryIDs[i.categoryID] = i.name
                newData.categoryIDs[i.name] = i.categoryID
            }
            
            for(let i=0; i<itemBankColumns; i++){
                const elementsPresent = (data.answerChoices.length)%itemBankColumns === 0 ? (data.answerChoices.length)/itemBankColumns : Math.floor((data.answerChoices.length)/itemBankColumns+1)
                const startSlice = i * elementsPresent 
                const endSlice = (i+1) * elementsPresent
                newData.itemBank["answerChoices-" + i] = data.answerChoices.slice(startSlice, endSlice).map((answer) =>{
                    return {id: answer.id, content: answer.content}
                })
            }
            //keep a record of all items in word bank. 
            // Needed to create 1 or 2 columns based on screen size
            for(let i of data.answerChoices){
                newData.allItems[i.id] = {id: i.id, content: i.content}
                newData.answerChoices[i.id] = {id: i.id, content: i.content}
            }
        }
        //when data was already transformed on mount 
        else {
            for(let i of Object.keys(data.keyPairs)) {
                newData["keyPairs"][i] = [...data.keyPairs[i]]
            }
                
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
            newData["categoryIDs"] = {...data.categoryIDs}
        }
        
        return newData
}

const MatchActivityApp = ({activityData, questionNum, activityID, moreInfoOnClick=null, moreInfoBtn, mediumWindowWidth}) => {
    const smallWindowWidth = useWindowWidth(576)
    //const mediumWindowWidth = useWindowWidth(992)
    const columns = mediumWindowWidth ? Array(1).fill(0) : Array(2).fill(0)
    const [data, setData] = useState(transformData(activityData, 2))
    const disableDnD = useSelector((state) => !state.activities.dndEnabled) 
    const dispatch = useDispatch()

    const [firstTapEl, setFirstTapEl] = useState(null)
    const removedEl = useRef(null)
    
    //if it exists, grab info from local storage on mount.
    useEffect(() => {
        //on mount check local storage for data
        let stored = localStorage.getItem(`${activityID}-match_activity_client_answer-${questionNum}`)
        if(!stored) return
        setData(JSON.parse(stored))
    }, [activityID, questionNum])
    //handle width resizing
    useEffect(() => {
        setData((data) => transformData(data, columns.length))
    }, [mediumWindowWidth, columns.length])
    
    //when dragging starts
    const onDragStart = (result) =>{
        //to prevent smooth scroll behavior from interfering with react-beautiful auto scroll
        document.querySelector("html").classList.add("sortActivityActive")
    }
    //while dragging
    const onDragUpdate = (result) =>{
        const {destination, source} = result
        //when dragging outside droppable container
        if(!destination) {
            // dont do anything if nothing is stored
            if(!removedEl.current || !removedEl.current[0]) return
            //unhide removed element, since there can only be 1 item in keyPairs at a time
            document.getElementById("dragItem"+removedEl.current[0].id).classList.remove("hide-draggable")
            removedEl.current = null
            return
        }
        //when dragging inside same container
        if(destination.droppableId === source.droppableId) {
            if(!removedEl.current || !removedEl.current[0]) return
            document.getElementById("dragItem"+removedEl.current[0].id).classList.remove("hide-draggable")
            return
        }
        //when dragging between word bank
        const answerChoiceTestEl = (el) => /answerChoices.*/.test(el)
        //if dragging to another word bank container
        if(answerChoiceTestEl(destination.droppableId)) {
            if(!removedEl.current || !removedEl.current[0]) return
            document.getElementById("dragItem"+removedEl.current[0].id).classList.remove("hide-draggable")
            return
        }
        
        //when dragging into a keypair container
        const droppableName = data.categoryIDs[destination.droppableId]
        const droppableList = [...data.keyPairs[droppableName]]
        //restore visibility of old current value
        if(removedEl.current && removedEl.current[0]){
            document.getElementById("dragItem"+removedEl.current[0].id).classList.remove("hide-draggable")
        }
        //store name of keyPair, and value popped
        removedEl.current = [droppableList.pop(), droppableName]
        //add a class to hide current draggable in list.
        if(!removedEl.current[0]) return 
        document.getElementById("dragItem"+removedEl.current[0].id).classList.add("hide-draggable")
    }
    //when dragging stops
    const onDragEnd = (result) =>{
        //to re-enable smooth scrolling for the remainder of the pages
        document.querySelector("html").classList.remove("sortActivityActive")
        //setup
        const {destination, source, draggableId} = result
        //means that nothing has changed
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index) return
        //start and end containers
        const answerChoiceTestEl = (el) => /answerChoices.*/.test(el)
        const start = answerChoiceTestEl(source.droppableId) ? source.droppableId : data.categoryIDs[source.droppableId]
        const finish = answerChoiceTestEl(destination.droppableId) ? destination.droppableId : data.categoryIDs[destination.droppableId]

        const startContainerType = answerChoiceTestEl(start) ? "itemBank" : "keyPairs"
        const finishContainerType = answerChoiceTestEl(finish) ? "itemBank" : "keyPairs"
        //setup
        const startAnswersList = Array.from(answerChoiceTestEl(start) ? data.itemBank[start] : data.keyPairs[start])
        const finishAnswersList = Array.from(answerChoiceTestEl(finish) ? data.itemBank[finish] : data.keyPairs[finish])
        const sameContainer = start===finish
        let newState
        //will be used to detect whether an item was added back to word bank, after moving to 
        //key pair container
        let addedToWordBank
        startAnswersList.splice(source.index, 1)
        
        //list container are same 
        //remove el from old index, add to new index
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
            //end container is a key pairs container
            if(finishContainerType === "keyPairs"){
                //remove previous answer in container, and add it to start container
                if(finishAnswersList.length!==0) {
                    const prevElement = finishAnswersList.splice(destination.index-1, 1)
                    startAnswersList.splice(source.index, 0, prevElement[0])
                    if(startContainerType === "itemBank") addedToWordBank = prevElement[0]
                }
                finishAnswersList.push(data.answerChoices[draggableId]);
            
            } else finishAnswersList.splice(destination.index, 0, data.answerChoices[draggableId]);
            
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
        
        //maintain itembank across resize, if we have to generate multiple columns
        if(addedToWordBank) newState.allItems[addedToWordBank.id] = addedToWordBank
        if(startContainerType==="itemBank") delete newState.allItems[draggableId]
        if(finishContainerType==="itemBank") newState.allItems[draggableId] = data.answerChoices[draggableId]
        
        //update state
        setData(newState)
        localStorage.setItem(`${activityID}-match_activity_client_answer-${questionNum}`, JSON.stringify(newState))
    }
    const onTap = (e) =>{
        //means a selection hasnt happened so skip for keyboard
        if(e.type === "keydown" && e.key !=="Enter") return
        //update the first element
        let droppableSelected = null
        let currListItem = e.target.closest(".match-activity-draggables")
        if(!currListItem) {
            droppableSelected = true
            currListItem = e.target.closest(".match-activity-inner-droppable")
        }
        //used when two list items are clicked, and not an empty droppable
        const droppableId = currListItem.dataset.tapDroppableId
        const draggableIndex = currListItem.dataset.index
        const firstDraggableId = currListItem.dataset.tapDraggableId
        
        if(!firstTapEl) {
            setFirstTapEl({
                droppableId: droppableId,
                draggableId: firstDraggableId,
                draggableIndex: draggableIndex
            })
            currListItem.classList.add("match-activity-dragging")
            return
        }
        //update the second element, and perform tap logic
        document.getElementById("dragItem"+firstTapEl.draggableId).classList.remove("match-activity-dragging")
        const draggableId = firstTapEl.draggableId
        const source = {
            droppableId: firstTapEl.droppableId,
            index: firstTapEl.draggableIndex
        }
        const destination = {
            droppableId: droppableId,
            index: droppableSelected ? 0 : draggableIndex,
        }
        const result={
            source: source,
            destination: destination,
            draggableId: draggableId
        }
        
        onDragEnd(result)
        setFirstTapEl(null)
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
  
    return(
        <>
        <div className={`d-flex match-activity-header justify-content-${smallWindowWidth?"center": "start"}`}>
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
        <div className={`match-activity-container ${mediumWindowWidth ? "three-columns":""}`}>
        <DragDropContext 
            onDragEnd = {!disableDnD ? onDragEnd: null} 
            onDragUpdate={!disableDnD ? onDragUpdate: null} 
            onDragStart={!disableDnD ? onDragStart: null}
        >
            <div className="d-flex justify-content-center w-100">
                <AnswerBank 
                    data={data}
                    firstTapEl= {firstTapEl}
                    mediumWindowWidth = {mediumWindowWidth}
                    moreInfoOnClick = {moreInfoOnClick}
                    disableDnD = {disableDnD}
                    onTap = {onTap}
                    moreInfoBtn = {moreInfoBtn}
                />
                {mediumWindowWidth ? <WordBank 
                                       data={data}
                                       firstTapEl= {firstTapEl}
                                       disableDnD = {disableDnD}
                                       onTap = {disableDnD? onTap: null}
                                       overallContainerClass = {"match-activity-itemBank d-flex align-items-center flex-column three-columns"}
                                       columnContainerClass = {"match-activity-itemBank-column-container w-100 flex-grow-1"}
                                       columnTitleClass = {"match-activity-column-titles answer-choices"}
                                       columnClass = {"match-activity-itemBank-column"}
                                       droppableClassName = {`match-activity-itemBank-droppables d-flex flex-column w-100`}
                                       draggableClassName = {"match-activity-draggables d-flex align-items-center justify-content-center"}
                                       innerDroppableClassName = {`${disableDnD && firstTapEl? "match-activity-tap-active": ""} match-activity-inner-droppable w-100 d-flex flex-column align-items-center`}
                                       draggingOverClass={"match-activity-draggable-over"}
                                       isDraggingClass = {"match-activity-dragging"}
                                    />
                : null}
            </div>
            {!mediumWindowWidth ?
                <div className="d-flex justify-content-center w-100">
                        <WordBank 
                            data={data}
                            firstTapEl= {firstTapEl}
                            onTap = {disableDnD? onTap: null}
                            overallContainerClass = {"match-activity-itemBank d-flex flex-column align-items-center w-100"}
                            columnContainerClass = {"match-activity-itemBank-column-container w-100 flex-grow-1"}
                            columnClass = {"match-activity-itemBank-column"}
                            columnTitleClass = {"match-activity-column-titles vertical"}
                            droppableClassName = {`match-activity-itemBank-droppables d-flex flex-column w-100`}
                            draggableClassName = {"match-activity-draggables d-flex align-items-center justify-content-center"}
                            innerDroppableClassName = {`${disableDnD && firstTapEl? "match-activity-tap-active": ""} match-activity-inner-droppable w-100 d-flex flex-column align-items-center`}
                            draggingOverClass={"match-activity-draggable-over"}
                            isDraggingClass = {"match-activity-dragging"}
                        />
                </div>
            : null}
        </DragDropContext>
        </div>
     </>
    )
}
export default MatchActivityApp
