import LabelQuestion from "./LabelQuestion"
const LabelQuestionTransition = (props) =>{
    const questionID = props.data.questions[props.questionIndex].id
    const questionContent = props.data.questions[props.questionIndex].content
    const newProps = {
        ...props,
        questionID: questionID,
        questionContent: questionContent,
        questionIndex: props.questionIndex,
    }
    return(
        <div
            style={props.style} 
            className="label-pic-question-transition-container d-flex flex-column align-items-center flex-grow-1 w-100"
        >
            <LabelQuestion {...newProps}/>
        </div>
    )
}
export default LabelQuestionTransition