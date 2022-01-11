import LabelQuestionNavBtns from "./LabelQuestionNavBtns"
const LabelQuestionColumnHeader = (props) =>{
    return(
        <div className="label-pic-question-header d-flex justify-content-between w-100 mb-2">
            <LabelQuestionNavBtns 
                totalQuestions = {props.data.questions.length}
                currQuestion={props.currQuestion}
                onClick={props.onClick}
            />
            <div className="label-pic-question-num-indicator d-flex align-items-center justify-content-center">
                <span>{props.currQuestion+1+"/"+props.questionData.length}</span>
            </div>
        </div>
    )
}
export default LabelQuestionColumnHeader