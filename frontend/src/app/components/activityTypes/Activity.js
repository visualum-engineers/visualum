import ActivityQuestions from "./ActivityQuestions"
import ActivityInstructions from "./ActivityInstructions"
import ActivityBtns from "./NavActivityBtn/ActivityBtns"
import DnDActivites from "./DnDActivites"
import useWindowWidth from "../../hooks/use-window-width"
import SecondarySideBar from "../sideBar/SecondarySideBar"
import assignmentData from "../../helpers/sampleAssignmentData"
import { useEffect, useState } from "react"
import {CSSTransition} from "react-transition-group"
import { useSelector, useDispatch } from 'react-redux'
import {enableTap, resetPopUpOn, resetPopUpOff} from '../../../redux/features/activityTypes/activitiesSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCommentDots} from '@fortawesome/free-regular-svg-icons'

import ActivityResetPopUp from './ActivityResetPopUp'
import UserProfile from "../utilities/userProfile/UserProfile";
import calculatePercentage from "../../helpers/calculatePercentage";
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter"
const activityData = assignmentData
const duration = 500
const inPropDuration = duration * 2
const defaultTransition = {
    transition: `all ${duration}ms ease-out`,
    transitionProperty: "opacity, transform, left",
}

//for testing. remove after
const imageURL = "images/homePage/mountain-home-bg.jpg";

const Activity = () =>{
    let currQuestion = 1
    const [prevQuestion, setPrevQuestion] = useState(0)
    const [questionNum, setQuestionNum] = useState(1)
    const [question, setQuestion] = useState(activityData[currQuestion])
    const [sidebarToggle, setSidebarToggle] = useState(true)
    const [inProp, setInProp] = useState(true);
    //dont forget to change to have instruction appear on load
    const [moreInfoBtn, setMoreInfoBtn] = useState(false)
    const mediumWindowWidth = useWindowWidth(992)
    const smallWindowWidth = useWindowWidth(576)
    const dndEnabled = useSelector((state) => state.activities.dndEnabled)
    const resetPopUp = useSelector((state) => state.activities.resetPopUp)
    const dispatch = useDispatch()
    useEffect(() => {
        //hide overflow on mount
        setTimeout(() =>{
            setInProp(false)
        }, inPropDuration)
        //on mount check local storage for data
        let stored = localStorage.getItem(`${activityData.activityID}-activity_last_seen_question`)
        if(!stored) return
        setQuestionNum(parseInt(stored))
    }, [])
    //when window width < 992, sidebar automatically closes
    //it can still be opened though
    useEffect(()=>{ 
        if(!mediumWindowWidth) setSidebarToggle(false)
        else setSidebarToggle(true)
    },[mediumWindowWidth])

    useEffect(()=>{
        const activityType = activityData[questionNum].type
        const updateDnD = !smallWindowWidth && (activityType in DnDActivites)
        if(updateDnD) {
            dispatch(enableTap())
            setMoreInfoBtn(true)
        }
    }, [dispatch, smallWindowWidth, questionNum])

    const onNavBtnClick = (e) =>{
        //means it was just clicked. 
        if (inProp) return 
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
        setInProp(true)
        setTimeout(() =>{
            setInProp(false)
        }, inPropDuration)
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

    //used for confirmation popup of reseting data in activity 
    const resetBtnOnClick = (e) =>{
        //when being used in forms, it prevents a refresh
        e.preventDefault()
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
    const secondarySideBarData = [
        {type:"btn", styles:"activities-sidebar-btn", textContent: "Instructions", onClick: moreInfoOnClick},
        {type:"link", url: "/", styles:"activities-sidebar-link", textContent: 
            <>
                <span className="icon-container"><FontAwesomeIcon icon = {faCommentDots}/></span>
                <span className="ms-1">Feedback</span>
            </>
        },
    ]
    const popUpBgStyles = {
        position: "fixed",
        top: "0",
        height: "calc(max(100%, 100vh))",
        zIndex: "2",
        //left and width are conditional 
        //to adjust for a toggled sidebar
        left: sidebarToggle && mediumWindowWidth ? "13rem":"0" ,
        width: sidebarToggle && mediumWindowWidth ? "calc(100% - 13rem)":"100%",
        transition: "all 0.3s ease-out",
    }
    return(
    <>
        <SecondarySideBar 
            data={secondarySideBarData}
            sidebarToggle = {sidebarToggle}
            handleSideBar = {handleSideBar}
            windowWidth = {mediumWindowWidth}
            customFooterLinkClass = {"activities-sidebar-link"}
            userProfile = {
                <UserProfile
                    userContainerClass={"activities-sidebar-user-profile d-flex flex-column align-items-center justify-content-center"}
                    avatar={<img src={imageURL} alt = {"user-avatar"}/>}
                    name = {"Arky Asmal"} 
                    accountType={capitalizeFirstLetter("student")}
                    progressBar={{
                        percentage: calculatePercentage(questionNum-1, (Object.keys(activityData).length-2)) + "%",
                        ariaLabel:"activity-progress-bar"
                    }}
                />
            }     
        />

        <div 
            className = {`${sidebarToggle && mediumWindowWidth ? "secondary-sidebar-open ": ""}activity-body d-flex flex-column align-items-center justify-content-center`}>
            {moreInfoBtn && 
                <ActivityInstructions 
                    activityType = {activityData[questionNum].type}
                    activityInstructions ={null}
                    dndEnabled = {dndEnabled}
                    moreInfoOnClick ={moreInfoOnClick}
                    popUpBgStyles = {popUpBgStyles}
                />
            }

            {resetPopUp ? 
                <ActivityResetPopUp
                    popUpBgStyles = {popUpBgStyles}
                    onClick = {resetBtnOnClick} 
                />
            :null }
            <div 
                className = "activity-type-container col-12 col-md-10 d-flex flex-column" 
                style={inProp ? {overflow: "hidden"}: null}
            >
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
                                    mediumWindowWidth = {mediumWindowWidth}
                                    smallWindowWidth = {smallWindowWidth}
                                    resetBtnOnClick = {resetBtnOnClick}
                                    popUpBgStyles = {popUpBgStyles}
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