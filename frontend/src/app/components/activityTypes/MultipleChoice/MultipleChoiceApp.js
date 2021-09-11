import React, {useState} from 'react'
import ActivityBtns from '../NavActivityBtn/ActivityBtns'
/*
    Frontend:
    1. Missing re-rendering logic, when user answers question and moves on to the next one.
        - Included here is also rendering animation
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/

const MultipleChoiceApp = ({last, prev, onNavBtnClick, activityData}) => {    
    const [state] = useState(activityData)
    //checks position of question, 
    //i.e is it the first or last question
    const prevQuestion = prev
    const lastQuestion = last
    
    return(
        <div className = "multipleChoiceApp d-flex justify-content-center">
            <div className = "d-flex flex-column align-items-center col-9 col-md-6 col-xl-4">
                <div className = "MCQuestion">
                    <p>{state.question}</p>  
                </div>
                <form className = "MCInputContainer d-flex flex-wrap w-100">
                    {/*renders different answer choices*/}
                    {state.answerChoices.map((choice, index)=>{
                        return(
                            <div key={index} className="ansOptionItem">
                                <input 
                                    id={"ansOption"+index} 
                                    type="radio" 
                                    name="MCOptions"/>
                                <label 
                                    htmlFor={"ansOption"+index} 
                                    className="w-100  d-flex align-items-center justify-content-center">
                                        {choice}
                                </label>
                            </div>
                        )
                    })}
                </form>
                {/*loads appropriate btns depending if 
                        1. There are prev questions
                        2. This is the last questions */}
                <ActivityBtns 
                    prevQuestion = {prevQuestion} 
                    lastQuestion = {lastQuestion}
                    onNavBtnClick = {onNavBtnClick}
                    />
            </div>
        </div>
    )
} 
export default MultipleChoiceApp