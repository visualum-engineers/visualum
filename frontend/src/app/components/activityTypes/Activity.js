//import DnDActivities from "./DnDActivities"
import useWindowWidth from "../../hooks/use-window-width"
import SecondarySideBar from "../sideBar/SecondarySideBar"
import { useEffect, useState } from "react"
import { unstable_batchedUpdates } from "react-dom"
import {CSSTransition} from "react-transition-group"
import { useSelector, useDispatch } from 'react-redux'
import convertTimeDiff from "../../helpers/convertTimeDiff";
import {
    updateActivityData, 
    updateActivityTimer
} from "../../../redux/features/activityTypes/activitiesData"
import {
    disableSettings, 
    resetPopUpOn, 
    resetPopUpOff,
    enableSettings,
} from '../../../redux/features/activityTypes/activitiesSettings'
import { 
    useActivitySecondarySideBarData, 
    activitySecondarySidebarFooterData 
} from "./ActivityComponents/ActivitySidebarData"
import {  
    ActivityInstructions,  
    ActivityBtns, 
    ActivityQuestions, 
    ActivityNavbar,
    ActivityResetPopUp,
    ActivityTimeReminder
} from "./index"
import Timer from "../utilities/timer/Timer"

const duration = 375
const inPropDuration = duration * 2
const defaultTransition = {
    transition: `all ${duration}ms ease-out`,
    transitionProperty: "opacity, transform, left",
}

//for testing. remove after
const imageURL = "images/homePage/mountain-home-bg.jpg";

