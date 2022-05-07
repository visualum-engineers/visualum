import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import TrianglePointer from "../trianglePointer/TrianglePointer"
import usePopUp from "../../../hooks/use-pop-up"
const MoreInfoBtn = ({
    textContent="", 
    customContainerClass="", 
    customContainerAriaLabel="", 
    customDropDownID="", 
    setTimeoutOnMount=0, 
    onClick=null
}) =>{
    const [infoToggled, handleInfoBtn] = usePopUp({setTimeoutOnMount: setTimeoutOnMount}) 
    return(
        <div 
            className={customContainerClass + " info-btn-container"} 
            aria-label={customContainerAriaLabel} 
            aria-describedby="info"
        >
            <button 
                aria-labelledby={customDropDownID}
                onMouseEnter = {handleInfoBtn}
                onMouseLeave = {handleInfoBtn}
                onClick = {onClick? onClick : undefined}
            >
                <FontAwesomeIcon icon={faInfoCircle}/>   
            </button>
            
            <TrianglePointer
                 dropDownActive = {infoToggled}
                 textContent = {textContent}
                 customDropDownID = {customDropDownID}
            />
        </div>
    )   
}
export default MoreInfoBtn
