import ShortAnswerInstructions from "./ShortAnswer/ShortAnswerInstructions"
import SortActivityInstructions from "./SortActivity/SortActivityInstructions"
import MatchActivityInstructions from "./MatchActivity/MatchActivityInstructions"
import MultipleChoiceInstructions from "./MultipleChoice/MultipleChoiceInstructions"
import PopUp from "../utilityComponents/popUp/PopUpBackground"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
const ActivityInstructions = ({
    activityType, 
    activityInstructions, 
    dndEnabled, 
    moreInfoOnClick,
    popUpBgStyles,
}) => {
    return (
        <PopUp
            btnClassName="activity-popup-bg-exit-btn" 
            aria-label="exit-more-info"
            onClick={moreInfoOnClick}
            containerStyles = {popUpBgStyles}
        >
            <div className="activity-walkthrough-instructions col-11 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
                <header className="activity-walkthrough-instructions-header d-flex justify-content-between align-items-center"> 
                    <h1>Activity Instructions</h1>
                    <button 
                        onClick={moreInfoOnClick} 
                        aria-label="exit-more-info" 
                        className="d-flex align-items-center justify-content-center"
                    >
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </header>
                {activityType === "sort" ? <SortActivityInstructions 
                                                dndEnabled={dndEnabled}
                                                activityInstructions={activityInstructions}
                                            />
                : activityType === "matching" ? <MatchActivityInstructions
                                                    activityInstructions = {activityInstructions}
                                                    dndEnabled={dndEnabled}/>
                : activityType === "shortAnswer" ? <ShortAnswerInstructions 
                                                        activityInstructions={activityInstructions}/>
                : activityType === "multipleChoice"? <MultipleChoiceInstructions 
                                                        activityInstructions={activityInstructions}/>
                : null}
            </div>
        </PopUp>
    )
}
export default ActivityInstructions