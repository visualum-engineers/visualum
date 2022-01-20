import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPopUpOff } from '../../../../redux/features/activityTypes/activitiesSlice'
import ActivityHeader from '../ActivityHeader'
import ShortAnswerImage from './ShortAnswerImage'
import ShortAnswerTextArea from './ShortAnswerTextArea'
import ConditionalWrapper from '../../utilities/conditionalWrapper/ConditionalWrapper'
/*
    Frontend:
    1. Missing re-rendering logic, when user answers question and moves on to the next one.
        - Included here is also rendering animation
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/

const ShortAnswerApp = ({
    mediumWindowWidth,
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
                mediumWindowWidth={mediumWindowWidth} 
                data = {data}
                resetBtnOnClick = {resetBtnOnClick} 
                questionNum = {questionNum}
            />
            <div
                className="sa-activity-container d-flex flex-column align-items-center justify-content-center flex-grow-1"
            >
                <div className={`sa-activity-inner-container d-flex flex-grow-1` 
                                + `${!mediumWindowWidth || !data.imageURL? " flex-column align-items-center ": ""} `}>

                    <ConditionalWrapper
                        condition={mediumWindowWidth && data.imageURL}
                        wrapper={children => <div className='sa-activity-question-wrapper'>{children}</div>}
                    >
                        <h2 className={`sa-activity-question${mediumWindowWidth && !data.imageURL ? " w-50":""}`}> 
                            {data.question}
                        </h2>
                        {data.imageURL &&
                            <div className="d-flex justify-content-center w-100"> 
                                <ShortAnswerImage 
                                    data = {data}
                                    popUpBgStyles={popUpBgStyles}
                                />
                            </div>
                        }
                    </ConditionalWrapper>
                    <div className={`sa-activity-input-container`
                                    + `${mediumWindowWidth && !data.imageURL ? " w-50 m-0" 
                                    : !mediumWindowWidth ? " portrait-size": ""}`}>
                        <ShortAnswerTextArea 
                            data={data}
                            handleInput={handleInput}
                        />
                    </div>
                </div>

            </div>
            
            
        </>
    )
} 
export default ShortAnswerApp
