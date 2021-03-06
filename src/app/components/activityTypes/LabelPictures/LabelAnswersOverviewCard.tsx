const LabelAnswerOverviewCard = ({
    data,
    question,
    index,
    onClick
}: any) =>{
    const questionID = question.id
    return(
        <li className="label-pic-answer-overview-card col flex-grow-1 d-flex flex-column">
            <button 
                onClick={onClick}
                className="d-flex flex-column"
                data-action-label = "exit-answers-overview"
                data-question-index = {index}
                aria-label={`go-to-sub-question-${index+1}`}
            >
                <div className="unselectable overview-card-question-header"><h2>{index+1+". "+question.content}</h2></div>
                <ul 
                    className="label-pic-answer-overview-answers w-100 unselectable" 
                    style={data.categories[questionID].length > 0 ? {padding: "0", height: "100%"}: undefined}
                >
                        {data.categories[questionID].length > 0 ?
                            data.categories[questionID].map((answer: any) => {
                                const answerID = answer.id
                                return(
                                    <li
                                        key={answerID}
                                    >
                                        {answer.content}
                                    </li>
                                )
                            })
                        : <div className="d-flex align-items-center justify-content-center h-100"> No Answers Added</div>
                    }
                </ul>
            </button>
        </li>
    )
}
export default LabelAnswerOverviewCard
