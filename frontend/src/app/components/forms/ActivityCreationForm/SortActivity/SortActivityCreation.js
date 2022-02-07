import SortActivityCategory from "./SortActivityCreationCategory"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus} from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { updateQuestionData } from "../../../../../redux/features/activityCreation/activityCreationData"

const SortActivityCreation = ({
    // smallWindowWidth,
    // mediumWindowWidth,
    currQuestion,
    //if true, data will be rendered for a preview
    preview,
}) =>{
    const data = useSelector((state)=> state.activityCreation.data.saved.present.questions[parseInt(currQuestion)])
    const dispatch = useDispatch()
    const onAddCategory = () =>{
        dispatch(updateQuestionData({
            questionType: "sort",
            questionNum : currQuestion,
            updateType:"add-category",
        }))
    }
    return (
        <div className="sort-creation-question">
            <div className="sort-creation-overall-categories-container">
                {/* map over this*/}
                <div className="sort-creation-categories-row row">
                    {data.categories.map((category, index) =>{
                        return(
                            <SortActivityCategory
                                key={category.id}
                                data = {category}
                                preview={preview}
                                categoryIndex = {index}
                                currQuestion = {currQuestion}
                            />
                        )
                    })}
                </div>
            </div>
            {!preview &&
                <div className="sort-creation-question-add-category">
                    <button 
                        className="add-category-btn"
                        aria-label = "add-new-category"
                        onClick = {onAddCategory}
                    >
                        <FontAwesomeIcon icon={faPlus}/>
                        <span>Add Category</span>
                    </button>
                </div>
            }
        </div>
    )
}
export default SortActivityCreation