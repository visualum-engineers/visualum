import GeneralBtn from "../../generalBtn/GeneralBtn"
import { useState } from "react";
import TrianglePointer from "../../trianglePointer/TrianglePointer";
import { useDispatch, useSelector } from "react-redux";
import useKeyboardShortcut from "../../../../hooks/use-keyboard-shortcuts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { 
    faSyncAlt, 
    faUndoAlt, 
    faRedoAlt, 
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const EditOptions = ({
    pastSelectorFunc,
    futureSelectorFunc,
    resetPopUpOn,
    undoHistory,
    redoHistory,
    resetBtnOnClick,
    questionNum,
    inProp,
    reset
}: any) =>{
    const [editPointer, setEditPointer] =  useState(false)
    const [editDropdownOpen, setEditDropdown] = useState(false)  
    const dispatch = useDispatch()
    const pastLength: any = useSelector(pastSelectorFunc)
    const futureLength:any = useSelector(futureSelectorFunc)
    //keyboard shortcuts for undo and redo
    const editPointFocus =(e: any) =>{
        e.preventDefault()
        if(e.currentTarget.contains(e.relatedTarget)) return
        setEditDropdown(false)
    }
    const onUndoClick = (e: any) => {
        e.preventDefault()
        undoHistory({
            dispatch: dispatch
        })
    }
    const onRedoClick = (e: any) =>{
        e.preventDefault()
        redoHistory({
            dispatch: dispatch
        })
    }
    //keyboard shortcuts
    useKeyboardShortcut(
        ['Control', 'Alt', 'Delete'], 
        () => {
            if(!reset) return
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
                    {reset && 
                        <GeneralBtn 
                            customClassName = {"d-flex align-items-center"}
                            customIcon = {<FontAwesomeIcon icon={faSyncAlt} />}
                            textContent = {<><div>Reset</div><div className="key-shortcut">Ctrl+Alt+Del</div></>}
                            onClick={resetBtnOnClick}
                            customAriaLabel = {"reset-question"}
                            questionNum = {questionNum}
                        />
                    }
                    
                </div>
            }
        </div>
    )
}
export default EditOptions