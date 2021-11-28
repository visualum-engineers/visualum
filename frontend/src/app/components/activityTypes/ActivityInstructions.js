import ShortAnswerInstructions from "./ShortAnswer/ShortAnswerInstructions"
import SortActivityInstructions from "./SortActivity/SortActivityInstructions"
import MatchActivityInstructions from "./MatchActivity/MatchActivityInstructions"
import MultipleChoiceInstructions from "./MultipleChoice/MultipleChoiceInstructions"

const ActivityInstructions = ({activityType, activityInstructions, dndEnabled, moreInfoOnClick}) =>{
    return (
        <div className="d-flex justify-content-center align-items-center activity-walkthrough-dark-bg">
            <button 
                className="activity-walkthrough-bg-exit-btn" 
                aria-label="exit-more-info"
                onClick={moreInfoOnClick}>
            </button>
            <div className="activity-walkthrough-instructions col-11 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
                <header className="activity-walkthrough-instructions-header d-flex justify-content-between align-items-center"> 
                    <h1>Activity Instructions</h1>
                    <button 
                        onClick={moreInfoOnClick} 
                        aria-label="exit-more-info" 
                        className="d-flex align-items-center justify-content-center"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </header>
                {activityType === "sort" ? <SortActivityInstructions 
                                                dndEnabled={dndEnabled}
                                                activityInstructions={activityInstructions}
                                            />
                : activityType === "matching" ? <MatchActivityInstructions
                                                    activityInstructions = {activityInstructions}
                                                    dndEnabled={dndEnabled}/>
                : activityType === "shortAnswer" ? <ShortAnswerInstructions 
                                                        activityInstructions={activityInstructions}/>
                : activityType === "multipleChoice"? <MultipleChoiceInstructions 
                                                        activityInstructions={activityInstructions}/>
                : null}
            </div>
        </div>
    )
}
export default ActivityInstructions