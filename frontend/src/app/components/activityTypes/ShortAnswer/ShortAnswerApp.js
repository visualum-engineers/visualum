import React, {useState, useEffect} from 'react'
/*
    Frontend:
    1. Missing re-rendering logic, when user answers question and moves on to the next one.
        - Included here is also rendering animation
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/

const ShortAnswerApp = ({activityData, questionNum, activityID}) => {
    //for updating redux store(data to be sent to backend)
    const [state, setState] = useState(activityData)
    //grab data from local storage
    useEffect(() => {
        const stored_response = localStorage.getItem(`${activityID}-SA_activity_client_answer-${questionNum}`)
        if(stored_response) setState(state => ({
            ...state, 
            clientAnswer: stored_response
        }))
    }, [activityID, questionNum])

    const handleInput = (e) =>{
        const input_value = e.target.closest("textarea").value
        setState(state => ({
            ...state,
            clientAnswer: input_value 
        }))
        localStorage.setItem(`${activityID}-SA_activity_client_answer-${questionNum}`, input_value)
    }
    
    return(
        <>
            <p className = "SAQuestion">{state.question}</p>  
            {/*renders text area that students can respond in*/}
            <div className="SAInputContainer form-floating w-100">
                <textarea 
                    className="form-control" 
                    placeholder="Type your answer here" 
                    id="SAtextArea"
                    onChange={handleInput}
                    value = {state.clientAnswer}
                >
                </textarea>
                <label htmlFor="SAtextArea">Type your answer here</label>
            </div>
        </>
    )
} 
export default ShortAnswerApp
