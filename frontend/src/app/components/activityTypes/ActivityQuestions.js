import MultipleChoiceApp from "./MultipleChoice/MultipleChoiceApp"
import ShortAnswerApp from "./ShortAnswer/ShortAnswerApp"
import SortActivityApp from "./SortActivity/SortActivityApp"
import MatchActivityApp from "./MatchActivity/MatchActivityApp"

const ActivityQuestions = ({
    activityData, 
    questionNum, 
    moreInfoOnClick, 
    moreInfoBtn, 
    style, 
    activityKey, 
    mediumWindowWidth,
    smallWindowWidth,
    resetBtnOnClick, 
}) =>{
    return(
        <div style={style} className="flex-grow-1 question-transition-container d-flex flex-column">
            {activityData[activityKey].type === "sort" ? <SortActivityApp 
                                                    smallWindowWidth = {smallWindowWidth}
                                                    mediumWindowWidth = {mediumWindowWidth}
                                                    activityData = {activityData[activityKey]} 
                                                    questionNum = {questionNum} 
                                                    activityID = {activityData.activityID}
                                                    moreInfoOnClick={moreInfoOnClick} 
                                                    moreInfoBtn={moreInfoBtn}
                                                    resetBtnOnClick = {resetBtnOnClick}
                                                />
            : activityData[activityKey].type === "matching" ? <MatchActivityApp 
                                                            smallWindowWidth = {smallWindowWidth}
                                                            mediumWindowWidth = {mediumWindowWidth}
                                                            activityData = {activityData[activityKey]} 
                                                            questionNum = {questionNum} 
                                                            activityID = {activityData.activityID} 
                                                            moreInfoOnClick={moreInfoOnClick} 
                                                            moreInfoBtn={moreInfoBtn}
                                                            resetBtnOnClick = {resetBtnOnClick}
                                                        />
            : activityData[activityKey].type === "shortAnswer" ? <ShortAnswerApp 
                                                            smallWindowWidth = {smallWindowWidth}
                                                            mediumWindowWidth = {mediumWindowWidth}
                                                            activityData = {activityData[activityKey]} 
                                                            questionNum = {questionNum} 
                                                            activityID = {activityData.activityID}
                                                            resetBtnOnClick = {resetBtnOnClick}
                                                            moreInfoOnClick = {moreInfoOnClick}
                                                        />
            : activityData[activityKey].type === "multipleChoice"? <MultipleChoiceApp 
                                                            smallWindowWidth = {smallWindowWidth}
                                                            moreInfoOnClick = {moreInfoOnClick}
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
