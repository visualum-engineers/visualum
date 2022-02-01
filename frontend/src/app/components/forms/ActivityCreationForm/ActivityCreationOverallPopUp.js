import { useSelector } from "react-redux"
import { useState } from "react"
import PopUpBg from "../../utilities/popUp/PopUpBackground"
import ExitIcon from "../../utilities/exitIcon/ExitIcon"
import { 
    ActivityNameInput,
    ActivityDescription,
    ActivityTimerInput,
} from "./index"

const ActivityCreationOverallPopUp = () =>{
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
                                <div className="d-flex w-100">
                                    <div 
                                        className="activity-creation-img-upload"
                                    >
                                        <input
                                            id={"activity-creation-img-upload-btn"}
                                            htmlFor = {"activity-creation-img-file-input"}
                                            onClick={(e) => e.target.closest("input").nextElementSibling.click()} 
                                            type={"button"}
                                        />
                                        <input 
                                            id={"activity-creation-img-file-input"}
                                            type={"file"}
                                        />
                                    </div>
                                    <ActivityNameInput />
                                    <ActivityTimerInput />
                                </div>
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