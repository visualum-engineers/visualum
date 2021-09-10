import React, {useState} from 'react'
import NavActivityBtn from '../NavActivityBtn/NavActivityBtn'
/*
    Frontend:
    1. Missing re-rendering logic, when user answers question and moves on to the next one.
        - Included here is also rendering animation
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/
const activityData = {
    1: "What faces this world?",
    2: "What faces me?"
}
const ShortAnswerApp = ({last = false, onClick}) => {
    const [state] = useState(activityData)
    const prevQuestion = Object.keys(activityData)[0] === "1" ? false : true
    const lastQuestion = last
    return(
        <div className="shortAnswerApp d-flex justify-content-center">
            <div className = "d-flex flex-column align-items-center col-9 col-md-6 col-xl-4 ">
                <div className = "SAQuestion ">
                    <p>{state[Object.keys(state)[0]]}</p>  
                </div>
                <div className="SAInputContainer form-floating w-100">
                    <textarea 
                        className="form-control" 
                        placeholder="Type your answer here" 
                        id="SAtextArea">
                    </textarea>
                    <label htmlFor="SAtextArea">Type your answer here</label>
                </div>
                {/*loads appropriate btns depending if 
                    1. There are prev questions
                    2. This is the last questions */}
                <div className = {`w-100 d-flex ${!prevQuestion ? "justify-content-end":"justify-content-between"}`}>
                    {prevQuestion ? <NavActivityBtn onClick = {onClick} prev={prevQuestion}/>: null}
                    <NavActivityBtn onClick = {onClick} last={lastQuestion}/>
                </div>
            </div>
        </div>
    )
} 
export default ShortAnswerApp