import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPopUpOff } from '../../../../redux/features/activityTypes/activitiesSlice';
import ControlledInputsImage from './ControlledInputsImage';
import ControlledInputsColumn from './ControlledInputsColumn';
import ActivityHeader from '../ActivityHeader'

/*
    Frontend:
    1. Missing re-rendering logic, when user answers question and moves on to the next one.
        - Included here is also rendering animation
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/
const answerType = (inputType)=>{
    let inputAnswerType
    switch (inputType) {
        case "checkbox":
            inputAnswerType = "checkbox_activity_client_answer"
            break;
        default:
            inputAnswerType = "radio_activity_client_answer"
            break;
    }
    return inputAnswerType
} 
const ControlledInputsApp = ({
    inputType,
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
    const [data, setData] = useState({
        ...activityData, 
        clientAnswer: {}, 
    })
    //redux states
    const dispatch = useDispatch()
    const resetPopUp = useSelector((state) => state.activities.resetPopUp)
    //reset answer
    useEffect(() =>{
        if(resetPopUp && resetPopUp.confirmed){
            //reset all state values to default
            setData(state => ({
                ...state, 
                clientAnswer: {},
            }))
            dispatch(resetPopUpOff())
            //remove any saved data from local storage
            const inputAnswerType = answerType(inputType)
            localStorage.removeItem(`${activityID}-${inputAnswerType}-${questionNum}`)        
        }
    }, [dispatch, resetPopUp, activityData, activityID, questionNum, inputType])

    //find any data stored in local storage
    useEffect(() => {
        const inputAnswerType = answerType(inputType)
        const stored_selected_answer = localStorage.getItem(`${activityID}-${inputAnswerType}-${questionNum}`)
        if(stored_selected_answer){
            setData(state =>({
                ...state,
                clientAnswer: JSON.parse(stored_selected_answer)
            })) 
        }
    }, [activityID, questionNum, inputType])

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
    const updateRadioBtnChoice = (id) => {
        return {[id.dataset.updateAnswerChoice]: true}
    }
    const updateCheckboxChoice = (id) =>{
        const answserId = id.dataset.updateAnswerChoice
        const newData = {...data.clientAnswer}
        if(answserId.toString() in data.clientAnswer) delete newData[answserId]
        else newData[answserId] = true 
        return newData
    }
    const updateAnswerChoice = (e) =>{
        if(e.type === "keydown" && e.key !=="Enter") return 
        if (!e.target.closest("input") && !e.target.closest("label"))  return 
        let id = e.target.closest("input")
        if (!id) return
        let answerId
        switch(inputType){
            case "checkbox":
                answerId = updateCheckboxChoice(id)
                break 
            default:
                answerId = updateRadioBtnChoice(id)
                break 
        }

        //update data
        setData(state =>({
            ...state,
            clientAnswer: answerId 
        }))
        const inputAnswerType = answerType(inputType)
        localStorage.setItem(`${activityID}-${inputAnswerType}-${questionNum}`, JSON.stringify(answerId))
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
        <form className = "controlled-inputs-activity-container d-flex flex-grow-1">
            <div className = "controlled-inputs-activity d-flex flex-column justify-content-center flex-grow-1">
                <div 
                    className = {`d-flex`
                            + `${mediumWindowWidth && !data.imageURL ? " align-self-center w-50" : ""}` 
                            + `${mediumWindowWidth && data.imageURL ? " justify-content-between align-items-center": " flex-column"}`}
                >
                    {(!mediumWindowWidth || !data.imageURL) && 
                        <div 
                            className="controlled-inputs-activity-question portrait-mode"
                        >
                            {data.question}
                        </div>
                    }
                    {data.imageURL && !mediumWindowWidth &&
                        <ControlledInputsImage 
                            data = {data}
                            customClass={"portrait-mode"}
                            popUpBgStyles={popUpBgStyles}
                        />
                    }
                    
                    {data.imageURL &&  mediumWindowWidth &&
                        <div className="controlled-inputs-activity-question-container">
                            <div 
                                className="controlled-inputs-activity-question"
                            >
                                {data.question} 
                            </div>
                            <ControlledInputsImage 
                                data = {data}
                                customClass={"landscape-mode"}
                                popUpBgStyles={popUpBgStyles}
                            />
                        </div>
                    }
                    <div className={`controlled-inputs-activity-answer-column${!mediumWindowWidth || !data.imageURL ? " portrait-mode":""}`}>  
                        <ControlledInputsColumn
                            inputType = {inputType}
                            mediumWindowWidth = {mediumWindowWidth && data.imageURL}
                            smallWindowWidth = {smallWindowWidth}
                            data = {data}
                            columns = {columns}
                            rows = {rows}
                            updateAnswerChoice = {updateAnswerChoice}
                        />
                    </div>
                </div>
                
            </div>   
        </form>
    </>
    )
} 
export default ControlledInputsApp

/*


            */