import ResetBtn from "../utilities/generalBtn/GeneralBtn"
import DrapAndDropToggler from "../utilities/dragAndDrop/DrapAndDropToggler"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";
const ActivityHeader = ({
    smallWindowWidth,
    mediumWindowWidth, 
    data,
    resetBtnOnClick, 
    questionNum,
    //below are for drag and drop 
    disableDnD = null,
    toggleTap = null,
    type = null,
}) =>{

    return(
        <div className={`d-flex activity-header justify-content-between align-items-center px-1`}>
        {smallWindowWidth && <div className="col-4"></div>}

        <div className="d-flex align-items-center justify-content-end activity-header-btns col-4 flex-grow-1">
            <ResetBtn 
                customClassName = {"activity-reset-btn btn d-flex align-items-center"}
                customIcon = {<FontAwesomeIcon icon={faUndoAlt} />}
                textContent = {"Reset"}
                onClick = {resetBtnOnClick}
                customAriaLabel = {"reset-question"}
                questionNum = {questionNum}
            />
            {
                type === "DnD" && smallWindowWidth && <DrapAndDropToggler 
                    disableDnD = {disableDnD}
                    toggleTap = {toggleTap}
                />
            }
            
        </div>
        
    </div>
    )
}
export default ActivityHeader