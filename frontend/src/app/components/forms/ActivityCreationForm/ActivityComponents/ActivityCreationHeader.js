import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
//import { useState } from "react"
import { useReduxDebouncedTextInputs } from "../../../../hooks"
import { updateQuestionData } from "../../../../../redux/features/activityCreation/activityCreationData"
import { useLayoutEffect, useState } from "react"
const ActivityQuestionHeader = ({
    currQuestion,
    mediumWindowWidth,
    questionType,
    smallWindowWidth,
}) =>{
    const [pointActive, setPointActive] = useState(false)
    const [instructionsActive, setInstructionsActive] = useState(false)
    
    const [pointValue, setPointValue] = useReduxDebouncedTextInputs({
        selectorFunc:(state => state.activityCreation.data.saved.present.questions[currQuestion].pointValue),
        reduxUpdateFunc: updateQuestionData, 
        inputType: "input",
        charLimit: 3,
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
        charLimit: 300,
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
                    <textarea 
                        onChange={setPointValue}
                    />
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
                        onChange={setInstructionValue}
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