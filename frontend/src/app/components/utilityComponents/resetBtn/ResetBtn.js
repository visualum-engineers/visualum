const ResetBtn = ({
    customClassName,
    onClick, 
    onKeyDown, 
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
            data-question-num = {questionNum}
            data-action-label = {customAriaLabel}
        >
            {customIcon}
            <span> {textContent} </span>
        </button>
    )
}
export default ResetBtn