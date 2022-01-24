import { useEffect } from 'react'
import {unstable_batchedUpdates} from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import ActivityHeader from '../ActivityHeader'
import ShortAnswerImage from './ShortAnswerImage'
import ShortAnswerTextArea from './ShortAnswerTextArea'
import ConditionalWrapper from '../../utilities/conditionalWrapper/ConditionalWrapper'
import { resetHistory } from '../activityHistoryFunc'
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
    originalQuestionData,
    questionNum, 
}) => {
    //for updating redux store(data to be sent to backend)
    const data = useSelector((state) => state.activities.data.present.clientAnswerData.questions[questionNum])
    
    //redux states
    const dispatch = useDispatch()
    const resetPopUp = useSelector((state) => state.activities.settings.resetPopUp) 
    //reset answer
    useEffect(() =>{
        if(resetPopUp && resetPopUp.confirmed){
            //reset all state values to default
            unstable_batchedUpdates(()=>{
                resetHistory({
                    dispatch,
                    questionNum: questionNum,
                    newState: originalQuestionData
                })  
            })
            
        }
    }, [dispatch, resetPopUp, originalQuestionData, questionNum])
 

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
                            questionNum={questionNum}
                        />
                    </div>
                </div>

            </div>
            
            
        </>
    )
} 
export default ShortAnswerApp
