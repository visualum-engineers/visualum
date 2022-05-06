import {createPortal} from "react-dom"
import { useDispatch, useSelector, batch } from "react-redux"
import { useEffect } from "react"
import MiniScreenSideBar from "../../../utilities/miniScreenSidebar/MiniScreenSiderbar"
import useActivityMiniScreenData from "../../../utilities/miniScreenSidebar/hooks/use-activity-miniscreen-data"
import PopUpBg from "../../../utilities/popUp/PopUpBackground"
import {updateAddQuestionPopUp} from "../../../../../redux/features/activityCreation/activityCreationSettings"
import { updateSidebarToggle, updateCurrQuestion } from "../../../../../redux/features/activityCreation/activityCreationSettings"
import {
    changeQuestionPos, 
    addQuestion, 
    deleteQuestion,
 } from "../../../../../redux/features/activityCreation/activityCreationData"
import { ActivityCreationQuestion } from "./"
import ExitIcon from "../../../utilities/exitIcon/ExitIcon"
const ActivityCreationSidebar = ({
    mediumWindowWidth, 
}) =>{
    const dispatch = useDispatch()
    const sidebarToggled = useSelector((state) => state.activityCreation.settings.sidebarToggled)
    const addQuestionPopUp = useSelector((state) => state.activityCreation.settings.addQuestionPopUp)
    const questionsLength = useSelector(state => state.activityCreation.data.saved.present.questions.length)

    const miniScreenData = useActivityMiniScreenData({
        reduxSelectorFunc: state => state.activityCreation.data.saved.present.questions,
        currQuestionSelector : state => state.activityCreation.settings.currQuestion,
        changeQuestionPos: changeQuestionPos,
        addQuestion: updateAddQuestionPopUp,
        deleteQuestion: deleteQuestion,
        changeCurrQuestion: updateCurrQuestion,
        SlideComponent: ActivityCreationQuestion,
    })
    useEffect(() =>{
        if(!mediumWindowWidth) dispatch(updateSidebarToggle(false))
        else dispatch(updateSidebarToggle(true))
    }, [dispatch, mediumWindowWidth])
    
    const questionTypes = [
        {type: "radio", icon: null, description: "Multiple Choice"},
        {type: "checkbox", icon: null, description: "Checkbox"},
        {type: "shortAnswer", icon: null, description: "Short Answer"},
        {type: "sort", icon: null, description: "Sort Items"},
        {type: "matching", icon: null, description: "Match Items"},
        {type: "labelPictures", icon: null, description: "Label a Picture"},
    ]
    const onAddQuestionClick = (e) =>{
        const target = e.target.closest("button")
        if(!target) return
        const value = target.dataset.questionType
        if(!value) return
        batch(()=>{
            dispatch(addQuestion({questionType : value}))
            dispatch(updateAddQuestionPopUp(false))
            dispatch(updateCurrQuestion(questionsLength.toString()))
        })
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