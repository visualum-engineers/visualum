import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPopUpOff } from '../../../../redux/features/activityTypes/activitiesSlice'
import ActivityHeader from '../ActivityHeader'
/*
    Frontend:
    1. Missing re-rendering logic, when user answers question and moves on to the next one.
        - Included here is also rendering animation
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/

const ShortAnswerApp = ({
    smallWindowWidth, 
    resetBtnOnClick, 
    moreInfoOnClick,
    popUpBgStyles,
    activityData, 
    questionNum, 
    activityID,
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
            localStorage.removeItem(`${activityID}-SA_activity_client_answer-${questionNum}`)        
        }
    }, [dispatch, resetPopUp, activityData, activityID, questionNum])
    //grab data from local storage
    useEffect(() => {
        const stored_response = localStorage.getItem(`${activityID}-SA_activity_client_answer-${questionNum}`)
        if(stored_response) setData(state => ({
            ...state, 
            clientAnswer: stored_response
        }))
    }, [activityID, questionNum])

    const handleInput = (e) =>{
        const input_value = e.target.closest("textarea").value
        setData(state => ({
            ...state,
            clientAnswer: input_value 
        }))
        localStorage.setItem(`${activityID}-SA_activity_client_answer-${questionNum}`, input_value)
    }
    
    return(
        <>
            <ActivityHeader
                smallWindowWidth = {smallWindowWidth} 
                data = {data}
                resetBtnOnClick = {resetBtnOnClick} 
                questionNum = {questionNum}
            />
            <p className = "SAQuestion">{data.question}</p>  
            {/*renders text area that students can respond in*/}
            <div className = "d-flex justify-content-center">
                <div className="SAInputContainer form-floating w-75">
                    <textarea 
                        className="form-control" 
                        placeholder="Type your answer here" 
                        id="SAtextArea"
                        onChange={handleInput}
                        value = {data.clientAnswer}
                    >
                    </textarea>
                    <label htmlFor="SAtextArea">Type your answer here</label>
                </div>
            </div>
            
        </>
    )
} 
export default ShortAnswerApp
