const SwitchToggler = ({
    switchOn,
    switchOnClick, 
    switchOnAriaLabel,
    switchOffAriaLabel,
    switchId,
    switchActionLabel,
    disabled
}: any) =>{
    return(
        <div className="switch-toggler-container form-check form-switch">
            <input 
                onKeyDown={switchOnClick}
                onClick={switchOnClick}
                data-action-label = {switchActionLabel}
                className="form-check-input" 
                type="checkbox" 
                role="switch" 
                aria-label ={switchOn ? switchOnAriaLabel: switchOffAriaLabel}
                id={switchId} 
                value={switchOn}
                checked={switchOn}
                disabled={disabled}
                readOnly
            />
        </div>
    )
}
export default SwitchToggler