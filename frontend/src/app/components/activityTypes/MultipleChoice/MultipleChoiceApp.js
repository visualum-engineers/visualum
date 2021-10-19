import React, {useState} from 'react'
/*
    Frontend:
    1. Missing re-rendering logic, when user answers question and moves on to the next one.
        - Included here is also rendering animation
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/

const MultipleChoiceApp = ({activityData}) => {    
    //for updating redux store(data to be sent to backend)
    const [state, setState] = useState(activityData)
    const rows = state.answerChoices.length % 2 ===0 ? state.answerChoices.length/2 : Math.floor(state.answerChoices.length/2 + 1)
    const columns = 2
    if(rows*columns !== state.answerChoices.length){
        let newAnsList = [...state.answerChoices]
        for (let i=0; i<rows*columns-state.answerChoices.length; i++){
            newAnsList.push(null)
        }
        setState(state => ({
            ...state,
            answerChoices: newAnsList
        }))
    }
    console.log(state.imageURL ? state.imageURL : null)
    return(
        <form className = "MCInputContainer">
            <p>{state.question}</p>
            {state.imageURL ? 
                <img 
                    className = "mc-activity-image"
                    src={state.imageURL}
                    alt={state.imageDescription? state.imgDescription : null}
                /> 
            : null
            } 
            {/*renders different answer choices*/}
            {Array(rows).fill(0).map((content, rowIndex) => {
                const startSlice = rowIndex*columns
                const endSlice = (rowIndex+1)*columns
                return (
                    <div className="row g-0 justify-content-center" key={rowIndex}>
                        {state.answerChoices.slice(startSlice, endSlice).map((choice, index)=>{
                            if(!choice) return <div key="index" className="col-5 col-md-4 empty-mc-item"></div>
                            return(
                                <div key={index} className="mc-answer-choice col-5 col-md-4">
                                    <input 
                                        id={"mc-answer-choice"+(rowIndex*columns+index)} 
                                        type="radio" 
                                        name="MCOptions"/>
                                    <label 
                                        htmlFor={"mc-answer-choice"+(rowIndex*columns+index)} 
                                        className="w-100 d-flex align-items-center justify-content-center">
                                            {choice}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                )})
            }
        </form>
    )
} 
export default MultipleChoiceApp

