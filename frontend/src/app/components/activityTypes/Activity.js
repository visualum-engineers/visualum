import ActivityQuestions from "./ActivityQuestions"
import ActivityInstructions from "./ActivityInstructions"
import ActivityBtns from "./NavActivityBtn/ActivityBtns"
import SlimNavbar from "../slimNavbar/SlimNavbar"
import SecondarySideBar from "../sideBar/SecondarySideBar"
import assignmentData from "../../helpers/sampleAssignmentData"
import { useEffect, useState } from "react"
import useWindowWidth from "../../hooks/use-window-width"
import {CSSTransition} from "react-transition-group"
import { useSelector, useDispatch } from 'react-redux'
import {enableTap} from '../../../redux/features/activityTypes/activitiesSlice'
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
    const smallWindowWidth = useWindowWidth(576)
    const dndEnabled = useSelector((state) => state.activities.dndEnabled)
    const dispatch = useDispatch()
    useEffect(() => {
        //on mount check local storage for data
        let stored = localStorage.getItem(`${activityData.activityID}-activity_last_seen_question`)
        if(!stored) return
        setQuestionNum(parseInt(stored))
    }, [])
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
        localStorage.setItem(`${activityData.activityID}-activity_last_seen_question`, currQuestion.toString())

    }
    const exitSideBar = () => setSidebarToggle(false)
    
    const openSideBar = () => setSidebarToggle(true)
    
    const handleSideBar = (e) =>{
        if (sidebarToggle && e.target.closest("button").ariaLabel === "exit-sidebar") return exitSideBar()
        else return openSideBar()
    }
    const moreInfoOnClick = () => setMoreInfoBtn(state=> !state)
    useEffect(()=>{
        const activityType = activityData[questionNum].type
        const updateDnD = !smallWindowWidth && (activityType ==="matching" || activityType === "sort")
        if(updateDnD) {
            dispatch(enableTap())
            setMoreInfoBtn(true)
        }
    }, [dispatch, smallWindowWidth, questionNum])
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
        
        <div className = {`${sidebarToggle && windowWidth?"secondary-sidebar-open": ""} activity-body row flex-column align-items-center`}>
            {moreInfoBtn ? 
                <ActivityInstructions 
                    activityType = {activityData[questionNum].type}
                    activityInstructions ={null}
                    dndEnabled = {dndEnabled}
                    moreInfoOnClick ={moreInfoOnClick}
                />
            : null}
            {/* col-lg-7 col-xl-6*/}
            <div className = "activity-type-container col-11 col-md-10 d-flex flex-column">
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
                                <ActivityQuestions 
                                    activityData = {activityData}
                                    activityKey = {key}
                                    questionNum = {questionNum}
                                    moreInfoOnClick = {moreInfoOnClick}
                                    moreInfoBtn = {moreInfoBtn}
                                    style ={{...defaultTransition}}
                                    mediumWindowWidth = {windowWidth}
                                />
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
            <div className="col-11 col-md-10 nav-activity-btns">
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
