import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPopUpOff } from '../../../../redux/features/activityTypes/activitiesSlice'
import ActivityHeader from '../ActivityHeader'
import MultipleChoiceItem from './MultipleChoiceItem'

/*
    Frontend:
    1. Missing re-rendering logic, when user answers question and moves on to the next one.
        - Included here is also rendering animation
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/

const MultipleChoiceApp = ({
    activityData, 
    questionNum, 
    activityID, 
    smallWindowWidth,
    mediumWindowWidth,
    moreInfoOnClick, 
    resetBtnOnClick
}) => {    
    //for updating redux store(data to be sent to backend)
    const [data, setData] = useState(activityData)
    //redux states
    const dispatch = useDispatch()
    const resetPopUp = useSelector((state) => state.activities.resetPopUp)
    console.log(resetPopUp)
    //reset answer
    useEffect(() =>{
        if(resetPopUp && resetPopUp.confirmed){
            //reset all state values to default
            setData(state => ({
                ...state, 
                clientAnswer: "",
            }))
            dispatch(resetPopUpOff())
            //remove any saved data from local storage
            localStorage.removeItem(`${activityID}-mc_activity_client_answer-${questionNum}`)        
        }
    }, [dispatch, resetPopUp, activityData, activityID, questionNum])

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
        const id = e.target.closest("input").id.match(/\d+/)
        setData(state =>({
            ...state,
            clientAnswer: parseInt(id) 
        })) 
        localStorage.setItem(`${activityID}-mc_activity_client_answer-${questionNum}`, id.toString())
    }
    return(
        <>
        <form className = "mc-activity-input-container d-flex align-items-center justify-content-center flex-grow-1">
            <div className = "px-2 pb-2">
                <ActivityHeader
                    data = {data}
                    smallWindowWidth = {smallWindowWidth}
                    resetBtnOnClick = {resetBtnOnClick}
                    questionNum = {questionNum}
                />

                <div className = {`d-flex ${mediumWindowWidth? "justify-content-between align-items-center": "flex-column"}`}>
                    {!mediumWindowWidth? 
                            <div className="mc-activity-question">{data.question}</div>
                    : null}
                    {data.imageURL && !mediumWindowWidth? 
                        <div className="mc-activity-image-container portrait-mode w-100">
                            <img 
                                className = "mc-activity-image"
                                src={data.imageURL}
                                alt={data.imageDescription? data.imgDescription : null}
                            /> 
                        </div> 
                    : null}
                    <div>   
                        {mediumWindowWidth? 
                            <div className="mc-activity-question">{data.question}</div>
                        : null}
                        <div className={`w-100 mc-activity-answer-container${!mediumWindowWidth ?" portrait-mode":""}`}>
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
                    </div>
                    {data.imageURL &&  mediumWindowWidth? 
                        <div className="mc-activity-image-container landscape-mode">
                            <img 
                                className = "mc-activity-image"
                                src={data.imageURL}
                                alt={data.imageDescription? data.imgDescription : null}
                            /> 
                        </div> 
                    : null} 
                </div>
            </div>   
        </form>
    </>
    )
} 
export default MultipleChoiceApp

