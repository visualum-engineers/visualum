
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions";
import Timer from "../timer/Timer"
import { 
    faBars, 
} from "@fortawesome/free-solid-svg-icons";

const Logo = "./images/VisualumLogo.png"

const Navbar = ({
    displayCompanyName,
    pastSelectorFunc,
    futureSelectorFunc,
    resetPopUpOn,
    undoHistory,
    redoHistory,
    smallWindowWidth,
    sidebarToggle,
    handleSideBar,
    resetBtnOnClick,
    questionNum,
    inProp,
    timerData = null,
    centerHeader = null,
    settings = null,
    //img container with avatar img
    avatar = null,
}) =>{

return(
    <nav className={`d-flex activity-navbar justify-content-between align-items-center px-1`}>
        <div className={`d-flex justify-content-between ${!centerHeader ? "col-4" : "col-6 col-sm-8"}`}>
            <button 
                className={`activity-navbar-exit-sidebar-btn${sidebarToggle ?" sidebar-open":" sidebar-close"}`} 
                aria-label="exit-sidebar"
                onClick={handleSideBar}
            >
                <FontAwesomeIcon 
                    icon= {faBars}
                />
            </button>
            <div className="activity-navbar-company-title">
                <a href="/" >
                    <img className="activity-navbar-visualum-logo" 
                    src={Logo} 
                    alt="Visualum logo"/>
                </a>
                {smallWindowWidth && displayCompanyName && <a href="/">visualum</a> }
                { centerHeader }
            </div>
        </div>
        {/*option timer*/
            timerData && smallWindowWidth && <div className={`activity-timer col-4`}>
                <span>TIME:</span>
                <Timer
                    timer={timerData}
                    autoStart={true}
                />
            </div>
        }

        <div className={`activity-header-btns ${!centerHeader ? "col-8 col-sm-4" : ""}`}>
            <EditOptions 
                pastSelectorFunc={pastSelectorFunc}
                futureSelectorFunc={futureSelectorFunc}
                resetPopUpOn = {resetPopUpOn}
                undoHistory = {undoHistory}
                redoHistory = {redoHistory}
                resetBtnOnClick = {resetBtnOnClick}
                questionNum = {questionNum}
                inProp = {inProp}
            />
            {/*optional settings*/
               settings
            }
            <div 
                className="activity-profile-avatar-container"
            >
                {avatar}
            </div> 
        </div>
    </nav>
)}
export default Navbar