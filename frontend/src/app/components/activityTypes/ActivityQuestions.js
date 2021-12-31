import MultipleChoiceApp from "./MultipleChoice/MultipleChoiceApp"
import ShortAnswerApp from "./ShortAnswer/ShortAnswerApp"
import SortActivityApp from "./SortActivity/SortActivityApp"
import MatchActivityApp from "./MatchActivity/MatchActivityApp"
import LabelPicturesApp from "./LabelPictures/LabelPicturesApp"
const ActivityQuestions = (props) =>{
    const questionData = props.activityData[props.activityKey] 
    const questionType = props.activityData[props.activityKey].type
    const newProps = {
        ...props, 
        activityData: questionData,
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
                activityMap[questionType]
            }
        </div>
    )
}
export default ActivityQuestions
