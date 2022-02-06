import SortActivityCreation from "../SortActivity/SortActivityCreation"
import MatchActivityCreation from "../MatchActivity/MatchActivityCreation"
import ShortAnswerCreation from "../ShortAnswer/ShortAnswerCreation"
import ControlledInputsCreation from "../ControlledInputs/ControlledInputsCreation"
import LabelPicturesCreation from "../LabelPictures/LabelPicturesCreation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
const ActivityCreationQuestion = (props) =>{
    const activityMap = {
        sort: <SortActivityCreation {...props} />,
        matching: <MatchActivityCreation {...props} />,
        shortAnswer: <ShortAnswerCreation {...props} />,
        radio: <ControlledInputsCreation {...props}  />,
        checkbox: <ControlledInputsCreation {...props} inputType = "checkbox" />,
        labelPictures: <LabelPicturesCreation {...props} />
    }
    return (
        <div className={`activity-creation-question` 
                    +`${props.preview ? " preview-slide":""}`
                }>
            <div className={`activity-creation-question-header`}>
                <div className="activity-creation-question-points">
                    <button>
                        <FontAwesomeIcon icon={faPlus}/>
                        <span>Points</span>
                    </button>
                </div>
                <div className="activity-creation-question-description">
                    <button>
                        <FontAwesomeIcon icon ={faPlus}/>
                        <span>Question Instructions</span>
                    </button>
                </div>
            </div>
            <div className="activity-creation-question-body">
                {activityMap["sort"]}
                
            </div>
        </div>
    )
}

export default ActivityCreationQuestion