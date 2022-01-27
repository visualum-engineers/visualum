import ShortAnswerInstructions from "./ShortAnswer/ShortAnswerInstructions"
import SortActivityInstructions from "./SortActivity/SortActivityInstructions"
import MatchActivityInstructions from "./MatchActivity/MatchActivityInstructions"
import RadioInstructions from "./ControlledInputs/Radio/RadioInstructions"
import CheckboxInstructions from "./ControlledInputs/Checkbox/CheckboxInstructions"
import LabelActivityInstructions from "./LabelPictures/LabelActivityInstructions"
import PopUp from "../utilities/popUp/PopUpBackground"
import { useSelector } from "react-redux"
const ActivityInstructions = ({
    activityType, 
    activityInstructions, 
    moreInfoOnClick,
    popUpBgStyles,
}) => {
    const dndEnabled = useSelector((state) => state.activities.settings.dndEnabled)
    const newProps = {
        dndEnabled: dndEnabled, 
        activityInstructions: activityInstructions
    }
    const instructionsMap = {
        sort: <SortActivityInstructions {...newProps}/>,
        matching: <MatchActivityInstructions {...newProps}/>,
        shortAnswer: <ShortAnswerInstructions {...newProps} />,
        radio: <RadioInstructions {...newProps}/>,
        checkbox: <CheckboxInstructions {...newProps}/>,
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
                        <svg className="exit-icon" viewBox="0 0 100 100">
                            <line x1="10" x2="90" y1="10" y2="90"/>
                            <line x1="90" x2="10" y1="10" y2="90"/>
                        </svg>
                        
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