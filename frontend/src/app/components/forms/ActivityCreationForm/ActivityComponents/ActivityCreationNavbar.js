import Navbar from "../../../utilities/navbar/Navbar"
import { undoHistory, redoHistory } from "../activityCreationHistoryFunc";
import { updateResetPopUp } from "../../../../../redux/features/activityCreation/activityCreationSettings";
import { useDispatch, useSelector } from "react-redux";
import { 
    updateActivityEditPopUp,
    updateSidebarToggle
} from "../../../../../redux/features/activityCreation/activityCreationSettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
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
    <div className="mini-screen-sidebar-header-container">
        <div className="mini-screen-sidebar-header">
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
        />
    )
}
export default ActivityCreationNavbar
    