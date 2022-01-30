import GeneralBtn from "../utilities/generalBtn/GeneralBtn"
import { useState } from "react";
import TrianglePointer from "../utilities/trianglePointer/TrianglePointer";
import { undoHistory, redoHistory } from "./activityHistoryFunc";
import { useDispatch, useSelector } from "react-redux";
import useKeyboardShortcut from "../../hooks/use-keyboard-shortcuts";
import { resetPopUpOn } from "../../../redux/features/activityTypes/activitiesSettings";
import Timer from '../utilities/timer/Timer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faSyncAlt, 
    faUndoAlt, 
    faRedoAlt, 
    faBars, 
    faCog, 
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import ActivitySettings from "./ActivitySettings";

const Logo = "./images/VisualumLogo.png"
const ActivityNavbar = ({
    smallWindowWidth,
    sidebarToggle,
    handleSideBar,
    resetBtnOnClick,
    questionNum,
    inProp,
    //img container with avatar img
    avatar = null,
    timerData = null
}) =>{
    //local states
    const [editPointer, setEditPointer] =  useState(false)
    const [editDropdownOpen, setEditDropdown] = useState(false)  
    const [settingsOpen, setSettingsOpen] = useState(false)  
    const dispatch = useDispatch()
    const pastLength = useSelector((state) => state.activities.data.clientData.past.length)
    const futureLength = useSelector((state) => state.activities.data.clientData.future.length)

    //keyboard shortcuts for undo and redo
    const editPointFocus =(e) =>{
        e.preventDefault()
        if(e.currentTarget.contains(e.relatedTarget)) return
        setEditDropdown(false)
    }
    const onUndoClick = (e) => {
        e.preventDefault()
        undoHistory({
            dispatch: dispatch
        })
    }
    const onRedoClick = (e) =>{
        e.preventDefault()
        redoHistory({
            dispatch: dispatch
        })
    }
    //keyboard shortcuts
    useKeyboardShortcut(
        ['Control', 'Alt', 'Delete'], 
        () => {
            dispatch(
                resetPopUpOn({ questionNum : questionNum, confirmed: false})
            )
        }, 
        { overrideSystem: false }
    )  
    useKeyboardShortcut(
        ['Control', "Z"], 
        () => {
            if(inProp) return
            if(!(pastLength>0)) return
            undoHistory({dispatch: dispatch})
        }, 
        { overrideSystem: false }
    )
    useKeyboardShortcut(
        ['Control', "Y"], 
        () => {
            if (inProp) return
            if(!(futureLength > 0)) return
            redoHistory({dispatch: dispatch})
        }, 
        { overrideSystem: false }
    )

    return(
        <nav className={`d-flex activity-navbar justify-content-between align-items-center px-1`}>
            <div className="d-flex col-4">
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
            </div>
            {timerData && smallWindowWidth && <div className={`activity-timer d-flex align-items-center col-4`}>
                        <span>TIME:</span>
                        <Timer
                            timer={timerData}
                            autoStart={true}
                        />
                    </div>
            }
            <div className="d-flex align-items-center justify-content-end activity-header-btns col-8 col-sm-4">
                <div 
                    style={{position: "relative", zIndex: "1"}}
                    onBlur = {editPointFocus}
                >
                    <button 
                        onMouseEnter={() => setEditPointer(true)}
                        onMouseLeave={() => setEditPointer(false)}
                        onClick={() => setEditDropdown((state) => !state)}
                        className="activity-edit-btn"
                    >
                        <span>Edit</span> <FontAwesomeIcon icon={faChevronDown}/>
                        {!editDropdownOpen &&
                            <TrianglePointer 
                                customClassName={"activity-edit-dropdown-pointer"}
                                dropDownActive={editPointer}
                                customDropDownID={"activity-edit"}
                                textContent={"Edit"}
                            />
                        }
                    </button>
                    {editDropdownOpen && 
                        <div
                            className='activity-edit-btn-dropdown' 
                            aria-label={"edit-options"}
                            onClick={() => setEditDropdown((state) => !state)}
                        >
                            <GeneralBtn 
                                customClassName = {`d-flex align-items-center${!(pastLength > 0) ? " activity-edit-btn-disabled":""}`}
                                customIcon = {<FontAwesomeIcon icon={faUndoAlt} />}
                                textContent = {<><div>Undo</div><div className="key-shortcut">Ctrl+Z</div></>}
                                onClick={onUndoClick}
                                customAriaLabel = {"reset-question"}
                                questionNum = {questionNum}
                                disabled = {!(pastLength > 0)}
                            />
                            <GeneralBtn 
                                customClassName = {`d-flex align-items-center${!(futureLength > 0) ? " activity-edit-btn-disabled":""}`}
                                customIcon = {<FontAwesomeIcon icon={faRedoAlt} />}
                                textContent = {<><div>Redo</div><div className="key-shortcut">Ctrl+Y</div></>}
                                onClick={onRedoClick}
                                customAriaLabel = {"reset-question"}
                                questionNum = {questionNum}
                                disabled = {!(futureLength > 0)}
                            />
                            {/* resetbtn*/}
                            <GeneralBtn 
                                customClassName = {"d-flex align-items-center"}
                                customIcon = {<FontAwesomeIcon icon={faSyncAlt} />}
                                textContent = {<><div>Reset</div><div className="key-shortcut">Ctrl+Alt+Del</div></>}
                                onClick={resetBtnOnClick}
                                customAriaLabel = {"reset-question"}
                                questionNum = {questionNum}
                            />
                        </div>
                    }
                </div>
                <div>
                    <button 
                        className="activity-navbar-setting-btn"
                        onClick={() => setSettingsOpen(state =>!state)}
                    >
                        <FontAwesomeIcon icon={faCog} />
                    </button>
                    {settingsOpen && 
                        <ActivitySettings 
                            onExitPopUp={() => setSettingsOpen(false)}
                            smallWindowWidth={smallWindowWidth}
                        />
                    }
                </div>
                
                <div 
                    className="activity-profile-avatar-container"
                >
                    {avatar}
                </div> 
                
            </div>
        </nav>
    )
}
export default ActivityNavbar