import SortActivityCategory from "./SortActivityCreationCategory"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus} from "@fortawesome/free-solid-svg-icons"

const SortActivityCreation = ({
    smallWindowWidth,
    mediumWindowWidth,
    //if true, data will be rendered for a preview
    preview,
}) =>{
    return (
        <div className="sort-creation-question">
            <div className="sort-creation-overall-categories-container">
                {/* map over this*/}
                <div className="sort-creation-categories-row row">
                    <SortActivityCategory
                        //data = {data}
                        preview={preview}
                    />
                    <SortActivityCategory
                        //data = {data}
                        preview={preview}
                    />
                    <SortActivityCategory
                        //data = {data}
                        preview={preview}
                    />
                    <SortActivityCategory
                        //data = {data}
                        preview={preview}
                    />
                    <SortActivityCategory
                        //data = {data}
                        preview={preview}
                    />
                    <SortActivityCategory
                        //data = {data}
                        preview={preview}
                    />
                </div>
            </div>
            {!preview &&
                <div className="sort-creation-question-add-category">
                    <button className="add-category-btn">
                        <FontAwesomeIcon icon={faPlus}/>
                        <span>Add Category</span>
                    </button>
                </div>
            }
        </div>
    )
}
export default SortActivityCreation