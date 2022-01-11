const GeneralBtn = ({
    customClassName,
    onClick, 
    onKeyDown,
    onMouseEnter,
    onMouseLeave, 
    customAriaLabel,
    questionNum,
    customIcon = null,
    textContent = null
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
        >
            {customIcon}
            <span> {textContent} </span>
        </button>
    )
}
export default GeneralBtn