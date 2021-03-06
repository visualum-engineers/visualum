import PopUpBg from "../../utilities/popUp/PopUpBackground"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { 
    enableSettings, 
    disableSettings, 
    changeTimeDuration 
} from "../../../../redux/features/activityTypes/activitiesSettings"
import { unstable_batchedUpdates } from "react-dom"
import SwitchToggler from "../../utilities/switchToggler/SwitchToggler"
import onlyNumInput from "../../../helpers/onlyNumInput"
import ExitIcon from "../../utilities/exitIcon/ExitIcon"
import { RootState } from "../../../../redux/store"
const ActivitySettings = ({
    onExitPopUp,
    smallWindowWidth 
}: any) =>{
    const dispatch = useDispatch()
    const disableDnD = useSelector((state: RootState) => state.activities.settings.dndEnabled) 
    const disableTimeReminders = useSelector((state: RootState) => state.activities.settings.timeRemindersEnabled)
    const disableAutoPopUps = useSelector((state: RootState) => state.activities.settings.autoPopUpsEnabled)
    const timeIntervalDuration = useSelector((state: RootState) => state.activities.settings.timeIntervalDuration)
    const [timeDuration, setTimeDuration] = useState(timeIntervalDuration)
    const [timeDurationErr, setTimeDurationErr] = useState<any>(null)
    const [settingsActive, setSettingsActive] = useState<any>({
        dndEnabled : disableDnD,
        timeRemindersEnabled : disableTimeReminders,
        autoPopUpsEnabled : disableAutoPopUps, 
    })
    //to save changes upon re-opening settings pop up again
    useEffect(() => {
        let isMounted = true
        if(isMounted){
            unstable_batchedUpdates(()=>{
                if(!isMounted) return
                setSettingsActive({
                    dndEnabled : disableDnD,
                    timeRemindersEnabled : disableTimeReminders,
                    autoPopUpsEnabled : disableAutoPopUps , 
                })
                setTimeDuration(timeIntervalDuration)
            })
            
        }
        return () => {isMounted = false}
    }, [disableDnD, disableTimeReminders, disableAutoPopUps, timeIntervalDuration])
    const onSaveBtnClick = () =>{
            if(timeDurationErr) return
            let disabledSettings:any = []
            let enabledSettings:any = []
            Object.keys(settingsActive).map((value)=>{
                if(settingsActive[value]) enabledSettings.push(value)
                if(!settingsActive[value]) disabledSettings.push(value)
                //onyl if we arent on mobile, and we're dealing with dnd setting
                if(value ==="dndEnabled" && smallWindowWidth) {
                    if(settingsActive[value]) enabledSettings.push("userSetDnDEnabled")
                    if(!settingsActive[value]) disabledSettings.push("userSetDnDEnabled")
                }
                return null
            })
            const checkTimeInterval = timeIntervalDuration !== timeDuration 
                                        && settingsActive.timeRemindersEnabled 
                                        && (timeDuration.toString() !== "0" )
            //save time interval if this is enabled
            if(checkTimeInterval) dispatch(changeTimeDuration(timeDuration))

            //update enabled or disabled settings
            unstable_batchedUpdates(()=>{
                dispatch(enableSettings(enabledSettings))
                dispatch(disableSettings(disabledSettings))
                onExitPopUp()
            })
    }
    const onSwitchClick = (e: any) =>{
        if (e.type ==="click" || (e.type ==="keydown" && e.key === "Enter")) {
            const target = e.target.closest("input")
            if(!target) return
            const actionLabel = target.dataset.actionLabel
            const newState = {...settingsActive}
            if(settingsActive[actionLabel]) newState[actionLabel] = false
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
                           <ExitIcon />
                        </button>
                    </div>
                    <div className="activity-settings-pop-up-body">
                            <div className={`settings-body-row`
                                            + `${settingsActive.timeRemindersEnabled ? " activity-settings-time": ""}`}>
                                <div className="settings-option-text justify-content-center">
                                    <label htmlFor="activity-settings-disable-time">
                                        Disable Time Reminders
                                    </label>
                                </div>
                                <div className="settings-option-toggler">
                                    <SwitchToggler 
                                        switchId={"activity-settings-disable-time"}
                                        switchActionLabel={"timeRemindersEnabled"}
                                        switchOnClick={onSwitchClick}
                                        switchOnAriaLabel={"disable-time-reminders"}
                                        switchOffAriaLabel={"enable-time-reminders"}
                                        switchOn = {!settingsActive.timeRemindersEnabled}
                                    />
                                   
                                </div>
                            </div>
                            {settingsActive.timeRemindersEnabled &&
                                <div className="activity-settings-time-options">
                                    <div className="d-flex justify-content-between">
                                        <div className="settings-option-text w-50">
                                            <label className=" activity-settings-time-interval">
                                                How often do you want time reminders?
                                            </label>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <input
                                                type={"number"}
                                                className="activity-settings-time-interval-input"
                                                value={timeDuration/60/1000 === 0 ? "" : timeDuration/60/1000}
                                                onKeyDown={onlyNumInput}
                                                onChange={(e: any)=>{
                                                    const target = e.target.closest("input")                                                
                                                    const value = target.value
                                                    if(value.length > 2) return
                                                    setTimeDuration(value * 60 * 1000)
                                                    setTimeDurationErr(null)
                                                    //for validation
                                                    if(value.length === 0 || value==="0") setTimeDurationErr("You must set a time, or disable time reminders") 
                                                }}
                                            />
                                            <span>mins</span>
                                        </div>
                                    </div>
                                    
                                    {timeDurationErr && <div 
                                        className="alert alert-danger" 
                                        style={{textAlign: "center", marginTop: "0.5rem", marginBottom: 0}}
                                    >{timeDurationErr}
                                    </div>}
                                </div>
                            }
                            
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
                                        switchActionLabel={"autoPopUpsEnabled"}
                                        switchOnClick={onSwitchClick}
                                        switchOnAriaLabel={"disable-automatic-pop-ups"}
                                        switchOffAriaLabel={"enable-automatic-pop-ups"}
                                        switchOn = {!settingsActive.autoPopUpsEnabled}
                                    />
                                </div>
                            </div>
                            <div>
                            
                            </div>
                            <div className="settings-body-row">
                                <div className="settings-option-text">
                                    <label 
                                        htmlFor="activity-settings-disable-dnd"
                                    >
                                        Disable Dragging
                                    </label>
                                    <span className="settings-option-note">
                                        Note: Dragging is disabled on small screens. If disabled, you must tap and drop instead.
                                    </span>
                                </div>
                                <div className="settings-option-toggler">
                                    <SwitchToggler 
                                        switchId={"activity-settings-disable-dnd"}
                                        switchActionLabel={"dndEnabled"}
                                        switchOnClick={onSwitchClick}
                                        switchOnAriaLabel={"disable-dragging"}
                                        switchOffAriaLabel={"enable-dragging"}
                                        switchOn = {!settingsActive.dndEnabled}
                                        disabled={!smallWindowWidth}
                                    />
                                </div>
                            </div>
                            <button 
                                className="settings-save-btn"
                                onClick={onSaveBtnClick}
                            >Save
                            </button>
                    </div>
                </div>
        </PopUpBg> 
    )
}

export default ActivitySettings
