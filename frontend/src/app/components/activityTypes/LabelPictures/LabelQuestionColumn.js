import { useState, useEffect } from "react"
import {CSSTransition} from "react-transition-group"
import LabelPicturesImage from "./LabelImage"
import LabelQuestionTransition from "./LabelQuestionTransition"
import LabelQuestionColumnHeader from "./LabelQuestionColumnHeader"
import LabelQuestionColumnTitle from "./LabelQuestionColumnTitle"
import LabelAnswerOverview from "./LabelAnswersOverview"

const duration = 400
const inPropDuration = duration + 100
const defaultTransition = {
    transition: `all ${duration}ms ease-out`,
    transitionProperty: "opacity, transform, left",
}

const LabelPicturesQuestion = (props) =>{
    //used for transitions between internal label questions
    const [currQuestion, setCurrQuestion] = useState(0)
    const [prevQuestion, setPrevQuestion] = useState(0)
    //detect transition occuring
    const [inProp, setInProp] = useState(true)

    //fix before leaving
    const [overviewPopUp, setOverViewPopUp] = useState(false)
    useEffect(() =>{
        setTimeout(() =>{
            setInProp(false)
        }, inPropDuration)
    }, [])
    const onQuestionNavClick = (e) =>{
        const target = e.target.closest("button")
        if(!target || inProp) return
        switch(target.dataset.actionLabel){
            case "prev-question":
                setCurrQuestion(state => state - 1)
                break
            case "next-question":
                setCurrQuestion(state => parseInt(state) + 1)
                break
            default:
                break
        }
        setPrevQuestion(currQuestion)
        setInProp(true)
        setTimeout(() =>{
            setInProp(false)
        }, inPropDuration)
    }
    const onOverviewClick = (e) =>{
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
    const onCaroIndicatorClick = (e) =>{
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
    const onOverviewCardClick=(e) =>{
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
            style={inProp ? {overflow: "hidden"}: null}
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
                    <LabelAnswerOverview
                        popUpBgStyles={props.popUpBgStyles}
                        onOverviewClick={onOverviewClick}
                        onOverviewCardClick={onOverviewCardClick}
                        data={props.data}
                    />
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
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default LabelPicturesQuestion