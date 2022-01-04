import GeneralBtn from "../../utilities/generalBtn/GeneralBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const LabelQuestionNavBtns = ({
    totalQuestions,
    currQuestion,
    onClick
}) =>{
    const leftIcon = <FontAwesomeIcon icon={faChevronLeft}/> 
    const rightIcon = <FontAwesomeIcon icon = {faChevronRight} /> 
    const questionPos = totalQuestions - 1 - currQuestion
    return (
    <div 
        className="label-pic-activity-question-nav-btns"
    >
        {questionPos < totalQuestions - 1 &&
            <GeneralBtn 
                customClassName= {"label-pic-activity-question-nav-left"}
                onClick={onClick}
                customAriaLabel = {"prev-question"}
                customIcon = {leftIcon}

            />
        }
        {questionPos > 0 && 
            <GeneralBtn 
                customClassName= {"label-pic-activity-question-nav-right"}
                onClick={onClick}
                customAriaLabel = {"next-question"}
                customIcon = {rightIcon}
            />
        }
    </div>
    )
}
export default LabelQuestionNavBtns