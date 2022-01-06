import ResetBtn from "../utilities/generalBtn/GeneralBtn"
import DrapAndDropToggler from "../utilities/dragAndDrop/DrapAndDropToggler"
import Timer from '../utilities/timer/Timer';
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
        <div className={`d-flex activity-header justify-content-between align-items-center`}>
        {smallWindowWidth && <div className="col-4"></div>}
        {data.timer &&
                <div className={`activity-timer d-flex justify-content-center align-items-center col-4`}>
                    <span>TIME:</span>
                    <Timer
                        timer={data.timer}
                        autoStart={false}
                    />
                </div>
        }
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
                type === "DnD" && <DrapAndDropToggler 
                    disableDnD = {disableDnD}
                    toggleTap = {toggleTap}
                />
            }
            
        </div>
        
    </div>
    )
}
export default ActivityHeader