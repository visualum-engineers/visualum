import MultipleChoiceApp from "./MultipleChoice/MultipleChoiceApp"
import MultipleChoiceInstructions from "./MultipleChoice/MultipleChoiceInstructions"
import ShortAnswerApp from "./ShortAnswer/ShortAnswerApp"
import ShortAnswerInstructions from "./ShortAnswer/ShortAnswerInstructions"
import SortActivityApp from "./SortActivity/SortActivityApp"
import SortActivityInstructions from "./SortActivity/SortActivityInstructions"
import MatchActivityApp from "./MatchActivity/MatchActivityApp"
import MatchActivityInstructions from "./MatchActivity/MatchActivityInstructions"

import ActivityBtns from "./NavActivityBtn/ActivityBtns"
import SlimNavbar from "../slimNavbar/SlimNavbar"
import SecondarySideBar from "../sideBar/SecondarySideBar"
import assignmentData from "../../helpers/sampleAssignmentData"
import { useEffect, useState } from "react"
import useWindowWidth from "../../hooks/use-window-width"
import {CSSTransition} from "react-transition-group"

//const activeActivityBg = "images/activity/active-activity-bg.jpg"

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
    const [sidebarToggle, setSidebarToggle] = useState(true)
    const [moreInfoBtn, setMoreInfoBtn] = useState(true)
    const windowWidth = useWindowWidth(992)
    //when window width changes <992, sidebar automatically closes
    //it can still be opened though
    useEffect(()=>{ 
        if(!windowWidth) setSidebarToggle(false)
        else setSidebarToggle(true)
    },[windowWidth])

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
        setQuestion({
            activityID: activityData["uniqueID"],
            questionNum: currQuestion,
            ...activityData[currQuestion]
        })
        setPrevQuestion(questionNum)

        setQuestionNum(currQuestion)
    }

    const exitSideBar = () =>{
        setSidebarToggle(false)
    }
    const openSideBar = () =>{
        setSidebarToggle(true)
    }
    const handleSideBar = (e) =>{
        if (sidebarToggle && e.target.closest("button").ariaLabel === "exit-sidebar") return exitSideBar()
        else return openSideBar()
    }
    const moreInfoOnClick = (e) => setMoreInfoBtn(state=> !state)
    return(
    <>
        <SlimNavbar type={"activities-nav"} />
        <SecondarySideBar 
                data={[
                    {type:"btn", textContent: "Home", styles:"activities-sidebar-btn"},
                    {type:"link", textContent: "No", url: "/", styles:"activities-sidebar-link"},
                    {type:"link", textContent: "Contacts", url: "/", styles:"activities-sidebar-link"},
                    {type:"link", textContent: "Feedback", url: "/", styles:"activities-sidebar-link"},
                ]}
                sidebarToggle = {sidebarToggle}
                handleSideBar = {handleSideBar}
                windowWidth = {windowWidth}
                customFooterLinkClass = {"activities-sidebar-link"}
        />
        
        <div className = {`${sidebarToggle && windowWidth?"secondary-sidebar-open": ""} activity-body row flex-column justify-content-center align-items-center`}>
            {/* <img src = {activeActivityBg} className="active-activity-bg" alt="planet and stars background"/> */}
            
            {moreInfoBtn ? 
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
                        {activityData[questionNum].type === "sort" ? <SortActivityInstructions />
                        : activityData[questionNum].type === "matching" ? <MatchActivityInstructions />
                        : activityData[questionNum].type === "shortAnswer" ? <ShortAnswerInstructions />
                        : activityData[questionNum].type === "multipleChoice"? <MultipleChoiceInstructions />
                        : null}
                    </div>
                </div>
            : null}
            {/* col-lg-7 col-xl-6*/}
            <div className = "activity-type-container col-11 col-md-9 d-flex flex-column justify-content-center">
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
                                    {activityData[key].type === "sort" ? <SortActivityApp activityData = {activityData[key]} questionNum = {questionNum} activityID = {activityData.activityID}/>
                                    : activityData[key].type === "matching" ? <MatchActivityApp activityData = {activityData[key]} questionNum = {questionNum} activityID = {activityData.activityID} moreInfoOnClick={moreInfoOnClick}/>
                                    : activityData[key].type === "shortAnswer" ? <ShortAnswerApp activityData = {activityData[key]} questionNum = {questionNum} activityID = {activityData.activityID}/>
                                    : activityData[key].type === "multipleChoice"? <MultipleChoiceApp activityData = {activityData[key]} questionNum = {questionNum} activityID = {activityData.activityID}/>
                                    :<p>Hi</p>}
                                </div>

                            </CSSTransition> 
                        )
                    })
                :  <p>You've Submitted!</p>}
            </div>
            {/*loads appropriate btns depending if 
                    1. There are prev questions
                    2. This is the last question 
                    col-lg-7 col-xl-6
            */}
            <div className="col-11 col-md-9 nav-activity-btns">
                <ActivityBtns 
                    prevQuestion = {questionNum !== 1} 
                    lastQuestion = {Object.keys(activityData).length-1 === questionNum}
                    onNavBtnClick = {onNavBtnClick}
                />
            </div>
        </div>
        
    </>
    )
}
export default Activity
