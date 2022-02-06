import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import SortActivityCategoryItem from "./SortActivityCategoryItem"

const SortActivityCategory = ({
    data
}) =>{
    return (
        <div className="sort-creation-category-container">
            <div className="sort-creation-category">
                <div className="sort-creation-droppable-header">
                    <div className="sort-creation-droppable-header-inner">
                        <button className="sort-creation-droppable-name">   
                            Hello the world is coming to an end the wolrd  ihfvuhuhui
                            jojiji ji  iojoi  io jiojio  ij o i ioj io  
                            
                        </button>
                        <button
                            className="sort-creation-category-edit"
                        >
                            <FontAwesomeIcon icon={faEdit}/>
                        </button>
                        <button 
                            className="sort-creation-category-delete"
                            aria-label ={"delete-category"}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
                <div className="sort-creation-droppable">
                    <SortActivityCategoryItem 
                        //data={data}
                    />
                </div>
            </div>

            <div className="sort-creation-droppable-add-draggable">
                <button>
                    <FontAwesomeIcon icon={faPlus}/>
                    <span>Add Answer</span>
                </button>
            </div>

        </div>

    )
}
export default SortActivityCategory