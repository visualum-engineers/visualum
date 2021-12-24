import { useState, useEffect, useRef, useMemo} from 'react'
import {DndContext, DragOverlay, getBoundingClientRect} from '@dnd-kit/core';
import {useDispatch, useSelector} from 'react-redux';
import {enableTap, enableDnD} from '../../../../redux/features/activityTypes/activitiesSlice'
import useWindowWidth from '../../../hooks/use-window-width';
import WordBank from './SortActivityWordBank';
import DrapAndDropToggler from '../DragAndDrop/DrapAndDropToggler'
import Timer from '../../timer/Timer';
import SortActivityCategories from './SortActivityCategories';
import Item from '../DragAndDrop/DnDKit/DragOverlayItem';
import activeRectIntersection  from './customCollisionAlgo';
import debounce from 'lodash.debounce';

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

const SortActivityApp = ({activityData, questionNum, activityID, moreInfoOnClick, moreInfoBtn, mediumWindowWidth}) => {
    //for updating redux store(data to be sent to backend)
    const smallWindowWidth = useWindowWidth(576)
    const wordBankColumns = mediumWindowWidth ? Array(1).fill(0) : Array(2).fill(0) 
    const [data, setData] = useState(transformData(activityData, wordBankColumns.length))
    const [activeId, setActiveId] = useState(null)
    const [isOver, setIsOver] = useState(undefined)
    const disableDnD = useSelector((state) => !state.activities.dndEnabled) 
    const dispatch = useDispatch()
    //used for tap and drop
    const [firstTapEl, setFirstTapEl] = useState(null)
    const removedEl = useRef(null)
    const dragOverlayItem = useRef()
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
    const updateSortableLists = (result) =>{
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
    }
    //used only for dnd, not tap
    const resultValues = (e, finishContainer) => {
        const finish = finishContainer
        const start = e.active.data.current.tapDroppableId
        const startIndex = e.active.data.current.index
        const endIndex = !e.over.data.current ? 0 : e.over.data.current.index
        const source = {
            droppableId: start,
            index: startIndex
        }
        const destination = {
            droppableId: finish,
            index: endIndex,
        }
        const result={
            source: source,
            destination: destination,
            draggableId: e.active.id
        }
        updateSortableLists(result)
    }
    const onDragStart = (e) =>{
        //to prevent smooth scroll behavior from interfering with react-beautiful auto scroll
        document.querySelector("html").classList.add("sortActivityActive")
        setActiveId(e.active.id)
    }
    //pass all necessary values and re-rendered functions here 
    const onDragOver = (e, isOver, resultValues) =>{
        //prevent updating if already null, and set to null if not being sorted
        if(!e.over && !isOver) return
        else if(!e.over) return setIsOver(undefined)
        if(!e.over.data.current && isOver === e.over.id) return 
        else if(!e.over.data.current) {
            resultValues(e, e.over.id)
            //runs when the droppable id changes
            // meaning containers are different
            return setIsOver(e.over.id)
        }
        //update state when in a different droppable container than a sortable one
        if(isOver === e.over.data.current.sortable.containerId) return
        if(e.over.data.current.sortable.containerId !== e.active.data.current.sortable.containerId) resultValues(e, e.over.data.current.sortable.containerId)
        setIsOver(e.over.data.current.sortable.containerId)
    }
    //debounce expensive function. We also only create debounce once, on mount
    const debouncedOnDragOver = useMemo(() => debounce(onDragOver, 150), []);
    //overall wrapper containing all dependencies
    //this function will be attached to dndContext handler
    const onDragOverWrapper = (e) => {
        debouncedOnDragOver(e, isOver, resultValues)
    }
    const onTap = (e) =>{
        //in case there was a lag due to debouncing
        setIsOver(undefined)
        //means a selection hasnt happened so skip for keyboard
        if(e.type === "keydown" && e.key !=="Enter") return
        //update the first element
        let droppableSelected = null
        let currListItem = e.target.closest(".sort-activity-draggables")
        if(!currListItem) {
            droppableSelected = true
            currListItem = e.target.closest(".sort-activity-inner-droppable")
        }
        //used when two list items are clicked, and not an empty droppable
        const droppableId = currListItem.dataset.tapDroppableId
        const draggableIndex = currListItem.dataset.tapIndex
        const firstDraggableId = currListItem.dataset.tapDraggableId
        
        if(!firstTapEl) {
            setFirstTapEl({
                droppableId: droppableId,
                draggableId: firstDraggableId,
                draggableIndex: draggableIndex
            })
            currListItem.classList.add("sort-activity-dragging")
            return
        }
        //update the second element, and perform tap logic
        document.getElementById("dragItem"+firstTapEl.draggableId).classList.remove("sort-activity-dragging")
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
        updateSortableLists(result)
        setFirstTapEl(null)
    }
    //toggle dnd and tap mode based on btn
    const toggleTap = (e) => {
        if (e.type ==="click" || (e.type ==="keydown" && e.key === "Enter")) {
            //update redux store so instructions can dynamically change
            if (disableDnD) dispatch(enableDnD())
            else dispatch(enableTap())
            
            moreInfoOnClick()
            //if we're changing the mode, we need to reset this
            // as its only viable for tap mode
            if(firstTapEl) document.getElementById("dragItem"+firstTapEl.draggableId).classList.remove("sort-activity-dragging")
            removedEl.current = null
            setFirstTapEl(null)
        }
    }
    //handle state update when object stops
    const onDragEnd = (e) => {
        //to re-enable smooth scrolling for the remainder of the pages
        document.querySelector("html").classList.remove("sortActivityActive")
        //this was already updated on dragMoveOver
        setActiveId(null)
        setIsOver(undefined)
        if(!e.over) return
        //reset overlay and over styles
        if(!e.over.data.current || isOver !== e.over.data.current.sortable.containerId) return
        //nothing changed
        if(isOver === e.over.data.current.sortable.containerId && e.over.data.current.index === e.active.data.current.index) return
        resultValues(e, e.over.data.current.sortable.containerId)
       
    };
    const customCollisionAlgo = (e) =>{
        if(!dragOverlayItem.current) return
        const overlayRect = getBoundingClientRect(dragOverlayItem.current)
        return activeRectIntersection(e, overlayRect)
    }
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
            <DndContext 
                // onDragStart={!disableDnD && onDragStart}
                // onDragEnd = {!disableDnD && onDragEnd}
                // collisionDetection={!disableDnD && customCollisionAlgo}
                // onDragOver = {!disableDnD && onDragOverWrapper}
                onDragStart={onDragStart}
                onDragEnd = {onDragEnd}
                collisionDetection={customCollisionAlgo}
                onDragOver = {onDragOverWrapper}
                //announcements = 
            >
                {mediumWindowWidth && <WordBank 
                    data ={data}
                    firstTapEl = {firstTapEl}
                    isDraggingClass = {"sort-activity-is-dragging"}
                    onTap = {disableDnD ? onTap : null}
                    overallContainerClass = {`sort-activity-itemBank ${mediumWindowWidth ? "full-size":"w-100"}`} 
                    columnContainerClass = "sort-activity-column-container w-100"
                    columnTitleClass = "sort-activity-column-titles"
                    columnClass = "sort-activity-itemBank-column"
                    droppableClassName ={`sort-activity-itemBank-droppables w-100${!mediumWindowWidth?" small-screen": ""}`}
                    innerDroppableClassName = {`${disableDnD && firstTapEl? "sort-activity-tap-active ": ""}sort-activity-inner-droppable d-flex flex-column align-items-center w-100`}
                    draggingOverClass = {"sort-activity-dragging-over"}
                    draggableClassName = {"sort-activity-draggables d-flex align-items-center justify-content-center "}
                    isOver = {isOver}
                    disableDnD = {disableDnD}
                />}
                {/* Renders sort categories */}
                <SortActivityCategories 
                    numCategories = {numCategories}
                    onTap = {disableDnD ? onTap : null}
                    data={data}
                    mediumWindowWidth = {mediumWindowWidth}
                    isOver = {isOver}
                    moreInfoBtn = {moreInfoBtn}
                    moreInfoOnClick = {moreInfoOnClick}
                    disableDnD = {disableDnD}
                    firstTapEl = {firstTapEl}
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
                    droppableClassName ={`sort-activity-itemBank-droppables${!mediumWindowWidth?"small-screen w-100 ": ""}`}
                    innerDroppableClassName = {`${disableDnD && firstTapEl? "sort-activity-tap-active ": ""}sort-activity-inner-droppable d-flex flex-column align-items-center w-100`}
                    draggingOverClass = {"sort-activity-dragging-over"}
                    draggableClassName = {"sort-activity-draggables d-flex align-items-center justify-content-center"}
                    isOver = {isOver}
                    disableDnD = {disableDnD}
                />}
                {/*Current element being dragged*/}
                <DragOverlay>
                   {activeId ? (
                    <Item 
                         ref = {dragOverlayItem}
                         activeId = {activeId}
                         draggableClassName = {"sort-activity-draggables d-flex align-items-center justify-content-center"}
                         data = {data}
                         isDraggingClass = {"sort-activity-is-dragging"}
                    />
                   ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    </>
    )
}
export default SortActivityApp