import spaceOutCamelCase from "../../helpers/spaceOutCamelCase"
const ActivityTableOfContents = ({
    data,
    onClick,
    currQuestion,
    customClass,
    btnCustomClass,
    btnActiveClass
}) =>{
    return(
        <div className={customClass}>
            {data.questions.map((question, index) => {
                return (
                    <button
                        key={question.type + index}
                        className={`${btnCustomClass}${currQuestion===index ? " " + btnActiveClass:""}`}
                        onClick = {onClick}
                        data-btn-type = {"tableOfContents"}
                        data-question-num = {index}
                    >
                        <svg 
                            className="activities-question-circle-indicator"
                            viewBox="0 0 10 100"
                        >
                            <line x1="5" x2="5" y1="0" y2="40"></line>
                            <circle 
                                className="radio-outer-circle"
                                cx="5" 
                                cy="50" 
                                r="10" 
                            ></circle>
                            <line x1="5" x2="5" y1="60" y2="100"></line>
                        </svg>
                        <section>
                            <h3>{"Question " + parseInt(index+1)}</h3>
                            <h4>{spaceOutCamelCase(question.type)}</h4>
                        </section> 
                    </button>
                )
            })}
        </div>
    )
}
export default ActivityTableOfContents