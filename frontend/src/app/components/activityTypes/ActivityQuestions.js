import MultipleChoiceApp from "./MultipleChoice/MultipleChoiceApp"
import ShortAnswerApp from "./ShortAnswer/ShortAnswerApp"
import SortActivityApp from "./SortActivity/SortActivityApp"
import MatchActivityApp from "./MatchActivity/MatchActivityApp"
import LabelPicturesApp from "./LabelPictures/LabelPicturesApp"

const ActivityQuestions = (props) =>{
    const activityType = props.activityData[props.activityKey].type
    const newProps = {
        ...props, 
        activityData: props.activityData[props.activityKey],
        activityID: props.activityData.activityID,
    }
    const activityMap = {
        sort: <SortActivityApp {...newProps} />,
        matching: <MatchActivityApp {...newProps} />,
        shortAnswer: <ShortAnswerApp {...newProps} />,
        multipleChoice: <MultipleChoiceApp {...newProps} />,
        labelPictures: <LabelPicturesApp {...newProps} />
    }
    return(
        <div style={props.style} className="flex-grow-1 question-transition-container d-flex flex-column">
            {//load specific activity
                activityMap[activityType]
            }
        </div>
    )
}
export default ActivityQuestions
