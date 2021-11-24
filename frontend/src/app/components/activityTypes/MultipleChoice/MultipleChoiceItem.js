const MultipleChoiceItem = ({index, data, choice, updateAnswerChoice, customContainerClass = ""}) =>{
    return(
        <div key={index} className={`mc-answer-choice ${customContainerClass}`}>
            <input 
                id={"mc-answer-choice-"+(index)} 
                type="radio" 
                name="MCOptions"
                onChange = {updateAnswerChoice}
                checked = {parseInt(data.clientAnswer) === index}
            />
            <label 
                tabIndex={0}
                onKeyDown = {updateAnswerChoice}
                htmlFor={"mc-answer-choice-"+(index)} 
                data-update-answer-choice = {"mc-answer-choice-"+(index)}
                className="w-100 d-flex align-items-center justify-content-center mc-answer-label">
                    {choice}
            </label>
        </div>
    )
}
export default MultipleChoiceItem