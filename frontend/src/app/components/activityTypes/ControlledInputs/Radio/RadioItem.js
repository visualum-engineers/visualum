const RadioItem = ({
        id, 
        checked, 
        choice, 
        updateAnswerChoice, 
        customContainerClass = null
    }) =>{
    return(
        <div className={`radio-answer-choice`
                        +`${customContainerClass ? " " + customContainerClass: ""}`}
        >
            <input 
                id={id} 
                type="radio" 
                name="answer"
                onChange = {updateAnswerChoice}
                data-update-answer-choice = {id}
                checked = {checked}
            />
            <label 
                className="radio-answer-choice-group d-flex align-items-center w-100 h-100"
                tabIndex={0}
                onKeyDown = {updateAnswerChoice}
                htmlFor={id}
                data-update-answer-choice = {id} 
                onClick = {updateAnswerChoice} 
            >
                <svg 
                    className="custom-radio-btn"
                    width="17" 
                    height="17" 
                    viewBox="0 0 24 24"
                >
                    <circle 
                        className="radio-outer-circle"
                        cx="12" 
                        cy="12" 
                        r="10" 
                    ></circle>
                    <circle 
                        className="radio-inner-circle"
                        cx="12" 
                        cy="12" 
                        r="7" 
                    >
                    </circle>
                </svg>
                <div 
                    className="radio-answer-label w-100 d-flex align-items-center justify-content-center"
                >
                        {choice}
                </div>
            </label>
        </div>
    )
}
export default RadioItem