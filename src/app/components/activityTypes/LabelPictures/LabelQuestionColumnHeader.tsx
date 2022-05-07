import LabelQuestionNavBtns from "./LabelQuestionNavBtns"
import GeneralBtn from "../../utilities/generalBtn/GeneralBtn"
const LabelQuestionColumnHeader = (props: any) =>{
    return(
            <div className="label-pic-question-header d-flex justify-content-between w-100">
                <LabelQuestionNavBtns 
                    totalQuestions = {props.data.questions.length}
                    currQuestion={props.currQuestion}
                    onClick={props.onQuestionNavClick}
                    smallWindowWidth={props.smallWindowWidth}
                />
                <GeneralBtn
                    onClick={props.onOverviewClick}
                    customAriaLabel={"open-answers-overview"}
                    textContent={"Answers Overview"} 
                    customClassName={"label-pic-answers-overview-btn"}
                />
                <div className="label-pic-question-num-indicator d-flex align-items-center justify-content-center">
                    <span>{props.currQuestion+1+"/"+props.questionData.length}</span>
                </div>
            </div>

    )
}
export default LabelQuestionColumnHeader