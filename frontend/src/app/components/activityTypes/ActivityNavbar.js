import GeneralBtn from "../utilities/generalBtn/GeneralBtn"
import { useState } from "react";
import DrapAndDropToggler from "../utilities/dragAndDrop/DrapAndDropToggler"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt, faUndoAlt, faRedoAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import {faEdit} from "@fortawesome/free-regular-svg-icons"
import TrianglePointer from "../utilities/trianglePointer/TrianglePointer";
import { undoHistory, redoHistory } from "./activityHistoryFunc";
import { useDispatch } from "react-redux";
const Logo = "./images/VisualumLogo.png"
const ActivityNavbar = ({
    smallWindowWidth,
    sidebarToggle,
    handleSideBar,
    resetBtnOnClick, 
    questionNum,
    //below are for drag and drop 
    disableDnD = null,
    toggleTap = null,
    type = null,
}) =>{
    const [editPointer, setEditPointer] =  useState(false)
    const [editDropdownOpen, setEditDropdown] = useState(false)
    const dispatch = useDispatch()
    const onUndoClick = () => {
        undoHistory({
            dispatch: dispatch
        })
    }
    const onRedoClick = () =>{
        redoHistory({
            dispatch: dispatch
        })
    }
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
            <div 
                style={{position: "relative", zIndex: "1"}}
            >
                <button 
                    onMouseEnter={() => setEditPointer(true)}
                    onMouseLeave={() => setEditPointer(false)}
                    onClick={() => setEditDropdown((state) => !state)}
                    className="activity-edit-btn"
                >
                    <FontAwesomeIcon icon={faEdit}/>
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
                            customClassName = {"d-flex align-items-center"}
                            customIcon = {<FontAwesomeIcon icon={faUndoAlt} />}
                            textContent = {<><div>Undo</div><div className="key-shortcut">Ctrl+Z</div></>}
                            onClick = {onUndoClick}
                            customAriaLabel = {"reset-question"}
                            questionNum = {questionNum}
                        />
                        <GeneralBtn 
                            customClassName = {"d-flex align-items-center"}
                            customIcon = {<FontAwesomeIcon icon={faRedoAlt} />}
                            textContent = {<><div>Redo</div><div className="key-shortcut">Ctrl+Y</div></>}
                            onClick = {onRedoClick}
                            customAriaLabel = {"reset-question"}
                            questionNum = {questionNum}
                        />
                        {/* resetbtn*/}
                        <GeneralBtn 
                            customClassName = {"d-flex align-items-center"}
                            customIcon = {<FontAwesomeIcon icon={faSyncAlt} />}
                            textContent = {<><div>Reset</div><div className="key-shortcut">Ctrl+Alt+Del</div></>}
                            onClick = {resetBtnOnClick}
                            customAriaLabel = {"reset-question"}
                            questionNum = {questionNum}
                        />
                        
                    </div>
                }
            </div>
            
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