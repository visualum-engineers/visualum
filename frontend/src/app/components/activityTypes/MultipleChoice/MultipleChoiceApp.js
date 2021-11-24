import React, {useEffect, useState} from 'react'
import MultipleChoiceItem from './MultipleChoiceItem'
//import useWindowWidth from '../../../hooks/use-window-width'
/*
    Frontend:
    1. Missing re-rendering logic, when user answers question and moves on to the next one.
        - Included here is also rendering animation
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/

const MultipleChoiceApp = ({activityData, questionNum, activityID, mediumWindowWidth}) => {    
    //for updating redux store(data to be sent to backend)
    const [data, setData] = useState(activityData)
    //find any data stored in local storage
    useEffect(() => {
        const stored_selected_answer = localStorage.getItem(`${activityID}-mc_activity_client_answer-${questionNum}`)
        if(stored_selected_answer){
            setData(state =>({
                ...state,
                clientAnswer: parseInt(stored_selected_answer) 
            })) 
        }
    }, [activityID, questionNum])
    const rows = data.answerChoices.length % 2 ===0 ? data.answerChoices.length/2 : Math.floor(data.answerChoices.length/2 + 1)
    const columns = 2
    if(rows*columns !== data.answerChoices.length){
        let newAnsList = [...data.answerChoices]
        for (let i=0; i<rows*columns-data.answerChoices.length; i++){
            newAnsList.push(null)
        }
        setData(state => ({
            ...state,
            answerChoices: newAnsList
        }))
    }
    const updateAnswerChoice = (e) =>{
        console.log(document.getElementById(e.target.dataset.updateAnswerChoice))
        const id = e.target.closest("input").id.match(/\d+/)
        setData(state =>({
            ...state,
            clientAnswer: parseInt(id) 
        })) 
        localStorage.setItem(`${activityID}-mc_activity_client_answer-${questionNum}`, id.toString())
    }
    return(
        <div className="d-flex justify-content-center">
            <form className = "mc-activity-input-container d-flex flex-column align-items-center">
                <div className="mc-activity-question">{data.question}</div>
                <div className = "d-flex justify-content-center align-items-start">
                    <div className="d-flex flex-column justify-content-center w-100">
                        {data.imageURL &&  !mediumWindowWidth? 
                            <div className="mc-activity-image-container portrait-mode w-100">
                                <img 
                                    className = "mc-activity-image"
                                    src={data.imageURL}
                                    alt={data.imageDescription? data.imgDescription : null}
                                /> 
                            </div> 
                        : null
                        } 
                        {/*renders different answer choices*/}
                        {!mediumWindowWidth ? 
                            Array(rows).fill(0).map((content, rowIndex) => {
                                const startSlice = rowIndex*columns
                                const endSlice = (rowIndex+1)*columns
                                return (
                                    <div className="d-flex w-100" key={rowIndex}>
                                        {data.answerChoices.slice(startSlice, endSlice).map((choice, index)=>{
                                            if(!choice) return <div key="index" className="mc-activity-mc-item w-100 grid-layout empty-mc-item"></div>
                                            return(
                                                <MultipleChoiceItem
                                                    key={choice}
                                                    index={rowIndex*columns+index} 
                                                    data ={data} 
                                                    choice={choice} 
                                                    updateAnswerChoice={updateAnswerChoice} 
                                                    customContainerClass = "mc-activity-mc-item grid-layout w-100" 
                                                />
                                            )
                                        })}
                                </div>
                            )})
                        : data.answerChoices.map((choice, index)=>{
                                if(!choice) return null
                                return(
                        
                                        <MultipleChoiceItem
                                            key = {choice}
                                            index={index} 
                                            data ={data} 
                                            choice={choice} 
                                            updateAnswerChoice={updateAnswerChoice} 
                                            customContainerClass = "w-100 mc-activity-mc-item" 
                                        />
                                )
                            })
                        }
                    </div>
                    {data.imageURL &&  mediumWindowWidth? 
                        <div className="mc-activity-image-container landscape-mode">
                            <img 
                                className = "mc-activity-image"
                                src={data.imageURL}
                                alt={data.imageDescription? data.imgDescription : null}
                            /> 
                        </div> 
                    : null
                    } 
                </div>
            </form>
        </div>
    )
} 
export default MultipleChoiceApp

