import {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPopUpOff } from '../../../../redux/features/activityTypes/activitiesSlice'
import ActivityHeader from '../ActivityHeader'
import ShortAnswerImage from './ShortAnswerImage'
import useResizable from '../../../hooks/use-resizable'
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
    const [
        textAreaPos, 
        onResizeStart, 
        onResizeMove, 
        onResizeEnd
    ] = useResizable({})

    const textAreaRef = useRef()
    const textResizeStart = useRef(false)
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
    const onResizeStartWrapper = (e) =>{
        textResizeStart.current = true
        onResizeStart({
            e: e,
            node: textAreaRef.current,
        })
    }
    const onResizeEndWrapper = (e) =>{
        textResizeStart.current = false
        onResizeEnd(e)
    }
    const textAreaHandleMove = (e) =>{
        if(!textResizeStart.current) return 
        onResizeMove({
            e: e, 
            handlePos: {
                south: true, 
                north: false, 
                east: false, 
                west: false
            },
        })
    }
    const textAreaHeight = {height: textAreaPos ? textAreaPos.height: null}
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
                className="d-flex flex-column align-items-center justify-content-center flex-grow-1"
                onMouseUp={onResizeEndWrapper} 
                onMouseMove={textAreaHandleMove}
                onTouchEnd={onResizeEndWrapper}
                onTouchMove={textAreaHandleMove} 
            >
                <div className="sa-activity-container d-flex flex-column align-items-center flex-grow-1">
                    <h2 className={"sa-activity-question"}> 
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
                    
                    {/*renders text area that students can respond in*/}
                    <div className="sa-activity-input-container d-flex justify-content-center flex-grow-1 w-100">
                        <div className="sa-activity-text-input form-floating w-100 d-flex flex-column">
                            <textarea
                                ref={textAreaRef} 
                                className="form-control" 
                                placeholder="Type your answer here" 
                                id="sa-activity-text"
                                onChange={handleInput}
                                value = {data.clientAnswer}
                                style={textAreaHeight}  
                            />
                            <label htmlFor="sa-activity-text">
                                Type your answer here
                            </label>
                            <button
                                onMouseDown={onResizeStartWrapper}
                                onTouchStart={onResizeStartWrapper}
                            >Handle</button>
                        </div>
                        
                    </div>
                </div>

            </div>
            
            
        </>
    )
} 
export default ShortAnswerApp
