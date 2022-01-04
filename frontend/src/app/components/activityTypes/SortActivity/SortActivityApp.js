import { useState, useEffect, useRef, useMemo} from 'react'
import {DndContext, DragOverlay, getBoundingClientRect} from '@dnd-kit/core';
import { closestCorners, rectIntersection} from '../../utilities/dragAndDrop/DnDKit/customCollisionAlgo/algoIndex';
import addToTop from '../../utilities/dragAndDrop/DnDKit/positionFunctions/addToTop';
import {useDispatch, useSelector} from 'react-redux';
import {enableTap, enableDnD, resetPopUpOff} from '../../../../redux/features/activityTypes/activitiesSlice'
import WordBank from './SortActivityWordBank';
import ActivityHeader from '../ActivityHeader';
import SortActivityCategories from './SortActivityCategories';
import Item from '../../utilities/dragAndDrop/DnDKit/DragOverlayItem';
import debounce from 'lodash.debounce';
import transformData from './sortTransformData';
import updateMultipleSortableLists from '../../utilities/dragAndDrop/DnDUpdateAlgo.js/Sortables/updateMultipleLists';
import getResultOnTap from '../../utilities/dragAndDrop/DnDUpdateAlgo.js/Sortables/getResultOnTap';

/*Note Missing To-do
Backend: 
    1. Missing updating the backend with partial completion of assignment
    2. Missing updating the backend with grade after completion

Frontend: 
    2. Missing answer validation (check if their sorting is correct)
    3. Missing re-rendering logic, when user answers question and moves on to the next one.
    4. Missing progress saved on local storage/memory (if user exits out of page)
*/

