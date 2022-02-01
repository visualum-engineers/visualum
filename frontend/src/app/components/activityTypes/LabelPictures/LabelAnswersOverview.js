
import PopUpBg from "../../utilities/popUp/PopUpBackground"
import LabelAnswerOverviewCard from "./LabelAnswersOverviewCard"
import ExitIcon from "../../utilities/exitIcon/ExitIcon"

const LabelAnswerOverview = ({
    data,
    onOverviewClick,
    popUpBgStyles,
    onOverviewCardClick
}) =>{
    const newPopUpStyles = {...popUpBgStyles, zIndex: 4}
    return (
        <PopUpBg 
            onClick={onOverviewClick}
            ariaLabel={"exit-answers-overview"}
            containerStyles={newPopUpStyles}
        >
            <div className="label-pic-answers-overview-container d-flex flex-column col-11 col-md-10 col-lg-8">
                <header className="label-pic-answer-overview-header d-flex justify-content-between align-items-center"> 
                    <h1>Answers Overview</h1>
                    <button 
                        onClick={onOverviewClick} 
                        aria-label="exit-answers-overview" 
                        className="d-flex align-items-center justify-content-center"
                        data-action-label = "exit-answers-overview"
                    >
                        <ExitIcon />
                    </button>
                </header>
                <div className="label-pic-answer-overview-body container">
                    <ol className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                        {data.questions.map((question, index)=>{
                            return(
                                <LabelAnswerOverviewCard 
                                    key={question.id}
                                    data={data}
                                    question={question}
                                    index = {index}
                                    onClick={onOverviewCardClick}
                                />
                            )
                        })}
                    </ol>
                </div>
            </div>
        </PopUpBg> 
    )
    
}
export default LabelAnswerOverview