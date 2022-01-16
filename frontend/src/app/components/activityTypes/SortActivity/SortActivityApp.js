import { useState, useEffect, useRef} from 'react'
import {unstable_batchedUpdates} from 'react-dom'
import {DndContext, DragOverlay, getBoundingClientRect, defaultDropAnimation} from '@dnd-kit/core';
//data updating func
import transformData from './sortTransformData';
import{updateMultipleSortableLists, getResultOnTap, answerChoiceTestEl} from "../../utilities/dragAndDrop/DnDUpdateAlgo.js/algoIndex"
//pos and collision func
import {closestCorners, rectIntersection} from '../../utilities/dragAndDrop/DnDKit/customCollisionAlgo/algoIndex';
import addToTop from '../../utilities/dragAndDrop/DnDKit/positionFunctions/addToTop';
//redux
import {useDispatch, useSelector} from 'react-redux';
import {enableTap, enableDnD, resetPopUpOff} from '../../../../redux/features/activityTypes/activitiesSlice'
//components
import WordBank from './SortActivityWordBank';
import ActivityHeader from '../ActivityHeader';
import SortActivityCategories from './SortActivityCategories';
import Item from '../../utilities/dragAndDrop/DnDKit/DragOverlayItem';

/*Note Missing To-do
Backend: 
    1. Missing updating the backend with partial completion of assignment
    2. Missing updating the backend with grade after completion

Frontend: 
    1. Missing answer validation (check if their sorting is correct)
*/
const dropAnimation = {
    ...defaultDropAnimation,
    dragSourceOpacity: 0.5,
  };
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
    const wordBankColumns = mediumWindowWidth ? Array(1).fill(0) 
                            : smallWindowWidth ? Array(2).fill(0) 
                            : Array(1).fill(0) 

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
    // When a draggable item moves to a new container, the layout may shift
    //and can cause items to incorrectly shift positions if the next animation frame isn't ready.
    // this can lead to duplicated elements.
    const recentlyMovedToNewContainer = useRef(false)
    //after a re-render and animation is complete we can call our
    //collision funcs and update state again
    useEffect(() => {
        requestAnimationFrame(() => {
            if(recentlyMovedToNewContainer.current) recentlyMovedToNewContainer.current = false;
        });
      }, [isOver]);

    //grab data from local storage
    useEffect(() =>{
        const stored_response = localStorage.getItem(`${activityID}-sort_activity_client_answer-${questionNum}`)        
        if(stored_response) setData(JSON.parse(stored_response))
    }, [questionNum, activityID])

    useEffect(() =>{
        if(resetPopUp && resetPopUp.confirmed){
            //reset all state values to default
            unstable_batchedUpdates(() =>{
                setData(transformData(activityData, wordBankColumns.length))
                setFirstElTap(null)
            })
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

    const updateSortableLists = (result) =>{
        const newState = updateMultipleSortableLists(data, result, answerChoiceTestEl)
        if(!newState) return
        //update state
        setData(newState)
        localStorage.setItem(`${activityID}-sort_activity_client_answer-${questionNum}`, JSON.stringify(newState))
    }
    //used only for dnd, not tap. returns the result object that contains all neccessary info to update list
    const resultValues = (e, finishContainer) => {
        const finish = finishContainer
        const start = e.active.data.current.tapDroppableId
        const startIndex = e.active.data.current.index
        const finishAnswersList = Array.from(answerChoiceTestEl(finish) ? data.itemBank[finish] : data.categories[finish])
        //determine if position is at start or end. if not, we use the index provided in data
        const endIndex = !e.over.data.current.sortable
            ? addToTop(
                getBoundingClientRect(e.over.data.current.node), 
                getBoundingClientRect(dragOverlayItem.current), 
                finishAnswersList.length
            )
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

    const onDragStart = (e) =>{
        //to prevent smooth scroll behavior from interfering with react-beautiful auto scroll
        document.querySelector("html").classList.add("sortActivityActive")
        unstable_batchedUpdates(()=>{
            setActiveId(e.active.id);
            setIsOver(e.active.data.current.sortable.containerId)
        })
    }
    //pass all necessary values and re-rendered functions here 
    const onDragOver = (e) =>{
        //if recently moved do not update
        if(recentlyMovedToNewContainer.current) return
        //prevent updating if already null, and set to null if not being sorted
        if(!e.over && !isOver) return
        if(!e.over) return //setIsOver(undefined)
        const currElOver = e.over.data.current.sortable
        const activeElOver = e.active.data.current.sortable
        //when over an empty sortable container (not a draggable item)
        if(!currElOver && isOver === e.over.id) return 
        if(!currElOver) {
            recentlyMovedToNewContainer.current = true
            unstable_batchedUpdates(()=>{
                updateSortableLists(resultValues(e, e.over.id))
                setIsOver(e.over.id)
            })
            return
        }

        //still over same draggable
        if(currElOver && isOver === e.over.id) return 

        //still in same container
        if(isOver === currElOver.containerId) return

        //different starting and ending containers
        if(currElOver.containerId !== activeElOver.containerId) {
            recentlyMovedToNewContainer.current = true
            unstable_batchedUpdates(()=>{
                updateSortableLists(resultValues(e, currElOver.containerId))
                setIsOver(currElOver.containerId)
            })
            return
        }
    }
    //handle state update when object stops
    const onDragEnd = (e) => {
        //to re-enable smooth scrolling for the remainder of the pages
        document.querySelector("html").classList.remove("sortActivityActive")
        unstable_batchedUpdates(()=>{
            setActiveId(undefined)
            setIsOver(undefined)
        })

        if(!e.over) return 
        //reset overlay and over styles
        const endElOver = e.over.data.current.sortable 
        if(!endElOver || isOver !== endElOver.containerId) return 

        //nothing changed
        const startElIndex = e.active.data.current.index
        const endElIndex = e.over.data.current.index

        if(isOver === endElOver.containerId && endElIndex === startElIndex) return

        updateSortableLists(resultValues(e, endElOver.containerId))

    };
    const onDragCancel = (e) =>{
        unstable_batchedUpdates(()=>{
            setActiveId(undefined)
            setIsOver(undefined)
        })
    }
    const onTap = (e) =>{
        //in case there was a lag due to debouncing
        setIsOver(undefined)
        const parms = {
            e: e, 
            firstElTap: firstElTap, 
            setFirstElTap: setFirstElTap, 
            listItemDraggableClass: "sort-activity-draggables",
            listItemInnerDroppableClass: "sort-activity-inner-droppable",
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
    const customCollisionAlgo = ({
        e, 
        isOver, 
        categories,
        //mediumWindowWidth, 
        dragOverlayItem
    }) =>{
        if(recentlyMovedToNewContainer.current) return
        if(!dragOverlayItem.current) return
        const overlayRect = getBoundingClientRect(dragOverlayItem.current)
        // return closestCorners(e, {
        //     overlayRect: overlayRect, 
        //     containers: categories,
        //     isOver: isOver, 
        // })
        switch (true){
            case mediumWindowWidth:
                return closestCorners(e, {
                    overlayRect: overlayRect, 
                    containers: categories,
                    isOver: isOver, 
                })
            default:
                return rectIntersection(e, {
                    overlayRect: overlayRect, 
                    containers: categories,
                    isOver: isOver
                })
        }
    }
    //overall wrapper function
    const collisionAlgoWrapper = (e) => {
        const intersectingContainer = customCollisionAlgo({
            e: e,
            isOver: isOver,
            categories: {...data.categories, ...data.itemBank},
            mediumWindowWidth: mediumWindowWidth,
            dragOverlayItem: dragOverlayItem
        })
        return intersectingContainer
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
        <div className={`sort-activity-container d-flex ${mediumWindowWidth ? "full-size":"portrait-size flex-column align-items-center"}`}>
            <DndContext 
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd = {onDragEnd}
                onDragCancel={onDragCancel}
                collisionDetection={collisionAlgoWrapper}
            >
                {mediumWindowWidth && <WordBank 
                    data ={data}
                    firstElTap = {firstElTap}
                    onTap = {disableDnD ? onTap : null}
                    isOver = {isOver}
                    disableDnD = {disableDnD}
                    //classes
                    overallContainerClass = {`sort-activity-itemBank ${mediumWindowWidth ? "full-size":"w-100"}`} 
                    columnContainerClass = "sort-activity-column-container w-100"
                    columnTitleClass = {`sort-activity-column-titles d-flex align-items-center justify-content-center`}
                    columnClass = {"sort-activity-itemBank-column"}
                    droppableClassName ={`sort-activity-itemBank-droppables w-100${!mediumWindowWidth?" small-screen": ""}`}
                    innerDroppableClassName = {`${disableDnD && firstElTap? "sort-activity-tap-active ": ""}sort-activity-inner-droppable d-flex flex-column align-items-center w-100`}
                    draggingOverClass = {"sort-activity-dragging-over"}
                    draggableClassName = {"sort-activity-draggables d-flex align-items-center justify-content-center "}
                    isDraggingClass = {"sort-activity-is-dragging"}
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
                    columnTitleClass = {`sort-activity-column-titles d-flex align-items-center justify-content-center`}
                    columnClass = "sort-activity-itemBank-column"
                    droppableClassName ={`sort-activity-itemBank-droppables${!mediumWindowWidth?" small-screen w-100": ""}`}
                    innerDroppableClassName = {`${disableDnD && firstElTap? "sort-activity-tap-active ": ""}sort-activity-inner-droppable d-flex flex-column align-items-center w-100`}
                    draggingOverClass = {"sort-activity-dragging-over"}
                    draggableClassName = {"sort-activity-draggables d-flex align-items-center justify-content-center"}
                    isOver = {isOver}
                    disableDnD = {disableDnD}
                />}
                {/*Current element being dragged*/}
                <DragOverlay
                    dropAnimation={dropAnimation}
                >
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