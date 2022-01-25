import { useState, useEffect, useRef} from 'react'
import {unstable_batchedUpdates} from 'react-dom'
import {
    DndContext, 
    DragOverlay, 
    getBoundingClientRect, 
    defaultDropAnimation
} from '@dnd-kit/core';

//data updating func
import transformData from './sortTransformData';
import{
    updateMultipleSortableLists, 
    getResultOnTap, 
    answerChoiceTestEl
} from "../../utilities/dragAndDrop/DnDUpdateAlgo.js/algoIndex"

//pos and collision func
import {
    closestCorners, 
    rectIntersection,
    cleanUpCollisionData
} from '../../utilities/dragAndDrop/DnDKit/customCollisionAlgo/algoIndex';

import {addToTop} from '../../utilities/dragAndDrop/DnDKit/positionFunctions/index';

//redux states and functions
import {useDispatch, useSelector} from 'react-redux';
import {updateActivityData, updateActivityDragActive, updateActivityDataLayout} from '../../../../redux/features/activityTypes/activitiesData'
//components
import WordBank from './SortActivityWordBank';
import SortActivityCategories from './SortActivityCategories';
import Item from '../../utilities/dragAndDrop/DnDKit/DragOverlayItem';
import { resetHistory } from '../activityHistoryFunc';

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
    originalQuestionData,
    questionNum, 
    moreInfoOnClick, 
    moreInfoBtn, 
    mediumWindowWidth,
    smallWindowWidth,
}) => {
    //for updating redux store(data to be sent to backend)
    const wordBankColumns = mediumWindowWidth ? Array(1).fill(0) 
                            : smallWindowWidth ? Array(2).fill(0) 
                            : Array(1).fill(0) 

    const data = useSelector(state => state.activities.data.clientData.present.clientAnswerData.questions[questionNum])
    const [activeId, setActiveId] = useState(undefined)
    const [isOver, setIsOver] = useState(undefined)
    const dragOverlayItem = useRef()
    
    //redux states
    const dispatch = useDispatch()
    const disableDnD = useSelector((state) => state.activities.settings.dndEnabled) 
    const resetPopUp = useSelector((state) => state.activities.settings.resetPopUp) 
    
    //used for tap and drop to track selected elements
    const [firstElTap, setFirstElTap] = useState(null)
    const removedEl = useRef(null)

    /* When a draggable item moves to a new container, the layout may shift
    *and can cause items to incorrectly shift positions 
    * if the next animation frame isn't ready.
    * this can lead to duplicated elements. */
    const recentlyMovedToNewContainer = useRef(false)
    useEffect(() => {
        requestAnimationFrame(() => {
            if(recentlyMovedToNewContainer.current) recentlyMovedToNewContainer.current = false;
        });
      }, [isOver]);

    useEffect(() => {
        //if we're changing the mode, we need to reset this
        if(disableDnD){
            if(firstElTap) firstElTap.node.classList.remove("sort-activity-dragging")
            removedEl.current = null
            setFirstElTap(null)
        }
    }, [firstElTap, disableDnD])
    
    //handle reseting data on curr question
    useEffect(() =>{
        if(resetPopUp && resetPopUp.confirmed){
            //reset all state values to default
            unstable_batchedUpdates(() =>{
                setFirstElTap(null)
                resetHistory({
                    dispatch: dispatch,
                    questionNum: questionNum,
                    newState: transformData(originalQuestionData, wordBankColumns.length)
                })
            })  
        }
    }, [dispatch, resetPopUp, originalQuestionData, wordBankColumns.length, questionNum])

    //handle wordbank containers adapting to window-resizing
    //to manage data side effect 
    //and prevent infinite loop
    const onMount = useRef(false)
    const windowValue = useRef(mediumWindowWidth)
    const smallWindowValue = useRef(smallWindowWidth)
    useEffect(() => {
        if(windowValue.current !== mediumWindowWidth || smallWindowValue.current !== smallWindowWidth || !onMount.current){
            if(!onMount.current) onMount.current = true
            dispatch(
                updateActivityDataLayout({
                    questionNum: questionNum,
                    data: transformData(data, wordBankColumns.length)
            }))
            windowValue.current = mediumWindowWidth
            smallWindowValue.current = smallWindowWidth
        }
        //on undo if item was moved when at a different width, 
        // fix layout  
        if((mediumWindowWidth || !smallWindowWidth) && data.itemBank){
            if(Object.keys(data.itemBank).length > 1) dispatch(
                updateActivityDataLayout({
                    questionNum: questionNum,
                    data: transformData(data, wordBankColumns.length)
            }))
        } 
    }, [dispatch, mediumWindowWidth, smallWindowWidth, wordBankColumns.length, questionNum, data])

    //cleanup collision data when component unmounts
    useEffect(() =>{
        return () => cleanUpCollisionData()
    })
    
    //determine how many categories there are
    const numCategories = Object.keys(data.categories)

    const updateSortableLists = (result) =>{
        const newState = updateMultipleSortableLists(data, result, answerChoiceTestEl)
        if(!newState) return
        //update state
        dispatch(updateActivityDragActive({
            questionNum: questionNum,
            data: newState
        }))
        return newState
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
    //this is used to check if in this drag cycle, 
    //the original position on drag start, changed on drag end
    //this is more accurate calling of redux store ONLY
    //since logic for drag and drop here is different
    const onDragStartOver = useRef({start: null, newData: null, end: null})
    const onDragStart = (e) =>{
        //to prevent smooth scroll behavior from interfering with react-beautiful auto scroll
        document.querySelector("html").classList.add("sortActivityActive")
        onDragStartOver.current.start = e.active.data.current.sortable.containerId
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
            const newState = updateSortableLists(resultValues(e, e.over.id))
            recentlyMovedToNewContainer.current = true
            onDragStartOver.current.end = e.over.id
            onDragStartOver.current.newData = newState
            setIsOver(e.over.id)
            return
        }

        //still over same draggable
        if(currElOver && isOver === e.over.id) return 

        //still in same container
        if(isOver === currElOver.containerId) return

        //different starting and ending containers
        if(currElOver.containerId !== activeElOver.containerId) {
            const newState = updateSortableLists(resultValues(e, currElOver.containerId))
            recentlyMovedToNewContainer.current = true
            onDragStartOver.current.end = currElOver.containerId
            onDragStartOver.current.newData = newState
            setIsOver(currElOver.containerId)
            return newState
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
        //check if container from drag start changed by drag end
        if(onDragStartOver.current.start !== onDragStartOver.current.end){
            dispatch(updateActivityData({
                type: "singleQuestionUpdate",
                questionNum: questionNum,
                data: onDragStartOver.current.newData
            }))
        }
        onDragStartOver.current = {start: null, newData: null, end: null}
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
        const newState = updateSortableLists(result)
        dispatch(updateActivityData({
            type: "singleQuestionUpdate",
            questionNum: questionNum,
            data: newState
        }))
    }
   
    const customCollisionAlgo = ({
        e, 
        isOver, 
        categories,
        mediumWindowWidth, 
        dragOverlayItem,
        recentlyMovedToNewContainer
    }) =>{
        if(recentlyMovedToNewContainer.current) return
        if(!dragOverlayItem.current) return
        const overlayRect = getBoundingClientRect(dragOverlayItem.current)
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
            dragOverlayItem: dragOverlayItem,
            recentlyMovedToNewContainer: recentlyMovedToNewContainer
        })
        return intersectingContainer
    }
    //ensure redux state is transformed first
    if(!onMount.current) return <div></div>
    return (
    <>  
        <div className={`sort-activity-container d-flex ${mediumWindowWidth ? "full-size":"portrait-size flex-column align-items-center"}`}>
            <DndContext 
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd = {onDragEnd}
                onDragCancel={onDragCancel}
                collisionDetection={collisionAlgoWrapper}
            >
                {/* Renders sort categories */}
                <SortActivityCategories 
                    numCategories = {numCategories}
                    onTap = {!disableDnD ? onTap : null}
                    data={data}
                    mediumWindowWidth = {mediumWindowWidth}
                    smallWindowWidth = {smallWindowWidth}
                    isOver = {isOver}
                    moreInfoBtn = {moreInfoBtn}
                    moreInfoOnClick = {moreInfoOnClick}
                    disableDnD = {!disableDnD}
                    firstElTap = {firstElTap}
                />
                {mediumWindowWidth && <WordBank 
                    data ={data}
                    firstElTap = {firstElTap}
                    onTap = {!disableDnD ? onTap : null}
                    isOver = {isOver}
                    disableDnD = {!disableDnD}
                    //classes
                    resizeContainerClass = {`sort-activity-itemBank-container ${mediumWindowWidth ? "full-size":"w-100"} d-flex flex-column`}
                    overallContainerClass = {`sort-activity-itemBank ${mediumWindowWidth ? "full-size":"w-100"}`} 
                    columnContainerClass = "sort-activity-column-container w-100"
                    columnTitleClass = {`sort-activity-column-titles d-flex align-items-center justify-content-center`}
                    columnClass = {"sort-activity-itemBank-column"}
                    droppableClassName ={`sort-activity-itemBank-droppables w-100${!mediumWindowWidth?" small-screen": ""}`}
                    innerDroppableClassName = {`${!disableDnD && firstElTap? "sort-activity-tap-active ": ""}sort-activity-inner-droppable d-flex flex-column align-items-center w-100`}
                    draggingOverClass = {"sort-activity-dragging-over"}
                    draggableClassName = {"sort-activity-draggables d-flex align-items-center justify-content-center "}
                    isDraggingClass = {"sort-activity-is-dragging"}
                />}
                
                {/* Renders word/response bank */}
                {!mediumWindowWidth && <WordBank 
                    data ={data}
                    firstElTap = {firstElTap}
                    isDraggingClass = {"sort-activity-is-dragging"}
                    onTap = {!disableDnD ? onTap : null}
                    resizeContainerClass = {`sort-activity-itemBank-container ${mediumWindowWidth ? "full-size":"w-100"} d-flex flex-column`}
                    overallContainerClass = {`sort-activity-itemBank ${mediumWindowWidth ? "full-size":"w-100"}`} 
                    columnContainerClass = "sort-activity-column-container w-100"
                    columnTitleClass = {`sort-activity-column-titles d-flex align-items-center justify-content-center`}
                    columnClass = "sort-activity-itemBank-column"
                    droppableClassName ={`sort-activity-itemBank-droppables${!mediumWindowWidth?" small-screen w-100": ""}`}
                    innerDroppableClassName = {`${!disableDnD && firstElTap? "sort-activity-tap-active ": ""}sort-activity-inner-droppable d-flex flex-column align-items-center w-100`}
                    draggingOverClass = {"sort-activity-dragging-over"}
                    draggableClassName = {"sort-activity-draggables d-flex align-items-center justify-content-center"}
                    isOver = {isOver}
                    disableDnD = {!disableDnD}
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