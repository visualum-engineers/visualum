import ShortAnswerInstructions from "../ShortAnswer/ShortAnswerInstructions"
import SortActivityInstructions from "../SortActivity/SortActivityInstructions"
import MatchActivityInstructions from "../MatchActivity/MatchActivityInstructions"
import RadioInstructions from "../ControlledInputs/Radio/RadioInstructions"
import CheckboxInstructions from "../ControlledInputs/Checkbox/CheckboxInstructions"
import LabelActivityInstructions from "../LabelPictures/LabelActivityInstructions"
import PopUp from "../../utilities/popUp/PopUpBackground"
import { useSelector } from "react-redux"
import ExitIcon from "../../utilities/exitIcon/ExitIcon"
import { RootState } from "../../../../redux/store"
const ActivityInstructions = ({
    activityType, 
    activityInstructions, 
    moreInfoOnClick,
    popUpBgStyles,
}:any) => {
    const dndEnabled = useSelector((state: RootState) => state.activities.settings.dndEnabled)
    const newProps = {
        dndEnabled: dndEnabled, 
        activityInstructions: activityInstructions
    }
    const instructionsMap:any = {
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
                        <ExitIcon />
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