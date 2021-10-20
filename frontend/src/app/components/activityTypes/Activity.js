import MultipleChoiceApp from "./MultipleChoice/MultipleChoiceApp"
import ShortAnswerApp from "./ShortAnswer/ShortAnswerApp"
import SortActivityApp from "./SortActivity/SortActivityApp"
import MatchActivityApp from "./MatchActivity/MatchActivityApp"
import ActivityBtns from "./NavActivityBtn/ActivityBtns"
import SlimNavbar from "../slimNavbar/SlimNavbar"
import assignmentData from "../../helpers/sampleAssignmentData"
import { useState } from "react"

const activeActivityBg = "images/active-activity-bg.jpg"

const activityData = assignmentData

const Activity = () =>{
    let currQuestion = 1
    const [question, setQuestion] = useState(1)
    const [state, setState] = useState(activityData[currQuestion])
    const onNavBtnClick = (e) =>{
        const btnType = e.target.closest("button").getAttribute("btntype")
        //different btn actions
        if(btnType === "prev") currQuestion = question - 1
        if(btnType === "continue") currQuestion = question + 1
        if(btnType === "submit") return null
        
        setState(activityData[currQuestion])
        setQuestion(currQuestion)
    }
    //render activity based off data provided
    const activityType = {
        "matching": <MatchActivityApp 
                    activityData = {state}
                    />,
        "multipleChoice": <MultipleChoiceApp
                            activityData = {state}
                            />,
        "sort": <SortActivityApp
                    activityData = {state}
                    />,
        "shortAnswer": <ShortAnswerApp
                        activityData = {state}
                        />,
    }
    return(
    <>
        <SlimNavbar type={"activities-nav"} />
        <div className = "activity-body row flex-column align-items-center ">
            <img src = {activeActivityBg} className="active-activity-bg" alt="planet and stars background"/>
            <div className = "activity-type-container col-11 col-md-9 col-lg-7 col-xl-6 d-flex flex-column justify-content-center">
                {state.type ? activityType[state.type]
                :  <p>You've Submitted!</p>}
            </div>
            {/*loads appropriate btns depending if 
                    1. There are prev questions
                    2. This is the last questions */}
            <div className="col-11 col-md-9 col-lg-7 col-xl-6 nav-activity-btns">
                <ActivityBtns 
                    prevQuestion = {question !== 1} 
                    lastQuestion = {Object.keys(activityData).length === question}
                    onNavBtnClick = {onNavBtnClick}
                />
            </div>
        </div>
        
    </>
    )
}
export default Activity
