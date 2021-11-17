import MultipleChoiceApp from "./MultipleChoice/MultipleChoiceApp"
import ShortAnswerApp from "./ShortAnswer/ShortAnswerApp"
import SortActivityApp from "./SortActivity/SortActivityApp"
import MatchActivityApp from "./MatchActivity/MatchActivityApp"
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
    const windowWidth = useWindowWidth(992)
    //when window width changes <992, sidebar automatically closes
    //it can still be opened though
    useEffect(()=>{
        if(!windowWidth) setSidebarToggle(false)
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
    return(
    <>
        <SlimNavbar type={"activities-nav"} />
        <SecondarySideBar 
                data={[
                    {type:"btn", textContent: "Home", styles:"secondary-sidebar-home-btn"},
                    {type:"link", textContent: "Contacts", url: "/", styles:""},
                    {type:"link", textContent: "Settings", url: "/"},
                    {type:"link", textContent: "Feedback", url: "/"},
                ]}
                sidebarToggle = {sidebarToggle}
                handleSideBar = {handleSideBar}
                windowWidth = {windowWidth}
        />
        
        
        <div className = {`${sidebarToggle && windowWidth?"secondary-sidebar-open": ""} activity-body row flex-column align-items-center`}>
            {/* <img src = {activeActivityBg} className="active-activity-bg" alt="planet and stars background"/> */}
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
                                    {activityData[key].type === "sort" ? <SortActivityApp activityData = {activityData[key]} questionNum = {questionNum} activityID = {activityData.activityID}/>
                                    : activityData[key].type === "matching" ? <MatchActivityApp activityData = {activityData[key]} questionNum = {questionNum}/>
                                    : activityData[key].type === "shortAnswer" ? <ShortAnswerApp activityData = {activityData[key]} questionNum = {questionNum}/>
                                    : activityData[key].type === "multipleChoice"? <MultipleChoiceApp activityData = {activityData[key]} questionNum = {questionNum}/>
                                    :<p>Hi</p>}
                                </div>

                            </CSSTransition> 
                        )
                    })
                :  <p>You've Submitted!</p>}
            </div>
            {/*loads appropriate btns depending if 
                    1. There are prev questions
                    2. This is the last question */}
            <div className="col-11 col-md-9 col-lg-7 col-xl-6 nav-activity-btns">
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
