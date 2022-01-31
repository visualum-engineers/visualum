import { useSelector } from "react-redux"
import { useState } from "react"
import PopUpBg from "../../utilities/popUp/PopUpBackground"
import { 
    ActivityNameInput,
    ActivityDescription,
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
                        </div>
                        <div className="activity-creation-edit-pop-up-body"> 
                            <ActivityNameInput />
                            <ActivityDescription />
                        </div>
                    </div>

                   
                    
                </PopUpBg>
            }
        </>
        
    )  
}  
export default ActivityCreationOverallPopUp