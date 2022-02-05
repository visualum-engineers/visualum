import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

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
                    <div className="sort-creation-category-container col-4">
                        <div className="sort-creation-category">
                            
                        </div>
                    </div>
                    <div className="sort-creation-category-container col-4">
                        <div className="sort-creation-category">
                            
                        </div>
                    </div>
                    <div className="sort-creation-category-container col-4">
                        <div className="sort-creation-category">
                            
                        </div>
                    </div>
                </div>
                <div className="sort-creation-categories-row row">
                    <div className="sort-creation-category-container col-4">
                        <div className="sort-creation-category">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="sort-creation-question-add-category">
                <button className="add-category-btn">
                    <FontAwesomeIcon icon={faPlus}/>
                    <span>Add Category</span>
                </button>
            </div>
        </div>
    )
}
export default SortActivityCreation