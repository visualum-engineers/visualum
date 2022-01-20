import { useState, useEffect } from "react"
import {unstable_batchedUpdates} from 'react-dom'
import transformData from "./labelTransformData"
import {DragDropContext} from "react-beautiful-dnd"
import ActivityHeader from "../ActivityHeader"
import WordBank from "../../utilities/dragAndDrop/ReactBeautifulDnD/WordBank"
import LabelQuestionColumn from "./LabelQuestionColumn"
import { useDispatch, useSelector } from "react-redux"
import { resetPopUpOff, enableTap, enableDnD} from "../../../../redux/features/activityTypes/activitiesSlice"
import updateMultipleSortableLists from "../../utilities/dragAndDrop/DnDUpdateAlgo.js/Sortables/updateMultipleLists"
import getResultOnTap from "../../utilities/dragAndDrop/DnDUpdateAlgo.js/Sortables/getResultOnTap"

const LabelPicturesApp = ({
    activityData, 
    questionNum, 
    activityID, 
    moreInfoOnClick,
    resetBtnOnClick, 
    moreInfoBtn, 
    popUpBgStyles,
    mediumWindowWidth,
    smallWindowWidth,
}) =>{
    const [data, setData] = useState(transformData(activityData, 1))
    const [dragActive, setDragActive] = useState(false)
    //used for dnd and tap and drop actions
    const [firstElTap, setFirstElTap] = useState(null)

    //redux states
    const dispatch = useDispatch()
    const disableDnD = useSelector((state) => !state.activities.dndEnabled)
    const resetPopUp = useSelector((state) => state.activities.resetPopUp)
    
    //if it exists, grab info from local storage on mount.
    useEffect(() => {
        //on mount check local storage for data
        let stored = localStorage.getItem(`${activityID}-label_pic_activity_client_answer-${questionNum}`)
        if(!stored) return
        setData(JSON.parse(stored))
    }, [activityID, questionNum])
    //reset data
    useEffect(() =>{
        if(resetPopUp && resetPopUp.confirmed){
            //reset all state values to default
            setData(transformData(activityData, 1))
            setFirstElTap(null)
            dispatch(resetPopUpOff())
            //remove any saved data from local storage
            localStorage.removeItem(`${activityID}-label_pic_activity_client_answer-${questionNum}`)        
        }
    }, [dispatch, resetPopUp, activityData, activityID, questionNum])

    //test is item comes from a word bank column
    const answerChoiceTestEl = (el) => /answerChoices.*/.test(el)
    
    const onDragStart = () =>{
        //to prevent smooth scroll behavior from interfering with react-beautiful auto scroll
        document.querySelector("html").classList.add("sortActivityActive")
        setDragActive(true)
    }

    const onDragEnd = (result) =>{
        const newState = updateMultipleSortableLists(data, result, answerChoiceTestEl)
        if(!newState) return
        //update state

        unstable_batchedUpdates(()=>{
            setData(newState)
            setDragActive(false)
        })
        localStorage.setItem(`${activityID}-label_pic_activity_client_answer-${questionNum}`, JSON.stringify(newState))
    }
    const toggleTap = (e) =>{
        if(e.type ==="keydown" && !(e.key === "Enter")) return
        //update redux store so instructions can dynamically change
        if (disableDnD) dispatch(enableDnD())
        else dispatch(enableTap())

        moreInfoOnClick()
        //if we're changing the mode, we need to reset this
        // as its only viable for tap mode
        if(firstElTap) firstElTap.node.classList.remove("label-picture-activity-dragging")
        setFirstElTap(null)
    }
    const onTap = (e) =>{
        const parm = {
            e: e, 
            firstElTap: firstElTap, 
            setFirstElTap: setFirstElTap, 
            listItemDraggableClass: "label-pic-activity-draggables",
            listItemInnerDroppableClass: "label-pic-activity-inner-droppable",
        }
        const result = getResultOnTap(parm)
        if(!result) return

        unstable_batchedUpdates(()=>{
            onDragEnd(result)
            setFirstElTap(null)
        })
    }
    return(
        <>
            <ActivityHeader 
                data ={data}
                mediumWindowWidth={mediumWindowWidth}
                smallWindowWidth = {smallWindowWidth}
                resetBtnOnClick ={resetBtnOnClick} 
                questionNum={questionNum}
                disableDnD ={disableDnD}
                toggleTap = {toggleTap}
                type="DnD"
            />
            <div className={`label-pic-activity-container d-flex${!mediumWindowWidth?" flex-column portrait-size":" full-size"}`}>
                <DragDropContext 
                    onDragEnd = {!disableDnD ? onDragEnd : null}
                    onDragStart = {!disableDnD ? onDragStart : null}
                >
                    <LabelQuestionColumn 
                        data = {data}
                        firstElTap = {firstElTap}
                        dragActive={dragActive}
                        mediumWindowWidth={mediumWindowWidth}
                        smallWindowWidth={smallWindowWidth}
                        //func
                        onTap = {disableDnD? onTap: null}
                        moreInfoBtn = {moreInfoBtn}
                        moreInfoOnClick={moreInfoOnClick}

                        //styles
                        popUpBgStyles={popUpBgStyles}
                        placeholderClass ={"label-pic-activity-droppables-placeholder"}
                        columnContainerClass = {"label-pic-activity-question-column flex-grow-1 d-flex flex-column w-100"}
                        droppableClassName = {"label-pic-activity-question-droppables d-flex flex-column w-100"}
                        innerDroppableClassName = {"label-pic-activity-inner-droppable d-flex flex-column align-items-center w-100"
                                                    + `${disableDnD && firstElTap? " label-pic-activity-tap-active": ""}`}
                        draggableClassName= {"label-pic-activity-draggables d-flex align-items-center justify-content-center"}
                        draggingOverClass={"label-pic-activity-draggable-over"}
                        isDraggingClass ={"label-pic-activity-dragging"}
                    />
                    {mediumWindowWidth &&
                            <WordBank 
                                data={data}
                                firstElTap= {firstElTap}
                                onTap = {disableDnD? onTap: null}
                                resizeContainerClass = {"label-pic-activity-itemBank-container full-size d-flex flex-column"}
                                overallContainerClass = {"label-pic-activity-itemBank full-size d-flex align-items-center flex-column"}
                                columnContainerClass = {"label-pic-activity-itemBank-column-container w-100 flex-grow-1 d-flex flex-column"}
                                columnTitleClass = {"label-pic-activity-column-titles answer-choices"}
                                columnClass = {"label-pic-activity-itemBank-column"}
                                droppableClassName = {`label-pic-activity-itemBank-droppables d-flex flex-column w-100`}
                                draggableClassName = {"label-pic-activity-draggables d-flex align-items-center justify-content-center"}
                                innerDroppableClassName = {"label-pic-activity-inner-droppable w-100 d-flex flex-column align-items-center"
                                                        + `${disableDnD && firstElTap? " label-pic-activity-tap-active": ""}`}
                                draggingOverClass={"label-pic-activity-draggable-over"}
                                isDraggingClass = {"label-pic-activity-dragging"}
                            />
                    }
                    
                    

                    {!mediumWindowWidth &&
                        <WordBank 
                            data={data}
                            firstElTap= {firstElTap}
                            onTap = {disableDnD? onTap: null}
                            //classes
                            resizeContainerClass = {"label-pic-activity-itemBank-container portrait-size"}
                            overallContainerClass = {"label-pic-activity-itemBank portrait-size d-flex align-items-center flex-column flex-grow-1"}
                            columnContainerClass = {"label-pic-activity-itemBank-column-container flex-grow-1 d-flex flex-column col-11 col-sm-10 portrait-size"}
                            columnTitleClass = {"label-pic-activity-column-titles answer-choices"}
                            columnClass = {"h-100 label-pic-activity-itemBank-column"}
                            droppableClassName = {`label-pic-activity-itemBank-droppables d-flex flex-column align-items-center w-100`}
                            innerDroppableClassName = {"label-pic-activity-inner-droppable d-flex flex-column align-items-center w-100"
                                                    + `${disableDnD && firstElTap? " label-pic-activity-tap-active ": ""}`
                                                }
                            draggableClassName = {"label-pic-activity-draggables d-flex align-items-center justify-content-center"}
                            draggingOverClass={"label-pic-activity-draggable-over"}
                            isDraggingClass = {"label-pic-activity-dragging"}
                        />
                    }
                </DragDropContext>
            </div>
        </>
    )
}
export default LabelPicturesApp
