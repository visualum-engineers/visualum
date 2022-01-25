
const GeneralBtn = ({
    customClassName,
    onClick, 
    onKeyDown,
    onMouseEnter,
    onMouseLeave, 
    customAriaLabel,
    questionNum,
    customIcon = null,
    textContent = null,
    disabled = false,
}) =>{
    
    return (
        <button
            className = {customClassName}
            aria-label = {customAriaLabel}
            onClick = {onClick}
            onKeyDown ={onKeyDown}
            onMouseEnter = {onMouseEnter}
            onMouseLeave = {onMouseLeave}
            data-question-num = {questionNum ? questionNum : null}
            data-action-label = {customAriaLabel}
            disabled={disabled}
        >
            {customIcon}
            <span> {textContent} </span>
        </button>
    )
}
export default GeneralBtn