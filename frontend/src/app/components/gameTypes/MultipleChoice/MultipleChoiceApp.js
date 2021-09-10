import React, {useState} from 'react'
import ActivityBtns from '../NavActivityBtn/ActivityBtns'

const activityData = {
    "1":{
            question: "What faces this world?",
            answerChoices: ["Good What faces this world", "Bad", "No"]
        }
}
const MultipleChoiceApp = ({last=false, onClick}) => {    
    const [state] = useState(activityData)
    const prevQuestion = Object.keys(activityData)[0] === "1" ? false : true
    const lastQuestion = last
    const currQuestion = Object.keys(state)[0]
    return(
        <div className = "multipleChoiceApp d-flex justify-content-center">
            <div className = "d-flex flex-column align-items-center col-9 col-md-6 col-xl-4 flex-column">
                <div className = "MCQuestion">
                    <p>{state[currQuestion].question}</p>  
                </div>
                <form className = "MCInputContainer d-flex flex-wrap w-100">
                    {state[currQuestion].answerChoices.map((choice, index)=>{
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
                    onClick = {onClick}
                    />
            </div>
        </div>
    )
} 
export default MultipleChoiceApp