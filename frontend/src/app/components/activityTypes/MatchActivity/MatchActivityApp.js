import {useState, useEffect} from 'react'
import {DragDropContext} from 'react-beautiful-dnd';
import {useDispatch, useSelector} from 'react-redux';
import {resetPopUpOff, enableTap, enableDnD} from '../../../../redux/features/activityTypes/activitiesSlice'
import WordBank from '../../utilities/dragAndDrop/ReactBeautifulDnD/WordBank';
import AnswerBank from './MatchActivityAnswerBank';
import ActivityHeader from '../ActivityHeader';
import transformData from './matchTransformData';
import getResultOnTap from '../../utilities/dragAndDrop/DnDUpdateAlgo.js/Sortables/getResultOnTap';
/*
To-dos
Backend: 
    1. Missing updating the backend with partial completion of assignment
    2. Missing updating the backend with grade after completion
*/

const MatchActivityApp = ({
    activityData, 
    questionNum, 
    activityID, 
    moreInfoOnClick,
    resetBtnOnClick, 
    moreInfoBtn, 
    mediumWindowWidth,
    smallWindowWidth
}) => {
    const columns = mediumWindowWidth ? Array(1).fill(0) : Array(2).fill(0)
    const [data, setData] = useState(transformData(activityData, 2))
    const [firstElTap, setFirstElTap] = useState(null)
    const [removedEl, setRemovedEl] = useState(undefined)
    //redux states
    const dispatch = useDispatch()
    const disableDnD = useSelector((state) => !state.activities.dndEnabled) 
    const resetPopUp = useSelector((state) => state.activities.resetPopUp) 

    //if it exists, grab info from local storage on mount.
    useEffect(() => {
        //on mount check local storage for data
        let stored = localStorage.getItem(`${activityID}-match_activity_client_answer-${questionNum}`)
        if(!stored) return
        setData(JSON.parse(stored))
    }, [activityID, questionNum])

    useEffect(() =>{
        if(resetPopUp && resetPopUp.confirmed){
            //reset all state values to default
            setData(transformData(activityData, columns.length))
            setFirstElTap(null)
            dispatch(resetPopUpOff())
            //remove any saved data from local storage
            localStorage.removeItem(`${activityID}-match_activity_client_answer-${questionNum}`)        
        }
    }, [dispatch, resetPopUp, activityData, columns.length, activityID, questionNum])

    //handle width resizing
    useEffect(() => {
        setData((data) => transformData(data, columns.length))
    }, [mediumWindowWidth, columns.length])

    //used because we need to keep only one answer in a key container at a time.
    const customUpdateLists = (result) =>{
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
        return newState
    }
    
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
            if(!removedEl || !removedEl[0]) return
            return setRemovedEl(undefined)
        }
        //when dragging inside same container
        if(destination.droppableId === source.droppableId) return
        //when dragging between word bank
        const answerChoiceTestEl = (el) => /answerChoices.*/.test(el)
        //if dragging to another word bank container
        if(answerChoiceTestEl(destination.droppableId)) return

        //when dragging into a keypair container
        const droppableName = data.categoryIDs[destination.droppableId]
        const droppableList = [...data.keyPairs[droppableName]]

        //store name of keyPair, and value popped
        setRemovedEl([droppableList[0], droppableName])
    }
    
    //when dragging stops
    const onDragEnd = (result) =>{
        setRemovedEl(undefined)
        //to re-enable smooth scrolling for the remainder of the pages
        document.querySelector("html").classList.remove("sortActivityActive")
        const newState = customUpdateLists(result)
        if(!newState) return
        //update state
        setData(newState)
        localStorage.setItem(`${activityID}-match_activity_client_answer-${questionNum}`, JSON.stringify(newState))
    }
    const onTap = (e) =>{
        const parm = {
            e: e, 
            firstElTap: firstElTap, 
            setFirstElTap: setFirstElTap, 
            listItemDraggableClass: "match-activity-draggables",
            listItemInnerDroppableClass: "match-activity-inner-droppable",
        }
        const result = getResultOnTap(parm)
        if(!result) return
        onDragEnd(result)
        setFirstElTap(null)
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
            if(firstElTap) firstElTap.node.classList.remove("match-activity-dragging")
            setRemovedEl(undefined)
            setFirstElTap(null)
        }
    }
  
    return(
        <>
        <ActivityHeader 
            mediumWindowWidth={mediumWindowWidth}
            smallWindowWidth = {smallWindowWidth}
            data ={data}
            resetBtnOnClick ={resetBtnOnClick} 
            questionNum={questionNum}
            disableDnD ={disableDnD}
            toggleTap = {toggleTap}
            type="DnD"
        />
        <div className={`match-activity-container${mediumWindowWidth ? " full-size":""}`}>
        <DragDropContext 
            onDragEnd = {!disableDnD ? onDragEnd: null} 
            onDragUpdate={!disableDnD ? onDragUpdate: null} 
            onDragStart={!disableDnD ? onDragStart: null}
        >
            <div className="d-flex justify-content-center w-100">
                <AnswerBank 
                    data={data}
                    firstElTap= {firstElTap}
                    mediumWindowWidth = {mediumWindowWidth}
                    moreInfoOnClick = {moreInfoOnClick}
                    disableDnD = {disableDnD}
                    onTap = {onTap}
                    moreInfoBtn = {moreInfoBtn}
                    removedEl = {removedEl}
                />
                {mediumWindowWidth ? <WordBank 
                                       data={data}
                                       firstElTap= {firstElTap}
                                       disableDnD = {disableDnD}
                                       onTap = {disableDnD? onTap: null}
                                       overallContainerClass = {"match-activity-itemBank d-flex align-items-center flex-column full-size"}
                                       columnContainerClass = {"match-activity-itemBank-column-container w-100 flex-grow-1 d-flex flex-column"}
                                       columnTitleClass = {"match-activity-column-titles answer-choices"}
                                       columnClass = {"match-activity-itemBank-column"}
                                       droppableClassName = {`match-activity-itemBank-droppables d-flex flex-column w-100`}
                                       draggableClassName = {"match-activity-draggables d-flex align-items-center justify-content-center"}
                                       innerDroppableClassName = {`${disableDnD && firstElTap? "match-activity-tap-active ": ""}match-activity-inner-droppable w-100 d-flex flex-column align-items-center`}
                                       draggingOverClass={"match-activity-draggable-over"}
                                       isDraggingClass = {"match-activity-dragging"}
                                    />
                : null}
            </div>
            {!mediumWindowWidth ?
                <div className="d-flex justify-content-center w-100">
                        <WordBank 
                            data={data}
                            firstElTap= {firstElTap}
                            onTap = {disableDnD? onTap: null}
                            overallContainerClass = {"match-activity-itemBank d-flex flex-column align-items-center w-100"}
                            columnContainerClass = {"match-activity-itemBank-column-container w-100 flex-grow-1"}
                            columnClass = {"match-activity-itemBank-column"}
                            columnTitleClass = {"match-activity-column-titles vertical"}
                            droppableClassName = {`match-activity-itemBank-droppables d-flex flex-column w-100`}
                            draggableClassName = {"match-activity-draggables d-flex align-items-center justify-content-center"}
                            innerDroppableClassName = {`${disableDnD && firstElTap? "match-activity-tap-active ": ""}match-activity-inner-droppable w-100 d-flex flex-column align-items-center`}
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
