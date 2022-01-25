import {useState, useEffect, useRef} from 'react'
import { unstable_batchedUpdates } from 'react-dom';
import {DragDropContext} from 'react-beautiful-dnd';
import WordBank from '../../utilities/dragAndDrop/ReactBeautifulDnD/WordBank';
import AnswerBank from './MatchActivityAnswerBank';
import transformData from './matchTransformData';
import getResultOnTap from '../../utilities/dragAndDrop/DnDUpdateAlgo.js/Sortables/getResultOnTap';
import {useDispatch, useSelector} from 'react-redux';
import {updateActivityData, updateActivityDataLayout} from "../../../../redux/features/activityTypes/activitiesData"
import { resetHistory } from '../activityHistoryFunc';
import {cloneDeep} from 'lodash'
/*
To-dos
Backend: 
    1. Missing updating the backend with partial completion of assignment
    2. Missing updating the backend with grade after completion
*/

const MatchActivityApp = ({
    originalQuestionData,
    questionNum, 
    moreInfoOnClick,
    moreInfoBtn, 
    mediumWindowWidth
}) => {
    const columns = mediumWindowWidth ? Array(1).fill(0) : Array(2).fill(0)
    const [firstElTap, setFirstElTap] = useState(null)
    const [removedEl, setRemovedEl] = useState(undefined)
    
    //redux states
    const dispatch = useDispatch()
    const data = useSelector(state => state.activities.data.clientData.present.clientAnswerData.questions[questionNum])
    const disableDnD = useSelector((state) => state.activities.settings.dndEnabled) 
    const resetPopUp = useSelector((state) => state.activities.settings.resetPopUp) 

    //to manage data side effect 
    //and prevent infinite loop
    const onMount = useRef(false)
    const windowValue = useRef(mediumWindowWidth)
    //handle width resizing
    useEffect(() => {
        if(windowValue.current !== mediumWindowWidth || !onMount.current){
            if(!onMount.current) onMount.current = true
            dispatch(
                updateActivityDataLayout({
                    type: "singleQuestionUpdate",
                    questionNum: questionNum,
                    data: transformData(data, columns.length)
            }))
            windowValue.current = mediumWindowWidth
        }
        //on undo if item was moved when at a different width, 
        // fix layout  
        if(mediumWindowWidth && data.itemBank){
            if(Object.keys(data.itemBank).length > 1) dispatch(
                updateActivityDataLayout({
                    questionNum: questionNum,
                    data: transformData(data, columns.length)
            }))
        }     
    }, [dispatch, mediumWindowWidth, columns.length, questionNum, data])

    //reset all state values to default
    useEffect(() =>{
        if(resetPopUp && resetPopUp.confirmed){
            unstable_batchedUpdates(()=>{
                setFirstElTap(null)
                resetHistory({
                    dispatch: dispatch,
                    questionNum: questionNum,
                    newState: transformData(originalQuestionData, columns.length)
                })
            })
        }
    }, [dispatch, resetPopUp, originalQuestionData, columns.length, questionNum])
    
    useEffect(() => {
        //if we're changing the mode, we need to reset this
        if(disableDnD){
            if(firstElTap) firstElTap.node.classList.remove("sort-activity-dragging")
            setRemovedEl(undefined)
            setFirstElTap(null)
        }
    }, [firstElTap, disableDnD])

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

        //deep clone since we're using redux and changing
        //object references. Hits performance x 10, but is needed
        const clonedData = cloneDeep(data)

        //list container are same 
        //remove el from old index, add to new index
        if(sameContainer){
            startAnswersList.splice(destination.index, 0, clonedData.answerChoices[draggableId]);
            newState = {
                ...clonedData,
                [startContainerType]: {
                    ...clonedData[startContainerType],
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
                finishAnswersList.push(clonedData.answerChoices[draggableId]);
            
            } else finishAnswersList.splice(destination.index, 0, clonedData.answerChoices[draggableId]);
            
            newState = startContainerType===finishContainerType ? {
                ...clonedData,
                [startContainerType]:{
                    ...clonedData[startContainerType],
                    [start] : startAnswersList,
                    [finish] : finishAnswersList,
                },
            }
            : {
                ...clonedData,
                [startContainerType]:{
                    ...clonedData[startContainerType],
                    [start] : startAnswersList,
                },
                [finishContainerType] : {
                    ...clonedData[finishContainerType],
                    [finish] : finishAnswersList,
                }
            }
        }  
        //maintain itembank across resize, if we have to generate multiple columns
        if(addedToWordBank) newState.allItems[addedToWordBank.id] = addedToWordBank
        if(startContainerType==="itemBank") delete newState.allItems[draggableId]
        if(finishContainerType==="itemBank") newState.allItems[draggableId] = clonedData.answerChoices[draggableId]
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
        dispatch(updateActivityData({
            type: "singleQuestionUpdate",
            questionNum: questionNum,
            data: newState
        }))
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

    //ensure redux state is transformed first
    if(!onMount.current) return <div></div>
    return(
        <>

        <div className={`match-activity-container${mediumWindowWidth ? " full-size":" portrait-size"}`}>
        <DragDropContext 
            onDragEnd = {disableDnD ? onDragEnd: null} 
            onDragUpdate={disableDnD ? onDragUpdate: null} 
            onDragStart={disableDnD ? onDragStart: null}
        >
            <div className="d-flex justify-content-center w-100">
                <AnswerBank 
                    data={data}
                    firstElTap= {firstElTap}
                    mediumWindowWidth = {mediumWindowWidth}
                    moreInfoOnClick = {moreInfoOnClick}
                    disableDnD = {!disableDnD}
                    onTap = {onTap}
                    moreInfoBtn = {moreInfoBtn}
                    removedEl = {removedEl}
                />
                {mediumWindowWidth ? <WordBank 
                                       data={data}
                                       firstElTap= {firstElTap}
                                       disableDnD = {!disableDnD}
                                       onTap = {!disableDnD? onTap: null}
                                       //classes
                                       resizeContainerClass={"match-activity-itemBank-container full-size"}
                                       overallContainerClass = {"match-activity-itemBank d-flex align-items-center flex-column full-size"}
                                       columnContainerClass = {"match-activity-itemBank-column-container w-100 flex-grow-1 d-flex flex-column"}
                                       columnTitleClass = {"match-activity-column-titles answer-choices"}
                                       columnClass = {"match-activity-itemBank-column"}
                                       droppableClassName = {`match-activity-itemBank-droppables d-flex flex-column w-100`}
                                       draggableClassName = {"match-activity-draggables d-flex align-items-center justify-content-center"}
                                       innerDroppableClassName = {`${!disableDnD && firstElTap? "match-activity-tap-active ": ""}match-activity-inner-droppable w-100 d-flex flex-column align-items-center`}
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
                            onTap = {!disableDnD? onTap: null}
                            //classes
                            resizeContainerClass={"match-activity-itemBank-container w-100"}
                            overallContainerClass = {"match-activity-itemBank d-flex flex-column align-items-center w-100"}
                            columnContainerClass = {"match-activity-itemBank-column-container w-100 flex-grow-1 d-flex flex-column"}
                            columnClass = {"match-activity-itemBank-column"}
                            columnTitleClass = {"match-activity-column-titles vertical"}
                            droppableClassName = {`match-activity-itemBank-droppables d-flex flex-column w-100`}
                            draggableClassName = {"match-activity-draggables d-flex align-items-center justify-content-center"}
                            innerDroppableClassName = {`${!disableDnD && firstElTap? "match-activity-tap-active ": ""}match-activity-inner-droppable w-100 d-flex flex-column align-items-center`}
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
