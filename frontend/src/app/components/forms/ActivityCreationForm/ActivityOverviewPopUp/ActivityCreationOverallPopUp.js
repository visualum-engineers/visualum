import { useSelector, useDispatch } from "react-redux"
import PopUpBg from "../../../utilities/popUp/PopUpBackground"
import ExitIcon from "../../../utilities/exitIcon/ExitIcon"
import { createPortal } from "react-dom"
import { updateActivityEditPopUp } from "../../../../../redux/features/activityCreation/activityCreationSettings"
import { 
    ActivityNameInput,
    ActivityDescription,
    ActivityTimerInput,
    ActivityCreationImgInput,
    ActivityShareSettings,
    ActivityTopicLabels
} from "./index"

const ActivityCreationOverallPopUp = ({
    smallWindowWidth,
    mediumWindowWidth
}) =>{
    const activityPopUp = useSelector(state => state.activityCreation.settings.activityEditPopUp)
    const dispatch = useDispatch()

    const popUpBgStyles = {
        position: "fixed",
        top: "0",
        height: "calc(max(100%, 100vh))",
        zIndex: "4",
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
                        containerStyle = {popUpBgStyles}
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
                                    <ActivityDescription />
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