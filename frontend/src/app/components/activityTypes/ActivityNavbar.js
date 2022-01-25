import ResetBtn from "../utilities/generalBtn/GeneralBtn"
import DrapAndDropToggler from "../utilities/dragAndDrop/DrapAndDropToggler"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt, faBars } from "@fortawesome/free-solid-svg-icons";
const ActivityNavbar = ({
    smallWindowWidth,
    sidebarToggle,
    handleSideBar,
    mediumWindowWidth, 
    data,
    resetBtnOnClick, 
    questionNum,
    //below are for drag and drop 
    disableDnD = null,
    toggleTap = null,
    type = null,
}) =>{
    const Logo = "./images/VisualumLogo.png"
    return(
        <div className={`d-flex activity-navbar justify-content-between align-items-center px-1`}>
             <button 
                className={`activity-navbar-exit-sidebar-btn${sidebarToggle ?" sidebar-open":" sidebar-close"}`} 
                aria-label="exit-sidebar"
                onClick={handleSideBar}
            >
                <FontAwesomeIcon 
                    icon= {faBars}
                />
            </button>
             <div className="activity-navbar-company-title d-flex justify-content-center align-items-center">
                    <a href="/" >
                        <img className="activity-navbar-visualum-logo" 
                        src={Logo} 
                        alt="Visualum logo"/>
                    </a>
                    {smallWindowWidth && <a href="/">visualum</a> }
                </div>
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
export default ActivityNavbar