import React, {useState} from 'react'
import ActivityBtns from '../NavActivityBtn/ActivityBtns';
/*
    Frontend:
    1. Missing re-rendering logic, when user answers question and moves on to the next one.
        - Included here is also rendering animation
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/

const ShortAnswerApp = ({last, prev, onNavBtnClick, activityData }) => {
    //for updating redux store(data to be sent to backend)
    const [state] = useState(activityData)
    
    //determine navigation buttons
    const prevQuestion = prev
    const lastQuestion = last
    return(
        <div className="shortAnswerApp d-flex justify-content-center">
            <div className = "d-flex flex-column align-items-center col-9 col-md-7 col-xl-6 ">
                <div className = "SAQuestion ">
                    <p>{state.question}</p>  
                </div>
                {/*renders text area that students can respond in*/}
                <div className="SAInputContainer form-floating w-100">
                    <textarea 
                        className="form-control" 
                        placeholder="Type your answer here" 
                        id="SAtextArea">
                    </textarea>
                    <label htmlFor="SAtextArea">Type your answer here</label>
                </div>

                <ActivityBtns 
                    prevQuestion = {prevQuestion} 
                    lastQuestion = {lastQuestion}
                    onNavBtnClick = {onNavBtnClick}
                />
            </div>
        </div>
    )
} 
export default ShortAnswerApp
