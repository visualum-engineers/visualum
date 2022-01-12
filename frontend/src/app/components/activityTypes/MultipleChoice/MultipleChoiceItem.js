const MultipleChoiceItem = ({
        index, 
        data, 
        choice, 
        updateAnswerChoice, 
        customContainerClass = null
    }) =>{
    return(
        <div key={index} className={`mc-answer-choice${customContainerClass ? " " + customContainerClass: ""}`}>
            <input 
                id={"mc-answer-choice-"+(index)} 
                type="radio" 
                name="MCOptions"
                onChange = {updateAnswerChoice}
                data-update-answer-choice = {"mc-answer-choice-"+(index)}
                checked = {parseInt(data.clientAnswer) === index}
            />
            <label 
                className="mc-answer-choice-group d-flex align-items-center w-100 h-100"
                tabIndex={0}
                onKeyDown = {updateAnswerChoice}
                htmlFor={"mc-answer-choice-"+(index)}
                data-update-answer-choice = {"mc-answer-choice-"+(index)} 
                onClick = {updateAnswerChoice} 
            >
                <svg 
                    className="mc-custom-radio-btn"
                    width="17" 
                    height="17" 
                    viewBox="0 0 24 24"
                >
                    <circle 
                        className="mc-radio-outer-circle"
                        cx="12" 
                        cy="12" 
                        r="10" 
                    ></circle>
                    <circle 
                        className="mc-radio-inner-circle"
                        cx="12" 
                        cy="12" 
                        r="7" 
                    >
                    </circle>
                </svg>
                <div 
                    className="mc-answer-label w-100 d-flex align-items-center justify-content-center">
                        {choice}
                </div>
            </label>
        </div>
    )
}
export default MultipleChoiceItem