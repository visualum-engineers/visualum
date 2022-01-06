import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPopUpOff } from '../../../../redux/features/activityTypes/activitiesSlice';
import MultipleChoiceImage from './MultipleChoiceImage';
import ActivityHeader from '../ActivityHeader'
//import PopUp from '../../popUp/PopUpBackground';
import MultipleChoiceColumn from './MultipleChoiceColumn';


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
    popUpBgStyles,
    moreInfoOnClick, 
    resetBtnOnClick
}) => {
    //for updating redux store(data to be sent to backend)
    const [data, setData] = useState(activityData)
    //redux states
    const dispatch = useDispatch()
    const resetPopUp = useSelector((state) => state.activities.resetPopUp)
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
        if(e.type === "keydown" && e.key !=="Enter") return  
        let id = e.target.closest("label")
        if (!e.target.closest("input") && !e.target.closest("label"))  return
        if (!id) id = e.target.closest("label")
        const answerId = id.dataset.updateAnswerChoice.match(/\d+/)[0]
        setData(state =>({
            ...state,
            clientAnswer: parseInt(answerId) 
        })) 
        localStorage.setItem(`${activityID}-mc_activity_client_answer-${questionNum}`, answerId.toString())
    }
    
    return(
        <>
        <ActivityHeader
            data = {data}
            smallWindowWidth = {smallWindowWidth}
            resetBtnOnClick = {resetBtnOnClick}
            questionNum = {questionNum}
            mediumWindowWidth={mediumWindowWidth}
        />
        <form className = "mc-activity-input-container d-flex align-items-center justify-content-center flex-grow-1">
            <div className = "px-2">
                <div className = {`d-flex ${mediumWindowWidth? "justify-content-between align-items-center": "flex-column"}`}>
                    {!mediumWindowWidth? 
                            <div className="mc-activity-question">{data.question}</div>
                    : null}
                    {data.imageURL &&  !mediumWindowWidth &&
                        <MultipleChoiceImage 
                            data = {data}
                            customClass={"portrait-mode"}
                            popUpBgStyles={popUpBgStyles}
                        />
                    }
                    <div>   
                        {mediumWindowWidth? 
                            <div className="mc-activity-question">{data.question}</div>
                        : null}
                        <MultipleChoiceColumn
                            mediumWindowWidth = {mediumWindowWidth}
                            data = {data}
                            columns = {columns}
                            rows = {rows}
                            updateAnswerChoice = {updateAnswerChoice}
                        />
                    </div>
                    {data.imageURL &&  mediumWindowWidth &&
                        <MultipleChoiceImage 
                            data = {data}
                            customClass={"landscape-mode"}
                            popUpBgStyles={popUpBgStyles}
                        />
                    }
                </div>
            </div>   
        </form>
    </>
    )
} 
export default MultipleChoiceApp

