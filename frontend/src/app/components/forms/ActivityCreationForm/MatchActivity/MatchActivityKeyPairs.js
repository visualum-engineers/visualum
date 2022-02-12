import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { faEdit, faSave } from "@fortawesome/free-regular-svg-icons"
import { useDispatch } from "react-redux"
import { updateQuestionData } from "../../../../../redux/features/activityCreation/activityCreationData" 
import { useLayoutEffect, useState } from "react"
import {unstable_batchedUpdates} from 'react-dom';
const MatchActivityKeyPairs = ({
    data,
    smallWindowWidth,
    currQuestion,
    index
}) =>{
    const [keyValue, setKeyValue] = useState(data.key.content)
    const [answerValue, setAnswerValue] = useState(data.answer.content)
    const [keyEditActive, setKeyEditActive] = useState(false) 
    const [answerEditActive, setAnswerEditActive] = useState(false)
    //after a redux update, where these props will change
    // we ensure local values are equal to store values
    useLayoutEffect(()=>{
         setKeyValue(data.key.content)
         setAnswerValue(data.answer.content)
    }, [data.answer.content, data.key.content]) 
    const dispatch = useDispatch()
    const onDeleteKeyPair = () =>{
        dispatch(updateQuestionData({
            questionType: "matching",
            questionNum : currQuestion,
            updateType: "delete-key-pair",
            newData: {
                keyPairIndex: index
            }
        }))
    }
    const onSaveKeyPair = (e) =>{
        switch(e.type){
            case "blur":
                //this prevents double events from happening when
                //the save btn is clicked (due to on blur also firing)
                const relatedTarget = e.relatedTarget
                if(!relatedTarget) break
                if(relatedTarget.closest("input")) return 
                const closestBtn = e.relatedTarget.closest("button")
                if(!closestBtn) break
                if(closestBtn.dataset.actionLabel === "save-pair-edits") return
                break;
            default:
                break
        }
        unstable_batchedUpdates(() =>{
            if(keyEditActive)setKeyEditActive(false)
            if(answerEditActive)setAnswerEditActive(false)
            dispatch(updateQuestionData({
                questionType: "matching",
                questionNum: currQuestion,
                updateType: "update-key-pair",
                newData: {
                    id: data.id,
                    keyPairsIndex: index,
                    keyValue: keyValue,
                    answerValue: answerValue
                }
            }))
        })
    }
    return(
        <div 
            className="match-creation-single-key-pair"
        >
            <div className="d-flex h-100 col-10 col-sm-11">
                <div
                    className="match-creation-key col-6 col-sm-5 col-lg-4"
                >
                    {!keyEditActive ?
                        <button
                            onDoubleClick = {() => setKeyEditActive(true)}
                        >
                            {data.key.content}
                        </button>
                    : <div>
                            <textarea 
                                onBlur={onSaveKeyPair}
                                value = {keyValue}
                                onChange = {(e) =>{
                                    const value = e.target.value
                                    setKeyValue(value)
                                }}
                                autoFocus ={true}
                            />
                        </div>
                    }

                </div>
                {smallWindowWidth && 
                    <div className="match-creation-arrows col-1 col-sm-2 col-lg-4">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="right-arrow"
                            viewBox="0 0 100 10" 
                            preserveAspectRatio="xMaxYMid slice"
                        >
                        <defs>
                            <marker 
                                id="pointer-end" 
                                markerWidth="4" 
                                markerHeight="8" 
                                refX="3" 
                                refY="3.5" 
                                orient="auto" 
                                markerUnits="userSpaceOnUse"
                            >
                                <polyline points="1 1.5, 3 3.5, 1 5.5" />
                            </marker>
                        </defs>
                            <path
                                id='arrow-line'
                                markerEnd='url(#pointer-end)'
                                strokeWidth='1'
                                fill='none' stroke='black'  
                                d='M1,5, 99.8,5'
                            />
                        </svg>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="left-arrow"
                            viewBox="0 0 100 10" 
                            preserveAspectRatio="xMinYMid slice"
                        >
                        <defs>
                            <marker 
                                id="pointer-start" 
                                markerWidth="4" 
                                markerHeight="8" 
                                refX="3" 
                                refY="3.5" 
                                orient="auto-start-reverse" 
                                markerUnits="userSpaceOnUse"
                            >
                                <polyline points="1 1.5, 3 3.5, 1 5.5" />
                            </marker>
                        </defs>
                            <path
                                id='arrow-line'
                                markerStart='url(#pointer-start)'
                                strokeWidth='1'
                                fill='none' stroke='black'  
                                d='M0.2,5, 99.8,5'
                            />
                        </svg>
                    </div>
                }
                
                <div
                    className="match-creation-answer col-6 col-sm-5 col-lg-4"
                >
                    {!answerEditActive ? 
                        <button
                            onDoubleClick={() =>setAnswerEditActive(true)}
                        >
                            {data.answer.content}
                        </button>
                    : <div>
                        <textarea 
                            onBlur={onSaveKeyPair}
                            value={answerValue}
                            onChange = {(e) =>{
                                const value = e.target.value
                                setAnswerValue(value)
                            }}
                            autoFocus ={true}
                        />
                    </div>}
                    
                </div>
            </div>
            <div className="match-creation-key-pair-btns col-2 col-sm-1">
                <button
                    onClick={!keyEditActive && !answerEditActive ? () => {
                            unstable_batchedUpdates(()=>{
                                setKeyEditActive(true) 
                                setAnswerEditActive(true)
                            })
                        }
                        : onSaveKeyPair}
                    data-action-label = {!keyEditActive && !answerEditActive ? "edit-pair" : "save-pair-edits"}
                >
                    <FontAwesomeIcon icon={!keyEditActive && !answerEditActive ? faEdit : faSave}/>
                </button>
                <button
                    onClick={onDeleteKeyPair}
                >
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </div>
        </div>
    )
}
export default MatchActivityKeyPairs