import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useReduxDebouncedTextInputs } from "../../../../hooks"
import { updateQuestionData } from "../../../../../redux/features/activityCreation/activityCreationData"
import { useLayoutEffect, useState, useRef} from "react"
import onlyNumInput from "../../../../helpers/onlyNumInput"
const ActivityQuestionHeader = ({
    currQuestion,
    mediumWindowWidth,
    questionType,
    smallWindowWidth,
}) =>{
    const [pointActive, setPointActive] = useState(false)
    const [instructionsActive, setInstructionsActive] = useState(false)
    const [textareaHeight, setAreaHeight] = useState(null)
    const storedResize = useRef(null)
    const pointsActiveMaxChar = 3
    const instructionsMaxChar = 400;

    const [pointValue, setPointValue] = useReduxDebouncedTextInputs({
        selectorFunc:(state => state.activityCreation.data.saved.present.questions[currQuestion].pointValue),
        reduxUpdateFunc: updateQuestionData, 
        inputType: "input",
        charLimit: pointsActiveMaxChar,
        addedPayload: {
            type: questionType,
            questionNum: currQuestion,
            actionType: "update-points"
        }
    })
    
    const [instructionValue, setInstructionValue] = useReduxDebouncedTextInputs({
        selectorFunc: (state) => state.activityCreation.data.saved.present.questions[currQuestion].instructions,
        reduxUpdateFunc: updateQuestionData, 
        inputType: "textarea",
        charLimit: instructionsMaxChar,
        addedPayload:{
            type: questionType,
            questionNum: currQuestion,
            actionType: "update-instructions"
        }
    })
    useLayoutEffect (()=>{
        if(pointValue && !pointActive) setPointActive(true)
        if(instructionValue && !instructionsActive) setInstructionsActive(true) 
    }, [pointValue, instructionValue, pointActive, instructionsActive])
    return(
        <div className={`activity-creation-question-header`}>
            <div className="activity-creation-question-points">
                {pointActive ?
                    <div className="activity-creation-point-input">
                        <label htmlFor="question-points-input">Points:</label>
                        <input 
                            id = {"question-points-input"}
                            onChange={setPointValue}
                            value = {pointValue}
                            type={"number"}
                            onKeyDown = {onlyNumInput}
                            autoFocus={true}
                            maxLength={pointsActiveMaxChar}
                        />
                    </div>
                :   <button
                        aria-label = {"add-question-points"}
                        onClick = {() => setPointActive(true)}
                    >
                        <FontAwesomeIcon icon={faPlus}/>
                        <span>Points</span>
                    </button>
                }
                
            </div>
            <div className="activity-creation-question-instructions">
                {instructionsActive ? 
                    <textarea 
                        style = {{height : textareaHeight && storedResize.current ? textareaHeight: ""}}
                        onChange={setInstructionValue}
                        value = {instructionValue}
                        autoFocus={true}
                        onFocus = {(e)=>{
                            if(storedResize.current) setAreaHeight(storedResize.current)
                        }}
                        onBlur = {(e) => {
                            if(e.target.style.height) storedResize.current = e.target.style.height
                            e.target.style.height = ""
                            setAreaHeight(null)
                        }}
                        maxLength = {instructionsMaxChar}
                    />
                : 
                <button
                    aria-label = {"add-question-instructions"}
                    onClick = {() =>setInstructionsActive(true)}
                >
                    <FontAwesomeIcon icon ={faPlus}/>
                    <span>Question Instructions</span>
                </button>
                }
            </div>
    </div>
    )
}
export default ActivityQuestionHeader