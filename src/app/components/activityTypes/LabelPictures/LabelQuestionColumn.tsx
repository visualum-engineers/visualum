import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import useDetectSwipe from "../../../hooks/use-detect-swipe"
import {CSSTransition} from "react-transition-group"
import LabelPicturesImage from "./LabelImage"
import LabelQuestionTransition from "./LabelQuestionTransition"
import LabelQuestionColumnHeader from "./LabelQuestionColumnHeader"
import LabelQuestionColumnTitle from "./LabelQuestionColumnTitle"
import LabelAnswerOverview from "./LabelAnswersOverview"
import { unstable_batchedUpdates } from "react-dom"

const duration = 400
const inPropDuration = duration + 100
const defaultTransition = {
    transition: `all ${duration}ms ease-out`,
    transitionProperty: "opacity, transform, left",
}
const LabelPicturesQuestion = (props: any) =>{
    //used for transitions between internal label questions
    const [currQuestion, setCurrQuestion] = useState(0)
    const [prevQuestion, setPrevQuestion] = useState(0)
    //detect transition occuring
    const [inProp, setInProp] = useState(true)
    const [onOverviewTouchStart, onOveviewTouchEnd] = useDetectSwipe()
    //fix before leaving
    const [overviewPopUp, setOverViewPopUp] = useState(false)
    useEffect(() =>{
        let isMounted = true
        if(isMounted){
            setTimeout(() =>{
                if(isMounted) setInProp(false)
            }, inPropDuration)
        }
        return () => {isMounted = false}
    }, [])
    const updateQuestionNumByOne = (target: any)=>{
        switch(target.dataset.actionLabel){
            case "prev-question":
                if(currQuestion <= 0) return
                setCurrQuestion(state => state - 1)
                break
            case "next-question":
                if(currQuestion >= props.data.questions.length-1) return
                setCurrQuestion(state => state + 1)
                break
            default:
                break
        }
        unstable_batchedUpdates(() =>{
            setPrevQuestion(currQuestion)
            setInProp(true)
        })

        setTimeout(() =>{
            setInProp(false)
        }, inPropDuration)
    }
    const onQuestionNavClick = (e: any) =>{
        const target = e.target.closest("button")
        if(!target || inProp) return
        return updateQuestionNumByOne(target)
    }

    const onQuestionNavSwipe = (e: any) => {
        //if a drag,tap or transition, is started, 
        //we dont want swipe interference
        if(props.dragActive || props.firstElTap || inProp) return
        switch(e.type){
            case "touchstart":
                return onOverviewTouchStart(e)
            case "touchend":
                const direction = onOveviewTouchEnd(e, 60)
                const target = {
                    dataset:{
                        actionLabel: direction?.right ? "prev-question" : "next-question"
                    }
                }
                if(direction?.right || direction?.left) return updateQuestionNumByOne(target)
                return
            default:
                return
        }
    }
    const onOverviewClick = (e: any) =>{
        const action = e.target.closest("button").dataset.actionLabel
        switch(action){
            case 'exit-answers-overview':
                return setOverViewPopUp(false)
            case "open-answers-overview":
                return setOverViewPopUp(true)
            default:
                return
        }
    }
    const onCaroIndicatorClick = (e: any) =>{
        const target = e.target.closest("button")
        if(inProp || !target) return
        const targetIndex = target.dataset.questionIndex

        setInProp(true)
        setPrevQuestion(currQuestion)
        setCurrQuestion(parseInt(targetIndex))

        setTimeout(() =>{
            setInProp(false)
        }, inPropDuration)
    }
    const onOverviewCardClick=(e: any) =>{
        const target = e.target.closest("button")
        if(!target || inProp) return
        //close popup
        onOverviewClick(e)

        //navigate to question on carousel
        onCaroIndicatorClick(e)
    }
    
    const questionData = Object.keys(props.data.categories)

    return (
        <div 
            className={`label-pic-activity-question-container d-flex flex-column align-items-center`
                        + `${!props.mediumWindowWidth ?" portrait-size":""}`}
            style={inProp ? {overflow: "hidden"}: undefined}
        >
           <LabelQuestionColumnTitle 
                moreInfoOnClick = {props.moreInfoOnClick}
                moreInfoBtn = {props.moreInfoBtn}
           />
            <LabelPicturesImage 
                data={props.data}
                popUpBgStyles={props.popUpBgStyles}
            />
            <div className="d-flex flex-column align-items-center flex-grow-1 col-11 col-sm-10 col-lg-8">
                <LabelQuestionColumnHeader 
                    onQuestionNavClick = {onQuestionNavClick}
                    onOverviewClick = {onOverviewClick}
                    questionData = {questionData}
                    currQuestion ={currQuestion}
                    data = {props.data}
                    smallWindowWidth={props.smallWindowWidth}
                />
                {overviewPopUp &&
                    createPortal(
                        <LabelAnswerOverview
                            popUpBgStyles={props.popUpBgStyles}
                            onOverviewClick={onOverviewClick}
                            onOverviewCardClick={onOverviewCardClick}
                            data={props.data}
                        />, document.body
                    )
                    
                }
                <div 
                    className="d-flex flex-column align-items-center flex-grow-1 w-100"
                    style={{position:"relative"}}
                >
                    {questionData.map((key, index) => {
                        const moveLeft = (prevQuestion - currQuestion) >= 0
                        const questionID = props.data.questions[currQuestion].id
                        return(
                            <CSSTransition
                                key = {`label-pic-question-${key}`}
                                in = {questionID.toString() === key.toString()}
                                timeout={duration}
                                classNames={`label-pic-question-move-${moveLeft? "left":"right"}`}
                                unmountOnExit
                            >
                                <LabelQuestionTransition
                                    {...props}
                                    onQuestionNavSwipe = {onQuestionNavSwipe}
                                    questionKey = {key}
                                    questionIndex = {index}
                                    style ={{...defaultTransition}}
                                />
                            </CSSTransition>
                        )
                    })}
                </div>
                <div className="label-pic-question-caro-indicators d-flex align-items-center">
                    {questionData.map((key, index) =>{
                        return(
                            <button 
                                className={currQuestion === index ? "question-active" : ""}
                                key={key}
                                aria-label={`go-to-sub-question-${index+1}`}
                                onClick={onCaroIndicatorClick}
                                data-question-index = {index}
                            >
                                <svg 
                                    viewBox="0 0 100 100"
                                >
                                    <circle 
                                        className="radio-outer-circle"
                                        cx="50" 
                                        cy="50" 
                                        r="45" 
                                    ></circle>
                                </svg>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default LabelPicturesQuestion