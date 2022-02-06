import {createPortal} from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import MiniScreenSideBar from "../../../utilities/miniScreenSidebar/MiniScreenSiderbar"
import useActivityMiniScreenData from "../hooks/use-activity-miniscreen-data"
import PopUpBg from "../../../utilities/popUp/PopUpBackground"
import {updateAddQuestionPopUp} from "../../../../../redux/features/activityCreation/activityCreationSettings"
import { updateSidebarToggle } from "../../../../../redux/features/activityCreation/activityCreationSettings"
import {
    changeQuestionPos, 
    addQuestion, 
    deleteQuestion,
 } from "../../../../../redux/features/activityCreation/activityCreationData"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ExitIcon from "../../../utilities/exitIcon/ExitIcon"
const ActivityCreationSidebar = ({
    mediumWindowWidth
}) =>{
    const dispatch = useDispatch()
    const sidebarToggled = useSelector((state) => state.activityCreation.settings.sidebarToggled)
    const addQuestionPopUp = useSelector((state) => state.activityCreation.settings.addQuestionPopUp)
    const miniScreenData = useActivityMiniScreenData({
        reduxSelectorFunc: state => state.activityCreation.data.saved.present.questions,
        changeQuestionPos: changeQuestionPos,
        addQuestion: updateAddQuestionPopUp,
        deleteQuestion: deleteQuestion
    })
    useEffect(() =>{
        if(!mediumWindowWidth) dispatch(updateSidebarToggle(false))
        else dispatch(updateSidebarToggle(true))
    }, [dispatch, mediumWindowWidth])
    
    const questionTypes = [
        {type: "radio", icon: <FontAwesomeIcon />, description: "Multiple Choice"},
        {type: "checkbox", icon: <FontAwesomeIcon />, description: "Checkbox"},
        {type: "shortAnswer", icon: <FontAwesomeIcon />, description: "Short Answer"},
        {type: "sort", icon: <FontAwesomeIcon />, description: "Sort Items"},
        {type: "matching", icon: <FontAwesomeIcon />, description: "Match Items"},
        {type: "labelPictures", icon: <FontAwesomeIcon />, description: "Label a Picture"},
    ]
    const onAddQuestionClick = (e) =>{
        const target = e.target.closest("button")
        if(!target) return
        const value = target.dataset.questionType
        if(!value) return
        dispatch(addQuestion({questionType : value}))
        dispatch(updateAddQuestionPopUp(false))
    }
    return(
        <>
            {!mediumWindowWidth && sidebarToggled && <PopUpBg
                onClick = {() => dispatch(updateSidebarToggle(false))}
                ariaLabel = {"close-sidebar"}
                
            />}
            <MiniScreenSideBar 
                sidebarToggle={!sidebarToggled}
                customClass = "activity-creation-sidebar"
                {...miniScreenData}
            /> 
            
            {addQuestionPopUp && createPortal(
                <PopUpBg
                    zIndex = {5}
                    onClick = {() => dispatch(updateAddQuestionPopUp(false))}
                > 
                    <div className="activity-creation-add-question-pop-up">
                        <button 
                            className="activity-creation-add-question-exit-btn"
                            onClick = {() => dispatch(updateAddQuestionPopUp(false))}
                        >
                            <ExitIcon
                                customStrokeWidth={"0.5rem"}
                             />
                        </button>
                        <div className="add-question-pop-up-container row">
                            {questionTypes.map((question) =>{
                                return(
                                    <div
                                        key={question.type}
                                        className="add-question-type-btn-container"
                                    >
                                        <button
                                            className="add-question-type-btn"
                                            onClick = {onAddQuestionClick}
                                            aria-label = {`add-${question.description}-question`}
                                            data-question-type = {question.type}
                                        >
                                        {question.icon}
                                        <span>{question.description}</span>
                                        </button>
                                    </div>
                                    
                                )
                            })}
                        </div>
                    </div>
                </PopUpBg>
            , document.body)}
        </>
    )
}
export default ActivityCreationSidebar