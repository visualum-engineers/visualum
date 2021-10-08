import React, {useState} from 'react'
/*
    Frontend:
    1. Missing re-rendering logic, when user answers question and moves on to the next one.
        - Included here is also rendering animation
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/

const MultipleChoiceApp = ({activityData}) => {    
    //for updating redux store(data to be sent to backend)
    const [state] = useState(activityData)
    
    return(
        <>
            <p>{state.question}</p>  
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
        </>
    )
} 
export default MultipleChoiceApp

