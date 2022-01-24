import {useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateActivityData } from '../../../../redux/features/activityTypes/activitiesData';
import ControlledInputsImage from './ControlledInputsImage';
import ControlledInputsColumn from './ControlledInputsColumn';
import { resetHistory } from '../activityHistoryFunc';

/*
    Frontend:
    1. Missing re-rendering logic, when user answers question and moves on to the next one.
        - Included here is also rendering animation
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/
const ControlledInputsApp = ({
    inputType,
    originalQuestionData,
    questionNum, 
    smallWindowWidth,
    mediumWindowWidth,
    popUpBgStyles,
    moreInfoOnClick, 
}) => {
    //for updating redux store(data to be sent to backend)
    const data = useSelector(state => state.activities.data.present.clientAnswerData.questions[questionNum])
    //redux states
    const dispatch = useDispatch()
    const resetPopUp = useSelector((state) => state.activities.settings.resetPopUp)
    //reset answer
    useEffect(() =>{
        if(resetPopUp && resetPopUp.confirmed){
            //reset all state values to default
            resetHistory({
                dispatch: dispatch,
                questionNum: questionNum,
                newState: {
                    ...originalQuestionData, 
                    clientAnswer: {},
                }
            })
        }
    }, [dispatch, resetPopUp, originalQuestionData, questionNum])
    //onMount
    //reset answer
    const isMount = useRef(false)
    useEffect(() =>{
        if(!isMount.current){
            isMount.current = true
            //reset all state values to default
            dispatch(updateActivityData({
                type: "singleQuestionUpdate",
                questionNum: questionNum,
                data: {...data, clientAnswer:{}}
            }))
        }
    }, [dispatch, data, questionNum])
    const rows = data.answerChoices.length % 2 ===0 ? data.answerChoices.length/2 : Math.floor(data.answerChoices.length/2 + 1)
    const columns = 2

    if(rows*columns !== data.answerChoices.length){
        let newAnsList = [...data.answerChoices]
        for (let i=0; i<rows*columns-data.answerChoices.length; i++){
            newAnsList.push(null)
        }
        dispatch(updateActivityData({
            type: "singleQuestionUpdate",
            questionNum: questionNum,
            data: {...data, answerChoices: newAnsList}
        }))
    }

    const updateRadioBtnChoice = (id) => {
        return {[id.dataset.updateAnswerChoice]: true}
    }
    const updateCheckboxChoice = (id) =>{
        const answserId = id.dataset.updateAnswerChoice
        if(!data.clientAnswer) return {[answserId] : true}
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
        const newState = {
            ...data,
            clientAnswer: answerId
        }      
        dispatch(updateActivityData({
            type: "singleQuestionUpdate",
            questionNum: questionNum,
            data: newState
        }))
    }
    
    if(!isMount.current) return <div></div>
    return(
        <>
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