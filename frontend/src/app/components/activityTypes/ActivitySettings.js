import PopUpBg from "../utilities/popUp/PopUpBackground"
import { useState } from "react"
//import { useDispatch, useSelector } from "react-redux"
//import { enableDnD, enableTap } from "../../../redux/features/activityTypes/activitiesSettings"
import SwitchToggler from "../utilities/switchToggler/SwitchToggler"

const ActivitySettings = ({
    onExitPopUp, 
    moreInfoOnClick
}) =>{
    // const dispatch = useDispatch()
    // const disableDnD = useSelector((state) => !state.activities.settings.dndEnabled) 
    const [settingsActive, setSettingsActive] = useState({})
    //toggle dnd and tap mode based on btn
    // const toggleTapMode = (e) => {
    //     if (e.type ==="click" || (e.type ==="keydown" && e.key === "Enter")) {
    //         //update redux store so instructions can dynamically change
    //         if (disableDnD) dispatch(enableDnD())
    //         else dispatch(enableTap())
    //         moreInfoOnClick()
    //     }
    // }
    // const onSaveBtnClick = () =>{

    // }
    const onSwitchClick = (e) =>{
        if (e.type ==="click" || (e.type ==="keydown" && e.key === "Enter")) {
            const target = e.target.closest("input")
            if(!target) return
            const actionLabel = target.dataset.actionLabel
            const newState = {...settingsActive}
            if(actionLabel in settingsActive) delete newState[actionLabel]
            else newState[actionLabel] = true
            return setSettingsActive(newState)
        }
    }

    return(
    <PopUpBg
        onClick = {onExitPopUp}
    >
            <div className="activity-settings-pop-up col-11 col-sm-8 col-md-6 col-lg-4">
                <div className="activity-settings-pop-up-header">
                    <h2>Preferences</h2>
                    <button 
                        className="settings-exit-btn"
                        onClick={onExitPopUp}
                    >
                        <svg className="exit-icon" viewBox="0 0 100 100">
                            <line x1="10" x2="90" y1="10" y2="90"/>
                            <line x1="90" x2="10" y1="10" y2="90"/>
                        </svg>
                    </button>
                    
                </div>
                <div className="activity-settings-pop-up-body">
                        <div className="settings-body-row">
                            <div className="settings-option-text">
                                <label htmlFor="activity-settings-disable-time">
                                    Disable Time Reminders
                                </label>
                            </div>
                            <div className="settings-option-toggler">
                                <SwitchToggler 
                                    switchId={"activity-settings-disable-time"}
                                    switchActionLabel={"disableTimeReminders"}
                                    switchOnClick={onSwitchClick}
                                    switchOnAriaLabel={"disable-time-reminders"}
                                    switchOffAriaLabel={"enable-time-reminders"}
                                    switchOn = {settingsActive.disableTimeReminders ? true: false}
                                />
                            </div>
                        </div>
                        <div className="settings-body-row">
                            <div className="settings-option-text">
                                <label 
                                    htmlFor="activity-settings-disable-dnd"
                                >
                                    Disable Dragging
                                </label>
                                <span className="settings-option-note">
                                    Note: This is automatically disabled on small screens
                                </span>
                            </div>
                            <div className="settings-option-toggler">
                                <SwitchToggler 
                                    switchId={"activity-settings-disable-dnd"}
                                    switchActionLabel={"disableDnD"}
                                    switchOnClick={onSwitchClick}
                                    switchOnAriaLabel={"disable-dragging"}
                                    switchOffAriaLabel={"enable-dragging"}
                                    switchOn = {settingsActive.disableDnD ? true: false}
                                />
                            </div>
                        </div>
                        <div className="settings-body-row">
                            <div className="settings-option-text">
                                <label
                                    htmlFor="activity-disable-auto-pop-ups"
                                >Disable Automatic Pop Ups
                                </label>
                                <span className="settings-option-note">
                                    Note: You will still be able to view pop ups, 
                                    but you must manually toggle them.
                                </span>
                            </div>
                            <div className="settings-option-toggler">
                                <SwitchToggler 
                                    switchId={"activity-disable-auto-pop-ups"}
                                    switchActionLabel={"disableAutoPopUps"}
                                    switchOnClick={onSwitchClick}
                                    switchOnAriaLabel={"disable-automatic-pop-ups"}
                                    switchOffAriaLabel={"enable-automatic-pop-ups"}
                                    switchOn = {settingsActive.disableAutoPopUps ? true: false}
                                />
                            </div>
                        </div>
                        <button className="settings-save-btn">Save</button>
                </div>
            </div>
    </PopUpBg> 
    )
}

export default ActivitySettings
