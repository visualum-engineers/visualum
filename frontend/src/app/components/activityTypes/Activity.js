import ActivityQuestions from "./ActivityQuestions"
import ActivityInstructions from "./ActivityInstructions"
import ActivityBtns from "./NavActivityBtn/ActivityBtns"
import useWindowWidth from "../../hooks/use-window-width"
import SecondarySideBar from "../sideBar/SecondarySideBar"
import assignmentData from "../../helpers/sampleAssignmentData"
import { useEffect, useState } from "react"
import {CSSTransition} from "react-transition-group"
import { useSelector, useDispatch } from 'react-redux'
import {enableTap, resetPopUpOn, resetPopUpOff} from '../../../redux/features/activityTypes/activitiesSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileAlt, faCommentDots, faStar} from '@fortawesome/free-regular-svg-icons'
import {faBookOpen} from '@fortawesome/free-solid-svg-icons'
import ActivityResetPopUp from './ActivityResetPopUp'

const activityData = assignmentData
const duration = 500
const defaultTransition = {
    transition: `all ${duration}ms ease-out`,
    transitionProperty: "opacity, transform, left",
}
const secondarySideBarData = [
    {type:"btn", styles:"activities-sidebar-btn", textContent: "Overview"},
    {type:"link", url: "/", styles:"activities-sidebar-link", textContent: 
        <>
            <span className="icon-container"><FontAwesomeIcon icon = {faFileAlt}/></span>
            <span className="ms-1">Report</span>
        </>
    },
    {type:"link", url: "/", styles:"activities-sidebar-link", textContent: 
        <>
            <span className="icon-container"><FontAwesomeIcon icon = {faStar}/></span>
            <span className="ms-1">Grades</span>
        </>
    },
    {type:"link", url: "/", styles:"activities-sidebar-link", textContent: 
        <>
            <span className="icon-container"><FontAwesomeIcon icon = {faBookOpen}/></span>
            <span className="ms-1">Reference</span>
        </>
    },
    {type:"link", url: "/", styles:"activities-sidebar-link", textContent: 
        <>
            <span className="icon-container"><FontAwesomeIcon icon = {faCommentDots}/></span>
            <span className="ms-1">Feedback</span>
        </>
    },
]

const Activity = () =>{
    let currQuestion = 1
    const [prevQuestion, setPrevQuestion] = useState(0)
    const [questionNum, setQuestionNum] = useState(1)
    const [question, setQuestion] = useState(activityData[currQuestion])
    const [sidebarToggle, setSidebarToggle] = useState(true)
    //dont forget to change to have instruction appear on load
    const [moreInfoBtn, setMoreInfoBtn] = useState(false)
    const windowWidth = useWindowWidth(992)
    const smallWindowWidth = useWindowWidth(576)
    const dndEnabled = useSelector((state) => state.activities.dndEnabled)
    const resetPopUp = useSelector((state) => state.activities.resetPopUp)
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
    //use for activity instructions popup
    const moreInfoOnClick = () => setMoreInfoBtn(state=> !state)
    useEffect(()=>{
        const activityType = activityData[questionNum].type
        const updateDnD = !smallWindowWidth && (activityType ==="matching" || activityType === "sort")
        if(updateDnD) {
            dispatch(enableTap())
            setMoreInfoBtn(true)
        }
    }, [dispatch, smallWindowWidth, questionNum])

    //used for confirmation popup of reseting data in activity 
    const resetBtnOnClick = (e) =>{
        //for keydown events, only accept enter
        if(e.type === "keydown" && e.key !== "Enter") return  
        
        const node = e.target.closest("button")
        const questionNum = node.dataset.questionNum
        const action = node.dataset.actionLabel
        switch(action){
            case "reset-question" : 
                return dispatch(resetPopUpOn({ questionNum : questionNum, confirmed: false}))
            case "exit-reset-question": 
                return dispatch(resetPopUpOff())
            case "confirm-reset-question":
                return dispatch(resetPopUpOn({...resetPopUp, confirmed: true}))
            default:
                return
        }
    }
    return(
    <>
        <SecondarySideBar 
                data={secondarySideBarData}
                sidebarToggle = {sidebarToggle}
                handleSideBar = {handleSideBar}
                windowWidth = {windowWidth}
                customFooterLinkClass = {"activities-sidebar-link"}
        />

        <div className = {`${sidebarToggle && windowWidth?"secondary-sidebar-open ": ""}activity-body d-flex flex-column align-items-center justify-content-center`}>
            {moreInfoBtn ? 
                <ActivityInstructions 
                    activityType = {activityData[questionNum].type}
                    activityInstructions ={null}
                    dndEnabled = {dndEnabled}
                    moreInfoOnClick ={moreInfoOnClick}
                />
            : null}

            {resetPopUp ? 
                <ActivityResetPopUp
                    onClick = {resetBtnOnClick} 
                    onKeyDown = {resetBtnOnClick}
                />
            :null }
            <div className = "activity-type-container col-12 col-md-10 d-flex flex-column">
                {/*generate entire form data*/}
                {question.type ?
                    Object.keys(activityData).map((key)=>{
                        const moveLeft = (prevQuestion - questionNum) >= 0
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
                                    resetBtnOnClick = {resetBtnOnClick}
                                />
                            </CSSTransition> 
                        )
                    })
                :  <p>You've Submitted!</p>}
            </div>
            {/*loads appropriate btns depending if 
                    1. There are prev questions
                    2. This is the last question 
            */}
            <div className="col-11 col-md-10 nav-activity-btns">
                <ActivityBtns 
                    prevQuestion = {questionNum !== 1} 
                    lastQuestion = {Object.keys(activityData).length-2 === questionNum}
                    onNavBtnClick = {onNavBtnClick}
                />
            </div>
            
        </div>
        
    </>
    )
}
export default Activity
