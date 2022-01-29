import { useState, useEffect, useRef } from "react"
import {unstable_batchedUpdates} from 'react-dom'
import transformData from "./labelTransformData"
import {DragDropContext} from "react-beautiful-dnd"
import WordBank from "../../utilities/dragAndDrop/ReactBeautifulDnD/WordBank"
import LabelQuestionColumn from "./LabelQuestionColumn"
import { useDispatch, useSelector } from "react-redux"
import { updateActivityData, updateActivityDataLayout } from "../../../../redux/features/activityTypes/activitiesData"
import updateMultipleSortableLists from "../../utilities/dragAndDrop/DnDUpdateAlgo.js/Sortables/updateMultipleLists"
import getResultOnTap from "../../utilities/dragAndDrop/DnDUpdateAlgo.js/Sortables/getResultOnTap"
import { resetHistory } from "../activityHistoryFunc"

const LabelPicturesApp = ({
    originalQuestionData,
    questionNum, 
    moreInfoOnClick,
    moreInfoBtn, 
    popUpBgStyles,
    mediumWindowWidth,
    smallWindowWidth,
}) =>{
    const [dragActive, setDragActive] = useState(false)
    //used for dnd and tap and drop actions
    const [firstElTap, setFirstElTap] = useState(null)

    //redux states
    const dispatch = useDispatch()
    const data = useSelector(state => state.activities.data.clientData.present.clientAnswerData.questions[questionNum])
    const disableDnD = useSelector((state) => state.activities.settings.dndEnabled)
    const resetPopUp = useSelector((state) => state.activities.settings.resetPopUp)
    const onMount = useRef(false)
    //since were using redux,
    //to prevent side effect, 
    //we useRef to control only running 
    //on mount
    useEffect(() => { 
        if(!onMount.current || !data.categories){
            dispatch(updateActivityDataLayout({
                type: "singleQuestionUpdate",
                questionNum: questionNum,
                data: transformData(data, 1)
            }))
            onMount.current = true
        } 
    }, [data, dispatch, questionNum])

    //reset data
    useEffect(() =>{
        if(resetPopUp && resetPopUp.confirmed){
            //reset all state values to default
            unstable_batchedUpdates(()=>{
                setFirstElTap(null)
                resetHistory({
                    dispatch: dispatch,
                    questionNum: questionNum,
                    newState: transformData(originalQuestionData, 1)
                })
            })
        }
    }, [dispatch, resetPopUp, originalQuestionData, questionNum])

    useEffect(() => {
        //if we're changing the mode, we need to reset this
        if(disableDnD){
            if(firstElTap) firstElTap.node.classList.remove("label-picture-activity-dragging")
            setFirstElTap(null)
        }
    }, [firstElTap, disableDnD])
    
    const onDragStart = () =>{
        //to prevent smooth scroll behavior from interfering with react-beautiful auto scroll
        document.querySelector("html").classList.add("sortActivityActive")
        setDragActive(true)
    }

    const onDragEnd = (result) =>{
        const newState = updateMultipleSortableLists(data, result)
        if(!newState) return
        //update state
        unstable_batchedUpdates(()=>{
            setDragActive(false)
            dispatch(updateActivityData({
                type: "singleQuestionUpdate",
                questionNum: questionNum,
                data: newState
            }))
        })
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
    //ensure redux state is transformed first
    if(!onMount.current || !data.categories) return <div></div>
    return(
        <>
            <div className={`label-pic-activity-container d-flex${!mediumWindowWidth?" flex-column portrait-size":" full-size"}`}>
                <DragDropContext 
                    onDragEnd = {disableDnD ? onDragEnd : null}
                    onDragStart = {disableDnD ? onDragStart : null}
                >
                    <LabelQuestionColumn 
                        data = {data}
                        firstElTap = {firstElTap}
                        dragActive={dragActive}
                        mediumWindowWidth={mediumWindowWidth}
                        smallWindowWidth={smallWindowWidth}
                        //func
                        onTap = {!disableDnD? onTap: null}
                        moreInfoBtn = {moreInfoBtn}
                        moreInfoOnClick={moreInfoOnClick}

                        //styles
                        popUpBgStyles={popUpBgStyles}
                        placeholderClass ={"label-pic-activity-droppables-placeholder"}
                        columnContainerClass = {"label-pic-activity-question-column flex-grow-1 d-flex flex-column w-100"}
                        droppableClassName = {"label-pic-activity-question-droppables d-flex flex-column w-100"}
                        innerDroppableClassName = {"label-pic-activity-inner-droppable d-flex flex-column align-items-center w-100"
                                                    + `${!disableDnD && firstElTap? " label-pic-activity-tap-active": ""}`}
                        draggableClassName= {"label-pic-activity-draggables d-flex align-items-center justify-content-center"}
                        draggingOverClass={"label-pic-activity-draggable-over"}
                        isDraggingClass ={"label-pic-activity-dragging"}
                    />
                    {mediumWindowWidth &&
                            <WordBank 
                                data={data}
                                firstElTap= {firstElTap}
                                onTap = {!disableDnD? onTap: null}
                                resizeContainerClass = {"label-pic-activity-itemBank-container full-size d-flex flex-column"}
                                overallContainerClass = {"label-pic-activity-itemBank full-size d-flex align-items-center flex-column"}
                                columnContainerClass = {"label-pic-activity-itemBank-column-container w-100 flex-grow-1 d-flex flex-column"}
                                columnTitleClass = {"label-pic-activity-column-titles answer-choices"}
                                columnClass = {"label-pic-activity-itemBank-column"}
                                droppableClassName = {`label-pic-activity-itemBank-droppables d-flex flex-column w-100`}
                                draggableClassName = {"label-pic-activity-draggables d-flex align-items-center justify-content-center"}
                                innerDroppableClassName = {"label-pic-activity-inner-droppable w-100 d-flex flex-column align-items-center"
                                                        + `${!disableDnD && firstElTap? " label-pic-activity-tap-active": ""}`}
                                draggingOverClass={"label-pic-activity-draggable-over"}
                                isDraggingClass = {"label-pic-activity-dragging"}
                            />
                    }
                    
                    

                    {!mediumWindowWidth &&
                        <WordBank 
                            data={data}
                            firstElTap= {firstElTap}
                            onTap = {!disableDnD? onTap: null}
                            //classes
                            resizeContainerClass = {"label-pic-activity-itemBank-container portrait-size"}
                            overallContainerClass = {"label-pic-activity-itemBank portrait-size d-flex align-items-center flex-column flex-grow-1"}
                            columnContainerClass = {"label-pic-activity-itemBank-column-container flex-grow-1 d-flex flex-column col-11 col-sm-10 portrait-size"}
                            columnTitleClass = {"label-pic-activity-column-titles answer-choices"}
                            columnClass = {"h-100 label-pic-activity-itemBank-column"}
                            droppableClassName = {`label-pic-activity-itemBank-droppables d-flex flex-column align-items-center w-100`}
                            innerDroppableClassName = {"label-pic-activity-inner-droppable d-flex flex-column align-items-center w-100"
                                                    + `${!disableDnD && firstElTap? " label-pic-activity-tap-active ": ""}`
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
