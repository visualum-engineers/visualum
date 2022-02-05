import SortActivityCreation from "../SortActivity/SortActivityCreation"
import MatchActivityCreation from "../MatchActivity/MatchActivityCreation"
import ShortAnswerCreation from "../ShortAnswer/ShortAnswerCreation"
import ControlledInputsCreation from "../ControlledInputs/ControlledInputsCreation"
import LabelPicturesCreation from "../LabelPictures/LabelPicturesCreation"
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
                <div className="activity-creation-points">

                </div>
                <div className="activity-creation-question-description">
                    
                </div>
            </div>
            <div className="activity-creation-question-body">
                {activityMap["sort"]}
                
            </div>
        </div>
    )
}

export default ActivityCreationQuestion