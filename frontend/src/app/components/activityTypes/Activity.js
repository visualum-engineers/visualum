import DnDActivities from "./DnDActivities"
import useWindowWidth from "../../hooks/use-window-width"
import SecondarySideBar from "../sideBar/SecondarySideBar"
import { useEffect, useState } from "react"
import { unstable_batchedUpdates } from "react-dom"
import {CSSTransition} from "react-transition-group"
import { useSelector, useDispatch } from 'react-redux'
import {updateActivityData} from "../../../redux/features/activityTypes/activitiesData"
import {
    enableDnD,
    enableTap, 
    resetPopUpOn, 
    resetPopUpOff,
} from '../../../redux/features/activityTypes/activitiesSettings'
import { 
    activitySecondarySideBarData, 
    activitySecondarySidebarFooterData 
} from "./ActivitySidebarData"
import {  
    ActivityInstructions,  
    ActivityBtns, 
    ActivityQuestions, 
    ActivityNavbar,
    ActivityResetPopUp
} from "./index"

const duration = 375
const inPropDuration = duration * 2
const defaultTransition = {
    transition: `all ${duration}ms ease-out`,
    transitionProperty: "opacity, transform, left",
}

//for testing. remove after
//const imageURL = "images/homePage/mountain-home-bg.jpg";

const Activity = () =>{
    //redux states
    const activityData = useSelector((state) => state.activities.data.originalData.activityData)
    const dndEnabled = useSelector((state) => state.activities.settings.dndEnabled)
    const resetPopUp = useSelector((state) => state.activities.settings.resetPopUp)
    const disableDnD = useSelector((state) => !state.activities.settings.dndEnabled) 

    const dispatch = useDispatch()

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
        //hide overflow on mount
        setInProp(true)
        setTimeout(() =>{
            setInProp(false)
        }, inPropDuration)
    }, [questionNum])
    //when window width < 992, sidebar automatically closes
    //it can still be opened though
    useEffect(()=>{ 
        if(!mediumWindowWidth) setSidebarToggle(false)
        else setSidebarToggle(true)
    },[mediumWindowWidth])

    useEffect(()=>{
        const questionType = question.type
        const updateDnD = !smallWindowWidth && (questionType in DnDActivities)
        if(updateDnD) {
            dispatch(enableTap())
            setMoreInfoBtn(true)
        }
    }, [dispatch, smallWindowWidth, question.type])

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
    //toggle dnd and tap mode based on btn
    const toggleTap = (e) => {
        if (e.type ==="click" || (e.type ==="keydown" && e.key === "Enter")) {
            //update redux store so instructions can dynamically change
            if (disableDnD) dispatch(enableDnD())
            else dispatch(enableTap())
            moreInfoOnClick()
        }
    }
    const sideBarData = activitySecondarySideBarData({
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
            disableDnD ={disableDnD}
            toggleTap = {toggleTap}
            sidebarToggle={sidebarToggle}
            handleSideBar={handleSideBar}
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
            className = {`${sidebarToggle && mediumWindowWidth ? "secondary-sidebar-open ": ""}activity-body d-flex flex-column align-items-center justify-content-center`}>
            {moreInfoBtn && 
                <ActivityInstructions 
                    activityType = {question.type}
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
                className = "activity-type-container col-12 col-md-11 d-flex flex-column" 
                style={inProp ? {overflow: "hidden"}: null}
            >
                <div className="activity-header"></div>

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
                    onNavBtnClick = {onNavBtnClick}
                />
            </div>
        </div>
    </>
    )
}

export default Activity

