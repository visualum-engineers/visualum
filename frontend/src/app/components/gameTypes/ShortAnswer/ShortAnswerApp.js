import React, {useState} from 'react'
const activityData = {
    "1": "What faces this world?"
}
const ShortAnswerApp = () => {
    const [state, setState] = useState(activityData)
    const [question, setQuestion] = useState(1)
    const onClick = () => {
        setQuestion(state + 1)
    }
    return(
        <div className = "shortAnswerApp flex-column">
            <div className = "SAQuestion">
                <p>{state[question]}</p>  
            </div>
             <div className = "SAInputContainer form-floating">
                <textarea className="form-control" placeholder="Type your answer here" id="SAtextArea"> </textarea>
                <label for ="SAtextArea">Type your answer here</label>
             </div>
             <button onClick ={onClick}>Submit</button>
        </div>
    )
} 
export default ShortAnswerApp