import {useSelector, useDispatch, batch } from "react-redux"
import PopUpBg from "../../../../utilities/popUp/PopUpBackground"
import ExitIcon from "../../../../utilities/exitIcon/ExitIcon"
import { createPortal } from "react-dom"
import { updateActivityEditPopUp } from "../../../../../../redux/features/activityCreation/activityCreationSettings"
import removeAddedWhiteSpace from "../../../../../helpers/removeWhiteSpace"
import {
    updateUnsavedActivityDescription,
    updateUnsavedActivityName,
    updateActivityName,
    updateActivityTimer,
    updateTopicLabels,
    updateActivityDescription
} from "../../../../../../redux/features/activityCreation/activityCreationData"
import { 
    ActivityNameInput,
    ActivityDescription,
    ActivityTimerInput,
    ActivityCreationImgInput,
    ActivityShareSettings,
    ActivityTopicLabels
} from "../index"
import { useEffect, useState } from "react"

const ActivityCreationOverallPopUp = ({
    smallWindowWidth,
    mediumWindowWidth
}) =>{
    const [activitySave, setOnSave] = useState(false)
    const activityPopUp = useSelector(state => state.activityCreation.settings.activityEditPopUp)
    const dispatch = useDispatch()
    //selector will only cause re-render when on save changes
    const unsavedData = useSelector(state => state.activityCreation.data.unsaved, ()=>!activitySave)
    useEffect(()=>{
        let isMounted = true
        if(activitySave && isMounted){
            const filteredName = removeAddedWhiteSpace(unsavedData.activityName)
            const filteredDescription =  removeAddedWhiteSpace(unsavedData.activityDescription)
            batch(()=>{
                dispatch(updateActivityName(filteredName))
                dispatch(updateActivityDescription(filteredDescription))
                dispatch(updateUnsavedActivityName(filteredName))
                dispatch(updateUnsavedActivityDescription(filteredDescription))
                dispatch(updateActivityTimer(unsavedData.activityTimer))
                dispatch(updateTopicLabels(unsavedData.activityTopicLabels))
                dispatch(updateActivityEditPopUp(false))
                setOnSave(false)
            })
        }
        return () => {isMounted = false}
    }, [dispatch, unsavedData, activitySave])
    const popUpBgStyles = {
        position: "fixed",
        top: "0",
        height: "calc(max(100%, 100vh))",
        zIndex: "5",
        left: "0",
        width: "100%",
        transition: "all 0.3s ease-out",
    }

    return(
        <>
            {activityPopUp &&
                createPortal(
                    <PopUpBg
                        aria-label="activity-description-pop-up"
                        onClick = {() => dispatch(updateActivityEditPopUp(false))}
                        containerStyles = {popUpBgStyles}
                    > 
                        <div className="activity-creation-edit-pop-up">
                            <div className="activity-creation-edit-pop-up-header">
                                <span>Edit Activity Details</span>
                                <button
                                    onClick={() => dispatch(updateActivityEditPopUp(false))}
                                >
                                    <ExitIcon />
                                </button>
                            </div>
                            <div className="activity-creation-edit-pop-up-body-container"> 
                                <div className="activity-creation-edit-pop-up-body">
                                    <div className={`d-flex w-100 ${!mediumWindowWidth? "flex-column align-items-center" : ""}`}>
                                        <ActivityCreationImgInput />
                                        <div className={`d-flex flex-column flex-grow-1 justify-content-between ${!mediumWindowWidth? "w-100" : ""}`}>
                                            <ActivityNameInput />
                                            <div className={`d-flex align-items-end flex-grow-1 ${!smallWindowWidth ? "flex-column":""}`}>
                                                <ActivityTopicLabels 
                                                smallWindowWidth={smallWindowWidth}
                                                />
                                                <ActivityTimerInput 
                                                    smallWindowWidth={smallWindowWidth}
                                                />
                                            
                                            </div>
                                        </div>
                                    </div>
                                    <ActivityShareSettings 
                                        smallWindowWidth={smallWindowWidth}
                                        mediumWindowWidth={mediumWindowWidth}
                                    />
                                    <ActivityDescription 
                                    
                                    />
                                    <button
                                        onClick = {()=>setOnSave(true)}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </PopUpBg>
                , document.body)
            }
        </>
    )  
}  
export default ActivityCreationOverallPopUp