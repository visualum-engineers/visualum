import ShortAnswerInstructions from "./ShortAnswer/ShortAnswerInstructions"
import SortActivityInstructions from "./SortActivity/SortActivityInstructions"
import MatchActivityInstructions from "./MatchActivity/MatchActivityInstructions"
import MultipleChoiceInstructions from "./MultipleChoice/MultipleChoiceInstructions"
import LabelActivityInstructions from "./LabelPictures/LabelActivityInstructions"
import PopUp from "../utilities/popUp/PopUpBackground"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
const ActivityInstructions = ({
    activityType, 
    activityInstructions, 
    dndEnabled, 
    moreInfoOnClick,
    popUpBgStyles,
}) => {
    const newProps = {
        dndEnabled: dndEnabled, 
        activityInstructions: activityInstructions
    }
    const instructionsMap = {
        sort: <SortActivityInstructions {...newProps}/>,
        matching: <MatchActivityInstructions {...newProps}/>,
        shortAnswer: <ShortAnswerInstructions {...newProps} />,
        multipleChoice: <MultipleChoiceInstructions {...newProps}/>,
        labelPictures: <LabelActivityInstructions {...newProps}/>
    }
    return (
        <PopUp
            btnClassName="activity-popup-bg-exit-btn" 
            aria-label="exit-more-info"
            onClick={moreInfoOnClick}
            containerStyles = {popUpBgStyles}
        >
            <div className="activity-walkthrough-instructions col-11 col-md-9 col-lg-7">
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
                {//load specific activity instructions
                    instructionsMap[activityType]
                }
            </div>
        </PopUp>
    )
}
export default ActivityInstructions