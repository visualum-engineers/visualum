import React, {useState} from 'react'
import NavActivityBtn from '../NavActivityBtn/NavActivityBtn'
const activityData = {
    "1": "What faces this world?"
}
const MultipleChoiceApp = ({last=false, onClick}) => {    
    const [state] = useState(activityData)
    const prevQuestion = Object.keys(activityData)[0] === "1" ? false : true
    const lastQuestion = last
    return(
        <div className = "multipleChoiceApp d-flex justify-content-center">
            <div className = "d-flex flex-column align-items-center col-9 col-md-6 col-xl-4 flex-column">
                <div className = "MCQuestion">
                    <p>{state[Object.keys(state)[0]]}</p>  
                </div>
                <div className = "MCInputContainer">
                    
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
export default MultipleChoiceApp