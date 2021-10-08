import React, {useState} from 'react'
/*
    Frontend:
    1. Missing re-rendering logic, when user answers question and moves on to the next one.
        - Included here is also rendering animation
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/

const ShortAnswerApp = ({activityData }) => {
    //for updating redux store(data to be sent to backend)
    const [state] = useState(activityData)
    
    return(
        <>
            <p className = "SAQuestion">{state.question}</p>  
            {/*renders text area that students can respond in*/}
            <div className="SAInputContainer form-floating w-100">
                <textarea 
                    className="form-control" 
                    placeholder="Type your answer here" 
                    id="SAtextArea">
                </textarea>
                <label htmlFor="SAtextArea">Type your answer here</label>
            </div>
        </>
    )
} 
export default ShortAnswerApp
