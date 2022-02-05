import Navbar from "../../../utilities/navbar/Navbar"
import { undoHistory, redoHistory } from "../activityCreationHistoryFunc";
import { updateResetPopUp } from "../../../../../redux/features/activityCreation/activityCreationSettings";
import { useDispatch, useSelector } from "react-redux";
import { 
    updateActivityEditPopUp,
    updateSidebarToggle
} from "../../../../../redux/features/activityCreation/activityCreationSettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faEye, faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import EditOptions from "../../../utilities/navbar/EditOptions";
//for testing. remove after
const imageURL = "images/homePage/mountain-home-bg.jpg";
const ActivityCreationNavbar = ({
    smallWindowWidth,
    questionNum, 
    inProp, 
}) =>{
    const avatar = <img 
                    src={imageURL} 
                    alt={"user-avatar"}
                />
    const dispatch = useDispatch()
    const sidebarToggled = useSelector((state) => state.activityCreation.settings.sidebarToggled)
    const pastSelectorFunc = (state) => state.activityCreation.data.saved.present.length
    const futureSelectorFunc = (state) => state.activityCreation.data.saved.future.length
    const activityName = useSelector(state => state.activityCreation.data.saved.present.activityName)
    const resetPopUp = useSelector((state) => state.activityCreation.settings.resetPopUp)
    const handleSideBar = () =>{
        dispatch(updateSidebarToggle())
    }
    const resetBtnOnClick = (e) =>{
        //when being used in forms, it prevents a refresh
        e.preventDefault()
        //for keydown events, only accept enter
        if(e.type === "keydown" && e.key !== "Enter") return  
        
        const node = e.target.closest("button")
        const questionNum = node.dataset.questionNum
        const action = node.dataset.actionLabel
        switch(action){
            case "reset-question" : 
                return dispatch(updateResetPopUp({ questionNum : questionNum, confirmed: false}))
            case "exit-reset-question": 
                return dispatch(updateResetPopUp(null))
            case "confirm-reset-question":
                return dispatch(updateResetPopUp({...resetPopUp, confirmed: true}))
            default:
                return
        }
    }
    const activityNameHeader = <>
    <div className="activity-creation-nav-activity-name-container">
        <div className="activity-creation-nav-activity-name">
            <h1
                onClick={() => dispatch(updateActivityEditPopUp(true))} 
            >
                {activityName}
            </h1>
            <button
                onClick={() => dispatch(updateActivityEditPopUp(true))}
            >
                <FontAwesomeIcon icon={faEdit}/>
                {/* <span>Rename</span> */}
            </button>
        </div>
        <div className="activity-creation-nav-edit-options">
            <EditOptions 
                pastSelectorFunc={pastSelectorFunc}
                futureSelectorFunc={futureSelectorFunc}
                resetPopUpOn = {updateResetPopUp}
                undoHistory = {undoHistory}
                redoHistory = {redoHistory}
                resetBtnOnClick = {resetBtnOnClick}
                questionNum = {questionNum}
                inProp = {inProp}
            />
        </div>
    </div>
        
   </>
    return(
        <Navbar 
            pastSelectorFunc = {pastSelectorFunc}
            futureSelectorFunc = {futureSelectorFunc}
            resetPopUpOn = {updateResetPopUp}
            undoHistory = {undoHistory}
            redoHistory = {redoHistory}
            smallWindowWidth = {smallWindowWidth}
            sidebarToggle = {sidebarToggled}
            handleSideBar = {handleSideBar}
            resetBtnOnClick = {resetBtnOnClick}
            questionNum = {questionNum}
            inProp = {inProp}
            centerHeader = {activityNameHeader}
            //img container with avatar img
            avatar = {avatar}
        >
            <button className="activity-creation-nav-preview-btn">
                <FontAwesomeIcon icon={faEye}/>
                {smallWindowWidth && <span>Preview</span> }
            </button>
            <div className="activity-creation-nav-publish-btn">   
                <button>
                    <FontAwesomeIcon icon={faArrowAltCircleUp}/>
                    {smallWindowWidth && <span>Publish</span> }
                </button>
                <button>
                    <FontAwesomeIcon icon={faChevronDown }/>
                </button>
            </div>
           
        </Navbar>
    )
}
export default ActivityCreationNavbar
    