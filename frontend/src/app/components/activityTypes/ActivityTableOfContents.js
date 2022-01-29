import spaceOutCamelCase from "../../helpers/spaceOutCamelCase"
import { useSelector, useDispatch } from "react-redux"
import { updateTrackCompletion } from "../../../redux/features/activityTypes/activitiesData"
const ActivityTableOfContents = ({
    data,
    header,
    onClick,
    currQuestion,
    customClass,
    btnCustomClass,
    btnInnerCustomClass,
    btnActiveClass,
    btnIndicatorClass,
    progressTracking
}) =>{
    const questionData = useSelector((state) => state.activities.data.clientData.present.clientAnswerData.questions[currQuestion])
    const dispatch = useDispatch()
    const onTableOfBtnsClick = (e) =>{
        dispatch(updateTrackCompletion({
            questionNum: currQuestion,
            question: questionData
        }))
        //update new numbers
        onClick(e)
    }
    return(
        <div className={customClass}>
            <div style={{marignTop: "auto", width:"100%"}}>
            {header}
            {data.questions.map((question, index) => {
                const first = index === 0
                const last = index === data.questions.length-1
                const questionProgress = index in progressTracking.completed ? "question-completed"
                                        : index in progressTracking.inProgress ? "question-in-progress"
                                        : "question-never-opened"
                return (
                    <button
                        key={question.type + index}
                        className={`${btnCustomClass}`
                                    +` ${currQuestion===index ? " " + btnActiveClass: questionProgress}`
                                }
                        onClick = {onTableOfBtnsClick}
                        data-btn-type = {"tableOfContents"}
                        data-question-num = {index}
                    >
                        <div className={btnInnerCustomClass}>
                            <svg 
                                className={btnIndicatorClass}
                                viewBox="0 0 10 100"
                            >
                                {!first && <line x1="5" x2="5" y1="0" y2="40"></line>}
                                <circle 
                                    className="radio-outer-circle"
                                    cx="5" 
                                    cy="50" 
                                    r="10" 
                                ></circle>
                                {!last && <line x1="5" x2="5" y1="60" y2="100"></line>}
                            </svg>
                            <section>
                                <h3>{"Question " + parseInt(index+1)}</h3>
                                <h4>{spaceOutCamelCase(question.type)}</h4>
                            </section> 
                        </div>
                    </button>
                )
            })}
            </div>
        </div>
    )
}
export default ActivityTableOfContents