import React, {useState} from 'react'
const activityData = {
    "1": "What faces this world?"
}
const MultipleChoiceApp = () => {    
    const [state, setState] = useState(activityData)
    const [question, setQuestion] = useState(1)
    const onClick = () => {
        setQuestion(state + 1)
    }
    return(
        <div className = "multipleChoiceApp flex-column">
            <div className = "MCQuestion">
                <p>{state[question]}</p>  
            </div>
            <div className = "MCInputContainer">
                
            </div>
            <button onClick ={onClick}>Submit</button>
        </div>
    )
} 
export default MultipleChoiceApp