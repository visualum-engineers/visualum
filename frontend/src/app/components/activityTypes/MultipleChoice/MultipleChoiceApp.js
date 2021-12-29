import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPopUpOff } from '../../../../redux/features/activityTypes/activitiesSlice';
import Zoomable from '../../utilityComponents/imageContainer/Zoomable';
import ImageContainer from '../../utilityComponents/imageContainer/ImageContainer';
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
                    {data.imageURL &&  !mediumWindowWidth &&
                        <Zoomable>
                            <ImageContainer 
                                defaultContainerClass = {`portrait-mode mc-activity-image-container`}
                                defaultImageClass = {"mc-activity-image"}
                                zoomContainerClass = {"mc-activity-image-container zoomed-in"}
                                zoomImageClass = {"mc-activity-image zoomed-in"}
                                popUpBgStyles = {popUpBgStyles}
                                src={data.imageURL}
                                alt={data.imageDescription}
                            />
                        </Zoomable>
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
                        <Zoomable>
                            <ImageContainer 
                                defaultContainerClass = {`landscape-mode mc-activity-image-container`}
                                defaultImageClass = {"mc-activity-image"}
                                zoomContainerClass = {"mc-activity-image-container zoomed-in"}
                                zoomImageClass = {"mc-activity-image zoomed-in"}
                                popUpBgStyles = {popUpBgStyles}
                                src={data.imageURL}
                                alt={data.imageDescription}
                            />
                        </Zoomable>
                    }
                </div>
            </div>   
        </form>
    </>
    )
} 
export default MultipleChoiceApp

