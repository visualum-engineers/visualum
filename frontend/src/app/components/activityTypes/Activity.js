import MultipleChoiceApp from "./MultipleChoice/MultipleChoiceApp"
import ShortAnswerApp from "./ShortAnswer/ShortAnswerApp"
import SortActivityApp from "./SortActivity/SortActivityApp"
import MatchActivityApp from "./MatchActivity/MatchActivityApp"
import ActivityBtns from "./NavActivityBtn/ActivityBtns"
import SlimNavbar from "../slimNavbar/SlimNavbar"
import assignmentData from "../../helpers/sampleAssignmentData"
import { useState } from "react"
import {CSSTransition} from "react-transition-group"

const activeActivityBg = "images/activity/active-activity-bg.jpg"

const activityData = assignmentData
const duration = 500
const defaultTransition = {
    transition: `all ${duration}ms ease-out`,
    transitionProperty: "opacity, transform",
}
const Activity = () =>{
    let currQuestion = 1
    const [prevQuestion, setPrevQuestion] = useState(0)
    const [questionNum, setQuestionNum] = useState(1)
    const [question, setQuestion] = useState(activityData[currQuestion])

    const onNavBtnClick = (e) =>{
        const btnType = e.target.closest("button").getAttribute("btntype")
        //different btn actions
        if(btnType === "prev") {
            currQuestion = questionNum - 1
        }
        if(btnType === "continue") {
            currQuestion = questionNum + 1
        }
        if(btnType === "submit") return null
        
        setPrevQuestion(questionNum)
        setQuestion(activityData[currQuestion])
        setQuestionNum(currQuestion)
    }
  
    return(
    <>
        <div className = "activity-body row flex-column align-items-center ">
            <SlimNavbar type={"activities-nav"} />
            <img src = {activeActivityBg} className="active-activity-bg" alt="planet and stars background"/>
            <div className = "activity-type-container col-11 col-md-9 col-lg-7 col-xl-6 d-flex flex-column justify-content-center">
                {/*generate entire form data*/}
                {question.type ?
                    Object.keys(activityData).map((key)=>{
                        const moveLeft = (prevQuestion - questionNum) > 0
                        return (
                            <CSSTransition
                                key = {`question-${key}`}
                                in = {questionNum === parseInt(key)}
                                timeout={duration}
                                classNames={`${moveLeft? "question-move-left":"question-move-right"}`}
                                mountOnEnter
                                unmountOnExit                                
                            >
                                <div style={{...defaultTransition}} className="question-transition-container d-flex flex-column justify-content-center ">
                                    {activityData[key].type === "sort" ? <SortActivityApp activityData = {activityData[key]}/>
                                    : activityData[key].type === "matching" ? <MatchActivityApp activityData = {activityData[key]}/>
                                    : activityData[key].type === "shortAnswer" ? <ShortAnswerApp activityData = {activityData[key]} />
                                    : activityData[key].type === "multipleChoice"? <MultipleChoiceApp activityData = {activityData[key]}/>
                                    :<p>Hi</p>}
                                </div>

                            </CSSTransition> 
                        )
                    })
                :  <p>You've Submitted!</p>}
            </div>
            {/*loads appropriate btns depending if 
                    1. There are prev questions
                    2. This is the last questions */}
            <div className="col-11 col-md-9 col-lg-7 col-xl-6 nav-activity-btns">
                <ActivityBtns 
                    prevQuestion = {questionNum !== 1} 
                    lastQuestion = {Object.keys(activityData).length === questionNum}
                    onNavBtnClick = {onNavBtnClick}
                />
            </div>
        </div>
        
    </>
    )
}
export default Activity
