import ControlledInputs from "../ControlledInputs/ControlledInputsApp"
import ShortAnswerApp from "../ShortAnswer/ShortAnswerApp"
import SortActivityApp from "../SortActivity/SortActivityApp"
import MatchActivityApp from "../MatchActivity/MatchActivityApp"
import LabelPicturesApp from "../LabelPictures/LabelPicturesApp"
const ActivityQuestions = (props: any) =>{
    const questionType = props.questions[props.activityKey].type
    const newProps = {
        ...props, 
        questionNum: props.activityKey,
    }

    const activityMap:any = {
        sort: <SortActivityApp {...newProps} />,
        matching: <MatchActivityApp {...newProps} />,
        shortAnswer: <ShortAnswerApp {...newProps} />,
        radio: <ControlledInputs {...newProps}  />,
        checkbox: <ControlledInputs {...newProps} inputType = "checkbox" />,
        labelPictures: <LabelPicturesApp {...newProps} />
    }
    return(
        <div 
            style={props.style} 
            className="flex-grow-1 question-transition-container d-flex flex-column"
        >
            <div className = "d-flex flex-column flex-grow-1" style={{paddingBottom: "23px"}}>
                {//load specific activity
                    activityMap[questionType]
                }
            </div>
            
        </div>
    )
}
export default ActivityQuestions