const SortActivityApp = ({
    activityData, 
    questionNum, 
    activityID, 
    moreInfoOnClick, 
    resetBtnOnClick,
    moreInfoBtn, 
    mediumWindowWidth,
    smallWindowWidth,
}) => {
    //for updating redux store(data to be sent to backend)
    const wordBankColumns = mediumWindowWidth ? Array(1).fill(0) : Array(2).fill(0) 
    const [data, setData] = useState(transformData(activityData, wordBankColumns.length))
    const [activeId, setActiveId] = useState(undefined)
    const [isOver, setIsOver] = useState(undefined)
    const dragOverlayItem = useRef()
    //redux states
    const dispatch = useDispatch()
    const disableDnD = useSelector((state) => !state.activities.dndEnabled) 
    const resetPopUp = useSelector((state) => state.activities.resetPopUp) 
    
    //used for tap and drop to track selected elements
    const [firstElTap, setFirstElTap] = useState(null)
    const removedEl = useRef(null)
    //grab data from local storage
    useEffect(() =>{
        const stored_response = localStorage.getItem(`${activityID}-sort_activity_client_answer-${questionNum}`)        
        if(stored_response) setData(JSON.parse(stored_response))
    }, [questionNum, activityID])

    useEffect(() =>{
        if(resetPopUp && resetPopUp.confirmed){
            //reset all state values to default
            setData(transformData(activityData, wordBankColumns.length))
            setFirstElTap(null)
            dispatch(resetPopUpOff())
            //remove any saved data from local storage
            localStorage.removeItem(`${activityID}-sort_activity_client_answer-${questionNum}`)        
        }
    }, [dispatch, resetPopUp, activityData, wordBankColumns.length, activityID, questionNum])

    //handle width resizing
    useEffect(() => {
        setData((data) => transformData(data, wordBankColumns.length))
    }, [mediumWindowWidth, wordBankColumns.length])

    //determine how many categories there are
    const numCategories = Object.keys(data.categories)

    //test is item comes from a word bank column
    const answerChoiceTestEl = (el) => /answerChoices.*/.test(el)

    const updateSortableLists = (result) =>{
        const newState = updateMultipleSortableLists(data, result, answerChoiceTestEl)
        if(!newState) return
        //update state
        setData(newState)
        localStorage.setItem(`${activityID}-sort_activity_client_answer-${questionNum}`, JSON.stringify(newState))
    }

    const onDragStart = (e) =>{
        //to prevent smooth scroll behavior from interfering with react-beautiful auto scroll
        document.querySelector("html").classList.add("sortActivityActive")
        setActiveId(e.active.id)
    }
    //used only for dnd, not tap. returns the result object that contains all neccessary info to update list
    const resultValues = (e, finishContainer) => {
        const finish = finishContainer
        const start = e.active.data.current.tapDroppableId
        const startIndex = e.active.data.current.index
        const finishAnswersList = Array.from(answerChoiceTestEl(finish) ? data.itemBank[finish] : data.categories[finish])
        //determine if position is at start or end. if not, we use the index provided in data
        const endIndex = !e.over.data.current.sortable
            ? addToTop(getBoundingClientRect(e.over.data.current.node), getBoundingClientRect(dragOverlayItem.current), finishAnswersList.length)
            : e.over.data.current.index

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
        return result
    }
    //pass all necessary values and re-rendered functions here 
    const onDragOver = (e, isOver, resultValues, updateSortableLists) =>{
        //prevent updating if already null, and set to null if not being sorted
        if(!e.over && !isOver) return
        else if(!e.over) return setIsOver(undefined)
        if(!e.over.data.current.sortable && isOver === e.over.id) return 
        else if(!e.over.data.current.sortable) {
            updateSortableLists(resultValues(e, e.over.id))
            //runs when the droppable id changes
            // meaning containers are different
            return setIsOver(e.over.id)
        }
        //update state when in a different droppable container than a sortable one
        if(isOver === e.over.data.current.sortable.containerId) return
        if(e.over.data.current.sortable.containerId !== e.active.data.current.sortable.containerId) {
            updateSortableLists(resultValues(e, e.over.data.current.sortable.containerId))
        }
        setIsOver(e.over.data.current.sortable.containerId)
    }
    //debounce expensive function. We also only create debounce once, on mount
    const debouncedOnDragOver = useMemo(() => debounce(onDragOver, 220), []);
    
    //overall wrapper function
    const onDragOverWrapper = (e) => {
        debouncedOnDragOver(e, isOver, resultValues, updateSortableLists)
    }
    //handle state update when object stops
    const onDragEnd = (e) => {
        //to re-enable smooth scrolling for the remainder of the pages
        document.querySelector("html").classList.remove("sortActivityActive")
        setActiveId(undefined)
        if(!e.over) return setIsOver(undefined)
        //reset overlay and over styles
        if(!e.over.data.current.sortable || isOver !== e.over.data.current.sortable.containerId) return setIsOver(undefined)
        //nothing changed
        if(isOver === e.over.data.current.sortable.containerId && e.over.data.current.index === e.active.data.current.index) return setIsOver(undefined)
        setIsOver(undefined)
        updateSortableLists(resultValues(e, e.over.data.current.sortable.containerId))
    };
    const onTap = (e) =>{
        //in case there was a lag due to debouncing
        setIsOver(undefined)
        const parms = {
            e: e, 
            firstElTap: firstElTap, 
            setFirstElTap: setFirstElTap, 
            listItemDraggableClass: "sort-activity-draggables",
            listItemInnerDroppableClass: "sort-activity-inner-droppable",
            currDraggingClass: "sort-activity-dragging"
        }
        const result = getResultOnTap(parms)
        if(!result) return
        setFirstElTap(null)
        updateSortableLists(result)
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
            if(firstElTap) firstElTap.node.classList.remove("sort-activity-dragging")
            removedEl.current = null
            setFirstElTap(null)
        }
    }

    const customCollisionAlgo = (e) =>{
        if(!dragOverlayItem.current) return
        const overlayRect = getBoundingClientRect(dragOverlayItem.current)
        return mediumWindowWidth ? closestCorners(e, overlayRect) : rectIntersection(e, overlayRect)
    }
    return (
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
        <div className={`sort-activity-container d-flex ${mediumWindowWidth ? "full-size":"flex-column align-items-center"}`}>
            <DndContext 
                onDragStart={onDragStart}
                onDragOver = {onDragOverWrapper}
                onDragEnd = {onDragEnd}
                collisionDetection={customCollisionAlgo}
                //announcements = 
            >
                {mediumWindowWidth && <WordBank 
                    data ={data}
                    firstElTap = {firstElTap}
                    isDraggingClass = {"sort-activity-is-dragging"}
                    onTap = {disableDnD ? onTap : null}
                    overallContainerClass = {`sort-activity-itemBank ${mediumWindowWidth ? "full-size":"w-100"}`} 
                    columnContainerClass = "sort-activity-column-container w-100"
                    columnTitleClass = {`sort-activity-column-titles d-flex align-items-center justify-content-${smallWindowWidth? "center" : "start"}`}
                    columnClass = "sort-activity-itemBank-column"
                    droppableClassName ={`sort-activity-itemBank-droppables w-100${!mediumWindowWidth?" small-screen": ""}`}
                    innerDroppableClassName = {`${disableDnD && firstElTap? "sort-activity-tap-active ": ""}sort-activity-inner-droppable d-flex flex-column align-items-center w-100`}
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
                    smallWindowWidth = {smallWindowWidth}
                    isOver = {isOver}
                    moreInfoBtn = {moreInfoBtn}
                    moreInfoOnClick = {moreInfoOnClick}
                    disableDnD = {disableDnD}
                    firstElTap = {firstElTap}
                />
                {/* Renders word/response bank */}
                {!mediumWindowWidth && <WordBank 
                    data ={data}
                    firstElTap = {firstElTap}
                    isDraggingClass = {"sort-activity-is-dragging"}
                    onTap = {disableDnD ? onTap : null}
                    overallContainerClass = {`sort-activity-itemBank ${mediumWindowWidth ? "full-size":"w-100"}`} 
                    columnContainerClass = "sort-activity-column-container w-100"
                    columnTitleClass = "sort-activity-column-titles"
                    columnClass = "sort-activity-itemBank-column"
                    droppableClassName ={`sort-activity-itemBank-droppables${!mediumWindowWidth?" small-screen w-100": ""}`}
                    innerDroppableClassName = {`${disableDnD && firstElTap? "sort-activity-tap-active ": ""}sort-activity-inner-droppable d-flex flex-column align-items-center w-100`}
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
/*
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
        
        if(!firstElTap) {
            setFirstElTap({
                droppableId: droppableId,
                draggableId: firstDraggableId,
                draggableIndex: draggableIndex,
                node: e.target,
            })
            currListItem.classList.add("sort-activity-dragging")
            return
        }
        //update the second element, and perform tap logic
        firstElTap.node.classList.remove("sort-activity-dragging")
        const draggableId = firstElTap.draggableId
        const source = {
            droppableId: firstElTap.droppableId,
            index: firstElTap.draggableIndex
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
        */


/*

*/