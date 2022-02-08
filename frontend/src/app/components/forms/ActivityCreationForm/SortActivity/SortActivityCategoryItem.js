import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { faEdit, faSave } from "@fortawesome/free-regular-svg-icons"
import { useDispatch } from "react-redux"
import {updateQuestionData} from "../../../../../redux/features/activityCreation/activityCreationData"
import { useState, useEffect } from "react"
import SortableItem from "./SortableItem";

export const SortableItemBody = ({
    editActive = false,
    setEditActive = null,
    data,
    inputValue = null,
    setInputValue = null,
    onSaveClick = null,
    index,
    onDeleteClick = null,
}) => {
    return(
        <>
            <div className="sort-creation-category-item-content">
                {!editActive ? 
                    <button 
                        className="sort-creation-category-item-content-inner"
                        onDoubleClick = {setEditActive ? (e) => setEditActive(true): null}
                    >
                        {data.content}
                    </button>
                : <div
                    className="sort-creation-category-item-content-textarea"
                    data-replicated-value = {inputValue}
                >
                    <textarea
                        value={inputValue}
                        onChange = {setInputValue ? (e) => setInputValue(e.target.value): null}
                        onBlur = {onSaveClick}
                        data-answer-index={index}
                        autoFocus={true}
                    />
                </div>
                }
                
            </div>
            <div className="sort-creation-category-item-btn-container">
                <button 
                    className="sort-creation-category-item-edit"
                    aria-label={`${!editActive ? "edit": "save"}-category-answer`}
                    data-answer-index={index}
                    data-action-label = {"update-answer"}
                    onClick = {!editActive && setEditActive ? () => setEditActive(true) 
                                : onSaveClick
                    }
                >
                    <FontAwesomeIcon icon={!editActive ? faEdit : faSave}/>
                    
                </button>
                <button 
                    className="sort-creation-category-item-remove"
                    aria-label="remove-category-answer"
                    data-answer-index = {index}
                    onClick = {onDeleteClick}
                >
                    <FontAwesomeIcon icon={faTrash}/>
                </button>   
            </div>
        </>
    )
}
const SortActivityCategoryItem = ({
    id,
    droppableId,
    data,
    index,
    isDraggingClass,
    categoryIndex,
    currQuestion,
    dndDisabled,
}) =>{
    const dispatch = useDispatch()
    const [editActive, setEditActive] = useState(false)
    const [inputValue, setInputValue] = useState(data.content)
    //keep inputs in sync
    useEffect(()=>{ 
        setInputValue(data.content)
    }, [data.content])
    
    const onSaveClick = (e) =>{
        let target, relatedTarget, action
        switch(e.type){
            case "blur":
                target = e.target
                relatedTarget = e.relatedTarget
                //prevent blur event from responsing if the same event
                // is triggered elsewhere
                if(!relatedTarget) break
                relatedTarget = relatedTarget.closest("button")
                if(!relatedTarget) break
                action = relatedTarget.dataset.actionLabel 
                if(action === "update-answer") return
                
                break;
            case "click":
                target = e.target.closest("button")
                break;
            default:
                break;
        }
        if(!target) return
        const answerIndex = target.dataset.answerIndex
        dispatch(updateQuestionData({
            questionType: "sort",
            questionNum : currQuestion,
            categoryIndex: categoryIndex,
            updateType:"update-answer",
            newData: {...data, content: inputValue},
            answerIndex: answerIndex
        }))
        setEditActive(false)
    }
    const onDeleteClick = (e) =>{
        const target = e.target.closest("button")
        if(!target) return
        const answerIndex = target.dataset.answerIndex
        if(!answerIndex) return
        dispatch(updateQuestionData({
            questionType: "sort",
            questionNum : currQuestion,
            categoryIndex: categoryIndex,
            updateType:"delete-answer",
            answerIndex: answerIndex
        }))
    }
    return(
        <SortableItem
            id = {id}
            isDraggingClass={isDraggingClass}
            index = {index}
            droppableId = {droppableId}
            disabled ={editActive ? true: dndDisabled}
            draggableClassName = {"sort-creation-category-item"}
            categoryIndex = {categoryIndex}
        >
            <SortableItemBody 
                editActive = {editActive}
                setEditActive = {setEditActive}
                data = {data}
                inputValue = {inputValue}
                setInputValue = {setInputValue}
                onSaveClick = {onSaveClick}
                index = {index}
                onDeleteClick ={onDeleteClick}
            />
        </SortableItem>
    ) 
}
export default SortActivityCategoryItem
/*
<div className="sort-creation-category-item-content">
                {!editActive ? 
                    <button 
                        className="sort-creation-category-item-content-inner"
                        onDoubleClick = {(e) => setEditActive(true)}
                    >
                        {data.content}
                    </button>
                : <div
                    className="sort-creation-category-item-content-textarea"
                    data-replicated-value = {inputValue}
                >
                    <textarea
                        value={inputValue}
                        onChange = {(e) => setInputValue(e.target.value)}
                        onBlur = {onSaveClick}
                        data-answer-index={index}
                        autoFocus={true}
                    />
                </div>
                }
                
            </div>
            <div className="sort-creation-category-item-btn-container">
                <button 
                    className="sort-creation-category-item-edit"
                    aria-label={`${!editActive ? "edit": "save"}-category-answer`}
                    data-answer-index={index}
                    data-action-label = {"update-answer"}
                    onClick = {!editActive ? () => setEditActive(true) 
                                : onSaveClick
                    }
                >
                    <FontAwesomeIcon icon={!editActive ? faEdit : faSave}/>
                    
                </button>
                <button 
                    className="sort-creation-category-item-remove"
                    aria-label="remove-category-answer"
                    data-answer-index = {index}
                    onClick = {onDeleteClick}
                >
                    <FontAwesomeIcon icon={faTrash}/>
                </button>   
            </div>
*/