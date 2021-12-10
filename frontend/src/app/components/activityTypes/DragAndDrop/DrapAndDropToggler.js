const DrapAndDropToggler = ({disableDnD, toggleTap}) =>{
    return(
        <div className="enable-tap-mode d-flex flex-column align-items-center form-check form-switch">
            <label 
                className="form-check-label" 
                htmlFor="toggle-tap-mode"
                aria-label ={!disableDnD ? "Enable Tap": "Restore Drag"}
            >
                {!disableDnD ? "Enable Tap": "Restore Drag"}
            </label>
            <input 
                onKeyDown={toggleTap}
                onClick={toggleTap}
                className="form-check-input" 
                type="checkbox" 
                role="switch" 
                aria-label ={!disableDnD ? "Enable Tap": "Restore Drag"}
                id="toggle-tap-mode" 
                checked = {disableDnD}
                readOnly
            />
        </div>
    )
}
export default DrapAndDropToggler