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
                //onClick={updateAnswerChoice}
                checked = {parseInt(data.clientAnswer) === index}
            />
            <g className="d-flex align-items-center mc-answer-choice-group w-100 h-100">
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
                <label 
                    tabIndex={0}
                    onKeyDown = {updateAnswerChoice}
                    htmlFor={"mc-answer-choice-"+(index)} 
                    data-update-answer-choice = {"mc-answer-choice-"+(index)}
                    className="w-100 d-flex align-items-center justify-content-center mc-answer-label">
                        {choice}
                </label>
            </g>
        </div>
    )
}
export default MultipleChoiceItem