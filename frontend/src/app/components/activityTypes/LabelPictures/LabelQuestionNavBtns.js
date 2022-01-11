import GeneralBtn from "../../utilities/generalBtn/GeneralBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import usePopUp from "../../../hooks/use-pop-up";
import TrianglePointer from "../../utilities/trianglePointer/TrianglePointer";
const LabelQuestionNavBtns = ({
    totalQuestions,
    currQuestion,
    onClick
}) =>{
    const [leftNavOver, setLeftNavOver] = usePopUp({})
    const [rightNavOver, setRightNavOver] = usePopUp({})
    const leftIcon = <FontAwesomeIcon icon={faChevronLeft}/> 
    const rightIcon = <FontAwesomeIcon icon = {faChevronRight} /> 
    const questionPos = totalQuestions - 1 - currQuestion
    return (
    <div 
        className="label-pic-activity-question-nav-btns"
    >
        {questionPos < totalQuestions - 1 ? 
            <div className="label-pic-activity-question-nav-left">
                <TrianglePointer
                    dropDownActive = {leftNavOver}
                    textContent={"Previous Question"}
                    customClassName={"question-nav-pointer-container"}
                    pointerDown={true}
                />
                <GeneralBtn 
                    onClick={onClick}
                    customAriaLabel = {"prev-question"}
                    customIcon = {leftIcon}
                    onMouseEnter={setLeftNavOver}
                    onMouseLeave={setLeftNavOver}
                />  
            </div>
            : <div 
                className="label-pic-activity-nav-btn-placeholder"
                onMouseLeave={setLeftNavOver}
            ></div>
        }
        {questionPos > 0 ?
            <div className="label-pic-activity-question-nav-right">
                <TrianglePointer 
                    dropDownActive = {rightNavOver}
                    textContent={"Next Question"}
                    customClassName={"question-nav-pointer-container"}
                    pointerDown={true}
                />
                <GeneralBtn 
                    onClick={onClick}
                    customAriaLabel = {"next-question"}
                    customIcon = {rightIcon}
                    onMouseEnter={setRightNavOver}
                    onMouseLeave={setRightNavOver} 
                />
            </div>
            : <div 
                className="label-pic-activity-nav-btn-placeholder"
                onMouseLeave={setRightNavOver}
            ></div>
        }
    </div>
    )
}
export default LabelQuestionNavBtns