import MultipleChoiceApp from "./MultipleChoice/MultipleChoiceApp"
import ShortAnswerApp from "./ShortAnswer/ShortAnswerApp"
import SortActivityApp from "./SortActivity/SortActivityApp"
import MatchActivityApp from "./MatchActivity/MatchActivityApp"

const ActivityQuestions = ({
    activityData, 
    questionNum, 
    moreInfoOnClick, 
    moreInfoBtn, style, 
    activityKey, 
    mediumWindowWidth,
    resetBtnOnClick, 
}) =>{
    return(
        <div style={style} className="flex-grow-1 question-transition-container d-flex flex-column">
            {activityData[activityKey].type === "sort" ? <SortActivityApp 
                                                    activityData = {activityData[activityKey]} 
                                                    questionNum = {questionNum} 
                                                    activityID = {activityData.activityID}
                                                    mediumWindowWidth = {mediumWindowWidth}
                                                    moreInfoOnClick={moreInfoOnClick} 
                                                    moreInfoBtn={moreInfoBtn}
                                                    resetBtnOnClick = {resetBtnOnClick}
                                                />
            : activityData[activityKey].type === "matching" ? <MatchActivityApp 
                                                            activityData = {activityData[activityKey]} 
                                                            questionNum = {questionNum} 
                                                            activityID = {activityData.activityID} 
                                                            moreInfoOnClick={moreInfoOnClick} 
                                                            moreInfoBtn={moreInfoBtn}
                                                            mediumWindowWidth = {mediumWindowWidth}
                                                            resetBtnOnClick = {resetBtnOnClick}
                                                        />
            : activityData[activityKey].type === "shortAnswer" ? <ShortAnswerApp 
                                                            activityData = {activityData[activityKey]} 
                                                            questionNum = {questionNum} 
                                                            activityID = {activityData.activityID}
                                                            mediumWindowWidth = {mediumWindowWidth}
                                                            resetBtnOnClick = {resetBtnOnClick}
                                                        />
            : activityData[activityKey].type === "multipleChoice"? <MultipleChoiceApp 
                                                            activityData = {activityData[activityKey]} 
                                                            questionNum = {questionNum} 
                                                            activityID = {activityData.activityID}
                                                            mediumWindowWidth = {mediumWindowWidth}
                                                            resetBtnOnClick = {resetBtnOnClick}
                                                        />
            :<p>Hi</p>}
        </div>
    )
}
export default ActivityQuestions