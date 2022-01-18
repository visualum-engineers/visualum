const CheckboxItem = ({
    id, 
    checked, 
    choice, 
    updateAnswerChoice, 
    customContainerClass = null
}) =>{
    return(
        <div className={`checkbox-answer-choice`
                        +`${customContainerClass ? " " + customContainerClass: ""}`}
        >
            <input 
                id={id} 
                type="checkbox" 
                name="answer"
                onChange = {updateAnswerChoice}
                data-update-answer-choice = {id}
                checked = {checked}
            />
            <label 
                className="checkbox-answer-choice-group d-flex align-items-center w-100 h-100"
                tabIndex={0}
                onKeyDown = {updateAnswerChoice}
                htmlFor={id}
                data-update-answer-choice = {id} 
                onClick = {updateAnswerChoice} 
            >
                <span className="checkbox-icon"></span>
                <div 
                    className="checkbox-answer-label w-100 d-flex align-items-center justify-content-center"
                >
                        {choice}
                </div>
            </label>
        </div>
    )
}

export default CheckboxItem