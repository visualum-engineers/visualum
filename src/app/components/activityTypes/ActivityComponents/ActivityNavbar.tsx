import { useState } from "react";
import { undoHistory, redoHistory } from "../activityHistoryFunc";
import { resetPopUpOn } from "../../../../redux/features/activityTypes/activitiesSettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faCog, 
} from "@fortawesome/free-solid-svg-icons";
import {ActivitySettings} from "../index";
import Navbar from "../../utilities/navbar/activityNavbar/Navbar";

const ActivityNavbar = ({
    smallWindowWidth,
    sidebarToggle,
    handleSideBar,
    resetBtnOnClick,
    questionNum,
    inProp,
    //img container with avatar img
    avatar = null,
    timerData = null
}: any) =>{
        const [settingsOpen, setSettingsOpen] = useState(false)  
        const pastSelectorFunc= (state) => state.activities.data.clientData.past.length
        const futureSelectorFunc= (state) => state.activities.data.clientData.future.length
        const settings = <div>
                <button 
                    className="activity-navbar-setting-btn"
                    onClick={() => setSettingsOpen(state =>!state)}
                >
                    <FontAwesomeIcon icon={faCog} />
                </button>
                {settingsOpen && 
                    <ActivitySettings 
                        onExitPopUp={() => setSettingsOpen(false)}
                        smallWindowWidth={smallWindowWidth}
                    />
                }
            </div>
        return(
            <Navbar 
                displayCompanyName={true}
                pastSelectorFunc = {pastSelectorFunc}
                futureSelectorFunc = {futureSelectorFunc}
                resetPopUpOn = {resetPopUpOn}
                undoHistory = {undoHistory}
                redoHistory = {redoHistory}
                smallWindowWidth = {smallWindowWidth}
                sidebarToggle = {sidebarToggle}
                handleSideBar = {handleSideBar}
                resetBtnOnClick = {resetBtnOnClick}
                questionNum = {questionNum}
                inProp = {inProp}
                timerData = {timerData}
                settings = {settings}
                //img container with avatar img
                avatar = {avatar}
                editOptions={true}
            />       
        )
    }
export default ActivityNavbar