const Activity = () =>{
    //redux states
    const activityData = useSelector((state) => state.activities.data.originalData.activityData)
    const resetPopUp = useSelector((state) => state.activities.settings.resetPopUp)
    const userSetDnDEnabled = useSelector((state) => state.activities.settings.userSetDnDEnabled)
    const timeRemindersEnabled = useSelector((state) => state.activities.settings.timeRemindersEnabled)

    const dispatch = useDispatch()

    //on mount, we issue a time stamp, 
    //and an expected end time stamp
    const timerStartTime = new Date().toString()
    const timerEndTime = useSelector((state) => state.activities.data.clientData.present.clientAnswerData.activityEndTime)
    const timerData = timerStartTime && timerEndTime ? convertTimeDiff(timerStartTime, timerEndTime) : null
    useEffect(() =>{
        if(timerEndTime) return
        dispatch(updateActivityTimer())
    }, [dispatch, timerEndTime])

    //component specific state
    let currQuestion = 0
    const [prevQuestion, setPrevQuestion] = useState(0)
    //question data
    const questionNumber = useSelector((state) => state.activities.data.clientData.present.clientAnswerData.lastQuestionSeen)
    const questionNum = questionNumber ? questionNumber : 0
    const question = activityData.questions[questionNum]
    const originalQuestionData = activityData.questions[questionNum]

    //utility components
    const [sidebarToggle, setSidebarToggle] = useState(true)
    const [inProp, setInProp] = useState(true);

    //dont forget to change to have instruction appear on load
    const [moreInfoBtn, setMoreInfoBtn] = useState(false)
    const mediumWindowWidth = useWindowWidth(992)
    const smallWindowWidth = useWindowWidth(576)
    useEffect(() => {
        let isMounted = true
        //hide overflow on mount
        if(isMounted){
            setInProp(true)
            setTimeout(() =>{
                if(isMounted) setInProp(false)
            }, inPropDuration)
        }
        return () => { isMounted = false }
    }, [questionNum])
    //when window width < 992, sidebar automatically closes
    //it can still be opened though
    useEffect(()=>{ 
        let isMounted = true
        if(isMounted) {
            if(!mediumWindowWidth) setSidebarToggle(false)
            else setSidebarToggle(true)
        }
        return () => {isMounted = false}
    },[mediumWindowWidth])

    useEffect(()=>{
        let isMounted = true
        if(isMounted) {
            const updateDnD = !smallWindowWidth
            if (updateDnD) dispatch(disableSettings("dndEnabled"))
            else if (userSetDnDEnabled) dispatch(enableSettings("dndEnabled"))
        }
        return () => {isMounted = false}
    }, [dispatch, smallWindowWidth, userSetDnDEnabled])

    const onNavBtnClick = (e) =>{
        //means it was just clicked. 
        if (inProp) return 
        const target = e.target.closest("button")
        const btnType = target.dataset.btnType
        //different btn actions
        switch(btnType){
            case "prev":
                currQuestion = questionNum - 1
                break;
            case "continue":
                currQuestion = questionNum + 1
                break;
            case "submit":
                return
            case "tableOfContents":
                currQuestion = parseInt(target.dataset.questionNum)
                break;
            default:
                return
        }
        //update state
        unstable_batchedUpdates(()=>{
            setPrevQuestion(questionNum)
            dispatch(updateActivityData({lastSeenQuestion: currQuestion}))
            setInProp(true)
        })
        setTimeout(() =>{
            setInProp(false)
        }, inPropDuration)
    }
    const exitSideBar = () => setSidebarToggle(false)
    
    const openSideBar = () => setSidebarToggle(true)
    
    const handleSideBar = (e) =>{
        if (sidebarToggle && e.target.closest("button").ariaLabel === "exit-sidebar") return exitSideBar()
        else return openSideBar()
    }
    //use for activity instructions popup
    const moreInfoOnClick = (e) => {
        setMoreInfoBtn(state => !state)
        if(!mediumWindowWidth && sidebarToggle) exitSideBar()
    }

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
    
    const sideBarData = useActivitySecondarySideBarData({
        activityData: activityData,
        onInstructionsClick: moreInfoOnClick,
        onTableOfContentClick: onNavBtnClick,
        currQuestion: questionNum,
    })
    const sidebarFooterData = activitySecondarySidebarFooterData()
    const popUpBgStyles = {
        position: "fixed",
        top: "0",
        height: "calc(max(100%, 100vh))",
        zIndex: "4",
        left: "0",
        width: "100%",
        transition: "all 0.3s ease-out",
    }

    return(
    <>
        <ActivityNavbar 
            mediumWindowWidth={mediumWindowWidth}
            smallWindowWidth = {smallWindowWidth}
            data ={activityData.questions[questionNum]}
            resetBtnOnClick ={resetBtnOnClick} 
            questionNum={questionNum}
            sidebarToggle={sidebarToggle}
            handleSideBar={handleSideBar}
            inProp = {inProp}
            timerData={timerData}
            avatar={<img 
                        src={imageURL} 
                        alt={"user-avatar"}
                    />}

        />
        <SecondarySideBar 
            data={sideBarData}
            footerData = {sidebarFooterData}
            sidebarToggle = {sidebarToggle}
            handleSideBar = {handleSideBar}
            windowWidth = {mediumWindowWidth}
            customSidebarClass={"activities-sidebar"}
            logo ={false}
            exitSideBarBtn = {false}
        />
        <div 
            className = {`${sidebarToggle && mediumWindowWidth ? "secondary-sidebar-open ": ""}activity-body`}>
            {moreInfoBtn && 
                <ActivityInstructions 
                    activityType = {question.type}
                    activityInstructions ={null}
                    moreInfoOnClick ={moreInfoOnClick}
                    popUpBgStyles = {popUpBgStyles}
                />
            }
            {timeRemindersEnabled && 
                 <ActivityTimeReminder 
                    popUpBgStyles={popUpBgStyles}
                />
            }
            
            {resetPopUp && 
                <ActivityResetPopUp
                    popUpBgStyles = {popUpBgStyles}
                    onClick = {resetBtnOnClick} 
                />
            }

            <div 
                className = "activity-type-container col-12 col-md-11" 
                style={inProp ? {overflow: "hidden"}: null}
            >
                <div className="activity-header ">
                    {timerData && !smallWindowWidth && <div className={`activity-timer`}>
                            <span>TIME:</span>
                            <Timer
                                timer={timerData}
                                autoStart={true}
                            />
                        </div>
                    }
                </div>

                {/*generate entire form data*/}
                {question.type ?
                    activityData.questions.map((question, index)=>{
                        const moveLeft = (prevQuestion - questionNum) >= 0
                        return (
                            <CSSTransition
                                key = {`question-${index}`}
                                in = {questionNum === parseInt(index)}
                                timeout={duration}
                                classNames={`${moveLeft? "question-move-left":"question-move-right"}`}
                                mountOnEnter
                                unmountOnExit                                
                            >
                                <ActivityQuestions 
                                    originalQuestionData = {originalQuestionData}
                                    questions = {activityData.questions}
                                    activityKey = {index}
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
            <div className="col-11 nav-activity-btns">
                <ActivityBtns 
                    prevQuestion = {questionNum !== 0} 
                    lastQuestion = {activityData.questions.length-1 === questionNum}
                    currQuestion={questionNum}
                    onNavBtnClick = {onNavBtnClick}
                />
            </div>
        </div>
    </>
    )
}

export default Activity

