import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { faEdit, faSave } from "@fortawesome/free-regular-svg-icons"
import SortActivityCategoryItem from "./SortActivityCategoryItem"
import { useDispatch } from "react-redux"
import { updateQuestionData } from "../../../../../redux/features/activityCreation/activityCreationData"
import {useState, useRef} from "react"
import Droppable from "../../../utilities/dragAndDrop/DnDKit/NonSortableDnD/Droppable"
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';

const SortActivityCategoryHeader = ({
    data, 
    categoryIndex,
    preview,
    currQuestion,
}) =>{
    const [inputValue, setInputValue] = useState(data.title)
    const [editActive, setEditActive] = useState(false)
    const dispatch = useDispatch()

    const onDeleteCategory = () =>{
        dispatch(updateQuestionData({
            questionType: "sort",
            questionNum : currQuestion,
            categoryIndex: categoryIndex,
            updateType:"delete-category",
        }))
    }
    const onSaveCategory = (e) =>{
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
                if(action === "update-category") return
                
                break;
            case "click":
                target = e.target.closest("button")
                break;
            default:
                break;
        }
        if(!target) return
        dispatch(updateQuestionData({
            questionType: "sort",
            questionNum : currQuestion,
            categoryIndex: categoryIndex,
            newData: {...data, title: inputValue},
            updateType:"update-category",
        }))
        setEditActive(false)
    }
    return(
        <>
        
        {!editActive ? 
            <button 
                className="sort-creation-droppable-name"
                onDoubleClick = {() => setEditActive(true)}
            >   
                {data.title}  
            </button>
            :
            <div className="sort-creation-droppable-name-container">
                <div
                    className="sort-creation-droppable-name-textarea"
                    data-replicated-value = {inputValue}
                >
                    <textarea 
                        value={inputValue}
                        onChange = {(e) => setInputValue(e.target.value)}
                        onBlur = {onSaveCategory}
                        autoFocus={true}
                    />
                </div> 
            </div>
            
            
        }
        <button
            className="sort-creation-category-edit"
            aria-label = {`${!editActive ? "edit":"save"}-category-title`}
            onClick = {!editActive ? () => setEditActive(true) 
                : onSaveCategory
    }
            data-action-label = {`update-category`}
        >
            <FontAwesomeIcon icon={!editActive ? faEdit: faSave}/>
        </button>
        <button 
            className="sort-creation-category-delete"
            aria-label ={"delete-category"}
            onClick = {onDeleteCategory}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
        </>
    )
}

const SortActivityCategory = ({
    id,
    data,
    categoryIndex,
    preview,
    currQuestion,
    isOver,
    dndDisabled,
}) =>{
    const defaultParentNode = useRef()
    const dispatch = useDispatch()
    const onAddCategoryItem = () =>{
        dispatch(updateQuestionData({
            questionType: "sort",
            questionNum : currQuestion,
            categoryIndex: categoryIndex,
            updateType:"add-answer",
        }))
    }

    return (
        <SortableContext 
            items={data.answers}
            strategy = {verticalListSortingStrategy}
            id={id}
        >
        <div 
            className="sort-creation-category-container"
            id={id}
            data-container-id={id}
            data-tap-droppable-id = {id}
            ref={defaultParentNode}
        >
            <div className="sort-creation-category">
                <div className="sort-creation-droppable-header">
                    <div className="sort-creation-droppable-header-inner">
                        <SortActivityCategoryHeader 
                            data = {data}
                            categoryIndex ={categoryIndex}
                            preview = {preview}
                            currQuestion ={currQuestion}
                        />
                    </div>
                </div>
                <Droppable 
                    id={id.toString()}
                    parentNode = {defaultParentNode.current}
                    innerDroppableClassName = {"sort-creation-droppable"}
                    draggingOverClass = {"is-dragging-over"}
                    isOver={isOver}
                    isDisabled = {dndDisabled}
                    categoryIndex = {categoryIndex}
                >
                    {data.answers.map((answer, index)=>{
                        return(<SortActivityCategoryItem
                            key={answer.id}
                            id={answer.id}
                            droppableId = {id.toString()}
                            data = {answer}
                            index = {index}
                            isDraggingClass={"draggable-is-dragging"}
                            categoryIndex = {categoryIndex}
                            currQuestion = {currQuestion}
                            dndDisabled = {dndDisabled}
                        />)
                    })}
                </Droppable>
            </div>

            <div className="sort-creation-droppable-add-draggable">
                <button
                    onClick = {onAddCategoryItem}
                    aria-label={"add-new-answer"}
                >
                    <FontAwesomeIcon icon={faPlus}/>
                    <span>Add Answer</span>
                </button>
            </div>

        </div>
        </SortableContext>
    )
}
export default SortActivityCategory