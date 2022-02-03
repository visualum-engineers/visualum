import { useSelector } from "react-redux"
import { useState } from "react"
import PopUpBg from "../../../utilities/popUp/PopUpBackground"
import ExitIcon from "../../../utilities/exitIcon/ExitIcon"
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
    const activityName = useSelector(state => state.activityCreation.data.activityName)
    const [activityPopUp, setActivityPopUp] = useState(!activityName)

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
                <PopUpBg
                    aria-label="activity-description-pop-up"
                    onClick = {() => setActivityPopUp(false)}
                    containerStyle = {popUpBgStyles}
                > 
                    <div className="activity-creation-edit-pop-up">
                        <div className="activity-creation-edit-pop-up-header">
                            <span>Edit Activity Details</span>
                            <button
                                onClick={()=> setActivityPopUp(false)}
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
                                            <ActivityTimerInput 
                                                smallWindowWidth={smallWindowWidth}
                                            />
                                           <ActivityTopicLabels 
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
            }
        </>
        
    )  
}  
export default ActivityCreationOverallPopUp